/**
 * wb-muip (MWI B-unknowns, slice PI-0, program mechanical-workflows-interop-2026-11-04; gate EVIDENCE-CENSUS): the evidence
 * census for EAT-R080 (prior-run census: a found witness or searched-scope absence over declared in-repo receipt stores and a
 * declared date range, the global reading UNDETERMINED unless a witness is found) and EAT-R081 (Forge transport probe: the
 * exit-zero failed-gate premise read from admitted native Forge transcripts only, recorded as a witnessed pairing, a scoped
 * non-observation or UNDETERMINED). The judges are test/helpers/mechanical-evidence-census.ts; the native transcripts are the
 * committed probe receipt qa/workbench/receipts/wb-muip-forge-transport-probe.json, written by qa/workbench/forge-transport-probe.mjs.
 *
 * THE REQUIREMENTS, never retyped: test/fixtures/mwi-unknowns-requirements-roster.json vendors each requirement block verbatim
 * (pi-subagents master 0b25e14e, triage/requirements/ATOMIC-REQUIREMENTS.md:1476-1484 and :1486-1494, read with read-only git
 * show by the cutting seat), each held to its SHA-256; ROWS' statements and each row's mutant-kill case are judged against it.
 * The row ids are judged against this bead's own row of the tracked export (.beads/issues.jsonl, wb-muip: "requirements
 * EAT-R080, EAT-R081"), the anchor outside this file.
 *
 * PINNED READER SET (case id: assertion target -> observed result at this cut; every case is in CASES below, judged by the
 * shape rows):
 * EAT-R080 (judgePriorRuns, joinComponentsOf, markdownEntries, jsonEntry, readStoreEntries)
 * - R080-NEVER-RAN-MUTANT: zero joined entries over a read scope -> verdict searched-scope-absence, global UNDETERMINED, the
 *   declared unread stores carried (kills the vendored mutant "Treat no in-repo filename hit as proof no external run occurred").
 * - R080-EMPTY-UNREAD: zero joined entries with NO store declared unread -> global still UNDETERMINED.
 * - R080-VOCABULARY: the verdict words are exactly found-witness and searched-scope-absence, the global readings exactly
 *   WITNESSED and UNDETERMINED (no universal never-ran word exists to return).
 * - R080-JOINED-WITNESS: one entry carrying all four join components -> found-witness, WITNESSED, that entry's ref.
 * - R080-NEEDS-PI-RUN / R080-NEEDS-OUTCOME / R080-NEEDS-OPERATION / R080-NEEDS-PIN: the same entry less exactly one component
 *   -> no witness, one partial naming exactly the other three.
 * - R080-ONE-PART-PARTIAL (wb-prv7, the wb-muip gate's F5): an entry carrying exactly one component, each of the four in turn
 *   -> no witness, one partial naming exactly that component; an entry carrying none -> no partial.
 * - R080-OUTCOME-TOKENS: each of verified_candidate, verification_failed, needs_evidence completes the join.
 * - R080-RANGE-BOUNDS: full joins dated the day before `from` and the day after `to` are out of range (refs listed, not read);
 *   full joins dated exactly `from` and exactly `to` are read and found.
 * - R080-UNDATED-READ: an undated entry is read (counted undated) and its join found.
 * - R080-MARKDOWN-ENTRIES: a markdown receipt splits at its level-2 headings (the preamble entry 0), each dated by a leading
 *   YYYY-MM-DD; a join inside one entry is found at that entry's ref. The headings are the ones R080-HEADING-FORMS pins; fenced
 *   code and HTML comments are R080-FENCED-HEADING's and R080-COMMENT-TEXT's.
 * - R080-HEADING-FORMS (wb-prv7, the wb-muip gate's F1): the level-2 headings are the top-level ones marked 18.0.11's lexer
 *   reads, ATX (a space or a tab after the marker, up to three spaces of indentation, a closing sequence, an empty heading) or
 *   setext (a '---' underline), each dated by its heading text's leading YYYY-MM-DD, while the preamble stays undated under a
 *   dated level-1 heading; a level-1 heading (ATX or '===' setext), a level-3 heading, a level-2 line in indented code or in an
 *   HTML block (a details element) and a level-2 heading inside a list item or a block quote open no entry; the entries' texts
 *   joined by LF are the input text; CRLF line ends read as LF ones; a lone carriage return is refused (throws).
 * - R080-FENCED-HEADING (wb-prv7 F1, the gate's W-FENCE): a level-2 line inside a fenced code block (a backtick fence, a tilde
 *   fence that a shorter tilde run does not close, a fence never closed) opens no entry, so a join after a fenced line dated
 *   before the range is read in its own dated entry and found; control: the same lines less the two fence lines split at that
 *   line, whose entry is out of range, and the join is never read; fenced code text is read.
 * - R080-COMMENT-TEXT (wb-prv7 F1, the gate's W-COMMENT; wb-caoo, the wb-prv7 gate's F1 and F2; wb-349y, the wb-caoo gate's F1
 *   and F2): HTML comment text is not read: the four parts inside a comment block are no witness and no partial, a level-2 line
 *   inside the block opens no entry, and the entry's text keeps the comment; the four parts inside the first, or inside the
 *   second, of two comments that one html token holds (a block line holding both, a div block holding both on lines of their
 *   own, each lexed as one html token holding two) are no witness and no partial; a part inside an inline comment in a
 *   paragraph, a heading, a list item, a block quote, a table cell, emphasis or link text is not read (the other three parts are
 *   its entry's partial); a comment block never closed runs to the receipt's end (no entry opens after it, nothing after it is
 *   read); controls: the four parts are a witness outside any comment, inside one html token too (on a line of their own before
 *   the comment line of a div block, or after a closed comment on a block line, each lexed as one html token holding one;
 *   between two closed comments on a block line, or on a line of their own between the two comment lines of a div block, each
 *   lexed as one html token holding two), inside a comment form in fenced code, indented code (lexed as one indented code block)
 *   or a code span (code renders its text), after an empty comment (<!--> or <!--->) opening their line, and after an inline
 *   opener never closed (marked reads it as text).
 * - R080-CONTAINER-TEXT (wb-prv7 F1, the join's containers): a list is read item by item, a table cell by cell with its header
 *   row read, and a block quote line by line, so a component at an item's or a cell's edge is read and a two-line block quote
 *   reads both lines; a token's own raw text around its children is read (a pin in a link's destination).
 * - R080-JSON-ENTRY: a JSON receipt is one entry dated by its top-level utc; no utc, a non-date utc or unparsable text is undated.
 * - R080-UNDECLARED-STORE: an entry from a store the scope does not declare is refused (throws).
 * - R080-LIVE-STORES: on the live tree every declared store reads at least one entry (the receipts store reads exactly the
 *   files qa/workbench/receipts-index.mjs lists); the record's verdict and global reading follow its witnesses and it carries the
 *   four declared unread stores. Measured at this cut: searched-scope absence, global UNDETERMINED (numbers in the receipt,
 *   each entry's measured on its own cut's tree).
 * - R080-LIVE-PLANTED: a joined entry planted into each store's first live file is found by the same reader (not blind).
 * EAT-R081 (judgeTransportPairing, contractMismatches, readProbeReceipt)
 * - R081-FIXTURE-MUTANT: a synthetic fixture pairing exit 0 with FAIL -> excluded not-producer-evidence, verdict UNDETERMINED
 *   (kills the vendored mutant "Use a synthetic exit-zero FAIL fixture as a producer receipt").
 * - R081-ADAPTER-CONDITIONAL: an adapter-conditional item pairing exit 0 with FAIL -> excluded, UNDETERMINED.
 * - R081-PAIRING-WITNESSED: an admitted native transcript exiting 0 with gate verdict FAIL -> pairing-witnessed, its id.
 * - R081-SCOPED-NON-OBSERVATION: admitted native FAIL transcripts exiting nonzero -> scoped-non-observation, the scope naming
 *   each one's producer and argv.
 * - R081-NEEDS-PRODUCER / R081-NEEDS-OPERATION / R081-NEEDS-PAIRING-FIELDS: a native transcript without the forge identity, without
 *   a native operation id (op- plus 32 lowercase hex), or without an integer exit, a gate verdict or an argv -> excluded with
 *   that reason.
 * - R081-NO-FAILED-GATE: PASS-only admitted transcripts, or no evidence -> UNDETERMINED.
 * - R081-FIXTURE-NEVER-UPGRADES: a fixture exit-0 FAIL beside an admitted nonzero FAIL -> scoped-non-observation, never witnessed.
 * - R081-CONTRACT-CONSISTENCY: a transcript whose exit differs from the contract's code for its envelope status, or whose
 *   status the contract lacks, is named.
 * - R081-RECORDED-PROBE: the committed probe receipt is tied to the committed probe script's SHA-256; forge 0.2.1 rev
 *   f7d4a6a8ae17's recorded contract maps success alone to exit 0; the PASS control exits 0 with PASS; both failed gates exit 1
 *   with FAIL; every transcript agrees with the contract -> scoped-non-observation, no witness, the two failed gates in scope.
 *
 * THE RECEIPT ANCHOR (wb-prv7, the wb-muip gate's F2 and F3: G-XPIN, a case deleted with its ROWS pin and the frozen count, and
 * G-XQ, a residual family deleted with its quiet case and frozen triple, stayed green, because the export row anchors requirement
 * ids only): the last level-2 entry of docs/workbench/receipts/wb-muip.md, this census's own receipt (wb-prv7 appended it),
 * carries two tables, read through marked's tokens. The first lists every test registered before the record, in registration
 * order, with its census row, its kind (claim, quiet or check) and its assertion count; the second lists the residual families
 * with their rows and quiet rows. CHECK-RECEIPT-ANCHOR holds the first table's ids, rows and kinds to CASES and CHECKS, each
 * census row's claim ids there to its ROWS pins, in order, and the second table to RESIDUALS, all exactly; THE RECORD holds the
 * counts. A later cut that changes a test, a pin, a count or a residual family appends a new dated entry carrying both tables for
 * its state (standing rule 15), and the census reads the last entry. The check's in-case controls hold that reader
 * (receiptAnchorOf): a two-entry page reads its last entry's tables, and a last entry holding two tables under one header, or
 * none under the other, is refused (throws).
 *
 * THE RECORD (wb-prv7, the wb-muip gate's F4: G-BODY-PARTIAL, an early return after a case's first assertion, and G-SKIP-ONE,
 * a case registered in skip mode, stayed green): every test before the record pushes its end, its id and the assertion count
 * vitest holds for it at that moment, after its last assertion (a case through its registration wrapper, a check as its own last
 * statement). The record, registered last, reads the vitest task tree: the registered titles are exactly the cases', the
 * checks' and its own, in that order; every other test is in run mode, not inverted and ran before it; and the ends equal the
 * receipt anchor's first table, ids and counts, in run order. A test skipped, inverted, cut short or reordered reds there.
 *
 * NOT CLAIMED (scope sentences, no follow-up): global absence of a Pi -> Mechanical develop run is NOT CLAIMED by this census
 * (it never concludes one); stores outside PRIOR_RUN_SCOPE.read (the four declared unread stores, other docs, git history,
 * new-feedback/) are NOT CLAIMED; entries dated outside 2026-10-15..2026-11-06 are NOT CLAIMED (listed out of range); forge
 * verbs and flags other than the recorded argv, other forge builds, and the Forge source path from status to exit are NOT
 * CLAIMED; the B-outcomes guardrail EAT-R039 is NOT CLAIMED (it stays mandatory whatever this census records). wb-prv7 adds:
 * a markdown reading other than marked 18.0.11's lexer (the CommonMark points where marked differs included) is NOT CLAIMED; a
 * heading date written after an inline comment is NOT CLAIMED (the date is read from marked's heading text, where the comment
 * stays); an edit made in this file and the receipt anchor together (a later dated entry appended to
 * docs/workbench/receipts/wb-muip.md) is NOT CLAIMED, the append being the visible act a gate judges; an assertion edited or
 * replaced in place while its test's count holds is NOT CLAIMED (the record counts assertions, never their content); the record
 * itself skipped, inverted or cut short is NOT CLAIMED (no test reads the tree after it). wb-caoo adds: an html token holding
 * more than two comments is NOT CLAIMED by this census (the pinned tokens hold two); a comment form other than one closed
 * comment inside code (an empty comment or an opener never closed, in fenced code, indented code or a code span) is NOT
 * CLAIMED by this census (each code control shows one closed comment).
 *
 * RESIDUALS (rule 19(d): a named family plus a pinned quiet row, a case that reds when the quiet reading changes):
 * - R-OUTCOME-WORDS (QUIET-OUTCOME-WORDS): the fourth outcome docs/workbench/01 J03 names, indeterminate, is an ordinary word and
 *   is not read as a Mechanical outcome, so a run ending there reads as a partial (held to J03 by the J03 anchor row).
 * - R-PI-REFERENCE (QUIET-PI-REFERENCE): a Pi side named only by a session UUID is not read as a Pi run.
 * - R-SPELLING (QUIET-SPELLING): a component outside its one pattern (upper-case or short run ids and operation ids, camelCase or
 *   hyphenated outcome words, a 6-hex pin) is not read.
 * - R-SPLIT-JOIN (QUIET-SPLIT-JOIN): components split across entries never join.
 * - R-DECLARED-PROVENANCE (QUIET-DECLARED-PROVENANCE): provenance is read as declared, so a synthetic record that declares
 *   native-transcript with a full forge identity is admitted; the recorded receipt's tie is the probe script's SHA-256 only.
 * - R-VERDICT-SPELLING (QUIET-VERDICT-SPELLING): a failed gate spelled other than the native gate verdict FAIL (COULD_NOT_JUDGE,
 *   lower-case fail) is not read as failed.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { readReceiptsListing } from "../qa/workbench/receipts-index.mjs";
import {
  contractMismatches,
  GLOBAL_READINGS,
  JOIN_COMPONENTS,
  type JoinComponent,
  joinComponentsOf,
  jsonEntry,
  judgePriorRuns,
  judgeTransportPairing,
  markdownEntries,
  OUTCOME_TOKENS,
  PRIOR_RUN_SCOPE,
  PRIOR_RUN_VERDICTS,
  PROBE_RECEIPT,
  PROBE_SCHEMA,
  PROBE_SCRIPT,
  type PriorRunScope,
  readProbeReceipt,
  readStoreEntries,
  type StoreEntry,
  type TransportEvidence,
} from "./helpers/mechanical-evidence-census.js";

const REPO = fileURLToPath(new URL("../", import.meta.url));
const BEAD = "wb-muip";
const ROSTER = "test/fixtures/mwi-unknowns-requirements-roster.json";
const EXPORT = ".beads/issues.jsonl";
const J03_PAGE = "docs/workbench/01-product-vision-and-user-journeys.md";
const RECEIPT = "docs/workbench/receipts/wb-muip.md";

type RowId = "EAT-R080" | "EAT-R081";

interface Case {
  readonly id: string;
  readonly row: RowId;
  readonly kind: "claim" | "quiet";
  readonly title: string;
  /** The vendored adversarial mutant this case kills, verbatim (exactly one claim case per row carries it). */
  readonly kills?: string;
  readonly run: () => void;
}

