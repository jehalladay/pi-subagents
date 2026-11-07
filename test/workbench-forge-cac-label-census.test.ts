/**
 * wb-b9n.3 (FORGE-CAC-EVIDENCE-ASSURANCE-R7, program-triage-2026-10-18), the Forge CAC label census. Statement (bead title):
 * "No Pi surface shall mint or adopt a 'CAC verified' label: a guard pins today's absence (0 CAC hits in src/test/docs at
 * 758ec18), and when ForgeCACReceiptV0 ships (gating artifact: P3 exporter, 01-contract-qa.md:25@bc2c379f7802, not shipped) a
 * receipt lacking checker identity+version or source-version evidence renders FAIL/UNKNOWN with no label, a payload string
 * claiming it quoted as data, never Pi's own status." The cited Forge line (01-contract-qa.md:25@bc2c379f7802): 'Invalid/missing
 * evidence returns FAIL/UNKNOWN. No "CAC verified" label absent checker and source-version evidence.' Its section heading (:3)
 * reads 'Proposed read-only export (not shipped)'. This census echoes those words and claims nothing of Forge.
 *
 * ROWS (labels = the owner filing's acceptance clauses (a)-(c), read from the bead export; frozen shape ["A:3", "B:1", "C:4"]):
 * - A, clause (a), the MINT half: no caption/status path emits the label today.
 *   A1 the judge. LABEL is the title's quoted label. Each judge takes two readings of a text, the text itself and Pi's label
 *     display of it (sanitizeWorkbenchText's label layout with no length bound: default-ignorables vanish, controls and
 *     separators become a space, whitespace collapses; wb-530q F2), each after NFKC, and a text holds what either reading
 *     holds. A reading holds the label when the label's words occur in it in order,
 *     separated by any run of whitespace, hyphens or underscores (or by nothing), case-insensitively, with no letter or digit
 *     just before or just after. WORD is the label's first word under grep -w semantics: case-sensitive, with no
 *     ASCII letter, digit or underscore just before or just after (the filing's 0-hits reading). The module judge reads every
 *     string literal, no-substitution template and template head, middle and tail text (the cooked text) of a module through
 *     the TypeScript parser; comments and identifiers are not judged. A1's witness carries every planted text and module with
 *     its two readings, and the residual table is checked against them (each quiet row reads 0, each twin 1). The display
 *     plants (a zero-width space or a soft hyphen inside the first word, a word joiner between the words, and the zero-width
 *     plant as a module literal) read 1 and 1 only through the display reading, and the witness's beyondBound reading puts
 *     the zero-width plant after the helper's default bound, so a bounded display reading reds it. Every layout drops those
 *     invisibles, so the layout plants (wb-dpoo F2) pin which display the second reading is: a BEL control between a letter
 *     and the label with a zero-width space inside its first word (controlGap) and an escape sequence between a letter and
 *     the label (escapeGap) read 1 and 1, the label layout rendering the control and the escape as a space ('x CAC
 *     verified'), while a BOM inside the first word (quietGap) reads 0 and 0, the label layout rendering it as a space too
 *     ('C AC verified'). The text and lines layouts drop the control, the escape and the BOM, and the terminal layout drops
 *     the escape, so a judge that reads any of those three layouts in place of the label layout changes A1's witness.
 *   A2 the source walk. The module judge reads every src/**\/*.ts module git lists (tracked or untracked, never ignored), and a
 *     planted label modules last: a small one, and one longer than every real module with the label in its last literal. The
 *     judged list must equal that listing plus the two plants, a filesystem walk must list the same modules, no symlink may
 *     sit under src, and the listing must hold at least SRC_FLOOR modules. Pinned: the only LABEL sites and the only WORD sites
 *     are the two plants', so the real modules hold 0 of each.
 *   A3 the rendered outputs. Today's Forge-facing caption/status renderers run over a fixed fixture family and every string
 *     and every object key of every output is judged. Pinned: 0 LABEL strings and 0 WORD strings. The renderers:
 *     forgeGateTopology, readForgeOperationEvidence and nativeEvidence over seven forge.gate.status/v1 readings;
 *     forgeOperationStartedSnapshot, forgeGateStepTopology (started, passed, failed) and forgeOperationTerminalSnapshot over
 *     decodeForgeOperationTerminal (success, error); layoutWorkflowCard over one node per reading. The witness tags every output
 *     it judged with its renderer and fixture and carries a sha-256 prefix of the fixture family; the walk's positive control is a planted object
 *     holding the label once as a key and once inside an array (it must read 2). Other renderers are covered by A2's literal walk only.
 * - B, clause (b), the RECEIPT half, NOT DUE. B1 is a trigger, not the duty. It reads the trigger as a name: while no src module
 *   (any text, comments included) spells the gating artifact (the title's ForgeCACReceiptV0), this census reads (b) as not due;
 *   the first module that spells it reds B1 until (b)'s fixtures replace this trigger. B1 does not test (b)'s rendering rules.
 *   The named planted reader rides last through the same src listing, once short and once longer than every real module: the
 *   scan must read exactly the listing plus both plants, and the only consumers it may find are the plants. The unnamed reader
 *   is its residual's quiet row.
 * - C, clause (c), the ADOPT half, for gate.status payloads only (the receipt half of (c) is not due, see B1). L is the label
 *   and N a neutral control word of the same byte length ("XQZ recorded"). A cell puts L or N in one field of one base reading.
 *   Base current: one package with authoritative_current true and last_result success, status success, verdict null, reason
 *   code FORGE_OK. Base historical: the same package with authoritative_current false and an unverified_reason.
 *   C1 forgeGateTopology. For each base and each of six producer text fields (source.status, source.envelope.verdict,
 *     source.envelope.reason_code, the package's ref, last_result and unverified_reason) the output with L equals the output
 *     with N after replacing N by L: every tone, coverage, basis, relation and diagnostic is the one the neutral word gets, and
 *     L shows exactly where N shows. The witness carries the planted field's path (read off the input) and each snapshot's id,
 *     title, tone, coverage, status text, evidence refs and basis, and the diagnostics, with L shown as {L}. In the current base the reason-code cell shows L beside Pi's own 'current gate
 *     passed' and the success tone; the neutral word gets both, so the package's current success earns them, not L.
 *   C2 fields the reader never reads. Label-bearing keys added at the source, envelope, data and package levels (the witness
 *     lists them, read off the input) leave the serialized output identical to the base's; a last_result_state whose freshness
 *     is L (outside Forge's closed set) serializes exactly as one whose freshness is N: basis UNKNOWN, L never shown.
 *   C3 readForgeOperationEvidence over the same cells: the same substitution law over its whole result, byte count included;
 *     the witness carries the planted path, freshness, status text and preview lines.
 *   C4 nativeEvidence keeps a status of L verbatim as domainStatus. layoutWorkflowCard draws a done node with that domainStatus
 *     (freshness current, one evidence ref) with the glyph N gets, never the tick a producer-stated "verified" gets, and quotes
 *     L as the node's outcome.
 * Each pin's witness carries its own inputs (planted texts and modules, the judged and scanned module lists, renderer:fixture
 * tags with the fixture digest, base and field keys, the planted keys and words) beside its readings, so serving one pin with another pin's case, or one planted
 * input with another's, changes the witness and reds the compare. A pin rewritten to return its roster witness as a constant
 * is not detected by the compare. LIMIT, the edit class (residual R-PIN-EDIT, wb-dpoo F1): a pin removed together with a
 * widening over its words, either PWIDEN, its row's not-due span widened in NOT_DUE, its frozen literal and the roster (three
 * literals edited, not removed), or PMERGE, a neighbouring pin's quote widened over them in ROWS and the roster (the wb-530q
 * gate's QMERGE-A, A2 out and A1 quoting 'a hermetic guard proving no Pi caption/status path', and QMERGE-C, C3 out and C4
 * quoting 'renders it as quoted data only'). The membership law below reads either edited table as it reads this one: it
 * binds the removal class, not which pin quotes which words.
 *
 * OUTSIDE ANCHOR: the wb-b9n.3 row of the tracked bead export (.beads/issues.jsonl). The first "Acceptance: (a) ... . Not P0:"
 * span of its notes holds exactly the clauses (a)-(c), each equal to its row label, and every pin's quote is a substring of its
 * row label. LABEL and the gating artifact are parsed from its title. The census reads that row's title and that one span of
 * its notes, nothing else of it: a title whose quoted label or gating artifact changes, or a filing whose acceptance clauses
 * change, reds the judged set by design; appended notes and status writes do not.
 * PIN MEMBERSHIP (wb-530q F1), read against that clause text, never the row labels: each pin's quote sits in its clause
 * exactly once at word boundaries, the pins of a row quote disjoint spans (no word of a clause is quoted by two pins;
 * wb-v4d5 F1), they leave unquoted exactly the row's NOT-DUE spans (NOT_DUE: none of (a); every word of (b) after its
 * trigger B1's quote, (b) being not due; "or receipt" in (c), the receipt half B1 holds back), and every pin is
 * load-bearing: without it, a word of its row goes unquoted. A pin removed from ROWS, IMPL, the frozen shape and the roster
 * together, every other quote and not-due span unchanged, therefore leaves its words unquoted and the clause reds it (the
 * wb-b9n.3 gate's G7a and G7b hollows, which this anchor did not bind before). So does a quote shortened inside its span, in
 * ROWS and the roster: if the shorter quote still sits once at word boundaries, the spans being disjoint, no other quote
 * covers a word it drops and that word goes unquoted; if it does not, it reads misplaced. A quote widened over another
 * pin's words reads shared. A removal that widens another quote or a not-due span over the removed pin's words is the edit
 * class above. Until wb-v4d5, C3 quoted 'renders it as quoted data' over C4's 'quoted data', so a C3 shortened at its tail
 * into those words (the wb-dpoo gate's PSHORT_C3 and PSHORT_C3b) read clean; C3 now quotes 'renders it as'.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and NOT_DUE pins `${id}:${unquoted words}`
 * as another; rows, constants, residuals, the not-due spans, the edit readings (R-PIN-EDIT) and every pin's witness are held
 * to the out-of-file roster
 * test/fixtures/forge-cac-label-roster.json; the last case reads that every registered pin ran to the compare with its
 * roster witness.
 * RESIDUALS (named; each has a pinned quiet row and a live twin, in the witness of the pin named or, for R-PIN-EDIT, in the
 * edit readings the judged set holds to the roster):
 *   R-COMPOSED (A1) a label assembled at run time from pieces no single literal spells (quiet: "CA" + "C verified"; twin: one
 *     literal). A3 sees such a label only in the outputs of the renderers it drives.
 *   R-NAME (A1) a label spelled only by an identifier or property name a renderer might display (quiet: a CACVerified key read
 *     through Object.keys; twin: a "CAC verified" string key).
 *   R-LOOKALIKE (A1) confusable letters NFKC does not fold (quiet: Cyrillic ES, A, ES; twin: fullwidth C, A, C, which NFKC folds).
 *   R-PARAPHRASE (A1) another wording of the claim (quiet: "CAC certified", "verified by CAC"; twin: the title's label).
 *   R-EMBEDDED (A1) the label glued after a letter or digit (quiet: "isCACVerified"; twin: "CACVerified").
 *   R-UNNAMED-RECEIPT (B1) a receipt reader that never spells the gating artifact (quiet: a checker_identity reader; twin: a
 *     reader type named after the artifact).
 *   R-PIN-EDIT (MEMBERSHIP, the judged set; wb-dpoo F1) the edit class of the LIMIT above, PWIDEN and PMERGE. Its rows are
 *     planted edits of this census's own ROWS and NOT_DUE (PLANTED_EDITS), each read by the same membership law against the
 *     export's clauses, its reading (the edited table's pins, whether the law holds, and any misplaced quote, unquoted run,
 *     idle pin or shared run) held to the roster's edits. Quiet, the law holds: widenA (A2 out, NOT_DUE.A widened to A2's
 *     quote), mergeA (A2 out, A1 widened over A2's quote) and mergeC (C3 out, C4 widened over C3's quote). Twins, the law
 *     reds: removeA and removeC (the same pins out, nothing widened). Beside them ride seven law controls, outside the
 *     residual, edits of this table in which the law reads a defect: redundantA (a pin A4 quoting 'CAC-verified label',
 *     inside A3's span) reads idle and shared; misplacedA (A1 quoting 'a', which sits twice in clause (a)) reads misplaced;
 *     the boundary controls (wb-v4d5 F2) midWordStartA (A1 quoting 'ermetic guard proving', which sits once but starts
 *     inside a word) and midWordEndA (A1 quoting 'a hermetic guard prov', which ends inside one) read misplaced; sharedC (C3
 *     widened back over C4's 'quoted data') reads shared; and shortenedC3 (C3 shortened at its tail to 'renders it') and
 *     shortenedC4 (C4 shortened at its head to 'data only') read the dropped word unquoted (wb-v4d5 F1). So a law that stops
 *     reading any of those defects, or drops the word-boundary test at a quote's start or at its end, moves a reading. Each
 *     reading carries the edited table's pin ids and the edits remove two different pins, so a pin removed, added, renamed or
 *     reordered in ROWS while PLANTED_EDITS and the roster's edits stay as they are moves a reading; an edit that rewrites
 *     those as well is not detected. Nor is a law control removed from PLANTED_EDITS and the roster's edits together: no
 *     residual names the controls, so the roster alone holds them.
 *
 * MEASURED AT THE CUT (base dc72a6d, read-only; seat records, not assertions): src and docs hold 0 'CAC' word hits; test held 6
 * files with word hits before this cut (MW-CAC-WORKFLOW-COMPOSITION requirement ids and the planted citation corpus of the
 * wb-kku9.2 census and its roster), so the title's parenthetical reading of src/test/docs at 758ec18 no longer holds for test
 * and is not claimed here. Forge origin/main bd977c74d939 spells ForgeCACReceiptV0 only in
 * docs/programs/cac-evidence-assurance-2026-10-18/01-contract-qa.md; the installed forge 0.2.1 (rev c0f93b3c5d18) spells it
 * nowhere. The word-level absence census over src, test, qa and docs/workbench is wb-zzb4's; this census judges the label in
 * caption material and in rendered outputs.
 * MEASURED AT THE wb-530q CUT (base bda6c2a, read-only; seat records, not assertions): on the landed census the gate's G7a (C2)
 * and G7b (A2) coordinated hollows read 0 failed of 9, and a src literal 'C', U+200B, 'AC verified' (its G3d) read 10 of 10; on
 * this one G7a and G7b red the judged set through the clause, and G3d reds A2. The display reading adds no src site: A2's
 * label and word lists are still the two plants'.
 * MEASURED AT THE wb-dpoo CUT (base 27c968d, read-only; seat records, not assertions): on the landed census the wb-530q gate's
 * QMERGE-A and QMERGE-C and PWIDEN on A2 read 0 failed of 9, and the judges' layout swapped to text, terminal or lines read 0
 * failed of 10. On this one those three edits read 1 failed of 9 (the judged set, at the roster's edit readings), 1 of 9 again
 * with the roster's edit readings re-measured to match (the residual's quiet-row and twin check), and 0 of 9 when
 * PLANTED_EDITS, the residual's rows and the roster's edits are rewritten as well (the LIMIT); each layout swap reads 2
 * failed of 10 (A1 and records).
 * MEASURED AT THE wb-v4d5 CUT (base 242b275, read-only; seat records, not assertions): on the landed census C3 shortened to
 * 'renders it as' or 'renders it as quoted' (ROWS and the roster) and quoteStarts testing no word boundary, only the start's
 * or only the end's, each read 0 failed of 10, and C4 shortened at its head read 1 of 10 only through removeC's reading. On
 * this one each pin shortened by one word at its head or at its tail (16 edits, ROWS and the roster) reads 1 failed of 10 at
 * the unquoted runs, and C3 widened back to its landed quote or by one word, and C4, A1 and A2 each widened by one word over
 * a neighbour, read 1 of 10 at the shared runs. Each of the three boundary-test edits, the shared reading dropped, narrowed
 * or ignored by holds, the unquoted reading dropped, the idle reading dropped and the misplaced reading dropped or loosened
 * reads 1 of 10 at the roster's edit readings or the clause. The clause's own shared assert deleted reads 0 of 10 (no run is
 * shared on this table); with C3 widened back as well it reads 1 of 10 at the edit readings, and 1 of 10 again with the
 * roster's rows and edits re-measured to match, at the residual's quiet rows (widenA and mergeA keep C3 and C4). Any law
 * control out of PLANTED_EDITS alone reads 1 of 10; out of PLANTED_EDITS and the roster's edits together, 0 of 10.
 *
 * Display paths added: none. Test-only: every fixture lives in memory (no scratch; the only spawn is git ls-files); src and
 * the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { layoutWorkflowCard, plainWorkflowCardLines } from "../src/ui/workflow-card.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { type ForgeEvidenceDeps, readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import {
  decodeForgeOperationTerminal,
  forgeGateStepTopology,
  forgeOperationStartedSnapshot,
  forgeOperationTerminalSnapshot,
} from "../src/workbench/forge-operation-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import type { WorkflowNodeEntry } from "../src/workflow/progress.js";

interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Constants { readonly label: string; readonly gating: string; readonly neutral: string }
interface Residual { readonly id: string; readonly quietPin: string; readonly quiet: readonly string[]; readonly twin: readonly string[] }
interface Roster {
  readonly bead: string;
  readonly constants: Constants;
  readonly residuals: readonly Residual[];
  readonly notDue: Readonly<Record<string, readonly string[]>>;
  readonly edits: Readonly<Record<string, EditReading>>;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
}
type Json = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/forge-cac-label-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-b9n.3";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
/** The neutral control word: two words, the label's byte length, in no decision vocabulary and read by neither judge. */
const NEUTRAL = "XQZ recorded";
/** A floor under the git listing: an emptied or misdirected listing reds; the judged set is every module git lists. */
const SRC_FLOOR = 100;

