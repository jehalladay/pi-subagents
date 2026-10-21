/**
 * wb-h8f.9 (VC-1..VC-7/docs-11): census falsifier for the "Acceptance journeys" section of
 * docs/workbench/11-designer-and-operator.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE: judge(.forge/vitest-report.json, pins) through the shared helper
 * test/helpers/census.ts, after the owner's census-step commits landed (the post-u62 adoption cut; respin cut 4 cures
 * the 2026-10-20T04:21Z g9-gate-s1 refusal U1-U6).
 *
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates" requires that docs and status tables
 * "distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"" and that
 * "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly
 * weakened." This leg binds the five docs/11 journey sentences to one truth label per evidence leg. It executes no
 * journey and no pinned case: a "fixture pass" pin counts only when the default gate's own run (its vitest JSON
 * report, written by `npm run test` before the census step runs) collected the pinned case exactly once, recorded it
 * passed and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo,
 * inverted, excluded or unregistered pinned case therefore reads red naming the journey, its sentence, the file and
 * the title, as far as the helper's resolvable-construct roster and named residuals reach (test/helpers/census.ts,
 * receipts/wb-u62.md). This leg scans no test source for case calls and spawns no process. Its own code reads docs/11,
 * docs/14, TRACEABILITY.md, the rule-13 per-bead receipts, the committed operator receipt and vitest.census.config.ts, and its own source through the
 * helper's sourceStructure (AC4); the helper's vouch (censusGuard) reads the default vitest config and forge.toml by
 * design, so this leg makes no "reads no config" claim.
 *
 * Evidence kinds (one label per leg, never a pass label from a title's presence alone):
 * - cases         "fixture pass" - judged by judge() over the default-gate report (tier "test").
 * - receipt       "live SDK pass" - the command id must sit in a live paragraph/list item of TRACEABILITY or the
 *                 rule-13 per-bead receipts route; this leg reads the committed evidence, never re-runs the receipt.
 * - owner-receipt "live SDK pass" - an OWNER RECEIPT with no forge-run cmd_ of its own (owner ruling
 *                 2026-10-16T01:16Z: the wb-h7r v2 operator receipt COUNTS as journey 1's live SDK pass evidence).
 *                 Admitted only when the committed file exists, itself carries the row's contract and revision and
 *                 records a realised pass; the section under the row's heading (exactly once across both evidence routes, rendered
 *                 view) cites the file at that revision in a live paragraph, list item or nested quote; and the row carries the
 *                 owner-worded citation - the committed path, the revision, the landing gate, the owner-receipt
 *                 statement and the alias-vs-native fact as the receipt's own preflight records it.
 * - artifact      "code present" - a committed file cited by a section in either evidence route (no row today).
 * - open          "code present" | "not started" - a tracking bead id; never a pass label.
 *
 * wb-qys1 / R658: citation text is rendered from marked tokens, never raw markdown. Inline code/emphasis/link text
 * counts; comments, fenced examples, images, definitions and link destinations do not. Nested lists and quotes are
 * traversed while separate blocks remain separate claims. Owner/artifact heading uniqueness is corpus-wide and
 * missing/duplicate section attribution remains visible. Filename membership reuses receipts-index.mjs RECEIPT_FILE.
 * A later receipt entry withdraws a claim only by naming the original file, its exact rendered claim and a nonempty
 * reason (Reason: or because); fields may occupy separate blocks in that same entry. Same-file entry order or a
 * strictly later cross-file entry date establishes "later". A withdrawal quotation is not new live evidence. This is
 * a pinned receipt convention, not an arbitrary natural-language retraction classifier. Undated cross-file entries
 * and new withdrawal paraphrases are outside the judged convention; receipts-shape separately requires dated entries.
 * No product display path is added. Test diagnostics do not enter the registered tool/UI surface.
 *
 * Frozen literals (rule 16), each written out in full: EXPECTED_SHAPE (journey:label:kind:pins), EXPECTED_PINS (the ten
 * pin pairs), EXPECTED_EVIDENCE (every row's evidence identity, U3) and EXPECTED_JUDGED_ROWS (the rows AC2 judges,
 * U4). AC2 asserts that the pins it judged are its row's EXPECTED_PINS entries, and its each-liveness case pins one
 * run-mode AC2 case per judged row, each reaching its last assertion.
 *
 * External anchor (wb-h8f.12, the 6ze.39 class; rule 16: "CT5's expected kill runs through an anchor OUTSIDE the
 * census's own literals - the docs/spec table, the src registry, or a count from the source of truth"). The literals
 * above anchor the table only to itself: the wb-h8f.9 gate's coordinated all-literal hollow (the journey-4
 * validate-reply pin dropped from ROWS and from every literal that carries it, REAL_PINS length 10 -> 9) survived
 * 0 failed | 77 passed. AC5 therefore reads docs/14 "Acceptance journey evidence", which lists every evidence leg - one
 * row per pinned case, per receipt and per open bead, each with its label - and requires its table to equal the
 * table's legs one by one, in table order, so a leg dropped here and from every literal together reads red through a
 * surface outside this file, and hollowing both takes a visible docs/14 edit. Disclosed: deleting the AC5 case itself
 * is census-code hollowing (the 6ze.38 class), which no literal or anchor here catches.
 *
 * Docs: all three sections are judged whole through the helper's rendered view (docsSection / sectionMatches),
 * HTML-free: docs/11 must render as exactly one five-item list, docs/14's truth-label section as exactly its two
 * paragraphs (the label paragraph and the Forge-interface paragraph), and docs/14's journey evidence section as exactly
 * its intro paragraph and one table of the census's legs, each under its unique level-2 heading of the level-1 parent,
 * bounded at the next level-1/2 heading or EOF. The evidence table's legs are judged cell by cell on the section's OWN
 * table, read through the helper's sectionTables on the same binding as the rendered view (wb-h8f.15, the G7 same-view
 * class: the rendered view joins a table's cells, so a re-split leg renders the same, and a whole-document grid let a
 * copy of the table in another section stand in for it). Drift falsifiers run over SYNTHETIC documents, never the live
 * text, so an unrelated docs edit cannot redden a falsifier row, and a neighbouring section stays free to change.
 *
 * Judging cost (F10; the wb-6hb.9 R546 form): each judge() call re-reads and re-validates the whole report, so the leg
 * judges every table pin in ONE memoized judge() call (verdictsOf, keyed by file, title and tier) that every AC2 row
 * reads, and the liveness falsifiers' mutated pins together in one more. Every judging case carries the file-local
 * budget JUDGE_BUDGET_MS (sized at its comment), and a case pins exactly which cases run under it.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does
 * not follow; the receipts and the OPEN beads' real status (no bead store is read here - the two OPEN rows record
 * their store status at the cut in the delivery note, and a seat that lands one flips the row consciously, the
 * pin-flip pattern); the owner receipt's landing gate cmd_a4feb7db5cad is carried as the owner-worded literal (in-repo
 * it appears only in the .beads export, which this leg never reads); a strikethrough of a docs/11 bullet reds by
 * section exactness only, as the rendered text keeps struck words; no journey is run.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { RECEIPT_FILE } from "../qa/workbench/receipts-index.mjs";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sectionTables, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-acceptance-journeys.census.ts";
const DOCS_11 = "docs/workbench/11-designer-and-operator.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const RECEIPTS_DIR = "docs/workbench/receipts";
const TRACEABILITY_PARENT = "Workbench requirement traceability and release evidence";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_11_PARENT = `11 ${EM_DASH} Pi designer, operator tools and closed-loop experimentation`;
const DOCS_14_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const JOURNEYS_HEADING = "Acceptance journeys";
const TRUTH_HEADING = "Truth labels and release gates";
/** docs/14's journey evidence section (wb-h8f.12): the anchor outside this file's own literals. */
const EVIDENCE_HEADING = "Acceptance journey evidence";
/** A file the default config excludes: never in the default report. */
const EXCLUDED_FILE = "test/workbench-native-rf-preview.test.ts";

/** The docs/14 closed label set, plus the explicit "not started" row the bead allows. */
const LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass", "not started"] as const;
type Label = (typeof LABELS)[number];

interface Pin {
  readonly file: string;
  readonly title: string;
}

/** An OWNER RECEIPT (owner ruling 2026-10-16T01:16Z): a committed receipt file with no forge-run cmd_ of its own. */
interface OwnerReceipt {
  readonly kind: "owner-receipt";
  /** The committed receipt file. */
  readonly file: string;
  /** The contract and revision the file itself must carry (producer-side fields). */
  readonly contract: string;
  readonly revision: string;
  /** The owner's landing gate of record, carried as the owner-worded literal. */
  readonly landingGate: string;
  /** The rendered text of the TRACEABILITY level-2 heading whose section must cite the file at the revision. */
  readonly heading: string;
  /** The owner-worded citation the row carries. */
  readonly citation: string;
}

type Evidence =
  | { readonly kind: "cases"; readonly pins: readonly Pin[] }
  | { readonly kind: "receipt"; readonly commandId: string }
  | OwnerReceipt
  | { readonly kind: "artifact"; readonly file: string; readonly heading: string }
  | { readonly kind: "open"; readonly bead: string };

interface JourneyRow {
  readonly journey: number;
  readonly label: Label;
  readonly evidence: Evidence;
}

/** docs/11 "Acceptance journeys", verbatim and in document order (journey n is index n-1). */
const JOURNEY_QUOTES: readonly string[] = [
  "Pi reads saved script, opens inspector, executes it with Claude SDK; no Pi-owned subagent used for script agent().",
  "Pi inspects a MechanicalWorkflows ordinary function and its descriptor without executing it.",
  "Pi attaches to externally created Furnace Run, explains last-known state and observation freshness.",
  "Pi generates a source diff improving redundant task, validates it, executes reproducible comparison and cites native results.",
  "An observer-only Pi instance cannot stop the Run, even with a guessed action name.",
];

/** The docs/14 paragraph that carries the closed label set, verbatim: pinned exactly, never by substring. */
const TRUTH_TEXT =
  'Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.';
/** The section's second paragraph, verbatim: docs/14's section is pinned whole (U2), so a weakening anywhere in it reads red. */
const FORGE_TEXT = "Use Forge build/test/gates as primary interface; run local relevant Node tests through Forge-configured paths. Never introduce GitHub CI. Pin dependencies, lockfile and package exports.";
/** The header row of docs/14's journey evidence table (wb-h8f.12). */
const EVIDENCE_HEADER: readonly string[] = ["Journey", "Label", "Evidence"];
/** The paragraph that opens docs/14's journey evidence section, verbatim: the section is pinned whole. */
const EVIDENCE_INTRO =
  'Evidence of record for the five docs/workbench/11 acceptance journeys, one row per evidence leg. Each row carries one label from "Truth labels and release gates", or not started for a journey with no evidence yet: a fixture pass row names one pinned case by file and verbatim title, a live SDK pass row names its receipt, and an open row names its tracking bead. test/workbench-acceptance-journeys.census.ts judges this table against its own evidence rows in both directions, so a leg dropped from either side reads red.';

const OPERATOR_RECEIPT_FILE = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";
/** The rendered text of the TRACEABILITY level-2 heading over the wb-h7r v2 operator receipt's section. */
const OPERATOR_RECEIPT_HEADING = "CORRECTION (wb-h7r): the wb-a2g.3 operator receipt, contract v2";
/**
 * The owner-worded citation journey 1's operator row carries (owner ruling 2026-10-16T01:16Z, bound "as specified" at
 * 12:52Z), written out in full: the committed path, the revision, the landing gate, the statement that it is an OWNER
 * RECEIPT with no forge-run cmd_, and the alias-vs-native fact verbatim.
 */
const OPERATOR_CITATION =
  "committed path qa/workbench/receipts/wb-a2g.3-operator-receipt.json, revision e07474a, landing gate cmd_a4feb7db5cad; there is NO forge-run cmd_ for the receipt itself: it is an OWNER RECEIPT under contract workbench.operator-journey/v2; requested claude-opus-5-5, served openai.gpt-6.1-sol";

const fixture = (...pins: readonly Pin[]): Evidence => ({ kind: "cases", pins });
const receipt = (commandId: string): Evidence => ({ kind: "receipt", commandId });
const ownerReceipt = (fields: Omit<OwnerReceipt, "kind">): Evidence => ({ kind: "owner-receipt", ...fields });
const artifact = (file: string, heading: string): Evidence => ({ kind: "artifact", file, heading });
const open = (bead: string): Evidence => ({ kind: "open", bead });
const row = (journey: number, label: Label, evidence: Evidence): JourneyRow => ({ journey, label, evidence });

/** Freezes the table and everything it holds, so no row, evidence or pin can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

/**
 * One row per evidence leg. wb-a2g.3 is CLOSED (2026-10-15T21:22Z), so journey 1 no longer carries it as an OPEN row:
 * its operator leg is "live SDK pass" on the committed wb-h7r v2 operator receipt as an OWNER RECEIPT - the reading
 * the owner RULED on 2026-10-16T01:16Z (bound "as specified" at 12:52Z) - with the owner-worded citation. wb-752.3 is
 * CLOSED too (landed 2026-10-17, merge 24c8be2): journey 3 no longer carries it as an OPEN row. The vc4
 * receipt-builder falsifier is a third "fixture pass" pin; the rule-13 receipt wb-8kv (landing 173) records
 * a realised/pass live run cmd_7cea2921543b, so the external-Furnace leg now has its own "live SDK pass" row.
 */