const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const repoText = (path: string): string => readFileSync(join(REPO, path), "utf8");

// The planted join components: each matches exactly its one pattern and no other (no hex run of 7+ outside the pin).
const PI_RUN = "wf_0123456789ab";
const OUTCOME = "verified_candidate";
const OPERATION = `op-${"0123456789abcdef".repeat(2)}`;
const PIN = "0123456789abcdef0123456789abcdef01234567";
const PARTS: Readonly<Record<JoinComponent, string>> = {
  "pi-run": `Pi run ${PI_RUN}`,
  "mechanical-outcome": `settled ${OUTCOME}`,
  "forge-operation": `Forge ${OPERATION}`,
  "source-pin": `at ${PIN}`,
};
const textWithout = (missing: JoinComponent | null): string =>
  JOIN_COMPONENTS.filter((component) => component !== missing)
    .map((component) => PARTS[component])
    .join("; ");
const JOINED = textWithout(null);

const SCOPE: PriorRunScope = {
  from: "2026-10-15",
  to: "2026-11-06",
  read: [
    { id: "store-a", path: "a", shape: "markdown-entries" },
    { id: "store-b", path: "b", shape: "json-files" },
  ],
  unread: [{ id: "external-x", reason: "not authorized" }],
};
const entry = (ref: string, text: string, date: string | null = "2026-10-20", store = "store-a"): StoreEntry => ({ store, ref, date, text });