const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hermetic guard proving no Pi caption/status path emits a CAC-verified label today",
    pins: [
      { id: "A1", quote: "a hermetic guard proving" },
      { id: "A2", quote: "no Pi caption/status path" },
      { id: "A3", quote: "emits a CAC-verified label today" },
    ],
  },
  {
    id: "B",
    label:
      "(b) on receipt consumption, fixtures with checker identity+version AND source-version evidence may surface the producer's label with those fields cited beside it, while fixtures missing either render FAIL/UNKNOWN with the label refused and a diagnostic naming the missing evidence",
    pins: [{ id: "B1", quote: "on receipt consumption" }],
  },
  {
    id: "C",
    label: "(c) a gate.status or receipt payload embedding the literal string renders it as quoted data only",
    pins: [
      { id: "C1", quote: "a gate.status" },
      { id: "C2", quote: "payload embedding the literal string" },
      { id: "C3", quote: "renders it as" },
      { id: "C4", quote: "quoted data only" },
    ],
  },
];

const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

// ------------------------------------------------------------------------------------------------------------- the bead row
interface BeadRow { readonly title: string; readonly notes: string }
function beadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (value === null || typeof value !== "object" || !("id" in value) || value.id !== BEAD) continue;
    const title = "title" in value && typeof value.title === "string" ? value.title : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { title, notes };
  }
  throw new Error(`the bead export holds no ${BEAD} row`);
}
const acceptanceOf = (notes: string): string => /Acceptance: (\(a\) .*?)\. Not P0:/s.exec(notes)?.[1] ?? "";
const clausesOf = (notes: string): string[] => acceptanceOf(notes).split(/; (?=\([a-z]\) )/);
const labelOf = (title: string): string => /a '([^']+)' label/.exec(title)?.[1] ?? "";
const gatingOf = (title: string): string => /when (\S+) ships \(gating artifact/.exec(title)?.[1] ?? "";
const ROW = beadRow();
const LABEL = labelOf(ROW.title);
const GATING = gatingOf(ROW.title);

// ------------------------------------------------------------------------------------------------------- pin membership
/**
 * The NOT-DUE spans (wb-530q F1): by row, the words of its acceptance clause that no pin quotes. Clause (b) is not due, so its
 * trigger B1 quotes its opening words alone; in clause (c) the receipt alternative is not due (B1 again), the gate.status
 * half is quoted whole; clause (a) is quoted whole.
 */
const NOT_DUE: Readonly<Record<string, readonly string[]>> = {
  A: [],
  B: [
    "fixtures with checker identity+version AND source-version evidence may surface the producer's label with those fields cited beside it, while fixtures missing either render FAIL/UNKNOWN with the label refused and a diagnostic naming the missing evidence",
  ],
  C: ["or receipt"],
};
/** Each place a quote sits in a clause at word boundaries: it starts a word and ends one (a trailing comma, semicolon or full stop aside). */
function quoteStarts(body: string, quote: string): number[] {
  const starts: number[] = [];
  if (quote.length === 0) return starts;
  for (let at = body.indexOf(quote); at >= 0; at = body.indexOf(quote, at + 1)) {
    const end = at + quote.length;
    if ((at === 0 || /\s/.test(body.charAt(at - 1))) && /^[,;.]?(?:\s|$)/.test(body.slice(end, end + 2))) starts.push(at);
  }
  return starts;
}
/**
 * One clause read against its row's pin quotes: the words no quote covers and the words two or more quotes cover (wb-v4d5 F1),
 * each as maximal runs of the clause's own text (the "(x) " marker is not a word; a word is quoted when a quote covers any of
 * it), and every quote that does not sit in the clause exactly once at word boundaries (such a quote covers no word).
 */
function unquoted(clause: string, quotes: readonly string[]): { runs: string[]; shared: string[]; misplaced: string[] } {
  const body = clause.replace(/^\([a-z]\) /, "");
  const words = [...body.matchAll(/\S+/g)].map(match => ({ start: match.index, end: match.index + match[0].length }));
  const covers = words.map(() => 0);
  const misplaced: string[] = [];
  for (const quote of quotes) {
    const starts = quoteStarts(body, quote);
    const start = starts[0];
    if (starts.length !== 1 || start === undefined) {
      misplaced.push(quote);
      continue;
    }
    for (const [index, word] of words.entries()) if (word.start < start + quote.length && word.end > start) covers[index] = (covers[index] ?? 0) + 1;
  }
  /** The maximal runs of the clause's words whose quote count the test accepts. */
  const runsOf = (accepts: (count: number) => boolean): string[] => {
    const runs: string[] = [];
    let open: number | undefined;
    for (const [index, word] of words.entries()) {
      if (accepts(covers[index] ?? 0)) open ??= word.start;
      else if (open !== undefined) {
        runs.push(body.slice(open, words[index - 1]?.end));
        open = undefined;
      }
    }
    if (open !== undefined) runs.push(body.slice(open, words.at(-1)?.end));
    return runs;
  };
  return { runs: runsOf(count => count === 0), shared: runsOf(count => count > 1), misplaced };
}
/**
 * The membership law over one table, the census's own or a planted edit of it: misplaced quotes, the unquoted runs by row, idle
 * pins, and the runs two pins of a row quote (shared, as row:run).
 */
interface Membership { readonly misplaced: string[]; readonly runs: Record<string, string[]>; readonly idle: string[]; readonly shared: string[] }
function membership(rows: readonly Row[], notDue: Readonly<Record<string, readonly string[]>>, clauses: readonly string[]): Membership {
  const quotesOf = (row: Row, without?: Pin): string[] => row.pins.filter(pin => pin !== without).map(pin => pin.quote);
  const readings = rows.map((row, index) => unquoted(clauses[index] ?? "", quotesOf(row)));
  const idle = (row: Row, index: number, pin: Pin): boolean => JSON.stringify(unquoted(clauses[index] ?? "", quotesOf(row, pin)).runs) === JSON.stringify(notDue[row.id]);
  return {
    misplaced: rows.flatMap((row, index) => (readings[index]?.misplaced ?? []).map(quote => `${row.id}:${quote}`)),
    runs: Object.fromEntries(rows.map((row, index) => [row.id, readings[index]?.runs ?? []])),
    idle: rows.flatMap((row, index) => row.pins.filter(pin => idle(row, index, pin)).map(pin => pin.id)),
    shared: rows.flatMap((row, index) => (readings[index]?.shared ?? []).map(run => `${row.id}:${run}`)),
  };
}
/**
 * R-PIN-EDIT's rows (wb-dpoo F1): edits of this census's own table, each a pin removed and, for the quiet rows, a widening over
 * its words, of a neighbouring pin's quote (PMERGE) or of its row's not-due spans (PWIDEN). The twins widen nothing. The law
 * controls are the defects the law reads on an edit of this table: a redundant pin (idle and shared), a quote sitting twice
 * (misplaced), a quote sitting once but starting or ending inside a word (misplaced; wb-v4d5 F2), a quote widened over a
 * neighbour's words (shared) and a quote shortened inside its span at its tail or at its head (unquoted; wb-v4d5 F1).
 */
interface PlantedEdit {
  readonly remove?: string;
  readonly requote?: { readonly pin: string; readonly quote: string };
  readonly add?: { readonly row: string; readonly pin: Pin };
  readonly notDue?: { readonly row: string; readonly runs: readonly string[] };
}
const PLANTED_EDITS: Readonly<Record<string, PlantedEdit>> = {
  widenA: { remove: "A2", notDue: { row: "A", runs: ["no Pi caption/status path"] } },
  mergeA: { remove: "A2", requote: { pin: "A1", quote: "a hermetic guard proving no Pi caption/status path" } },
  mergeC: { remove: "C3", requote: { pin: "C4", quote: "renders it as quoted data only" } },
  removeA: { remove: "A2" },
  removeC: { remove: "C3" },
  redundantA: { add: { row: "A", pin: { id: "A4", quote: "CAC-verified label" } } },
  misplacedA: { requote: { pin: "A1", quote: "a" } },
  midWordStartA: { requote: { pin: "A1", quote: "ermetic guard proving" } },
  midWordEndA: { requote: { pin: "A1", quote: "a hermetic guard prov" } },
  sharedC: { requote: { pin: "C3", quote: "renders it as quoted data" } },
  shortenedC3: { requote: { pin: "C3", quote: "renders it" } },
  shortenedC4: { requote: { pin: "C4", quote: "data only" } },
};
interface EditReading {
  readonly pins: readonly string[];
  readonly holds: boolean;
  readonly misplaced: readonly string[];
  readonly unquoted: Readonly<Record<string, readonly string[]>>;
  readonly idle: readonly string[];
  readonly shared: readonly string[];
}
/** One planted edit applied to ROWS and NOT_DUE as they stand, read by the membership law: holds when it reads as this table reads. */
function editReading(edit: PlantedEdit, clauses: readonly string[]): EditReading {
  const requote = edit.requote;
  const added = (row: Row): Pin[] => (edit.add !== undefined && edit.add.row === row.id ? [edit.add.pin] : []);
  const rows: Row[] = ROWS.map(row => ({
    ...row,
    pins: [
      ...row.pins.filter(pin => pin.id !== edit.remove).map(pin => (requote !== undefined && pin.id === requote.pin ? { id: pin.id, quote: requote.quote } : pin)),
      ...added(row),
    ],
  }));
  const notDue: Readonly<Record<string, readonly string[]>> = edit.notDue === undefined ? NOT_DUE : { ...NOT_DUE, [edit.notDue.row]: edit.notDue.runs };
  const law = membership(rows, notDue, clauses);
  const ids = [...new Set([...Object.keys(law.runs), ...Object.keys(notDue)])].sort(byName);
  const unquotedRows = Object.fromEntries(ids.filter(id => JSON.stringify(law.runs[id] ?? []) !== JSON.stringify(notDue[id] ?? [])).map(id => [id, law.runs[id] ?? []]));
  return {
    pins: rows.map(row => `${row.id}:${row.pins.map(pin => pin.id).join(",")}`),
    holds: law.misplaced.length === 0 && Object.keys(unquotedRows).length === 0 && law.idle.length === 0 && law.shared.length === 0,
    misplaced: law.misplaced, unquoted: unquotedRows, idle: law.idle, shared: law.shared,
  };
}

// --------------------------------------------------------------------------------------------------------------- the judge
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The label family: the title's label words in order, any run of whitespace, hyphens or underscores (or none) between them. */
const LABEL_PATTERN = new RegExp(`(?<![\\p{L}\\p{N}])${LABEL.split(/\s+/).map(escaped).join("[\\s_-]*")}(?![\\p{L}\\p{N}])`, "iu");
/** The filing's 0-hits word: the label's first word under grep -w semantics (case-sensitive; underscore is a word character). */
const WORD_PATTERN = new RegExp(`(?<![A-Za-z0-9_])${escaped(LABEL.split(/\s+/)[0] ?? "")}(?![A-Za-z0-9_])`, "u");
/**
 * The two readings each judge takes of a text (wb-530q F2): the text itself and Pi's label display of it, the shared helper's
 * label layout with no length bound (default-ignorables vanish, controls and separators become a space, whitespace collapses),
 * each after NFKC. A text holds the label or the word when either reading does, so an invisible Pi's display removes from
 * inside or between the label's words is read as the display shows it, and nothing the plain reading finds is lost.
 */
const readingsOf = (text: string): string[] => [text, sanitizeWorkbenchText(text, Number.POSITIVE_INFINITY, "label")].map(reading => reading.normalize("NFKC"));
const isLabel = (text: string): boolean => readingsOf(text).some(reading => LABEL_PATTERN.test(reading));
const isWord = (text: string): boolean => readingsOf(text).some(reading => WORD_PATTERN.test(reading));

/** Every string literal, no-substitution template and template head, middle and tail text of one module. */
function literalTexts(path: string, text: string): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const texts: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      texts.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return texts;
}
interface ModuleReading { readonly judged: string[]; readonly label: string[]; readonly word: string[] }
function judgeModules(modules: readonly { readonly path: string; readonly text: string }[]): ModuleReading {
  const judged: string[] = [];
  const label: string[] = [];
  const word: string[] = [];
  for (const module of modules) {
    judged.push(module.path);
    for (const literal of literalTexts(module.path, module.text)) {
      if (isLabel(literal)) label.push(`${module.path} ${JSON.stringify(literal)}`);
      if (isWord(literal)) word.push(`${module.path} ${JSON.stringify(literal)}`);
    }
  }
  return { judged, label, word };
}
/** Every string and every object key of a value, depth first. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => [key, ...stringsOf(item)]);
  return [];
}

const fromCodePoints = (...points: number[]): string => String.fromCodePoint(...points);
/** A1's planted texts: claims the judge must read, the named non-label forms, and each residual's quiet row and twin. */
const PLANTED_TEXTS: Readonly<Record<string, string>> = {
  title: LABEL,
  hyphen: "CAC-verified",
  underscore: "CAC_VERIFIED",
  lower: "cac verified",
  glued: "CACVerified",
  sentence: "Receipt status: CAC verified.",
  spaced: "CAC  -  verified",
  fullwidth: `${fromCodePoints(0xff23, 0xff21, 0xff23)} verified`,
  bareWord: "CAC",
  bareVerified: "verified",
  requirementId: "MW-CAC-WORKFLOW-COMPOSITION-R1",
  compositionName: "CACWorkflowCompositionV0",
  gatingName: GATING,
  efficacy: "efficacy verified",
  certified: "CAC certified",
  verifiedBy: "verified by CAC",
  cyrillic: `${fromCodePoints(0x421, 0x410, 0x421)} verified`,
  embedded: "isCACVerified",
  // Which display the second reading is (wb-dpoo F2): the label layout renders a control, an escape sequence and a BOM as a
  // space, the text and lines layouts drop all three, and the terminal layout drops the escape.
  controlGap: `x${fromCodePoints(0x7)}C${fromCodePoints(0x200b)}AC verified`,
  escapeGap: `x${fromCodePoints(0x1b)}[0mCAC verified`,
  quietGap: `C${fromCodePoints(0xfeff)}AC verified`,
  // Pi's label display drops default-ignorables (wb-530q F2): inside the first word, inside it again, and between the words.
  zeroWidth: `C${fromCodePoints(0x200b)}AC verified`,
  softHyphen: `CA${fromCodePoints(0xad)}C verified`,
  wordJoiner: `CAC${fromCodePoints(0x2060)}verified`,
};
const PLANTED_MODULES: Readonly<Record<string, string>> = {
  composed: 'export const shown = "CA" + "C verified";\n',
  composedTwin: 'export const shown = "CAC verified";\n',
  name: "export const LABELS = { CACVerified: true } as const;\nexport const shown = Object.keys(LABELS)[0];\n",
  nameTwin: 'export const LABELS = { "CAC verified": true } as const;\n',
  comment: "// a CAC verified label is never shown\nexport const shown = 1;\n",
  template: "export const shown = (state: string) => `CAC verified: $" + "{state}`;\n",
  zeroWidthLiteral: `export const shown = "C${fromCodePoints(0x200b)}AC verified";\n`,
};
const PLANT = "src/workbench/forge-cac-label-plant.ts";
const PLANT_BIG = "src/workbench/forge-cac-label-plant-big.ts";
/** Each residual names its quiet planted inputs (read 0 by the label judge) and its live twins (read 1). */
const RESIDUALS: readonly Residual[] = [
  { id: "R-COMPOSED", quietPin: "A1", quiet: ["composed"], twin: ["composedTwin"] },
  { id: "R-NAME", quietPin: "A1", quiet: ["name"], twin: ["nameTwin"] },
  { id: "R-LOOKALIKE", quietPin: "A1", quiet: ["cyrillic"], twin: ["fullwidth"] },
  { id: "R-PARAPHRASE", quietPin: "A1", quiet: ["certified", "verifiedBy"], twin: ["title"] },
  { id: "R-EMBEDDED", quietPin: "A1", quiet: ["embedded"], twin: ["glued"] },
  { id: "R-UNNAMED-RECEIPT", quietPin: "B1", quiet: ["unnamed"], twin: ["named"] },
  { id: "R-PIN-EDIT", quietPin: "MEMBERSHIP", quiet: ["widenA", "mergeA", "mergeC"], twin: ["removeA", "removeC"] },
];
/** B1's planted modules: a receipt reader that never spells the gating artifact (quiet) and one that does (its twin). */
const PLANTED_CONSUMERS: Readonly<Record<string, string>> = {
  unnamed: "export const checkerOf = (receipt: { checker_identity?: string }) => receipt.checker_identity;\n",
  named: `export interface ${GATING}Reader { readonly checker_identity: string }\n`,
};
/** B1's scan: every module it read, and the ones whose text spells the gating artifact. */
function consumersOf(modules: readonly { readonly path: string; readonly text: string }[]): { scanned: string[]; consumers: string[] } {
  const scanned: string[] = [];
  const consumers: string[] = [];
  for (const module of modules) {
    scanned.push(module.path);
    if (module.text.includes(GATING)) consumers.push(module.path);
  }
  return { scanned, consumers };
}
/** A planted input as the witness carries it: printable ASCII and line feeds as they are, every other code point as \u{hex}. */
const printable = (code: number): boolean => code === 0x0a || (code >= 0x20 && code < 0x7f);
const shownText = (text: string): string => [...text].map(unit => (printable(unit.codePointAt(0) ?? 0) ? unit : `\\u{${(unit.codePointAt(0) ?? 0).toString(16)}}`)).join("");
const plantedReading = (text: string): string => {
  const reading = judgeModules([{ path: PLANT, text }]);
  return `label=${reading.label.length} word=${reading.word.length}`;
};

