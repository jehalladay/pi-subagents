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
 * docs/14, TRACEABILITY.md, the committed operator receipt and vitest.census.config.ts, and its own source through the
 * helper's sourceStructure (AC4); the helper's vouch (censusGuard) reads the default vitest config and forge.toml by
 * design, so this leg makes no "reads no config" claim.
 *
 * Evidence kinds (one label per leg, never a pass label from a title's presence alone):
 * - cases         "fixture pass" - judged by judge() over the default-gate report (tier "test").
 * - receipt       "live SDK pass" - the command id must sit in a TRACEABILITY paragraph that is not SUPERSEDED; this
 *                 leg reads TRACEABILITY.md (frozen byte-exact) and never re-runs the receipt.
 * - owner-receipt "live SDK pass" - an OWNER RECEIPT with no forge-run cmd_ of its own (owner ruling
 *                 2026-10-16T01:16Z: the wb-h7r v2 operator receipt COUNTS as journey 1's live SDK pass evidence).
 *                 Admitted only when the committed file exists, itself carries the row's contract and revision and
 *                 records a realised pass; the TRACEABILITY section under the row's heading (exactly once, rendered
 *                 view) cites the file at that revision in a paragraph that is not SUPERSEDED; and the row carries the
 *                 owner-worded citation - the committed path, the revision, the landing gate, the owner-receipt
 *                 statement and the alias-vs-native fact as the receipt's own preflight records it.
 * - artifact      "code present" - a committed file and the TRACEABILITY section that cites it (no row today).
 * - open          "code present" | "not started" - a tracking bead id; never a pass label.
 *
 * Frozen literals (rule 16), each written out in full: EXPECTED_SHAPE (journey:label:kind:pins), EXPECTED_PINS (the ten
 * pin pairs), EXPECTED_EVIDENCE (every row's evidence identity, U3) and EXPECTED_JUDGED_ROWS (the rows AC2 judges,
 * U4). AC2 asserts that the pins it judged are its row's EXPECTED_PINS entries, and its each-liveness case pins one
 * run-mode AC2 case per judged row, each reaching its last assertion.
 *
 * Docs: both sections are judged whole through the helper's rendered view (docsSection / sectionMatches), HTML-free:
 * docs/11 must render as exactly one five-item list, docs/14 as exactly its two paragraphs (the label paragraph and
 * the Forge-interface paragraph), each under its unique level-2 heading of the level-1 parent, bounded at the next
 * level-1/2 heading or EOF. Drift falsifiers run over SYNTHETIC documents, never the live text, so an unrelated docs
 * edit cannot redden a falsifier row, and a neighbouring section stays free to change.
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
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-acceptance-journeys.census.ts";
const DOCS_11 = "docs/workbench/11-designer-and-operator.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const TRACEABILITY_PARENT = "Workbench requirement traceability and release evidence";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_11_PARENT = `11 ${EM_DASH} Pi designer, operator tools and closed-loop experimentation`;
const DOCS_14_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const JOURNEYS_HEADING = "Acceptance journeys";
const TRUTH_HEADING = "Truth labels and release gates";
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
 * CLOSED too (landed 2026-10-17, merge 24c8be2): journey 3 no longer carries it as an OPEN row, and no TRACEABILITY paragraph
 * records a live command id for it, so the census claims only what it can evidence - its vc4 receipt-builder
 * falsifier is a third "fixture pass" pin, and the live external-Furnace leg stays a visible gap (no live row).
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
}
const REPO_READER: Reader = {
  exists: relative => existsSync(join(ROOT, relative)),
  read: relative => readFileSync(join(ROOT, relative), "utf8"),
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

/** A receipt id must sit in a TRACEABILITY paragraph that is not itself SUPERSEDED. */
function receiptProblem(traceability: string, commandId: string): string | undefined {
  const blocks = traceability.split(/\n\s*\n/).filter(block => block.includes(commandId));
  if (blocks.length === 0) return `receipt ${commandId} is not recorded in TRACEABILITY`;
  if (blocks.every(block => /^\s*SUPERSEDED\b/.test(block))) return `receipt ${commandId} survives only inside a SUPERSEDED TRACEABILITY paragraph`;
  return undefined;
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

/** Why an owner receipt does not evidence a live pass; [] when the file, its TRACEABILITY section and the row's citation all hold. */
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
  const section = docsSection(reader.read(TRACEABILITY), ev.heading, 2, [TRACEABILITY_PARENT]);
  if (!section.ok) out.push(`TRACEABILITY section "${ev.heading}" is refused: ${section.why}`);
  else if (!section.blocks.some(block => block.kind === "paragraph" && !/^SUPERSEDED\b/.test(block.text) && block.text.includes(ev.file) && citesRevision(block.text, ev.revision))) {
    out.push(`TRACEABILITY section "${ev.heading}" cites ${ev.file} at revision ${ev.revision} in no live paragraph`);
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
        const problem = receiptProblem(reader.read(TRACEABILITY), ev.commandId);
        if (problem !== undefined) failures.push(`${who}: ${problem}`);
      }
    } else if (ev.kind === "owner-receipt") {
      for (const problem of ownerReceiptProblems(ev, reader)) failures.push(`${who}: ${problem}`);
    } else if (ev.kind === "artifact") {
      if (!reader.exists(ev.file)) failures.push(`${who}: artifact ${ev.file} is missing`);
      const traceability = reader.read(TRACEABILITY);
      if (!traceability.includes(ev.file)) failures.push(`${who}: artifact ${ev.file} is not cited in TRACEABILITY`);
      if (!traceability.split("\n").some(line => line.trim() === ev.heading)) failures.push(`${who}: TRACEABILITY lost the section "${ev.heading}"`);
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

const synthTraceability = (...blocks: readonly string[]): string => `# ${TRACEABILITY_PARENT}\n\n${blocks.join("\n\n")}\n`;
const readerOf = (files: Readonly<Record<string, string>>): Reader => ({
  exists: relative => relative in files,
  read: relative => files[relative] ?? "",
});

describe("wb-h8f.9 docs/workbench/11 acceptance-journeys census (report mode)", () => {
  it("AC1: the table holds the eight frozen rows in order (journey:label:kind:pins), deeply frozen, covering all five journeys", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(isDeepFrozen(JOURNEY_QUOTES)).toBe(false);
    expect(JOURNEY_QUOTES).toHaveLength(5);
    expect(shapeOf(ROWS)).toEqual(EXPECTED_SHAPE);
    expect(ROWS).toHaveLength(8);
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

  it("AC3: every row carries one honest label for its evidence kind: receipts and artifacts resolve in TRACEABILITY, open rows name a bead", () => {
    expect(auditRows(ROWS, JOURNEY_QUOTES, REPO_READER)).toEqual([]);
  });

  it("AC3: every 'live SDK pass' row is receipt-backed: a forge-run receipt id in a live TRACEABILITY paragraph, or the owner receipt the 2026-10-16T01:16Z ruling admits", () => {
    const live = ROWS.filter(r => r.label === "live SDK pass");
    expect(live.map(r => `${r.journey}:${r.evidence.kind}`)).toEqual(["1:receipt", "1:owner-receipt"]);
    const traceability = REPO_READER.read(TRACEABILITY);
    for (const r of live) {
      if (r.evidence.kind === "receipt") expect(receiptProblem(traceability, r.evidence.commandId), describeRow(r, JOURNEY_QUOTES)).toBeUndefined();
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
  const goodTrace = synthTraceability("Live receipt cmd_aaaaaaaaaaaa here.", "See qa/x.json\n\n## Section\n\nBody.");
  const goodFiles = { [TRACEABILITY]: goodTrace, "qa/x.json": "{}" };

  it("baseline: a healthy table audits clean (no false positive)", () => {
    expect(auditRows(goodRows(), JOURNEY_QUOTES, readerOf(goodFiles))).toEqual([]);
  });

  it("fabricated-receipt mutant: a command id absent from TRACEABILITY fails the live row naming the journey", () => {
    const lines = auditRows([row(1, "live SDK pass", receipt("cmd_bbbbbbbbbbbb"))], JOURNEY_QUOTES, readerOf(goodFiles));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("journey 1");
    expect(lines[0]).toContain("is not recorded in TRACEABILITY");
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
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("See qa/x.json only.") })).some(line => line.includes("lost the section"))).toBe(true);
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("## Section", "Nothing cites the file.") })).some(line => line.includes("is not cited in TRACEABILITY"))).toBe(true);
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
    expect(lost.some(line => line.includes('TRACEABILITY section "Owner receipt" is refused'))).toBe(true);
    const twice = ownerAudit(ownerFiles({ [TRACEABILITY]: `${ownerTrace(LIVE_CITE)}\n## Owner receipt\n\nAgain.\n` }));
    expect(twice.some(line => line.includes("occurs 2 times"))).toBe(true);
  });

  it("owner-receipt mutant: the section lost its live citation of the file at the revision (absent, another revision, or only SUPERSEDED)", () => {
    const cites = (body: string): readonly string[] => ownerAudit(ownerFiles({ [TRACEABILITY]: ownerTrace(body) }));
    const lostCitation = 'TRACEABILITY section "Owner receipt" cites qa/r.json at revision abc1234 in no live paragraph';
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
