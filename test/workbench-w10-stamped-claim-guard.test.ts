/**
 * RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R6 (wb-2j3.5): a hermetic default-gate guard over the W10 claim row of
 * docs/workbench/feature-matrix.md (the "node() RF noncommitted context preview capability" row). Statement pinned: "the
 * feature-matrix W10 row must cite at least one RF receipt row stamped with the release measured during that run, and the
 * stamped release must match the R2 carrier." It reads docs/workbench/receipts/ (the receipt convention, wb-xox), never
 * TRACEABILITY.md (frozen; test/workbench-traceability-freeze.test.ts), and imports the R2 carrier, never an rf@ literal.
 * It also carries R5 (wb-2j3.4) AC1 on the same rendered model (gate-1 row 547, respin default (a): the raw-text line census
 * it replaces read the markdown source, not the page): "A wb-6hb.11-style census falsifier binds the W10 row: FAILS while
 * /zero durable writes/ remains in feature-matrix.md:105 (RED at 9df9a03), passes with the plane-scoped phrase."
 *
 * READING (respin on gate-3 row 487; owner ruling R1(a): the docs-pin floor binds this guard over the acceptance's
 * "string-level census" wording; respin on gate-1 row 500 adds SECTION CONTENT, the pinned claim cells and EVIDENCE
 * COMPOSITION). The judge reads each page AS IT RENDERS: marked 18.0.11 (GFM, pinned exactly as a devDependency) lexes it,
 * the lexer test/workbench-receipts-convention.test.ts and test/workbench-docs-cancel-path.test.ts already use. One lex of a
 * page serves every count and every extraction on it (same view, 6hb.10).
 * - PAGE CHECK (rendered-text truth, 9x5.17: strip reading for comments, forbid reading for raw HTML): an html token that is
 *   exactly one complete comment renders nothing and is stripped; every other html token, block or inline, is refused,
 *   because raw HTML can hide text the lexer still reads. One carve-out, outside the W10 section only: a bare tag (`<name>`
 *   or `</name>`, no attributes) inside a GFM table cell naming an element that cannot leave its cell or hide what follows
 *   it (never a raw-text, template, table-structure, document or foreign-content element) is tolerated and stripped; today
 *   that is exactly the invoke:<id> cells of the W03 and W06 rows. The receipt files and the rendered index admit complete comments only.
 * - RENDERED TEXT: text, backslash escapes, code spans, code blocks and link text (never a destination or a title), with
 *   numeric and common named character references decoded in text; images and struck-through (del) text are not asserted;
 *   html tokens render nothing; in a table cell every white-space run reads as one space. Fenced and indented code is
 *   visible code, never a table row.
 * - SECTION (heading uniqueness 6hb.9, section bound cax.24): exactly one heading anywhere on the page (any level, ATX or
 *   setext, at any list or block quote depth) reads as a W10 heading under the FOLDED KEY; it is the top-level level-2
 *   heading, and the section runs from it to the next top-level level-1/2 heading or EOF.
 * - SECTION CONTENT (U1/U2, the D3 withdrawn-subsection class): the section holds exactly its committed blocks
 *   (W10_COMMITTED). The W10 heading renders its committed text; the page's first heading is its committed level-1 title
 *   and no other level-1 heading, at any depth, stands between the two (W10 stays a section of the matrix, never of an
 *   appendix); after the heading the section holds exactly one table and no other block, so a ### subsection inside the
 *   section belongs to it and is refused, as is any paragraph, list, code block, rule or second table there (white space,
 *   link reference definitions and html render nothing and are skipped; html other than a complete comment is refused by
 *   the page check). The table's rendered header row and its ordered rendered first cells equal their committed lists.
 * - CLAIM ROW (same view and uniqueness, 6hb.10): a row of any table on the page (header or body, at any depth) is a claim
 *   row when its rendered first cell reads as beginning with CLAIM_KEY under the FOLDED KEY. Exactly one exists, and it is a
 *   body row of a top-level table inside the W10 section whose header names an Evidence column. Its Feature, Status and
 *   Caveats cells (located by header) render their committed text; the Evidence cell is judged below. wb-2j3.4's re-cut of
 *   this row updates W10_COMMITTED (and evidenceLead() or stampSentence() where their wording moves) in the same change.
 * - WITHDRAWN CLAIM (R5 AC1): no rendered cell of any row that reads as the W10 claim row (the CLAIM ROW reading, so a
 *   duplicate claim row anywhere on the page is read as well as the one in W10) reads as containing a WITHDRAWN_CLAIMS entry
 *   under the FOLDED KEY: the universal negative in both spellings it was published in, the row's "zero durable writes"
 *   and the descriptor's "no durable write" (wb-2j3.3). The claim row's rendered Feature cell (its first cell, the one read
 *   as CLAIM_KEY) carries PLANE_SCOPED_CLAUSE instead, as exact rendered text (required text is never folded, so a
 *   look-alike or an invisible inside the clause is refused). Neither reading consults W10_COMMITTED, so a later re-cut of
 *   the committed row cannot carry the claim back.
 * - EVIDENCE COMPOSITION (J7): the rendered Evidence cell, split into sentences at each ". ", is exactly its seven committed
 *   sentences in order: the lead (evidenceLead(): its carrier slot renders the R2 carrier, its receipt slot the stamped
 *   receipt, its retired release is the retirement-clause carve-out below), the Tests sentence, the legacy receipt clause
 *   and the bead sentence (each pinned whole), then the stamped sentence (judged by its slice), then the descriptor-contract
 *   sentence (wb-973.16, pinned whole: the two input arms, the render flags, the frozen legacy argv, the operator-set root
 *   and the two hosted-agent locators, each with the gate receipt id of the landing that delivered it; the legacy receipt
 *   clause is never edited), then the TSX-era receipt sentence (wb-693.7, pinned whole and bound to its receipt by the
 *   TSX-ERA RECEIPT ROW reading below). A sentence outside that list, anywhere in the cell, is refused, and so is a missing one.
 * - STAMPED SENTENCE (bounded clause, 6hb.7: slice equality, never includes-anywhere): the rendered Evidence cell splits into
 *   sentences at each ". "; exactly one reads as beginning with STAMP_KEY, and it EQUALS stampSentence() with its slots
 *   filled from the receipt it names and from the carrier: receipts/<bead>.md exists; its newest rendered
 *   RF_PREVIEW_RECEIPT {json} line (document order; receipts are append-only) carries a non-empty string cli_version equal to
 *   the carrier release; the cmd_* id is one the receipt entry carrying that line also renders (entries run between
 *   top-level level-1/2 headings), never a legacy unstamped id, and it is that entry's run of record (RUN OF RECORD);
 *   every release slot reads that stamped release.
 * - RUN OF RECORD (wb-j4lx, owner R691 F4: the wb-c7ku gate's L2-W3, L2-W4 and L2-W5 swapped the stamped id for another id
 *   the entry renders and read 0/796): the entry carrying the newest stamp line names its run of record, and the stamped
 *   sentence's cmd slot is that id. The entry's opening heading renders exactly one "(receipt of record cmd_<12 hex>)"
 *   clause, read exactly (a look-alike, a case change or an invisible inside it makes it no clause), and with that clause
 *   taken out the heading no longer reads as naming a receipt of record under the FOLDED KEY; at least one rendered line
 *   of the entry reads as beginning "Run of record:" under the FOLDED KEY, and the first cmd_* id each such line renders
 *   is the clause's id. The receipt is the only witness this guard reads (it reads no forge run record), so the binding
 *   is the receipt's own declaration, stated twice and cross-checked.
 * - HISTORY: the three 0.1.583-era unstamped ids stay as whole tokens in the rendered Evidence cell (receipts are added,
 *   history is never rewritten). STALE LITERAL: outside "the earlier rf@<x> literal is retired", every rf@<release> the
 *   rendered row shows is the carrier release.
 * - FOLDED KEY (receipts-convention form): character references decoded, NFKC, white-space runs one space, control, format
 *   and combining code points dropped, case folded; each remaining non-ASCII code point matches any 0-3 characters, so a
 *   non-ASCII look-alike counts.
 * FALSIFIER FLOOR (U5): the gate-3 row-487 battery (G1-G9 with G6b evasions, K1-K3 kills, R1-R2 rendering-neutral controls),
 * the gate-1 row-500 battery (J1-J27 docs, receipt and rendered-index variants; N1-N10 rendering-neutral controls) and the
 * gate-1 row-547 battery (X1-X7 rendered-claim variants; its N1/N2 controls carried as XN1/XN2) are carried below as the
 * same edits of the committed docs, judged in memory: every G, K, J and X variant is refused with its named diagnosis and
 * every R, N and XN control is accepted. N6 (an unrelated row above the claim row) changes the committed first cells, so it
 * is carried as a kill. The F rows keep the fefe71f protections; the H rows add hiding and duplication shapes outside the
 * batteries; the C rows are rendering-neutral controls; the W rows carry AC1's own inputs (W1 the row as it read at
 * 9df9a03, W2 the descriptor's spelling, W3 a look-alike, W4 a header-row claim row, W5 a look-alike inside the required
 * clause, W6 an ASCII control character inside the claim). Every look-alike and invisible is built with
 * String.fromCodePoint; none is typed raw.
 * The RECORD rows (RR1-RR5, wb-j4lx) are one per record site of the live stamped receipt's newest stamp entry: each other
 * cmd_* id it renders (a decoy: its stamped pin is the L2-W3/L2-W4/L2-W5 shape), its heading clause and its Run of record
 * line. recordEdit() writes each pin's edit by site and op (receipt edits keep fail-closed raw anchors), and each pin is
 * refused with each named diagnosis in order and no other finding, or accepted (neutral by design, or a named residual).
 * RR0 anchors the rows outside the census, to the receipt itself: they are exactly its record sites, so a re-pin to a
 * receipt with other site counts re-states RECORD_ROWS in the same change. C1 re-authors every pin on every N base.
 * MUTANT AUTHORING (C1): every page and rendered-index edit is located through the lexer (the top-level token raws tile the page; a
 * table's raw lines are its header, delimiter and rows; each rendered character of a cell or heading maps back to the
 * source span it renders from) and authored at those positions, never located by a raw-text regex, so a rendering-neutral
 * rewrite of the committed docs moves no authoring site: the C1 rows re-author every page, receipt and rendered-index variant on
 * each N base and require the same diagnosis. Every N control is stack-safe: applied to a page that already carries it (the
 * gate battery rewrites the committed docs on disk), it adds a further rendering-neutral edit instead of none or a breaking
 * one, so the N and C1 rows stay green on every N-rewritten docs tree. Receipt edits keep fail-closed raw anchors (no
 * rendering-neutral control rewrites a receipt; named scope).
 * EACH-LIVENESS (U3): every for-of falsifier and control table carries a length pin and an ordered roster pin, and every
 * loop inside one row counts the entries it ran against a literal, so deleting any entry (G1 included) turns the suite red.
 * FROZEN SHAPE (standing rule 16, owner order 2026-10-18T18:14:19Z): one row pins WITHDRAWN_CLAIMS, PLANE_SCOPED_CLAUSE,
 * every W and X row with its diagnoses, and the XN control names as literals derived from the tables at this cut, so
 * dropping a diagnosis, shortening a claim or a diagnosis, or swapping one for an unrelated diagnosis the variant also
 * draws turns it red. RECORD-SHAPE pins every RECORD row's site, label and pins (op, reading and diagnoses) the same way.
 * RESIDUALS (named, not closed): ASCII look-alikes (I for l, 0 for O) in a heading or a first cell are not folded; a
 * tolerated bare cell tag outside W10 is assumed inert; styling applied from outside the page; prose outside the W10
 * section (another section may still describe the capability); the receipt beyond its newest stamp entry and the rendered index
 * beyond its one link; a withdrawn claim outside the claim rows' cells is not named by WITHDRAWN CLAIM (the section-level
 * class, wb-64x): in another W10 row's cell (gate X9) it is silent, in a W10 paragraph (gate X8) SECTION CONTENT refuses it
 * under its own diagnosis.
 * RUN OF RECORD residuals, each pinned by an accepted residual pin: the receipt rewritten in every record slot together
 * with the row's cmd slot moves the run of record with it (each decoy row's rewritten pin; landed receipt lines are
 * append-only under owner ruling R539, whose numstat check at the gate, never this guard, refuses that edit); a later
 * "Run of record:" declaration on a line whose first cmd_* id is the record is prose to this guard (RR5 trailing).
 * TSX-ERA RECEIPT ROW (wb-693.7, RF-TSX-AND-EMBEDDING-R9: "one gated run of the R8 tier shall produce a recorded TSX-era
 * receipt: a success row ... and a runtime-absent row ..., landing as a NEW TRACEABILITY row with the feature-matrix W10 row
 * re-graded"; TRACEABILITY.md is frozen, so the receipt is receipts/wb-693.7.md under standing rule 13): exactly one rendered
 * Evidence sentence reads as beginning with TSX_KEY, and it EQUALS tsxSentence() with the slots TSX_SHAPE reads back (its two
 * engine slots, the pinned Deno and tsx_runtime distribution_version, read one release: a split is named on its own beside
 * the slice check, wb-ojur, so the equality is falsified apart from it), bound
 * to the receipt it names: receipts/<bead>.md exists; the newest entry carrying RF-TSX-RECEIPT {json} lines (the lines the
 * R8 tier, test/workbench-native-rf-tsx-preview.test.ts, writes to stdout) carries exactly one success row and one
 * runtime-absent row and no other row; the success row's cli_version, tsx_worker_spawns (a count of at least 1) and
 * distribution_version equal the sentence's slots, and its contract_fingerprint has the tier's fingerprint shape; the
 * runtime-absent row reads category "unavailable" with RF_COMPONENT_RUNTIME_ABSENT in its message; and the sentence's cmd_*
 * id is that entry's run of record (its heading's one exact clause, first on every "Run of record:" line: the RUN OF RECORD
 * reading above, applied to the TSX entry). The TSX ROWS falsify the binding one site at a time; T-ANCHOR holds their sites
 * to what the live receipt renders and to the field names the R8 tier's receipt() calls print, both ways, so a site removed
 * from every literal of this file still reds; TSX-SHAPE freezes each row's site, label and pins (standing rule 16). Every
 * refused TSX and TS pin is refused with exactly its findings, each whole and in order (wb-m14y, the wb-ojur gate's F2 S5: a
 * cause shortened in every literal of this file stayed green under a containment reading): the judge's own output anchors
 * every cause.
 * TSX residuals (named, each pinned by an accepted residual pin): an older entry's RF-TSX-RECEIPT lines are never judged
 * (T10, the newest-entry reading); the tier's unprinted assertions (ephemeral, render_id, storage_write_count) are judged by
 * the tier itself, so the receipt's prose restating them is never read (T11).
 * TSX STRUCTURE (wb-ojur, the wb-693.7 gate's F1: 11 of 23 judge mutants survived because no pin falsified the judge's
 * structural arms): T7 gains a stray and a doubled heading clause, T9 an engine split, a reworded slice and a look-alike copy
 * of the sentence, and TS1-TS7 refuse the arms no field, record or page site draws: the Evidence cell unreadable, the receipt
 * missing, raw HTML in it, no RF-TSX-RECEIPT line, a line that is not one JSON object, a row outside the R9 pair, a pair row
 * twice. TS6 also refuses seven near names (TSX_NEAR_NAMES; wb-m14y, the wb-ojur gate's F2 J-g3: a prefix match accepted a
 * foreign "success-..." row silently; then this bead's gate's F1 G4: a start-trimmed match accepted a foreign " success" row),
 * each one a comparison weaker than exact membership in the R9 pair would accept: an R9 name with text after it (a prefix
 * match) or before it (a suffix match), a proper prefix and a proper suffix of an R9 name (the two reverse matches), an R9
 * name in another case (a case-folded match), one with trailing white space (a trimmed match) and one with leading white
 * space (a start-trimmed match). T-ARMS anchors the TS rows outside the tables, in the judge's own code: it requires every
 * finding of every refused pin to read as exactly one arm (or as a finding of the shared W10 view), every arm to be drawn,
 * the TS rows to be exactly the arms no T row draws, in the judge's order, and the reading to hold no unread entry; TS-SHAPE
 * freezes the TS rows (standing rule 16).
 * FLOW READING (wb-m14y: the wb-ojur gate's F1, where IP-E1 to IP-E5 each added one unpinned diagnosis in a form the landed
 * reading skipped - a push in a function not declared string[], a pushed const, a conditional return, an arrow helper, an
 * unshift - and stayed green; then this bead's gate's U1, where G1 and G1b left a generator through yield and G2 and G2b read
 * a call through a same-named binding the call site cannot see): readJudgeArms() parses this file with the TypeScript parser
 * and follows the diagnosis flow back from judgeTsxRow's return statements. Every name it follows resolves to the one
 * declaration the TypeScript checker binds it to at that reference (bindingChecker(): the checker over this file alone, asked
 * nothing else), so a binding in a scope that does not enclose the reference is never the one read; every expression it
 * follows is read with its parentheses and type assertions (as, satisfies, !, <T>) taken off. A diagnosis LIST is an
 * array literal (each element one diagnosis, each spread a list), a conditional of lists, a call of a name T-ARMS enters (each
 * of its returns a list), a name of a const declared in the same top-level function (a TRACED LIST: its initializer, plus the
 * arguments of every push() and unshift() called on it, a spread argument a list and any other one diagnosis), or a property
 * read from a HOLDER, a const of the same top-level function bound to a call of a name T-ARMS enters (that property of each
 * of the callee's returned object literals). One DIAGNOSIS is a string, no-substitution template or template literal (one
 * arm; each substitution reads as any text), a conditional of diagnoses, a name of a const (of a function or of the module)
 * whose initializer is one, or a call of a name T-ARMS enters (each of its returns one). T-ARMS enters a name whose one
 * declaration is a function declaration with a body or a const bound to an arrow or function expression, neither a
 * generator, and reads every return statement of that function's own body (never one of a function or class nested in it),
 * or its expression body. It never enters the shared W10 view, the module-level SHARED_VIEW declaration itself (a function
 * of another scope sharing its name is entered like any other): a holder of its call carries its findings, which the
 * stamped-claim tables judge, so T-ARMS does not read them. Arms are ordered by the source positions of the calls, holder
 * calls and const references the flow passes through to reach each, then by its own position, compared in turn; an arm
 * reached along several flows keeps the earliest. Declared return types are not read. A TYPE POSITION is one under a type
 * node (an annotation, a type argument, a typeof query), except the operand of a class's extends clause or of an instantiation
 * expression, which is a value evaluated at run time (TypeScript parses both as type nodes).
 * FAIL CLOSED: the reading refuses each of these as an unread entry with its reason, and T-ARMS requires none: in a list or
 * diagnosis position, any expression the paragraph above does not name (for example a method call, an operator or comma
 * expression, a tagged template, a hole); a call whose name resolves to something T-ARMS does not enter (for example a
 * generator function, the shared W10 view, a function declaration without a body, a const bound to anything but an arrow or
 * function expression, a let, a var, a parameter, an import, a class, a destructured or undeclared name, or a name with more
 * than one declaration); a list name that is not a const of the same top-level function, and a diagnosis name that is not a
 * const; every reference to a traced list, outside type positions, other than as the object of a push() or unshift() call, a
 * spread in an array literal or an argument list, or a return by the function declaring it, alone or as the value of the one
 * member of a returned object literal carrying it (so an alias, an argument, an iteration, an element or length write, a
 * splice, a closure handing it out and a second member carrying it are each unread); a property read as a list from a name
 * that is not a holder; every reference to a holder, outside type positions, other than as the object of a property read,
 * and every read of its list property other than such a flow out; a return of a holder's callee that is not an object literal
 * made only of identifier-named property and shorthand assignments with exactly one member of that name; any property but
 * findings read as a list from a holder of the shared W10 view; a reference to a function declaration T-ARMS enters,
 * anywhere in this file outside type positions, other than as the callee of a call (it could rebind or hand out the
 * function); a call whose callee, its parentheses and type assertions aside, is the name eval, anywhere in this file (a direct
 * eval can read and write any binding in scope); a return without a value in a function T-ARMS enters; a recursive flow, a
 * list read inside its own flow, and a diagnosis reached through more than 64 calls, holder calls and const references; and a
 * source with no module-level judgeTsxRow T-ARMS enters. So a diagnosis added in a form the FLOW READING names is read as an
 * arm, which T-ARMS reds on until a refused pin's finding reads as it, and one written in a form this list names reds T-ARMS
 * as unread; nothing beyond the two lists and the residual below is claimed.
 * T-ARMS-FORMS pins the reading: each probe armProbe() writes into the judge's source with the TypeScript parser reads back
 * as its frozen reading: AF1-AF15, AF17, AF19 and AF21 are read as arms where the judge's order puts them (the wb-ojur gate's
 * IP-E1 to IP-E5 and this bead's gate's G2 among them; AF15's local helper takes the five arms of the one it shadows out of
 * reach; AF19's const shares the shared view's name in a helper's own scope; AF21 pushes inside a class's extends
 * expression), AF16 (the wb-ojur gate's IP-K1 re-annotation), AF18 (G2b's same-named copy in a closure that does not enclose
 * the call) and AF20 (a reached helper named in a type position) leave the reading unchanged, AU1-AU41 are unread, each with
 * its reason (AU15 reads its own literal too; AU27 and AU28 are G1 and G1b; AU41 rebinds a reached helper inside a class's
 * extends expression), and AR1 is the residual below, pinned quiet; a source with no judgeTsxRow reads no arm and that one
 * unread entry; FORMS-SHAPE freezes the probes (standing rule 16). T-ARMS-ANCHORED pins every arm on a sample built from its
 * literal pieces with a line break inside every substitution: the sample reads as the arm, and no arm with a literal head (11
 * of 26) reads a character before it, none with a literal tail (20 of 26) one after it (wb-m14y, the wb-ojur gate's F3 A4: no
 * live finding exercised the anchoring).
 * T-ROSTER holds the T rows to the TSX receipt's claim of record ("rows T0 to T11"), so a T row removed from every literal of
 * this file, a residual row included, still reds (the gate's F2: its X-CT6-T10 and X-CT6-T11 coordinated hollows). It reads
 * the claim as the receipt RENDERS (rosterClaims()): T-ROSTER-RENDERED pins four receipt variants whose raw and rendered
 * claims disagree (wb-m14y, the wb-ojur gate's F3 A5: a raw reading stayed green) - the claim inside a complete comment or
 * struck through reads as no claim; written with escaped parentheses or an emphasized last row it reads as the claim.
 * NOT CLAIMED (pin grain): T-ARMS anchors arms, not pins, so a pin removed from every literal of this file stays green while
 * another pin draws each arm it draws: T1, T2 and T3 changed (beside emptied or zeroed), T7 removed or T7 doubled (one of the
 * two), T8 swapped (beside T7 swapped), T9 doubled or T9 lookalike (one of the two), T4 unknown, which draws none, and any one
 * of TS6's eight pins; every row keeps at least one pin. Likewise a T-ARMS-FORMS probe or a T-ROSTER-RENDERED variant removed
 * from every literal of this file stays green: those two tables are anchored by their own literals and counts only. The F, G,
 * K, H, J, W, X and RECORD rows keep their containment reading (each cause a part of a finding).
 * FLOW READING residual (named, pinned quiet by AR1): the reading assumes JavaScript's standard semantics for what it reads
 * (push() and unshift() on an array, a spread of one, the conditional operator, string and template literals); a
 * standard-library object altered anywhere, in the judge or outside it, is never read (AR1 replaces Array.prototype.push at
 * module level).
 * Spawns nothing; writes nothing; reads two docs files, the receipts directory, the R8 tier file and this file's own source
 * (T-ARMS, T-ARMS-FORMS, T-ARMS-ANCHORED), and imports the carrier.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Lexer, type Token, type Tokens, type TokensList } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readReceiptsListing, renderReceiptsIndex } from "../qa/workbench/receipts-index.mjs";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";

const ROOT = process.cwd();
const MATRIX = "docs/workbench/feature-matrix.md";
const RECEIPTS_DIR = "docs/workbench/receipts";
const W10_KEY = "w10";
const CLAIM_KEY = "node() rf noncommitted context preview capability";
const STAMP_KEY = "stamped receipt row";
const EVIDENCE_HEADER = "Evidence";
/** The 0.1.583-era receipts the row cited before the stamp: live runs that recorded no measured producer release. */
const LEGACY_UNSTAMPED_IDS = ["cmd_994da817d4cd", "cmd_7e50a487da08", "cmd_386a32a0323b"];
const RELEASE = "[0-9]+(?:\\.[0-9]+)*";
const BEAD = "wb-[0-9a-z]+(?:\\.[0-9]+)*";
const RELEASE_TOKEN_ALL = /rf@([0-9]+(?:\.[0-9]+)*)/g;
/** The only clause that may name a release other than the carrier's: the retirement of the old literal. */
const RETIREMENT_CLAUSE_ALL = /the earlier rf@[0-9]+(?:\.[0-9]+)* literal is retired/g;
const CMD_ID_ALL = /cmd_[0-9a-f]{12}/g;
const STAMP_MARK = "RF_PREVIEW_RECEIPT {";
/** RUN OF RECORD (wb-j4lx): the clause an entry heading names its run of record in, read exactly (a look-alike or invisible inside it is no clause). */
const RECORD_CLAUSE_ALL = /\(receipt of record (cmd_[0-9a-f]{12})\)/g;
/** The folded key a heading reads as naming a receipt of record under; outside its one exact clause it is refused. */
const RECORD_KEY = "receipt of record";
/** The folded key a rendered line of the entry reads as beginning with when it states the entry's run of record. */
const RUN_KEY = "run of record:";
/** TSX-ERA RECEIPT ROW (wb-693.7): the folded key the TSX-era receipt sentence reads as beginning with. */
const TSX_KEY = "tsx-era receipt row";
/** The mark each R8 tier receipt line opens with (the tier's receipt(), written to stdout). */
const TSX_MARK = "RF-TSX-RECEIPT {";
/** The R8 tier file whose receipt() calls name the fields each TSX receipt row prints (T-ANCHOR's second source). */
const TSX_TIER = "test/workbench-native-rf-tsx-preview.test.ts";
/** The two receipt rows R9 names, in the tier's order. */
const TSX_ROW_NAMES = ["success", "runtime-absent"] as const;
/** The tier's shape for tsx_runtime.contract_fingerprint (R9 acceptance, success row). */
const TSX_FINGERPRINT = /^sha256:[0-9a-f]{64}$|^unknown$/;
/** The producer code R9's runtime-absent row carries in its message. */
const RUNTIME_ABSENT_CODE = "RF_COMPONENT_RUNTIME_ABSENT";
/** The withdrawn universal negative (R5 AC1, wb-2j3.4) in both spellings it was published in: the row's and the descriptor's. */
const WITHDRAWN_CLAIMS = ["zero durable writes", "no durable write"] as const;
/** The plane-scoped clause the claim row's rendered Feature cell carries in place of the withdrawn claim (wb-2j3.4 STATEMENT). */
const PLANE_SCOPED_CLAUSE = "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace";
/** Elements a bare cell tag may never name: they can leave their cell, swallow what follows, or hide by construction. */
const ESCAPING_ELEMENTS: ReadonlySet<string> = new Set([
  "script", "style", "textarea", "title", "xmp", "iframe", "noembed", "noframes", "noscript", "plaintext", "template",
  "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr", "td", "th", "html", "head", "body", "frameset",
  "frame", "svg", "math", "select", "option", "optgroup", "object", "embed",
]);

/** The W10 row exactly as it read at 9df9a03: three live receipts, no measured-release stamp, contractSource rf@0.1.583. */
const ROW_AT_9DF9A03 = "| node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance and zero durable writes | landed-gated | src/workbench/providers/reactivefiber.ts (reactivefiber.render.preview v1; contractSource rf@0.1.583 context.render --no-commit). Tests: test/workbench-native-rf-preview.test.ts, test/workbench-provider-envelope-audit.test.ts, test/workbench-ecosystem-native.test.ts, test/workbench-native-ecosystem.test.ts, test/workbench-provider-lifecycle.test.ts. TRACEABILITY 'Native ecosystem receipts': real RF noncommitted context cmd_994da817d4cd (initialized disposable workspace; output + graph provenance, no durable render ID); custody caps cmd_7e50a487da08 (malformed JSON, stdout/stderr caps, TERM/KILL cleanup); corrected envelope suite cmd_386a32a0323b (actual operation/workspace identity, zero noncommitted storage writes). Bead wb-x32 (open). | Bead wb-x32 open: 'Full interop contract remains open.' Preview deliberately yields null render/transaction IDs (no durable render); W10 acceptance is 'real render or honest blocker' - the landed slice is the noncommitted preview via the CLI envelope, not a committed render or production TS SDK interop. |";

type ReadReceipt = (name: string) => string | undefined;

interface StampSlots {
  date: string;
  receipt: string;
  cmd: string;
  release: string;
  pinBead: string;
}

/** The committed stamped sentence as the page renders it (code span markup dropped), slots filled. */
function stampSentence(slots: StampSlots): string {
  return `Stamped receipt row (R6/R8, ${slots.date}): receipts/${slots.receipt}.md, gated forge run rf-preview ${slots.cmd} against the operator-provisioned installed rf, measured release ${slots.release} (RF_PREVIEW_RECEIPT cli_version ${slots.release} with the R7 identity assertions in place); the R2 carrier REACTIVE_FIBER_CONTRACT_SOURCE is re-pinned to rf@${slots.release} from that receipt (${slots.pinBead}).`;
}

/** stampSentence() read back: date, receipt, cmd, the three release slots in order, pinning bead. */
const STAMP_SHAPE = new RegExp(
  `^Stamped receipt row \\(R6/R8, ([0-9]{4}-[0-9]{2}-[0-9]{2})\\): receipts/(${BEAD})\\.md, gated forge run rf-preview (cmd_[0-9a-f]{12}) against the operator-provisioned installed rf, measured release (${RELEASE}) \\(RF_PREVIEW_RECEIPT cli_version (${RELEASE}) with the R7 identity assertions in place\\); the R2 carrier REACTIVE_FIBER_CONTRACT_SOURCE is re-pinned to rf@(${RELEASE}) from that receipt \\((${BEAD})\\)\\.$`,
);

/** The W10 section as it renders at this cut (SECTION CONTENT, CLAIM ROW, EVIDENCE COMPOSITION in the header). */
const W10_COMMITTED = {
  title: "Workbench release feature matrix",
  heading: "W10: ReactiveFiber provider/interop",
  header: ["Feature", "Status", "Evidence", "Caveats"],
  firstCells: [
    "node() RF noncommitted context preview capability (reactivefiber.render.preview/v1; input {model, task} or {view, taskId, model?}, never both) with graph provenance; no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace",
    "ReactiveFiber reader adapter projecting NativeSnapshots from reactivefiber.render.preview/v1 envelopes into the observation projection",
  ],
  cells: [
    ["Feature", "node() RF noncommitted context preview capability (reactivefiber.render.preview/v1; input {model, task} or {view, taskId, model?}, never both) with graph provenance; no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"],
    ["Status", "landed-gated"],
    ["Caveats", "Bead wb-x32 open: 'Full interop contract remains open.' Preview deliberately yields null render/transaction IDs (no durable render); W10 acceptance is 'real render or honest blocker' - the landed slice is the noncommitted preview via the CLI envelope, not a committed render or production TS SDK interop."],
  ],
  tests: "Tests: test/workbench-native-rf-preview.test.ts, test/workbench-provider-envelope-audit.test.ts, test/workbench-ecosystem-native.test.ts, test/workbench-native-ecosystem.test.ts, test/workbench-provider-lifecycle.test.ts.",
  legacy: "TRACEABILITY 'Native ecosystem receipts': real RF noncommitted context cmd_994da817d4cd (initialized disposable workspace; output + graph provenance, no durable render ID); custody caps cmd_7e50a487da08 (malformed JSON, stdout/stderr caps, TERM/KILL cleanup); corrected envelope suite cmd_386a32a0323b (actual operation/workspace identity, zero noncommitted storage writes).",
  bead: "Bead wb-x32 (open).",
  contract:
    "Descriptor contract re-stated (wb-973.16, receipts/wb-973.16.md): the exclusive oneOf of the legacy {model, task} arm and the {view, taskId, model?} arm, rendering only --no-commit --no-input --json with the legacy argv frozen byte for byte (wb-973.1, wb-973.3; landing gate cmd_448b9c90d4bd), the operator-set swarm RF workspace root (wb-973.4, landing gate cmd_b1a13ceb80b6; wb-973.5, land-prep gate cmd_9af5362d3e08) and the RF_WORKSPACE and SWARM_RF_WORKSPACE hosted-agent locators (wb-973.6, wb-973.7; landing gate cmd_acbe436ec5c2).",
  tsx: "TSX-era receipt row (R9, 2026-10-26): receipts/wb-693.7.md, gated forge run rf-preview-tsx cmd_130f00c9f3ea against the operator-provisioned installed rf serving kind tsx with the pinned Deno 2.9.7 first on PATH, 2 of 2 rows passed: the success row (RF-TSX-RECEIPT cli_version 0.1.845, tsx_worker_spawns 1, tsx_runtime distribution_version 2.9.7) and the runtime-absent row (category unavailable, RF_COMPONENT_RUNTIME_ABSENT under a no-deno PATH); the R2 carrier keeps its stamped release (a re-pin moves only through the gated rf-preview route).",
} as const;
/** The rendered beginning of the committed descriptor-contract sentence (wb-973.16), where its falsifiers author their edits. */
const CONTRACT_MARKER = "Descriptor contract re-stated (wb-973.16, ";
/** The rendered beginning of the committed TSX-era receipt sentence (wb-693.7), where its falsifiers author their edits. */
const TSX_MARKER = "TSX-era receipt row (R9, ";