// ----------------------------------------------------------------------------------------------------------- the src walk
const inScope = (path: string): boolean => /^src\/.+\.ts$/.test(path);
/** What git would commit below src: tracked or untracked, never ignored. */
function gitModules(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inScope))].sort(byName);
}
function walkModules(): { modules: string[]; links: string[] } {
  const modules: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && inScope(path)) modules.push(path);
    }
  };
  visit("src");
  return { modules: modules.sort(byName), links: links.sort(byName) };
}
const srcModules = (): { path: string; text: string }[] => gitModules().map(path => ({ path, text: readFileSync(join(REPO, path), "utf8") }));
/** A planted module longer than every real module, the planted text last: a reader that skips long modules misses it. */
function bigPlant(modules: readonly { readonly text: string }[], tail: string): { path: string; text: string } {
  const longest = Math.max(0, ...modules.map(module => module.text.length));
  const lines: string[] = [];
  let length = 0;
  for (let index = 0; length <= longest; index += 1) {
    const line = `export const filler${index} = "x${index}";\n`;
    lines.push(line);
    length += line.length;
  }
  return { path: PLANT_BIG, text: `${lines.join("")}${tail}` };
}

// ----------------------------------------------------------------------------------------------------------- the fixtures
const OPERATION = "op_b9n3";
const SCOPE = { workspace: "/b9n3-forge-ws", principal: "local-operator:b9n3" };
const CONTEXT = { scope: SCOPE, target: SCOPE.workspace, capturedAt: "2026-10-26T22:00:00Z", observedAt: "2026-10-26T22:00:01Z" };
const CAPTURED = "2026-10-26T22:00:02Z";
const DIGEST = "b".repeat(40);
const currentRow = (lastResult: string): Json => ({ ref: "code:b9n3", last_result: lastResult, authoritative_current: true, verification_ref: "cmd_b9n3" });
const HISTORICAL_ROW: Json = { ref: "code:b9n3", last_result: "success", authoritative_current: false, unverified_reason: "FORGE_CURRENT_STATE_UNVERIFIED" };
function reading(packages: JsonValue[], over: Json = {}, envelope: Json = { verdict: null, reason_code: "FORGE_OK" }): Json {
  return { contract: "forge.gate.status/v1", protocolMethod: "gate.status", source: { status: "success", operation_id: OPERATION, envelope, data: { packages }, ...over } };
}
const STATE = (freshness: string): Json => ({ freshness, invalidation_basis: { kind: "invalidation-basis/v2", derived_from: DIGEST } });
/** A3's fixture family: seven readings of the pinned forge.gate.status/v1 contract. */
const READINGS: Readonly<Record<string, Json>> = {
  historical: reading([HISTORICAL_ROW]),
  currentSuccess: reading([currentRow("success")]),
  currentFailure: reading([currentRow("failure")]),
  degraded: reading([currentRow("success")], { status: "partial" }, { verdict: "COULD_NOT_JUDGE", reason_code: "FORGE_DEGRADED" }),
  empty: reading([]),
  described: reading([{ ...currentRow("success"), last_result_state: STATE("CURRENT") }]),
  withheld: reading([{ ...currentRow("success"), last_result_state: STATE("BOGUS") }]),
};
const STEP_OUTCOMES: readonly (string | undefined)[] = [undefined, "passed", "failed"];
const REPLIES: readonly Json[] = [
  { operation_id: OPERATION, status: "success", terminal_disposition: "completed", data: { selection_accounting: { unit: "step", units: [{ selection: "selected" }], counts: { declared: 1, selected: 1 } }, selection: null } },
  { operation_id: OPERATION, status: "error", terminal_disposition: "completed" },
];
/** The fixture family as one digest, so a fixture edited in place changes A3's witness. */
const FIXTURE_DIGEST = createHash("sha256").update(JSON.stringify({ READINGS, STEP_OUTCOMES, REPLIES })).digest("hex").slice(0, 16);
function evidenceDeps(result: JsonValue): ForgeEvidenceDeps {
  return { grants: () => ["forge:inspect"], scope: SCOPE, target: SCOPE.workspace, read: async () => result, now: () => CAPTURED };
}
function nodeEntry(index: number, domainStatus: string | undefined, evidenceRefs: readonly string[]): WorkflowNodeEntry {
  return {
    type: "workflow_node", index, callId: index + 1, capabilityId: "forge.gate.status", label: `forge gate ${index}`, state: "done",
    freshness: "current", evidenceRefs: [...evidenceRefs], ...(domainStatus !== undefined ? { domainStatus } : {}),
  };
}
function cardLines(entries: readonly WorkflowNodeEntry[]): string[] {
  return plainWorkflowCardLines(layoutWorkflowCard({ progress: [...entries], task: { status: "completed", startTime: 0, endTime: 1_000 }, now: 1_000, width: 240, ascii: true }));
}
/** Every output A3 judges, keyed by renderer and fixture. */
async function renderedOutputs(): Promise<{ rendered: string[]; outputs: unknown[] }> {
  const rendered: string[] = [];
  const outputs: unknown[] = [];
  const add = (tag: string, output: unknown): void => {
    rendered.push(tag);
    outputs.push(output);
  };
  const entries: WorkflowNodeEntry[] = [];
  for (const [index, id] of Object.keys(READINGS).entries()) {
    const value = READINGS[id] ?? {};
    add(`forgeGateTopology:${id}`, forgeGateTopology(value, CONTEXT));
    add(`readForgeOperationEvidence:${id}`, await readForgeOperationEvidence(`forge-operation:${OPERATION}`, evidenceDeps(value)));
    const native = nativeEvidence("forge.gate.status", value);
    add(`nativeEvidence:${id}`, native);
    entries.push(nodeEntry(index, native.domainStatus, native.evidenceRefs ?? []));
  }
  const options = { scope: SCOPE };
  add("forgeOperationStartedSnapshot:started", forgeOperationStartedSnapshot({ operationId: OPERATION, observedAt: CAPTURED }, options));
  for (const outcome of STEP_OUTCOMES) {
    add(`forgeGateStepTopology:${outcome ?? "started"}`, forgeGateStepTopology({ operationId: OPERATION, step: "test", seq: 3, observedAt: CAPTURED, ...(outcome !== undefined ? { outcome } : {}) }, options));
  }
  for (const reply of REPLIES) {
    const terminal = decodeForgeOperationTerminal(reply, OPERATION, CAPTURED);
    if (terminal === undefined) throw new Error("a fixture gate.run reply did not decode");
    add(`forgeOperationTerminalSnapshot:${String(reply.status)}`, forgeOperationTerminalSnapshot(terminal, options));
  }
  add(`layoutWorkflowCard:${entries.length} nodes`, cardLines(entries));
  return { rendered, outputs };
}