const ROWS: readonly JourneyRow[] = freezeDeep<readonly JourneyRow[]>([
  row(1, "fixture pass", fixture({ file: "test/workbench-host-contract.test.ts", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported" })),
  row(1, "live SDK pass", receipt("cmd_2a275dcbd6c6")),
  row(
    1,
    "live SDK pass",
    ownerReceipt({
      file: OPERATOR_RECEIPT_FILE,
      contract: "workbench.operator-journey/v2",
      revision: "e07474a",
      landingGate: "cmd_a4feb7db5cad",
      heading: OPERATOR_RECEIPT_HEADING,
      citation: OPERATOR_CITATION,
    }),
  ),
  row(2, "not started", open("wb-04s")),
  row(
    3,
    "fixture pass",
    fixture(
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
      { file: "test/workbench-furnace-observer.test.ts", title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" },
      { file: "test/workbench-furnace-vc4-receipt.test.ts", title: "C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label" },
    ),
  ),
  row(3, "live SDK pass", receipt("cmd_7cea2921543b")),
  row(
    4,
    "fixture pass",
    fixture(
      { file: "test/workbench-patch-proposal.test.ts", title: "validates the candidate bytes exactly as the designer does and mirrors its status" },
      { file: "test/workbench-validate-reply.test.ts", title: "never executes or writes the candidate source" },
      { file: "test/workbench-designer.test.ts", title: "matched cohort yields measured deltas for every shared metric and states association, not causation" },
    ),
  ),
  row(4, "code present", open("wb-h8f.2")),
  row(
    5,
    "fixture pass",
    fixture(
      { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" },
      { file: "test/workbench-control.test.ts", title: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)" },
      { file: "test/workbench-native-details.test.ts", title: "preserves selected node on resize and closes without invoking any runtime controls" },
    ),
  ),
]);

/** The frozen row/pin shape (rule 16, owner standing order 2026-10-18T18:14:19Z): journey:label:kind:pin-count, derived from the table at the cut's base. */
const EXPECTED_SHAPE: readonly string[] = [
  "1:fixture pass:cases:1",
  "1:live SDK pass:receipt:0",
  "1:live SDK pass:owner-receipt:0",
  "2:not started:open:0",
  "3:fixture pass:cases:3",
  "3:live SDK pass:receipt:0",
  "4:fixture pass:cases:3",
  "4:code present:open:0",
  "5:fixture pass:cases:3",
];
const shapeOf = (rows: readonly JourneyRow[]): string[] => rows.map(r => `${r.journey}:${r.label}:${r.evidence.kind}:${r.evidence.kind === "cases" ? r.evidence.pins.length : 0}`);

/** O2 row-set pin: the exact ten (journey, file, title) pairs, in table order; deleting any pin row (the J5 security row included) reads red. */
const EXPECTED_PINS: readonly string[] = [
  "1|test/workbench-host-contract.test.ts|L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
  "3|test/workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "3|test/workbench-furnace-observer.test.ts|reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
  "3|test/workbench-furnace-vc4-receipt.test.ts|C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label",
  "4|test/workbench-patch-proposal.test.ts|validates the candidate bytes exactly as the designer does and mirrors its status",
  "4|test/workbench-validate-reply.test.ts|never executes or writes the candidate source",
  "4|test/workbench-designer.test.ts|matched cohort yields measured deltas for every shared metric and states association, not causation",
  "5|test/workbench-control.test.ts|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
  "5|test/workbench-control.test.ts|rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)",
  "5|test/workbench-native-details.test.ts|preserves selected node on resize and closes without invoking any runtime controls",
];
const pinKeys = (rows: readonly JourneyRow[]): string[] => rows.flatMap(r => (r.evidence.kind === "cases" ? r.evidence.pins.map(p => `${r.journey}|${p.file}|${p.title}`) : []));

/**
 * The frozen evidence identity of EVERY row (rule 16 CT3 over the non-case rows, U3), written out in full and never
 * derived from the constants the table reads: a case row by its pin count (EXPECTED_PINS pins the pairs), the receipt row
 * by its command id, the owner-receipt row by file, contract, revision, landing gate, TRACEABILITY heading and citation,
 * an open row by its bead. Swapping the receipt id for any other recorded id, or the owner receipt for any other cited
 * file or heading, reads red here.
 */
const EXPECTED_EVIDENCE: readonly string[] = [
  "1|cases|1",
  "1|receipt|cmd_2a275dcbd6c6",
  "1|owner-receipt|qa/workbench/receipts/wb-a2g.3-operator-receipt.json|workbench.operator-journey/v2|e07474a|cmd_a4feb7db5cad|CORRECTION (wb-h7r): the wb-a2g.3 operator receipt, contract v2|committed path qa/workbench/receipts/wb-a2g.3-operator-receipt.json, revision e07474a, landing gate cmd_a4feb7db5cad; there is NO forge-run cmd_ for the receipt itself: it is an OWNER RECEIPT under contract workbench.operator-journey/v2; requested claude-opus-5-5, served openai.gpt-6.1-sol",
  "2|open|wb-04s",
  "3|cases|3",
  "3|receipt|cmd_7cea2921543b",
  "4|cases|3",
  "4|open|wb-h8f.2",
  "5|cases|3",
];
function evidenceKey(r: JourneyRow): string {
  const ev = r.evidence;
  if (ev.kind === "cases") return `${r.journey}|cases|${ev.pins.length}`;
  if (ev.kind === "receipt") return `${r.journey}|receipt|${ev.commandId}`;
  if (ev.kind === "owner-receipt") return `${r.journey}|owner-receipt|${ev.file}|${ev.contract}|${ev.revision}|${ev.landingGate}|${ev.heading}|${ev.citation}`;
  if (ev.kind === "artifact") return `${r.journey}|artifact|${ev.file}|${ev.heading}`;
  return `${r.journey}|open|${ev.bead}`;
}

/** The frozen judged-row shape (rule 16, U4): journey:pin-count of every row AC2 judges, in table order. */
const EXPECTED_JUDGED_ROWS: readonly string[] = ["1:1", "3:3", "4:3", "5:3"];
const judgedShapeOf = (rows: readonly JourneyRow[]): string[] => rows.map(r => `${r.journey}:${r.evidence.kind === "cases" ? r.evidence.pins.length : 0}`);

interface Reader {
  readonly exists: (relative: string) => boolean;
  readonly read: (relative: string) => string;
  readonly list: (directory: string) => readonly string[];
}
const REPO_READER: Reader = {
  exists: relative => existsSync(join(ROOT, relative)),
  read: relative => readFileSync(join(ROOT, relative), "utf8"),
  list: directory => readdirSync(join(ROOT, directory)).filter(name => RECEIPT_FILE.test(name)).sort(),
};

const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const BEAD_ID = /^wb-[a-z0-9]+(?:\.[0-9]+)?$/;

/** The labels a row's evidence kind is allowed to carry. */
function allowedLabels(evidence: Evidence): readonly Label[] {
  if (evidence.kind === "cases") return ["fixture pass", "adversarial pass"];
  if (evidence.kind === "receipt" || evidence.kind === "owner-receipt") return ["live SDK pass"];
  if (evidence.kind === "artifact") return ["code present"];
  return ["code present", "not started"];
}

const describeRow = (r: JourneyRow, quotes: readonly string[]): string => `journey ${r.journey} ("${quotes[r.journey - 1] ?? "?"}") [${r.label}]`;

/** The historical file and the per-bead rule-13 receipts route form one evidence corpus. */
function evidenceSources(reader: Reader): readonly { readonly file: string; readonly text: string }[] {
  return [TRACEABILITY, ...reader.list(RECEIPTS_DIR).filter(name => RECEIPT_FILE.test(name)).map(name => `${RECEIPTS_DIR}/${name}`)].map(file => ({ file, text: reader.read(file) }));
}

/** Visible citation text: comments, fenced code, images, definitions and link destinations carry no evidence. */
function citationText(tokens: readonly Token[]): string {
  return tokens.map(token => {
    if (["html", "code", "image", "def", "space", "hr"].includes(token.type)) return "";
    if (token.type === "br") return " ";
    if (token.type === "list") return token.items.map((item: Tokens.ListItem) => citationText(item.tokens)).join(" ");
    if ("tokens" in token && Array.isArray(token.tokens)) return citationText(token.tokens);
    return "text" in token && typeof token.text === "string" ? token.text : "";
  }).join("");
}
const visible = (tokens: readonly Token[]): string => citationText(tokens).replace(/\s+/g, " ").trim();
interface Citation {
  readonly file: string;
  readonly text: string;
  readonly entry: number;
  readonly date: string;
}
/** Separate visible blocks stay separate: nested lists/quotes are traversed, fenced examples never become claims. */
function citationBlocks(tokens: readonly Token[]): string[] {
  return tokens.flatMap(token => {
    if (token.type === "list") return token.items.flatMap((item: Tokens.ListItem) => citationBlocks(item.tokens));
    if (token.type === "blockquote") return citationBlocks(token.tokens ?? []);
    return token.type === "paragraph" || token.type === "text" ? [visible([token])].filter(Boolean) : [];
  });
}
function sourceCitations(file: string, text: string): Citation[] {
  let entry = 0;
  let date = "";
  return marked.lexer(text).flatMap(token => {
    if (token.type === "heading" && token.depth === 2) {
      entry += 1;
      date = /^(\d{4}-\d{2}-\d{2})(?: |$)/.exec(visible(token.tokens ?? []))?.[1] ?? "";
    }
    return citationBlocks([token]).map(text => ({ file, text, entry, date }));
  });
}
/** R658: withdrawal fields may be separate blocks, but must belong to the same receipt entry. */
function withdrawalEntries(citations: readonly Citation[]): readonly Citation[] {
  const entries = new Map<string, Citation>();
  for (const citation of citations) {
    const key = JSON.stringify([citation.file, citation.entry]);
    const previous = entries.get(key);
    entries.set(key, previous === undefined ? citation : { ...citation, text: `${previous.text} ${citation.text}` });
  }
  return [...entries.values()];
}
function withdraws(correction: Citation, claim: Citation): boolean {
  return RECEIPT_FILE.test(basename(correction.file)) &&
    (correction.file === claim.file ? correction.entry > claim.entry : correction.date !== "" && (claim.date === "" || correction.date > claim.date)) &&
    /\b(?:SUPERSEDED|withdrawn)\b/i.test(correction.text) &&
    correction.text.includes(claim.file) && correction.text.includes(claim.text) &&
    /\b(?:reason|because)\s*:?\s+\S/i.test(correction.text);
}
/** A withdrawal entry's quotation is not new live evidence either. */
function withdrawn(claim: Citation, citations: readonly Citation[]): boolean {
  return withdrawalEntries(citations).some(correction =>
    withdraws(correction, claim) ||
    (correction.file === claim.file && correction.entry === claim.entry && citations.some(original => withdraws(correction, original))),
  );
}
/** A command id must be a whole visible token in a nonwithdrawn citation. */
function receiptProblem(reader: Reader, commandId: string): string | undefined {
  const citations = evidenceSources(reader).flatMap(source => sourceCitations(source.file, source.text));
  const mentions = citations.filter(block => new RegExp(`\\b${commandId}\\b`).test(block.text));
  if (mentions.length === 0) return `receipt ${commandId} is not recorded in TRACEABILITY or ${RECEIPTS_DIR}`;
  if (mentions.every(block => /^\s*SUPERSEDED\b/.test(block.text) || withdrawn(block, citations))) return `receipt ${commandId} survives only inside a SUPERSEDED TRACEABILITY or receipts paragraph`;
  return undefined;
}

/** One heading across the whole corpus, with specific missing/duplicate attribution preserved. */
function citedSectionProblem(reader: Reader, heading: string, file: string, revision?: string): string | undefined {
  const level2 = heading.replace(/^## /, "");
  const sources = evidenceSources(reader);
  const matches: Array<{ readonly source: { readonly file: string; readonly text: string }; readonly root: string }> = [];
  let count = 0;
  const countHeadings = (tokens: readonly Token[]): void => {
    for (const token of tokens) {
      if (token.type === "heading" && token.depth === 2 && visible(token.tokens ?? []) === level2) count += 1;
      if (token.type === "list") for (const item of token.items) countHeadings(item.tokens);
      else if ("tokens" in token && Array.isArray(token.tokens)) countHeadings(token.tokens);
    }
  };
  for (const source of sources) {
    const tokens = marked.lexer(source.text);
    const before = count;
    countHeadings(tokens);
    const root = tokens.find(token => token.type === "heading" && token.depth === 1);
    if (count > before && root?.type === "heading") matches.push({ source, root: visible(root.tokens ?? []) });
  }
  if (count !== 1) return `TRACEABILITY or receipts section "${level2}" is refused: ${count === 0 ? "the rendered view has no level-2 heading" : `the heading occurs ${count} times in the rendered evidence corpus`}`;
  const match = matches[0];
  if (match === undefined) return `TRACEABILITY or receipts section "${level2}" is refused: lost its level-1 parent`;
  const section = docsSection(match.source.text, level2, 2, [match.root]);
  if (!section.ok) return `TRACEABILITY or receipts section "${level2}" is refused: ${section.why}`;
  // Use the same token-view section bounds, keeping nested block citations separate.
  const tokens = marked.lexer(match.source.text);
  const start = tokens.findIndex(token => token.type === "heading" && token.depth === 2 && visible(token.tokens ?? []) === level2);
  const end = tokens.findIndex((token, index) => index > start && token.type === "heading" && token.depth <= 2);
  const texts = citationBlocks(tokens.slice(start + 1, end === -1 ? undefined : end));
  const citations = sources.flatMap(source => sourceCitations(source.file, source.text));
  if (texts.some(text => !/^SUPERSEDED\b/.test(text) && text.includes(file) && (revision === undefined || citesRevision(text, revision)) &&
    citations.some(claim => claim.file === match.source.file && claim.text === text && !withdrawn(claim, citations)))) return undefined;
  return `TRACEABILITY or receipts section "${heading}" cites ${file}${revision === undefined ? "" : ` at revision ${revision}`} in no live paragraph`;
}

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => value !== null && typeof value === "object" && !Array.isArray(value);

/** The producer-side fields of an owner receipt file, or undefined when the file is not a JSON object. */
function receiptFields(text: string): Readonly<Record<string, unknown>> | undefined {
  try {
    const value: unknown = JSON.parse(text);
    return isRecord(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** The alias-vs-native fact as the receipt's own preflight records it: "requested <alias>, served <native models>". */
function aliasFact(fields: Readonly<Record<string, unknown>>): string | undefined {
  const preflight = fields.preflight;
  if (!isRecord(preflight)) return undefined;
  const requested = preflight.requestedModel;
  const served = preflight.nativeModels;
  if (typeof requested !== "string" || !Array.isArray(served) || served.length === 0 || !served.every(model => typeof model === "string")) return undefined;
  return `requested ${requested}, served ${served.join(", ")}`;
}

/** True when the revision occurs in the text as a whole alphanumeric token (never inside a longer hash). */
const citesRevision = (text: string, revision: string): boolean => text.split(/[^0-9A-Za-z]+/).includes(revision);

/** Why an owner receipt does not evidence a live pass; [] when the file, a section in either route and the row's citation all hold. */
function ownerReceiptProblems(ev: OwnerReceipt, reader: Reader): string[] {
  const out: string[] = [];
  if (!COMMAND_ID.test(ev.landingGate)) out.push(`owner receipt landing gate ${ev.landingGate} is not a command id`);
  const parts = [`committed path ${ev.file}`, `revision ${ev.revision}`, `landing gate ${ev.landingGate}`, "NO forge-run cmd_", `OWNER RECEIPT under contract ${ev.contract}`];
  if (!reader.exists(ev.file)) out.push(`owner receipt ${ev.file} is missing`);
  else {
    const fields = receiptFields(reader.read(ev.file));
    if (fields === undefined) out.push(`owner receipt ${ev.file} is not a JSON object`);
    else {
      if (fields.contract !== ev.contract) out.push(`owner receipt ${ev.file} carries contract ${JSON.stringify(fields.contract)}; the row cites ${ev.contract}`);
      if (fields.revision !== ev.revision) out.push(`owner receipt ${ev.file} carries revision ${JSON.stringify(fields.revision)}; the row cites ${ev.revision}`);
      if (fields.realised !== true || fields.pass !== true) out.push(`owner receipt ${ev.file} does not record a realised pass (realised ${JSON.stringify(fields.realised)}, pass ${JSON.stringify(fields.pass)})`);
      const fact = aliasFact(fields);
      if (fact === undefined) out.push(`owner receipt ${ev.file} records no requested and served model (preflight.requestedModel, preflight.nativeModels)`);
      else parts.push(fact);
    }
  }
  const citationProblem = citedSectionProblem(reader, ev.heading, ev.file, ev.revision);
  if (citationProblem !== undefined) {
    out.push(citationProblem);
    // Retain the earlier generic diagnostic alongside the more specific refusal attribution.
    const generic = `TRACEABILITY or receipts section "${ev.heading}" cites ${ev.file} at revision ${ev.revision} in no live paragraph`;
    if (citationProblem !== generic) out.push(generic);
  }
  const missing = parts.filter(part => !ev.citation.includes(part));
  if (missing.length > 0) out.push(`the row does not carry the owner-worded citation (missing ${missing.map(part => JSON.stringify(part)).join(", ")})`);
  return out;
}

/** Every non-case failure names the journey number and its quoted sentence plus the label; a case row's pins are judged by judge(), not here. */
function auditRows(rows: readonly JourneyRow[], quotes: readonly string[], reader: Reader): readonly string[] {
  const failures: string[] = [];
  for (const r of rows) {
    const who = describeRow(r, quotes);
    if (!(LABELS as readonly string[]).includes(r.label)) failures.push(`${who}: label is outside the docs/14 closed set`);
    if (!allowedLabels(r.evidence).includes(r.label)) failures.push(`${who}: label does not match its ${r.evidence.kind} evidence`);
    const ev = r.evidence;
    if (ev.kind === "cases") {
      if (ev.pins.length === 0) failures.push(`${who}: fixture row has no pinned case`);
    } else if (ev.kind === "receipt") {
      if (!COMMAND_ID.test(ev.commandId)) failures.push(`${who}: ${ev.commandId} is not a command id`);
      else {
        const problem = receiptProblem(reader, ev.commandId);
        if (problem !== undefined) failures.push(`${who}: ${problem}`);
      }
    } else if (ev.kind === "owner-receipt") {
      for (const problem of ownerReceiptProblems(ev, reader)) failures.push(`${who}: ${problem}`);
    } else if (ev.kind === "artifact") {
      if (!reader.exists(ev.file)) failures.push(`${who}: artifact ${ev.file} is missing`);
      const problem = citedSectionProblem(reader, ev.heading, ev.file);
      if (problem !== undefined) {
        failures.push(`${who}: artifact ${ev.file} is not cited under section "${ev.heading}" in TRACEABILITY or receipts`);
        failures.push(`${who}: ${problem}`);
      }
    } else if (!BEAD_ID.test(ev.bead)) {
      failures.push(`${who}: open row names no tracking bead (${ev.bead})`);
    }
  }
  return failures;
}

/** Every quoted journey must own at least one evidence row. */
function auditCoverage(rows: readonly JourneyRow[], quotes: readonly string[]): readonly string[] {
  const failures: string[] = [];
  for (let n = 1; n <= quotes.length; n += 1) {
    if (!rows.some(r => r.journey === n)) failures.push(`journey ${n} ("${quotes[n - 1] ?? "?"}"): no evidence row`);
  }
  return failures;
}

/** The one list block docs/11's section must render as: the five quoted sentences, in order. */
const JOURNEY_BLOCKS: readonly RenderedBlock[] = [{ kind: "list", ordered: false, items: JOURNEY_QUOTES.map(quote => ({ text: quote, markdown: quote })) }];

/** Every docs/11 drift, each naming the journey or the section it breaks. */
function docs11Failures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, JOURNEYS_HEADING, 2, [DOCS_11_PARENT]);
  if (!section.ok) return [`${DOCS_11} § ${JOURNEYS_HEADING}: the section is refused: ${section.why}`];
  JOURNEY_QUOTES.forEach((quote, index) => {
    if (!section.blocks.some(block => block.kind === "list" && block.items.some(item => item.text === quote))) out.push(`journey ${index + 1} ("${quote}"): sentence drifted in docs/11`);
  });
  const exact = sectionMatches(section, JOURNEY_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_11} § ${JOURNEYS_HEADING} is not exactly its five frozen journey bullets: ${exact.why}`);
  return out;
}

/** The two paragraphs docs/14's section must render as, in order (U2: the whole section, never its first block alone). */
const TRUTH_BLOCKS: readonly RenderedBlock[] = [
  { kind: "paragraph", text: TRUTH_TEXT, markdown: TRUTH_TEXT },
  { kind: "paragraph", text: FORGE_TEXT, markdown: FORGE_TEXT },
];

/** Every docs/14 drift: the unique section must render as exactly its two frozen paragraphs, HTML-free (the docs/11 adoption form). */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, TRUTH_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${DOCS_14} § ${TRUTH_HEADING}: the section is refused: ${section.why}`];
  const exact = sectionMatches(section, TRUTH_BLOCKS);
  if (!exact.ok) return [`${DOCS_14} § ${TRUTH_HEADING} is not exactly its truth-label paragraph and its Forge-interface paragraph: ${exact.why}`];
  return [];
}

/** One evidence leg as docs/14 lists it (wb-h8f.12): a case row gives one leg per pin, any other row one leg. */
interface Leg {
  readonly row: JourneyRow;
  /** The docs/14 table cells: journey, label, evidence. */
  readonly cells: readonly string[];
}

/** The docs/14 Evidence cell of a row that pins no case. */
function legEvidence(ev: Exclude<Evidence, { readonly kind: "cases" }>): string {
  if (ev.kind === "receipt") return `forge-run receipt ${ev.commandId}`;
  if (ev.kind === "owner-receipt") return `owner receipt ${ev.file} at revision ${ev.revision}`;
  if (ev.kind === "artifact") return `artifact ${ev.file}`;
  return `open bead ${ev.bead}`;
}

/** Every evidence leg of a table, in table order: what docs/14's journey evidence table must list. */
function legsOf(rows: readonly JourneyRow[]): Leg[] {
  return rows.flatMap(r => {
    const ev = r.evidence;
    const leg = (evidence: string): Leg => ({ row: r, cells: [String(r.journey), r.label, evidence] });
    return ev.kind === "cases" ? ev.pins.map(pin => leg(`${pin.file}: "${pin.title}"`)) : [leg(legEvidence(ev))];
  });
}

/** The blocks docs/14's journey evidence section must render as: its intro paragraph, then one table of the legs. */
const evidenceBlocks = (legs: readonly Leg[]): readonly RenderedBlock[] => [
  { kind: "paragraph", text: EVIDENCE_INTRO, markdown: EVIDENCE_INTRO },
  { kind: "other", type: "table", text: [EVIDENCE_HEADER, ...legs.map(leg => leg.cells)].map(cells => cells.join(" ")).join(" ") },
];

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/**
 * The cell grid of every table in the WHOLE document under the evidence header: the uniqueness rule (docs/14 must hold
 * exactly one, E8). The legs themselves are judged on the section's own table (sectionTables, wb-h8f.15), never on this
 * grid, which a copy of the table in another section can stand in for.
 */
function evidenceGrids(markdown: string): string[][][] {
  return marked
    .lexer(markdown)
    .filter(isTable)
    .map(token => [token.header.map(cell => cell.text), ...token.rows.map(cells => cells.map(cell => cell.text))])
    .filter(grid => grid[0]?.join("|") === EVIDENCE_HEADER.join("|"));
}

/** A leg's journey, its quoted sentence and its label, from its journey and label cells. */
const describeLeg = (cells: readonly string[]): string => `journey ${cells[0] ?? "?"} ("${JOURNEY_QUOTES[Number(cells[0]) - 1] ?? "?"}") [${cells[1] ?? "?"}]`;

/**
 * Every drift between docs/14's journey evidence table and a census table (wb-h8f.12), each naming the leg: the section
 * must render as exactly its intro and one table of the table's legs, and that table's rows must equal the legs one by
 * one, in table order. A leg dropped from the census table - and so from every literal edited to match - therefore
 * reads red against the docs table, through a surface outside this file (rule 16 CT5/CT6, the 6ze.39 class).
 */
function evidenceFailures(markdown: string, rows: readonly JourneyRow[]): string[] {
  const where = `${DOCS_14} § ${EVIDENCE_HEADING}`;
  const section = docsSection(markdown, EVIDENCE_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${where}: the section is refused: ${section.why}`];
  const legs = legsOf(rows);
  const out: string[] = [];
  const exact = sectionMatches(section, evidenceBlocks(legs));
  if (!exact.ok) out.push(`${where} is not exactly its intro paragraph and one table of the census's evidence legs: ${exact.why}`);
  const grids = evidenceGrids(markdown);
  if (grids.length !== 1) return [...out, `${DOCS_14}: the journey evidence table must occur exactly once; found ${grids.length}`];
  // wb-h8f.15 (G7): the legs are judged on the section's OWN table, read through the same binding as the rendered view
  // above, never on the whole-document grid: a bolded header plus a re-split leg here, with the original table copied to
  // another section, renders the same and leaves the copy as the only evidence-header table in the document.
  const own = sectionTables(markdown, EVIDENCE_HEADING, 2, [DOCS_14_PARENT]).grids;
  if (own.length !== 1) return [...out, `${where}: the section must hold exactly one table, the journey evidence table; it holds ${own.length}`];
  const [header = [], ...listed] = own[0] ?? [];
  if (header.join("|") !== EVIDENCE_HEADER.join("|")) out.push(`${where}: the section's own table has the header ${JSON.stringify(header)}; the census pins ${JSON.stringify(EVIDENCE_HEADER)}`);
  const key = (cells: readonly string[]): string => cells.join(" | ");
  const listedKeys = listed.map(key);
  const censusKeys = legs.map(leg => key(leg.cells));
  for (const leg of legs) if (!listedKeys.includes(key(leg.cells))) out.push(`${describeLeg(leg.cells)}: the census leg ${leg.cells[2] ?? ""} is not listed in ${where}`);
  for (const cells of listed) if (!censusKeys.includes(key(cells))) out.push(`${describeLeg(cells)}: ${where} lists the leg ${cells[2] ?? ""}, which the census table does not carry`);
  const sameSet = censusKeys.every(entry => listedKeys.includes(entry)) && listedKeys.every(entry => censusKeys.includes(entry));
  if (sameSet && listedKeys.join("\n") !== censusKeys.join("\n")) out.push(`${where} lists the census's legs out of table order or more than once`);
  return out;
}

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/**
 * The explicit budget of every judging case in this file (F10; the R546 sizing recipe), file-local so no other census
 * file's budget moves: 5 x the measured p99 of the costliest judging case (U4 memo's one table judgment), rounded up to
 * a whole 5 s. Measured 2026-10-20 on the shared fleet host with other lanes live, 32 runs of this file (78 cases each,
 * 0 failed): over the 9-file pins report, 8 sequential (load1 252-284) peaked at 2864 ms and 8 at 4-way (load1 273-319)
 * at 4940 ms; over a full default-tier report (320 files, 12551 tests: this bead's g9-gate-s1 run-1 report, re-rooted),
 * 8 sequential (load1 329-463) peaked at 5202 ms and 8 at 4-way (load1 440-453) at 4382 ms. The table judgment passed
 * vitest's default 5000 ms in 1 of the 32 runs. 5 x 5202 ms = 26010 ms, rounded up to 30000 ms.
 */
const JUDGE_BUDGET_MS = 30_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The title the AC2 it.each registers for a judged journey (vitest renders a number $journey bare). */
const AC2_CASE = (journey: number): string => `AC2 journey ${journey}: every pinned case is collected once, passed and asserting in the default gate's own report`;
/**
 * The cases that carry JUDGING, by title head, in declaration order. The head is the title before its first colon, or
 * before " on '" for the per-pin falsifiers, whose rendered $file vitest single-quotes and truncates past 40 characters.
 */
const EXPECTED_BUDGETED: readonly string[] = [
  "U4 memo",
  "AC2 journey 1",
  "AC2 journey 3",
  "AC2 journey 4",
  "AC2 journey 5",
  "journey 1 per-pin mutants",
  "journey 3 per-pin mutants",
  "journey 3 per-pin mutants",
  "journey 3 per-pin mutants",
  "journey 4 per-pin mutants",
  "journey 4 per-pin mutants",
  "journey 4 per-pin mutants",
  "journey 5 per-pin mutants",
  "journey 5 per-pin mutants",
  "journey 5 per-pin mutants",
  "M1",
  "M2",
];
const titleHead = (name: string): string => name.split(/:| on '/)[0] ?? name;
/** The judged journeys whose AC2 case reached its last assertion this run (each-liveness, U4). */
const completed = new Set<number>();

/** The case rows, flattened to [row, pin] pairs for the per-pin judging. */
const REAL_PINS: readonly { readonly row: JourneyRow; readonly pin: Pin }[] = ROWS.flatMap(r => (r.evidence.kind === "cases" ? r.evidence.pins.map(pin => ({ row: r, pin })) : []));
const CASE_ROWS = ROWS.filter(r => r.evidence.kind === "cases");

/** A pin's identity for the memo: its verdict depends on the file, the title and the tier. */
const memoKey = (pin: CasePin): string => JSON.stringify([pin.file, pin.title, pin.tier]);
/** F10 memo (the wb-6hb.9 R546 form): every verdict verdictsOf judged this run, by pin identity, so no pin is judged twice per run. */
const verdictMemo = new Map<string, PinVerdict>();
/** The judge() calls verdictsOf made this run: U4 memo pins that the table is judged once and a re-read judges nothing. */
let memoJudgeCalls = 0;

/** Every pin's verdict in pin order; the pins this run has not judged yet are judged together, in ONE judge() call. */
function verdictsOf(pins: readonly CasePin[]): readonly PinVerdict[] {
  const fresh = [...new Map(pins.filter(pin => !verdictMemo.has(memoKey(pin))).map(pin => [memoKey(pin), pin] as const)).values()];
  if (fresh.length > 0) {
    memoJudgeCalls += 1;
    const judged = judge(REPORT, fresh);
    fresh.forEach((pin, index) => {
      const verdict = judged[index];
      if (verdict !== undefined) verdictMemo.set(memoKey(pin), verdict);
    });
  }
  return pins.flatMap(pin => {
    const verdict = verdictMemo.get(memoKey(pin));
    return verdict === undefined ? [] : [verdict];
  });
}

/** Every table pin as the judge sees it, in table order. */
const TABLE_PINS: readonly CasePin[] = REAL_PINS.map(({ pin }) => casePin(pin));
/** A case row's verdicts from the memo; the first read judges the whole table in one call. */
function judgeRow(pins: readonly Pin[]): readonly PinVerdict[] {
  verdictsOf(TABLE_PINS);
  return verdictsOf(pins.map(entry => casePin(entry)));
}

/** The three pin-side mutants of a real pin: its title renamed, its title borrowed into another pinned file, its tier relabelled. */
function pinMutants(pin: Pin): { readonly renamed: CasePin; readonly borrowed: CasePin; readonly mislabelled: CasePin } {
  const other = REAL_PINS.find(candidate => candidate.pin.file !== pin.file);
  return {
    renamed: casePin({ ...pin, title: `${pin.title} (renamed)` }),
    borrowed: casePin({ file: other?.pin.file ?? "", title: pin.title }),
    mislabelled: { ...casePin(pin), tier: "bench-receipt" },
  };
}
/** The M1 and M2 pins: no title in the first pinned file, and a file the default config excludes. */
const UNTITLED_PIN = casePin({ file: REAL_PINS[0]?.pin.file ?? "", title: "" });
const EXCLUDED_PIN = casePin({ file: EXCLUDED_FILE, title: "any title" });
/** Every liveness falsifier's mutated pin, judged together in one memoized call on first use. */
const LIVENESS_PINS: readonly CasePin[] = [...REAL_PINS.flatMap(({ pin }) => Object.values(pinMutants(pin))), UNTITLED_PIN, EXCLUDED_PIN];
function judgeLiveness(pins: readonly CasePin[]): readonly PinVerdict[] {
  verdictsOf(LIVENESS_PINS);
  return verdictsOf(pins);
}

/** One line per pin that is not ok, naming the journey, its sentence and label; the helper's why names the file, title, tier and cause. */
const failures = (r: JourneyRow, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `${describeRow(r, JOURNEY_QUOTES)}: ${verdict.code}: ${verdict.why}`);

/** The synthetic docs/11 the drift falsifiers run over: the frozen bullets under the real heading shape, never the live text. */
const synthetic11 = (bullets: readonly string[] = JOURNEY_QUOTES, tail = ""): string =>
  `# ${DOCS_11_PARENT}\n\n## Workflow designer cycle\n\nRows.\n\n## ${JOURNEYS_HEADING}\n\n${bullets.map(item => `- ${item}`).join("\n")}\n${tail}\n## Experimental read-only source tools\n\nText.\n`;
/** The synthetic docs/14 under the real heading shape: the label paragraph, the real second paragraph, then an optional tail inside the section. */
const synthetic14 = (truth: string = TRUTH_TEXT, tail = "", second: string = FORGE_TEXT): string =>
  `# ${DOCS_14_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n## ${TRUTH_HEADING}\n\n${truth}\n\n${second}\n${tail}`;

/** The synthetic docs/14 the evidence falsifiers run over: a decoy table under another header, then the evidence section (intro, a table of the given rows, an optional tail inside the section). */
const syntheticEvidence = (rows: readonly (readonly string[])[] = legsOf(ROWS).map(leg => leg.cells), tail = "", intro: string = EVIDENCE_INTRO): string =>
  `# ${DOCS_14_PARENT}\n\n## Matrix by subsystem\n\n| Subsystem | Positive proof | Negative control |\n| --- | --- | --- |\n| A | b | c |\n\n## ${EVIDENCE_HEADING}\n\n${intro}\n\n${[EVIDENCE_HEADER, EVIDENCE_HEADER.map(() => "---"), ...rows].map(cells => `| ${cells.join(" | ")} |`).join("\n")}\n${tail}`;

const synthTraceability = (...blocks: readonly string[]): string => `# ${TRACEABILITY_PARENT}\n\n${blocks.join("\n\n")}\n`;
const readerOf = (files: Readonly<Record<string, string>>): Reader => ({
  exists: relative => relative in files,
  read: relative => files[relative] ?? "",
  list: directory => Object.keys(files).filter(file => file.startsWith(`${directory}/`) && !file.slice(directory.length + 1).includes("/")).map(file => basename(file)).sort(),
});

describe("wb-h8f.9 docs/workbench/11 acceptance-journeys census (report mode)", () => {
  it("AC1: the table holds the nine frozen rows in order (journey:label:kind:pins), deeply frozen, covering all five journeys", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(isDeepFrozen(JOURNEY_QUOTES)).toBe(false);
    expect(JOURNEY_QUOTES).toHaveLength(5);
    expect(shapeOf(ROWS)).toEqual(EXPECTED_SHAPE);
    expect(ROWS).toHaveLength(9);
    expect([...new Set(ROWS.map(r => r.journey))].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(auditCoverage(ROWS, JOURNEY_QUOTES)).toEqual([]);
  });

  it("AC1: the ten (journey, file, title) pin pairs are exactly the frozen list, in order (the J5 security pins included)", () => {
    expect(pinKeys(ROWS)).toEqual(EXPECTED_PINS);
    expect(REAL_PINS).toHaveLength(10);
  });

  it("AC1: every row's evidence identity is exactly the frozen list: the receipt id, the owner receipt's file, contract, revision, landing gate, heading and citation, the open beads (rule 16 CT3, U3)", () => {
    expect(ROWS.map(evidenceKey)).toEqual(EXPECTED_EVIDENCE);
  });

  it("AC1: the rows AC2 judges are exactly the frozen judged set, every pin included (rule 16, U4)", () => {
    expect(judgedShapeOf(CASE_ROWS)).toEqual(EXPECTED_JUDGED_ROWS);
    expect(pinKeys(CASE_ROWS)).toEqual(EXPECTED_PINS);
  });

  it("AC1: docs/11 renders exactly its five frozen journey bullets and docs/14 carries the truth-label paragraph exactly", () => {
    expect(docs11Failures(REPO_READER.read(DOCS_11))).toEqual([]);
    expect(docs14Failures(REPO_READER.read(DOCS_14))).toEqual([]);
    const section = docsSection(REPO_READER.read(DOCS_11), JOURNEYS_HEADING, 2, [DOCS_11_PARENT]);
    expect(sectionMatches(section, JOURNEY_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
  });

  it("U4 memo: one judge() call judges every table pin, at most once per run; its verdict keys are exactly EXPECTED_PINS and a re-read judges nothing", JUDGING, () => {
    const pins = REAL_PINS.map(({ pin }) => casePin(pin));
    const before = memoJudgeCalls;
    const verdicts = verdictsOf(pins);
    expect(verdicts).toHaveLength(EXPECTED_PINS.length);
    expect(REAL_PINS.map(({ row: r }, index) => `${r.journey}|${verdicts[index]?.pin.file}|${verdicts[index]?.pin.title}`)).toEqual(EXPECTED_PINS);
    expect(memoJudgeCalls - before, "the whole table takes one judge() call, or none once judged").toBeLessThanOrEqual(1);
    const judged = memoJudgeCalls;
    expect(verdictsOf(pins)).toEqual(verdicts);
    expect(memoJudgeCalls - judged, "a second read of the table judges nothing").toBe(0);
  });

  it.each(CASE_ROWS.map(r => ({ r, journey: r.journey })))("AC2 journey $journey: every pinned case is collected once, passed and asserting in the default gate's own report", JUDGING, ({ r }) => {
    const pins = r.evidence.kind === "cases" ? r.evidence.pins : [];
    expect(pins.length, `journey ${r.journey}: an AC2 case judges a pinned row, never an unpinned one vacuously (U4)`).toBeGreaterThan(0);
    const verdicts = judgeRow(pins);
    expect(verdicts).toHaveLength(pins.length);
    expect(failures(r, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(pins.map(() => "ok"));
    expect(
      verdicts.map(verdict => `${r.journey}|${verdict.pin.file}|${verdict.pin.title}`),
      `journey ${r.journey}: the cases this AC2 case judged are exactly its frozen EXPECTED_PINS entries (rule 16, U4)`,
    ).toEqual(EXPECTED_PINS.filter(key => key.startsWith(`${r.journey}|`)));
    completed.add(r.journey);
  });

  it("AC2 each-liveness (rule 16, U4): the it.each registers one run-mode AC2 case per frozen judged row, in order and on the judging budget, and every one reached its last assertion", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.name.startsWith("AC2 journey ")) registered.push(`${child.name}|${child.mode}|${child.timeout}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const journeys = EXPECTED_JUDGED_ROWS.map(entry => Number(entry.slice(0, entry.indexOf(":"))));
    expect(registered).toEqual(journeys.map(journey => `${AC2_CASE(journey)}|run|${JUDGE_BUDGET_MS}`));
    expect([...completed], "the AC2 cases that reached their last assertion this run").toEqual(journeys);
  });

  it("U4 budget: exactly the judging cases carry the file-local budget, and it is above vitest's default 5000 ms", ({ task }) => {
    const budgeted: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.timeout === JUDGE_BUDGET_MS) budgeted.push(titleHead(child.name));
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(budgeted, "the cases that run under JUDGE_BUDGET_MS, by title head").toEqual(EXPECTED_BUDGETED);
  });

  it("AC3: every row carries one honest label for its evidence kind: receipts and artifacts resolve in TRACEABILITY or the rule-13 receipts route, open rows name a bead", () => {
    expect(auditRows(ROWS, JOURNEY_QUOTES, REPO_READER)).toEqual([]);
  });

  it("AC3: every 'live SDK pass' row is receipt-backed in a live TRACEABILITY or rule-13 receipts paragraph, or the owner receipt the 2026-10-16T01:16Z ruling admits", () => {
    const live = ROWS.filter(r => r.label === "live SDK pass");
    expect(live.map(r => `${r.journey}:${r.evidence.kind}`)).toEqual(["1:receipt", "1:owner-receipt", "3:receipt"]);
    for (const r of live) {
      if (r.evidence.kind === "receipt") expect(receiptProblem(REPO_READER, r.evidence.commandId), describeRow(r, JOURNEY_QUOTES)).toBeUndefined();
      else if (r.evidence.kind === "owner-receipt") expect(ownerReceiptProblems(r.evidence, REPO_READER), describeRow(r, JOURNEY_QUOTES)).toEqual([]);
    }
    for (const r of ROWS.filter(x => x.evidence.kind === "receipt" || x.evidence.kind === "owner-receipt")) expect(r.label).toBe("live SDK pass");
  });

  it("AC3: the operator leg of journey 1 is 'live SDK pass' on the wb-h7r v2 OWNER RECEIPT (owner ruling 2026-10-16T01:16Z) with the owner-worded citation, and no row is left on a bare artifact", () => {
    const owner = ROWS.filter(r => r.evidence.kind === "owner-receipt");
    expect(owner.map(r => [r.journey, r.label])).toEqual([[1, "live SDK pass"]]);
    const [only] = owner;
    expect(only?.evidence.kind === "owner-receipt" ? only.evidence.citation : "").toBe(
      "committed path qa/workbench/receipts/wb-a2g.3-operator-receipt.json, revision e07474a, landing gate cmd_a4feb7db5cad; there is NO forge-run cmd_ for the receipt itself: it is an OWNER RECEIPT under contract workbench.operator-journey/v2; requested claude-opus-5-5, served openai.gpt-6.1-sol",
    );
    expect(ROWS.filter(r => r.evidence.kind === "artifact")).toEqual([]);
  });

  it("AC3: open rows name their tracking bead and never carry a pass label", () => {
    const openRows = ROWS.filter(r => r.evidence.kind === "open");
    expect(openRows.map(r => (r.evidence.kind === "open" ? r.evidence.bead : ""))).toEqual(["wb-04s", "wb-h8f.2"]);
    for (const r of openRows) expect(["code present", "not started"]).toContain(r.label);
  });

  it("QYS1 MB2: the live receipt listing preserves every dotted filename and shares the renderer's filter", () => {
    const names = REPO_READER.list(RECEIPTS_DIR);
    expect(names).toEqual(readdirSync(join(ROOT, RECEIPTS_DIR)).filter(name => RECEIPT_FILE.test(name)).sort());
    expect(names).toContain("wb-zsv.8.md");
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    expect(own.imports.filter(entry => entry.module === "../qa/workbench/receipts-index.mjs").flatMap(entry => entry.names)).toContain("RECEIPT_FILE");
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = REAL_PINS.map(({ pin }) => basename(pin.file, ".ts"));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(REPO_READER.read("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });

  it("AC5 (wb-h8f.12): docs/14 'Acceptance journey evidence' lists exactly the table's evidence legs in table order - one row per pinned case, receipt and open bead - the anchor outside this file's own literals (rule 16 CT5/CT6)", () => {
    expect(evidenceFailures(REPO_READER.read(DOCS_14), ROWS)).toEqual([]);
  });
});

describe("wb-h8f.9 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  it.each(REAL_PINS.map(({ row: r, pin }) => ({ journey: r.journey, file: pin.file, title: pin.title, r, pin })))(
    "journey $journey per-pin mutants on $file: a renamed title, a borrowed file and a relabelled tier are each red naming the journey, the file and the title",
    JUDGING,
    ({ r, pin }) => {
      const { renamed, borrowed, mislabelled } = pinMutants(pin);
      const [gone] = judgeLiveness([renamed]);
      expect(gone?.code).toBe("absent");
      const [renamedLine] = failures(r, judgeLiveness([renamed]));
      expect(renamedLine).toContain(`journey ${r.journey}`);
      expect(renamedLine).toContain(JOURNEY_QUOTES[r.journey - 1] ?? "?");
      expect(renamedLine).toContain(renamed.file);
      expect(renamedLine).toContain(renamed.title);
      expect(borrowed.file).not.toBe("");
      expect(borrowed.file).not.toBe(pin.file);
      const [borrowedVerdict] = judgeLiveness([borrowed]);
      expect(borrowedVerdict?.ok).toBe(false);
      const [mislabelledVerdict] = judgeLiveness([mislabelled]);
      expect(mislabelledVerdict?.code).toBe("tier-mismatch");
    },
  );

  it("M1: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    expect(REAL_PINS[0]).toBeDefined();
    expect(UNTITLED_PIN.title).toBe("");
    const [verdict] = judgeLiveness([UNTITLED_PIN]);
    expect(verdict?.ok).toBe(false);
  });

  it("M2: a file the default config excludes is never in the default report: a pin there is red, not collected", JUDGING, () => {
    const [verdict] = judgeLiveness([EXCLUDED_PIN]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M3: a pinned title that two rows share is judged once per row, so the J5 control file keeps both of its pins live", () => {
    const control = REAL_PINS.filter(({ pin }) => pin.file === "test/workbench-control.test.ts");
    expect(control.map(({ row: r }) => r.journey)).toEqual([5, 5]);
    expect(new Set(control.map(({ pin }) => pin.title)).size).toBe(2);
  });

  it("M4: deleting a row, a pin or a pin-row from the frozen table changes the frozen shape or the pin-pair list", () => {
    expect(shapeOf(ROWS.filter(r => r.journey !== 5))).not.toEqual(EXPECTED_SHAPE);
    const noSecurity = ROWS.filter(r => !(r.journey === 5 && r.evidence.kind === "cases"));
    expect(shapeOf(noSecurity)).not.toEqual(EXPECTED_SHAPE);
    expect(pinKeys(noSecurity)).not.toEqual(EXPECTED_PINS);
    const shorter = ROWS.map(r => (r.journey === 4 && r.evidence.kind === "cases" ? row(4, r.label, fixture(...r.evidence.pins.slice(1))) : r));
    expect(shapeOf(shorter)).not.toEqual(EXPECTED_SHAPE);
    expect(pinKeys(shorter)).not.toEqual(EXPECTED_PINS);
    const swapped = ROWS.map(r => (r.journey === 5 && r.evidence.kind === "cases" ? row(5, r.label, fixture(...r.evidence.pins.map(pin => ({ ...pin, title: "a passing case that pins nothing here" })))) : r));
    expect(pinKeys(swapped)).not.toEqual(EXPECTED_PINS);
  });
});

describe("wb-h8f.9 receipt, artifact, label and coverage falsifiers (synthetic TRACEABILITY, rendered docs)", () => {
  const goodRows = (): readonly JourneyRow[] => [row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa")), row(2, "code present", artifact("qa/x.json", "## Section")), row(3, "not started", open("wb-1"))];
  const goodTrace = synthTraceability("Live receipt cmd_aaaaaaaaaaaa here.", "## Section\n\nSee qa/x.json\n\nBody.");
  const goodFiles = { [TRACEABILITY]: goodTrace, "qa/x.json": "{}" };

  it("baseline: a healthy table audits clean (no false positive)", () => {
    expect(auditRows(goodRows(), JOURNEY_QUOTES, readerOf(goodFiles))).toEqual([]);
  });

  it("R617 receipt-only: a journey's sole live evidence in the rule-13 receipts route earns a live SDK pass", () => {
    const files = {
      [TRACEABILITY]: synthTraceability("Historical row with no run of record."),
      "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record: forge cmd_7cea2921543b (status success, exit 0).\n- Verdict: `realised: true`, `pass: true`.\n",
    };
    const rows = [row(3, "live SDK pass", receipt("cmd_7cea2921543b"))];
    expect(auditRows(rows, JOURNEY_QUOTES, readerOf(files))).toEqual([]);
  });

  it("R617 owner-receipt: a committed owner receipt cited only by a per-bead receipt file is admitted", () => {
    const files = ownerFiles({ [TRACEABILITY]: synthTraceability("No owner receipt here."), "docs/workbench/receipts/wb-operator.md": `# wb-operator: operator receipt\n\n## 2026-10-20 Owner receipt\n\n${LIVE_CITE}\n` });
    const ev = ownerReceipt({ file: OWNER_FILE, contract: "c/v2", revision: "abc1234", landingGate: "cmd_cccccccccccc", heading: "2026-10-20 Owner receipt", citation: OWNER_CITATION });
    expect(ownerAudit(files, ev)).toEqual([]);
  });

  it("R617 artifact: a committed artifact cited under a per-bead receipt heading is admitted", () => {
    const files = { [TRACEABILITY]: synthTraceability("Historical row."), "qa/x.json": "{}", "docs/workbench/receipts/wb-operator.md": "# wb-operator: operator receipt\n\n## 2026-10-20 Section\n\nSee qa/x.json.\n" };
    expect(auditRows([row(2, "code present", artifact("qa/x.json", "## 2026-10-20 Section"))], JOURNEY_QUOTES, readerOf(files))).toEqual([]);
  });

  it("R617 hidden citation: a command id only in a receipt HTML comment or code fence earns no pass", () => {
    const receiptFile = "docs/workbench/receipts/wb-8kv.md";
    const preamble = "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n";
    const rows = [row(3, "live SDK pass", receipt("cmd_7cea2921543b"))];
    for (const hidden of ["<!-- cmd_7cea2921543b -->", "```\ncmd_7cea2921543b\n```", "- <!-- cmd_7cea2921543b -->"]) {
      const files = { [TRACEABILITY]: synthTraceability("No live run."), [receiptFile]: `${preamble}${hidden}\n` };
      expect(auditRows(rows, JOURNEY_QUOTES, readerOf(files))[0], hidden).toContain("is not recorded");
    }
  });

  it("R617 withdrawal: a per-bead receipt whose only citation is SUPERSEDED cannot earn a pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("Historical row."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\nSUPERSEDED cmd_7cea2921543b was withdrawn.\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0]).toContain("SUPERSEDED");
  });

  it("fabricated-receipt mutant: a command id absent from TRACEABILITY fails the live row naming the journey", () => {
    const lines = auditRows([row(1, "live SDK pass", receipt("cmd_bbbbbbbbbbbb"))], JOURNEY_QUOTES, readerOf(goodFiles));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("journey 1");
    expect(lines[0]).toContain("is not recorded in TRACEABILITY or docs/workbench/receipts");
  });

  it("malformed-receipt mutant: an id that is not a command id fails", () => {
    expect(auditRows([row(1, "live SDK pass", receipt("cmd_short"))], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("is not a command id");
  });

  it("superseded-receipt mutant: a command id that survives only in a SUPERSEDED paragraph fails the live row", () => {
    const files = { ...goodFiles, [TRACEABILITY]: synthTraceability("SUPERSEDED cmd_aaaaaaaaaaaa was withdrawn.") };
    expect(auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], JOURNEY_QUOTES, readerOf(files))[0]).toContain("SUPERSEDED");
  });

  it("artifact mutant: a missing receipt file, an uncited file or a lost TRACEABILITY section fails the operator row", () => {
    const op = [row(1, "code present", artifact("qa/x.json", "## Section"))];
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ [TRACEABILITY]: goodTrace }))[0]).toContain("is missing");
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("See qa/x.json only.") })).some(line => line.includes("is not cited under section"))).toBe(true);
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("## Section", "Nothing cites the file.") })).some(line => line.includes("is not cited under section"))).toBe(true);
  });

  it("unbacked-live mutant: 'live SDK pass' on an open row or a case row fails the label check", () => {
    expect(auditRows([row(1, "live SDK pass", open("wb-1"))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its open evidence"))).toBe(true);
    expect(auditRows([row(1, "live SDK pass", fixture({ file: "a", title: "b" }))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its cases evidence"))).toBe(true);
  });

  it("pass-label-on-open mutant: an open row carrying 'fixture pass' fails", () => {
    expect(auditRows([row(1, "fixture pass", open("wb-1"))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its open evidence"))).toBe(true);
  });

  it("unknown-label mutant: a label outside the docs/14 closed set fails", () => {
    const bogus = { journey: 1, label: "very green", evidence: open("wb-1") } as unknown as JourneyRow;
    expect(auditRows([bogus], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("outside the docs/14 closed set"))).toBe(true);
  });

  it("bead mutant: an open row without a bead id fails", () => {
    expect(auditRows([row(1, "not started", open("soon"))], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("names no tracking bead");
  });

  it("empty-fixture mutant: a fixture row with no pinned case fails", () => {
    expect(auditRows([row(1, "fixture pass", fixture())], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("fixture row has no pinned case");
  });

  it("coverage mutant: a journey with no row fails naming its sentence", () => {
    const lines = auditCoverage(ROWS.filter(r => r.journey !== 2), JOURNEY_QUOTES);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("journey 2");
    expect(lines[0]).toContain(JOURNEY_QUOTES[1] ?? "?");
  });

  const OWNER_FILE = "qa/r.json";
  const OWNER_CITATION = "committed path qa/r.json, revision abc1234, landing gate cmd_cccccccccccc; there is NO forge-run cmd_ for the receipt itself: it is an OWNER RECEIPT under contract c/v2; requested model-a, served model-b";
  const goodOwner = (citation: string = OWNER_CITATION, landingGate = "cmd_cccccccccccc"): Evidence =>
    ownerReceipt({ file: OWNER_FILE, contract: "c/v2", revision: "abc1234", landingGate, heading: "Owner receipt", citation });
  const ownerJson = (fields: Readonly<Record<string, unknown>> = {}): string =>
    JSON.stringify({ contract: "c/v2", revision: "abc1234", realised: true, pass: true, preflight: { requestedModel: "model-a", nativeModels: ["model-b"] }, ...fields });
  const ownerTrace = (...body: readonly string[]): string => synthTraceability("## Earlier", "Text.", "## Owner receipt", ...body, "## Later", "Text.");
  const LIVE_CITE = "Re-run of record at revision `abc1234`, committed at `qa/r.json`.";
  const ownerFiles = (over: Readonly<Record<string, string>> = {}): Readonly<Record<string, string>> => ({ [TRACEABILITY]: ownerTrace(LIVE_CITE), [OWNER_FILE]: ownerJson(), ...over });
  const ownerAudit = (files: Readonly<Record<string, string>>, evidence: Evidence = goodOwner(), label: Label = "live SDK pass"): readonly string[] =>
    auditRows([row(1, label, evidence)], JOURNEY_QUOTES, readerOf(files));

  it("owner-receipt baseline: a healthy owner receipt audits clean as 'live SDK pass' (no false positive)", () => {
    expect(ownerAudit(ownerFiles())).toEqual([]);
  });

  it("owner-receipt mutant: a missing receipt file fails the live row naming the journey", () => {
    const lines = ownerAudit({ [TRACEABILITY]: ownerTrace(LIVE_CITE) });
    expect(lines.some(line => line.startsWith("journey 1") && line.includes("owner receipt qa/r.json is missing"))).toBe(true);
  });

  it("owner-receipt mutant: a receipt file that is not a JSON object fails", () => {
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: "[1, 2]" })).some(line => line.includes("is not a JSON object"))).toBe(true);
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: "{ not json" })).some(line => line.includes("is not a JSON object"))).toBe(true);
  });

  it("owner-receipt mutant: a receipt file carrying another contract fails", () => {
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: ownerJson({ contract: "c/v1" }) })).some(line => line.includes('carries contract "c/v1"; the row cites c/v2'))).toBe(true);
  });

  it("owner-receipt mutant: a receipt file at another revision fails", () => {
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: ownerJson({ revision: "def5678" }) })).some(line => line.includes('carries revision "def5678"; the row cites abc1234'))).toBe(true);
  });

  it("owner-receipt mutant: a receipt that does not record a realised pass fails", () => {
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: ownerJson({ pass: false }) })).some(line => line.includes("does not record a realised pass"))).toBe(true);
    expect(ownerAudit(ownerFiles({ [OWNER_FILE]: ownerJson({ realised: false }) })).some(line => line.includes("does not record a realised pass"))).toBe(true);
  });

  it("owner-receipt mutant: TRACEABILITY lost the receipt's section heading, or carries it twice", () => {
    const lost = ownerAudit(ownerFiles({ [TRACEABILITY]: synthTraceability("## Earlier", LIVE_CITE) }));
    expect(lost.some(line => line.includes('TRACEABILITY or receipts section "Owner receipt" cites qa/r.json at revision abc1234 in no live paragraph'))).toBe(true);
    const twice = ownerAudit(ownerFiles({ [TRACEABILITY]: `${ownerTrace(LIVE_CITE)}\n## Owner receipt\n\nAgain.\n` }));
    expect(twice.some(line => line.includes('TRACEABILITY or receipts section "Owner receipt" cites qa/r.json at revision abc1234 in no live paragraph'))).toBe(true);
  });

  it("owner-receipt mutant: the section lost its live citation of the file at the revision (absent, another revision, or only SUPERSEDED)", () => {
    const cites = (body: string): readonly string[] => ownerAudit(ownerFiles({ [TRACEABILITY]: ownerTrace(body) }));
    const lostCitation = 'TRACEABILITY or receipts section "Owner receipt" cites qa/r.json at revision abc1234 in no live paragraph';
    expect(cites("Re-run of record at revision `abc1234`.").some(line => line.includes(lostCitation))).toBe(true);
    expect(cites("Re-run of record at revision `fff0000`, committed at `qa/r.json`.").some(line => line.includes(lostCitation))).toBe(true);
    expect(cites(`SUPERSEDED (wb-x): ${LIVE_CITE}`).some(line => line.includes(lostCitation))).toBe(true);
    expect(cites(`<!-- ${LIVE_CITE} -->`).some(line => line.includes(lostCitation))).toBe(true);
    const elsewhere = ownerAudit(ownerFiles({ [TRACEABILITY]: synthTraceability("## Earlier", LIVE_CITE, "## Owner receipt", "Nothing cited here.") }));
    expect(elsewhere.some(line => line.includes(lostCitation))).toBe(true);
  });

  it.each([
    { part: "committed path qa/r.json" },
    { part: "revision abc1234" },
    { part: "landing gate cmd_cccccccccccc" },
    { part: "NO forge-run cmd_" },
    { part: "OWNER RECEIPT under contract c/v2" },
    { part: "requested model-a, served model-b" },
  ])("owner-receipt mutant: a row citation missing '$part' fails naming the missing part", ({ part }) => {
    expect(OWNER_CITATION).toContain(part);
    const lines = ownerAudit(ownerFiles(), goodOwner(OWNER_CITATION.replace(part, "")));
    expect(lines.some(line => line.includes("does not carry the owner-worded citation") && line.includes(JSON.stringify(part)))).toBe(true);
  });

  it("owner-receipt mutant: an alias-vs-native fact that disagrees with the receipt's own preflight fails", () => {
    const files = ownerFiles({ [OWNER_FILE]: ownerJson({ preflight: { requestedModel: "model-a", nativeModels: ["model-z"] } }) });
    expect(ownerAudit(files).some(line => line.includes('"requested model-a, served model-z"'))).toBe(true);
    const silent = ownerFiles({ [OWNER_FILE]: ownerJson({ preflight: {} }) });
    expect(ownerAudit(silent).some(line => line.includes("records no requested and served model"))).toBe(true);
  });

  it("owner-receipt mutant: a landing gate that is not a command id fails", () => {
    const citation = OWNER_CITATION.replace("cmd_cccccccccccc", "cmd_short");
    expect(ownerAudit(ownerFiles(), goodOwner(citation, "cmd_short")).some(line => line.includes("landing gate cmd_short is not a command id"))).toBe(true);
  });


  it("QYS1 S1 artifact cited in a receipt LIST ITEM under its heading is admitted (header: cited by a section in either evidence route)", () => {
    const files = { [TRACEABILITY]: synthTraceability("Historical row."), "qa/x.json": "{}", "docs/workbench/receipts/wb-operator.md": "# wb-operator: operator receipt\n\n## 2026-10-20 Section\n\n- See qa/x.json.\n" };
    expect(auditRows([row(2, "code present", artifact("qa/x.json", "## 2026-10-20 Section"))], JOURNEY_QUOTES, readerOf(files))).toEqual([]);
  });

  it("QYS1 S2 owner receipt cited in a receipt LIST ITEM under its heading is admitted", () => {
    const files = ownerFiles({ [TRACEABILITY]: synthTraceability("No owner receipt here."), "docs/workbench/receipts/wb-operator.md": `# wb-operator: operator receipt\n\n## 2026-10-20 Owner receipt\n\n- ${LIVE_CITE}\n` });
    const ev = ownerReceipt({ file: OWNER_FILE, contract: "c/v2", revision: "abc1234", landingGate: "cmd_cccccccccccc", heading: "2026-10-20 Owner receipt", citation: OWNER_CITATION });
    expect(ownerAudit(files, ev)).toEqual([]);
  });

  it("QYS1 S3 a command id only inside an INLINE HTML comment of a receipt paragraph earns no pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\nRun of record <!-- cmd_7cea2921543b --> here.\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  it("QYS1 S4 a command id only inside an inline HTML comment of a receipt LIST ITEM (not at its start) earns no pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record: forge <!-- cmd_7cea2921543b --> (status success).\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  it("QYS1 S5 a command id only inside a code fence NESTED in a receipt list item earns no pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record:\n\n  ```\n  forge cmd_7cea2921543b\n  ```\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  it("QYS1 S6 a command id only inside an HTML comment block NESTED in a receipt list item earns no pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record:\n\n  <!-- forge cmd_7cea2921543b -->\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  it("QYS1 S7 a command id only as a link destination (the rendered text omits it) earns no pass", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record: [forge run](https://example.invalid/cmd_7cea2921543b) (status success).\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  // R658 (2): withdrawal names the original file, its claim verbatim and a reason in a later entry.
  it("QYS1 S8 append-only withdrawal names the original file and exact claim with a reason", () => {
    const claim = "Run of record: forge cmd_7cea2921543b (status success, exit 0).";
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": `# wb-8kv: VC-4 live receipt

## 2026-10-20 receipt

- ${claim}

## 2026-10-21 correction

SUPERSEDED: original file docs/workbench/receipts/wb-8kv.md; claim: ${claim} Reason: it was not a live pass.
` };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("SUPERSEDED");
  });

  it("QYS1 S9 a duplicated TRACEABILITY owner-receipt heading is reported as a duplicate, not as a missing citation (attribution)", () => {
    const twice = ownerAudit(ownerFiles({ [TRACEABILITY]: `${ownerTrace(LIVE_CITE)}\n## Owner receipt\n\nAgain.\n` }));
    expect(twice.some(line => line.includes("occurs 2 times"))).toBe(true);
  });

  it("QYS1 S10 an owner-receipt heading present in two evidence sources is refused as not exactly once (header: exactly once)", () => {
    const files = ownerFiles({ "docs/workbench/receipts/wb-dup.md": "# wb-dup: duplicate heading\n\n## Owner receipt\n\nNothing cited here.\n" });
    expect(ownerAudit(files).length).toBeGreaterThan(0);
  });

  it("QYS1 S11 a longer token that merely starts with the command id does not count (word boundary)", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record: forge cmd_7cea2921543bff (status success).\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0] ?? "").toContain("is not recorded");
  });

  it("QYS1 C1 control: the same receipt text with the id visible in a list item IS admitted", () => {
    const files = { [TRACEABILITY]: synthTraceability("No live run."), "docs/workbench/receipts/wb-8kv.md": "# wb-8kv: VC-4 live receipt\n\n## 2026-10-20 receipt\n\n- Run of record: forge cmd_7cea2921543b (status success).\n" };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))).toEqual([]);
  });

  it("QYS1 C2 control: an artifact cited in a receipt PARAGRAPH under its heading is admitted", () => {
    const files = { [TRACEABILITY]: synthTraceability("Historical row."), "qa/x.json": "{}", "docs/workbench/receipts/wb-operator.md": "# wb-operator: operator receipt\n\n## 2026-10-20 Section\n\nSee qa/x.json.\n" };
    expect(auditRows([row(2, "code present", artifact("qa/x.json", "## 2026-10-20 Section"))], JOURNEY_QUOTES, readerOf(files))).toEqual([]);
  });


  it("QYS1 F4 lost heading is attributed to the missing rendered section", () => {
    const lost = ownerAudit(ownerFiles({ [TRACEABILITY]: synthTraceability("## Earlier", LIVE_CITE) }));
    expect(lost.some(line => line.includes('section "Owner receipt" is refused') && line.includes("no level-2 heading"))).toBe(true);
  });

  it("QYS1 F2 nested list and blockquote citations resolve for owner receipts and artifacts", () => {
    for (const body of [`- Container\n  - ${LIVE_CITE}`, `> ${LIVE_CITE}`, `- Container\n\n  > ${LIVE_CITE}`]) {
      const files = ownerFiles({ [TRACEABILITY]: synthTraceability("No owner receipt here."), "docs/workbench/receipts/wb-operator.md": `# wb-operator: operator receipt\n\n## 2026-10-20 Owner receipt\n\n${body}\n` });
      const ev = ownerReceipt({ file: OWNER_FILE, contract: "c/v2", revision: "abc1234", landingGate: "cmd_cccccccccccc", heading: "2026-10-20 Owner receipt", citation: OWNER_CITATION });
      expect(ownerAudit(files, ev), body).toEqual([]);
      expect(auditRows([row(2, "code present", artifact(OWNER_FILE, "2026-10-20 Owner receipt"))], JOURNEY_QUOTES, readerOf(files)), body).toEqual([]);
    }
  });

  it("QYS1 F6 dotted receipt filenames are read and non-receipt names never earn a pass", () => {
    const body = "# wb-x: receipt\n\n## 2026-10-20 record\n\nforge cmd_aaaaaaaaaaaa\n";
    for (const name of ["wb-x.1.md", "wb-x.1.2.md"]) {
      const files = { [TRACEABILITY]: synthTraceability("Nothing."), [`${RECEIPTS_DIR}/${name}`]: body };
      expect(auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], JOURNEY_QUOTES, readerOf(files)), name).toEqual([]);
    }
    for (const name of ["INDEX.md", "other.md", "wb-x.md.bak", "wb-x.a.md", "wb-X.md"]) {
      const files = { [TRACEABILITY]: synthTraceability("Nothing."), [`${RECEIPTS_DIR}/${name}`]: body };
      expect(auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], JOURNEY_QUOTES, readerOf(files))[0], name).toContain("is not recorded");
    }
  });

  it("QYS1 R658 a later correction file withdraws only its named original claim, never an unrelated remeasurement", () => {
    const original = `${RECEIPTS_DIR}/wb-8kv.md`;
    const claim = "Run of record: forge cmd_7cea2921543b (status success, exit 0).";
    const base = { [TRACEABILITY]: synthTraceability("Nothing."), [original]: `# wb-8kv: receipt\n\n## 2026-10-20 record\n\n${claim}\n` };
    const correction = (body: string, date = "2026-10-21"): string => `# wb-correction: correction\n\n## ${date} withdrawal\n\n${body}\n`;
    const withdrawnClaim = `Withdrawn: original file ${original}; claim: ${claim} Reason: the reading was not live.`;
    const rows = [row(3, "live SDK pass", receipt("cmd_7cea2921543b"))];
    expect(auditRows(rows, JOURNEY_QUOTES, readerOf({ ...base, [`${RECEIPTS_DIR}/wb-correction.md`]: correction(withdrawnClaim) }))[0]).toContain("SUPERSEDED");
    for (const body of [withdrawnClaim.replace(original, `${RECEIPTS_DIR}/wb-other.md`), withdrawnClaim.replace(claim, "Another claim cmd_7cea2921543b."), withdrawnClaim.replace("Reason: the reading was not live.", ""), `<!-- ${withdrawnClaim} -->`, `\`\`\`\n${withdrawnClaim}\n\`\`\``]) {
      expect(auditRows(rows, JOURNEY_QUOTES, readerOf({ ...base, [`${RECEIPTS_DIR}/wb-correction.md`]: correction(body) })), body).toEqual([]);
    }
    expect(auditRows(rows, JOURNEY_QUOTES, readerOf({ ...base, [`${RECEIPTS_DIR}/wb-correction.md`]: correction(withdrawnClaim, "2026-10-19") }))).toEqual([]);
    const refreshed = { ...base, [`${RECEIPTS_DIR}/wb-correction.md`]: correction(withdrawnClaim), [`${RECEIPTS_DIR}/wb-fresh.md`]: correction("New measurement: forge cmd_7cea2921543b is a live pass.") };
    expect(auditRows(rows, JOURNEY_QUOTES, readerOf(refreshed))).toEqual([]);
  });

  it("QYS1 R658 a withdrawal section may name the file, verbatim claim and reason in separate visible list items", () => {
    const original = `${RECEIPTS_DIR}/wb-8kv.md`;
    const claim = "Run of record: forge cmd_7cea2921543b (status success, exit 0).";
    const files = { [TRACEABILITY]: synthTraceability("Nothing."), [original]: `# wb-8kv: receipt\n\n## 2026-10-20 record\n\n${claim}\n\n## 2026-10-21 withdrawal\n\n- SUPERSEDED: original file ${original}\n- Claim: ${claim}\n- Reason: the reading was not live.\n` };
    expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0]).toContain("SUPERSEDED");
  });

  it("QYS1 R658 owner-receipt and artifact citations are withdrawn by the same later-entry definition", () => {
    const original = `${RECEIPTS_DIR}/wb-operator.md`;
    const files = ownerFiles({ [TRACEABILITY]: synthTraceability("Nothing."), [original]: `# wb-operator: receipt\n\n## 2026-10-20 Owner receipt\n\n- ${LIVE_CITE}\n\n## 2026-10-21 withdrawal\n\nWithdrawn: original file ${original}; claim: ${LIVE_CITE} Reason: the reading was not live.\n` });
    const ev = ownerReceipt({ file: OWNER_FILE, contract: "c/v2", revision: "abc1234", landingGate: "cmd_cccccccccccc", heading: "2026-10-20 Owner receipt", citation: OWNER_CITATION });
    expect(ownerAudit(files, ev).some(line => line.includes("in no live paragraph"))).toBe(true);
    expect(auditRows([row(2, "code present", artifact(OWNER_FILE, "2026-10-20 Owner receipt"))], JOURNEY_QUOTES, readerOf(files)).some(line => line.includes("is not cited"))).toBe(true);
  });

  it("QYS1 heading uniqueness ignores hidden copies and counts nested rendered duplicates", () => {
    for (const hidden of ["<!-- ## Owner receipt -->", "```\n## Owner receipt\n```"]) {
      expect(ownerAudit(ownerFiles({ [`${RECEIPTS_DIR}/wb-copy.md`]: `# wb-copy: hidden copy\n\n## 2026-10-20 entry\n\n${hidden}\n` })), hidden).toEqual([]);
    }
    for (const nested of ["> ## Owner receipt", "- Container\n\n  ## Owner receipt"]) {
      expect(ownerAudit(ownerFiles({ [`${RECEIPTS_DIR}/wb-copy.md`]: `# wb-copy: nested copy\n\n## 2026-10-20 entry\n\n${nested}\n` })).some(line => line.includes("occurs 2 times")), nested).toBe(true);
    }
  });

  it("QYS1 MH a longer prefix or suffix token never earns a receipt pass; visible markdown does", () => {
    for (const id of ["cmd_7cea2921543bff", "xcmd_7cea2921543b", "cmd_7cea2921543b_extra"]) {
      const files = { [TRACEABILITY]: synthTraceability(`forge ${id}`) };
      expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf(files))[0], id).toContain("is not recorded");
    }
    for (const text of ["forge `cmd_7cea2921543b`", "forge **cmd_7cea2921543b**", "forge [cmd_7cea2921543b](https://example.invalid/run)", "forge cmd_7cea<!-- hidden -->2921543b"]) {
      expect(auditRows([row(3, "live SDK pass", receipt("cmd_7cea2921543b"))], JOURNEY_QUOTES, readerOf({ [TRACEABILITY]: synthTraceability(text) })), text).toEqual([]);
    }
  });

  it("owner-receipt label mutant: an owner receipt labelled 'code present' fails the label check", () => {
    expect(ownerAudit(ownerFiles(), goodOwner(), "code present").some(line => line.includes("does not match its owner-receipt evidence"))).toBe(true);
  });

  it("thaw mutant: an unfrozen table or row is detected", () => {
    expect(isDeepFrozen([row(1, "not started", open("wb-1"))])).toBe(false);
    expect(isDeepFrozen(JSON.parse(JSON.stringify(ROWS)))).toBe(false);
  });
});