interface TsxSlots {
  date: string;
  receipt: string;
  cmd: string;
  engine: string;
  cliVersion: string;
  spawns: string;
}

/** The committed TSX-era receipt sentence as the page renders it (code span markup dropped), slots filled; the pinned Deno
 * release the success row's tsx_runtime reports stands in both engine slots. */
function tsxSentence(slots: TsxSlots): string {
  return `TSX-era receipt row (R9, ${slots.date}): receipts/${slots.receipt}.md, gated forge run rf-preview-tsx ${slots.cmd} against the operator-provisioned installed rf serving kind tsx with the pinned Deno ${slots.engine} first on PATH, 2 of 2 rows passed: the success row (RF-TSX-RECEIPT cli_version ${slots.cliVersion}, tsx_worker_spawns ${slots.spawns}, tsx_runtime distribution_version ${slots.engine}) and the runtime-absent row (category unavailable, RF_COMPONENT_RUNTIME_ABSENT under a no-deno PATH); the R2 carrier keeps its stamped release (a re-pin moves only through the gated rf-preview route).`;
}

/** tsxSentence() read back: date, receipt, cmd, the two engine slots, cli_version, spawn count. */
const TSX_SHAPE = new RegExp(
  `^TSX-era receipt row \\(R9, ([0-9]{4}-[0-9]{2}-[0-9]{2})\\): receipts/(${BEAD})\\.md, gated forge run rf-preview-tsx (cmd_[0-9a-f]{12}) against the operator-provisioned installed rf serving kind tsx with the pinned Deno (${RELEASE}) first on PATH, 2 of 2 rows passed: the success row \\(RF-TSX-RECEIPT cli_version (${RELEASE}), tsx_worker_spawns ([0-9]+), tsx_runtime distribution_version (${RELEASE})\\) and the runtime-absent row \\(category unavailable, RF_COMPONENT_RUNTIME_ABSENT under a no-deno PATH\\); the R2 carrier keeps its stamped release \\(a re-pin moves only through the gated rf-preview route\\)\\.$`,
);

function readTsxShape(sentence: string): { slots: TsxSlots; engines: string[] } | undefined {
  const match = TSX_SHAPE.exec(sentence);
  if (match === null) return undefined;
  const [, date = "", receipt = "", cmd = "", engine = "", cliVersion = "", spawns = "", distribution = ""] = match;
  return { slots: { date, receipt, cmd, engine, cliVersion, spawns }, engines: [engine, distribution] };
}

interface LeadSlots {
  carrier: string;
  date: string;
  receipt: string;
  retired: string;
}

/** The Evidence cell's committed lead sentence as the page renders it, slots filled. */
function evidenceLead(slots: LeadSlots): string {
  return `src/workbench/providers/reactivefiber.ts (reactivefiber.render.preview v1; contractSource from the single carrier REACTIVE_FIBER_CONTRACT_SOURCE = ${slots.carrier}, re-pinned ${slots.date} from receipts/${slots.receipt}.md; the earlier rf@${slots.retired} literal is retired).`;
}

/** evidenceLead() read back: carrier, re-pin date, receipt, retired release. */
const LEAD_SHAPE = new RegExp(
  `^src/workbench/providers/reactivefiber\\.ts \\(reactivefiber\\.render\\.preview v1; contractSource from the single carrier REACTIVE_FIBER_CONTRACT_SOURCE = (.+?), re-pinned ([0-9]{4}-[0-9]{2}-[0-9]{2}) from receipts/(${BEAD})\\.md; the earlier rf@(${RELEASE}) literal is retired\\)\\.$`,
);

function readLeadShape(sentence: string): LeadSlots | undefined {
  const match = LEAD_SHAPE.exec(sentence);
  if (match === null) return undefined;
  const [, carrier = "", date = "", receipt = "", retired = ""] = match;
  return { carrier, date, receipt, retired };
}

function carrierRelease(carrier: string): string | undefined {
  return /^rf@([0-9]+(?:\.[0-9]+)*):/.exec(carrier)?.[1];
}

const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: String.fromCodePoint(0xa0),
};

/** Numeric and the common named character references decoded; any other named reference becomes one non-ASCII stand-in. */
function decodeReferences(text: string): string {
  return text.replace(/&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    return NAMED_REFERENCES[name ?? ""] ?? String.fromCodePoint(0xfffd);
  });
}

/** The FOLDED KEY of rendered text (see the header). */
function foldKey(text: string): string {
  return decodeReferences(text)
    .normalize("NFKC")
    .replace(/[\s\p{Zs}]+/gu, " ")
    .replace(/[\p{Cc}\p{Cf}\p{Mn}\p{Me}]/gu, "")
    .replace(/ +/g, " ")
    .trim()
    .toLowerCase();
}

/** True when some prefix of `folded` reads as `key`: ASCII matches itself, each non-ASCII code point any 0-3 characters. */
function readsAsPrefix(folded: string, key: string): boolean {
  let reach = new Set<number>([0]);
  for (const char of folded) {
    if (reach.has(key.length)) return true;
    const wild = (char.codePointAt(0) ?? 0) > 0x7f;
    const next = new Set<number>();
    for (const position of reach) {
      if (wild) {
        for (let width = 0; width <= 3 && position + width <= key.length; width++) next.add(position + width);
      } else if (key[position] === char) {
        next.add(position + 1);
      }
    }
    if (next.size === 0) return false;
    reach = next;
  }
  return reach.has(key.length);
}

/** True when some run of `folded` reads as `key` (readsAsPrefix's reading, started at every code point). */
function readsAsContaining(folded: string, key: string): boolean {
  let reach = new Set<number>([0]);
  for (const char of folded) {
    if (reach.has(key.length)) return true;
    const wild = (char.codePointAt(0) ?? 0) > 0x7f;
    const next = new Set<number>([0]);
    for (const position of reach) {
      if (wild) {
        for (let width = 0; width <= 3 && position + width <= key.length; width++) next.add(position + width);
      } else if (key[position] === char) {
        next.add(position + 1);
      }
    }
    reach = next;
  }
  return reach.has(key.length);
}

function isW10Heading(folded: string): boolean {
  return readsAsPrefix(folded, W10_KEY) && !/^w10[0-9]/.test(folded);
}

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isHtml = (token: Token): token is Tokens.HTML => token.type === "html";
const isLink = (token: Token): token is Tokens.Link => token.type === "link";
/** Tokens whose text the page does not assert: hidden (html), pictures (image), struck through (del), or never shown. */
const UNASSERTED = new Set(["html", "image", "del", "def", "space", "hr", "checkbox"]);

/** Every token in `tokens` at any depth (cells, list items, block quotes, inline children), with whether it sits in a cell. */
function visit(tokens: readonly Token[], fn: (token: Token, inCell: boolean) => void, inCell = false): void {
  for (const token of tokens) {
    fn(token, inCell);
    if (isTable(token)) {
      for (const cell of [...token.header, ...token.rows.flat()]) visit(cell.tokens, fn, true);
    } else if (isList(token)) {
      for (const item of token.items) visit(item.tokens, fn, inCell);
    } else if ("tokens" in token && Array.isArray(token.tokens)) {
      visit(token.tokens, fn, inCell);
    }
  }
}

/** The text `tokens` render (see RENDERED TEXT): blocks joined by `separator`, inline runs concatenated. */
function rendered(tokens: readonly Token[], separator: string): string {
  const parts: string[] = [];
  for (const token of tokens) {
    if (UNASSERTED.has(token.type)) continue;
    if (token.type === "br") parts.push(" ");
    else if (token.type === "codespan" || token.type === "code" || token.type === "escape") parts.push(String(token.text));
    else if (isList(token)) parts.push(token.items.map((item) => rendered(item.tokens, "\n")).join("\n"));
    else if (isTable(token)) parts.push([token.header, ...token.rows].map((row) => row.map((cell) => rendered(cell.tokens, "")).join(" | ")).join("\n"));
    else if (token.type === "blockquote" && "tokens" in token && Array.isArray(token.tokens)) parts.push(rendered(token.tokens, "\n"));
    else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) parts.push(rendered(token.tokens, ""));
    else if ("text" in token && typeof token.text === "string") parts.push(decodeReferences(token.text));
  }
  return parts.join(separator);
}

function cellText(cell: Tokens.TableCell): string {
  return rendered(cell.tokens, "").replace(/[ \t\n\r\f]+/g, " ").trim();
}

/** The hrefs of the links a page asserts (the same skip set as rendered()). */
function assertedHrefs(tokens: readonly Token[]): string[] {
  const hrefs: string[] = [];
  for (const token of tokens) {
    if (UNASSERTED.has(token.type)) continue;
    if (isLink(token)) hrefs.push(token.href);
    if (isTable(token)) {
      for (const cell of [...token.header, ...token.rows.flat()]) hrefs.push(...assertedHrefs(cell.tokens));
    } else if (isList(token)) {
      for (const item of token.items) hrefs.push(...assertedHrefs(item.tokens));
    } else if ("tokens" in token && Array.isArray(token.tokens)) {
      hrefs.push(...assertedHrefs(token.tokens));
    }
  }
  return hrefs;
}

/** One complete HTML comment and only white space around it, as a browser ends it. */
function isCompleteComment(raw: string): boolean {
  const text = raw.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "");
  if (text === "<!-->" || text === "<!--->") return true;
  if (!text.startsWith("<!--") || !text.endsWith("-->") || text.length < 7) return false;
  const body = text.slice(4, -3);
  return !body.startsWith(">") && !body.startsWith("->") && !body.includes("-->") && !body.includes("--!>");
}

/** A bare start or end tag (no attributes) naming an element outside ESCAPING_ELEMENTS. */
function isBareConfinedTag(raw: string): boolean {
  const name = /^<\/?([A-Za-z][A-Za-z0-9-]*)[ \t]*\/?>$/.exec(raw)?.[1];
  return name !== undefined && !ESCAPING_ELEMENTS.has(name.toLowerCase());
}

/** Every html token of the page that is not a complete comment, unless it is a bare in-cell tag where `admitsCellTags`. */
function htmlRefusals(tokens: TokensList, label: string, admitsCellTags: (top: number) => boolean): string[] {
  const refusals: string[] = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token, inCell) => {
      if (!isHtml(token) || isCompleteComment(token.raw)) return;
      if (inCell && admitsCellTags(index) && isBareConfinedTag(token.raw)) return;
      refusals.push(`${label} holds raw HTML ${JSON.stringify(token.raw.slice(0, 60))} that can hide rendered text (only complete comments are admitted here)`);
    });
  }
  return refusals;
}

interface Section {
  start: number;
  end: number;
}

/** The W10 section bounds, refused unless exactly one heading on the page reads as W10 and it is the top-level level-2 one. */
function w10Section(tokens: TokensList): { section?: Section; findings: string[] } {
  const found: Array<{ top: number; nested: boolean; depth: number }> = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token) => {
      if (isHeading(token) && isW10Heading(foldKey(rendered(token.tokens, "")))) found.push({ top: index, nested: token !== top, depth: token.depth });
    });
  }
  const only = found[0];
  if (found.length !== 1 || only === undefined) return { findings: [`${found.length} headings on the page read as a W10 heading, not exactly one`] };
  if (only.nested || only.depth !== 2) return { findings: ["the one heading that reads as a W10 heading is not the top-level level-2 heading"] };
  let end = tokens.length;
  for (let index = only.top + 1; index < tokens.length; index++) {
    const token = tokens[index];
    if (token !== undefined && isHeading(token) && token.depth <= 2) {
      end = index;
      break;
    }
  }
  return { section: { start: only.top, end }, findings: [] };
}

interface ClaimRow {
  top: number;
  nested: boolean;
  header: boolean;
  table: Tokens.Table;
  cells: Tokens.TableCell[];
}

/** Every table row on the page (header or body, any depth) whose rendered first cell reads as beginning with CLAIM_KEY. */
function claimRows(tokens: TokensList): ClaimRow[] {
  const found: ClaimRow[] = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token) => {
      if (!isTable(token)) return;
      const rows: Array<[boolean, Tokens.TableCell[]]> = [[true, token.header], ...token.rows.map((row): [boolean, Tokens.TableCell[]] => [false, row])];
      for (const [header, cells] of rows) {
        const first = cells[0];
        if (first !== undefined && readsAsPrefix(foldKey(cellText(first)), CLAIM_KEY)) found.push({ top: index, nested: token !== top, header, table: token, cells });
      }
    });
  }
  return found;
}

/** The WITHDRAWN CLAIM diagnosis for one cell (the judge appends its reason; the falsifier rows pin this text). */
const withdrawnCause = (cell: string, claim: string): string => `a row that reads as the W10 claim row renders the withdrawn claim ${JSON.stringify(claim)} in its ${cell} cell`;
/** The diagnosis for a claim row whose rendered Feature cell lacks PLANE_SCOPED_CLAUSE. */
const PLANE_SCOPED_CAUSE = `the W10 claim row's rendered Feature cell does not carry the plane-scoped clause ${JSON.stringify(PLANE_SCOPED_CLAUSE)}`;

/** A claim row cell's name in a diagnosis: its column header on a body row, its position on a header row. */
function cellLabel(row: ClaimRow, index: number): string {
  const header = row.header ? undefined : row.table.header[index];
  return header === undefined ? `column ${index + 1}` : cellText(header);
}

/** Why rows that read as the W10 claim row render a withdrawn claim (WITHDRAWN CLAIM): every rendered cell of every such row. */
function withdrawnClaimFindings(rows: readonly ClaimRow[]): string[] {
  const findings: string[] = [];
  for (const row of rows) {
    for (const [index, cell] of row.cells.entries()) {
      const folded = foldKey(cellText(cell));
      for (const claim of WITHDRAWN_CLAIMS) {
        if (readsAsContaining(folded, claim)) findings.push(withdrawnCause(cellLabel(row, index), claim));
      }
    }
  }
  return findings;
}

/** Why the claim row's rendered Feature cell (its first cell, the one read as CLAIM_KEY) does not carry PLANE_SCOPED_CLAUSE
 * as exact rendered text (never folded: the clause is required, so a look-alike or an invisible inside it is refused). */
function planeScopedFindings(row: ClaimRow): string[] {
  const feature = row.cells[0];
  return feature !== undefined && cellText(feature).includes(PLANE_SCOPED_CLAUSE) ? [] : [PLANE_SCOPED_CAUSE];
}

/** The WITHDRAWN CLAIM reading alone over a page's claim rows (the L7 row). */
function withdrawnClaimView(page: string): string[] {
  const rows = claimRows(new Lexer({ gfm: true }).lex(page));
  const row = rows[0];
  if (rows.length !== 1 || row === undefined) return [...withdrawnClaimFindings(rows), `${rows.length} table rows on the page read as the W10 claim row, not exactly one`];
  return [...withdrawnClaimFindings(rows), ...planeScopedFindings(row)];
}

/** Rendered text read as a cell reads it: every white-space run one space, trimmed. */
function collapsed(text: string): string {
  return text.replace(/[ \t\n\r\f]+/g, " ").trim();
}

/** Why the headings above the W10 heading are not its committed chain: the page title first, then no level-1 heading. */
function ancestryFindings(tokens: TokensList, section: Section): string[] {
  const titleIndex = tokens.findIndex((token) => isHeading(token));
  const title = tokens[titleIndex];
  if (title === undefined || !isHeading(title) || titleIndex >= section.start) {
    return [`the page renders no heading above the W10 heading (its committed level-1 title ${JSON.stringify(W10_COMMITTED.title)} is missing)`];
  }
  const findings: string[] = [];
  const titleText = collapsed(rendered(title.tokens, ""));
  if (title.depth !== 1 || titleText !== W10_COMMITTED.title) {
    findings.push(`the page's first heading renders ${JSON.stringify(titleText)} at level ${title.depth}, not its committed level-1 title ${JSON.stringify(W10_COMMITTED.title)}`);
  }
  for (const top of tokens.slice(titleIndex + 1, section.start)) {
    visit([top], (token) => {
      if (isHeading(token) && token.depth === 1) {
        findings.push(`a level-1 heading ${JSON.stringify(collapsed(rendered(token.tokens, "")))} stands between the page title and the W10 heading (W10 must stay a section of the page title)`);
      }
    });
  }
  return findings;
}

/** Top-level blocks that render nothing: white space, link reference definitions, and html (a complete comment is stripped;
 * any other html is refused by the page check). */
const SILENT_BLOCKS: ReadonlySet<string> = new Set(["space", "def", "html"]);

/** Why the W10 section is not exactly its committed blocks: the heading's text, then exactly one table (its committed header
 * row and ordered first cells) and no other block. */
function sectionFindings(tokens: TokensList, section: Section): string[] {
  const findings: string[] = [];
  const heading = tokens[section.start];
  const text = heading !== undefined && isHeading(heading) ? collapsed(rendered(heading.tokens, "")) : "";
  if (text !== W10_COMMITTED.heading) findings.push(`the W10 heading renders ${JSON.stringify(text)}, not its committed ${JSON.stringify(W10_COMMITTED.heading)}`);
  const tables: Tokens.Table[] = [];
  for (const token of tokens.slice(section.start + 1, section.end)) {
    if (SILENT_BLOCKS.has(token.type)) continue;
    if (isTable(token)) {
      tables.push(token);
    } else if (isHeading(token)) {
      findings.push(`the W10 section holds a level-${token.depth} heading ${JSON.stringify(collapsed(rendered(token.tokens, "")))} (a subsection inside the W10 section belongs to it; only the committed table may follow the heading)`);
    } else {
      findings.push(`the W10 section holds a ${token.type} block ${JSON.stringify(collapsed(rendered([token], " ")).slice(0, 160))} beyond its committed heading and table`);
    }
  }
  const table = tables[0];
  if (tables.length !== 1 || table === undefined) return [...findings, `the W10 section holds ${tables.length} tables, not exactly its one committed table`];
  const header = table.header.map(cellText);
  if (JSON.stringify(header) !== JSON.stringify(W10_COMMITTED.header)) {
    findings.push(`the W10 table's rendered header row reads ${JSON.stringify(header)}, not its committed ${JSON.stringify(W10_COMMITTED.header)}`);
  }
  const firstCells = table.rows.map((row) => (row[0] === undefined ? "" : cellText(row[0])));
  if (JSON.stringify(firstCells) !== JSON.stringify(W10_COMMITTED.firstCells)) {
    findings.push(`the W10 table's rendered first cells read ${JSON.stringify(firstCells)}, not its committed ${JSON.stringify(W10_COMMITTED.firstCells)}`);
  }
  return findings;
}

/** Why the claim row's Feature, Status and Caveats cells (located by header) do not render their committed text. */
function claimCellFindings(row: ClaimRow): string[] {
  const findings: string[] = [];
  for (const [name, committed] of W10_COMMITTED.cells) {
    const index = row.table.header.findIndex((cell) => cellText(cell) === name);
    const cell = row.cells[index];
    if (index < 0 || cell === undefined) findings.push(`the W10 claim row's table names no ${name} column`);
    else if (cellText(cell) !== committed) findings.push(`the W10 claim row's rendered ${name} cell reads ${JSON.stringify(cellText(cell).slice(0, 200))}, not its committed text`);
  }
  return findings;
}

/** Why the rendered Evidence cell is not its seven committed sentences in order (the stamped one is judged by its slice). */
function evidenceFindings(evidence: string, carrier: string): string[] {
  const committed: ReadonlyArray<readonly [string, (sentence: string) => boolean]> = [
    ["lead sentence", (sentence) => readLeadShape(sentence) !== undefined],
    ["Tests sentence", (sentence) => sentence === W10_COMMITTED.tests],
    ["legacy receipt clause", (sentence) => sentence === W10_COMMITTED.legacy],
    ["bead sentence", (sentence) => sentence === W10_COMMITTED.bead],
    ["stamped receipt sentence", (sentence) => readsAsPrefix(foldKey(sentence), STAMP_KEY)],
    ["descriptor contract sentence", (sentence) => sentence === W10_COMMITTED.contract],
    ["TSX-era receipt sentence", (sentence) => sentence === W10_COMMITTED.tsx],
  ];
  const findings: string[] = [];
  const read = new Map<string, string>();
  let next = 0;
  for (const sentence of evidence.split(/(?<=\.) /)) {
    const found = committed.findIndex(([, accepts], index) => index >= next && accepts(sentence));
    if (found < 0) {
      findings.push(`the rendered Evidence cell holds a sentence outside its committed slice: ${JSON.stringify(sentence)}`);
      continue;
    }
    for (const [label] of committed.slice(next, found)) findings.push(`the rendered Evidence cell lacks its committed ${label}`);
    read.set(committed[found]?.[0] ?? "", sentence);
    next = found + 1;
  }
  for (const [label] of committed.slice(next)) findings.push(`the rendered Evidence cell lacks its committed ${label}`);
  const lead = readLeadShape(read.get("lead sentence") ?? "");
  const stamp = readStampShape(read.get("stamped receipt sentence") ?? "");
  if (lead !== undefined && lead.carrier !== carrier) {
    findings.push(`the Evidence lead sentence renders the carrier ${JSON.stringify(lead.carrier)}, not the R2 carrier ${JSON.stringify(carrier)}`);
  }
  if (lead !== undefined && stamp !== undefined && lead.receipt !== stamp.slots.receipt) {
    findings.push(`the Evidence lead sentence re-pins from receipts/${lead.receipt}.md, not from the stamped receipt receipts/${stamp.slots.receipt}.md`);
  }
  return findings;
}

interface ClaimView {
  findings: string[];
  evidence?: string;
  row?: string;
}

/** The rendered W10 claim row of a feature-matrix page: its Evidence cell and its whole row, or why it cannot be read. */
function w10View(page: string): ClaimView {
  const tokens = new Lexer({ gfm: true }).lex(page);
  const { section, findings } = w10Section(tokens);
  if (section !== undefined) findings.push(...ancestryFindings(tokens, section), ...sectionFindings(tokens, section));
  findings.push(...htmlRefusals(tokens, MATRIX, (top) => section === undefined || top < section.start || top >= section.end));
  const rows = claimRows(tokens);
  findings.push(...withdrawnClaimFindings(rows));
  const row = rows[0];
  if (rows.length !== 1 || row === undefined) return { findings: [...findings, `${rows.length} table rows on the page read as the W10 claim row, not exactly one`] };
  if (section === undefined) return { findings };
  if (row.top < section.start || row.top >= section.end) return { findings: [...findings, "the W10 claim row is not inside the W10 section"] };
  if (row.nested || row.header) return { findings: [...findings, "the W10 claim row is not a body row of a top-level table in the W10 section"] };
  const evidenceIndex = row.table.header.findIndex((cell) => cellText(cell) === EVIDENCE_HEADER);
  const evidence = row.cells[evidenceIndex];
  if (evidenceIndex < 0 || evidence === undefined) return { findings: [...findings, "the W10 claim row's table names no Evidence column"] };
  findings.push(...claimCellFindings(row), ...planeScopedFindings(row));
  return { findings, evidence: cellText(evidence), row: row.cells.map(cellText).join(" | ") };
}

/** The sentences of a rendered cell that read as a stamped receipt sentence. */
function stampedSentences(evidence: string): string[] {
  return evidence.split(/(?<=\.) /).filter((sentence) => readsAsPrefix(foldKey(sentence), STAMP_KEY));
}

function readStampShape(sentence: string): { slots: StampSlots; releases: string[] } | undefined {
  const match = STAMP_SHAPE.exec(sentence);
  if (match === null) return undefined;
  const [, date = "", receipt = "", cmd = "", measured = "", cliVersion = "", repinned = "", pinBead = ""] = match;
  return { slots: { date, receipt, cmd, release: measured, pinBead }, releases: [measured, cliVersion, repinned] };
}

/** The JSON object text that opens at `open` and closes on the same line, or undefined. */
function balancedObject(text: string, open: number): string | undefined {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = open; index < text.length; index++) {
    const char = text[index];
    if (char === "\n") return undefined;
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) return text.slice(open, index + 1);
    }
  }
  return undefined;
}

function stampRelease(json: string | undefined): string | undefined {
  if (json === undefined) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return undefined;
  }
  if (parsed === null || typeof parsed !== "object" || !("cli_version" in parsed)) return undefined;
  const release = parsed.cli_version;
  return typeof release === "string" && release !== "" ? release : undefined;
}

interface ReceiptStamp {
  release?: string;
  entryIds: ReadonlySet<string>;
  /** The ids the exact run-of-record clauses of the entry's opening level-1/2 heading name, in order (RUN OF RECORD). */
  records: readonly string[];
  /** Whether that heading, its exact clauses taken out, still reads as naming a receipt of record under the FOLDED KEY. */
  strayRecord: boolean;
  /** The first cmd_* id (undefined when none) of each rendered line of the entry that reads as beginning "Run of record:". */
  runLines: ReadonlyArray<string | undefined>;
}

/** RUN OF RECORD: what an entry's opening heading and its "Run of record:" lines name as the entry's run of record. */
function recordReading(entry: readonly Token[], text: string): Pick<ReceiptStamp, "records" | "strayRecord" | "runLines"> {
  const opening = entry[0];
  const heading = opening !== undefined && isHeading(opening) && opening.depth <= 2 ? rendered(opening.tokens, "") : "";
  const records = [...heading.matchAll(RECORD_CLAUSE_ALL)].map((match) => match[1] ?? "");
  const strayRecord = readsAsContaining(foldKey(heading.replace(RECORD_CLAUSE_ALL, " ")), RECORD_KEY);
  const runLines = text
    .split("\n")
    .filter((line) => readsAsPrefix(foldKey(line), RUN_KEY))
    .map((line) => line.match(CMD_ID_ALL)?.[0]);
  return { records, strayRecord, runLines };
}

/** A receipt file's newest rendered RF_PREVIEW_RECEIPT line and the cmd ids its entry renders, or why it cannot be read. */
function receiptView(markdown: string, label: string): { findings: string[]; newest?: ReceiptStamp } {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, label, () => false);
  const entries: Token[][] = [];
  for (const token of tokens) {
    if (entries.length === 0 || (isHeading(token) && token.depth <= 2)) entries.push([]);
    entries[entries.length - 1]?.push(token);
  }
  let newest: ReceiptStamp | undefined;
  for (const entry of entries) {
    const text = rendered(entry, "\n");
    const objects: Array<string | undefined> = [];
    for (let cursor = text.indexOf(STAMP_MARK); cursor >= 0; cursor = text.indexOf(STAMP_MARK, cursor + STAMP_MARK.length)) objects.push(balancedObject(text, cursor + STAMP_MARK.length - 1));
    if (objects.length > 0) newest = { release: stampRelease(objects.at(-1)), entryIds: new Set(text.match(CMD_ID_ALL) ?? []), ...recordReading(entry, text) };
  }
  return { findings, newest };
}

function hasToken(text: string, token: string): boolean {
  return new RegExp(`(?<![0-9A-Za-z_])${token}(?![0-9A-Za-z_])`).test(text);
}

/** RUN OF RECORD (wb-j4lx, owner R691 F4): why the stamped cmd slot does not bind to the run of record of the entry carrying the newest stamp line. */
function recordFindings(receipt: string, cmd: string, newest: ReceiptStamp): string[] {
  const entry = `receipts/${receipt}.md: the entry carrying the newest stamp line`;
  const [record] = newest.records;
  if (newest.records.length !== 1 || record === undefined) {
    return [`${entry} names ${newest.records.length} runs of record in its heading; exactly one "(receipt of record cmd_*)" clause binds the stamped run`];
  }
  if (newest.strayRecord) return [`${entry} has a heading that reads as naming a receipt of record outside its one "(receipt of record ${record})" clause`];
  const findings: string[] = [];
  if (newest.runLines.length === 0) findings.push(`${entry} renders no "Run of record:" line confirming its run of record ${record}`);
  for (const first of newest.runLines) {
    if (first !== record) findings.push(`${entry} names its run of record ${record} in its heading but ${first ?? "no cmd_* id"} first in a "Run of record:" line`);
  }
  if (cmd !== record) findings.push(`the stamped sentence names ${cmd}, which is not ${record}, the run of record of the receipt entry carrying the newest stamp line`);
  return findings;
}

/** Every reason the rendered W10 claim fails the stamped-release rule; empty means it holds. Pure over its three inputs. */
function judgeW10Claim(page: string, readReceipt: ReadReceipt, carrier: string): string[] {
  const findings: string[] = [];
  const carried = carrierRelease(carrier);
  if (carried === undefined) findings.push(`carrier ${JSON.stringify(carrier)} is not rf@<release>:<schema>`);
  const view = w10View(page);
  findings.push(...view.findings);
  if (view.evidence === undefined || view.row === undefined) return findings;
  findings.push(...evidenceFindings(view.evidence, carrier));
  for (const id of LEGACY_UNSTAMPED_IDS) {
    if (!hasToken(view.evidence, id)) findings.push(`historical receipt id ${id} is not in the rendered Evidence cell (new receipts are added, history is never rewritten)`);
  }
  for (const match of view.row.replace(RETIREMENT_CLAUSE_ALL, "").matchAll(RELEASE_TOKEN_ALL)) {
    if (match[1] !== carried) findings.push(`the rendered row names rf@${match[1] ?? ""} outside the retirement clause; only the carrier release ${carried ?? "(none)"} may stand`);
  }
  const stamped = stampedSentences(view.evidence);
  const sentence = stamped[0];
  if (stamped.length !== 1 || sentence === undefined) {
    findings.push(stamped.length === 0 ? "the rendered Evidence cell carries no stamped receipt sentence" : `${stamped.length} rendered sentences read as a stamped receipt sentence, not exactly one`);
    return findings;
  }
  const shape = readStampShape(sentence);
  if (shape === undefined) {
    findings.push(`the stamped sentence is not the committed stamped-sentence slice: ${JSON.stringify(sentence)}`);
    return findings;
  }
  const { receipt, cmd } = shape.slots;
  const text = readReceipt(receipt);
  if (text === undefined) {
    findings.push(`the stamped sentence cites receipts/${receipt}.md but that receipt file does not exist`);
    return findings;
  }
  const stamp = receiptView(text, `receipts/${receipt}.md`);
  findings.push(...stamp.findings);
  if (stamp.newest === undefined) {
    findings.push(`receipts/${receipt}.md renders no RF_PREVIEW_RECEIPT line`);
    return findings;
  }
  const release = stamp.newest.release;
  if (release === undefined) {
    findings.push(`receipts/${receipt}.md: its newest rendered RF_PREVIEW_RECEIPT line carries no string cli_version`);
    return findings;
  }
  if (release !== carried) findings.push(`receipts/${receipt}.md stamped release ${release} differs from the carrier release ${carried ?? "(none)"}`);
  if (LEGACY_UNSTAMPED_IDS.includes(cmd)) findings.push(`the stamped sentence names ${cmd}, a legacy unstamped receipt (legacy unstamped ids do not count)`);
  else if (!stamp.newest.entryIds.has(cmd)) findings.push(`the stamped sentence names ${cmd}, which the receipt entry carrying the newest stamp line does not render`);
  findings.push(...recordFindings(receipt, cmd, stamp.newest));
  if (sentence !== stampSentence({ ...shape.slots, release })) {
    findings.push(`the stamped sentence does not equal its slice with the stamped release ${release} (releases read ${shape.releases.join(", ")})`);
  }
  return findings;
}

/** The live page's one stamped sentence and its slots (for the live rows), or undefined. */
function stampedParts(page: string): { sentence: string; slots: StampSlots; releases: string[] } | undefined {
  const evidence = w10View(page).evidence;
  const stamped = evidence === undefined ? [] : stampedSentences(evidence);
  const sentence = stamped[0];
  const shape = stamped.length === 1 && sentence !== undefined ? readStampShape(sentence) : undefined;
  return sentence === undefined || shape === undefined ? undefined : { sentence, ...shape };
}

/** The sentences of a rendered cell that read as a TSX-era receipt sentence. */
function tsxSentences(evidence: string): string[] {
  return evidence.split(/(?<=\.) /).filter((sentence) => readsAsPrefix(foldKey(sentence), TSX_KEY));
}

interface TsxEntry {
  /** Every RF-TSX-RECEIPT line of the entry, parsed (undefined when the line is not one JSON object). */
  lines: ReadonlyArray<Record<string, unknown> | undefined>;
  record: Pick<ReceiptStamp, "records" | "strayRecord" | "runLines">;
}

/** One RF-TSX-RECEIPT {json} object, or undefined when it is not one JSON object. */
function tsxObject(json: string | undefined): Record<string, unknown> | undefined {
  if (json === undefined) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return undefined;
  }
  return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : undefined;
}

/** The newest entry of a receipt file that renders RF-TSX-RECEIPT lines (entries run between top-level level-1/2 headings). */
function tsxReceiptView(markdown: string, label: string): { findings: string[]; newest?: TsxEntry } {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, label, () => false);
  const entries: Token[][] = [];
  for (const token of tokens) {
    if (entries.length === 0 || (isHeading(token) && token.depth <= 2)) entries.push([]);
    entries[entries.length - 1]?.push(token);
  }
  let newest: TsxEntry | undefined;
  for (const entry of entries) {
    const text = rendered(entry, "\n");
    const lines: Array<Record<string, unknown> | undefined> = [];
    for (let cursor = text.indexOf(TSX_MARK); cursor >= 0; cursor = text.indexOf(TSX_MARK, cursor + TSX_MARK.length)) lines.push(tsxObject(balancedObject(text, cursor + TSX_MARK.length - 1)));
    if (lines.length > 0) newest = { lines, record: recordReading(entry, text) };
  }
  return { findings, newest };
}