const FORGE = { name: "forge", version: "0.2.1", revision: "f7d4a6a8ae17" } as const;
const native = (id: string, processExit: number, gateVerdict: string, extra: Partial<TransportEvidence> = {}): TransportEvidence => ({
  id,
  source: "native-transcript",
  producer: FORGE,
  argv: ["forge", "build", "--json"],
  processExit,
  gateVerdict,
  operationId: OPERATION,
  ...extra,
});

interface RosterRequirement {
  readonly id: string;
  readonly lines: string;
  readonly sha256: string;
  readonly text: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly source: { readonly branch: string; readonly commit: string; readonly path: string; readonly blob: string; readonly fileSha256: string };
  readonly requirements: readonly RosterRequirement[];
}
const roster = (): Roster => JSON.parse(repoText(ROSTER)) as Roster;
const field = (requirement: RosterRequirement, label: string): string => {
  const prefix = `- ${label}: `;
  const lines = requirement.text.filter((line) => line.startsWith(prefix));
  expect(lines, `${requirement.id} carries exactly one ${label} line`).toHaveLength(1);
  return (lines[0] ?? "").slice(prefix.length);
};
const MUTANT_R080 = "Treat no in-repo filename hit as proof no external run occurred.";
const MUTANT_R081 = "Use a synthetic exit-zero FAIL fixture as a producer receipt.";