describe("wb-h8f.9 docs drift names the journey or the section (synthetic documents, rendered view)", () => {
  const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("journey ")).map(line => line.slice(0, line.indexOf(" (")));

  it("accepts docs/11 exactly as written, at EOF and bounded by the following level-2 heading, and docs/14 exactly as written", () => {
    expect(docs11Failures(synthetic11())).toEqual([]);
    expect(docs11Failures(`# ${DOCS_11_PARENT}\n\n## ${JOURNEYS_HEADING}\n\n${JOURNEY_QUOTES.map(item => `- ${item}`).join("\n")}\n`)).toEqual([]);
    expect(docs14Failures(synthetic14())).toEqual([]);
    expect(docs14Failures(`${synthetic14()}\n## Appendix\n\nText.\n`)).toEqual([]);
  });

  it("an edited journey sentence names exactly that journey, plus the section exactness", () => {
    const edited = JOURNEY_QUOTES.map((quote, index) => (index === 2 ? quote.replace("last-known state", "current state") : quote));
    const lines = docs11Failures(synthetic11(edited));
    expect(named(lines)).toEqual(["journey 3"]);
    expect(lines.some(line => line.includes("is not exactly its five frozen journey bullets"))).toBe(true);
  });

  it("D1: a sixth weakening bullet goes red on the section, naming no journey", () => {
    const lines = docs11Failures(synthetic11([...JOURNEY_QUOTES, "Journeys 2-4 are aspirational and are not release gates."]));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its five frozen journey bullets");
  });

  it("D1: two journey bullets swapped go red on the section, naming no journey", () => {
    const reordered = [JOURNEY_QUOTES[1] ?? "", JOURNEY_QUOTES[0] ?? "", ...JOURNEY_QUOTES.slice(2)];
    const lines = docs11Failures(synthetic11(reordered));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("D1: a stray line or a ### subsection appended inside the docs/11 section goes red", () => {
    expect(docs11Failures(synthetic11(JOURNEY_QUOTES, "\nAll of the above are optional.\n")).length).toBeGreaterThan(0);
    expect(docs11Failures(synthetic11(JOURNEY_QUOTES, "\n### Exceptions\n\nA host may skip these.\n")).length).toBeGreaterThan(0);
  });

  it("D1b: the section heading renamed away is refused", () => {
    const lines = docs11Failures(synthetic11().replace(`## ${JOURNEYS_HEADING}`, "## Acceptance notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D3: a journey hidden in an HTML comment names that journey and the section refuses the HTML", () => {
    const hidden = JOURNEY_QUOTES.map((quote, index) => (index === 1 ? `<!-- ${quote} -->` : quote));
    const lines = docs11Failures(synthetic11(hidden));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.startsWith("journey 2"))).toBe(true);
  });

  it("D4: a duplicated heading at EOF is refused (the section needs its heading exactly once)", () => {
    const lines = docs11Failures(`${synthetic11()}\n## ${JOURNEYS_HEADING}\n\n- Journeys are advisory.\n`);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("occurs 2 times");
  });

  it("D5: a level-1 heading inserted above re-homes the section and is refused", () => {
    const lines = docs11Failures(synthetic11().replace(`## ${JOURNEYS_HEADING}`, `# Appendix\n\n## ${JOURNEYS_HEADING}`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D2: a sentence appended to, or substituted in, the docs/14 truth-label paragraph goes red", () => {
    expect(docs14Failures(synthetic14(`${TRUTH_TEXT} These labels are advisory and may be omitted.`))).toHaveLength(1);
    expect(docs14Failures(synthetic14(TRUTH_TEXT.replace('"fixture pass", ', "")))).toHaveLength(1);
    expect(docs14Failures(synthetic14(TRUTH_TEXT.replace("quietly weakened", "weakened")))).toHaveLength(1);
  });

  it("D2: a docs/14 heading renamed away, duplicated or re-homed is refused, and an edit of a neighbouring section stays green", () => {
    expect(docs14Failures(synthetic14().replace(`## ${TRUTH_HEADING}`, "## Labels"))[0]).toContain("the section is refused");
    expect(docs14Failures(`${synthetic14()}\n## ${TRUTH_HEADING}\n\nAgain.\n`)[0]).toContain("occurs 2 times");
    expect(docs14Failures(synthetic14().replace(`## ${TRUTH_HEADING}`, `# Appendix\n\n## ${TRUTH_HEADING}`))[0]).toContain("the section is refused");
    expect(docs14Failures(synthetic14().replace("Rows.", "Rows, changed."))).toEqual([]);
  });

  const exactness = "is not exactly its truth-label paragraph and its Forge-interface paragraph";

  it("U2 GL1: a weakening sentence as its own paragraph right after the truth-label paragraph goes red on the docs/14 section", () => {
    const lines = docs14Failures(synthetic14(`${TRUTH_TEXT}\n\nThese labels are advisory and may be omitted.`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(exactness);
  });

  it("U2 GL2: a weakening paragraph appended as the section's last paragraph goes red", () => {
    const lines = docs14Failures(synthetic14(TRUTH_TEXT, "\nFalsifiers are optional; a package may ship without one.\n"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(exactness);
  });

  it("U2 GL3: an HTML comment paragraph inside the section is refused", () => {
    const lines = docs14Failures(synthetic14(TRUTH_TEXT, "\n<!-- Truth labels are advisory and may be omitted. -->\n"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("carries HTML");
  });

  it("U2 GL4: a ### subsection inside the section goes red", () => {
    const lines = docs14Failures(synthetic14(TRUTH_TEXT, "\n### Exceptions\n\nA work package may skip its falsifier.\n"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(exactness);
  });

  it("U2 GL4b: the section's second paragraph rewritten goes red (the whole section is pinned, not its first block)", () => {
    const lines = docs14Failures(synthetic14(TRUTH_TEXT, "", FORGE_TEXT.replace("Use Forge build/test/gates as primary interface;", "Forge build/test/gates are optional;")));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(exactness);
  });

  it("an edit of any other docs/11 section never reddens a journey: the neighbouring sections are free to change", () => {
    expect(docs11Failures(synthetic11().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});

describe("wb-h8f.12 the docs/14 journey evidence anchor: every drift names the leg (synthetic documents, rendered view)", () => {
  const LEGS = legsOf(ROWS);
  const cellsOf = (rows: readonly JourneyRow[]): string[][] => legsOf(rows).map(leg => [...leg.cells]);
  /** The table with one pin dropped: what the wb-h8f.9 F2 coordinated hollow leaves ROWS as, every literal edited to match. */
  const withoutPin = (dropped: Pin): readonly JourneyRow[] =>
    ROWS.map(r => (r.evidence.kind === "cases" ? row(r.journey, r.label, fixture(...r.evidence.pins.filter(pin => pin !== dropped))) : r));
  const named = (lines: readonly string[], cells: readonly string[], cause: string): boolean => lines.some(line => line.startsWith(describeLeg(cells)) && line.includes(cells[2] ?? "") && line.includes(cause));
  const notCarried = "which the census table does not carry";
  const notListed = "is not listed in";

  it("baseline: the table's own legs audit clean, at EOF and bounded by a following level-2 heading, beside a table under another header", () => {
    expect(LEGS).toHaveLength(REAL_PINS.length + ROWS.filter(r => r.evidence.kind !== "cases").length);
    expect(evidenceFailures(syntheticEvidence(), ROWS)).toEqual([]);
    expect(evidenceFailures(`${syntheticEvidence()}\n## Later\n\nText.\n`, ROWS)).toEqual([]);
  });

  it("E1 (the wb-h8f.9 F2 coordinated hollow): each pin dropped from the table, as every literal edited to match leaves it, reds against the unchanged docs table naming the journey, the file and the title", () => {
    expect(REAL_PINS.length).toBeGreaterThan(0);
    for (const { row: r, pin } of REAL_PINS) {
      const lines = evidenceFailures(syntheticEvidence(), withoutPin(pin));
      expect(named(lines, [String(r.journey), r.label, `${pin.file}: "${pin.title}"`], notCarried), `${pin.file} / ${pin.title}`).toBe(true);
    }
  });

  it("E2: each row that pins no case - the receipt, the owner receipt, each open bead - dropped from the table reds naming its leg", () => {
    const others = ROWS.filter(r => r.evidence.kind !== "cases");
    expect(others.length).toBeGreaterThan(0);
    for (const dropped of others) {
      const [leg] = legsOf([dropped]);
      expect(leg).toBeDefined();
      expect(named(evidenceFailures(syntheticEvidence(), ROWS.filter(r => r !== dropped)), leg?.cells ?? [], notCarried), leg?.cells.join(" | ")).toBe(true);
    }
  });

  it("E3: each leg dropped from the docs table alone reds naming the census leg", () => {
    LEGS.forEach((leg, index) => {
      const docs = syntheticEvidence(cellsOf(ROWS).filter((_cells, at) => at !== index));
      expect(named(evidenceFailures(docs, ROWS), leg.cells, notListed), leg.cells.join(" | ")).toBe(true);
    });
  });

  it("E4: a reworded docs cell - a shortened title, a relabelled leg, a renumbered journey - reds naming the census leg and the docs row", () => {
    const [first] = LEGS;
    expect(first).toBeDefined();
    const cells = first?.cells ?? [];
    const evidence = cells[2] ?? "";
    for (const reworded of [[cells[0] ?? "", cells[1] ?? "", evidence.slice(0, -12)], [cells[0] ?? "", "adversarial pass", evidence], ["2", cells[1] ?? "", evidence]]) {
      const lines = evidenceFailures(syntheticEvidence([reworded, ...cellsOf(ROWS).slice(1)]), ROWS);
      expect(named(lines, cells, notListed), reworded.join(" | ")).toBe(true);
      expect(named(lines, reworded, notCarried), reworded.join(" | ")).toBe(true);
    }
  });

  it("E5: two docs rows swapped, or one listed twice, reds on table order", () => {
    const [a, b, ...rest] = cellsOf(ROWS);
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    const order = "out of table order or more than once";
    expect(evidenceFailures(syntheticEvidence([b ?? [], a ?? [], ...rest]), ROWS).some(line => line.includes(order))).toBe(true);
    expect(evidenceFailures(syntheticEvidence([...cellsOf(ROWS), a ?? []]), ROWS).some(line => line.includes(order))).toBe(true);
  });

  it("E6: the section heading renamed away, duplicated or re-homed under a new level-1 heading is refused", () => {
    const refusedLine = (lines: readonly string[]): string => lines[0] ?? "";
    expect(refusedLine(evidenceFailures(syntheticEvidence().replace(`## ${EVIDENCE_HEADING}`, "## Journey notes"), ROWS))).toContain("the section is refused");
    expect(refusedLine(evidenceFailures(`${syntheticEvidence()}\n## ${EVIDENCE_HEADING}\n\nAgain.\n`, ROWS))).toContain("occurs 2 times");
    expect(refusedLine(evidenceFailures(syntheticEvidence().replace(`## ${EVIDENCE_HEADING}`, `# Appendix\n\n## ${EVIDENCE_HEADING}`), ROWS))).toContain("the section is refused");
  });

  it("E7: a weakening paragraph, an HTML comment or a ### subsection inside the section, or a reworded intro, reds on section exactness", () => {
    const exactness = "is not exactly its intro paragraph and one table of the census's evidence legs";
    for (const docs of [
      syntheticEvidence(undefined, "\nThis table is advisory; a journey may ship without its legs.\n"),
      syntheticEvidence(undefined, "\n<!-- The table is advisory. -->\n"),
      syntheticEvidence(undefined, "\n### Exceptions\n\nA leg may be skipped.\n"),
      syntheticEvidence(undefined, "", EVIDENCE_INTRO.replace("in both directions", "in one direction")),
    ]) {
      expect(evidenceFailures(docs, ROWS).some(line => line.includes(exactness))).toBe(true);
    }
  });

  it("E8: the table moved out of its section, or a second table under the evidence header elsewhere, reds", () => {
    const table = [EVIDENCE_HEADER, EVIDENCE_HEADER.map(() => "---"), ...cellsOf(ROWS)].map(cells => `| ${cells.join(" | ")} |`).join("\n");
    const moved = `# ${DOCS_14_PARENT}\n\n## ${EVIDENCE_HEADING}\n\n${EVIDENCE_INTRO}\n\n## Later\n\n${table}\n`;
    expect(evidenceFailures(moved, ROWS).some(line => line.includes("the section has 1 blocks; the census pins 2"))).toBe(true);
    expect(evidenceFailures(`${syntheticEvidence()}\n## Later\n\n${table}\n`, ROWS).some(line => line.includes("must occur exactly once; found 2"))).toBe(true);
  });
});

describe("wb-h8f.15 the evidence table's cells are read from the section its rendered view is judged in (h8f.12 PREP F1, the G7 same-view class; synthetic documents)", () => {
  const LEGS = legsOf(ROWS);
  const CELLS: readonly (readonly string[])[] = LEGS.map(leg => leg.cells);
  const BOLD_HEADER: readonly string[] = EVIDENCE_HEADER.map(cell => `**${cell}**`);
  const HEADER_CAUSE = "the section's own table has the header";
  const notCarried = "which the census table does not carry";
  const notListed = "is not listed in";
  const tableOf = (header: readonly string[], rows: readonly (readonly string[])[]): string => [header, header.map(() => "---"), ...rows].map(cells => `| ${cells.join(" | ")} |`).join("\n");
  /** One leg re-split across its label/evidence cell boundary: the label's last word moves into the evidence cell, so the rendered (cell-joined) text is unchanged. */
  const resplit = (cells: readonly string[]): string[] => {
    const words = (cells[1] ?? "").split(" ");
    return [cells[0] ?? "", words.slice(0, -1).join(" "), `${words[words.length - 1] ?? ""} ${cells[2] ?? ""}`];
  };
  const resplitTable = (at: number, header: readonly string[] = BOLD_HEADER): string => tableOf(header, CELLS.map((cells, index) => (index === at ? resplit(cells) : cells)));
  /** docs/14 with the given table in the evidence section, and the ORIGINAL table copied into another section placed before or after it (or no copy). */
  const g7Doc = (sectionTable: string, copy: "before" | "after" | "none"): string => {
    const original = tableOf(EVIDENCE_HEADER, CELLS);
    const before = copy === "before" ? `## Copied evidence\n\n${original}\n\n` : "";
    const after = copy === "after" ? `\n## Copied evidence\n\n${original}\n` : "";
    return `# ${DOCS_14_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n${before}## ${EVIDENCE_HEADING}\n\n${EVIDENCE_INTRO}\n\n${sectionTable}\n${after}`;
  };
  const named = (lines: readonly string[], cells: readonly string[], cause: string): boolean => lines.some(line => line.startsWith(describeLeg(cells)) && line.includes(cells[2] ?? "") && line.includes(cause));
  const COPIES = ["before", "after"] as const;

  it("G7 precondition: every mutant keeps the section's rendered view exact and leaves exactly one evidence-header table in the document - the copy - so a whole-document read judges the copy (the h8f.12 gate's 0/88 shape)", () => {
    expect(LEGS.every(leg => (leg.cells[1] ?? "").includes(" ")), "every label has two words, so each leg re-splits without an empty cell").toBe(true);
    for (const at of LEGS.keys()) {
      for (const copy of COPIES) {
        const doc = g7Doc(resplitTable(at), copy);
        expect(sectionMatches(docsSection(doc, EVIDENCE_HEADING, 2, [DOCS_14_PARENT]), evidenceBlocks(LEGS)), `${copy} ${at}`).toEqual({ ok: true, why: "" });
        expect(evidenceGrids(doc), `${copy} ${at}`).toEqual([[[...EVIDENCE_HEADER], ...CELLS.map(cells => [...cells])]]);
      }
    }
  });

  it("G7 (h8f.12 PREP F1): a bolded header plus one leg re-split in the section, with the original table copied to another section, reds naming the header and the re-split leg - every leg, the copy before or after", () => {
    expect(LEGS.length).toBeGreaterThan(0);
    for (const [at, leg] of LEGS.entries()) {
      for (const copy of COPIES) {
        const lines = evidenceFailures(g7Doc(resplitTable(at), copy), ROWS);
        const label = `${copy} | ${leg.cells.join(" | ")}`;
        expect(lines.some(line => line.startsWith(`${DOCS_14} § ${EVIDENCE_HEADING}: ${HEADER_CAUSE}`)), label).toBe(true);
        expect(named(lines, leg.cells, notListed), label).toBe(true);
        expect(named(lines, resplit(leg.cells), notCarried), label).toBe(true);
      }
    }
  });

  it("G7 bold-only: the section's table under a bolded header, its legs intact, with the original copied to another section, reds on the header alone", () => {
    for (const copy of COPIES) {
      const lines = evidenceFailures(g7Doc(tableOf(BOLD_HEADER, CELLS), copy), ROWS);
      expect(lines, copy).toHaveLength(1);
      expect(lines[0], copy).toContain(HEADER_CAUSE);
      expect(lines[0], copy).toContain(JSON.stringify(BOLD_HEADER));
    }
  });

  it("G7 re-split under a plain header with the copy elsewhere: the second evidence-header table reds the uniqueness rule (E8), the re-split never reads green", () => {
    for (const [at] of LEGS.entries()) {
      for (const copy of COPIES) {
        const lines = evidenceFailures(g7Doc(resplitTable(at, EVIDENCE_HEADER), copy), ROWS);
        expect(lines.some(line => line.includes("must occur exactly once; found 2")), `${copy} ${at}`).toBe(true);
      }
    }
  });

  it("G7b: the re-split alone - plain header, no copy - keeps redding naming the leg, and names no header", () => {
    for (const [at, leg] of LEGS.entries()) {
      const lines = evidenceFailures(g7Doc(resplitTable(at, EVIDENCE_HEADER), "none"), ROWS);
      expect(named(lines, leg.cells, notListed), leg.cells.join(" | ")).toBe(true);
      expect(named(lines, resplit(leg.cells), notCarried), leg.cells.join(" | ")).toBe(true);
      expect(lines.some(line => line.includes(HEADER_CAUSE)), leg.cells.join(" | ")).toBe(false);
    }
  });

  it("same view, other direction: the section's own table exact with a re-split copy under a bolded header in another section stays green - a neighbouring section is free to change", () => {
    for (const copy of COPIES) {
      const decoy = `## Copied evidence\n\n${resplitTable(0)}\n`;
      const doc = copy === "before" ? g7Doc(tableOf(EVIDENCE_HEADER, CELLS), "none").replace(`## ${EVIDENCE_HEADING}`, `${decoy}\n## ${EVIDENCE_HEADING}`) : `${g7Doc(tableOf(EVIDENCE_HEADER, CELLS), "none")}\n${decoy}`;
      expect(evidenceFailures(doc, ROWS), copy).toEqual([]);
    }
  });
});