/** Why one row's fields do not carry what R9 requires and the sentence states. */
function tsxRowFindings(receipt: string, name: (typeof TSX_ROW_NAMES)[number], row: Record<string, unknown>, slots: TsxSlots): string[] {
  const where = `receipts/${receipt}.md: ${name} row`;
  const findings: string[] = [];
  if (name === "success") {
    const cli = row.cli_version;
    if (typeof cli !== "string" || cli === "") findings.push(`${where} cli_version ${JSON.stringify(cli)} is not a non-empty string`);
    if (cli !== slots.cliVersion) findings.push(`${where} cli_version ${JSON.stringify(cli)}, not the sentence's ${slots.cliVersion}`);
    const spawns = row.tsx_worker_spawns;
    if (typeof spawns !== "number" || !Number.isSafeInteger(spawns) || spawns < 1) findings.push(`${where} tsx_worker_spawns ${JSON.stringify(spawns)} is not a count of at least 1`);
    if (spawns !== Number(slots.spawns)) findings.push(`${where} tsx_worker_spawns ${JSON.stringify(spawns)}, not the sentence's ${slots.spawns}`);
    const distribution = row.distribution_version;
    if (typeof distribution !== "string" || distribution === "") findings.push(`${where} distribution_version ${JSON.stringify(distribution)} is not a non-empty string`);
    if (distribution !== slots.engine) findings.push(`${where} distribution_version ${JSON.stringify(distribution)}, not the sentence's ${slots.engine}`);
    const fingerprint = row.contract_fingerprint;
    if (typeof fingerprint !== "string" || !TSX_FINGERPRINT.test(fingerprint)) findings.push(`${where} contract_fingerprint ${JSON.stringify(fingerprint)} does not have the tier's fingerprint shape`);
  } else {
    if (row.category !== "unavailable") findings.push(`${where} category ${JSON.stringify(row.category)}, not "unavailable"`);
    if (typeof row.message !== "string" || !row.message.includes(RUNTIME_ABSENT_CODE)) findings.push(`${where} message ${JSON.stringify(row.message)} does not contain ${RUNTIME_ABSENT_CODE}`);
  }
  return findings;
}

/** RUN OF RECORD on the TSX entry: why the sentence's cmd slot is not that entry's run of record. */
function tsxRecordFindings(receipt: string, cmd: string, record: TsxEntry["record"]): string[] {
  const entry = `receipts/${receipt}.md: the entry carrying the newest RF-TSX-RECEIPT lines`;
  const [named] = record.records;
  if (record.records.length !== 1 || named === undefined) {
    return [`${entry} names ${record.records.length} runs of record in its heading; exactly one "(receipt of record cmd_*)" clause binds the TSX-era run`];
  }
  if (record.strayRecord) return [`${entry} has a heading that reads as naming a receipt of record outside its one "(receipt of record ${named})" clause`];
  const findings: string[] = [];
  if (record.runLines.length === 0) findings.push(`${entry} renders no "Run of record:" line confirming its run of record ${named}`);
  for (const first of record.runLines) {
    if (first !== named) findings.push(`${entry} names its run of record ${named} in its heading but ${first ?? "no cmd_* id"} first in a "Run of record:" line`);
  }
  if (cmd !== named) findings.push(`the TSX-era receipt sentence names ${cmd}, which is not ${named}, the run of record of the receipt entry carrying the newest RF-TSX-RECEIPT lines`);
  return findings;
}

/** TSX-ERA RECEIPT ROW: every reason the live page's TSX-era receipt sentence does not bind to its receipt; empty when it holds. */
function judgeTsxRow(page: string, readReceipt: ReadReceipt): string[] {
  const view = w10View(page);
  if (view.evidence === undefined) return [...view.findings, "the W10 claim row's Evidence cell cannot be read, so no TSX-era receipt sentence is judged"];
  const sentences = tsxSentences(view.evidence);
  const sentence = sentences[0];
  if (sentences.length !== 1 || sentence === undefined) {
    return [sentences.length === 0 ? "the rendered Evidence cell carries no TSX-era receipt sentence" : `${sentences.length} rendered sentences read as a TSX-era receipt sentence, not exactly one`];
  }
  const shape = readTsxShape(sentence);
  if (shape === undefined) return [`the TSX-era receipt sentence is not the committed TSX-era slice: ${JSON.stringify(sentence)}`];
  const { receipt, cmd } = shape.slots;
  const text = readReceipt(receipt);
  if (text === undefined) return [`the TSX-era receipt sentence cites receipts/${receipt}.md but that receipt file does not exist`];
  const read = tsxReceiptView(text, `receipts/${receipt}.md`);
  const findings = [...read.findings];
  if (read.newest === undefined) return [...findings, `receipts/${receipt}.md renders no RF-TSX-RECEIPT line`];
  const rows = new Map<string, Array<Record<string, unknown>>>();
  for (const line of read.newest.lines) {
    if (line === undefined) {
      findings.push(`receipts/${receipt}.md: an RF-TSX-RECEIPT line of its newest TSX entry is not one JSON object`);
      continue;
    }
    const name = String(line.row);
    if (!(TSX_ROW_NAMES as readonly string[]).includes(name)) findings.push(`receipts/${receipt}.md: its newest TSX entry renders an RF-TSX-RECEIPT row named ${JSON.stringify(line.row)}, outside the R9 pair`);
    else rows.set(name, [...(rows.get(name) ?? []), line]);
  }
  for (const name of TSX_ROW_NAMES) {
    const found = rows.get(name) ?? [];
    const row = found[0];
    if (found.length !== 1 || row === undefined) findings.push(`receipts/${receipt}.md: its newest TSX entry renders ${found.length} ${name} rows, not exactly one`);
    else findings.push(...tsxRowFindings(receipt, name, row, shape.slots));
  }
  findings.push(...tsxRecordFindings(receipt, cmd, read.newest.record));
  // Two arms (wb-ojur): an engine split is named on its own, so the equality is falsified apart from the slice check.
  if (shape.engines[0] !== shape.engines[1]) findings.push(`the TSX-era receipt sentence's two engine slots read ${shape.engines.join(" and ")}, not one pinned Deno release`);
  if (sentence !== tsxSentence(shape.slots)) findings.push(`the TSX-era receipt sentence does not equal its slice (engine slots read ${shape.engines.join(", ")})`);
  return findings;
}

/** T-ANCHOR's second source: the field names each receipt() call of the R8 tier prints, by row, read with the TypeScript parser. */
function tierReceiptFields(source: string): string[] {
  const file = ts.createSourceFile(TSX_TIER, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const fields: string[] = [];
  const walk = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "receipt") {
      const [row, object] = node.arguments;
      if (row !== undefined && ts.isStringLiteral(row) && object !== undefined && ts.isObjectLiteralExpression(object)) {
        for (const property of object.properties) {
          if ((ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) && ts.isIdentifier(property.name)) fields.push(`${row.text}:${property.name.text}`);
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(file);
  return fields;
}

/** T-ANCHOR's first source: the `<row>:<field>` names the newest TSX entry of a receipt renders (its row key excluded). */
function receiptTsxFields(markdown: string): string[] {
  const newest = tsxReceiptView(markdown, "receipt").newest;
  return (newest?.lines ?? []).flatMap((line) => (line === undefined ? [] : Object.keys(line).filter((key) => key !== "row").map((key) => `${String(line.row)}:${key}`)));
}

/** `text` with every regular-expression metacharacter escaped. */
const quotedPattern = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** This file, whose TSX-era judge T-ARMS reads (the judge is the source of truth for which diagnoses a pin must draw). */
const SELF = "test/workbench-w10-stamped-claim-guard.test.ts";
/** The shared W10 view judgeTsxRow opens with (the module-level declaration of this name): its arms are judged by the stamped-claim
 * tables above, so T-ARMS never enters it. */
const SHARED_VIEW = "w10View";
/** The name a direct eval is called by: T-ARMS refuses every call of it in this file (FAIL CLOSED), since a direct eval can read and
 * write any binding in scope, the lists and functions T-ARMS reads included. */
const DIRECT_EVAL = "eval";
/** T-ROSTER's source: the TSX receipt's claim of record naming this guard's rows (wb-693.7: "... rows T0 to T<n>)"). */
const TSX_ROSTER_CLAUSE_ALL = new RegExp(`${quotedPattern(SELF)} pins it whole and binds it to this entry \\(TSX-ERA RECEIPT ROW, rows T0 to T([0-9]+)\\)`, "g");
/** T-ROSTER's reading: the last row each claim of record in `receipt` names, read as the receipt RENDERS (T-ROSTER-RENDERED). */
const rosterClaims = (receipt: string): number[] => [...rendered(new Lexer({ gfm: true }).lex(receipt), "\n").matchAll(TSX_ROSTER_CLAUSE_ALL)].map((match) => Number(match[1]));

/** One diagnosis arm T-ARMS reads: its pattern (anchored at both ends, each substitution any text) and the literal pieces its
 * substitutions separate (T-ARMS-ANCHORED reads them). */
interface JudgeArm {
  pattern: RegExp;
  pieces: readonly string[];
}

/** What T-ARMS reads from the judge's source: every arm in the judge's order, and every refusal the header's FAIL CLOSED
 * paragraph names, each as `<reason> (line <n>): <statement>` (T-ARMS requires none). */
interface ArmsReading {
  arms: readonly JudgeArm[];
  unread: readonly string[];
}

/** A function T-ARMS enters: a function declaration with a body, or a const binding of an arrow or function expression. */
type ArmCallable = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;
/** A name as T-ARMS resolves it, from the one declaration the TypeScript checker binds the reference to: a function it enters, a
 * generator function (never entered), a const with its initializer and the top-level function declaring it (undefined at module
 * level), or anything else (a let, a var, a parameter, an import, a class, a destructured or undeclared name, a name with more
 * than one declaration). */
type ArmBinding =
  | { kind: "callable"; name: string; callable: ArmCallable }
  | { kind: "generator"; name: string }
  | { kind: "const"; name: string; declared: ts.Identifier; initializer: ts.Expression; scope: ArmCallable | undefined }
  | { kind: "other"; name: string };
/** A reader of one flow position: a diagnosis list or one diagnosis. */
type ArmFlow = (scope: ArmCallable | undefined, node: ts.Expression, path: readonly number[], chain: readonly ArmCallable[]) => void;

/** The methods T-ARMS reads as adding diagnoses to a list it traces; a use of such a list other than these calls, a spread or a
 * return the header's FAIL CLOSED paragraph admits is unread. */
const ARM_ADDERS: readonly string[] = ["push", "unshift"];

/** The TypeScript checker over `file` alone (no lib, no module resolution). T-ARMS asks it one thing: which declaration a name is
 * bound to at a reference, the binding the name's lexical scope there gives it (wb-m14y: its gate's G2 and G2b). */
function bindingChecker(file: ts.SourceFile): ts.TypeChecker {
  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === file.fileName ? file : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "",
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === file.fileName,
    readFile: () => undefined,
  };
  return ts.createProgram({ rootNames: [file.fileName], options: { noLib: true, noResolve: true, types: [] }, host }).getTypeChecker();
}

/** T-ARMS's source (FLOW READING, wb-m14y): the TSX-era judge's arms, read from `source` with the TypeScript parser by following
 * the diagnosis flow back from judgeTsxRow's return statements through exactly the forms the header's FLOW READING paragraph
 * names, in the order it names; and, as an unread entry, every construct its FAIL CLOSED paragraph refuses. */
function readJudgeArms(source: string): ArmsReading {
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const checker = bindingChecker(file);
  const unread = new Set<string>();
  const statementOf = (node: ts.Node): ts.Node => (node.parent === undefined || ts.isSourceFile(node.parent) || ts.isBlock(node.parent) ? node : statementOf(node.parent));
  const refuse = (node: ts.Node, why: string): void => {
    const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    unread.add(`${why} (line ${line}): ${statementOf(node).getText(file).replace(/\s+/g, " ").slice(0, 120)}`);
  };
  const isWrapper = (node: ts.Node): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion =>
    ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node);
  const unwrapped = (node: ts.Expression): ts.Expression => (isWrapper(node) ? unwrapped(node.expression) : node);
  const outer = (node: ts.Node): ts.Node => (node.parent !== undefined && isWrapper(node.parent) ? outer(node.parent) : node);
  const ownerOf = (node: ts.Node): ts.Node | undefined => (node.parent === undefined || ts.isFunctionLike(node.parent) ? node.parent : ownerOf(node.parent));
  // A TYPE POSITION: under a type node, except the operand of a class's extends clause or of an instantiation expression, a value
  // evaluated at run time (TypeScript parses both as type nodes); an implements clause and an interface's extends clause stay types.
  const inType = (node: ts.Node): boolean => {
    const parent = node.parent;
    if (parent === undefined) return false;
    if (ts.isExpressionWithTypeArguments(parent) && parent.expression === node) {
      const clause = parent.parent;
      return ts.isHeritageClause(clause) && (clause.token === ts.SyntaxKind.ImplementsKeyword || ts.isInterfaceDeclaration(clause.parent));
    }
    return ts.isTypeNode(parent) || inType(parent);
  };
  // The symbol the checker binds a name to (for a shorthand property, its value's, never the property's own).
  const symbolOf = (name: ts.Identifier): ts.Symbol | undefined =>
    ts.isShorthandPropertyAssignment(name.parent) && name.parent.name === name ? checker.getShorthandAssignmentValueSymbol(name.parent) : checker.getSymbolAtLocation(name);
  // The outermost function T-ARMS could enter around `node`, or undefined at module level.
  const topOf = (node: ts.Node): ArmCallable | undefined => {
    let top: ArmCallable | undefined;
    for (let at = node.parent; at !== undefined; at = at.parent) {
      if (ts.isFunctionDeclaration(at) || ts.isArrowFunction(at) || ts.isFunctionExpression(at)) top = at;
    }
    return top;
  };
  const scopeOf = (callable: ArmCallable): ArmCallable => topOf(callable) ?? callable;
  const classify = (declarations: readonly ts.Declaration[], name: string): ArmBinding => {
    const [only] = declarations;
    if (declarations.length !== 1 || only === undefined) return { kind: "other", name };
    if (ts.isFunctionDeclaration(only) && only.body !== undefined) return only.asteriskToken === undefined ? { kind: "callable", name, callable: only } : { kind: "generator", name };
    if (!ts.isVariableDeclaration(only) || !ts.isIdentifier(only.name) || only.initializer === undefined || (ts.getCombinedNodeFlags(only) & ts.NodeFlags.BlockScoped) !== ts.NodeFlags.Const) {
      return { kind: "other", name };
    }
    const value = unwrapped(only.initializer);
    if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) return value.asteriskToken === undefined ? { kind: "callable", name, callable: value } : { kind: "generator", name };
    return { kind: "const", name, declared: only.name, initializer: only.initializer, scope: topOf(only) };
  };
  // Resolution: the one declaration the checker binds the reference to (a binding in a scope that does not enclose the reference is never it).
  const resolve = (reference: ts.Identifier): ArmBinding => classify(symbolOf(reference)?.declarations ?? [], reference.text);
  // A module-level name, resolved at its own declaration (judgeTsxRow and the shared W10 view).
  const atModule = (name: string): ArmBinding => {
    for (const statement of file.statements) {
      if (ts.isFunctionDeclaration(statement) && statement.name?.text === name) return resolve(statement.name);
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name) && declaration.name.text === name) return resolve(declaration.name);
      }
    }
    return { kind: "other", name };
  };
  // The shared W10 view is the module-level SHARED_VIEW declaration itself: a function of another scope sharing its name is entered like any other.
  const shared = atModule(SHARED_VIEW);
  const isShared = (bound: ArmBinding): boolean => bound.kind === "callable" && shared.kind === "callable" && bound.callable === shared.callable;
  // One walk of the file, in source order: every identifier by its text, and every call of the name eval refused (a direct eval
  // can read and write any binding in scope).
  const named = new Map<string, ts.Identifier[]>();
  const index = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      const same = named.get(node.text);
      if (same === undefined) named.set(node.text, [node]);
      else same.push(node);
    } else if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      if (ts.isIdentifier(callee) && callee.text === DIRECT_EVAL) refuse(node, "a direct eval, whose code T-ARMS does not read");
    }
    ts.forEachChild(node, index);
  };
  // Every reference the checker binds to the declaration `declared` names, inside `within` (type positions aside), in source order.
  const referencesOf = (within: ts.Node, declared: ts.Identifier): ts.Identifier[] => {
    const target = symbolOf(declared);
    if (target === undefined) return [];
    return (named.get(declared.text) ?? []).filter((node) => node !== declared && node.pos >= within.pos && node.end <= within.end && !inType(node) && symbolOf(node) === target);
  };
  // A function declaration T-ARMS enters is referenced anywhere in the file (type positions aside) only as the callee of a call:
  // any other reference (an assignment, a value read) could rebind or hand out the function, so it is refused.
  const vetted = new Set<ArmCallable>();
  const vet = (callable: ArmCallable, name: string): void => {
    if (!ts.isFunctionDeclaration(callable) || callable.name === undefined || vetted.has(callable)) return;
    vetted.add(callable);
    for (const reference of referencesOf(file, callable.name)) {
      if (!ts.isCallExpression(reference.parent) || reference.parent.expression !== reference) refuse(reference, `the function ${name} referenced other than as the callee of a call`);
    }
  };
  const returnsOf = (callable: ArmCallable): ts.Expression[] => {
    const body = callable.body;
    if (body === undefined) return [];
    if (!ts.isBlock(body)) return [body];
    const found: ts.Expression[] = [];
    const walk = (node: ts.Node): void => {
      if (ts.isFunctionLike(node) || ts.isClassLike(node)) return;
      if (ts.isReturnStatement(node)) {
        if (node.expression === undefined) refuse(node, "a return without a value");
        else found.push(node.expression);
      }
      ts.forEachChild(node, walk);
    };
    ts.forEachChild(body, walk);
    return found;
  };
  // Two expressions naming the same traced value: one binding, or one property of one binding.
  const sameValue = (a: ts.Expression, b: ts.Expression): boolean => {
    const x = unwrapped(a);
    const y = unwrapped(b);
    if (ts.isIdentifier(x) && ts.isIdentifier(y)) return symbolOf(x) !== undefined && symbolOf(x) === symbolOf(y);
    return ts.isPropertyAccessExpression(x) && ts.isPropertyAccessExpression(y) && x.name.text === y.name.text && sameValue(x.expression, y.expression);
  };
  // A use where a list leaves unchanged: spread (a copy), or returned by the function that declares it - alone, or as the value of
  // the one member of a returned object literal that carries it (a second member carrying it is an alias); a closure handing it
  // out is an alias, never a return.
  const flowsOut = (node: ts.Expression, declared: ts.Node): boolean => {
    const at = outer(node);
    const parent = at.parent;
    if (ts.isSpreadElement(parent)) return true;
    const own = (returned: ts.Node): boolean => ownerOf(returned) === ownerOf(declared);
    if (ts.isReturnStatement(parent) || (ts.isArrowFunction(parent) && parent.body === at)) return own(at);
    const member = (ts.isShorthandPropertyAssignment(parent) && parent.name === at) || (ts.isPropertyAssignment(parent) && parent.initializer === at) ? parent : undefined;
    const object = member === undefined ? undefined : outer(member.parent);
    if (member === undefined || object === undefined || !(ts.isReturnStatement(object.parent) || (ts.isArrowFunction(object.parent) && object.parent.body === object)) || !own(object)) return false;
    const carriers = member.parent.properties.filter((other) => (ts.isShorthandPropertyAssignment(other) && sameValue(other.name, node)) || (ts.isPropertyAssignment(other) && sameValue(other.initializer, node)));
    return carriers.length === 1;
  };
  const leaves = new Map<ts.Node, { key: readonly number[]; literal: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateExpression }>();
  const before = (a: readonly number[], b: readonly number[]): number => {
    for (let index = 0; index < Math.min(a.length, b.length); index++) {
      const step = (a[index] ?? 0) - (b[index] ?? 0);
      if (step !== 0) return step;
    }
    return a.length - b.length;
  };
  const visiting = new Set<ts.Node>();
  const enter = (call: ts.CallExpression, callee: ts.Identifier, path: readonly number[], chain: readonly ArmCallable[], next: ArmFlow): void => {
    const bound = resolve(callee);
    if (bound.kind === "generator") {
      refuse(call, `a call of ${callee.text}, a generator function T-ARMS does not enter`);
      return;
    }
    if (bound.kind !== "callable" || isShared(bound)) {
      refuse(call, `a call of ${callee.text}, not a function of this file T-ARMS enters`);
      return;
    }
    if (chain.includes(bound.callable)) {
      refuse(call, `a recursive diagnosis flow through ${bound.name}`);
      return;
    }
    vet(bound.callable, bound.name);
    for (const returned of returnsOf(bound.callable)) next(scopeOf(bound.callable), returned, [...path, call.getStart(file)], [...chain, bound.callable]);
  };
  // A const list: its initializer, plus the arguments of every push() and unshift() on it; any other use but a flow out is unread.
  const variable = (scope: ArmCallable, bound: Extract<ArmBinding, { kind: "const" }>, path: readonly number[], chain: readonly ArmCallable[]): void => {
    if (visiting.has(bound.declared)) {
      refuse(bound.declared, `the diagnosis list ${bound.name} read inside its own flow`);
      return;
    }
    visiting.add(bound.declared);
    list(scope, bound.initializer, path, chain);
    for (const reference of referencesOf(scope, bound.declared)) {
      const access = reference.parent;
      const call = ts.isPropertyAccessExpression(access) && access.expression === reference && ARM_ADDERS.includes(access.name.text) ? access.parent : undefined;
      if (call !== undefined && ts.isCallExpression(call) && call.expression === access) {
        for (const argument of call.arguments) {
          if (ts.isSpreadElement(argument)) list(scope, argument.expression, path, chain);
          else item(scope, argument, path, chain);
        }
      } else if (!flowsOut(reference, bound.declared)) {
        refuse(reference, `the diagnosis list ${bound.name} used outside the forms T-ARMS reads`);
      }
    }
    visiting.delete(bound.declared);
  };
  // A list read as `holder.property`, the holder a const of the same function bound to a call of a function T-ARMS enters: that
  // property of each of the callee's returned object literals. The holder is used only as the object of property reads, and
  // the property itself only where it flows out unchanged.
  const held = (scope: ArmCallable | undefined, access: ts.PropertyAccessExpression, holderName: ts.Identifier, path: readonly number[], chain: readonly ArmCallable[]): void => {
    const holder = resolve(holderName);
    const value = holder.kind === "const" && scope !== undefined && holder.scope === scope ? unwrapped(holder.initializer) : undefined;
    const callee = value !== undefined && ts.isCallExpression(value) && ts.isIdentifier(value.expression) ? resolve(value.expression) : undefined;
    if (holder.kind !== "const" || scope === undefined || value === undefined || callee?.kind !== "callable") {
      refuse(access, "a diagnosis list read from a value T-ARMS does not trace");
      return;
    }
    const property = access.name.text;
    for (const reference of referencesOf(scope, holder.declared)) {
      const read = reference.parent;
      if (!ts.isPropertyAccessExpression(read) || read.expression !== reference) refuse(reference, `the value ${holder.name} carrying a diagnosis list used outside a property read`);
      else if (read.name.text === property && !flowsOut(read, holder.declared)) refuse(read, `the diagnosis list ${holder.name}.${property} used outside the forms T-ARMS reads`);
    }
    if (isShared(callee)) {
      if (property !== "findings") refuse(access, `the shared W10 view's ${property} read as a diagnosis list`);
      return;
    }
    if (chain.includes(callee.callable)) {
      refuse(access, `a recursive diagnosis flow through ${callee.name}`);
      return;
    }
    vet(callee.callable, callee.name);
    for (const returned of returnsOf(callee.callable)) {
      const object = unwrapped(returned);
      const members: readonly ts.ObjectLiteralElementLike[] | undefined = ts.isObjectLiteralExpression(object) ? [...object.properties] : undefined;
      // Identifier-named property and shorthand assignments only: a spread, a computed or literal name, a method or an accessor can
      // put another value under the property.
      const plain = members?.every((member) => (ts.isPropertyAssignment(member) || ts.isShorthandPropertyAssignment(member)) && ts.isIdentifier(member.name)) === true;
      const matches: Array<ts.PropertyAssignment | ts.ShorthandPropertyAssignment> = [];
      for (const member of members ?? []) {
        if ((ts.isPropertyAssignment(member) || ts.isShorthandPropertyAssignment(member)) && ts.isIdentifier(member.name) && member.name.text === property) matches.push(member);
      }
      const [match] = matches;
      if (!plain || matches.length !== 1 || match === undefined) {
        refuse(returned, `a return of ${callee.name} that does not carry exactly one ${property}`);
        continue;
      }
      list(scopeOf(callee.callable), ts.isShorthandPropertyAssignment(match) ? match.name : match.initializer, [...path, value.getStart(file)], [...chain, callee.callable]);
    }
  };
  // A diagnosis list: an array literal (each element a diagnosis, each spread a list), a conditional of lists, a call of a
  // function T-ARMS enters (each of its returns a list), a const list of the same function, or a list a holder carries.
  const list: ArmFlow = (scope, node, path, chain) => {
    const expression = unwrapped(node);
    if (ts.isArrayLiteralExpression(expression)) {
      for (const element of expression.elements) {
        if (ts.isSpreadElement(element)) list(scope, element.expression, path, chain);
        else if (ts.isOmittedExpression(element)) refuse(element, "a hole in a diagnosis list");
        else item(scope, element, path, chain);
      }
    } else if (ts.isConditionalExpression(expression)) {
      list(scope, expression.whenTrue, path, chain);
      list(scope, expression.whenFalse, path, chain);
    } else if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      enter(expression, expression.expression, path, chain, list);
    } else if (ts.isIdentifier(expression)) {
      const bound = resolve(expression);
      if (bound.kind === "const" && scope !== undefined && bound.scope === scope) variable(scope, bound, path, chain);
      else refuse(expression, `a diagnosis list ${expression.text} that is not a const of the function returning it`);
    } else if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression)) {
      held(scope, expression, expression.expression, path, chain);
    } else {
      refuse(expression, "a diagnosis list in a form T-ARMS does not trace");
    }
  };
  // One diagnosis: a string, no-substitution template or template literal (an arm), a conditional of diagnoses, a const (of a
  // function or the module) whose initializer is one, or a call of a function T-ARMS enters (each of its returns one).
  const item: ArmFlow = (scope, node, path, chain) => {
    const expression = unwrapped(node);
    if (path.length > 64) {
      refuse(expression, "a diagnosis flow deeper than T-ARMS reads");
    } else if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isTemplateExpression(expression)) {
      const key = [...path, expression.getStart(file)];
      const known = leaves.get(expression);
      if (known === undefined || before(key, known.key) < 0) leaves.set(expression, { key, literal: expression });
    } else if (ts.isConditionalExpression(expression)) {
      item(scope, expression.whenTrue, path, chain);
      item(scope, expression.whenFalse, path, chain);
    } else if (ts.isIdentifier(expression)) {
      const bound = resolve(expression);
      if (bound.kind === "const") item(bound.scope, bound.initializer, [...path, expression.getStart(file)], chain);
      else refuse(expression, `a diagnosis read from ${expression.text}, which is not a const value`);
    } else if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      enter(expression, expression.expression, path, chain, item);
    } else {
      refuse(expression, "a diagnosis in a form T-ARMS does not read");
    }
  };
  index(file);
  const judge = atModule("judgeTsxRow");
  if (judge.kind === "callable") {
    vet(judge.callable, judge.name);
    for (const returned of returnsOf(judge.callable)) list(scopeOf(judge.callable), returned, [], [judge.callable]);
  } else {
    refuse(file, "no judgeTsxRow function");
  }
  const arms = [...leaves.values()]
    .sort((a, b) => before(a.key, b.key))
    .map(({ literal }) => {
      const pieces = ts.isTemplateExpression(literal) ? [literal.head.text, ...literal.templateSpans.map((span) => span.literal.text)] : [literal.text];
      return { pattern: new RegExp(`^${pieces.map(quotedPattern).join("[\\s\\S]*?")}$`), pieces };
    });
  return { arms, unread: [...unread] };
}

/** Why the rendered receipts index fails to list `name`.md as rendered text; empty when it does. */
function indexFindings(markdown: string, name: string): string[] {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, "the rendered receipts index", () => false);
  if (!assertedHrefs(tokens).includes(`${name}.md`)) findings.push(`the rendered receipts index renders no link to ${name}.md`);
  return findings;
}

function readText(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function liveReceipt(name: string): string | undefined {
  const rel = `docs/workbench/receipts/${name}.md`;
  return existsSync(join(ROOT, rel)) ? readText(rel) : undefined;
}

/** The receipts index as it renders at this cut: generated from the directory listing (wb-5zz), never read from a file. */
const renderedIndex = (): string => renderReceiptsIndex(readReceiptsListing(join(ROOT, RECEIPTS_DIR)));

// ---- Mutant authoring only, never the judge (C1). Every page and INDEX edit is located through the lexer: the top-level
// token raws tile the page, a table's raw lines are its header, delimiter and rows, and each rendered character of a cell or
// heading maps back to the source span it renders from. Edits are authored at those positions, so a rendering-neutral
// rewrite of the committed docs (an N control) moves no authoring site, and every locator fails closed when its committed
// anchor is not exactly where the rendered page puts it. Receipt edits keep fail-closed raw anchors (named scope). ----

const at = (code: number): string => String.fromCodePoint(code);
const CARRIER_RELEASE = carrierRelease(REACTIVE_FIBER_CONTRACT_SOURCE) ?? "";
const STAMP_MARKER = "Stamped receipt row (R6/R8, ";
const LEGACY_MARKER = "TRACEABILITY 'Native ecosystem receipts':";
const CLAIM_PHRASE = "node() RF noncommitted context preview capability";
/** The character references decodeReferences() reads (authoring maps each one back to its source span). */
const REFERENCE_ALL = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;

type Edit = readonly [start: number, end: number, insert: string];
type Unit = [text: string, start: number, end: number];

interface Lexed {
  text: string;
  tokens: TokensList;
  starts: readonly number[];
}

const LEXED = new Map<string, Lexed>();

/** A page lexed once (LF line ends, as marked reads it) with each top-level token's source offset; the raws must tile it. */
function lexed(source: string): Lexed {
  const cached = LEXED.get(source);
  if (cached !== undefined) return cached;
  const text = source.replace(/\r\n?/g, "\n");
  const tokens = new Lexer({ gfm: true }).lex(text);
  const starts: number[] = [];
  let cursor = 0;
  for (const token of tokens) {
    starts.push(cursor);
    cursor += token.raw.length;
  }
  if (tokens.map((token) => token.raw).join("") !== text) throw new Error("mutant authoring: the top-level token raws do not tile the page");
  const page: Lexed = { text, tokens, starts };
  if (LEXED.size >= 32) LEXED.clear();
  LEXED.set(source, page);
  return page;
}

/** `text` with every edit applied; offsets are into `text`, and edits may touch but never overlap. */
function applyEdits(text: string, edits: readonly Edit[]): string {
  let out = text;
  let limit = text.length;
  for (const [start, end, insert] of [...edits].sort((a, b) => b[0] - a[0] || b[1] - a[1])) {
    if (start < 0 || start > end || end > limit) throw new Error("mutant authoring: edits overlap or leave the page");
    out = `${out.slice(0, start)}${insert}${out.slice(end)}`;
    limit = start;
  }
  return out;
}

/** The units decodeReferences() renders from a text token's text (source offset `start`), each with the span it decodes from. */
function mapDecoded(text: string, start: number, out: Unit[]): void {
  let cursor = 0;
  for (const match of text.matchAll(REFERENCE_ALL)) {
    const from = match.index ?? 0;
    for (; cursor < from; cursor++) out.push([text[cursor] ?? "", start + cursor, start + cursor + 1]);
    const decoded = decodeReferences(match[0]);
    for (let index = 0; index < decoded.length; index++) out.push([decoded[index] ?? "", start + from, start + from + match[0].length]);
    cursor = from + match[0].length;
  }
  for (; cursor < text.length; cursor++) out.push([text[cursor] ?? "", start + cursor, start + cursor + 1]);
}

/** Every unit rendered() reads from inline `tokens` (source offset `base`), each with the source span it renders from. */
function mapInline(tokens: readonly Token[], base: number, out: Unit[]): void {
  let cursor = base;
  for (const token of tokens) {
    const start = cursor;
    cursor += token.raw.length;
    if (UNASSERTED.has(token.type)) continue;
    if (token.type === "br") {
      out.push([" ", start, cursor]);
    } else if (token.type === "escape" || token.type === "codespan") {
      const text = String(token.text);
      const inner = token.type === "escape" ? token.raw.length - text.length : token.raw.indexOf(text);
      if (inner < 0 || token.raw.slice(inner, inner + text.length) !== text) throw new Error(`mutant authoring: no source span for a ${token.type} token`);
      for (let index = 0; index < text.length; index++) out.push([text[index] ?? "", start + inner + index, start + inner + index + 1]);
    } else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) {
      const children: Token[] = token.tokens;
      const inner = token.raw.indexOf(children.map((child) => child.raw).join(""));
      if (inner < 0) throw new Error(`mutant authoring: the ${token.type} token's children do not sit in its source`);
      mapInline(children, start + inner, out);
    } else if (token.type === "text" && token.raw === token.text) {
      mapDecoded(String(token.text), start, out);
    } else {
      throw new Error(`mutant authoring: no rendered map for a ${token.type} token`);
    }
  }
}

/** The units of the collapsed rendered text of inline `tokens` (each white-space run one " " unit, trimmed), checked
 * against rendered() so authoring and the judge read the same text. */