// ------------------------------------------------------------------------------------------------------- the payload cells
type Field = "source.status" | "source.envelope.verdict" | "source.envelope.reason_code" | "package.ref" | "package.last_result" | "package.unverified_reason";
const FIELDS: readonly Field[] = ["source.status", "source.envelope.verdict", "source.envelope.reason_code", "package.ref", "package.last_result", "package.unverified_reason"];
const BASES: Readonly<Record<string, Json>> = { current: currentRow("success"), historical: HISTORICAL_ROW };
function cell(base: string, field: Field, word: string): Json {
  const row: Json = { ...(BASES[base] ?? {}) };
  const envelope: Json = { verdict: null, reason_code: "FORGE_OK" };
  const over: Json = {};
  if (field === "source.status") over.status = word;
  if (field === "source.envelope.verdict") envelope.verdict = word;
  if (field === "source.envelope.reason_code") envelope.reason_code = word;
  if (field === "package.ref") row.ref = word;
  if (field === "package.last_result") row.last_result = word;
  if (field === "package.unverified_reason") row.unverified_reason = word;
  return reading([row], over, envelope);
}
/** The substitution law: the output with L equals the output with N after replacing N by L. */
function substituted(withLabel: unknown, withNeutral: unknown): boolean {
  return JSON.stringify(withLabel) === JSON.stringify(withNeutral).split(NEUTRAL).join(LABEL);
}
const marked = (text: string): string => text.split(LABEL).join("{L}");
/** The paths of a value whose string is the label: a cell's planted field (or C2's planted keys), read off the input itself. */
function labelPaths(value: JsonValue, path: string): string[] {
  if (value === LABEL) return [path];
  if (Array.isArray(value)) return value.flatMap((item, index) => labelPaths(item, `${path}[${index}]`));
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => labelPaths(item, `${path}.${key}`));
  return [];
}
function topologyFacets(input: JsonValue, topology: ReturnType<typeof forgeGateTopology>): JsonValue {
  return {
    planted: labelPaths(input, "reading"),
    snapshots: topology.snapshots.map(snapshot => ({
      id: marked(snapshot.source.id), title: marked(snapshot.node.title),
      tone: snapshot.node.statusTone, ...(snapshot.coverage !== undefined ? { coverage: snapshot.coverage } : {}), text: marked(snapshot.node.statusText),
      refs: (snapshot.evidenceRefs ?? []).map(marked), ...(snapshot.subjectBasis !== undefined ? { basis: snapshot.subjectBasis } : {}),
    })),
    diagnostics: topology.diagnostics.map(marked),
  };
}