const CASES: readonly Case[] = [
  {
    id: "R080-NEVER-RAN-MUTANT",
    row: "EAT-R080",
    kind: "claim",
    title: "zero joined entries read as searched-scope absence with the global reading UNDETERMINED and the unread stores carried",
    kills: MUTANT_R080,
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", "a receipt that names no Mechanical run"), entry("b.json", "{}", "2026-10-21", "store-b")]);
      expect(record.verdict).toBe("searched-scope-absence");
      expect(record.global).toBe("UNDETERMINED");
      expect(record.witnesses).toEqual([]);
      expect(record.unread).toEqual(SCOPE.unread);
      expect(record.read).toEqual([
        { store: "store-a", entries: 1 },
        { store: "store-b", entries: 1 },
      ]);
    },
  },
  {
    id: "R080-EMPTY-UNREAD",
    row: "EAT-R080",
    kind: "claim",
    title: "with no store declared unread, zero joined entries still leave the global reading UNDETERMINED",
    run: () => {
      const record = judgePriorRuns({ ...SCOPE, unread: [] }, [entry("a.md#1", textWithout("forge-operation"))]);
      expect(record.verdict).toBe("searched-scope-absence");
      expect(record.global).toBe("UNDETERMINED");
      expect(record.unread).toEqual([]);
    },
  },
  {
    id: "R080-VOCABULARY",
    row: "EAT-R080",
    kind: "claim",
    title: "the verdict and global vocabularies hold no universal-absence word",
    run: () => {
      expect([...PRIOR_RUN_VERDICTS]).toEqual(["found-witness", "searched-scope-absence"]);
      expect([...GLOBAL_READINGS]).toEqual(["WITNESSED", "UNDETERMINED"]);
    },
  },
  {
    id: "R080-JOINED-WITNESS",
    row: "EAT-R080",
    kind: "claim",
    title: "one entry carrying all four join components is a found witness and the global reading WITNESSED",
    run: () => {
      expect(joinComponentsOf(JOINED)).toEqual([...JOIN_COMPONENTS]);
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", "unrelated"), entry("a.md#2", JOINED)]);
      expect(record.verdict).toBe("found-witness");
      expect(record.global).toBe("WITNESSED");
      expect(record.witnesses).toEqual(["a.md#2"]);
      expect(record.partials).toEqual([]);
    },
  },
  ...JOIN_COMPONENTS.map(
    (missing): Case => ({
      id: `R080-NEEDS-${{ "pi-run": "PI-RUN", "mechanical-outcome": "OUTCOME", "forge-operation": "OPERATION", "source-pin": "PIN" }[missing]}`,
      row: "EAT-R080",
      kind: "claim",
      title: `an entry without the ${missing} component is a partial, never a witness`,
      run: () => {
        const present = JOIN_COMPONENTS.filter((component) => component !== missing);
        expect(joinComponentsOf(textWithout(missing))).toEqual(present);
        const record = judgePriorRuns(SCOPE, [entry("a.md#3", textWithout(missing))]);
        expect(record.verdict).toBe("searched-scope-absence");
        expect(record.witnesses).toEqual([]);
        expect(record.partials).toEqual([{ ref: "a.md#3", store: "store-a", date: "2026-10-20", components: present }]);
      },
    }),
  ),
  {
    id: "R080-ONE-PART-PARTIAL",
    row: "EAT-R080",
    kind: "claim",
    title: "an entry carrying exactly one of the four join components is a partial naming that one, and an entry carrying none is not",
    run: () => {
      for (const component of JOIN_COMPONENTS) {
        const record = judgePriorRuns(SCOPE, [entry("a.md#1", PARTS[component])]);
        expect(record.witnesses, component).toEqual([]);
        expect(record.partials, component).toEqual([{ ref: "a.md#1", store: "store-a", date: "2026-10-20", components: [component] }]);
      }
      expect(judgePriorRuns(SCOPE, [entry("a.md#1", "a receipt that names no Mechanical run")]).partials).toEqual([]);
    },
  },
  {
    id: "R080-OUTCOME-TOKENS",
    row: "EAT-R080",
    kind: "claim",
    title: "each of the three snake_case domain outcome tokens completes the join",
    run: () => {
      expect([...OUTCOME_TOKENS]).toEqual(["verified_candidate", "verification_failed", "needs_evidence"]);
      for (const token of OUTCOME_TOKENS) {
        const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(OUTCOME, token))]);
        expect(record.witnesses, token).toEqual(["a.md#1"]);
      }
    },
  },
  {
    id: "R080-RANGE-BOUNDS",
    row: "EAT-R080",
    kind: "claim",
    title: "entries dated outside the declared range are listed out of range and not read; the bounds themselves are read",
    run: () => {
      const record = judgePriorRuns(SCOPE, [
        entry("a.md#1", JOINED, "2026-10-14"),
        entry("a.md#2", JOINED, "2026-11-07"),
        entry("a.md#3", JOINED, "2026-10-15"),
        entry("a.md#4", JOINED, "2026-11-06"),
      ]);
      expect(record.range).toEqual({ from: "2026-10-15", to: "2026-11-06" });
      expect(record.outOfRange).toEqual(["a.md#1", "a.md#2"]);
      expect(record.witnesses).toEqual(["a.md#3", "a.md#4"]);
      expect(record.read).toEqual([
        { store: "store-a", entries: 2 },
        { store: "store-b", entries: 0 },
      ]);
      const outside = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED, "2026-10-14")]);
      expect(outside.verdict).toBe("searched-scope-absence");
      expect(outside.global).toBe("UNDETERMINED");
    },
  },
  {
    id: "R080-UNDATED-READ",
    row: "EAT-R080",
    kind: "claim",
    title: "an undated entry is read, counted undated, and its join found",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#0", JOINED, null)]);
      expect(record.undated).toBe(1);
      expect(record.witnesses).toEqual(["a.md#0"]);
      expect(record.outOfRange).toEqual([]);
    },
  },
  {
    id: "R080-MARKDOWN-ENTRIES",
    row: "EAT-R080",
    kind: "claim",
    title: "a markdown receipt splits at its level-2 headings, each dated by a leading YYYY-MM-DD, and a join is found in its own entry",
    run: () => {
      const text = ["# wb-x: a title", "", "## 2026-10-20 receipt: first", "", "body one", "", "### 2026-10-21 a level-3 heading stays inside", "", "## an undated heading", "", JOINED, "", "## 2026-10-22T08:00Z second", "tail"].join("\n");
      const entries = markdownEntries("store-a", "r.md", text);
      expect(entries.map((item) => [item.ref, item.date])).toEqual([
        ["r.md#0", null],
        ["r.md#1", "2026-10-20"],
        ["r.md#2", null],
        ["r.md#3", "2026-10-22"],
      ]);
      expect(entries[1]?.text).toContain("### 2026-10-21 a level-3 heading stays inside");
      expect(entries.every((item) => item.store === "store-a")).toBe(true);
      expect(entries.map((item) => item.text).join("\n")).toBe(text);
      expect(judgePriorRuns(SCOPE, entries).witnesses).toEqual(["r.md#2"]);
    },
  },
  {
    id: "R080-HEADING-FORMS",
    row: "EAT-R080",
    kind: "claim",
    title: "the top-level level-2 headings marked reads, ATX or setext, open entries; level-1, level-3, indented-code and nested ones do not",
    run: () => {
      const text = [
        "# 2026-10-19 a level-1 heading leaves the preamble undated",
        "## 2026-10-20 atx",
        "### 2026-10-21 a level-3 heading",
        "2026-10-22 a setext heading",
        "---",
        "A level-1 setext heading",
        "===",
        "##\t2026-10-23 a tab after the marker",
        "   ## 2026-10-24 three spaces of indentation",
        "    ## 2026-10-25 indented code",
        "",
        "- ## 2026-10-26 inside a list item",
        "",
        "> ## 2026-10-27 inside a block quote",
        "",
        "<details>",
        "## 2026-10-29 inside an HTML block",
        "</details>",
        "",
        "## 2026-10-28 a closing sequence ##",
        "##",
      ].join("\n");
      const expected = [
        ["r.md#0", null],
        ["r.md#1", "2026-10-20"],
        ["r.md#2", "2026-10-22"],
        ["r.md#3", "2026-10-23"],
        ["r.md#4", "2026-10-24"],
        ["r.md#5", "2026-10-28"],
        ["r.md#6", null],
      ];
      const entries = markdownEntries("store-a", "r.md", text);
      expect(entries.map((item) => [item.ref, item.date])).toEqual(expected);
      expect(entries.map((item) => item.text.split("\n")[0])).toEqual([
        "# 2026-10-19 a level-1 heading leaves the preamble undated",
        "## 2026-10-20 atx",
        "2026-10-22 a setext heading",
        "##\t2026-10-23 a tab after the marker",
        "   ## 2026-10-24 three spaces of indentation",
        "## 2026-10-28 a closing sequence ##",
        "##",
      ]);
      expect(entries.map((item) => item.text).join("\n")).toBe(text);
      expect(markdownEntries("store-a", "r.md", text.split("\n").join("\r\n")).map((item) => [item.ref, item.date])).toEqual(expected);
      expect(() => markdownEntries("store-a", "r.md", "## 2026-10-20 a\rbody")).toThrow(/r\.md/);
    },
  },
  {
    id: "R080-FENCED-HEADING",
    row: "EAT-R080",
    kind: "claim",
    title: "a level-2 line inside fenced code opens no entry, so a join after a fenced out-of-range line is read in its own dated entry",
    run: () => {
      const fenced = ["# wb-x: a title", "## 2026-10-20 in range", "```", "## 2026-10-01 a fenced line dated before the range", "```", JOINED].join("\n");
      const entries = markdownEntries("store-a", "r.md", fenced);
      expect(entries.map((item) => [item.ref, item.date])).toEqual([
        ["r.md#0", null],
        ["r.md#1", "2026-10-20"],
      ]);
      const record = judgePriorRuns(SCOPE, entries);
      expect([record.verdict, record.witnesses, record.outOfRange]).toEqual(["found-witness", ["r.md#1"], []]);
      const bare = judgePriorRuns(
        SCOPE,
        markdownEntries(
          "store-a",
          "r.md",
          fenced
            .split("\n")
            .filter((line) => line !== "```")
            .join("\n"),
        ),
      );
      expect([bare.verdict, bare.witnesses, bare.outOfRange], "control: less its fence lines the line splits and its entry is out of range").toEqual(["searched-scope-absence", [], ["r.md#2"]]);
      const tilde = ["## 2026-10-20 a", "~~~~", "## inside a tilde fence", "~~~", "## still inside: a shorter run closes nothing", "~~~~", "## 2026-10-21 b"].join("\n");
      expect(markdownEntries("store-a", "r.md", tilde).map((item) => [item.ref, item.date])).toEqual([
        ["r.md#1", "2026-10-20"],
        ["r.md#2", "2026-10-21"],
      ]);
      const unclosed = markdownEntries("store-a", "r.md", ["## 2026-10-20 a", "```text", "## 2026-10-21 inside a fence never closed", JOINED].join("\n"));
      expect(unclosed.map((item) => item.ref)).toEqual(["r.md#1"]);
      expect(judgePriorRuns(SCOPE, unclosed).witnesses, "fenced code text is read").toEqual(["r.md#1"]);
    },
  },
  {
    id: "R080-COMMENT-TEXT",
    row: "EAT-R080",
    kind: "claim",
    title: "HTML comment text is not read: a join inside a comment is no witness, and a level-2 line inside a comment block opens no entry",
    run: () => {
      const block = ["# wb-x: a title", "## 2026-10-20 in range", "<!--", "## 2026-10-21 inside the comment", JOINED, "-->", "after the comment"].join("\n");
      const entries = markdownEntries("store-a", "r.md", block);
      expect(entries.map((item) => item.ref)).toEqual(["r.md#0", "r.md#1"]);
      expect(entries[1]?.text, "the entry's text keeps the comment").toContain(JOINED);
      const hidden = judgePriorRuns(SCOPE, entries);
      expect([hidden.verdict, hidden.global, hidden.witnesses, hidden.partials]).toEqual(["searched-scope-absence", "UNDETERMINED", [], []]);
      const twoComments: readonly (readonly [string, string])[] = [
        ["a block line holding two comments", `<!-- a note --> <!-- ${JOINED} -->`],
        ["a div block holding two comment lines", ["<div>", "<!-- a note -->", `<!-- ${JOINED} -->`, "</div>"].join("\n")],
      ];
      for (const [where, body] of twoComments) {
        expect(
          new Lexer().lex(body).map((token) => [token.type, token.raw.split("<!--").length - 1]),
          `${where}: one html token holding both comments`,
        ).toEqual([["html", 2]]);
        const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`));
        expect([record.witnesses, record.partials], `${where}: the four parts in the second comment are no witness and no partial`).toEqual([[], []]);
      }
      const firstOfTwo: readonly (readonly [string, string])[] = [
        ["a block line holding two comments, the parts in the first", `<!-- ${JOINED} --> <!-- a note -->`],
        ["a div block holding two comment lines, the parts in the first", ["<div>", `<!-- ${JOINED} -->`, "<!-- a note -->", "</div>"].join("\n")],
      ];
      for (const [where, body] of firstOfTwo) {
        expect(
          new Lexer().lex(body).map((token) => [token.type, token.raw.split("<!--").length - 1]),
          `${where}: one html token holding both comments`,
        ).toEqual([["html", 2]]);
        const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`));
        expect([record.witnesses, record.partials], `${where}: the four parts in the first comment are no witness and no partial`).toEqual([[], []]);
      }
      const outsideComments: readonly (readonly [string, number, string])[] = [
        ["a div block, the parts on a line of their own before the comment line", 1, ["<div>", JOINED, "<!-- a note -->", "</div>"].join("\n")],
        ["a block line, the parts after a closed comment", 1, `<!-- a note --> ${JOINED}`],
        ["a block line, the parts between two closed comments", 2, `<!-- a --> ${JOINED} <!-- b -->`],
        ["a div block, the parts on a line of their own between two comment lines", 2, ["<div>", "<!-- a -->", JOINED, "<!-- b -->", "</div>"].join("\n")],
      ];
      for (const [where, comments, body] of outsideComments) {
        expect(
          new Lexer().lex(body).map((token) => [token.type, token.raw.split("<!--").length - 1]),
          `${where}: one html token holding ${comments === 1 ? "one comment" : "two comments"}`,
        ).toEqual([["html", comments]]);
        const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`));
        expect(
          [record.verdict, record.global, record.witnesses, record.partials],
          `${where}: the four parts outside the comments are a witness`,
        ).toEqual(["found-witness", "WITNESSED", ["r.md#1"], []]);
      }
      const visible = textWithout("source-pin");
      const comment = `<!-- ${PARTS["source-pin"]} -->`;
      const placements: readonly (readonly [string, string])[] = [
        ["paragraph", `${visible} ${comment}`],
        ["heading", `## 2026-10-21 ${visible} ${comment}`],
        ["list item", `- ${visible} ${comment}`],
        ["block quote", `> ${visible} ${comment}`],
        ["table cell", `| A |\n| --- |\n| ${visible} ${comment} |`],
        ["emphasis", `*${visible} ${comment}*`],
        ["link text", `[${visible} ${comment}](https://example.invalid/receipt)`],
      ];
      for (const [where, body] of placements) {
        const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`));
        expect(record.witnesses, where).toEqual([]);
        expect(
          record.partials.flatMap((item) => item.components),
          where,
        ).toEqual(JOIN_COMPONENTS.filter((component) => component !== "source-pin"));
      }
      const unclosed = markdownEntries("store-a", "r.md", ["## 2026-10-20 a", "<!-- a comment block never closed", "## 2026-10-21 b", JOINED].join("\n"));
      expect(
        unclosed.map((item) => item.ref),
        "a comment block never closed runs to the receipt's end",
      ).toEqual(["r.md#1"]);
      expect(judgePriorRuns(SCOPE, unclosed).witnesses).toEqual([]);
      const indented = `    <!-- ${JOINED} -->`;
      expect(
        new Lexer().lex(`## 2026-10-20 a\n\n${indented}\n`).flatMap((token) => (token.type === "code" ? [(token as Tokens.Code).codeBlockStyle ?? "fenced"] : [])),
        "the indented-code control lexes as one indented code block",
      ).toEqual(["indented"]);
      const controls: readonly (readonly [string, string])[] = [
        ["no comment", JOINED],
        ["fenced code", ["```", `<!-- ${JOINED} -->`, "```"].join("\n")],
        ["code span", `\`<!-- ${JOINED} -->\``],
        ["indented code", indented],
        ["after an empty comment <!-->", `<!--> ${JOINED}`],
        ["after an empty comment <!--->", `<!---> ${JOINED}`],
        ["after an inline opener never closed, which marked reads as text", `a <!-- ${JOINED}`],
      ];
      for (const [where, body] of controls) {
        expect(judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`)).witnesses, where).toEqual(["r.md#1"]);
      }
    },
  },
  {
    id: "R080-CONTAINER-TEXT",
    row: "EAT-R080",
    kind: "claim",
    title: "the join reads a list item by item, a table cell by cell with its header row, a block quote line by line, and a link's destination",
    run: () => {
      const read = (body: string): JoinComponent[] => judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", `## 2026-10-20 a\n\n${body}\n`)).partials.flatMap((item) => item.components);
      expect(read(`- ${PARTS["source-pin"]}\n- the next item`), "a list item ending on a pin, then the next item").toEqual(["source-pin"]);
      expect(read(`| ${PARTS["source-pin"]} | the next cell |\n| --- | --- |\n| ${PARTS["pi-run"]} | x |`), "a pin in a header cell, a run id in a body cell").toEqual(["pi-run", "source-pin"]);
      expect(read(`> ${PARTS["pi-run"]}\n> ${PARTS["source-pin"]}`), "a block quote of two lines").toEqual(["pi-run", "source-pin"]);
      expect(read(`[a commit](https://example.invalid/commit/${PIN})`), "a pin in a link's destination, the raw text around its children").toEqual(["source-pin"]);
    },
  },
  {
    id: "R080-JSON-ENTRY",
    row: "EAT-R080",
    kind: "claim",
    title: "a JSON receipt is one entry dated by its top-level utc; no utc, a non-date utc or unparsable text is undated",
    run: () => {
      const dated = jsonEntry("store-b", "b.json", JSON.stringify({ utc: "2026-10-15T22:35:49.543Z", note: JOINED }));
      expect(dated).toEqual({ store: "store-b", ref: "b.json", date: "2026-10-15", text: JSON.stringify({ utc: "2026-10-15T22:35:49.543Z", note: JOINED }) });
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ note: JOINED })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ utc: "yesterday" })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ nested: { utc: "2026-10-15T00:00:00Z" } })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", "{ not json").date).toBeNull();
      expect(judgePriorRuns(SCOPE, [dated]).witnesses).toEqual(["b.json"]);
    },
  },
  {
    id: "R080-UNDECLARED-STORE",
    row: "EAT-R080",
    kind: "claim",
    title: "an entry from a store the scope does not declare is refused",
    run: () => {
      expect(() => judgePriorRuns(SCOPE, [entry("z.md#1", JOINED, "2026-10-20", "store-z")])).toThrow(/store-z/);
    },
  },
  {
    id: "R080-LIVE-STORES",
    row: "EAT-R080",
    kind: "claim",
    title: "on the live tree every declared store reads entries, and the record follows its witnesses and carries the four unread stores",
    run: () => {
      const byStore = new Map(PRIOR_RUN_SCOPE.read.map((store) => [store.id, readStoreEntries(REPO, store)]));
      const files = (id: string): string[] => [...new Set((byStore.get(id) ?? []).map((item) => item.ref.replace(/#\d+$/, "")))];
      const listed = readReceiptsListing(join(REPO, "docs/workbench/receipts")).entries.filter((item: { file: boolean }) => item.file);
      expect(files("pi-receipts")).toEqual(listed.map((item: { name: string }) => `docs/workbench/receipts/${item.name}`).sort());
      expect(files("pi-traceability")).toEqual(["docs/workbench/TRACEABILITY.md"]);
      expect(files("pi-qa-receipts")).toEqual(expect.arrayContaining(["qa/workbench/receipts/wb-a2g.3-operator-receipt.json", PROBE_RECEIPT]));
      expect(files("pi-qa-receipts").every((path) => path.endsWith(".json"))).toBe(true);
      for (const store of PRIOR_RUN_SCOPE.read) expect((byStore.get(store.id) ?? []).length, store.id).toBeGreaterThan(0);
      const record = judgePriorRuns(PRIOR_RUN_SCOPE, [...byStore.values()].flat());
      expect(record.verdict).toBe(record.witnesses.length > 0 ? "found-witness" : "searched-scope-absence");
      expect(record.global).toBe(record.witnesses.length > 0 ? "WITNESSED" : "UNDETERMINED");
      expect(record.unread.map((store) => store.id)).toEqual(["mechanical-workflows-repository", "shared-artifact-store", "claude-session-journals", "workbench-machine-ledger"]);
      expect(record.read.map((store) => store.store)).toEqual(["pi-receipts", "pi-traceability", "pi-qa-receipts"]);
      for (const store of record.read) expect(store.entries, store.store).toBeGreaterThan(0);
    },
  },
  {
    id: "R080-LIVE-PLANTED",
    row: "EAT-R080",
    kind: "claim",
    title: "a joined entry planted into each store's first live file is found by the same reader",
    run: () => {
      for (const store of PRIOR_RUN_SCOPE.read) {
        const first = readStoreEntries(REPO, store)[0];
        expect(first, store.id).toBeDefined();
        const path = (first?.ref ?? "").replace(/#\d+$/, "");
        const live = repoText(path);
        const planted =
          store.shape === "markdown-entries"
            ? markdownEntries(store.id, path, `${live}\n## 2026-11-01 planted\n\n${JOINED}\n`)
            : [jsonEntry(store.id, path, JSON.stringify({ ...(JSON.parse(live) as Record<string, unknown>), planted: JOINED }))];
        const record = judgePriorRuns(PRIOR_RUN_SCOPE, planted);
        expect(record.verdict, store.id).toBe("found-witness");
        expect(record.witnesses.length, store.id).toBeGreaterThan(0);
      }
    },
  },
  {
    id: "R081-FIXTURE-MUTANT",
    row: "EAT-R081",
    kind: "claim",
    title: "a synthetic fixture pairing exit 0 with FAIL is excluded as not producer evidence and the verdict stays UNDETERMINED",
    kills: MUTANT_R081,
    run: () => {
      const record = judgeTransportPairing([native("synthetic", 0, "FAIL", { source: "fixture" })]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded).toEqual([{ id: "synthetic", reason: "not-producer-evidence" }]);
      expect(record.admitted).toEqual([]);
      expect(record.witnesses).toEqual([]);
    },
  },
  {
    id: "R081-ADAPTER-CONDITIONAL",
    row: "EAT-R081",
    kind: "claim",
    title: "an adapter conditional pairing exit 0 with FAIL is excluded and the verdict stays UNDETERMINED",
    run: () => {
      const record = judgeTransportPairing([native("live-gate.ts:210", 0, "FAIL", { source: "adapter-conditional" })]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded).toEqual([{ id: "live-gate.ts:210", reason: "not-producer-evidence" }]);
    },
  },
  {
    id: "R081-PAIRING-WITNESSED",
    row: "EAT-R081",
    kind: "claim",
    title: "an admitted native transcript exiting 0 with gate verdict FAIL is a witnessed pairing",
    run: () => {
      const record = judgeTransportPairing([native("zero-fail", 0, "FAIL"), native("one-fail", 1, "FAIL")]);
      expect(record.verdict).toBe("pairing-witnessed");
      expect(record.witnesses).toEqual(["zero-fail"]);
      expect(record.admitted).toEqual(["zero-fail", "one-fail"]);
    },
  },
  {
    id: "R081-SCOPED-NON-OBSERVATION",
    row: "EAT-R081",
    kind: "claim",
    title: "admitted native FAIL transcripts exiting nonzero are a scoped non-observation naming each producer and argv",
    run: () => {
      const record = judgeTransportPairing([native("pass", 0, "PASS"), native("fail", 1, "FAIL"), native("kg", 1, "FAIL", { argv: ["forge", "build", "--keep-going", "--json"] })]);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.scope).toEqual([
        { id: "fail", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --json" },
        { id: "kg", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --keep-going --json" },
      ]);
    },
  },
  {
    id: "R081-NEEDS-PRODUCER",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without the forge name, version or revision is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("no-producer", 0, "FAIL", { producer: undefined }),
        native("other-name", 0, "FAIL", { producer: { ...FORGE, name: "furnace" } }),
        native("no-version", 0, "FAIL", { producer: { ...FORGE, version: "" } }),
        native("no-revision", 0, "FAIL", { producer: { ...FORGE, revision: null } }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(4).fill("producer-identity-missing"));
    },
  },
  {
    id: "R081-NEEDS-OPERATION",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without a native operation id is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("none", 0, "FAIL", { operationId: null }),
        native("upper", 0, "FAIL", { operationId: OPERATION.toUpperCase() }),
        native("short", 0, "FAIL", { operationId: OPERATION.slice(0, -1) }),
        native("bare", 0, "FAIL", { operationId: OPERATION.slice(3) }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(4).fill("operation-id-missing"));
    },
  },
  {
    id: "R081-NEEDS-PAIRING-FIELDS",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without an integer exit, a gate verdict or an argv is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("signalled", 0, "FAIL", { processExit: null }),
        native("fractional", 0, "FAIL", { processExit: 0.5 }),
        native("no-verdict", 0, "FAIL", { gateVerdict: null }),
        native("empty-verdict", 0, "FAIL", { gateVerdict: "" }),
        native("no-argv", 0, "FAIL", { argv: [] }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(5).fill("pairing-fields-missing"));
    },
  },
  {
    id: "R081-NO-FAILED-GATE",
    row: "EAT-R081",
    kind: "claim",
    title: "PASS-only admitted transcripts, or no evidence at all, leave the verdict UNDETERMINED",
    run: () => {
      const passing = judgeTransportPairing([native("pass", 0, "PASS")]);
      expect(passing.verdict).toBe("UNDETERMINED");
      expect(passing.admitted).toEqual(["pass"]);
      expect(judgeTransportPairing([]).verdict).toBe("UNDETERMINED");
    },
  },
  {
    id: "R081-FIXTURE-NEVER-UPGRADES",
    row: "EAT-R081",
    kind: "claim",
    title: "a fixture exit-0 FAIL beside an admitted nonzero FAIL leaves a scoped non-observation",
    run: () => {
      const record = judgeTransportPairing([native("synthetic", 0, "FAIL", { source: "fixture" }), native("fail", 1, "FAIL")]);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.scope.map((item) => item.id)).toEqual(["fail"]);
    },
  },
  {
    id: "R081-CONTRACT-CONSISTENCY",
    row: "EAT-R081",
    kind: "claim",
    title: "a transcript whose exit differs from the contract's code for its status, or whose status the contract lacks, is named",
    run: () => {
      const exitCodes = { success: 0, error: 1, partial: 3 };
      expect(
        contractMismatches(exitCodes, [
          { id: "ok-pass", envelopeStatus: "success", processExit: 0 },
          { id: "ok-fail", envelopeStatus: "error", processExit: 1 },
          { id: "zero-error", envelopeStatus: "error", processExit: 0 },
          { id: "unknown-status", envelopeStatus: "mystery", processExit: 0 },
          { id: "no-status", envelopeStatus: null, processExit: 1 },
        ]),
      ).toEqual(["zero-error", "unknown-status", "no-status"]);
    },
  },
  {
    id: "R081-RECORDED-PROBE",
    row: "EAT-R081",
    kind: "claim",
    title: "the committed probe receipt, tied to the probe script's bytes, records a scoped non-observation over two failed gates",
    run: () => {
      const receipt = readProbeReceipt(repoText(PROBE_RECEIPT));
      expect([receipt.schema, receipt.bead, receipt.requirement]).toEqual([PROBE_SCHEMA, BEAD, "EAT-R081"]);
      expect(receipt.probe).toEqual({ script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(join(REPO, PROBE_SCRIPT))) });
      expect([receipt.producer.name, receipt.producer.version, receipt.producer.revision]).toEqual(["forge", "0.2.1", "f7d4a6a8ae17"]);
      expect(receipt.producer.executableSha256).toMatch(/^[0-9a-f]{64}$/);
      expect(receipt.exitCodeContract.argv).toEqual(["forge", "codes", "--json"]);
      expect(receipt.exitCodeContract.processExit).toBe(0);
      expect(Object.entries(receipt.exitCodeContract.exitCodes).filter(([, code]) => code === 0)).toEqual([["success", 0]]);
      expect(receipt.exitCodeContract.exitCodes.error).toBe(1);
      expect(contractMismatches(receipt.exitCodeContract.exitCodes, receipt.transcripts)).toEqual([]);
      expect(receipt.transcripts.map((item) => [item.id, item.source, item.processExit, item.envelopeStatus, item.gateVerdict])).toEqual([
        ["pass-control", "native-transcript", 0, "success", "PASS"],
        ["fail", "native-transcript", 1, "error", "FAIL"],
        ["fail-keep-going", "native-transcript", 1, "error", "FAIL"],
      ]);
      const record = judgeTransportPairing(receipt.transcripts);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.excluded).toEqual([]);
      expect(record.admitted).toEqual(["pass-control", "fail", "fail-keep-going"]);
      expect(record.scope).toEqual([
        { id: "fail", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --json" },
        { id: "fail-keep-going", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --keep-going --no-replay --json" },
      ]);
    },
  },
  {
    id: "QUIET-OUTCOME-WORDS",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-OUTCOME-WORDS: a run that ends on the plain word indeterminate reads as a partial, never a witness",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(OUTCOME, "indeterminate"))]);
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.components)).toEqual([["pi-run", "forge-operation", "source-pin"]]);
    },
  },
  {
    id: "QUIET-PI-REFERENCE",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-PI-REFERENCE: a Pi side named only by a session UUID is not read as a Pi run",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(PI_RUN, "00000000-0000-4000-8000-000000000000"))]);
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.components)).toEqual([["mechanical-outcome", "forge-operation", "source-pin"]]);
    },
  },
  {
    id: "QUIET-SPELLING",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-SPELLING: a component written outside its one pattern is not read",
    run: () => {
      const spellings: readonly (readonly [JoinComponent, string, string])[] = [
        ["pi-run", PI_RUN, PI_RUN.toUpperCase()],
        ["pi-run", PI_RUN, "wf_01234"],
        ["mechanical-outcome", OUTCOME, "verifiedCandidate"],
        ["mechanical-outcome", OUTCOME, "verified-candidate"],
        ["forge-operation", OPERATION, `op-${"0123456789ABCDEF".repeat(2)}`],
        ["forge-operation", OPERATION, "op-0123456789abcdef"],
        ["source-pin", PIN, "abc123"],
      ];
      for (const [component, standard, spelling] of spellings) {
        const components = joinComponentsOf(JOINED.replace(standard, spelling));
        expect(components, spelling).toEqual(JOIN_COMPONENTS.filter((item) => item !== component));
      }
    },
  },
  {
    id: "QUIET-SPLIT-JOIN",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-SPLIT-JOIN: components split across two entries of one receipt never join",
    run: () => {
      const text = ["# wb-x: a title", "## 2026-10-20 one", `${PARTS["pi-run"]}; ${PARTS["mechanical-outcome"]}`, "## 2026-10-21 two", `${PARTS["forge-operation"]}; ${PARTS["source-pin"]}`].join("\n");
      const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", text));
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.ref)).toEqual(["r.md#1", "r.md#2"]);
    },
  },
  {
    id: "QUIET-DECLARED-PROVENANCE",
    row: "EAT-R081",
    kind: "quiet",
    title: "R-DECLARED-PROVENANCE: a synthetic record that declares native-transcript with a full forge identity is admitted",
    run: () => {
      const record = judgeTransportPairing([native("relabelled", 0, "FAIL", { producer: { name: "forge", version: "0.0.0-synthetic", revision: "000000000000" } })]);
      expect(record.verdict).toBe("pairing-witnessed");
      expect(record.admitted).toEqual(["relabelled"]);
    },
  },
  {
    id: "QUIET-VERDICT-SPELLING",
    row: "EAT-R081",
    kind: "quiet",
    title: "R-VERDICT-SPELLING: a failed gate spelled other than the native FAIL verdict is not read as failed",
    run: () => {
      const record = judgeTransportPairing([native("cnj", 0, "COULD_NOT_JUDGE"), native("lower", 0, "fail")]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.admitted).toEqual(["cnj", "lower"]);
      expect(record.witnesses).toEqual([]);
    },
  },
];