function renderedUnits(tokens: readonly Token[], base: number): Unit[] {
  const raw: Unit[] = [];
  mapInline(tokens, base, raw);
  const units: Unit[] = [];
  for (const [text, start, end] of raw) {
    const last = units.at(-1);
    if (/^[ \t\n\r\f]$/.test(text)) {
      if (last !== undefined && last[0] === " ") last[2] = end;
      else units.push([" ", start, end]);
    } else {
      units.push([text, start, end]);
    }
  }
  while (units[0]?.[0] === " ") units.shift();
  while (units.at(-1)?.[0] === " ") units.pop();
  if (units.map(([text]) => text).join("") !== collapsed(rendered(tokens, ""))) throw new Error("mutant authoring: the rendered map disagrees with the rendered text");
  return units;
}

interface CellSite {
  start: number;
  end: number;
  text: string;
  units: Unit[];
}

/** The cells of one raw table line, located in order by their cell text, each with its rendered units. */
function cellSites(page: Lexed, line: readonly [number, number], cells: readonly Tokens.TableCell[]): CellSite[] {
  const sites: CellSite[] = [];
  let cursor = line[0];
  for (const cell of cells) {
    const start = page.text.indexOf(cell.text, cursor);
    if (start < 0 || start + cell.text.length > line[1] || !/^[ \t|]*$/.test(page.text.slice(cursor, start))) {
      throw new Error(`mutant authoring: cell ${JSON.stringify(cell.text.slice(0, 40))} is not where its raw line puts it`);
    }
    if (cell.tokens.map((token) => token.raw).join("") !== cell.text) throw new Error("mutant authoring: a cell's inline tokens do not tile its text");
    sites.push({ start, end: start + cell.text.length, text: cellText(cell), units: renderedUnits(cell.tokens, start) });
    cursor = start + cell.text.length;
  }
  return sites;
}

/** The [start, end) source lines of the top-level table at token `index`: its header, its delimiter, then each body row. */
function tableLines(page: Lexed, index: number): Array<readonly [number, number]> {
  const table = page.tokens[index];
  if (table === undefined || !isTable(table)) throw new Error("mutant authoring: no table at that token");
  const lines: Array<readonly [number, number]> = [];
  let cursor = page.starts[index] ?? 0;
  for (const line of table.raw.replace(/\n+$/, "").split("\n")) {
    lines.push([cursor, cursor + line.length]);
    cursor += line.length + 1;
  }
  if (lines.length !== table.rows.length + 2) throw new Error("mutant authoring: a table's raw lines are not its header, delimiter and rows");
  return lines;
}

interface RowSite {
  page: Lexed;
  lines: ReadonlyArray<readonly [number, number]>;
  rowLine: readonly [number, number];
  header: CellSite[];
  cells: CellSite[];
}

/** The one body row of a top-level table whose rendered first cell satisfies `first`: its table token and row index. */
function findRow(source: string, first: (text: string) => boolean, label: string): { page: Lexed; index: number; row: number } {
  const page = lexed(source);
  const hits: Array<readonly [number, number]> = [];
  for (const [index, token] of page.tokens.entries()) {
    if (!isTable(token)) continue;
    for (const [row, cells] of token.rows.entries()) {
      if (cells[0] !== undefined && first(cellText(cells[0]))) hits.push([index, row]);
    }
  }
  const hit = hits[0];
  if (hits.length !== 1 || hit === undefined) throw new Error(`mutant authoring expects one ${label}, found ${hits.length}`);
  return { page, index: hit[0], row: hit[1] };
}

/** The committed claim row (its rendered first cell is the committed Feature text, never the judge's folded reading). */
function claimRowSite(source: string): RowSite {
  const { page, index, row } = findRow(source, (text) => text === W10_COMMITTED.firstCells[0], "committed claim row");
  const table = page.tokens[index];
  const lines = tableLines(page, index);
  const headerLine = lines[0];
  const rowLine = lines[row + 2];
  const cells = table !== undefined && isTable(table) ? table.rows[row] : undefined;
  if (table === undefined || !isTable(table) || headerLine === undefined || rowLine === undefined || cells === undefined) throw new Error("mutant authoring: no committed claim row line");
  return { page, lines, rowLine, header: cellSites(page, headerLine, table.header), cells: cellSites(page, rowLine, cells) };
}

function cellUnder(site: RowSite, name: string): CellSite {
  const index = site.header.findIndex((cell) => cell.text === name);
  const cell = site.cells[index];
  if (index < 0 || cell === undefined) throw new Error(`mutant authoring: the claim row's table names no ${name} column`);
  return cell;
}

function firstCell(site: RowSite): CellSite {
  const cell = site.cells[0];
  if (cell === undefined) throw new Error("mutant authoring: the claim row has no cells");
  return cell;
}

const evidenceOf = (site: RowSite): CellSite => cellUnder(site, EVIDENCE_HEADER);

/** The source span of units [from, to) of the one rendered occurrence of `phrase` in a cell. */
function spanOf(cell: CellSite, phrase: string, from = 0, to = phrase.length): readonly [number, number] {
  const found = cell.text.indexOf(phrase);
  const first = cell.units[found + from];
  const last = cell.units[found + to - 1];
  if (phrase === "" || found < 0 || cell.text.indexOf(phrase, found + 1) >= 0 || from >= to || first === undefined || last === undefined) {
    throw new Error(`mutant authoring: ${JSON.stringify(phrase)} does not render exactly once in the cell`);
  }
  return [first[1], last[2]];
}

/** The rendered sentence of a cell that begins with `beginning`, through its period (the judge's ". " split), and its source span. */
function sentenceOf(cell: CellSite, beginning: string): { text: string; span: readonly [number, number] } {
  const found = cell.text.indexOf(beginning);
  const stop = found < 0 ? -1 : cell.text.indexOf(". ", found);
  const end = stop < 0 ? cell.text.length : stop + 1;
  const first = cell.units[found];
  const last = cell.units[end - 1];
  if (found < 0 || cell.text.indexOf(beginning, found + 1) >= 0 || first === undefined || last === undefined) {
    throw new Error(`mutant authoring: no one rendered sentence beginning ${JSON.stringify(beginning)}`);
  }
  return { text: cell.text.slice(found, end), span: [first[1], last[2]] };
}

/** The page with the committed claim row's raw line replaced by `edit(line)`, the lines joined by newlines. */
function editRow(page: string, edit: (row: string) => readonly string[]): string {
  const site = claimRowSite(page);
  const [start, end] = site.rowLine;
  return applyEdits(site.page.text, [[start, end, edit(site.page.text.slice(start, end)).join("\n")]]);
}

/** The page with edits authored at the committed claim row's lexer positions. */
function editClaim(page: string, edit: (site: RowSite) => readonly Edit[]): string {
  const site = claimRowSite(page);
  return applyEdits(site.page.text, edit(site));
}

/** The page with the one rendered occurrence of `phrase` in the claim row's Evidence cell re-authored as `insert`. */
const inEvidence = (page: string, phrase: string, insert: string): string =>
  editClaim(page, (site) => {
    const [start, end] = spanOf(evidenceOf(site), phrase);
    return [[start, end, insert]];
  });

/** A raw span hidden in one complete comment (a complete comment already inside it is dropped first: it renders nothing,
 * and nested it would close the outer comment early). */
const commented = (raw: string): string => `<!-- ${raw.replace(/<!--[\s\S]*?-->/g, "")} -->`;

/** The page with one sentence of the claim row's Evidence cell hidden in an inline comment. */
const hideSentence = (page: string, beginning: string): string =>
  editClaim(page, (site) => {
    const { span } = sentenceOf(evidenceOf(site), beginning);
    return [[span[0], span[1], commented(site.page.text.slice(span[0], span[1]))]];
  });

/** The page with the stamped sentence deleted from the Evidence cell (its preceding space kept, as an editor deletes it). */
const withoutStamp = (page: string): string =>
  editClaim(page, (site) => {
    const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
    return [[span[0], span[1], ""]];
  });

interface HeadingSite {
  page: Lexed;
  index: number;
  start: number;
  heading: Tokens.Heading;
}

/** The one top-level heading that renders as the committed W10 heading text. */
function w10HeadingSite(source: string): HeadingSite {
  const page = lexed(source);
  const hits = page.tokens.flatMap((token, index) => (isHeading(token) && collapsed(rendered(token.tokens, "")) === W10_COMMITTED.heading ? [index] : []));
  const index = hits[0];
  const heading = index === undefined ? undefined : page.tokens[index];
  if (hits.length !== 1 || index === undefined || heading === undefined || !isHeading(heading)) throw new Error(`mutant authoring expects one top-level committed W10 heading, found ${hits.length}`);
  return { page, index, start: page.starts[index] ?? 0, heading };
}

/** The W10 heading's rendered units, each with its source span. */
function headingUnits(site: HeadingSite): Unit[] {
  const inner = site.heading.raw.indexOf(site.heading.tokens.map((token) => token.raw).join(""));
  if (inner < 0) throw new Error("mutant authoring: the W10 heading's inline tokens do not sit in its source");
  return renderedUnits(site.heading.tokens, site.start + inner);
}

/** The source offset of the newline that ends the W10 heading's line. */
function headingLineEnd(site: HeadingSite): number {
  const eol = site.page.text.indexOf("\n", site.start);
  if (eol < 0) throw new Error("mutant authoring: the W10 heading line has no newline");
  return eol;
}

/** The source offset where the W10 section ends: the next top-level level-1/2 heading, or EOF. */
function sectionEnd(site: HeadingSite): number {
  for (let index = site.index + 1; index < site.page.tokens.length; index++) {
    const token = site.page.tokens[index];
    if (token !== undefined && isHeading(token) && token.depth <= 2) return site.page.starts[index] ?? site.page.text.length;
  }
  return site.page.text.length;
}

/** `insert` placed where the W10 heading's line begins. */
function atW10Heading(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  return applyEdits(site.page.text, [[site.start, site.start, insert]]);
}

/** A blank line and then `insert`, placed right after the W10 heading's line. */
function afterW10Heading(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  const next = headingLineEnd(site) + 1;
  return applyEdits(site.page.text, [[next, next, `\n${insert}`]]);
}

/** `insert` placed where the W10 section ends (at the start of the next top-level level-1/2 heading's line). */
function atW10SectionEnd(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  const end = sectionEnd(site);
  return applyEdits(site.page.text, [[end, end, insert]]);
}

/** The source offset just past the delimiter line of the first top-level table after the W10 section (today W11's). */
function nextTableBody(source: string): number {
  const site = w10HeadingSite(source);
  const end = sectionEnd(site);
  const index = site.page.tokens.findIndex((token, position) => (site.page.starts[position] ?? 0) >= end && isTable(token));
  const delimiter = index < 0 ? undefined : tableLines(site.page, index)[1];
  if (delimiter === undefined) throw new Error("mutant authoring: no table after the W10 section");
  return delimiter[1] + 1;
}

/** `line` added as the first body row of the first table after the W10 section. */
function intoNextTable(source: string, line: string): string {
  const body = nextTableBody(source);
  return applyEdits(lexed(source).text, [[body, body, `${line}\n`]]);
}

/** `insert` placed where the raw line of the one "Curated per-role provider tools" row begins (another section's table). */
function atCuratedRow(source: string, insert: string): string {
  const { page, index, row } = findRow(source, (text) => text.startsWith("Curated per-role provider tools"), "Curated per-role provider tools row");
  const line = tableLines(page, index)[row + 2];
  if (line === undefined) throw new Error("mutant authoring: no Curated per-role provider tools row line");
  return applyEdits(page.text, [[line[0], line[0], insert]]);
}

/** The source line of the one INDEX list item that links `name`.md (located through the lexer), and the item. */
function indexItem(index: string, name: string): { page: Lexed; line: readonly [number, number]; item: Tokens.ListItem } {
  const page = lexed(index);
  const hits: Array<{ start: number; item: Tokens.ListItem }> = [];
  for (const [position, token] of page.tokens.entries()) {
    if (!isList(token)) continue;
    if (!token.raw.startsWith(token.items.map((item) => item.raw).join(""))) throw new Error("mutant authoring: a list's items do not tile its source");
    let cursor = page.starts[position] ?? 0;
    for (const item of token.items) {
      if (assertedHrefs(item.tokens).includes(`${name}.md`)) hits.push({ start: cursor, item });
      cursor += item.raw.length;
    }
  }
  const hit = hits[0];
  if (hits.length !== 1 || hit === undefined) throw new Error(`mutant authoring expects one INDEX item linking ${name}.md, found ${hits.length}`);
  return { page, line: [hit.start, hit.start + (hit.item.raw.split("\n")[0] ?? "").length], item: hit.item };
}

/** The INDEX with the line of the item linking `name`.md wrapped in a complete comment. */
function commentIndexLine(index: string, name: string): string {
  const { page, line } = indexItem(index, name);
  return applyEdits(page.text, [[line[0], line[1], `<!-- ${page.text.slice(line[0], line[1])} -->`]]);
}

/** The INDEX with the line of the item linking `name`.md moved into a fenced code block. */
function fenceIndexLine(index: string, name: string): string {
  const { page, line } = indexItem(index, name);
  return applyEdits(page.text, [[line[0], line[1], `\`\`\`\n${page.text.slice(line[0], line[1])}\n\`\`\``]]);
}

/** The INDEX with the destination of the one link to `name`.md wrapped in angle brackets (it renders the same link). Stack-safe:
 * a destination already in angle brackets gains a link title instead (a title renders nothing the INDEX check reads). */
function angleIndexLink(index: string, name: string): string {
  const { page, line, item } = indexItem(index, name);
  const links: Tokens.Link[] = [];
  visit(item.tokens, (token) => {
    if (isLink(token) && token.href === `${name}.md`) links.push(token);
  });
  const link = links[0];
  const text = page.text.slice(line[0], line[1]);
  const found = link === undefined ? -1 : text.indexOf(link.raw);
  if (links.length !== 1 || link === undefined || found < 0 || text.indexOf(link.raw, found + 1) >= 0) throw new Error(`mutant authoring: no one link to ${name}.md in its INDEX line`);
  const end = line[0] + found + link.raw.length;
  for (const [tail, insert] of [[`](${link.href})`, `(<${link.href}>)`], [`](<${link.href}>)`, `(<${link.href}> "receipt")`]] as const) {
    if (link.raw.endsWith(tail)) return applyEdits(page.text, [[end - tail.length + 1, end, insert]]);
  }
  throw new Error(`mutant authoring: the link to ${name}.md has no destination form this control knows`);
}

/** The slots of the live page's stamped sentence (authoring reads the committed page; the judge never reads a file). */
function liveStamp(): StampSlots {
  const slots = stampedParts(readText(MATRIX))?.slots;
  if (slots === undefined) throw new Error("mutant authoring: the live page has no stamped sentence");
  return slots;
}

/** The live receipt reader with `mutate` applied to whatever it reads. */
const readerWith =
  (mutate: (receipt: string) => string): ReadReceipt =>
  (name) => {
    const text = liveReceipt(name);
    return text === undefined ? undefined : mutate(text);
  };

/** The receipt's stamp line hidden in an inline comment (receipt edits keep fail-closed raw anchors). */
function hideStampLine(receipt: string): string {
  const start = receipt.indexOf("  `RF_PREVIEW_RECEIPT");
  const stop = start < 0 ? -1 : receipt.indexOf("`\n", start + 3) + 1;
  if (start < 0 || stop <= 0) throw new Error("mutant authoring: no receipt stamp line");
  return `${receipt.slice(0, start)}  <!-- ${receipt.slice(start + 2, stop)} -->${receipt.slice(stop)}`;
}

/** The receipt's stamp line struck through (a raw anchor on the receipt). */
const strikeStampLine = (receipt: string): string => receipt.replace(/`RF_PREVIEW_RECEIPT [^`\n]*`/, (line) => `~~${line}~~`);

/** The three receipt stamp shapes without a string cli_version (F7). */
const F7_STAMPS = ['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"] as const;

function breakStamp(receipt: string, replacement: string): string {
  return replacement.startsWith("RF_PREVIEW_RECEIPT") ? receipt.replace(STAMP_MARK, replacement) : receipt.replace(`"cli_version":"${CARRIER_RELEASE}"`, replacement);
}

type RawSpan = readonly [start: number, end: number];

/** RUN OF RECORD authoring (wb-j4lx): the record sites of a receipt's newest stamp entry, read from its raw text (fail closed). */
interface RecordSites {
  /** The id the entry heading's one raw "(receipt of record <id>)" clause names. */
  record: string;
  /** The entry's other raw cmd_* ids in first-occurrence order: never the record, never a legacy unstamped id. */
  decoys: readonly string[];
  /** The raw clause in the entry heading, and the id inside it. */
  clause: RawSpan;
  clauseId: RawSpan;
  /** Each raw "- Run of record:" line of the entry (its newline excluded) and the first raw cmd_* id on it. */
  lines: ReadonlyArray<{ line: RawSpan; first: RawSpan }>;
}

/** The raw sites the RECORD pins re-author: entries start at ATX level-1/2 heading lines; the newest is the last one holding a stamp. */
function recordSites(receipt: string): RecordSites {
  const starts = [...receipt.matchAll(/^#{1,2} [^\n]*/gm)].map((match) => match.index ?? 0);
  let entry: RawSpan | undefined;
  for (const [position, start] of starts.entries()) {
    const end = starts[position + 1] ?? receipt.length;
    if (receipt.slice(start, end).includes(STAMP_MARK)) entry = [start, end];
  }
  if (entry === undefined) throw new Error("mutant authoring: no receipt entry holds an RF_PREVIEW_RECEIPT line");
  const [start, end] = entry;
  const body = receipt.slice(start, end);
  const headingEnd = body.indexOf("\n");
  const clauses = [...body.slice(0, headingEnd < 0 ? body.length : headingEnd).matchAll(/\(receipt of record (cmd_[0-9a-f]{12})\)/g)];
  const clause = clauses[0];
  const record = clause?.[1];
  if (clauses.length !== 1 || clause === undefined || record === undefined) throw new Error("mutant authoring: the newest stamp entry's heading holds no one (receipt of record <id>) clause");
  const clauseStart = start + (clause.index ?? 0);
  const idStart = clauseStart + clause[0].indexOf(record);
  const decoys: string[] = [];
  for (const match of body.matchAll(/cmd_[0-9a-f]{12}/g)) {
    if (match[0] !== record && !LEGACY_UNSTAMPED_IDS.includes(match[0]) && !decoys.includes(match[0])) decoys.push(match[0]);
  }
  const lines: Array<{ line: RawSpan; first: RawSpan }> = [];
  for (const match of body.matchAll(/^- Run of record:[^\n]*/gm)) {
    const lineStart = start + (match.index ?? 0);
    const first = /cmd_[0-9a-f]{12}/.exec(match[0]);
    if (first === null) throw new Error("mutant authoring: a Run of record line names no cmd_* id");
    lines.push({ line: [lineStart, lineStart + match[0].length], first: [lineStart + first.index, lineStart + first.index + first[0].length] });
  }
  if (decoys.length === 0 || lines.length === 0) throw new Error("mutant authoring: the newest stamp entry renders no other cmd_* id or holds no Run of record line");
  return { record, decoys, clause: [clauseStart, clauseStart + clause[0].length], clauseId: [idStart, idStart + record.length], lines };
}

/** The record sites of the live stamped receipt (authoring reads the committed receipt; the judge never reads a file). */
function liveRecordSites(): RecordSites {
  const text = liveReceipt(liveStamp().receipt);
  if (text === undefined) throw new Error("mutant authoring: the live stamped receipt does not exist");
  return recordSites(text);
}

interface RecordEdit {
  page?: (source: string) => string;
  receipt?: (receipt: string) => string;
}

/** The one place each RECORD pin's edit is written: the page's stamped cmd slot and the receipt's record sites, by row site and op. */
function recordEdit(row: RecordRow, op: RecordOp): RecordEdit {
  const decoyOf = (sites: RecordSites): string => {
    const decoy = sites.decoys[row.slot === "decoy" ? row.index : 0];
    if (decoy === undefined) throw new Error(`mutant authoring: the newest stamp entry renders no decoy ${row.slot === "decoy" ? row.index + 1 : 1}`);
    return decoy;
  };
  const lineOf = (sites: RecordSites): { line: RawSpan; first: RawSpan } => {
    const line = sites.lines[row.slot === "line" ? row.index : 0];
    if (line === undefined) throw new Error(`mutant authoring: the newest stamp entry holds no Run of record line ${row.index + 1}`);
    return line;
  };
  const onReceipt =
    (edit: (sites: RecordSites, text: string) => readonly Edit[]) =>
    (text: string): string =>
      applyEdits(text, edit(recordSites(text), text));
  const stamped = (source: string): string => inEvidence(source, liveStamp().cmd, decoyOf(liveRecordSites()));
  switch (`${row.slot}/${op}`) {
    case "decoy/stamped":
      return { page: stamped };
    case "decoy/rewritten":
      return { page: stamped, receipt: onReceipt((sites) => [[sites.clauseId[0], sites.clauseId[1], decoyOf(sites)], ...sites.lines.map(({ first }): Edit => [first[0], first[1], decoyOf(sites)])]) };
    case "heading/removed":
      return {
        receipt: onReceipt((sites, text) => {
          if (text[sites.clause[0] - 1] !== " ") throw new Error("mutant authoring: no space before the heading clause");
          return [[sites.clause[0] - 1, sites.clause[1], ""]];
        }),
      };
    case "heading/commented":
      return { receipt: onReceipt((sites, text) => [[sites.clause[0], sites.clause[1], commented(text.slice(sites.clause[0], sites.clause[1]))]]) };
    case "heading/lookalike":
      return {
        receipt: onReceipt((sites, text) => {
          const o = sites.clause[0] + "(receipt ".length;
          if (text[o] !== "o") throw new Error("mutant authoring: the heading clause does not read (receipt of");
          return [[o, o + 1, at(0x43e)]];
        }),
      };
    case "heading/cased":
      return {
        receipt: onReceipt((sites, text) => {
          const r = sites.clause[0] + 1;
          if (text[r] !== "r") throw new Error("mutant authoring: the heading clause does not open (receipt");
          return [[r, r + 1, "R"]];
        }),
      };
    case "heading/invisible":
      return {
        receipt: onReceipt((sites, text) => {
          const gap = sites.clause[0] + "(receipt of ".length;
          if (text.slice(gap - 4, gap) !== " of ") throw new Error("mutant authoring: the heading clause does not read (receipt of record");
          return [[gap, gap, at(0x200b)]];
        }),
      };
    case "heading/moved":
      return {
        receipt: onReceipt((sites, text) => {
          if (text[sites.clause[0] - 1] !== " ") throw new Error("mutant authoring: no space before the heading clause");
          const { line } = lineOf(sites);
          return [[sites.clause[0] - 1, sites.clause[1], ""], [line[1], line[1], ` ${text.slice(sites.clause[0], sites.clause[1])}`]];
        }),
      };
    case "heading/doubled":
      return { receipt: onReceipt((sites) => [[sites.clause[1], sites.clause[1], ` (receipt of record ${decoyOf(sites)})`]]) };
    case "heading/folded":
      return { receipt: onReceipt((sites) => [[sites.clause[1], sites.clause[1], ` (receipt ${at(0x43e)}f record ${decoyOf(sites)})`]]) };
    case "heading/swapped":
      return { receipt: onReceipt((sites) => [[sites.clauseId[0], sites.clauseId[1], decoyOf(sites)]]) };
    case "heading/coded":
      return { receipt: onReceipt((sites) => [[sites.clauseId[0], sites.clauseId[0], "`"], [sites.clauseId[1], sites.clauseId[1], "`"]]) };
    case "heading/later":
      return { receipt: (text) => `${text.replace(/\n+$/, "")}\n\n## 2099-01-01 a later entry with no stamp line (receipt of record ${decoyOf(recordSites(text))})\n\n- A later note.\n` };
    case "line/removed":
      return {
        receipt: onReceipt((sites, text) => {
          const { line } = lineOf(sites);
          if (text[line[1]] !== "\n") throw new Error("mutant authoring: the Run of record line does not end in a newline");
          return [[line[0], line[1] + 1, ""]];
        }),
      };
    case "line/swapped":
      return { receipt: onReceipt((sites) => [[lineOf(sites).first[0], lineOf(sites).first[1], decoyOf(sites)]]) };
    case "line/lookalike":
      return { receipt: onReceipt((sites) => [[lineOf(sites).line[1], lineOf(sites).line[1], `\n- Run ${at(0x43e)}f record: forge ${decoyOf(sites)}.`]]) };
    case "line/coded":
      return {
        receipt: onReceipt((sites) => {
          const { first } = lineOf(sites);
          return [[first[0], first[0], "`"], [first[1], first[1], "`"]];
        }),
      };
    case "line/trailing":
      return { receipt: onReceipt((sites) => [[lineOf(sites).line[1], lineOf(sites).line[1], ` Run of record: forge ${decoyOf(sites)}.`]]) };
    default:
      throw new Error(`mutant authoring: no RECORD edit for ${row.slot}/${op}`);
  }
}

/** A RECORD pin judged on `source`: refused with each named diagnosis, in order, and no other finding; or accepted. */
function expectRecordPin(source: string, row: RecordRow, pin: RecordPin, label: string): void {
  const edit = recordEdit(row, pin.op);
  const named = stampedParts(source)?.slots.receipt ?? "";
  const variant = edit.page === undefined ? source : edit.page(source);
  const reader = edit.receipt === undefined ? liveReceipt : readerWith(edit.receipt);
  expect(variant !== source || reader(named) !== liveReceipt(named), `${label} edits neither the page nor the receipt`).toBe(true);
  const findings = judgeW10Claim(variant, reader, REACTIVE_FIBER_CONTRACT_SOURCE);
  if (pin.reading === "refused") {
    expect(findings, label).toHaveLength(pin.causes.length);
    for (const [index, cause] of pin.causes.entries()) expect(findings[index], label).toContain(cause);
  } else {
    expect(findings, label).toEqual([]);
  }
}

/** The 9df9a03 row without its capability token: an unstamped duplicate claim row (G5-G7). */
const DUP_NO_TOKEN = ROW_AT_9DF9A03.replace(" (reactivefiber.render.preview/v1)", "");

/** The 9df9a03 Feature cell: the withdrawn claim as the row published it. */
const FEATURE_AT_9DF9A03 = ROW_AT_9DF9A03.slice(2, ROW_AT_9DF9A03.indexOf(" | "));
/** The gate-1 row-547 battery's withdrawn claim row, its cells as that battery wrote them. */
const WITHDRAWN_CELLS = [FEATURE_AT_9DF9A03, "landed-gated", "Evidence sentence.", "Caveat sentence."] as const;
const WITHDRAWN_ROW = `| ${WITHDRAWN_CELLS.join(" | ")} |`;

/** A duplicate, unstamped claim row in the gate-1 battery's form (J8, J9, J11). */
const unstampedRow = (first: string): string =>
  `| ${[first, "landed-gated", "Tests: test/workbench-native-rf-preview.test.ts. TRACEABILITY 'Native ecosystem receipts': cmd_994da817d4cd, cmd_7e50a487da08, cmd_386a32a0323b (unstamped 0.1.583-era runs).", "none"].join(" | ")} |`;

/** The first token of each row name: its battery id. */
const rowIds = (rows: ReadonlyArray<readonly [string, ...unknown[]]>): string[] => rows.map(([name]) => name.split(" ")[0] ?? name);

type PageMutant = readonly [string, (source: string) => string, string];
type PageVariant = readonly [string, (source: string) => string, readonly string[]];
type ReceiptMutant = readonly [string, (receipt: string) => string, string];
type ReceiptVariant = readonly [string, (receipt: string) => string, readonly string[]];
type IndexVariant = readonly [string, (index: string, name: string) => string];
type Control = readonly [string, (source: string) => string];

/** The gate-3 row-487 battery, page side: every G and K variant is judged unstamped. */
const GK_PAGE: readonly PageMutant[] = [
  ["G1 stamped sentence wrapped in an inline comment inside the Evidence cell", (source) => hideSentence(source, STAMP_MARKER), "carries no stamped receipt sentence"],
  ["G2 substring inversion: 'unmeasured release'", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `unmeasured release ${CARRIER_RELEASE}`), "is not the committed stamped-sentence slice"],
  ["G3 negated clause: 'though this run never measured release'", (source) => inEvidence(source, `installed rf, measured release ${CARRIER_RELEASE}`, `installed rf, though this run never measured release ${CARRIER_RELEASE}`), "is not the committed stamped-sentence slice"],
  [
    "G4 claim row moved out of the W10 section into the W11 table",
    (source) => {
      const site = claimRowSite(source);
      const [start, end] = site.rowLine;
      const body = nextTableBody(source);
      return applyEdits(site.page.text, [[start, end + 1, ""], [body, body, `${site.page.text.slice(start, end)}\n`]]);
    },
    "the W10 claim row is not inside the W10 section",
  ],
  ["G5 a second, unstamped claim row (the 9df9a03 row without its capability token) beside the stamped one", (source) => editRow(source, (row) => [row, DUP_NO_TOKEN]), "2 table rows on the page read as the W10 claim row"],
  ["G6 stamped row hidden in a multi-line comment behind a visible unstamped claim row", (source) => editRow(source, (row) => [DUP_NO_TOKEN, "<!--", row, "-->"]), "carries no stamped receipt sentence"],
  ["G6b stamped row hidden in a multi-line comment, nothing visible in its place", (source) => editRow(source, (row) => ["<!--", row, "-->"]), "0 table rows on the page read as the W10 claim row"],
  ["G7 stamped row moved into a fenced code block after a visible unstamped claim row", (source) => editRow(source, (row) => [DUP_NO_TOKEN, "", "```", row, "```"]), "carries no stamped receipt sentence"],
  ["G9 the legacy receipt clause wrapped in an inline comment", (source) => hideSentence(source, LEGACY_MARKER), "historical receipt id cmd_994da817d4cd is not in the rendered Evidence cell"],
  ["K1 kill: the stamped sentence removed", withoutStamp, "carries no stamped receipt sentence"],
  ["K2 kill: the measured release restated as 0.1.716", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, "measured release 0.1.716"), "does not equal its slice"],
];

/** The gate-3 row-487 battery, receipt side. */
const GK_RECEIPT: readonly ReceiptMutant[] = [
  ["G8 the receipt's stamp line hidden in an inline comment", hideStampLine, "renders no RF_PREVIEW_RECEIPT line"],
  ["K3 kill: the receipt stamp cli_version moved to 0.1.716", (receipt) => receipt.replace(`"cli_version":"${CARRIER_RELEASE}"`, '"cli_version":"0.1.716"'), "differs from the carrier release"],
];

/** The gate-3 row-487 rendering-neutral controls. */
const R_CONTROLS: readonly Control[] = [
  [
    "R1 an extra space after the row's leading pipe",
    (source) =>
      editClaim(source, (site) => {
        const first = firstCell(site);
        return [[first.start, first.start, " "]];
      }),
  ],
  ["R2 a complete comment quoting the retired literal after a cell sentence", (source) => inEvidence(source, "Bead wb-x32 (open).", "Bead wb-x32 (open). <!-- formerly rf@0.1.583 -->")],
];

/** Hiding and duplication shapes outside the batteries. */
const H_PAGE: readonly PageMutant[] = [
  ["H1 an unclosed details block before the W10 heading", (source) => atW10Heading(source, "<details>\n\n"), "raw HTML"],
  ["H2 a hidden span inside the claim row", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `<span hidden>measured release ${CARRIER_RELEASE}</span>`), "raw HTML"],
  ["H3 an unclosed block comment opened before the W10 heading (marked hides everything after it)", (source) => atW10Heading(source, "<!-- unclosed\n\n"), "0 headings on the page read as a W10 heading"],
  ["H4 a second W10 heading as a setext heading at EOF", (source) => `${source}\nW10: ReactiveFiber provider/interop\n---\n`, "2 headings on the page read as a W10 heading"],
  ["H5 a second W10 heading nested in a list item", (source) => `${source}\n- ## W10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
  ["H6 a second W10 heading with a fullwidth look-alike", (source) => `${source}\n## ${at(0xff37)}10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
  [
    "H7 a duplicate claim row with a Cyrillic look-alike first cell, in the W11 table",
    (source) => {
      const site = claimRowSite(source);
      const o = firstCell(site).units[1];
      if (o === undefined || o[0] !== "o") throw new Error("mutant authoring: the claim row's first cell does not render node()");
      const text = site.page.text;
      return intoNextTable(source, `${text.slice(site.rowLine[0], o[1])}${at(0x43e)}${text.slice(o[2], site.rowLine[1])}`);
    },
    "2 table rows on the page read as the W10 claim row",
  ],
  ["H8 the claim row only in a block-quoted table inside the W10 section", (source) => editRow(source, (row) => ["", "> | Feature | Status | Evidence | Caveats |", "> | --- | --- | --- | --- |", `> ${row}`, ""]), "not a body row of a top-level table"],
  [
    "H9 the stamped sentence struck through",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[0], "~~"], [span[1], span[1], "~~"]];
      }),
    "carries no stamped receipt sentence",
  ],
  [
    "H10 the stamped sentence moved from the Evidence cell to the Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        const caveats = cellUnder(site, "Caveats");
        return [[span[0], span[1], ""], [caveats.end, caveats.end, ` ${site.page.text.slice(span[0], span[1])}`]];
      }),
    "carries no stamped receipt sentence",
  ],
  [
    "H11 a negated copy of the stamped sentence beside the real one",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const { span } = sentenceOf(evidence, STAMP_MARKER);
        const [measured] = spanOf(evidence, `measured release ${CARRIER_RELEASE}`);
        const text = site.page.text;
        return [[span[1], span[1], ` ${text.slice(span[0], measured)}never ${text.slice(measured, span[1])}`]];
      }),
    "2 rendered sentences read as a stamped receipt sentence",
  ],
  ["H12 an attribute-bearing tag in another section's table cell", (source) => atCuratedRow(source, '| <id class="x"> '), "raw HTML"],
  ["H13 a raw-text element tag in another section's table cell", (source) => atCuratedRow(source, "| <style> "), "raw HTML"],
  ["H14 a trailing line after a block comment's close", (source) => atW10Heading(source, "<!-- note --> trailing raw text\n\n"), "raw HTML"],
];