// ------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const labelReading = (id: string): number | undefined => {
      const text = PLANTED_TEXTS[id];
      if (text !== undefined) return isLabel(text) ? 1 : 0;
      const module = PLANTED_MODULES[id];
      return module === undefined ? undefined : judgeModules([{ path: PLANT, text: module }]).label.length;
    };
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "A1")) {
      const loud = residual.quiet.filter(id => labelReading(id) !== 0);
      const silent = residual.twin.filter(id => labelReading(id) !== 1);
      if (loud.length > 0 || silent.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${loud.join(", ")}) or twins read silent (${silent.join(", ")})`);
    }
    const texts = Object.fromEntries(Object.entries(PLANTED_TEXTS).map(([id, text]) => [id, `label=${isLabel(text) ? 1 : 0} word=${isWord(text) ? 1 : 0} ${shownText(text)}`]));
    const modules = Object.fromEntries(Object.entries(PLANTED_MODULES).map(([id, text]) => [id, `${plantedReading(text)} ${shownText(text)}`]));
    // The display reading has no length bound: the zero-width plant after the helper's default bound is still read.
    const filler = "x ".repeat(WORKBENCH_TEXT_LIMIT / 2);
    const beyond = `${filler}${PLANTED_TEXTS.zeroWidth ?? ""}`;
    return { texts, modules, beyondBound: `label=${isLabel(beyond) ? 1 : 0} word=${isWord(beyond) ? 1 : 0} after ${filler.length} units` };
  },
  A2: async () => {
    const listed = gitModules();
    const walked = walkModules();
    const modules = srcModules();
    const big = bigPlant(modules, PLANTED_MODULES.composedTwin ?? "");
    // The two planted controls ride last through the same judge: the real modules must add no site of their own.
    const reading = judgeModules([...modules, { path: PLANT, text: PLANTED_MODULES.composedTwin ?? "" }, big]);
    return {
      judgedEqualsListedPlusPlants: JSON.stringify(reading.judged) === JSON.stringify([...listed, PLANT, PLANT_BIG]),
      bigPlantLongest: big.text.length > Math.max(0, ...modules.map(module => module.text.length)),
      gitEqualsWalk: JSON.stringify(listed) === JSON.stringify(walked.modules), links: walked.links, floorMet: listed.length >= SRC_FLOOR,
      label: reading.label, word: reading.word,
    };
  },
  A3: async () => {
    const { rendered, outputs } = await renderedOutputs();
    const strings = outputs.flatMap(stringsOf);
    // The control holds the label once as a key and once inside an array, so the walk must read both to count 2.
    const control = stringsOf({ [LABEL]: [`${NEUTRAL} · ${LABEL}`] });
    return {
      rendered, fixtureDigest: FIXTURE_DIGEST, walked: strings.length > 0,
      label: strings.filter(isLabel), word: strings.filter(isWord),
      control: { label: control.filter(isLabel).length, word: control.filter(isWord).length },
    };
  },
  B1: async () => {
    const reads = (id: string): number => consumersOf([{ path: PLANT, text: PLANTED_CONSUMERS[id] ?? "" }]).consumers.length;
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "B1")) {
      if (residual.quiet.some(id => reads(id) !== 0) || residual.twin.some(id => reads(id) !== 1)) throw new Error(`${residual.id}: a quiet row reads a consumer or a twin reads none`);
    }
    const planted = Object.fromEntries(Object.entries(PLANTED_CONSUMERS).map(([id, text]) => [id, `consumers=${reads(id)} ${shownText(text)}`]));
    // The named twin rides last through the same listing, short and longer than every real module: the scan must read the
    // listing plus both plants, and the only consumers it may find are the plants.
    const modules = srcModules();
    const scan = consumersOf([...modules, { path: PLANT, text: PLANTED_CONSUMERS.named ?? "" }, bigPlant(modules, PLANTED_CONSUMERS.named ?? "")]);
    return { scannedEqualsListedPlusPlants: JSON.stringify(scan.scanned) === JSON.stringify([...gitModules(), PLANT, PLANT_BIG]), consumers: scan.consumers, planted };
  },
  C1: async () => {
    const cells: Json = {};
    for (const base of Object.keys(BASES)) {
      for (const field of FIELDS) {
        const input = cell(base, field, LABEL);
        const withLabel = forgeGateTopology(input, CONTEXT);
        const withNeutral = forgeGateTopology(cell(base, field, NEUTRAL), CONTEXT);
        if (!substituted(withLabel, withNeutral)) throw new Error(`${base}/${field}: the topology with the label is not the neutral topology with the word replaced`);
        cells[`${base}/${field}`] = topologyFacets(input, withLabel);
      }
    }
    return cells;
  },
  C2: async () => {
    const base = reading([currentRow("success")]);
    const extra: Json = {
      contract: "forge.gate.status/v1", protocolMethod: "gate.status",
      source: {
        status: "success", operation_id: OPERATION, label: LABEL, envelope: { verdict: null, reason_code: "FORGE_OK", label: LABEL },
        data: { label: LABEL, packages: [{ ...currentRow("success"), label: LABEL, cac_status: LABEL }] },
      },
    };
    const plain = forgeGateTopology(base, CONTEXT);
    const added = forgeGateTopology(extra, CONTEXT);
    const words = [LABEL, NEUTRAL];
    const [freshLabel, freshNeutral] = words.map(word => forgeGateTopology(reading([{ ...currentRow("success"), last_result_state: STATE(word) }]), CONTEXT));
    return {
      unknownKeys: { planted: labelPaths(extra, "reading"), identical: JSON.stringify(added) === JSON.stringify(plain), shown: stringsOf(added).filter(isLabel).length },
      freshness: {
        words: words.map(marked), identical: JSON.stringify(freshLabel) === JSON.stringify(freshNeutral), shown: stringsOf(freshLabel).filter(isLabel).length,
        packageText: freshLabel?.snapshots[1]?.node.statusText ?? "",
      },
    };
  },
  C3: async () => {
    const cells: Json = {};
    for (const base of Object.keys(BASES)) {
      for (const field of FIELDS) {
        const ref = `forge-operation:${OPERATION}`;
        const input = cell(base, field, LABEL);
        const withLabel = await readForgeOperationEvidence(ref, evidenceDeps(input));
        const withNeutral = await readForgeOperationEvidence(ref, evidenceDeps(cell(base, field, NEUTRAL)));
        if (!substituted(withLabel, withNeutral)) throw new Error(`${base}/${field}: the evidence with the label is not the neutral evidence with the word replaced`);
        cells[`${base}/${field}`] = { planted: labelPaths(input, "reading"), freshness: withLabel.freshness, statusText: marked(withLabel.statusText), preview: withLabel.preview.map(marked) };
      }
    }
    return cells;
  },
  C4: async () => {
    const native = nativeEvidence("forge.gate.status", cell("current", "source.status", LABEL));
    const neutral = nativeEvidence("forge.gate.status", cell("current", "source.status", NEUTRAL));
    const refs = native.evidenceRefs ?? [];
    const [labelLine = "", neutralLine = "", verifiedLine = ""] = cardLines([nodeEntry(0, native.domainStatus, refs), nodeEntry(1, neutral.domainStatus, refs), nodeEntry(2, "verified", refs)]).filter(line => line.includes(" · forge.gate.status · "));
    const glyph = (line: string): string => line.trim().split(" ")[0] ?? "";
    return {
      domainStatus: marked(native.domainStatus ?? ""), refs,
      glyphs: { label: shownText(glyph(labelLine)), neutral: shownText(glyph(neutralLine)), verified: shownText(glyph(verifiedLine)) },
      outcome: marked(labelLine.trim()), neutralOutcome: neutralLine.trim(),
    };
  },
};

describe("wb-b9n.3 Forge CAC label census (FORGE-CAC-EVIDENCE-ASSURANCE-R7)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and the title's label and gating artifact", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:1", "C:4"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.constants).toEqual({ label: LABEL, gating: GATING, neutral: NEUTRAL });
    // Outside anchor: the filing's acceptance clauses are exactly the row labels, and each pin quotes a span of its row.
    const clauses = clausesOf(ROW.notes);
    expect(clauses).toHaveLength(3);
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(ROWS.flatMap(row => row.pins.filter(pin => !row.label.includes(pin.quote)).map(pin => pin.id))).toEqual([]);
    // Outside anchor for pin membership (wb-530q F1), read against the export's clause text, never the row labels: each pin
    // quote sits in its clause once at word boundaries, the pins of a row quote disjoint spans (wb-v4d5 F1) and leave unquoted
    // exactly its not-due spans, and every pin is load-bearing (without it, a word of its row goes unquoted). A pin removed from
    // ROWS, IMPL, the frozen shape and the roster together, every other quote and not-due span unchanged, leaves its words
    // unquoted, so the clause reds it, and so does a quote shortened inside its span (no other quote covers a word it drops, or
    // the shorter quote reads misplaced); a quote widened over another pin's words reads shared; a removal that widens another
    // quote or a not-due span over those words reads clean here (R-PIN-EDIT, below).
    const law = membership(ROWS, NOT_DUE, clauses);
    expect(law.misplaced).toEqual([]);
    expect(law.runs).toEqual(NOT_DUE);
    expect(law.idle).toEqual([]);
    expect(law.shared).toEqual([]);
    expect(ROSTER.notDue).toEqual(NOT_DUE);
    expect(Object.entries(NOT_DUE).map(([id, runs]) => `${id}:${runs.flatMap(run => run.split(/\s+/)).length}`)).toEqual(["A:0", "B:35", "C:2"]);
    // R-PIN-EDIT (wb-dpoo F1): the edit class, planted as edits of this table and read by the same law, readings held to the
    // roster; each quiet row reads as this table reads (the law holds), each twin reds the law.
    const edits = Object.fromEntries(Object.entries(PLANTED_EDITS).map(([id, edit]) => [id, editReading(edit, clauses)]));
    expect(edits).toEqual(ROSTER.edits);
    const misread = RESIDUALS.filter(residual => residual.quietPin === "MEMBERSHIP").flatMap(residual => [
      ...residual.quiet.filter(id => edits[id]?.holds !== true).map(id => `${residual.id}: quiet row ${id} reds the law`),
      ...residual.twin.filter(id => edits[id]?.holds !== false).map(id => `${residual.id}: twin ${id} passes the law`),
    ]);
    expect(misread).toEqual([]);
    // The title's own label is a claim and its gating artifact is not, so neither reading is vacuous.
    expect([isLabel(ROW.title), isLabel(GATING), GATING.length > 0, LABEL.length > 0]).toEqual([true, false, true, true]);
    expect(isLabel(NEUTRAL) || isWord(NEUTRAL)).toBe(false);
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["R-COMPOSED", "R-NAME", "R-LOOKALIKE", "R-PARAPHRASE", "R-EMBEDDED", "R-UNNAMED-RECEIPT", "R-PIN-EDIT"]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    // Each residual's quiet rows and twins are planted inputs of the pin that reads them.
    const plantedOf: Readonly<Record<string, readonly string[]>> = {
      A1: [...Object.keys(PLANTED_TEXTS), ...Object.keys(PLANTED_MODULES)],
      B1: Object.keys(PLANTED_CONSUMERS),
      MEMBERSHIP: Object.keys(PLANTED_EDITS),
    };
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(plantedOf[residual.quietPin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran to the compare with its roster witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