/** The census rows: each requirement's statement (held to the roster) and the claim cases that pin it. */
const ROWS: readonly { readonly id: RowId; readonly statement: string; readonly pins: readonly string[] }[] = [
  {
    id: "EAT-R080",
    statement: "The prior-run census MUST distinguish repository absence from global absence.",
    pins: [
      "R080-NEVER-RAN-MUTANT",
      "R080-EMPTY-UNREAD",
      "R080-VOCABULARY",
      "R080-JOINED-WITNESS",
      "R080-NEEDS-PI-RUN",
      "R080-NEEDS-OUTCOME",
      "R080-NEEDS-OPERATION",
      "R080-NEEDS-PIN",
      "R080-ONE-PART-PARTIAL",
      "R080-OUTCOME-TOKENS",
      "R080-RANGE-BOUNDS",
      "R080-UNDATED-READ",
      "R080-MARKDOWN-ENTRIES",
      "R080-HEADING-FORMS",
      "R080-FENCED-HEADING",
      "R080-COMMENT-TEXT",
      "R080-CONTAINER-TEXT",
      "R080-JSON-ENTRY",
      "R080-UNDECLARED-STORE",
      "R080-LIVE-STORES",
      "R080-LIVE-PLANTED",
    ],
  },
  {
    id: "EAT-R081",
    statement: "The Forge transport probe MUST settle the exit-zero failed-gate premise from producer evidence.",
    pins: [
      "R081-FIXTURE-MUTANT",
      "R081-ADAPTER-CONDITIONAL",
      "R081-PAIRING-WITNESSED",
      "R081-SCOPED-NON-OBSERVATION",
      "R081-NEEDS-PRODUCER",
      "R081-NEEDS-OPERATION",
      "R081-NEEDS-PAIRING-FIELDS",
      "R081-NO-FAILED-GATE",
      "R081-FIXTURE-NEVER-UPGRADES",
      "R081-CONTRACT-CONSISTENCY",
      "R081-RECORDED-PROBE",
    ],
  },
];