/** Rendering-neutral controls outside the batteries. */
const C_CONTROLS: readonly Control[] = [
  ["C1 the page with CRLF line endings", (source) => source.replaceAll("\n", "\r\n")],
  ["C2 a complete comment between the W10 heading and its table", (source) => afterW10Heading(source, "<!-- reviewer note -->\n")],
  ["C3 emphasis around the measured release", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `**measured release ${CARRIER_RELEASE}**`)],
  ["C4 a character reference for a space inside the stamped sentence", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `measured&#32;release ${CARRIER_RELEASE}`)],
  ["C5 an unclosed inline comment opener in another section's cell (marked lexes it as text and escapes it, so it hides nothing)", (source) => atCuratedRow(source, "| <!-- open ")],
];

/** The gate-1 row-500 battery, page side (J1-J19, J25-J27; N6 carried as a kill), each with its named diagnosis. */
const J_PAGE: readonly PageVariant[] = [
  [
    "J1 partial hide: the measured-release half of the stamped sentence in an inline comment",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const { span } = sentenceOf(evidence, STAMP_MARKER);
        const [from] = spanOf(evidence, `measured release ${CARRIER_RELEASE} (RF_PREVIEW_RECEIPT`);
        return [[from, span[1], commented(site.page.text.slice(from, span[1]))]];
      }),
    ["is not the committed stamped-sentence slice"],
  ],
  ["J2 a weakening level-3 subsection inside the W10 section, above the table", (source) => afterW10Heading(source, "### Withdrawn: the rows below are retracted and no longer claimed\n\n"), ['the W10 section holds a level-3 heading "Withdrawn: the rows below are retracted and no longer claimed"']],
  [
    "J3 a weakening paragraph inside the W10 section, above the table",
    (source) => afterW10Heading(source, "**Withdrawn.** The stamped receipt row below was never measured during that run; no claim in this table holds.\n\n"),
    ['the W10 section holds a paragraph block "Withdrawn. The stamped receipt row below was never measured during that run; no claim in this table holds."'],
  ],
  [
    "J4 the claim row moved into a second table under a weakening level-3 subsection, still inside W10",
    (source) => {
      const site = claimRowSite(source);
      const end = sectionEnd(w10HeadingSite(source));
      const text = site.page.text;
      const line = (span: readonly [number, number] | undefined): string => (span === undefined ? "" : text.slice(span[0], span[1]));
      const block = `\n### Withdrawn rows (not claimed)\n\n${line(site.lines[0])}\n${line(site.lines[1])}\n${line(site.rowLine)}\n\n`;
      return applyEdits(text, [[site.rowLine[0], site.rowLine[1] + 1, ""], [end, end, block]]);
    },
    ['the W10 section holds a level-3 heading "Withdrawn rows (not claimed)"', "the W10 section holds 2 tables, not exactly its one committed table"],
  ],
  [
    "J5 the claim row's Status cell weakened to 'withdrawn'",
    (source) =>
      editClaim(source, (site) => {
        const status = cellUnder(site, "Status");
        return [[status.start, status.end, "withdrawn"]];
      }),
    ["the W10 claim row's rendered Status cell reads \"withdrawn\", not its committed text"],
  ],
  [
    "J6 the claim row's Feature cell weakened with a suffix",
    (source) =>
      editClaim(source, (site) => {
        const feature = cellUnder(site, "Feature");
        return [[feature.end, feature.end, " (withdrawn: never measured)"]];
      }),
    ["the W10 claim row's rendered Feature cell reads", "possible per the pinned producer trace (withdrawn: never measured)", "the W10 table's rendered first cells read"],
  ],
  [
    "J7 a trailing sentence after the stamped sentence that contradicts it",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[1], span[1], " The stamp above was not measured during that run."]];
      }),
    ['the rendered Evidence cell holds a sentence outside its committed slice: "The stamp above was not measured during that run."'],
  ],
  ["J8 a duplicate unstamped claim row whose first cell is paraphrased with a hyphen ('non-committed')", (source) => editRow(source, (row) => [row, unstampedRow("node() RF non-committed context preview capability")]), ["the W10 table's rendered first cells read", '"node() RF non-committed context preview capability"']],
  ["J9 a duplicate unstamped claim row whose first cell has a space before the parentheses", (source) => editRow(source, (row) => [row, unstampedRow("node () RF noncommitted context preview capability")]), ["the W10 table's rendered first cells read", '"node () RF noncommitted context preview capability"']],
  [
    "J10 the unstamped claim restated as a list item inside the W10 section, after the table",
    (source) => atW10SectionEnd(source, "\n- node() RF noncommitted context preview capability: landed-gated on cmd_994da817d4cd only (unstamped 0.1.583-era run); no measured release.\n\n"),
    ['the W10 section holds a list block "node() RF noncommitted context preview capability: landed-gated on cmd_994da817d4cd only (unstamped 0.1.583-era run); no measured release."'],
  ],
  ["J11 a duplicate unstamped claim row with the exact capability phrase in another table (W11)", (source) => intoNextTable(source, unstampedRow(CLAIM_PHRASE)), ["2 table rows on the page read as the W10 claim row"]],
  [
    "J12 the stamped sentence hidden in an image's alt text",
    (source) =>
      editClaim(source, (site) => {
        const { text, span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[1], `![${text}](receipt.png)`]];
      }),
    ["carries no stamped receipt sentence"],
  ],
  [
    "J13 the stamped sentence hidden in a link title",
    (source) =>
      editClaim(source, (site) => {
        const { text, span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[1], `[receipt](receipts/receipt.md "${text.replaceAll('"', "")}")`]];
      }),
    ["carries no stamped receipt sentence"],
  ],
  [
    "J14 the W10 heading demoted to level 3",
    (source) => {
      const site = w10HeadingSite(source);
      const hash = site.heading.raw.indexOf("#");
      if (hash < 0) throw new Error("mutant authoring: the W10 heading is not an ATX heading");
      return applyEdits(site.page.text, [[site.start + hash, site.start + hash, "#"]]);
    },
    ["is not the top-level level-2 heading"],
  ],
  [
    "J15 the W10 heading turned into a bold paragraph",
    (source) => {
      const site = w10HeadingSite(source);
      return applyEdits(site.page.text, [[site.start, headingLineEnd(site), `**${site.heading.text}**`]]);
    },
    ["0 headings on the page read as a W10 heading"],
  ],
  ["J16 a weakening level-2 heading inserted between the W10 heading and its table", (source) => afterW10Heading(source, "## Retracted claims\n\n"), ["the W10 claim row is not inside the W10 section"]],
  ["J17 the stamped sentence's release slot partly struck through", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `~~measured~~ release ${CARRIER_RELEASE}`), ["is not the committed stamped-sentence slice"]],
  [
    "J18 the legacy receipt clause moved from the Evidence cell to the Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), LEGACY_MARKER);
        const caveats = cellUnder(site, "Caveats");
        const trailing = site.page.text[span[1]] === " " ? 1 : 0;
        return [[span[0], span[1] + trailing, ""], [caveats.end, caveats.end, ` ${site.page.text.slice(span[0], span[1])}`]];
      }),
    ["historical receipt id cmd_994da817d4cd is not in the rendered Evidence cell"],
  ],
  [
    "J19 the W10 table's Evidence and Caveats header labels swapped",
    (source) => {
      const site = claimRowSite(source);
      const header = site.lines[0];
      if (header === undefined) throw new Error("mutant authoring: no W10 header line");
      return applyEdits(site.page.text, [[header[0], header[1], "| Feature | Status | Caveats | Evidence |"]]);
    },
    ["carries no stamped receipt sentence"],
  ],
  [
    "J25 a weakening level-1 heading inserted before the W10 heading (W10 now sits under it)",
    (source) => atW10Heading(source, "# Appendix: withdrawn claims (not part of this matrix)\n\n"),
    ['a level-1 heading "Appendix: withdrawn claims (not part of this matrix)" stands between the page title and the W10 heading'],
  ],
  [
    "J26 the W10 heading text weakened with a suffix",
    (source) => {
      const site = w10HeadingSite(source);
      const last = headingUnits(site).at(-1);
      if (last === undefined) throw new Error("mutant authoring: the W10 heading renders nothing");
      return applyEdits(site.page.text, [[last[2], last[2], " (withdrawn)"]]);
    },
    ['the W10 heading renders "W10: ReactiveFiber provider/interop (withdrawn)", not its committed "W10: ReactiveFiber provider/interop"'],
  ],
  [
    "J27 the W10 table header weakened (Evidence column label kept)",
    (source) =>
      editClaim(source, (site) => {
        const feature = site.header[0];
        if (feature === undefined) throw new Error("mutant authoring: no W10 header cells");
        return [[feature.end, feature.end, " (withdrawn, not claimed)"]];
      }),
    ['the W10 table\'s rendered header row reads ["Feature (withdrawn, not claimed)","Status","Evidence","Caveats"]', "the W10 claim row's table names no Feature column"],
  ],
  [
    "N6 (carried as a kill: the first cells are pinned) a new unrelated row above the claim row in the W10 table",
    (source) => editRow(source, (row) => ["| Unrelated RF diagnostics row | planned | none | none |", row]),
    ['the W10 table\'s rendered first cells read ["Unrelated RF diagnostics row",'],
  ],
];

/** The gate-1 row-500 battery, receipt side (receipt edits keep fail-closed raw anchors). */
const J_RECEIPT: readonly ReceiptVariant[] = [
  [
    "J20 a newer receipt entry whose stamp names a different run (the row still cites the old run)",
    (receipt) => `${receipt.replace(/\n+$/, "")}\n\n## 2026-10-18 re-run\n\n- Run of record: forge cmd_0123456789ab.\n- \`RF_PREVIEW_RECEIPT {"cli_version":"${CARRIER_RELEASE}"}\`\n`,
    ["which the receipt entry carrying the newest stamp line does not render"],
  ],
  [
    "J21 a newer receipt entry stamped with an older producer release",
    (receipt) => `${receipt.replace(/\n+$/, "")}\n\n## 2026-10-18 re-run\n\n- Run of record: forge ${liveStamp().cmd}.\n- \`RF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\`\n`,
    ["stamped release 0.1.583 differs from the carrier release"],
  ],
  [
    "J22 the receipt's stamp line moved into an image's alt text",
    (receipt) => {
      const start = receipt.indexOf("  `RF_PREVIEW_RECEIPT");
      const stop = start < 0 ? -1 : receipt.indexOf("`\n", start + 3) + 1;
      if (start < 0 || stop <= 0) throw new Error("mutant authoring: no receipt stamp line");
      return `${receipt.slice(0, start)}  ![${receipt.slice(start + 3, stop - 1)}](stamp.png)${receipt.slice(stop)}`;
    },
    ["renders no RF_PREVIEW_RECEIPT line"],
  ],
  ["J23 every mention of the stamped run id in the receipt wrapped in a comment (stamp line kept)", (receipt) => receipt.replaceAll(liveStamp().cmd, `<!-- ${liveStamp().cmd} -->`), ["which the receipt entry carrying the newest stamp line does not render"]],
];

/** The gate-1 row-500 battery, INDEX side. */
const J_INDEX: readonly IndexVariant[] = [["J24 the receipt's INDEX line moved into a fenced code block", fenceIndexLine]];

/** The gate-1 row-500 rendering-neutral controls on the page: each is accepted, and each is a C1 authoring base. */
const N_PAGE: readonly Control[] = [
  [
    "N1 the claim row's first cell bolded",
    (source) =>
      editClaim(source, (site) => {
        const [start, end] = spanOf(firstCell(site), CLAIM_PHRASE);
        return [[start, start, "**"], [end, end, "**"]];
      }),
  ],
  [
    "N2 the parentheses of the claim row's first cell escaped (stack-safe: the first two not yet escaped)",
    (source) =>
      editClaim(source, (site) => {
        const text = site.page.text;
        const parens = firstCell(site).units.filter(([unit, start]) => (unit === "(" || unit === ")") && text[start - 1] !== "\\");
        const [open, close] = parens;
        if (open === undefined || close === undefined) throw new Error("mutant authoring: no two unescaped parentheses in the claim row's first cell");
        return [[open[1], open[2], `\\${open[0]}`], [close[1], close[2], `\\${close[0]}`]];
      }),
  ],
  [
    "N3 a character reference for the W of the W10 heading (stack-safe: the first heading character written as itself)",
    (source) => {
      const site = w10HeadingSite(source);
      const plain = headingUnits(site).find(([unit, start, end]) => end - start === 1 && /^[0-9A-Za-z]$/.test(unit));
      if (plain === undefined) throw new Error("mutant authoring: no W10 heading character written as itself");
      return applyEdits(site.page.text, [[plain[1], plain[2], `&#${plain[0].codePointAt(0) ?? 0};`]]);
    },
  ],
  [
    "N4 an ATX closing sequence on the W10 heading (stack-safe: an existing closing sequence gains one #)",
    (source) => {
      const site = w10HeadingSite(source);
      const eol = headingLineEnd(site);
      const last = headingUnits(site).at(-1);
      if (last === undefined) throw new Error("mutant authoring: the W10 heading renders nothing");
      const hash = site.page.text.slice(last[2], eol).lastIndexOf("#");
      return hash < 0 ? applyEdits(site.page.text, [[eol, eol, " ##"]]) : applyEdits(site.page.text, [[last[2] + hash + 1, last[2] + hash + 1, "#"]]);
    },
  ],
  [
    "N5 a complete inline comment between two words of the stamped sentence, spaces on both sides",
    (source) =>
      editClaim(source, (site) => {
        const [start] = spanOf(evidenceOf(site), `measured release ${CARRIER_RELEASE} (`, 8, 9);
        return [[start, start, " <!-- c -->"]];
      }),
  ],
  [
    "N7 a link reference definition appended at EOF (renders nothing; stack-safe: a label not yet defined)",
    (source) => {
      const page = lexed(source);
      let label = "rf-receipt";
      for (let next = 1; label in page.tokens.links; next++) label = `rf-receipt-${next}`;
      return `${page.text.replace(/\n+$/, "")}\n\n[${label}]: receipts/receipt.md\n`;
    },
  ],
  [
    "N8 the stamped sentence's receipt path as a link (link text renders; stack-safe: an existing link gains a title)",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const receipt = `receipts/${readStampShape(sentenceOf(evidence, STAMP_MARKER).text)?.slots.receipt ?? ""}.md`;
        const [start, end] = spanOf(evidence, `${receipt}, gated`, 0, receipt.length);
        const text = site.page.text;
        if (text[start - 1] !== "[") return [[start, end, `[${receipt}](${receipt})`]];
        if (!text.startsWith(`](${receipt})`, end)) throw new Error("mutant authoring: the receipt path's link has a form this control does not know");
        const close = end + receipt.length + 2;
        return [[close, close, ' "receipt"']];
      }),
  ],
  ["N9 trailing white space after the claim row's closing pipe", (source) => editRow(source, (row) => [`${row}   `])],
];

/** The gate-1 row-500 rendering-neutral control on the INDEX. */
const N_INDEX: readonly IndexVariant[] = [["N10 the INDEX link destination wrapped in angle brackets", angleIndexLink]];

/** The R5 AC1 rows (W) and the gate-1 row-547 battery (X1-X7, wb-2j3.4 respin), each refused with every named diagnosis. */
const W_PAGE: readonly PageVariant[] = [
  ["W1 (AC1, RED at 9df9a03) the claim row as it read at 9df9a03", (source) => editRow(source, () => [ROW_AT_9DF9A03]), [withdrawnCause("Feature", "zero durable writes"), PLANE_SCOPED_CAUSE]],
  [
    "W2 the descriptor's spelling of the withdrawn claim appended to the claim row's Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const caveats = cellUnder(site, "Caveats");
        return [[caveats.end, caveats.end, " The preview makes no durable writes."]];
      }),
    [withdrawnCause("Caveats", "no durable write"), "the W10 claim row's rendered Caveats cell reads"],
  ],
  [
    "W3 the withdrawn claim with a Cyrillic look-alike o in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has zer${at(0x43e)} durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
  [
    "W4 a one-column table at EOF whose header row is the 9df9a03 Feature cell (a header row reads as a claim row too)",
    (source) => `${source}\n\n| ${FEATURE_AT_9DF9A03} |\n| --- |\n`,
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("column 1", "zero durable writes")],
  ],
  [
    "W5 the plane-scoped clause with a Cyrillic look-alike o in its first word (required text is read exactly, never folded)",
    (source) =>
      editClaim(source, (site) => {
        const [start, end] = spanOf(firstCell(site), "no authoritative");
        return [[start, end, `n${at(0x43e)} authoritative`]];
      }),
    [PLANE_SCOPED_CAUSE, "the W10 claim row's rendered Feature cell reads"],
  ],
  [
    "W6 the withdrawn claim split by an ASCII control character inside its first word in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has ze${at(0x1)}ro durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
  [
    "X1 a duplicate W10 heading at EOF carrying the withdrawn claim row",
    (source) => `${source}\n\n## W10: ReactiveFiber provider/interop\n\n| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n${WITHDRAWN_ROW}\n`,
    ["2 headings on the page read as a W10 heading", "2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X2 a second claim row carrying the withdrawn claim, two leading spaces (still a table row)",
    (source) => editRow(source, (row) => [row, `  ${WITHDRAWN_ROW}`]),
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X3 a second claim row carrying the withdrawn claim, tight pipes",
    (source) => editRow(source, (row) => [row, `|${WITHDRAWN_CELLS.join("|")}|`]),
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X4 a level-1 heading between the W10 heading and its table (the row leaves W10 when rendered)",
    (source) => afterW10Heading(source, "# Appendix: withdrawn rows\n"),
    ["the W10 claim row is not inside the W10 section", "the W10 section holds 0 tables"],
  ],
  ["X5 the claim row hidden in a multi-line HTML comment (it renders nothing)", (source) => editRow(source, (row) => ["<!--", row, "-->"]), ["0 table rows on the page read as the W10 claim row"]],
  [
    "X6 the claim row moved into a fenced code block (it renders as code, not a row)",
    (source) => editRow(source, (row) => ["```", row, "```"]),
    ["0 table rows on the page read as the W10 claim row", "the W10 section holds a code block"],
  ],
  [
    "X7 the withdrawn claim split by a zero-width space in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has zero${at(0x200b)} durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
];

/** The gate-1 row-547 rendering-neutral controls (that battery's N1/N2, carried as XN1/XN2): each is accepted. */
const XN_CONTROLS: readonly Control[] = [
  ["XN1 trailing spaces after the claim row's last pipe", (source) => editRow(source, (row) => [`${row}   `])],
  ["XN2 an extra blank line between the W10 heading and its table", (source) => afterW10Heading(source, "")],
];

/** The ops a RECORD pin re-authors its site with (recordEdit() writes each one). */
type RecordOp = "stamped" | "rewritten" | "removed" | "commented" | "lookalike" | "cased" | "invisible" | "moved" | "doubled" | "folded" | "swapped" | "coded" | "later" | "trailing";
/** A RECORD pin: refused with each named diagnosis in order (and no other finding), or accepted: neutral by design (a rendering-neutral edit, or one the binding does not read) or a named residual. */
type RecordPin = { op: RecordOp; reading: "refused"; causes: readonly [string, ...string[]] } | { op: RecordOp; reading: "neutral" | "residual" };
/** One record site of the live stamped receipt's newest stamp entry: an other cmd_* id it renders (decoy), its heading clause, or a Run of record line. */
interface RecordRow {
  id: string;
  slot: "decoy" | "heading" | "line";
  index: number;
  label: string;
  pins: readonly RecordPin[];
}

/** RUN OF RECORD rows (wb-j4lx, owner R691 F4), one per record site of the live stamped receipt's newest stamp entry (RR0 anchors them to it). */
const RECORD_ROWS: readonly RecordRow[] = [
  {
    id: "RR1",
    slot: "decoy",
    index: 0,
    label: "the first other cmd_* id the entry renders",
    pins: [
      { op: "stamped", reading: "refused", causes: ["the run of record of the receipt entry carrying the newest stamp line"] },
      { op: "rewritten", reading: "residual" },
    ],
  },
  {
    id: "RR2",
    slot: "decoy",
    index: 1,
    label: "the second other cmd_* id the entry renders",
    pins: [
      { op: "stamped", reading: "refused", causes: ["the run of record of the receipt entry carrying the newest stamp line"] },
      { op: "rewritten", reading: "residual" },
    ],
  },
  {
    id: "RR3",
    slot: "decoy",
    index: 2,
    label: "the third other cmd_* id the entry renders",
    pins: [
      { op: "stamped", reading: "refused", causes: ["the run of record of the receipt entry carrying the newest stamp line"] },
      { op: "rewritten", reading: "residual" },
    ],
  },
  {
    id: "RR4",
    slot: "heading",
    index: 0,
    label: "the entry heading's one (receipt of record cmd_*) clause",
    pins: [
      { op: "removed", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "commented", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "lookalike", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "cased", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "invisible", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "moved", reading: "refused", causes: ["names 0 runs of record in its heading"] },
      { op: "doubled", reading: "refused", causes: ["names 2 runs of record in its heading"] },
      { op: "folded", reading: "refused", causes: ["reads as naming a receipt of record outside its one"] },
      { op: "swapped", reading: "refused", causes: ['first in a "Run of record:" line', "the run of record of the receipt entry carrying the newest stamp line"] },
      { op: "coded", reading: "neutral" },
      { op: "later", reading: "neutral" },
    ],
  },
  {
    id: "RR5",
    slot: "line",
    index: 0,
    label: "the entry's Run of record line",
    pins: [
      { op: "removed", reading: "refused", causes: ['renders no "Run of record:" line'] },
      { op: "swapped", reading: "refused", causes: ['first in a "Run of record:" line'] },
      { op: "lookalike", reading: "refused", causes: ['first in a "Run of record:" line'] },
      { op: "coded", reading: "neutral" },
      { op: "trailing", reading: "residual" },
    ],
  },
];

/** A RECORD pin as the frozen-shape literal reads it. */
const pinShape = (pin: RecordPin): string => (pin.reading === "refused" ? `${pin.op} refused: ${pin.causes.join(" | ")}` : `${pin.op} ${pin.reading}`);

/** The ops a TSX pin re-authors its site with (tsxEdit() writes each one). */
type TsxOp =
  | "changed"
  | "emptied"
  | "zeroed"
  | "malformed"
  | "unknown"
  | "renamed"
  | "swapped"
  | "removed"
  | "dropped"
  | "doubled"
  | "older"
  | "prose"
  | "stray"
  | "split"
  | "reworded"
  | "lookalike"
  | "unreadable"
  | "absent"
  | "html"
  | "unmarked"
  | "foreign"
  | "extended"
  | "prefixed"
  | "truncated"
  | "inner"
  | "cased"
  | "padded"
  | "indented"
  | "duplicated";
/** A TSX pin: refused with exactly its findings, each whole and in order, or accepted: neutral by design (a value R9's shape admits) or a named residual. */
type TsxPin = { op: TsxOp; reading: "refused"; causes: readonly [string, ...string[]] } | { op: TsxOp; reading: "neutral" | "residual" };
/** One site the TSX-era binding reads (a field of a receipt row, a record site of the TSX entry, the page sentence) or a named residual. */
interface TsxRow {
  id: string;
  site: string;
  label: string;
  pins: readonly TsxPin[];
}

/** TS6's near names (wb-m14y, the wb-ojur gate's F2 J-g3, and the wb-m14y gate's F1 G4): seven RF-TSX-RECEIPT row names, each
 * one a comparison weaker than exact membership in the R9 pair would accept: an R9 name with text after it (a prefix match) or
 * before it (a suffix match), a proper prefix and a proper suffix of an R9 name (the two reverse matches), an R9 name in
 * another case (a case-folded match), one with trailing white space (a trimmed match) and one with leading white space (a
 * start-trimmed match). */
const TSX_NEAR_NAMES = { extended: "success-retry", prefixed: "pre-success", truncated: "runtime", inner: "absent", cased: "Success", padded: "success ", indented: " success" } as const;

/** TSX ROWS (wb-693.7), one per refused site of the binding in T-ANCHOR's order, then the named residuals. */
const TSX_ROWS: readonly TsxRow[] = [
  {
    id: "T1",
    site: "success:cli_version",
    label: "the success row's captured cli_version",
    pins: [
      { op: "changed", reading: "refused", causes: ["receipts/wb-693.7.md: success row cli_version \"0.1.846\", not the sentence's 0.1.845"] },
      { op: "emptied", reading: "refused", causes: ["receipts/wb-693.7.md: success row cli_version \"\" is not a non-empty string", "receipts/wb-693.7.md: success row cli_version \"\", not the sentence's 0.1.845"] },
    ],
  },
  {
    id: "T2",
    site: "success:tsx_worker_spawns",
    label: "the success row's TSX worker spawn count",
    pins: [
      { op: "zeroed", reading: "refused", causes: ["receipts/wb-693.7.md: success row tsx_worker_spawns 0 is not a count of at least 1", "receipts/wb-693.7.md: success row tsx_worker_spawns 0, not the sentence's 1"] },
      { op: "changed", reading: "refused", causes: ["receipts/wb-693.7.md: success row tsx_worker_spawns 2, not the sentence's 1"] },
    ],
  },
  {
    id: "T3",
    site: "success:distribution_version",
    label: "the success row's tsx_runtime distribution_version",
    pins: [
      { op: "changed", reading: "refused", causes: ["receipts/wb-693.7.md: success row distribution_version \"2.9.8\", not the sentence's 2.9.7"] },
      { op: "emptied", reading: "refused", causes: ["receipts/wb-693.7.md: success row distribution_version \"\" is not a non-empty string", "receipts/wb-693.7.md: success row distribution_version \"\", not the sentence's 2.9.7"] },
    ],
  },
  {
    id: "T4",
    site: "success:contract_fingerprint",
    label: "the success row's tsx_runtime contract_fingerprint",
    pins: [
      { op: "malformed", reading: "refused", causes: ["receipts/wb-693.7.md: success row contract_fingerprint \"sha256:000000000000000000000000000000000000000000000000000000000000000\" does not have the tier's fingerprint shape"] },
      { op: "unknown", reading: "neutral" },
    ],
  },
  {
    id: "T5",
    site: "runtime-absent:category",
    label: "the runtime-absent row's refusal category",
    pins: [
      { op: "changed", reading: "refused", causes: ["receipts/wb-693.7.md: runtime-absent row category \"transport\", not \"unavailable\""] },
    ],
  },
  {
    id: "T6",
    site: "runtime-absent:message",
    label: "the runtime-absent row's refusal message",
    pins: [
      { op: "renamed", reading: "refused", causes: ["receipts/wb-693.7.md: runtime-absent row message \"RF render refused: RF_RENDER_FAILED\" does not contain RF_COMPONENT_RUNTIME_ABSENT"] },
    ],
  },
  {
    id: "T7",
    site: "record:heading",
    label: "the TSX entry heading's one (receipt of record cmd_*) clause",
    pins: [
      { op: "swapped", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names its run of record cmd_5a28029cd55c in its heading but cmd_130f00c9f3ea first in a \"Run of record:\" line", "the TSX-era receipt sentence names cmd_130f00c9f3ea, which is not cmd_5a28029cd55c, the run of record of the receipt entry carrying the newest RF-TSX-RECEIPT lines"] },
      { op: "removed", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names 0 runs of record in its heading; exactly one \"(receipt of record cmd_*)\" clause binds the TSX-era run"] },
      { op: "stray", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines has a heading that reads as naming a receipt of record outside its one \"(receipt of record cmd_130f00c9f3ea)\" clause"] },
      { op: "doubled", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names 2 runs of record in its heading; exactly one \"(receipt of record cmd_*)\" clause binds the TSX-era run"] },
    ],
  },
  {
    id: "T8",
    site: "record:run-line",
    label: "the TSX entry's Run of record line",
    pins: [
      { op: "removed", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines renders no \"Run of record:\" line confirming its run of record cmd_130f00c9f3ea"] },
      { op: "swapped", reading: "refused", causes: ["receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names its run of record cmd_130f00c9f3ea in its heading but cmd_5a28029cd55c first in a \"Run of record:\" line"] },
    ],
  },
  {
    id: "T9",
    site: "page:sentence",
    label: "the W10 claim row's TSX-era receipt sentence",
    pins: [
      { op: "dropped", reading: "refused", causes: ["the rendered Evidence cell carries no TSX-era receipt sentence"] },
      { op: "doubled", reading: "refused", causes: ["2 rendered sentences read as a TSX-era receipt sentence, not exactly one"] },
      { op: "split", reading: "refused", causes: ["the TSX-era receipt sentence's two engine slots read 2.9.7 and 2.9.8, not one pinned Deno release", "the TSX-era receipt sentence does not equal its slice (engine slots read 2.9.7, 2.9.8)"] },
      { op: "reworded", reading: "refused", causes: ["the TSX-era receipt sentence is not the committed TSX-era slice: \"TSX-era receipt row (R9, 2026-10-26): receipts/wb-693.7.md, gated forge run rf-preview-tsx cmd_130f00c9f3ea against the operator-provisioned installed rf serving kind tsx with the pinned Deno 2.9.7 first on PATH, 1 of 2 rows passed: the success row (RF-TSX-RECEIPT cli_version 0.1.845, tsx_worker_spawns 1, tsx_runtime distribution_version 2.9.7) and the runtime-absent row (category unavailable, RF_COMPONENT_RUNTIME_ABSENT under a no-deno PATH); the R2 carrier keeps its stamped release (a re-pin moves only through the gated rf-preview route).\""] },
      { op: "lookalike", reading: "refused", causes: ["2 rendered sentences read as a TSX-era receipt sentence, not exactly one"] },
    ],
  },
  {
    id: "T10",
    site: "residual:older-entry",
    label: "an older receipt entry's RF-TSX-RECEIPT lines (the newest-entry reading)",
    pins: [
      { op: "older", reading: "residual" },
    ],
  },
  {
    id: "T11",
    site: "residual:prose",
    label: "the receipt's prose restating the tier's unprinted assertions",
    pins: [
      { op: "prose", reading: "residual" },
    ],
  },
];

/** TSX STRUCTURE ROWS (wb-ojur, the wb-693.7 gate's F1): one per diagnosis arm of the TSX-era judge that no field, record or
 * page site above draws, in T-ARMS's order (the order a source-order walk of judgeTsxRow reaches the arms). */
const TSX_STRUCTURE_ROWS: readonly TsxRow[] = [
  {
    id: "TS1",
    site: "page:evidence-cell",
    label: "the W10 claim row's Evidence cell the sentence is read from",
    pins: [
      { op: "unreadable", reading: "refused", causes: ["the W10 section holds 0 tables, not exactly its one committed table", "the W10 claim row is not inside the W10 section", "the W10 claim row's Evidence cell cannot be read, so no TSX-era receipt sentence is judged"] },
    ],
  },
  {
    id: "TS2",
    site: "receipt:file",
    label: "the receipt file the sentence names",
    pins: [
      { op: "absent", reading: "refused", causes: ["the TSX-era receipt sentence cites receipts/wb-693.7.md but that receipt file does not exist"] },
    ],
  },
  {
    id: "TS3",
    site: "receipt:html",
    label: "raw HTML anywhere in the TSX receipt",
    pins: [
      { op: "html", reading: "refused", causes: ["receipts/wb-693.7.md holds raw HTML \"<div hidden>\\n- `RF-TSX-RECEIPT {\\\"row\\\":\\\"success\\\",\\\"cli_version\" that can hide rendered text (only complete comments are admitted here)"] },
    ],
  },
  {
    id: "TS4",
    site: "entry:marks",
    label: "the RF-TSX-RECEIPT lines the receipt renders",
    pins: [
      { op: "unmarked", reading: "refused", causes: ["receipts/wb-693.7.md renders no RF-TSX-RECEIPT line"] },
    ],
  },
  {
    id: "TS5",
    site: "entry:line-json",
    label: "one RF-TSX-RECEIPT line's JSON object",
    pins: [
      { op: "malformed", reading: "refused", causes: ["receipts/wb-693.7.md: an RF-TSX-RECEIPT line of its newest TSX entry is not one JSON object"] },
    ],
  },
  {
    id: "TS6",
    site: "entry:row-name",
    label: "an RF-TSX-RECEIPT row named outside the R9 pair, and one name per weaker comparison (TSX_NEAR_NAMES)",
    pins: [
      { op: "foreign", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"partial\", outside the R9 pair"] },
      { op: "extended", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"success-retry\", outside the R9 pair"] },
      { op: "prefixed", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"pre-success\", outside the R9 pair"] },
      { op: "truncated", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"runtime\", outside the R9 pair"] },
      { op: "inner", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"absent\", outside the R9 pair"] },
      { op: "cased", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"Success\", outside the R9 pair"] },
      { op: "padded", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"success \", outside the R9 pair"] },
      { op: "indented", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \" success\", outside the R9 pair"] },
    ],
  },
  {
    id: "TS7",
    site: "entry:row-count",
    label: "the R9 pair's one line per row",
    pins: [
      { op: "duplicated", reading: "refused", causes: ["receipts/wb-693.7.md: its newest TSX entry renders 2 success rows, not exactly one"] },
    ],
  },
];