/** The named residual families, each with its row and its pinned quiet case. */
const RESIDUALS: readonly { readonly id: string; readonly row: RowId; readonly quiet: string; readonly members?: readonly string[] }[] = [
  { id: "R-OUTCOME-WORDS", row: "EAT-R080", quiet: "QUIET-OUTCOME-WORDS", members: ["indeterminate"] },
  { id: "R-PI-REFERENCE", row: "EAT-R080", quiet: "QUIET-PI-REFERENCE" },
  { id: "R-SPELLING", row: "EAT-R080", quiet: "QUIET-SPELLING" },
  { id: "R-SPLIT-JOIN", row: "EAT-R080", quiet: "QUIET-SPLIT-JOIN" },
  { id: "R-DECLARED-PROVENANCE", row: "EAT-R081", quiet: "QUIET-DECLARED-PROVENANCE" },
  { id: "R-VERDICT-SPELLING", row: "EAT-R081", quiet: "QUIET-VERDICT-SPELLING" },
];

/** Each test's own end, in run order, as `${id}:${assertion count}` (THE RECORD): an early return leaves it unrecorded or short. */
const ENDS: string[] = [];
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;
const caseTitle = (item: Case): string => `${item.id} [${item.row}] ${item.title}`;

/** The checks registered after the cases, in registration order, with their titles (the record holds each registered title to these): each reads this census's own structure and records its end. */
const CHECKS: readonly { readonly id: string; readonly title: string }[] = [
  { id: "CHECK-FROZEN-SHAPE", title: "frozen shape (rule 16): the rows, their pin counts and the residual families are exactly the cut's" },
  { id: "CHECK-TILING", title: "the rows and residuals tile the cases: each case is pinned once, by a row or residual of its own requirement and kind" },
  { id: "CHECK-ROSTER", title: "the roster vendors each requirement block under its SHA-256, and the rows' statements and mutant kills are its text" },
  { id: "CHECK-EXPORT-ANCHOR", title: "outside anchor: this bead's row of the tracked export names exactly the census rows' requirement ids, in order" },
  { id: "CHECK-J03-ANCHOR", title: "outside anchor: docs/workbench/01 J03's outcome list is the reader's outcome tokens followed by R-OUTCOME-WORDS' members" },
  { id: "CHECK-LIVE-SCOPE", title: "the declared live scope names a bounded range and only stores whose paths exist in the tree" },
  { id: "CHECK-RECEIPT-ANCHOR", title: "outside anchor: the wb-muip receipt's last entry lists every test before the record and every residual family, exactly" },
];
const RECORD_TITLE = "the record: every registered test ran in run mode before this one, and each reached its end with the receipt anchor's count";