/** A TSX pin as the frozen-shape literal reads it. */
const tsxPinShape = (pin: TsxPin): string => (pin.reading === "refused" ? `${pin.op} refused: ${pin.causes.join(" | ")}` : `${pin.op} ${pin.reading}`);

/** One T-ARMS-FORMS probe (wb-m14y, the wb-ojur gate's F1): a construct armProbe() writes into the judge's source, and the
 * reading readJudgeArms() must give it against the live reading: the `added` arm pattern sources at index `at` (after the last
 * live arm when "end"), `drops` live arms taken out of reach from that index, and the reason of each unread entry, in order. */
interface ArmForm {
  id: string;
  label: string;
  /** The top-level function the probe writes into: its code goes before that function's last statement. */
  into: string;
  code?: string;
  /** A top-level statement the probe adds before `into`. */
  declaration?: string;
  /** A return type the probe writes over `into`'s own. */
  retype?: string;
  at: number | "end";
  added: readonly string[];
  drops?: number;
  unread: readonly string[];
}

/** The unread reason of a list T-ARMS traces used outside the forms it reads (FAIL CLOSED). */
const UNREAD_LIST_USE = "the diagnosis list findings used outside the forms T-ARMS reads";

/** T-ARMS-FORMS (wb-m14y): AF rows are forms the flow reading reads, as arms or as the live reading unchanged (AF2-AF6 are the
 * wb-ojur gate's IP-E1 to IP-E5, AF1/AF7/AF8 the landed forms IP-A1 to IP-A3, AF16 its IP-K1 re-annotation; AF17 and AF18 are
 * this bead's gate's G2 and G2b), AU rows are forms it refuses as unread, each with its FAIL CLOSED reason (AU27 and AU28 are
 * the gate's G1 and G1b), AR1 is the named residual pinned quiet: a standard-library method replaced outside the judge is never
 * read. */
const ARM_FORMS: readonly ArmForm[] = [
  { id: "AF1", label: "a string pushed in judgeTsxRow (IP-A1)", into: "judgeTsxRow", code: 'findings.push("probe AF1");', at: "end", added: ["^probe AF1$"], unread: [] },
  { id: "AF2", label: "a push in tsxReceiptView, whose declared return is an object (IP-E1)", into: "tsxReceiptView", code: 'findings.push("probe AF2");', at: 6, added: ["^probe AF2$"], unread: [] },
  { id: "AF3", label: "a push of a const variable (IP-E2)", into: "judgeTsxRow", code: 'const probe_AF3 = "probe AF3";\n  findings.push(probe_AF3);', at: "end", added: ["^probe AF3$"], unread: [] },
  {
    id: "AF4",
    label: "a string[] helper whose return is a conditional expression (IP-E3)",
    into: "judgeTsxRow",
    declaration: 'function probe_AF4(flag: boolean): string[] {\n  return flag ? ["probe AF4 when"] : ["probe AF4 otherwise"];\n}',
    code: "findings.push(...probe_AF4(true));",
    at: "end",
    added: ["^probe AF4 when$", "^probe AF4 otherwise$"],
    unread: [],
  },
  { id: "AF5", label: "an arrow-function const helper (IP-E4)", into: "judgeTsxRow", declaration: 'const probe_AF5 = (): string[] => ["probe AF5"];', code: "findings.push(...probe_AF5());", at: "end", added: ["^probe AF5$"], unread: [] },
  { id: "AF6", label: "an unshift (IP-E5)", into: "judgeTsxRow", code: 'findings.unshift("probe AF6");', at: "end", added: ["^probe AF6$"], unread: [] },
  { id: "AF7", label: "a push in a helper the judge reaches (IP-A2)", into: "tsxRecordFindings", code: 'findings.push("probe AF7");', at: 24, added: ["^probe AF7$"], unread: [] },
  { id: "AF8", label: "a new string[] helper with an array-literal return (IP-A3)", into: "judgeTsxRow", declaration: 'function probe_AF8(): string[] {\n  return ["probe AF8"];\n}', code: "findings.push(...probe_AF8());", at: "end", added: ["^probe AF8$"], unread: [] },
  { id: "AF9", label: "a module-level const string", into: "judgeTsxRow", declaration: 'const PROBE_AF9 = "probe AF9";', code: "findings.push(PROBE_AF9);", at: "end", added: ["^probe AF9$"], unread: [] },
  { id: "AF10", label: "a helper returning one string", into: "judgeTsxRow", declaration: 'function probe_AF10(): string {\n  return "probe AF10";\n}', code: "findings.push(probe_AF10());", at: "end", added: ["^probe AF10$"], unread: [] },
  { id: "AF11", label: "a template with a substitution", into: "judgeTsxRow", code: `findings.push(\`probe AF11 \${receipt}\`);`, at: "end", added: ["^probe AF11 [\\s\\S]*?$"], unread: [] },
  { id: "AF12", label: "a conditional of two strings", into: "judgeTsxRow", code: 'findings.push(cmd === "" ? "probe AF12 when" : "probe AF12 otherwise");', at: "end", added: ["^probe AF12 when$", "^probe AF12 otherwise$"], unread: [] },
  { id: "AF13", label: "a push inside a callback", into: "judgeTsxRow", code: '[cmd].forEach(() => findings.push("probe AF13"));', at: "end", added: ["^probe AF13$"], unread: [] },
  { id: "AF14", label: "a local const list spread into a push", into: "judgeTsxRow", code: 'const probe_AF14 = ["probe AF14"];\n  findings.push(...probe_AF14);', at: "end", added: ["^probe AF14$"], unread: [] },
  { id: "AF15", label: "a local helper shadowing a reached one in the scope of its call is the one read (the checker's lexical binding)", into: "judgeTsxRow", code: 'const tsxRecordFindings = (): string[] => ["probe AF15"];', at: 19, added: ["^probe AF15$"], drops: 5, unread: [] },
  { id: "AF16", label: "the declared return type is not read (IP-K1: tsxRowFindings re-annotated readonly string[])", into: "tsxRowFindings", retype: "readonly string[]", at: 0, added: [], unread: [] },
  {
    id: "AF17",
    label: "a module-level helper the judge calls is read although a same-named const sits in a closure that does not enclose the call (the wb-m14y gate's G2)",
    into: "judgeTsxRow",
    declaration: 'function probe_AF17(): string[] {\n  return ["probe AF17"];\n}',
    code: "findings.push(...probe_AF17());\n  const probe_AF17_scope = (): number => {\n    const probe_AF17 = (): string[] => [];\n    return probe_AF17().length;\n  };\n  void probe_AF17_scope;",
    at: "end",
    added: ["^probe AF17$"],
    unread: [],
  },
  {
    id: "AF18",
    label: "a same-named copy of a reached helper in a closure that does not enclose its call leaves the reached helper read (the wb-m14y gate's G2b)",
    into: "judgeTsxRow",
    code: 'const probe_AF18_scope = (): number => {\n    function tsxRecordFindings(): string[] {\n      return ["probe AF18"];\n    }\n    return tsxRecordFindings().length;\n  };\n  void probe_AF18_scope;',
    at: 0,
    added: [],
    unread: [],
  },
  {
    id: "AF19",
    label: "a const named like the shared W10 view, declared in a helper's own scope, is entered like any other function",
    into: "judgeTsxRow",
    declaration: 'function probe_AF19(): string[] {\n  const w10View = (): { findings: string[] } => ({ findings: ["probe AF19"] });\n  const shadowed = w10View();\n  return [...shadowed.findings];\n}',
    code: "findings.push(...probe_AF19());",
    at: "end",
    added: ["^probe AF19$"],
    unread: [],
  },
  {
    id: "AF20",
    label: "a reached helper named in a type position (typeof) leaves the reading unchanged",
    into: "judgeTsxRow",
    code: "const probe_AF20: ReturnType<typeof tsxRecordFindings> = [];\n  void probe_AF20;",
    at: 0,
    added: [],
    unread: [],
  },
  {
    id: "AF21",
    label: "a push inside a class's extends expression is read (a value evaluated at run time, never a type position)",
    into: "judgeTsxRow",
    code: 'class probe_AF21 extends (findings.push("probe AF21"), Object) {}\n  void probe_AF21;',
    at: "end",
    added: ["^probe AF21$"],
    unread: [],
  },
  { id: "AU1", label: "a splice", into: "judgeTsxRow", code: 'findings.splice(0, 0, "probe AU1");', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU2", label: "an element write", into: "judgeTsxRow", code: 'findings[findings.length] = "probe AU2";', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU3", label: "an alias", into: "judgeTsxRow", code: 'const probe_AU3 = findings;\n  probe_AU3.push("probe AU3");', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU4", label: "the list passed to a helper", into: "judgeTsxRow", declaration: 'function probe_AU4(out: string[]): void {\n  out.push("probe AU4");\n}', code: "probe_AU4(findings);", at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU5", label: "a call of a global", into: "judgeTsxRow", code: 'findings.push(String("probe AU5"));', at: 0, added: [], unread: ["a call of String, not a function of this file T-ARMS enters"] },
  { id: "AU6", label: "a concatenation", into: "judgeTsxRow", code: 'findings.push("probe " + "AU6");', at: 0, added: [], unread: ["a diagnosis in a form T-ARMS does not read"] },
  { id: "AU7", label: "a spread of a method call", into: "judgeTsxRow", code: 'findings.push(...["probe AU7"].map((text) => text));', at: 0, added: [], unread: ["a diagnosis list in a form T-ARMS does not trace"] },
  {
    id: "AU8",
    label: "a module-level list",
    into: "judgeTsxRow",
    declaration: 'const PROBE_AU8: string[] = ["probe AU8"];',
    code: "findings.push(...PROBE_AU8);",
    at: 0,
    added: [],
    unread: ["a diagnosis list PROBE_AU8 that is not a const of the function returning it"],
  },
  {
    id: "AU9",
    label: "a let list",
    into: "judgeTsxRow",
    declaration: 'function probe_AU9(): string[] {\n  let out: string[] = [];\n  out = ["probe AU9"];\n  return out;\n}',
    code: "findings.push(...probe_AU9());",
    at: 0,
    added: [],
    unread: ["a diagnosis list out that is not a const of the function returning it"],
  },
  {
    id: "AU10",
    label: "a helper whose return is a method call",
    into: "judgeTsxRow",
    declaration: 'function probe_AU10(): string[] {\n  return Array.of("probe AU10");\n}',
    code: "findings.push(...probe_AU10());",
    at: 0,
    added: [],
    unread: ["a diagnosis list in a form T-ARMS does not trace"],
  },
  { id: "AU11", label: "a property the reached call's return does not carry", into: "judgeTsxRow", code: "findings.push(...read.probe_AU11);", at: 0, added: [], unread: ["a return of tsxReceiptView that does not carry exactly one probe_AU11"] },
  { id: "AU12", label: "the shared W10 view's list written", into: "judgeTsxRow", code: 'view.findings.push("probe AU12");', at: 0, added: [], unread: ["the diagnosis list view.findings used outside the forms T-ARMS reads"] },
  { id: "AU13", label: "a tagged template", into: "judgeTsxRow", code: "findings.push(String.raw`probe AU13`);", at: 0, added: [], unread: ["a diagnosis in a form T-ARMS does not read"] },
  {
    id: "AU14",
    label: "a parameter's default list",
    into: "judgeTsxRow",
    declaration: 'function probe_AU14(extra: string[] = ["probe AU14"]): string[] {\n  return extra;\n}',
    code: "findings.push(...probe_AU14());",
    at: 0,
    added: [],
    unread: ["a diagnosis list extra that is not a const of the function returning it"],
  },
  {
    id: "AU15",
    label: "a recursive flow (its own literal still read)",
    into: "judgeTsxRow",
    declaration: 'function probe_AU15(): string[] {\n  return [...probe_AU15(), "probe AU15"];\n}',
    code: "findings.push(...probe_AU15());",
    at: "end",
    added: ["^probe AU15$"],
    unread: ["a recursive diagnosis flow through probe_AU15"],
  },
  { id: "AU16", label: "an iteration over the list", into: "judgeTsxRow", code: "for (const probe_AU16 of findings) probe_AU16.trim();", at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU17", label: "a length write", into: "judgeTsxRow", code: 'findings.length = "probe AU17".length;', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU18", label: "the list as an argument of a global", into: "judgeTsxRow", code: 'Object.assign(findings, ["probe AU18"]);', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU19", label: "the value carrying a list aliased", into: "judgeTsxRow", code: 'const probe_AU19 = read;\n  probe_AU19.findings.push("probe AU19");', at: 0, added: [], unread: ["the value read carrying a diagnosis list used outside a property read"] },
  { id: "AU20", label: "a push through an element access", into: "judgeTsxRow", code: 'findings["push"]("probe AU20");', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU21", label: "a closure handing the list out", into: "judgeTsxRow", code: 'const probe_AU21 = (): string[] => findings;\n  probe_AU21().push("probe AU21");', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  { id: "AU22", label: "the list spread into itself", into: "judgeTsxRow", code: "findings.push(...findings);", at: 0, added: [], unread: ["the diagnosis list findings read inside its own flow"] },
  {
    id: "AU23",
    label: "a parameter shadowing a module-level const string (the checker's lexical binding)",
    into: "judgeTsxRow",
    declaration: 'const PROBE_AU23 = "probe AU23";\nfunction probe_AU23(PROBE_AU23: string): string[] {\n  return [PROBE_AU23];\n}',
    code: 'findings.push(...probe_AU23("x"));',
    at: 0,
    added: [],
    unread: ["a diagnosis read from PROBE_AU23, which is not a const value"],
  },
  {
    id: "AU24",
    label: "two module-level consts naming each other",
    into: "judgeTsxRow",
    declaration: "const PROBE_AU24A: string = PROBE_AU24B;\nconst PROBE_AU24B: string = PROBE_AU24A;",
    code: "findings.push(PROBE_AU24A);",
    at: 0,
    added: [],
    unread: ["a diagnosis flow deeper than T-ARMS reads"],
  },
  { id: "AU25", label: "the list carried by an object literal that is not returned", into: "judgeTsxRow", code: 'const probe_AU25 = { findings };\n  probe_AU25.findings.push("probe AU25");', at: 0, added: [], unread: [UNREAD_LIST_USE] },
  {
    id: "AU26",
    label: "a returned object literal with a spread",
    into: "judgeTsxRow",
    declaration: 'function probe_AU26(): { findings: string[] } {\n  const findings: string[] = [];\n  return { ...{ findings: ["probe AU26"] }, findings };\n}',
    code: "const probe_AU26_read = probe_AU26();\n  findings.push(...probe_AU26_read.findings);",
    at: 0,
    added: [],
    unread: ["a return of probe_AU26 that does not carry exactly one findings"],
  },
  {
    id: "AU27",
    label: "a generator helper whose diagnosis leaves through yield (the wb-m14y gate's G1)",
    into: "judgeTsxRow",
    declaration: 'function* probe_AU27(): Generator<string> {\n  yield "probe AU27";\n}',
    code: "findings.push(...probe_AU27());",
    at: 0,
    added: [],
    unread: ["a call of probe_AU27, a generator function T-ARMS does not enter"],
  },
  {
    id: "AU28",
    label: "a generator helper whose diagnosis leaves through yield*, spread twice (the wb-m14y gate's G1b)",
    into: "judgeTsxRow",
    declaration: 'function* probe_AU28(): Generator<string> {\n  yield* ["probe AU28"];\n}',
    code: "findings.push(...[...probe_AU28()]);",
    at: 0,
    added: [],
    unread: ["a call of probe_AU28, a generator function T-ARMS does not enter"],
  },
  {
    id: "AU29",
    label: "a const bound to a generator function expression",
    into: "judgeTsxRow",
    declaration: 'const probe_AU29 = function* (): Generator<string> {\n  yield "probe AU29";\n};',
    code: "findings.push(...probe_AU29());",
    at: 0,
    added: [],
    unread: ["a call of probe_AU29, a generator function T-ARMS does not enter"],
  },
  {
    id: "AU30",
    label: "a list carried by two members of a returned object literal, one of them written through",
    into: "judgeTsxRow",
    declaration: "function probe_AU30(): { findings: string[]; alias: string[] } {\n  const findings: string[] = [];\n  return { findings, alias: findings };\n}",
    code: 'const probe_AU30_read = probe_AU30();\n  probe_AU30_read.alias.push("probe AU30");\n  findings.push(...probe_AU30_read.findings);',
    at: 0,
    added: [],
    unread: [UNREAD_LIST_USE],
  },
  {
    id: "AU31",
    label: "a direct eval, which can write any binding in scope",
    into: "judgeTsxRow",
    code: `${DIRECT_EVAL}("0");`,
    at: 0,
    added: [],
    unread: ["a direct eval, whose code T-ARMS does not read"],
  },
  {
    id: "AU32",
    label: "a reached helper referenced other than as a callee (reassigned)",
    into: "judgeTsxRow",
    code: 'tsxRecordFindings = (): string[] => ["probe AU32"];',
    at: 0,
    added: [],
    unread: ["the function tsxRecordFindings referenced other than as the callee of a call"],
  },
  {
    id: "AU33",
    label: "a call of the shared W10 view in a list position",
    into: "judgeTsxRow",
    code: "findings.push(...w10View(page));",
    at: 0,
    added: [],
    unread: ["a call of w10View, not a function of this file T-ARMS enters"],
  },
  {
    id: "AU34",
    label: "a property of the shared W10 view other than its findings",
    into: "judgeTsxRow",
    code: "findings.push(...view.probe_AU34);",
    at: 0,
    added: [],
    unread: ["the shared W10 view's probe_AU34 read as a diagnosis list"],
  },
  {
    id: "AU35",
    label: "a hole in a diagnosis list",
    into: "judgeTsxRow",
    code: "findings.push(...[,]);",
    at: 0,
    added: [],
    unread: ["a hole in a diagnosis list"],
  },
  {
    id: "AU36",
    label: "a helper with an overload signature (a name with two declarations)",
    into: "judgeTsxRow",
    declaration: 'function probe_AU36(): string[];\nfunction probe_AU36(flag?: boolean): string[] {\n  return flag === true ? [] : ["probe AU36"];\n}',
    code: "findings.push(...probe_AU36());",
    at: 0,
    added: [],
    unread: ["a call of probe_AU36, not a function of this file T-ARMS enters"],
  },
  {
    id: "AU37",
    label: "a destructured const diagnosis",
    into: "judgeTsxRow",
    code: 'const [probe_AU37] = ["probe AU37"];\n  findings.push(probe_AU37);',
    at: 0,
    added: [],
    unread: ["a diagnosis read from probe_AU37, which is not a const value"],
  },
  {
    id: "AU38",
    label: "a return without a value",
    into: "judgeTsxRow",
    declaration: "function probe_AU38(): string[] {\n  return;\n}",
    code: "findings.push(...probe_AU38());",
    at: 0,
    added: [],
    unread: ["a return without a value"],
  },
  {
    id: "AU39",
    label: "a returned object literal with a computed member",
    into: "judgeTsxRow",
    declaration: 'function probe_AU39(): { findings: string[] } {\n  const findings: string[] = [];\n  return { findings, ["findings"]: ["probe AU39"] };\n}',
    code: "const probe_AU39_read = probe_AU39();\n  findings.push(...probe_AU39_read.findings);",
    at: 0,
    added: [],
    unread: ["a return of probe_AU39 that does not carry exactly one findings"],
  },
  {
    id: "AU40",
    label: "a property read as a list from a const not bound to a call",
    into: "judgeTsxRow",
    code: 'const probe_AU40 = { findings: ["probe AU40"] };\n  findings.push(...probe_AU40.findings);',
    at: 0,
    added: [],
    unread: ["a diagnosis list read from a value T-ARMS does not trace"],
  },
  {
    id: "AU41",
    label: "a reached helper rebound inside a class's extends expression (a value, never a type position)",
    into: "judgeTsxRow",
    code: "class probe_AU41 extends ((tsxRecordFindings = (): string[] => []), Object) {}\n  void probe_AU41;",
    at: 0,
    added: [],
    unread: ["the function tsxRecordFindings referenced other than as the callee of a call"],
  },
  {
    id: "AR1",
    label: "residual, pinned quiet: Array.prototype.push replaced at module level is never read",
    into: "judgeTsxRow",
    declaration: "Array.prototype.push = function probe_AR1(this: unknown[], ...items: unknown[]): number {\n  return items.length;\n};",
    at: 0,
    added: [],
    unread: [],
  },
];

/** A T-ARMS-FORMS probe as the frozen-shape literal reads it. */
const armFormShape = (form: ArmForm): string =>
  `${form.id} ${form.label} [${form.into}${form.retype === undefined ? "" : ` retyped ${form.retype}`}]: ${JSON.stringify(form.declaration ?? "")} + ${JSON.stringify(form.code ?? "")} -> +${form.added.join(" +") || "none"} at ${form.at}, -${form.drops ?? 0}; unread ${form.unread.join(" | ") || "none"}`;

/** `source` with one T-ARMS-FORMS probe written in, located with the TypeScript parser: its code before the last statement of
 * the top-level function it names, its return type over that function's own, and its declaration as a top-level statement
 * before that function. */
function armProbe(source: string, form: ArmForm): string {
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const target = file.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === form.into);
  const last = target?.body?.statements.at(-1);
  if (target === undefined || last === undefined) throw new Error(`mutant authoring: no top-level function ${form.into} with a body`);
  let probed = source;
  if (form.code !== undefined) probed = `${probed.slice(0, last.getStart(file))}${form.code}\n  ${probed.slice(last.getStart(file))}`;
  if (form.retype !== undefined) {
    if (target.type === undefined) throw new Error(`mutant authoring: ${form.into} declares no return type`);
    probed = `${probed.slice(0, target.type.getStart(file))}${form.retype}${probed.slice(target.type.end)}`;
  }
  if (form.declaration !== undefined) probed = `${probed.slice(0, target.getStart(file))}${form.declaration}\n${probed.slice(target.getStart(file))}`;
  if (probed === source) throw new Error(`mutant authoring: ${form.id} writes nothing`);
  return probed;
}

/** The TSX receipt with its one raw claim of record rewritten (a fail-closed raw anchor, as every receipt edit). */
function rosterClaimEdit(receipt: string, write: (claim: string) => string): string {
  const claims = [...receipt.matchAll(TSX_ROSTER_CLAUSE_ALL)].map((match) => match[0]);
  const [claim] = claims;
  if (claims.length !== 1 || claim === undefined) throw new Error("mutant authoring: the TSX receipt writes no one raw claim of record");
  return replaceOnce(receipt, claim, write(claim));
}

/** T-ROSTER-RENDERED (wb-m14y, the wb-ojur gate's F3 A5): receipt variants whose raw and rendered claims of record disagree,
 * each with the rows T-ROSTER must read from it. */
const ROSTER_VARIANTS: readonly (readonly [string, (receipt: string) => string, readonly number[]])[] = [
  ["TR1 commented: the claim of record inside a complete HTML comment renders nothing", (receipt) => rosterClaimEdit(receipt, (claim) => `<!-- ${claim} -->`), []],
  ["TR2 struck: the claim of record struck through is not asserted", (receipt) => rosterClaimEdit(receipt, (claim) => `~~${claim}~~`), []],
  ["TR3 escaped: the claim with its parentheses written as backslash escapes renders as the claim", (receipt) => rosterClaimEdit(receipt, (claim) => claim.replace("(", "\\(").replace(")", "\\)")), [11]],
  ["TR4 emphasized: the claim with its last row emphasized renders as the claim", (receipt) => rosterClaimEdit(receipt, (claim) => claim.replace(/T([0-9]+)\)$/, "*T$1*)")), [11]],
];


/** The receipt slot and run of record the committed TSX-era sentence names. */
const TSX_SLOTS: TsxSlots | undefined = readTsxShape(W10_COMMITTED.tsx)?.slots;

/** `text` with its one raw occurrence of `from` replaced by `to` (receipt edits keep fail-closed raw anchors). */
function replaceOnce(text: string, from: string, to: string): string {
  const found = text.indexOf(from);
  if (found < 0 || text.indexOf(from, found + 1) >= 0) throw new Error(`mutant authoring: no one raw ${JSON.stringify(from)}`);
  return `${text.slice(0, found)}${to}${text.slice(found + from.length)}`;
}

/** The receipt with one field of one RF-TSX-RECEIPT row re-authored (its JSON object rewritten in the tier's compact form). */
function tsxField(row: (typeof TSX_ROW_NAMES)[number], key: string, value: unknown): (receipt: string) => string {
  return (receipt) => {
    const open = receipt.indexOf(`${TSX_MARK}"row":${JSON.stringify(row)}`);
    const json = open < 0 ? undefined : balancedObject(receipt, open + TSX_MARK.length - 1);
    const parsed = tsxObject(json);
    if (json === undefined || parsed === undefined || JSON.stringify(parsed) !== json || !(key in parsed)) throw new Error(`mutant authoring: no compact ${row} row with ${key}`);
    return replaceOnce(receipt, json, JSON.stringify({ ...parsed, [key]: value }));
  };
}

/** The first cmd_* id the live TSX entry renders other than its run of record (the swap decoy). */
function tsxDecoy(receipt: string, record: string): string {
  const decoy = (receipt.match(CMD_ID_ALL) ?? []).find((id) => id !== record);
  if (decoy === undefined) throw new Error("mutant authoring: the TSX receipt renders no cmd_* id beside its run of record");
  return decoy;
}

/** The one raw "Run of record:" line of the receipt, newline included. */
function runLineOf(receipt: string): readonly [number, number] {
  const start = receipt.indexOf("\n- Run of record:");
  const stop = start < 0 ? -1 : receipt.indexOf("\n", start + 1);
  if (start < 0 || stop < 0 || receipt.indexOf("\n- Run of record:", start + 1) >= 0) throw new Error("mutant authoring: no one raw Run of record line");
  return [start + 1, stop + 1];
}

/** The receipt with `added(line)` as its own line right after the one raw line carrying `row`'s RF-TSX-RECEIPT mark. */
function afterTsxLine(row: (typeof TSX_ROW_NAMES)[number], added: (line: string) => string): (receipt: string) => string {
  return (receipt) => {
    const mark = `${TSX_MARK}"row":${JSON.stringify(row)}`;
    const found = receipt.indexOf(mark);
    const end = found < 0 ? -1 : receipt.indexOf("\n", found);
    if (found < 0 || end < 0 || receipt.indexOf(mark, found + 1) >= 0) throw new Error(`mutant authoring: no one raw ${row} RF-TSX-RECEIPT line`);
    const start = receipt.lastIndexOf("\n", found) + 1;
    return `${receipt.slice(0, end + 1)}${added(receipt.slice(start, end))}\n${receipt.slice(end + 1)}`;
  };
}

/** The edit one TSX pin makes: to the page, to the TSX receipt, or both; `absent` reads the named receipt as missing. */
function tsxEdit(row: TsxRow, op: TsxOp): { page?: (source: string) => string; receipt?: (receipt: string) => string; absent?: true } {
  const record = TSX_SLOTS?.cmd ?? "";
  const clause = `(receipt of record ${record})`;
  switch (`${row.site}/${op}`) {
    case "success:cli_version/changed":
      return { receipt: tsxField("success", "cli_version", "0.1.846") };
    case "success:cli_version/emptied":
      return { receipt: tsxField("success", "cli_version", "") };
    case "success:tsx_worker_spawns/zeroed":
      return { receipt: tsxField("success", "tsx_worker_spawns", 0) };
    case "success:tsx_worker_spawns/changed":
      return { receipt: tsxField("success", "tsx_worker_spawns", 2) };
    case "success:distribution_version/changed":
      return { receipt: tsxField("success", "distribution_version", "2.9.8") };
    case "success:distribution_version/emptied":
      return { receipt: tsxField("success", "distribution_version", "") };
    case "success:contract_fingerprint/malformed":
      return { receipt: tsxField("success", "contract_fingerprint", `sha256:${"0".repeat(63)}`) };
    case "success:contract_fingerprint/unknown":
      return { receipt: tsxField("success", "contract_fingerprint", "unknown") };
    case "runtime-absent:category/changed":
      return { receipt: tsxField("runtime-absent", "category", "transport") };
    case "runtime-absent:message/renamed":
      return { receipt: tsxField("runtime-absent", "message", "RF render refused: RF_RENDER_FAILED") };
    case "record:heading/swapped":
      return { receipt: (receipt) => replaceOnce(receipt, clause, `(receipt of record ${tsxDecoy(receipt, record)})`) };
    case "record:heading/removed":
      return { receipt: (receipt) => replaceOnce(receipt, ` ${clause}`, "") };
    case "record:heading/stray":
      return { receipt: (receipt) => replaceOnce(receipt, clause, `${clause} (Receipt Of Record ${record})`) };
    case "record:heading/doubled":
      return { receipt: (receipt) => replaceOnce(receipt, clause, `${clause} ${clause}`) };
    case "record:run-line/removed":
      return {
        receipt: (receipt) => {
          const [start, end] = runLineOf(receipt);
          return `${receipt.slice(0, start)}${receipt.slice(end)}`;
        },
      };
    case "record:run-line/swapped":
      return {
        receipt: (receipt) => {
          const [start, end] = runLineOf(receipt);
          return `${receipt.slice(0, start)}${replaceOnce(receipt.slice(start, end), record, tsxDecoy(receipt, record))}${receipt.slice(end)}`;
        },
      };
    case "page:sentence/dropped":
      return {
        page: (source) =>
          editClaim(source, (site) => {
            const { span } = sentenceOf(evidenceOf(site), TSX_MARKER);
            return [[span[0] - 1, span[1], ""]];
          }),
      };
    case "page:sentence/doubled":
      return {
        page: (source) =>
          editClaim(source, (site) => {
            const { span } = sentenceOf(evidenceOf(site), TSX_MARKER);
            return [[span[1], span[1], ` ${site.page.text.slice(span[0], span[1])}`]];
          }),
      };
    case "page:sentence/split":
      return { page: (source) => inEvidence(source, "tsx_runtime distribution_version 2.9.7", "tsx_runtime distribution_version 2.9.8") };
    case "page:sentence/reworded":
      return { page: (source) => inEvidence(source, "2 of 2 rows passed", "1 of 2 rows passed") };
    case "page:sentence/lookalike":
      return {
        page: (source) =>
          editClaim(source, (site) => {
            const { span } = sentenceOf(evidenceOf(site), TSX_MARKER);
            return [[span[1], span[1], ` ${replaceOnce(site.page.text.slice(span[0], span[1]), "TSX-era", `TSX-${at(0x435)}ra`)}`]];
          }),
      };
    case "page:evidence-cell/unreadable":
      return { page: (source) => afterW10Heading(source, "## Retracted claims\n\n") };
    case "receipt:file/absent":
      return { absent: true };
    case "receipt:html/html":
      return {
        receipt: (receipt) => {
          if (!receipt.endsWith("\n")) throw new Error("mutant authoring: the TSX receipt does not end with a newline");
          return `${receipt}\n<div hidden>\n- \`${TSX_MARK}"row":"success","cli_version":"9.9.9"}\`\n</div>\n`;
        },
      };
    case "entry:marks/unmarked":
      return {
        receipt: (receipt) => {
          if (!receipt.includes(TSX_MARK)) throw new Error("mutant authoring: the TSX receipt renders no RF-TSX-RECEIPT mark");
          return receipt.replaceAll(TSX_MARK, "RF-TSX-ROW {");
        },
      };
    case "entry:line-json/malformed":
      return { receipt: afterTsxLine("runtime-absent", () => `- \`${TSX_MARK}"row":"success","cli_version":}\``) };
    case "entry:row-name/foreign":
      return { receipt: afterTsxLine("runtime-absent", () => `- \`${TSX_MARK}"row":"partial","category":"unavailable"}\``) };
    case "entry:row-name/extended":
    case "entry:row-name/prefixed":
    case "entry:row-name/truncated":
    case "entry:row-name/inner":
    case "entry:row-name/cased":
    case "entry:row-name/padded":
    case "entry:row-name/indented": {
      const name = Object.entries(TSX_NEAR_NAMES).find(([near]) => near === op)?.[1];
      if (name === undefined) throw new Error(`mutant authoring: no TS6 near name for ${op}`);
      return { receipt: afterTsxLine("runtime-absent", () => `- \`${TSX_MARK}"row":${JSON.stringify(name)},"category":"unavailable"}\``) };
    }
    case "entry:row-count/duplicated":
      return { receipt: afterTsxLine("success", (line) => line) };
    case "residual:older-entry/older":
      return {
        receipt: (receipt) => {
          const heading = receipt.indexOf("\n## ");
          if (heading < 0) throw new Error("mutant authoring: the TSX receipt has no entry heading");
          const stale = `\n## 2026-10-25 an older TSX entry (receipt of record cmd_${"0".repeat(12)})\n\n- Run of record: forge cmd_${"0".repeat(12)}.\n- \`${TSX_MARK}"row":"success","cli_version":"0.0.1","tsx_worker_spawns":9,"distribution_version":"0.0.1","contract_fingerprint":"bad"}\`\n- \`${TSX_MARK}"row":"runtime-absent","category":"transport","message":"none"}\`\n`;
          return `${receipt.slice(0, heading)}${stale}${receipt.slice(heading)}`;
        },
      };
    case "residual:prose/prose":
      return { receipt: (receipt) => replaceOnce(receipt, "work.storage_write_count 0", "work.storage_write_count 1") };
    default:
      throw new Error(`mutant authoring: no TSX edit for ${row.site}/${op}`);
  }
}

/** One TSX pin's edit applied to the live page and receipt: the variant page, whether it edits anything, and the judge's findings. */
function tsxPinRun(row: TsxRow, pin: TsxPin): { variant: string; edited: boolean; findings: string[] } {
  const edit = tsxEdit(row, pin.op);
  const source = readText(MATRIX);
  const variant = edit.page === undefined ? source : edit.page(source);
  const named = TSX_SLOTS?.receipt ?? "";
  const reader: ReadReceipt = edit.absent === true ? (name) => (name === named ? undefined : liveReceipt(name)) : edit.receipt === undefined ? liveReceipt : readerWith(edit.receipt);
  return { variant, edited: variant !== source || reader(named) !== liveReceipt(named), findings: judgeTsxRow(variant, reader) };
}

/** A TSX pin judged on the live page and receipt: refused with exactly its named findings, each WHOLE and in order (wb-m14y, the
 * wb-ojur gate's F2 S5: the judge's own output anchors every cause, so a cause shortened in every literal of this file reds);
 * or accepted. */
function expectTsxPin(row: TsxRow, pin: TsxPin, label: string): void {
  const { edited, findings } = tsxPinRun(row, pin);
  expect(edited, `${label} edits neither the page nor the receipt`).toBe(true);
  expect(findings, label).toEqual(pin.reading === "refused" ? pin.causes : []);
}

/** The F rows' page edits (the F tests below author through the same helpers), each with its diagnosis, for C1. */
const F_PAGE: readonly (readonly [string, (source: string) => string, readonly string[], ((receipt: string) => string)?])[] = [
  ["F1", (source) => editRow(source, () => [ROW_AT_9DF9A03]), ["the rendered Evidence cell carries no stamped receipt sentence", "names rf@0.1.583 outside the retirement clause"]],
  ["F2", withoutStamp, ["carries no stamped receipt sentence"]],
  ["F3", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, "measured release 0.1.716"), ["does not equal its slice"]],
  ["F4", (source) => inEvidence(source, liveStamp().cmd, "cmd_000000000000"), ["does not render"]],
  ["F5", (source) => inEvidence(source, liveStamp().cmd, "cmd_994da817d4cd"), ["legacy unstamped ids do not count"], (receipt) => receipt.replaceAll(liveStamp().cmd, "cmd_994da817d4cd")],
  ...LEGACY_UNSTAMPED_IDS.map((id) => [`F12 ${id}`, (source: string) => inEvidence(source, id, "cmd_ffffffffffff"), [`historical receipt id ${id} is not in the rendered Evidence cell`]] as const),
  ["F13", (source) => inEvidence(source, "Bead wb-x32 (open).", "Bead wb-x32 (open). contractSource rf@0.1.583 context.render."), ["names rf@0.1.583 outside the retirement clause"]],
  ["F14", (source) => inEvidence(source, "the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept"), ["outside the retirement clause"]],
];