/** THE RECEIPT ANCHOR's two table headers, exactly. */
const TESTS_HEADER = ["Test", "Row", "Kind", "Assertions"];
const RESIDUALS_HEADER = ["Residual family", "Row", "Quiet row"];
interface Anchor {
  readonly tests: readonly { readonly id: string; readonly row: string; readonly kind: string; readonly assertions: number }[];
  readonly residuals: readonly { readonly id: string; readonly row: string; readonly quiet: string }[];
}
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** The receipt anchor: the two tables of a receipt page's last top-level level-2 entry, read through marked's tokens (one table per header). */
function receiptAnchorOf(page: string): Anchor {
  const tokens = new Lexer().lex(page);
  const last = tokens.flatMap((token, index) => (token.type === "heading" && (token as Tokens.Heading).depth === 2 ? [index] : [])).at(-1);
  const tables = (last === undefined ? [] : tokens.slice(last + 1)).filter(isTable).map((table) => [table.header.map((cell) => cell.text), ...table.rows.map((row) => row.map((cell) => cell.text))]);
  const rowsOf = (header: readonly string[]): string[][] => {
    const found = tables.filter((table) => JSON.stringify(table[0]) === JSON.stringify(header));
    if (found.length !== 1) throw new Error(`the receipt page's last entry holds ${found.length} tables headed ${header.join(" | ")}`);
    return (found[0] ?? []).slice(1);
  };
  return {
    tests: rowsOf(TESTS_HEADER).map(([id = "", row = "", kind = "", assertions = ""]) => ({ id, row, kind, assertions: Number(assertions) })),
    residuals: rowsOf(RESIDUALS_HEADER).map(([id = "", row = "", quiet = ""]) => ({ id, row, quiet })),
  };
}
const receiptAnchor = (): Anchor => receiptAnchorOf(repoText(RECEIPT));

describe("wb-muip evidence census: EAT-R080 prior-run census and EAT-R081 Forge transport probe (MWI B-unknowns)", () => {
  for (const item of CASES)
    it(caseTitle(item), () => {
      item.run();
      ENDS.push(endOf(item.id));
    });

  it("frozen shape (rule 16): the rows, their pin counts and the residual families are exactly the cut's", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["EAT-R080:21", "EAT-R081:11"]);
    expect(RESIDUALS.map((residual) => `${residual.id}:${residual.row}:${residual.quiet}`)).toEqual([
      "R-OUTCOME-WORDS:EAT-R080:QUIET-OUTCOME-WORDS",
      "R-PI-REFERENCE:EAT-R080:QUIET-PI-REFERENCE",
      "R-SPELLING:EAT-R080:QUIET-SPELLING",
      "R-SPLIT-JOIN:EAT-R080:QUIET-SPLIT-JOIN",
      "R-DECLARED-PROVENANCE:EAT-R081:QUIET-DECLARED-PROVENANCE",
      "R-VERDICT-SPELLING:EAT-R081:QUIET-VERDICT-SPELLING",
    ]);
    ENDS.push(endOf("CHECK-FROZEN-SHAPE"));
  });

  it("the rows and residuals tile the cases: each case is pinned once, by a row or residual of its own requirement and kind", () => {
    const ids = CASES.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    const placed = [...ROWS.flatMap((row) => row.pins.map((pin) => [pin, row.id, "claim"] as const)), ...RESIDUALS.map((residual) => [residual.quiet, residual.row, "quiet"] as const)];
    expect(placed.map(([id]) => id).sort()).toEqual([...ids].sort());
    for (const [id, row, kind] of placed) {
      const pinned = CASES.find((item) => item.id === id);
      expect(pinned?.row, id).toBe(row);
      expect(pinned?.kind, id).toBe(kind);
    }
    ENDS.push(endOf("CHECK-TILING"));
  });

  it("the roster vendors each requirement block under its SHA-256, and the rows' statements and mutant kills are its text", () => {
    const vendored = roster();
    expect(vendored.bead).toBe(BEAD);
    expect(vendored.source.commit).toMatch(/^[0-9a-f]{40}$/);
    expect(vendored.source.path).toBe("docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md");
    expect(vendored.requirements.map((requirement) => requirement.id)).toEqual(ROWS.map((row) => row.id));
    for (const requirement of vendored.requirements) {
      expect(sha256(requirement.text.join("\n")), requirement.id).toBe(requirement.sha256);
      expect(requirement.text[0]?.startsWith(`### ${requirement.id} `), requirement.id).toBe(true);
      const row = ROWS.find((candidate) => candidate.id === requirement.id);
      expect(field(requirement, "Statement"), requirement.id).toBe(row?.statement);
      const kills = CASES.filter((item) => item.row === requirement.id && item.kills !== undefined);
      expect(
        kills.map((item) => [item.kind, item.kills]),
        requirement.id,
      ).toEqual([["claim", field(requirement, "Adversarial mutant")]]);
      expect(field(requirement, "Acceptance").length, requirement.id).toBeGreaterThan(0);
    }
    ENDS.push(endOf("CHECK-ROSTER"));
  });

  it("outside anchor: this bead's row of the tracked export names exactly the census rows' requirement ids, in order", () => {
    const rows = rehydrateTrackerExport(repoText(EXPORT), join(REPO, EXPORT))
      .split("\n")
      .filter((line) => line.includes(`"id":"${BEAD}"`))
      .map((line) => JSON.parse(line) as { readonly id?: unknown; readonly description?: unknown })
      .filter((record) => record.id === BEAD);
    expect(rows).toHaveLength(1);
    const description = rows[0]?.description;
    expect(typeof description).toBe("string");
    expect(String(description).match(/EAT-R\d{3}/g)).toEqual(ROWS.map((row) => row.id));
    ENDS.push(endOf("CHECK-EXPORT-ANCHOR"));
  });

  it("outside anchor: docs/workbench/01 J03's outcome list is the reader's outcome tokens followed by R-OUTCOME-WORDS' members", () => {
    const lines = repoText(J03_PAGE)
      .split("\n")
      .filter((line) => line.startsWith("J03 "));
    expect(lines).toHaveLength(1);
    const list = (lines[0] ?? "").match(/[a-z_]+(?: \/ [a-z_]+)+/);
    expect(list).not.toBeNull();
    const members = RESIDUALS.find((residual) => residual.id === "R-OUTCOME-WORDS")?.members ?? [];
    expect((list?.[0] ?? "").split(" / ")).toEqual([...OUTCOME_TOKENS, ...members]);
    ENDS.push(endOf("CHECK-J03-ANCHOR"));
  });

  it("the declared live scope names a bounded range and only stores whose paths exist in the tree", () => {
    expect(PRIOR_RUN_SCOPE.from <= PRIOR_RUN_SCOPE.to).toBe(true);
    expect([PRIOR_RUN_SCOPE.from, PRIOR_RUN_SCOPE.to].every((day) => /^\d{4}-\d{2}-\d{2}$/.test(day))).toBe(true);
    for (const store of PRIOR_RUN_SCOPE.read) {
      const parent = store.path.includes("/") ? store.path.slice(0, store.path.lastIndexOf("/")) : ".";
      const name = store.path.slice(store.path.lastIndexOf("/") + 1);
      expect(readdirSync(join(REPO, parent)), store.path).toContain(name);
    }
    expect(PRIOR_RUN_SCOPE.unread.every((store) => store.reason.length > 0)).toBe(true);
    ENDS.push(endOf("CHECK-LIVE-SCOPE"));
  });

  it("outside anchor: the wb-muip receipt's last entry lists every test before the record and every residual family, exactly", () => {
    const anchor = receiptAnchor();
    expect(
      anchor.tests.map((test) => `${test.id} ${test.row} ${test.kind}`),
      "the first table: every test before the record, in registration order",
    ).toEqual([...CASES.map((item) => `${item.id} ${item.row} ${item.kind}`), ...CHECKS.map((check) => `${check.id} - check`)]);
    expect(
      ROWS.map((row) => [row.id, ...row.pins]),
      "each census row's claim tests in the first table are its pins, in order",
    ).toEqual(ROWS.map((row) => [row.id, ...anchor.tests.filter((test) => test.row === row.id && test.kind === "claim").map((test) => test.id)]));
    expect(
      anchor.residuals.map((residual) => `${residual.id} ${residual.row} ${residual.quiet}`),
      "the second table: the residual families",
    ).toEqual(RESIDUALS.map((residual) => `${residual.id} ${residual.row} ${residual.quiet}`));
    expect(
      anchor.tests.filter((test) => !Number.isSafeInteger(test.assertions) || test.assertions < 1).map((test) => test.id),
      "every count is a positive integer",
    ).toEqual([]);
    const table = (header: readonly string[], row: readonly string[]): string => [`| ${header.join(" | ")} |`, `| ${header.map(() => "---").join(" | ")} |`, `| ${row.join(" | ")} |`].join("\n");
    const entryOf = (day: string, test: string, residual: string): string =>
      [`## ${day} entry`, "", table(TESTS_HEADER, [test, "EAT-R080", "claim", "1"]), "", table(RESIDUALS_HEADER, [residual, "EAT-R080", "QUIET-X"]), ""].join("\n");
    const page = ["# wb-x: a title", "", entryOf("2026-11-01", "FIRST", "R-FIRST"), entryOf("2026-11-02", "LAST", "R-LAST")].join("\n");
    expect(receiptAnchorOf(page), "a two-entry page reads its last entry's tables").toEqual({ tests: [{ id: "LAST", row: "EAT-R080", kind: "claim", assertions: 1 }], residuals: [{ id: "R-LAST", row: "EAT-R080", quiet: "QUIET-X" }] });
    expect(() => receiptAnchorOf(`${page}\n${table(TESTS_HEADER, ["AGAIN", "EAT-R080", "claim", "1"])}\n`), "two tables under one header").toThrow(/2 tables/);
    expect(() => receiptAnchorOf(["# wb-x: a title", "", "## 2026-11-03 entry", "", table(TESTS_HEADER, ["ONLY", "EAT-R080", "claim", "1"]), ""].join("\n")), "no residual table").toThrow(/0 tables/);
    ENDS.push(endOf("CHECK-RECEIPT-ANCHOR"));
  });

  it(RECORD_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(
      walked.map((entry) => entry.name),
      "every registered test of this file, exactly and in registration order",
    ).toEqual([...CASES.map(caseTitle), ...CHECKS.map((check) => check.title), RECORD_TITLE]);
    expect(
      walked.findIndex((entry) => entry.self),
      "this record finds itself by task identity, registered last",
    ).toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry) => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map((entry) => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this one",
    ).toEqual([]);
    expect(ENDS, "every test before this one reached its end with the receipt anchor's assertion count, in run order").toEqual(receiptAnchor().tests.map((test) => `${test.id}:${test.assertions}`));
  });
});

import { rehydrateTrackerExport } from "../qa/workbench/tracker-export.mjs";