/** The F rows' receipt edits, for C1. */
const F_RECEIPT: readonly ReceiptVariant[] = [
  ["F6", (receipt) => receipt.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE"), ["renders no RF_PREVIEW_RECEIPT line"]],
  ...F7_STAMPS.map((replacement) => [`F7 ${replacement}`, (receipt: string) => breakStamp(receipt, replacement), ["carries no string cli_version"]] as const),
  ["F8", (receipt) => `${receipt}\nRF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\n`, ["differs from the carrier release"]],
];

/** Every page variant in this file with its diagnosis (C1 re-authors each on every N base); the RECORD pins carry their own C1 rows. */
const PAGE_VARIANTS: readonly (readonly [string, (source: string) => string, readonly string[], ((receipt: string) => string)?])[] = [
  ...F_PAGE,
  ...GK_PAGE.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ...H_PAGE.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ...J_PAGE,
  ...W_PAGE,
];

/** Every receipt variant in this file with its diagnosis; the RECORD pins carry their own C1 rows. */
const RECEIPT_VARIANTS: readonly ReceiptVariant[] = [
  ...F_RECEIPT,
  ...GK_RECEIPT.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ["H15", strikeStampLine, ["renders no RF_PREVIEW_RECEIPT line"]],
  ...J_RECEIPT,
];

/** Every INDEX variant in this file. */
const INDEX_VARIANTS: readonly IndexVariant[] = [["H16", commentIndexLine], ...J_INDEX];

/** Every page control in this file; the RECORD pins' accepted readings carry their own C1 rows. */
const CONTROLS: readonly Control[] = [...R_CONTROLS, ...C_CONTROLS, ...XN_CONTROLS];

describe("W10 stamped-release claim guard (wb-2j3.5, R6), read as the page renders", () => {
  const carrier = REACTIVE_FIBER_CONTRACT_SOURCE;
  const release = carrierRelease(carrier) ?? "";
  const page = (): string => readText(MATRIX);

  it("L1: the live W10 claim row cites a receipt row stamped with the measured release, and that release matches the R2 carrier", () => {
    expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
  });

  it("L2: the receipt the stamped sentence names is listed in the rendered receipts index (generated from the directory listing, wb-5zz)", () => {
    const parts = stampedParts(page());
    expect(parts).toBeDefined();
    expect(indexFindings(renderedIndex(), parts?.slots.receipt ?? "")).toEqual([]);
  });

  it("L3: the live stamped sentence fills every release slot with the carrier release and equals its own slice", () => {
    const parts = stampedParts(page());
    expect(release).not.toBe("");
    expect(parts?.releases).toEqual([release, release, release]);
    expect(parts?.sentence).toBe(stampSentence({ ...(parts?.slots ?? { date: "", receipt: "", cmd: "", release: "", pinBead: "" }), release }));
  });

  it("L4: the slice shape reads back exactly the slots stampSentence() writes (one source of the committed wording)", () => {
    const slots: StampSlots = { date: "2099-01-02", receipt: "wb-abc.1", cmd: "cmd_0123456789ab", release: "9.8.7", pinBead: "wb-def.2" };
    expect(readStampShape(stampSentence(slots))).toEqual({ slots, releases: ["9.8.7", "9.8.7", "9.8.7"] });
  });

  it("L5: the lead shape reads back exactly the slots evidenceLead() writes (one source of the committed lead wording)", () => {
    const slots: LeadSlots = { carrier: "rf@9.8.7:x.cli/v1 y --z", date: "2099-01-02", receipt: "wb-abc.1", retired: "1.2.3" };
    expect(readLeadShape(evidenceLead(slots))).toEqual(slots);
  });

  it("L6: the live Evidence cell is its seven committed sentences, its lead naming the R2 carrier and the stamped receipt (EVIDENCE COMPOSITION)", () => {
    const evidence = w10View(page()).evidence ?? "";
    const sentences = evidence.split(/(?<=\.) /);
    expect(sentences).toHaveLength(7);
    expect(sentences.slice(1, 4)).toEqual([W10_COMMITTED.tests, W10_COMMITTED.legacy, W10_COMMITTED.bead]);
    expect(sentences[5]).toBe(W10_COMMITTED.contract);
    expect(sentences[6]).toBe(W10_COMMITTED.tsx);
    const lead = readLeadShape(sentences[0] ?? "");
    expect(lead?.carrier).toBe(carrier);
    expect(lead?.receipt).toBe(stampedParts(page())?.slots.receipt);
    expect(evidenceFindings(evidence, carrier)).toEqual([]);
  });

  it("L7 (wb-2j3.4 AC1): no live row that reads as the W10 claim row renders the withdrawn durable-writes claim, and its Feature cell carries the plane-scoped clause", () => {
    expect(withdrawnClaimView(page())).toEqual([]);
  });

  it("L8 (wb-973.16 AC2): the live claim row re-states the descriptor contract - both input arms in its Feature cell, the new gate receipt ids in its own committed sentence - and keeps the legacy receipt clause unedited", () => {
    const view = w10View(page());
    expect(view.findings).toEqual([]);
    const sentences = (view.evidence ?? "").split(/(?<=\.) /);
    expect(sentences.filter((sentence) => sentence === W10_COMMITTED.contract)).toHaveLength(1);
    for (const id of ["cmd_448b9c90d4bd", "cmd_b1a13ceb80b6", "cmd_9af5362d3e08", "cmd_acbe436ec5c2"]) expect(W10_COMMITTED.contract.match(CMD_ID_ALL), id).toContain(id);
    expect(W10_COMMITTED.contract.match(CMD_ID_ALL)?.some((id) => LEGACY_UNSTAMPED_IDS.includes(id))).toBe(false);
    expect(sentences[2]).toBe(W10_COMMITTED.legacy);
    expect(W10_COMMITTED.firstCells[0]).toContain("input {model, task} or {view, taskId, model?}, never both");
    expect(readsAsPrefix(foldKey(W10_COMMITTED.firstCells[0]), CLAIM_KEY)).toBe(true);
    expect(W10_COMMITTED.cells[0]).toEqual(["Feature", W10_COMMITTED.firstCells[0]]);
    // Falsifiers: the re-statement dropped, reworded or relocated is refused under its own diagnosis.
    const dropped = editClaim(page(), (site) => {
      const { span } = sentenceOf(evidenceOf(site), CONTRACT_MARKER);
      return [[span[0] - 1, span[1], ""]];
    });
    expect(judgeW10Claim(dropped, liveReceipt, carrier)).toContain("the rendered Evidence cell lacks its committed descriptor contract sentence");
    const reworded = inEvidence(page(), "landing gate cmd_448b9c90d4bd", "live view-arm receipt cmd_448b9c90d4bd");
    expect(judgeW10Claim(reworded, liveReceipt, carrier).join("\n")).toContain("the rendered Evidence cell holds a sentence outside its committed slice: \"Descriptor contract re-stated (wb-973.16, ");
    const featureOnly = editClaim(page(), (site) => {
      const [start, end] = spanOf(firstCell(site), "; input {model, task} or {view, taskId, model?}, never both");
      return [[start, end, ""]];
    });
    expect(judgeW10Claim(featureOnly, liveReceipt, carrier).join("\n")).toContain("the W10 claim row's rendered Feature cell reads");
  });

  describe("falsifiers on the judge's own inputs (the fefe71f protections, kept)", () => {
    it("F1 (acceptance 1): the page with the row as it read at 9df9a03 (three unstamped 0.1.583-era receipts, no stamp) FAILS", () => {
      const findings = judgeW10Claim(editRow(page(), () => [ROW_AT_9DF9A03]), liveReceipt, carrier).join("\n");
      expect(findings).toContain("the rendered Evidence cell carries no stamped receipt sentence");
      expect(findings).toContain("names rf@0.1.583 outside the retirement clause");
    });

    it("F2: the stamped sentence removed from the live row (only the legacy ids remain) FAILS", () => {
      const variant = withoutStamp(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("carries no stamped receipt sentence");
    });

    it("F3: the row states a different measured release (0.1.716) than the receipt and carrier stamp FAILS", () => {
      const variant = inEvidence(page(), `measured release ${release}`, "measured release 0.1.716");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not equal its slice");
    });

    it("F4: the stamped sentence names a cmd_* id the receipt does not render FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const variant = inEvidence(page(), cmd, "cmd_000000000000");
      expect(cmd).toMatch(/^cmd_[0-9a-f]{12}$/);
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not render");
    });

    it("F5: the only shared receipt id is a legacy unstamped one (stamp id swapped for cmd_994da817d4cd in both row and receipt) FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const swapped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll(cmd, "cmd_994da817d4cd");
      const findings = judgeW10Claim(inEvidence(page(), cmd, "cmd_994da817d4cd"), swapped, carrier).join("\n");
      expect(findings).toContain("legacy unstamped ids do not count");
    });

    it("F6: the cited receipt renders no RF_PREVIEW_RECEIPT stamp line FAILS", () => {
      const stripped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE");
      expect(judgeW10Claim(page(), stripped, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("F7: the receipt stamp has no string cli_version (numeric, empty, or unparsable JSON) FAILS", () => {
      let ran = 0;
      for (const replacement of F7_STAMPS) {
        const broken = readerWith((text) => breakStamp(text, replacement));
        expect(judgeW10Claim(page(), broken, carrier).join("\n"), replacement).toContain("carries no string cli_version");
        ran++;
      }
      expect(ran).toBe(3);
    });

    it("F8: the newest rendered stamp line of the receipt disagrees with the carrier (older line matches, newest does not) FAILS", () => {
      const appended: ReadReceipt = (name) => {
        const text = liveReceipt(name);
        return text === undefined ? undefined : `${text}\nRF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\n`;
      };
      expect(judgeW10Claim(page(), appended, carrier).join("\n")).toContain("differs from the carrier release");
    });

    it("F9: the carrier is re-pinned away from the stamped release FAILS", () => {
      const findings = judgeW10Claim(page(), liveReceipt, "rf@0.1.583:reactive-fiber.cli/v1 context.render --no-commit");
      expect(findings.join("\n")).toContain("differs from the carrier release 0.1.583");
    });

    it("F10: a carrier that is not rf@<release>:<schema> FAILS", () => {
      expect(judgeW10Claim(page(), liveReceipt, "rf-latest").join("\n")).toContain("is not rf@<release>:<schema>");
    });

    it("F11: the cited receipt file is missing FAILS", () => {
      expect(judgeW10Claim(page(), () => undefined, carrier).join("\n")).toContain("receipt file does not exist");
    });

    it("F12: a legacy unstamped receipt id is edited out of the row (history rewritten) FAILS", () => {
      let ran = 0;
      for (const id of LEGACY_UNSTAMPED_IDS) {
        const findings = judgeW10Claim(inEvidence(page(), id, "cmd_ffffffffffff"), liveReceipt, carrier).join("\n");
        expect(findings, id).toContain(`historical receipt id ${id} is not in the rendered Evidence cell`);
        ran++;
      }
      expect(ran).toBe(3);
    });

    it("F13: a stale rf@ literal re-enters a rendered cell outside the retirement clause FAILS, while the retirement clause itself is tolerated", () => {
      const variant = inEvidence(page(), "Bead wb-x32 (open).", "Bead wb-x32 (open). contractSource rf@0.1.583 context.render.");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("names rf@0.1.583 outside the retirement clause");
      expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
    });

    it("F14: the stale literal the retirement clause quotes is itself changed to a non-clause form FAILS", () => {
      const variant = inEvidence(page(), "the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("outside the retirement clause");
    });

    it("U3 (EACH-LIVENESS): the shapes the F7 and F12 loops walk are exactly their pinned rows", () => {
      expect(F7_STAMPS).toHaveLength(3);
      expect(F7_STAMPS).toEqual(['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"]);
      expect(LEGACY_UNSTAMPED_IDS).toHaveLength(3);
      expect(LEGACY_UNSTAMPED_IDS).toEqual(["cmd_994da817d4cd", "cmd_7e50a487da08", "cmd_386a32a0323b"]);
    });
  });

  describe("independently-authored docs battery (gate-3 row 487, carried as the same raw-markdown edits): every G and K variant is judged unstamped", () => {
    for (const [name, mutate, cause] of GK_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    for (const [name, mutate, cause] of GK_RECEIPT) {
      it(`refuses ${name}`, () => {
        const mutated: ReadReceipt = (receipt) => {
          const text = liveReceipt(receipt);
          return text === undefined ? undefined : mutate(text);
        };
        const named = stampedParts(page())?.slots.receipt ?? "";
        expect(mutated(named)).not.toBe(liveReceipt(named));
        const findings = judgeW10Claim(page(), mutated, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    for (const [name, mutate] of R_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the G/K tables and the R controls hold exactly their named rows, in order", () => {
      expect(GK_PAGE).toHaveLength(11);
      expect(rowIds(GK_PAGE)).toEqual(["G1", "G2", "G3", "G4", "G5", "G6", "G6b", "G7", "G9", "K1", "K2"]);
      expect(GK_RECEIPT).toHaveLength(2);
      expect(rowIds(GK_RECEIPT)).toEqual(["G8", "K3"]);
      expect(R_CONTROLS).toHaveLength(2);
      expect(rowIds(R_CONTROLS)).toEqual(["R1", "R2"]);
    });
  });

  describe("hiding and duplication shapes outside the battery (H) and rendering-neutral controls (C)", () => {
    for (const [name, mutate, cause] of H_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    it("refuses H15 the receipt stamp line struck through", () => {
      const struck = readerWith(strikeStampLine);
      const named = stampedParts(page())?.slots.receipt ?? "";
      expect(struck(named)).not.toBe(liveReceipt(named));
      expect(judgeW10Claim(page(), struck, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("refuses H16 the receipt's INDEX line wrapped in a complete comment", () => {
      const named = stampedParts(page())?.slots.receipt ?? "";
      const index = renderedIndex();
      const variant = commentIndexLine(index, named);
      expect(named).not.toBe("");
      expect(variant).not.toBe(index);
      expect(indexFindings(variant, named).join("\n")).toContain(`renders no link to ${named}.md`);
    });

    for (const [name, mutate] of C_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the H table and the C controls hold exactly their named rows, in order", () => {
      expect(H_PAGE).toHaveLength(14);
      expect(rowIds(H_PAGE)).toEqual(["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13", "H14"]);
      expect(C_CONTROLS).toHaveLength(5);
      expect(rowIds(C_CONTROLS)).toEqual(["C1", "C2", "C3", "C4", "C5"]);
    });
  });

  describe("independently-authored docs battery (gate-1 row 500, carried as lexer-located edits): every J variant is refused with its named diagnosis and every N control accepted", () => {
    for (const [name, mutate, causes] of J_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, mutate, causes] of J_RECEIPT) {
      it(`refuses ${name}`, () => {
        const mutated = readerWith(mutate);
        const named = stampedParts(page())?.slots.receipt ?? "";
        expect(mutated(named)).not.toBe(liveReceipt(named));
        const findings = judgeW10Claim(page(), mutated, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, mutate] of J_INDEX) {
      it(`refuses ${name}`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const variant = mutate(index, named);
        expect(named).not.toBe("");
        expect(variant).not.toBe(index);
        expect(indexFindings(variant, named).join("\n")).toContain(`renders no link to ${named}.md`);
      });
    }

    for (const [name, neutral] of N_PAGE) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = neutral(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    for (const [name, neutral] of N_INDEX) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const variant = neutral(index, named);
        expect(variant).not.toBe(index);
        expect(indexFindings(variant, named)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the J and N tables hold exactly their named rows, in order", () => {
      expect(J_PAGE).toHaveLength(23);
      expect(rowIds(J_PAGE)).toEqual(["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J25", "J26", "J27", "N6"]);
      expect(J_RECEIPT).toHaveLength(4);
      expect(rowIds(J_RECEIPT)).toEqual(["J20", "J21", "J22", "J23"]);
      expect(J_INDEX).toHaveLength(1);
      expect(rowIds(J_INDEX)).toEqual(["J24"]);
      expect(N_PAGE).toHaveLength(8);
      expect(rowIds(N_PAGE)).toEqual(["N1", "N2", "N3", "N4", "N5", "N7", "N8", "N9"]);
      expect(N_INDEX).toHaveLength(1);
      expect(rowIds(N_INDEX)).toEqual(["N10"]);
    });
  });

  describe("W10 withdrawn-claim rows (wb-2j3.4 AC1) and the gate-1 row-547 battery, carried as lexer-located edits: every W and X variant is refused with each named diagnosis and every XN control accepted", () => {
    for (const [name, mutate, causes] of W_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBe(causes.length);
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, neutral] of XN_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = neutral(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
        expect(withdrawnClaimView(variant)).toEqual([]);
      });
    }

    it("W0: the 9df9a03 row alone, read by the WITHDRAWN CLAIM reading only, names its withdrawn claim and its missing plane-scoped clause", () => {
      const findings = withdrawnClaimView(editRow(page(), () => [ROW_AT_9DF9A03]));
      expect(findings).toHaveLength(2);
      expect(findings[0]).toContain(withdrawnCause("Feature", "zero durable writes"));
      expect(findings[1]).toBe(PLANE_SCOPED_CAUSE);
    });

    it("U3 (EACH-LIVENESS): the W table and the XN controls hold exactly their named rows, in order", () => {
      expect(W_PAGE).toHaveLength(13);
      expect(rowIds(W_PAGE)).toEqual(["W1", "W2", "W3", "W4", "W5", "W6", "X1", "X2", "X3", "X4", "X5", "X6", "X7"]);
      expect(XN_CONTROLS).toHaveLength(2);
      expect(rowIds(XN_CONTROLS)).toEqual(["XN1", "XN2"]);
    });

    it("W-SHAPE (standing rule 16 frozen shape): the withdrawn claims, the plane-scoped clause, every W and X row with its diagnoses and the XN controls are their frozen literal", () => {
      expect(WITHDRAWN_CLAIMS).toEqual(["zero durable writes", "no durable write"]);
      expect(PLANE_SCOPED_CLAUSE).toBe("no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace");
      expect(W_PAGE.map(([name, , causes]) => `${name.split(" ")[0] ?? name}:${causes.length}`)).toEqual(["W1:2", "W2:2", "W3:2", "W4:2", "W5:2", "W6:2", "X1:3", "X2:2", "X3:2", "X4:2", "X5:1", "X6:2", "X7:2"]);
      expect(W_PAGE.map(([name, , causes]) => [name, ...causes])).toEqual([
        ["W1 (AC1, RED at 9df9a03) the claim row as it read at 9df9a03", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell', 'the W10 claim row\'s rendered Feature cell does not carry the plane-scoped clause "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"'],
        ["W2 the descriptor's spelling of the withdrawn claim appended to the claim row's Caveats cell", 'a row that reads as the W10 claim row renders the withdrawn claim "no durable write" in its Caveats cell', "the W10 claim row's rendered Caveats cell reads"],
        ["W3 the withdrawn claim with a Cyrillic look-alike o in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
        ["W4 a one-column table at EOF whose header row is the 9df9a03 Feature cell (a header row reads as a claim row too)", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its column 1 cell'],
        ["W5 the plane-scoped clause with a Cyrillic look-alike o in its first word (required text is read exactly, never folded)", 'the W10 claim row\'s rendered Feature cell does not carry the plane-scoped clause "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"', "the W10 claim row's rendered Feature cell reads"],
        ["W6 the withdrawn claim split by an ASCII control character inside its first word in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
        ["X1 a duplicate W10 heading at EOF carrying the withdrawn claim row", "2 headings on the page read as a W10 heading", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X2 a second claim row carrying the withdrawn claim, two leading spaces (still a table row)", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X3 a second claim row carrying the withdrawn claim, tight pipes", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X4 a level-1 heading between the W10 heading and its table (the row leaves W10 when rendered)", "the W10 claim row is not inside the W10 section", "the W10 section holds 0 tables"],
        ["X5 the claim row hidden in a multi-line HTML comment (it renders nothing)", "0 table rows on the page read as the W10 claim row"],
        ["X6 the claim row moved into a fenced code block (it renders as code, not a row)", "0 table rows on the page read as the W10 claim row", "the W10 section holds a code block"],
        ["X7 the withdrawn claim split by a zero-width space in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
      ]);
      expect(XN_CONTROLS.map(([name]) => name)).toEqual(["XN1 trailing spaces after the claim row's last pipe", "XN2 an extra blank line between the W10 heading and its table"]);
    });
  });

  describe("RUN OF RECORD (wb-j4lx, owner R691 F4): the stamped cmd slot binds to the run of record its receipt entry names, never to any id the entry renders", () => {
    it("L9: the live stamped id is the run of record of the receipt entry carrying the newest stamp line: its heading's one exact clause and the first id of its Run of record line", () => {
      const parts = stampedParts(page());
      expect(parts).toBeDefined();
      const newest = receiptView(liveReceipt(parts?.slots.receipt ?? "") ?? "", "the live stamped receipt").newest;
      expect(newest?.records).toEqual([parts?.slots.cmd]);
      expect(newest?.strayRecord).toBe(false);
      expect(newest?.runLines).toEqual([parts?.slots.cmd]);
    });

    it("RR0 (outside anchor): the RECORD rows are exactly the record sites of the live stamped receipt's newest stamp entry, whose record is the live stamped id", () => {
      const sites = liveRecordSites();
      expect(sites.record).toBe(liveStamp().cmd);
      expect(RECORD_ROWS.map((row) => `${row.slot}:${row.index}`)).toEqual([...sites.decoys.map((_, index) => `decoy:${index}`), "heading:0", ...sites.lines.map((_, index) => `line:${index}`)]);
    });

    for (const row of RECORD_ROWS) {
      for (const pin of row.pins) {
        it(`${row.id} ${pin.op} (${row.label}): ${pin.reading === "refused" ? "refused with each named diagnosis and no other finding" : `accepted (${pin.reading})`}`, () => {
          expectRecordPin(page(), row, pin, `${row.id} ${pin.op}`);
        });
      }
    }

    for (const [name, neutral] of N_PAGE) {
      const id = name.split(" ")[0] ?? name;
      it(`C1 on the ${id} base: every RECORD pin is re-authored and read as on the committed page`, () => {
        const base = neutral(page());
        expect(base).not.toBe(page());
        let ran = 0;
        for (const row of RECORD_ROWS) {
          for (const pin of row.pins) {
            expectRecordPin(base, row, pin, `${id} + ${row.id} ${pin.op}`);
            ran++;
          }
        }
        expect(ran).toBe(22);
      });
    }

    it("RECORD-SHAPE (standing rule 16 frozen shape): every RECORD row's site, label, pins, readings and diagnoses are their frozen literal", () => {
      expect(RECORD_ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["RR1:2", "RR2:2", "RR3:2", "RR4:11", "RR5:5"]);
      expect(RECORD_ROWS.map((row) => [row.id, `${row.slot}:${row.index}`, row.label, ...row.pins.map(pinShape)])).toEqual([
        ["RR1", "decoy:0", "the first other cmd_* id the entry renders", "stamped refused: the run of record of the receipt entry carrying the newest stamp line", "rewritten residual"],
        ["RR2", "decoy:1", "the second other cmd_* id the entry renders", "stamped refused: the run of record of the receipt entry carrying the newest stamp line", "rewritten residual"],
        ["RR3", "decoy:2", "the third other cmd_* id the entry renders", "stamped refused: the run of record of the receipt entry carrying the newest stamp line", "rewritten residual"],
        [
          "RR4",
          "heading:0",
          "the entry heading's one (receipt of record cmd_*) clause",
          "removed refused: names 0 runs of record in its heading",
          "commented refused: names 0 runs of record in its heading",
          "lookalike refused: names 0 runs of record in its heading",
          "cased refused: names 0 runs of record in its heading",
          "invisible refused: names 0 runs of record in its heading",
          "moved refused: names 0 runs of record in its heading",
          "doubled refused: names 2 runs of record in its heading",
          "folded refused: reads as naming a receipt of record outside its one",
          'swapped refused: first in a "Run of record:" line | the run of record of the receipt entry carrying the newest stamp line',
          "coded neutral",
          "later neutral",
        ],
        [
          "RR5",
          "line:0",
          "the entry's Run of record line",
          'removed refused: renders no "Run of record:" line',
          'swapped refused: first in a "Run of record:" line',
          'lookalike refused: first in a "Run of record:" line',
          "coded neutral",
          "trailing residual",
        ],
      ]);
    });
  });

  describe("TSX-ERA RECEIPT ROW (wb-693.7, RF-TSX-AND-EMBEDDING-R9): the TSX-era receipt sentence binds to its receipt's run of record and to the R8 tier's two receipt rows", () => {
    it("T0: the live TSX-era receipt sentence is its committed slice and binds to the receipt it names", () => {
      expect(tsxSentences(w10View(page()).evidence ?? "")).toEqual([W10_COMMITTED.tsx]);
      const shape = readTsxShape(W10_COMMITTED.tsx);
      expect(shape?.slots).toEqual({ date: "2026-10-26", receipt: "wb-693.7", cmd: "cmd_130f00c9f3ea", engine: "2.9.7", cliVersion: "0.1.845", spawns: "1" });
      expect(shape?.engines).toEqual(["2.9.7", "2.9.7"]);
      expect(shape === undefined ? "" : tsxSentence(shape.slots)).toBe(W10_COMMITTED.tsx);
      expect(judgeTsxRow(page(), liveReceipt)).toEqual([]);
      expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
    });

    it("T-SLICE: the TSX shape reads back exactly the slots tsxSentence() writes, and a sentence whose engine slots differ reads back both", () => {
      const slots: TsxSlots = { date: "2099-01-02", receipt: "wb-abc.1", cmd: "cmd_0123456789ab", engine: "9.8.7", cliVersion: "1.2.3", spawns: "4" };
      expect(readTsxShape(tsxSentence(slots))).toEqual({ slots, engines: ["9.8.7", "9.8.7"] });
      expect(readTsxShape(tsxSentence(slots).replace("distribution_version 9.8.7", "distribution_version 9.8.6"))?.engines).toEqual(["9.8.7", "9.8.6"]);
    });

    it("T1-T11: every TSX pin is refused with exactly its findings, each whole and in order, or accepted (neutral by design or a named residual)", () => {
      let ran = 0;
      for (const row of TSX_ROWS) {
        for (const pin of row.pins) {
          expectTsxPin(row, pin, `${row.id} ${pin.op}`);
          ran++;
        }
      }
      expect(ran).toBe(23);
    });

    it("TS1-TS7 (wb-ojur; TS6's near names wb-m14y): every structure pin is refused with exactly its findings, each whole and in order", () => {
      let ran = 0;
      for (const row of TSX_STRUCTURE_ROWS) {
        for (const pin of row.pins) {
          expectTsxPin(row, pin, `${row.id} ${pin.op}`);
          ran++;
        }
      }
      expect(ran).toBe(14);
    });

    it("T-ARMS (outside anchor, the judge's own arms, read along its diagnosis flow with the header's FAIL CLOSED refusals): the reading holds no unread entry, every arm it reads is drawn by a refused pin, each finding reads as one arm or the shared W10 view, and the TS rows are exactly the arms no T row draws, in the judge's order", () => {
      const reading = readJudgeArms(readText(SELF));
      expect(reading.unread, "the reading holds no FAIL CLOSED refusal").toEqual([]);
      const arms = reading.arms.map((arm) => arm.pattern);
      expect(arms.length).toBeGreaterThan(0);
      const drawnBy = (rows: readonly TsxRow[]): string[][] =>
        rows.map((row) => {
          const drawn = new Set<number>();
          for (const pin of row.pins) {
            if (pin.reading !== "refused") continue;
            const { variant, findings } = tsxPinRun(row, pin);
            const shared = w10View(variant).findings;
            for (const finding of findings) {
              const matched = arms.flatMap((arm, index) => (arm.test(finding) ? [index] : []));
              expect(matched.length === 1 || (matched.length === 0 && shared.includes(finding)), `${row.id} ${pin.op} reads as ${matched.length} arms: ${finding}`).toBe(true);
              for (const index of matched) drawn.add(index);
            }
          }
          return [...drawn].sort((a, b) => a - b).map((index) => arms[index]?.source ?? "");
        });
      const fromT = new Set(drawnBy(TSX_ROWS).flat());
      const fromTs = drawnBy(TSX_STRUCTURE_ROWS);
      expect(fromTs).toEqual(arms.filter((arm) => !fromT.has(arm.source)).map((arm) => [arm.source]));
      const drawn = new Set([...fromT, ...fromTs.flat()]);
      expect(arms.filter((arm) => !drawn.has(arm.source)).map((arm) => arm.source)).toEqual([]);
    }, 60_000);

    it("T-ARMS-FORMS (wb-m14y, the wb-ojur gate's F1 and this bead's gate's U1): each probe written into the judge's source reads back as its frozen reading - the arms it adds where the judge's order puts them, the live arms it takes out of reach, and each unread entry it raises, in order", () => {
      const source = readText(SELF);
      const sources = readJudgeArms(source).arms.map((arm) => arm.pattern.source);
      expect(sources).toHaveLength(26);
      let ran = 0;
      for (const form of ARM_FORMS) {
        const probed = readJudgeArms(armProbe(source, form));
        const at = form.at === "end" ? sources.length : form.at;
        expect(
          probed.arms.map((arm) => arm.pattern.source),
          form.id,
        ).toEqual([...sources.slice(0, at), ...form.added, ...sources.slice(at + (form.drops ?? 0))]);
        expect(
          probed.unread.map((entry) => entry.slice(0, entry.indexOf(" (line "))),
          form.id,
        ).toEqual(form.unread);
        ran++;
      }
      expect(ran).toBe(63);
      const bare = readJudgeArms("");
      expect([bare.arms.length, ...bare.unread.map((entry) => entry.slice(0, entry.indexOf(" (line ")))], "a source with no judgeTsxRow").toEqual([0, "no judgeTsxRow function"]);
    }, 120_000);

    it("T-ARMS-ANCHORED (wb-m14y, the wb-ojur gate's F3 A4): every arm reads a sample built from its literal pieces with a line break inside every substitution, and no arm reads that sample with one character before its literal head or after its literal tail", () => {
      const { arms } = readJudgeArms(readText(SELF));
      let heads = 0;
      let tails = 0;
      for (const arm of arms) {
        const sample = arm.pieces.join("\n~\n");
        expect(arm.pattern.test(sample), arm.pattern.source).toBe(true);
        if ((arm.pieces[0] ?? "") !== "") {
          expect(arm.pattern.test(`#${sample}`), arm.pattern.source).toBe(false);
          heads++;
        }
        if ((arm.pieces[arm.pieces.length - 1] ?? "") !== "") {
          expect(arm.pattern.test(`${sample}#`), arm.pattern.source).toBe(false);
          tails++;
        }
      }
      expect([arms.length, heads, tails]).toEqual([26, 11, 20]);
    });

    it("T-ROSTER (outside anchor, the receipt's claim of record): the T rows are exactly T1 to the last row the TSX receipt names, so a row removed from every literal of this file still reds", () => {
      const receipt = liveReceipt(TSX_SLOTS?.receipt ?? "") ?? "";
      const named = rosterClaims(receipt);
      expect(named, "the TSX receipt names this guard's rows exactly once").toHaveLength(1);
      const last = named[0] ?? 0;
      expect(last).toBeGreaterThan(0);
      expect(TSX_ROWS.map((row) => row.id)).toEqual(Array.from({ length: last }, (_, index) => `T${index + 1}`));
    });

    it("T-ROSTER-RENDERED (wb-m14y, the wb-ojur gate's F3 A5): T-ROSTER reads the claim of record as the receipt renders - a claim hidden from the rendered page reads as no claim, and one written differently that renders the same reads as the claim", () => {
      const receipt = liveReceipt(TSX_SLOTS?.receipt ?? "") ?? "";
      expect(rosterClaims(receipt)).toEqual([TSX_ROWS.length]);
      let ran = 0;
      for (const [name, edit, rows] of ROSTER_VARIANTS) {
        const variant = edit(receipt);
        expect(variant, name).not.toBe(receipt);
        expect(rosterClaims(variant), name).toEqual(rows);
        ran++;
      }
      expect(ran).toBe(4);
    });

    it("T-ANCHOR (outside anchor): the refused TSX sites are exactly the fields the live receipt renders and the R8 tier prints, the TSX entry's record sites and the live page's one TSX-era sentence", () => {
      const receipt = liveReceipt(TSX_SLOTS?.receipt ?? "") ?? "";
      const fromReceipt = receiptTsxFields(receipt);
      const fromTier = tierReceiptFields(readText(TSX_TIER));
      expect(fromTier.length).toBeGreaterThan(0);
      expect(fromReceipt).toEqual(fromTier);
      const record = tsxReceiptView(receipt, "receipt").newest?.record;
      const recordSites = [...(record?.records ?? []).map(() => "record:heading"), ...(record?.runLines ?? []).map(() => "record:run-line")];
      const pageSites = tsxSentences(w10View(page()).evidence ?? "").map(() => "page:sentence");
      expect(TSX_ROWS.filter((row) => !row.site.startsWith("residual:")).map((row) => row.site)).toEqual([...fromTier, ...recordSites, ...pageSites]);
    });

    it("U3 (EACH-LIVENESS) and TSX-SHAPE (standing rule 16 frozen shape): the TSX table holds exactly its named rows, each with its frozen site, label and pins", () => {
      expect(TSX_ROWS).toHaveLength(11);
      expect(TSX_ROWS.map((row) => row.id)).toEqual(["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11"]);
      expect(TSX_ROWS.filter((row) => row.pins.length === 0).map((row) => row.id), "every TSX row keeps at least one pin").toEqual([]);
      expect(TSX_ROWS.map((row) => `${row.id} ${row.site} | ${row.label}: ${row.pins.map(tsxPinShape).join("; ")}`)).toEqual([
        "T1 success:cli_version | the success row's captured cli_version: changed refused: receipts/wb-693.7.md: success row cli_version \"0.1.846\", not the sentence's 0.1.845; emptied refused: receipts/wb-693.7.md: success row cli_version \"\" is not a non-empty string | receipts/wb-693.7.md: success row cli_version \"\", not the sentence's 0.1.845",
        "T2 success:tsx_worker_spawns | the success row's TSX worker spawn count: zeroed refused: receipts/wb-693.7.md: success row tsx_worker_spawns 0 is not a count of at least 1 | receipts/wb-693.7.md: success row tsx_worker_spawns 0, not the sentence's 1; changed refused: receipts/wb-693.7.md: success row tsx_worker_spawns 2, not the sentence's 1",
        "T3 success:distribution_version | the success row's tsx_runtime distribution_version: changed refused: receipts/wb-693.7.md: success row distribution_version \"2.9.8\", not the sentence's 2.9.7; emptied refused: receipts/wb-693.7.md: success row distribution_version \"\" is not a non-empty string | receipts/wb-693.7.md: success row distribution_version \"\", not the sentence's 2.9.7",
        "T4 success:contract_fingerprint | the success row's tsx_runtime contract_fingerprint: malformed refused: receipts/wb-693.7.md: success row contract_fingerprint \"sha256:000000000000000000000000000000000000000000000000000000000000000\" does not have the tier's fingerprint shape; unknown neutral",
        "T5 runtime-absent:category | the runtime-absent row's refusal category: changed refused: receipts/wb-693.7.md: runtime-absent row category \"transport\", not \"unavailable\"",
        "T6 runtime-absent:message | the runtime-absent row's refusal message: renamed refused: receipts/wb-693.7.md: runtime-absent row message \"RF render refused: RF_RENDER_FAILED\" does not contain RF_COMPONENT_RUNTIME_ABSENT",
        "T7 record:heading | the TSX entry heading's one (receipt of record cmd_*) clause: swapped refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names its run of record cmd_5a28029cd55c in its heading but cmd_130f00c9f3ea first in a \"Run of record:\" line | the TSX-era receipt sentence names cmd_130f00c9f3ea, which is not cmd_5a28029cd55c, the run of record of the receipt entry carrying the newest RF-TSX-RECEIPT lines; removed refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names 0 runs of record in its heading; exactly one \"(receipt of record cmd_*)\" clause binds the TSX-era run; stray refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines has a heading that reads as naming a receipt of record outside its one \"(receipt of record cmd_130f00c9f3ea)\" clause; doubled refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names 2 runs of record in its heading; exactly one \"(receipt of record cmd_*)\" clause binds the TSX-era run",
        "T8 record:run-line | the TSX entry's Run of record line: removed refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines renders no \"Run of record:\" line confirming its run of record cmd_130f00c9f3ea; swapped refused: receipts/wb-693.7.md: the entry carrying the newest RF-TSX-RECEIPT lines names its run of record cmd_130f00c9f3ea in its heading but cmd_5a28029cd55c first in a \"Run of record:\" line",
        "T9 page:sentence | the W10 claim row's TSX-era receipt sentence: dropped refused: the rendered Evidence cell carries no TSX-era receipt sentence; doubled refused: 2 rendered sentences read as a TSX-era receipt sentence, not exactly one; split refused: the TSX-era receipt sentence's two engine slots read 2.9.7 and 2.9.8, not one pinned Deno release | the TSX-era receipt sentence does not equal its slice (engine slots read 2.9.7, 2.9.8); reworded refused: the TSX-era receipt sentence is not the committed TSX-era slice: \"TSX-era receipt row (R9, 2026-10-26): receipts/wb-693.7.md, gated forge run rf-preview-tsx cmd_130f00c9f3ea against the operator-provisioned installed rf serving kind tsx with the pinned Deno 2.9.7 first on PATH, 1 of 2 rows passed: the success row (RF-TSX-RECEIPT cli_version 0.1.845, tsx_worker_spawns 1, tsx_runtime distribution_version 2.9.7) and the runtime-absent row (category unavailable, RF_COMPONENT_RUNTIME_ABSENT under a no-deno PATH); the R2 carrier keeps its stamped release (a re-pin moves only through the gated rf-preview route).\"; lookalike refused: 2 rendered sentences read as a TSX-era receipt sentence, not exactly one",
        "T10 residual:older-entry | an older receipt entry's RF-TSX-RECEIPT lines (the newest-entry reading): older residual",
        "T11 residual:prose | the receipt's prose restating the tier's unprinted assertions: prose residual",
      ]);
      expect([TSX_KEY, TSX_MARK, TSX_MARKER, TSX_TIER, RUNTIME_ABSENT_CODE, String(TSX_FINGERPRINT), ...TSX_ROW_NAMES]).toEqual([
        "tsx-era receipt row",
        "RF-TSX-RECEIPT {",
        "TSX-era receipt row (R9, ",
        "test/workbench-native-rf-tsx-preview.test.ts",
        "RF_COMPONENT_RUNTIME_ABSENT",
        "/^sha256:[0-9a-f]{64}$|^unknown$/",
        "success",
        "runtime-absent",
      ]);
    });

    it("U3 (EACH-LIVENESS) and TS-SHAPE (standing rule 16 frozen shape): the structure table holds exactly its named rows, each with its frozen site, label and pins, and the T-ARMS and T-ROSTER constants are their frozen literal", () => {
      expect(TSX_STRUCTURE_ROWS).toHaveLength(7);
      expect(TSX_STRUCTURE_ROWS.map((row) => row.id)).toEqual(["TS1", "TS2", "TS3", "TS4", "TS5", "TS6", "TS7"]);
      expect(TSX_STRUCTURE_ROWS.filter((row) => row.pins.length === 0).map((row) => row.id), "every structure row keeps at least one pin").toEqual([]);
      expect(TSX_STRUCTURE_ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["TS1:1", "TS2:1", "TS3:1", "TS4:1", "TS5:1", "TS6:8", "TS7:1"]);
      expect(TSX_STRUCTURE_ROWS.map((row) => `${row.id} ${row.site} | ${row.label}: ${row.pins.map(tsxPinShape).join("; ")}`)).toEqual([
        "TS1 page:evidence-cell | the W10 claim row's Evidence cell the sentence is read from: unreadable refused: the W10 section holds 0 tables, not exactly its one committed table | the W10 claim row is not inside the W10 section | the W10 claim row's Evidence cell cannot be read, so no TSX-era receipt sentence is judged",
        "TS2 receipt:file | the receipt file the sentence names: absent refused: the TSX-era receipt sentence cites receipts/wb-693.7.md but that receipt file does not exist",
        "TS3 receipt:html | raw HTML anywhere in the TSX receipt: html refused: receipts/wb-693.7.md holds raw HTML \"<div hidden>\\n- `RF-TSX-RECEIPT {\\\"row\\\":\\\"success\\\",\\\"cli_version\" that can hide rendered text (only complete comments are admitted here)",
        "TS4 entry:marks | the RF-TSX-RECEIPT lines the receipt renders: unmarked refused: receipts/wb-693.7.md renders no RF-TSX-RECEIPT line",
        "TS5 entry:line-json | one RF-TSX-RECEIPT line's JSON object: malformed refused: receipts/wb-693.7.md: an RF-TSX-RECEIPT line of its newest TSX entry is not one JSON object",
        "TS6 entry:row-name | an RF-TSX-RECEIPT row named outside the R9 pair, and one name per weaker comparison (TSX_NEAR_NAMES): foreign refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"partial\", outside the R9 pair; extended refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"success-retry\", outside the R9 pair; prefixed refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"pre-success\", outside the R9 pair; truncated refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"runtime\", outside the R9 pair; inner refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"absent\", outside the R9 pair; cased refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"Success\", outside the R9 pair; padded refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \"success \", outside the R9 pair; indented refused: receipts/wb-693.7.md: its newest TSX entry renders an RF-TSX-RECEIPT row named \" success\", outside the R9 pair",
        "TS7 entry:row-count | the R9 pair's one line per row: duplicated refused: receipts/wb-693.7.md: its newest TSX entry renders 2 success rows, not exactly one",
      ]);
      expect([SELF, SHARED_VIEW, DIRECT_EVAL, TSX_ROSTER_CLAUSE_ALL.source, ...ARM_ADDERS, UNREAD_LIST_USE, JSON.stringify(TSX_NEAR_NAMES)]).toEqual([
        "test/workbench-w10-stamped-claim-guard.test.ts",
        "w10View",
        "eval",
        "test\\/workbench-w10-stamped-claim-guard\\.test\\.ts pins it whole and binds it to this entry \\(TSX-ERA RECEIPT ROW, rows T0 to T([0-9]+)\\)",
        "push",
        "unshift",
        "the diagnosis list findings used outside the forms T-ARMS reads",
        '{"extended":"success-retry","prefixed":"pre-success","truncated":"runtime","inner":"absent","cased":"Success","padded":"success ","indented":" success"}',
      ]);
    });

    it("U3 (EACH-LIVENESS) and FORMS-SHAPE (standing rule 16 frozen shape): the T-ARMS-FORMS and T-ROSTER-RENDERED tables hold exactly their named rows, each with its frozen probe and reading", () => {
      expect(ARM_FORMS).toHaveLength(63);
      expect(ARM_FORMS.map((form) => form.id)).toEqual(["AF1", "AF2", "AF3", "AF4", "AF5", "AF6", "AF7", "AF8", "AF9", "AF10", "AF11", "AF12", "AF13", "AF14", "AF15", "AF16", "AF17", "AF18", "AF19", "AF20", "AF21", "AU1", "AU2", "AU3", "AU4", "AU5", "AU6", "AU7", "AU8", "AU9", "AU10", "AU11", "AU12", "AU13", "AU14", "AU15", "AU16", "AU17", "AU18", "AU19", "AU20", "AU21", "AU22", "AU23", "AU24", "AU25", "AU26", "AU27", "AU28", "AU29", "AU30", "AU31", "AU32", "AU33", "AU34", "AU35", "AU36", "AU37", "AU38", "AU39", "AU40", "AU41", "AR1"]);
      expect(ARM_FORMS.map(armFormShape)).toEqual([
        "AF1 a string pushed in judgeTsxRow (IP-A1) [judgeTsxRow]: \"\" + \"findings.push(\\\"probe AF1\\\");\" -> +^probe AF1$ at end, -0; unread none",
        "AF2 a push in tsxReceiptView, whose declared return is an object (IP-E1) [tsxReceiptView]: \"\" + \"findings.push(\\\"probe AF2\\\");\" -> +^probe AF2$ at 6, -0; unread none",
        "AF3 a push of a const variable (IP-E2) [judgeTsxRow]: \"\" + \"const probe_AF3 = \\\"probe AF3\\\";\\n  findings.push(probe_AF3);\" -> +^probe AF3$ at end, -0; unread none",
        "AF4 a string[] helper whose return is a conditional expression (IP-E3) [judgeTsxRow]: \"function probe_AF4(flag: boolean): string[] {\\n  return flag ? [\\\"probe AF4 when\\\"] : [\\\"probe AF4 otherwise\\\"];\\n}\" + \"findings.push(...probe_AF4(true));\" -> +^probe AF4 when$ +^probe AF4 otherwise$ at end, -0; unread none",
        "AF5 an arrow-function const helper (IP-E4) [judgeTsxRow]: \"const probe_AF5 = (): string[] => [\\\"probe AF5\\\"];\" + \"findings.push(...probe_AF5());\" -> +^probe AF5$ at end, -0; unread none",
        "AF6 an unshift (IP-E5) [judgeTsxRow]: \"\" + \"findings.unshift(\\\"probe AF6\\\");\" -> +^probe AF6$ at end, -0; unread none",
        "AF7 a push in a helper the judge reaches (IP-A2) [tsxRecordFindings]: \"\" + \"findings.push(\\\"probe AF7\\\");\" -> +^probe AF7$ at 24, -0; unread none",
        "AF8 a new string[] helper with an array-literal return (IP-A3) [judgeTsxRow]: \"function probe_AF8(): string[] {\\n  return [\\\"probe AF8\\\"];\\n}\" + \"findings.push(...probe_AF8());\" -> +^probe AF8$ at end, -0; unread none",
        "AF9 a module-level const string [judgeTsxRow]: \"const PROBE_AF9 = \\\"probe AF9\\\";\" + \"findings.push(PROBE_AF9);\" -> +^probe AF9$ at end, -0; unread none",
        "AF10 a helper returning one string [judgeTsxRow]: \"function probe_AF10(): string {\\n  return \\\"probe AF10\\\";\\n}\" + \"findings.push(probe_AF10());\" -> +^probe AF10$ at end, -0; unread none",
        `AF11 a template with a substitution [judgeTsxRow]: "" + "findings.push(\`probe AF11 \${receipt}\`);" -> +^probe AF11 [\\s\\S]*?$ at end, -0; unread none`,
        "AF12 a conditional of two strings [judgeTsxRow]: \"\" + \"findings.push(cmd === \\\"\\\" ? \\\"probe AF12 when\\\" : \\\"probe AF12 otherwise\\\");\" -> +^probe AF12 when$ +^probe AF12 otherwise$ at end, -0; unread none",
        "AF13 a push inside a callback [judgeTsxRow]: \"\" + \"[cmd].forEach(() => findings.push(\\\"probe AF13\\\"));\" -> +^probe AF13$ at end, -0; unread none",
        "AF14 a local const list spread into a push [judgeTsxRow]: \"\" + \"const probe_AF14 = [\\\"probe AF14\\\"];\\n  findings.push(...probe_AF14);\" -> +^probe AF14$ at end, -0; unread none",
        "AF15 a local helper shadowing a reached one in the scope of its call is the one read (the checker's lexical binding) [judgeTsxRow]: \"\" + \"const tsxRecordFindings = (): string[] => [\\\"probe AF15\\\"];\" -> +^probe AF15$ at 19, -5; unread none",
        "AF16 the declared return type is not read (IP-K1: tsxRowFindings re-annotated readonly string[]) [tsxRowFindings retyped readonly string[]]: \"\" + \"\" -> +none at 0, -0; unread none",
        "AF17 a module-level helper the judge calls is read although a same-named const sits in a closure that does not enclose the call (the wb-m14y gate's G2) [judgeTsxRow]: \"function probe_AF17(): string[] {\\n  return [\\\"probe AF17\\\"];\\n}\" + \"findings.push(...probe_AF17());\\n  const probe_AF17_scope = (): number => {\\n    const probe_AF17 = (): string[] => [];\\n    return probe_AF17().length;\\n  };\\n  void probe_AF17_scope;\" -> +^probe AF17$ at end, -0; unread none",
        "AF18 a same-named copy of a reached helper in a closure that does not enclose its call leaves the reached helper read (the wb-m14y gate's G2b) [judgeTsxRow]: \"\" + \"const probe_AF18_scope = (): number => {\\n    function tsxRecordFindings(): string[] {\\n      return [\\\"probe AF18\\\"];\\n    }\\n    return tsxRecordFindings().length;\\n  };\\n  void probe_AF18_scope;\" -> +none at 0, -0; unread none",
        "AF19 a const named like the shared W10 view, declared in a helper's own scope, is entered like any other function [judgeTsxRow]: \"function probe_AF19(): string[] {\\n  const w10View = (): { findings: string[] } => ({ findings: [\\\"probe AF19\\\"] });\\n  const shadowed = w10View();\\n  return [...shadowed.findings];\\n}\" + \"findings.push(...probe_AF19());\" -> +^probe AF19$ at end, -0; unread none",
        "AF20 a reached helper named in a type position (typeof) leaves the reading unchanged [judgeTsxRow]: \"\" + \"const probe_AF20: ReturnType<typeof tsxRecordFindings> = [];\\n  void probe_AF20;\" -> +none at 0, -0; unread none",
        "AF21 a push inside a class's extends expression is read (a value evaluated at run time, never a type position) [judgeTsxRow]: \"\" + \"class probe_AF21 extends (findings.push(\\\"probe AF21\\\"), Object) {}\\n  void probe_AF21;\" -> +^probe AF21$ at end, -0; unread none",
        "AU1 a splice [judgeTsxRow]: \"\" + \"findings.splice(0, 0, \\\"probe AU1\\\");\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU2 an element write [judgeTsxRow]: \"\" + \"findings[findings.length] = \\\"probe AU2\\\";\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU3 an alias [judgeTsxRow]: \"\" + \"const probe_AU3 = findings;\\n  probe_AU3.push(\\\"probe AU3\\\");\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU4 the list passed to a helper [judgeTsxRow]: \"function probe_AU4(out: string[]): void {\\n  out.push(\\\"probe AU4\\\");\\n}\" + \"probe_AU4(findings);\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU5 a call of a global [judgeTsxRow]: \"\" + \"findings.push(String(\\\"probe AU5\\\"));\" -> +none at 0, -0; unread a call of String, not a function of this file T-ARMS enters",
        "AU6 a concatenation [judgeTsxRow]: \"\" + \"findings.push(\\\"probe \\\" + \\\"AU6\\\");\" -> +none at 0, -0; unread a diagnosis in a form T-ARMS does not read",
        "AU7 a spread of a method call [judgeTsxRow]: \"\" + \"findings.push(...[\\\"probe AU7\\\"].map((text) => text));\" -> +none at 0, -0; unread a diagnosis list in a form T-ARMS does not trace",
        "AU8 a module-level list [judgeTsxRow]: \"const PROBE_AU8: string[] = [\\\"probe AU8\\\"];\" + \"findings.push(...PROBE_AU8);\" -> +none at 0, -0; unread a diagnosis list PROBE_AU8 that is not a const of the function returning it",
        "AU9 a let list [judgeTsxRow]: \"function probe_AU9(): string[] {\\n  let out: string[] = [];\\n  out = [\\\"probe AU9\\\"];\\n  return out;\\n}\" + \"findings.push(...probe_AU9());\" -> +none at 0, -0; unread a diagnosis list out that is not a const of the function returning it",
        "AU10 a helper whose return is a method call [judgeTsxRow]: \"function probe_AU10(): string[] {\\n  return Array.of(\\\"probe AU10\\\");\\n}\" + \"findings.push(...probe_AU10());\" -> +none at 0, -0; unread a diagnosis list in a form T-ARMS does not trace",
        "AU11 a property the reached call's return does not carry [judgeTsxRow]: \"\" + \"findings.push(...read.probe_AU11);\" -> +none at 0, -0; unread a return of tsxReceiptView that does not carry exactly one probe_AU11",
        "AU12 the shared W10 view's list written [judgeTsxRow]: \"\" + \"view.findings.push(\\\"probe AU12\\\");\" -> +none at 0, -0; unread the diagnosis list view.findings used outside the forms T-ARMS reads",
        "AU13 a tagged template [judgeTsxRow]: \"\" + \"findings.push(String.raw`probe AU13`);\" -> +none at 0, -0; unread a diagnosis in a form T-ARMS does not read",
        "AU14 a parameter's default list [judgeTsxRow]: \"function probe_AU14(extra: string[] = [\\\"probe AU14\\\"]): string[] {\\n  return extra;\\n}\" + \"findings.push(...probe_AU14());\" -> +none at 0, -0; unread a diagnosis list extra that is not a const of the function returning it",
        "AU15 a recursive flow (its own literal still read) [judgeTsxRow]: \"function probe_AU15(): string[] {\\n  return [...probe_AU15(), \\\"probe AU15\\\"];\\n}\" + \"findings.push(...probe_AU15());\" -> +^probe AU15$ at end, -0; unread a recursive diagnosis flow through probe_AU15",
        "AU16 an iteration over the list [judgeTsxRow]: \"\" + \"for (const probe_AU16 of findings) probe_AU16.trim();\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU17 a length write [judgeTsxRow]: \"\" + \"findings.length = \\\"probe AU17\\\".length;\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU18 the list as an argument of a global [judgeTsxRow]: \"\" + \"Object.assign(findings, [\\\"probe AU18\\\"]);\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU19 the value carrying a list aliased [judgeTsxRow]: \"\" + \"const probe_AU19 = read;\\n  probe_AU19.findings.push(\\\"probe AU19\\\");\" -> +none at 0, -0; unread the value read carrying a diagnosis list used outside a property read",
        "AU20 a push through an element access [judgeTsxRow]: \"\" + \"findings[\\\"push\\\"](\\\"probe AU20\\\");\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU21 a closure handing the list out [judgeTsxRow]: \"\" + \"const probe_AU21 = (): string[] => findings;\\n  probe_AU21().push(\\\"probe AU21\\\");\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU22 the list spread into itself [judgeTsxRow]: \"\" + \"findings.push(...findings);\" -> +none at 0, -0; unread the diagnosis list findings read inside its own flow",
        "AU23 a parameter shadowing a module-level const string (the checker's lexical binding) [judgeTsxRow]: \"const PROBE_AU23 = \\\"probe AU23\\\";\\nfunction probe_AU23(PROBE_AU23: string): string[] {\\n  return [PROBE_AU23];\\n}\" + \"findings.push(...probe_AU23(\\\"x\\\"));\" -> +none at 0, -0; unread a diagnosis read from PROBE_AU23, which is not a const value",
        "AU24 two module-level consts naming each other [judgeTsxRow]: \"const PROBE_AU24A: string = PROBE_AU24B;\\nconst PROBE_AU24B: string = PROBE_AU24A;\" + \"findings.push(PROBE_AU24A);\" -> +none at 0, -0; unread a diagnosis flow deeper than T-ARMS reads",
        "AU25 the list carried by an object literal that is not returned [judgeTsxRow]: \"\" + \"const probe_AU25 = { findings };\\n  probe_AU25.findings.push(\\\"probe AU25\\\");\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        "AU26 a returned object literal with a spread [judgeTsxRow]: \"function probe_AU26(): { findings: string[] } {\\n  const findings: string[] = [];\\n  return { ...{ findings: [\\\"probe AU26\\\"] }, findings };\\n}\" + \"const probe_AU26_read = probe_AU26();\\n  findings.push(...probe_AU26_read.findings);\" -> +none at 0, -0; unread a return of probe_AU26 that does not carry exactly one findings",
        "AU27 a generator helper whose diagnosis leaves through yield (the wb-m14y gate's G1) [judgeTsxRow]: \"function* probe_AU27(): Generator<string> {\\n  yield \\\"probe AU27\\\";\\n}\" + \"findings.push(...probe_AU27());\" -> +none at 0, -0; unread a call of probe_AU27, a generator function T-ARMS does not enter",
        "AU28 a generator helper whose diagnosis leaves through yield*, spread twice (the wb-m14y gate's G1b) [judgeTsxRow]: \"function* probe_AU28(): Generator<string> {\\n  yield* [\\\"probe AU28\\\"];\\n}\" + \"findings.push(...[...probe_AU28()]);\" -> +none at 0, -0; unread a call of probe_AU28, a generator function T-ARMS does not enter",
        "AU29 a const bound to a generator function expression [judgeTsxRow]: \"const probe_AU29 = function* (): Generator<string> {\\n  yield \\\"probe AU29\\\";\\n};\" + \"findings.push(...probe_AU29());\" -> +none at 0, -0; unread a call of probe_AU29, a generator function T-ARMS does not enter",
        "AU30 a list carried by two members of a returned object literal, one of them written through [judgeTsxRow]: \"function probe_AU30(): { findings: string[]; alias: string[] } {\\n  const findings: string[] = [];\\n  return { findings, alias: findings };\\n}\" + \"const probe_AU30_read = probe_AU30();\\n  probe_AU30_read.alias.push(\\\"probe AU30\\\");\\n  findings.push(...probe_AU30_read.findings);\" -> +none at 0, -0; unread the diagnosis list findings used outside the forms T-ARMS reads",
        `AU31 a direct eval, which can write any binding in scope [judgeTsxRow]: "" + "${DIRECT_EVAL}(\\"0\\");" -> +none at 0, -0; unread a direct eval, whose code T-ARMS does not read`,
        "AU32 a reached helper referenced other than as a callee (reassigned) [judgeTsxRow]: \"\" + \"tsxRecordFindings = (): string[] => [\\\"probe AU32\\\"];\" -> +none at 0, -0; unread the function tsxRecordFindings referenced other than as the callee of a call",
        "AU33 a call of the shared W10 view in a list position [judgeTsxRow]: \"\" + \"findings.push(...w10View(page));\" -> +none at 0, -0; unread a call of w10View, not a function of this file T-ARMS enters",
        "AU34 a property of the shared W10 view other than its findings [judgeTsxRow]: \"\" + \"findings.push(...view.probe_AU34);\" -> +none at 0, -0; unread the shared W10 view's probe_AU34 read as a diagnosis list",
        "AU35 a hole in a diagnosis list [judgeTsxRow]: \"\" + \"findings.push(...[,]);\" -> +none at 0, -0; unread a hole in a diagnosis list",
        "AU36 a helper with an overload signature (a name with two declarations) [judgeTsxRow]: \"function probe_AU36(): string[];\\nfunction probe_AU36(flag?: boolean): string[] {\\n  return flag === true ? [] : [\\\"probe AU36\\\"];\\n}\" + \"findings.push(...probe_AU36());\" -> +none at 0, -0; unread a call of probe_AU36, not a function of this file T-ARMS enters",
        "AU37 a destructured const diagnosis [judgeTsxRow]: \"\" + \"const [probe_AU37] = [\\\"probe AU37\\\"];\\n  findings.push(probe_AU37);\" -> +none at 0, -0; unread a diagnosis read from probe_AU37, which is not a const value",
        "AU38 a return without a value [judgeTsxRow]: \"function probe_AU38(): string[] {\\n  return;\\n}\" + \"findings.push(...probe_AU38());\" -> +none at 0, -0; unread a return without a value",
        "AU39 a returned object literal with a computed member [judgeTsxRow]: \"function probe_AU39(): { findings: string[] } {\\n  const findings: string[] = [];\\n  return { findings, [\\\"findings\\\"]: [\\\"probe AU39\\\"] };\\n}\" + \"const probe_AU39_read = probe_AU39();\\n  findings.push(...probe_AU39_read.findings);\" -> +none at 0, -0; unread a return of probe_AU39 that does not carry exactly one findings",
        "AU40 a property read as a list from a const not bound to a call [judgeTsxRow]: \"\" + \"const probe_AU40 = { findings: [\\\"probe AU40\\\"] };\\n  findings.push(...probe_AU40.findings);\" -> +none at 0, -0; unread a diagnosis list read from a value T-ARMS does not trace",
        "AU41 a reached helper rebound inside a class's extends expression (a value, never a type position) [judgeTsxRow]: \"\" + \"class probe_AU41 extends ((tsxRecordFindings = (): string[] => []), Object) {}\\n  void probe_AU41;\" -> +none at 0, -0; unread the function tsxRecordFindings referenced other than as the callee of a call",
        "AR1 residual, pinned quiet: Array.prototype.push replaced at module level is never read [judgeTsxRow]: \"Array.prototype.push = function probe_AR1(this: unknown[], ...items: unknown[]): number {\\n  return items.length;\\n};\" + \"\" -> +none at 0, -0; unread none",
      ]);
      expect(ROSTER_VARIANTS).toHaveLength(4);
      expect(ROSTER_VARIANTS.map(([name, , rows]) => `${name}: ${rows.join(",") || "none"}`)).toEqual([
        "TR1 commented: the claim of record inside a complete HTML comment renders nothing: none",
        "TR2 struck: the claim of record struck through is not asserted: none",
        "TR3 escaped: the claim with its parentheses written as backslash escapes renders as the claim: 11",
        "TR4 emphasized: the claim with its last row emphasized renders as the claim: 11",
      ]);
    });
  });

  describe("C1: authoring follows the rendered page, so on every rendering-neutral base (N) each variant is still authored and refused with its diagnosis and each control still accepted", () => {
    for (const [name, neutral] of N_PAGE) {
      const id = name.split(" ")[0] ?? name;
      it(`on the ${id} base every page and receipt variant is re-authored and refused, and every R and C control accepted`, () => {
        const base = neutral(page());
        expect(base).not.toBe(page());
        expect(judgeW10Claim(base, liveReceipt, carrier)).toEqual([]);
        let ran = 0;
        for (const [variant, mutate, causes, receipt] of PAGE_VARIANTS) {
          const edited = mutate(base);
          expect(edited, `${id} + ${variant}`).not.toBe(base);
          const findings = judgeW10Claim(edited, receipt === undefined ? liveReceipt : readerWith(receipt), carrier).join("\n");
          for (const cause of causes) expect(findings, `${id} + ${variant}`).toContain(cause);
          ran++;
        }
        for (const [variant, mutate, causes] of RECEIPT_VARIANTS) {
          const findings = judgeW10Claim(base, readerWith(mutate), carrier).join("\n");
          for (const cause of causes) expect(findings, `${id} + ${variant}`).toContain(cause);
          ran++;
        }
        for (const [control, mutate] of CONTROLS) {
          expect(judgeW10Claim(mutate(base), liveReceipt, carrier), `${id} + ${control}`).toEqual([]);
          ran++;
        }
        expect(ran).toBe(92);
      }, 120_000);
    }

    for (const [name, neutral] of N_INDEX) {
      const id = name.split(" ")[0] ?? name;
      it(`on the ${id} INDEX base every INDEX variant is re-authored and refused, and the base itself accepted`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const base = neutral(index, named);
        expect(base).not.toBe(index);
        expect(indexFindings(base, named)).toEqual([]);
        let ran = 0;
        for (const [variant, mutate] of INDEX_VARIANTS) {
          const edited = mutate(base, named);
          expect(edited, `${id} + ${variant}`).not.toBe(base);
          expect(indexFindings(edited, named).join("\n"), `${id} + ${variant}`).toContain(`renders no link to ${named}.md`);
          ran++;
        }
        expect(ran).toBe(2);
      });
    }

    it("U3 (EACH-LIVENESS): the C1 tables hold exactly the file's page, receipt, INDEX and control rows", () => {
      expect(PAGE_VARIANTS).toHaveLength(71);
      expect(rowIds(F_PAGE)).toEqual(["F1", "F2", "F3", "F4", "F5", "F12", "F12", "F12", "F13", "F14"]);
      expect(PAGE_VARIANTS.map(([name]) => name)).toEqual([...F_PAGE, ...GK_PAGE, ...H_PAGE, ...J_PAGE, ...W_PAGE].map(([name]) => name));
      expect(RECEIPT_VARIANTS).toHaveLength(12);
      expect(rowIds(RECEIPT_VARIANTS)).toEqual(["F6", "F7", "F7", "F7", "F8", "G8", "K3", "H15", "J20", "J21", "J22", "J23"]);
      expect(INDEX_VARIANTS).toHaveLength(2);
      expect(rowIds(INDEX_VARIANTS)).toEqual(["H16", "J24"]);
      expect(CONTROLS).toHaveLength(9);
      expect(rowIds(CONTROLS)).toEqual(["R1", "R2", "C1", "C2", "C3", "C4", "C5", "XN1", "XN2"]);
    });
  });
});
