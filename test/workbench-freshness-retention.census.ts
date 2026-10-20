/**
 * wb-752.14 (VC-4/W14): census falsifier for docs/workbench/09 "Freshness and ambiguity" and "Data retention and
 * privacy", a census leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in
 * wb-u62 REPORT MODE.
 *
 * The two sections state eight sentences. This leg binds each sentence to existing cases by file, verbatim title and
 * tier, or records it as partial / unpinned with a reason. It executes no pinned case and no test run: judge() from the
 * shared helper test/helpers/census.ts reads vitest's own JSON report of the default gate's test step
 * (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned case counts only when the
 * gate's own run collected it exactly once, recorded it passed, and its body asserts (the helper's three legs,
 * fail-closed). A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore
 * reads red, naming the sentence, the file, the title and the cause, as far as the helper's resolvable-construct roster
 * and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg adds no scanner of its own
 * (docs/workbench/14 "Each major work package must have a falsifier: a negative test that would fail if a critical
 * guarantee was quietly weakened.").
 *
 * The docs pins read the RENDERED view through the helper's docsSection / sectionMatches: each docs/09 section (the
 * unique level-2 heading under the level-1 parent heading, bounded at the next level-1/2 heading or EOF; a "###"
 * subsection belongs to it) must render as exactly its sentences, and the docs/14 "Truth labels and release gates"
 * section must render as exactly its two paragraphs, so a dropped, reworded, qualified or relocated sentence names its
 * row. A title's presence is never a live, native or scale pass: every row is tier "default-gate", the default report
 * vouches for the default gate's test tier only, and a pin of any other tier is refused by judge() (R2 = (i)).
 *
 * Rule 16 (frozen shape): the table pins its own row/pin-level shape (EXPECTED_SHAPE), every judged case by sentence,
 * file and title (EXPECTED_JUDGED), and each row's section, quote, tier, status, reason and pins as a per-row digest
 * (EXPECTED_ROW_DIGESTS), so deleting a pin, swapping a pin for an unrelated passing case, shortening a quote or
 * hollowing a reason reads red. The set the AC2 it.each runs is frozen too, by sentence and pin count
 * (EXPECTED_JUDGED_ROWS): each AC2 case refuses a row with no pin and judges exactly its row's frozen EXPECTED_JUDGED
 * entries, and an each-liveness case pins one run-mode AC2 case per frozen judged row, each reaching its last
 * assertion, so narrowing or emptying the judged set reads red.
 *
 * Respin 2 (gate verdict 2026-10-20T05:19:02Z on 88ed826, unmet U1-U6). U1: row 4 pins the landed workflow_observe
 * wiring case (wb-752.9, test/workbench-pi-observe.test.ts B2/F4) beside the builder's O2 case and stays partial only
 * for the furnace_observe half (wb-752.13 open). U2: the judged-row literal, the AC2 pin guard and the each-liveness leg
 * above. U3: row 6 pins the Claude observer's two raw-body cases and stays partial only for the deployment-owned
 * encrypt clause. U5: every reason is digest-frozen. U6: the leg's import set is frozen to its six modules (none of them
 * spawns a process), and row 5's reason names the check that verifies its tier.
 *
 * Disclosed limits (never claimed as covered): everything the helper's named residuals leave open; a skip reached
 * through a construct outside the helper's roster fails closed there (options-unknown / context-unknown), it is not
 * judged here. A sentence (or half) with no case is recorded partial or unpinned with its reason and is never counted
 * as passed.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Section = "Freshness and ambiguity" | "Data retention and privacy";
type Tier = "default-gate" | "live-tier";
type Status = "pinned" | "unpinned" | "partial";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface Row {
  readonly n: number;
  readonly section: Section;
  /** The docs/09 sentence, verbatim. */
  readonly quote: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-freshness-retention.census.ts";
const DOC_09 = "docs/workbench/09-observation-and-provenance.md";
const DOC_09_PARENT = "09 — Observation, telemetry, provenance and derived graph";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";
const DOC_14_PARENT = "14 — Test strategy, conformance suite, benchmark and adversarial controls";
const DOC_14_SECTION = "Truth labels and release gates";
const FALSIFIER_QUOTE = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";
const INSPECTOR = "test/workbench-inspector.test.ts";

/** Freezes the table and everything it holds, so no row, pin list or pin can be edited at runtime. */
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

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    n: 1,
    section: "Freshness and ambiguity",
    quote: "Each projection node includes lastConfirmedAt, observedAt, sourceConnectionState, sourceCursor and completeness label.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-observation.test.ts", title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
    ],
    reason:
      "No single case names all five fields. Covered: freshness and lastConfirmedAt (observation :29), sourceConnectionState (observation :43), observedAt and the coverage/completeness value on a detached reading (detached-observer :49). sourceCursor on a projection node has no asserting case at the re-cut base (outside this census its only test mention is a forbidden-term list in test/workbench-timeline.test.ts), so the five-field claim stays partial.",
  },
  {
    n: 2,
    section: "Freshness and ambiguity",
    quote: "UI shows STALE/UNKNOWN visibly.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: INSPECTOR, title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner" },
      { file: "test/workbench-attention.test.ts", title: "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone" },
    ],
  },
  {
    n: 3,
    section: "Freshness and ambiguity",
    quote: "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-furnace-observer.test.ts", title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
    ],
  },
  {
    n: 4,
    section: "Freshness and ambiguity",
    quote: "Pi tool summaries must communicate that nuance.",
    tier: "default-gate",
    status: "partial",
    pins: [
      {
        file: "test/workbench-observe-query.test.ts",
        title: "O2 speaks last-known-running + stale after a Furnace disconnect and keeps native status text beside the tone",
      },
      {
        file: "test/workbench-pi-observe.test.ts",
        title: "B2/F4: a node left running reports last-known-running + stale in the freshness summary and no node is current",
      },
    ],
    reason:
      "The pure reply builder (wb-752.2, closed) is pinned by its O2 case, and the workflow_observe Pi tool wiring (wb-752.9, closed, landed at landing 149) by its B2/F4 case, which quotes sentences 3 and 4 and asserts the tool reply's freshness summary carries last-known-running + stale. The furnace_observe Pi tool half is unpinned: its convergence bead wb-752.13 is open at the re-cut base, and no default-gate case asserts a stale summary for furnace_observe (test/workbench-security-pi-tools.test.ts and test/workbench-pi-furnace-observer.test.ts hold no stale assertion). Flip that half to pinned in the same commit that lands its first case.",
  },
  {
    n: 5,
    section: "Data retention and privacy",
    quote: "Short hot window in memory (configurable); optional local/private disk cache for diagnostics and reattachment.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-observation-perf.test.ts", title: "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history" },
      { file: "test/workbench-observation-recovery-receipt.test.ts", title: "keeps the only maxNodes literal inside the bench-only pass object, so the default pass never raises a cap" },
    ],
    reason:
      "The in-memory hot window is pinned by two default-gate vitest cases: observation-perf :11 builds the projection with its own limits (maxEvents 100) and asserts only 100 of 100k events stay retained, and observation-recovery-receipt :877 keeps the only maxNodes literal inside the bench-only pass. Their default-gate tier is verified by AC2's own report-mode judgment, where a file the default config excludes reads not-collected (the liveness case below), not by a separate tier pin; the nearby forge.toml command observation-recovery-bench is a separate bench run this row does not claim. The optional local/private disk cache half is unpinned: optional, and no disk-cache code exists under src at the re-cut base, so no case exists to bind.",
  },
  {
    n: 6,
    section: "Data retention and privacy",
    quote: "Avoid raw prompts/tool bodies by default; store reference/short redacted preview, encrypt where required by deployment.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-hyperunix-observer.test.ts", title: "H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references" },
      { file: "test/workbench-forge-evidence.test.ts", title: "C4: producer text is redacted and stripped, and no raw payload member is retained" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
      { file: "test/workbench-claude-observer.test.ts", title: "caps samples and tool evidence while terminal is always emitted and snapshots are immutable" },
      { file: "test/workbench-claude-observer.test.ts", title: "parallel calls retain independent native session identity and permission evidence" },
    ],
    reason:
      "Reference-not-body and the redacted preview are pinned for the HyperUnix, Forge-evidence, detached and Claude readers. The Claude observer file registers four call sites (five cases) at the re-cut base: its :11 case feeds tool_use input bodies and its :23 case a permission_denied message, and both assert the raw text never reaches a snapshot, which keeps only the tool reference (toolUseId, name, state); its :33 lastMessageId and :46 partial-stream cases do not bind this sentence. The encrypt-where-required-by-deployment clause is deployment-owned: no encryption code exists under src and no case under test at the re-cut base, so that clause stays open.",
  },
  {
    n: 7,
    section: "Data retention and privacy",
    quote: "Providers own transcript/artifact retention; UI fetches full text lazily subject to permission.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-evidence-loader.test.ts", title: "loads one ref lazily and idempotently while loading" },
      { file: "test/workbench-evidence-loader.test.ts", title: "claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves" },
    ],
  },
  {
    n: 8,
    section: "Data retention and privacy",
    quote: "Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-topology-slice.test.ts", title: "never reads another tenant's relations and refuses a focus key outside the caller scope" },
      { file: "test/workbench-security-capability.test.ts", title: "Furnace provider must not return a foreign workspace's Run record" },
      { file: "test/workbench-reconcile-decision.test.ts", title: "denies cross-scope with the observe tool's exact text for a missing task and a foreign scope alike" },
    ],
  },
]);

/** Rule 16: the frozen row/pin-level shape, "<sentence>:<status>:<pins>" per row in docs order. */
const EXPECTED_SHAPE: readonly string[] = ["1:partial:3", "2:pinned:2", "3:pinned:2", "4:partial:2", "5:partial:2", "6:partial:5", "7:pinned:2", "8:pinned:3"];
/** Rule 16: every judged case's frozen key, "<sentence>|<file>|<title>", in table order. */
const EXPECTED_JUDGED: readonly string[] = [
  "1|test/workbench-observation.test.ts|deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
  "1|test/workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "1|test/workbench-detached-observer.test.ts|carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference",
  "2|test/workbench-inspector.test.ts|a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner",
  "2|test/workbench-attention.test.ts|a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone",
  "3|test/workbench-furnace-observer.test.ts|reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
  "3|test/workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "4|test/workbench-observe-query.test.ts|O2 speaks last-known-running + stale after a Furnace disconnect and keeps native status text beside the tone",
  "4|test/workbench-pi-observe.test.ts|B2/F4: a node left running reports last-known-running + stale in the freshness summary and no node is current",
  "5|test/workbench-observation-perf.test.ts|retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history",
  "5|test/workbench-observation-recovery-receipt.test.ts|keeps the only maxNodes literal inside the bench-only pass object, so the default pass never raises a cap",
  "6|test/workbench-hyperunix-observer.test.ts|H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references",
  "6|test/workbench-forge-evidence.test.ts|C4: producer text is redacted and stripped, and no raw payload member is retained",
  "6|test/workbench-detached-observer.test.ts|carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference",
  "6|test/workbench-claude-observer.test.ts|caps samples and tool evidence while terminal is always emitted and snapshots are immutable",
  "6|test/workbench-claude-observer.test.ts|parallel calls retain independent native session identity and permission evidence",
  "7|test/workbench-evidence-loader.test.ts|loads one ref lazily and idempotently while loading",
  "7|test/workbench-evidence-loader.test.ts|claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves",
  "8|test/workbench-topology-slice.test.ts|never reads another tenant's relations and refuses a focus key outside the caller scope",
  "8|test/workbench-security-capability.test.ts|Furnace provider must not return a foreign workspace's Run record",
  "8|test/workbench-reconcile-decision.test.ts|denies cross-scope with the observe tool's exact text for a missing task and a foreign scope alike",
];
/** Rule 16 / U2: the set the AC2 it.each runs, "<sentence>:<pins>" in table order; a row with no pin never rides it. */
const EXPECTED_JUDGED_ROWS: readonly string[] = ["1:3", "2:2", "3:2", "4:2", "5:2", "6:5", "7:2", "8:3"];
/** Rule 16 / U5: each row's section, quote, tier, status, reason and pins, as the first 12 hex of their sha256. */
const EXPECTED_ROW_DIGESTS: readonly string[] = ["1:78ec6d1ed5e4", "2:a4222ac6219c", "3:85b06ae97ff1", "4:8e52ffa59d29", "5:cc3123ff719f", "6:63c9a5c7a246", "7:a3f4bcbf0884", "8:8f534987aafb"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const sectionRows = (section: Section, rows: readonly Row[] = ROWS): readonly Row[] => rows.filter(row => row.section === section);
const SECTIONS: readonly Section[] = ["Freshness and ambiguity", "Data retention and privacy"];

/** A section's whole rendered block list: one paragraph holding exactly its sentences (sectionMatches form). */
const sectionBlocks = (section: Section, rows: readonly Row[] = ROWS): readonly RenderedBlock[] => {
  const text = sectionRows(section, rows)
    .map(row => row.quote)
    .join(" ");
  return [{ kind: "paragraph", text, markdown: text }];
};

const DOC14_PARAGRAPH_ONE = "Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish \"code present\", \"fixture pass\", \"live SDK pass\", \"adversarial pass\", \"scale benchmark pass\". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";
const DOC14_PARAGRAPH_TWO = "Use Forge build/test/gates as primary interface; run local relevant Node tests through Forge-configured paths. Never introduce GitHub CI. Pin dependencies, lockfile and package exports.";
const DOC14_BLOCKS: readonly RenderedBlock[] = [
  { kind: "paragraph", text: DOC14_PARAGRAPH_ONE, markdown: DOC14_PARAGRAPH_ONE },
  { kind: "paragraph", text: DOC14_PARAGRAPH_TWO, markdown: DOC14_PARAGRAPH_TWO },
];

const renderedText = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text);

/** The forge.toml command whose own run must vouch for a row: the default report vouches for the default gate's test tier only. */
const tierCommand = (tier: Tier): string => (tier === "default-gate" ? DEFAULT_GATE_TIER : tier);
const casePin = (row: Row, pin: Pin): CasePin => ({ file: pin.file, title: pin.title, tier: tierCommand(row.tier) });

/** A row's frozen shape line, "<sentence>:<status>:<pins>". */
const shapeOf = (row: Row): string => `${row.n}:${row.status}:${row.pins.length}`;
/** A judged case's frozen key, "<sentence>|<file>|<title>", read from the CasePin the helper judges. */
const judgedKey = (n: number, judged: CasePin): string => `${n}|${judged.file}|${judged.title}`;
const judgedOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.pins.map(pin => judgedKey(row.n, casePin(row, pin))));
/** The judged-row shape, "<sentence>:<pins>" per row (U2). */
const judgedShapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.n}:${row.pins.length}`);
/** A row's digest line: its sentence number and the first 12 hex of the sha256 over its section, quote, tier, status, reason and pins (U5). */
const digestOf = (row: Row): string =>
  `${row.n}:${createHash("sha256")
    .update(JSON.stringify([row.section, row.quote, row.tier, row.status, row.reason ?? "", row.pins.map(pin => [pin.file, pin.title])]))
    .digest("hex")
    .slice(0, 12)}`;

/** One line per pin that is not ok, naming the sentence; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `sentence ${row.n}: ${verdict.code}: ${verdict.why}`);

/** Every docs/09 drift, each naming the sentence (or the section) it breaks. */
function docs09Failures(markdown: string, rows: readonly Row[] = ROWS): string[] {
  const out: string[] = [];
  for (const heading of SECTIONS) {
    const section = docsSection(markdown, heading, 2, [DOC_09_PARENT]);
    if (!section.ok) {
      out.push(`${DOC_09} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const text = section.blocks.map(renderedText).join(" ");
    for (const row of sectionRows(heading, rows)) {
      if (!text.includes(row.quote)) out.push(`sentence ${row.n}: "${row.quote}" no longer renders in ${DOC_09} § ${heading}`);
    }
    const exact = sectionMatches(section, sectionBlocks(heading, rows));
    if (!exact.ok) out.push(`${DOC_09} § ${heading} is not exactly its sentences: ${exact.why}`);
  }
  return out;
}

/** The docs/14 falsifier rule, held whole inside its own section and the section held to exactly its two paragraphs. */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, DOC_14_SECTION, 2, [DOC_14_PARENT]);
  if (!section.ok) return [`${DOC_14} § ${DOC_14_SECTION}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (!section.blocks.map(renderedText).join(" ").includes(FALSIFIER_QUOTE)) out.push(`${DOC_14} § ${DOC_14_SECTION}: the falsifier rule no longer renders in its section`);
  const exact = sectionMatches(section, DOC14_BLOCKS);
  if (!exact.ok) out.push(`${DOC_14} § ${DOC_14_SECTION} is not exactly its two paragraphs: ${exact.why}`);
  return out;
}

/** The rows the AC2 it.each judges: every row that names a pin, partial rows included (U2). */
const JUDGED_ROWS = ROWS.filter(row => row.pins.length > 0);

/**
 * The explicit budget of every judging case (the R546 sizing recipe, file-local so no other census file's budget moves):
 * 5 x the costliest judging case measured, rounded up to a whole 5 s. This cut's three census runs over the 16-file
 * pinned report (528 cases) at load1 222-264 peaked at 1834 ms (AC2 sentence 4), 5 x = 9170 ms; the gate judges the far
 * larger full default-tier report, so the floor is the sibling census's gate-measured full-report figure as the landed
 * test/workbench-docs08-replay-reconcile.census.ts cites it (wb-0kg.11 respin: an AC2 case at 3735 ms in the g9 gate's
 * census tier, cmd_3bb7ae87a15f; not re-measured here): 5 x 3735 ms = 18675 ms, rounded up to 20000 ms. The AC2 cases
 * and the three liveness falsifiers carry it; none rides vitest's default 5000 ms.
 */
const JUDGE_BUDGET_MS = 20_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The title the AC2 it.each registers for a judged row (vitest renders the number $n bare). */
const AC2_CASE = (n: number): string => `AC2 sentence ${n}: every pinned case is collected once, passed and asserting in the default gate's own report`;
/** The judged rows whose AC2 case reached its last assertion this run (each-liveness, U2). */
const completed = new Set<number>();

describe("wb-752.14 docs/09 freshness-and-retention census (report mode)", () => {
  it("AC1: the Freshness and ambiguity and Data retention and privacy sections render exactly their sentences, and docs/14 keeps the falsifier rule whole", () => {
    expect(docs09Failures(readRepo(DOC_09))).toEqual([]);
    expect(docs14Failures(readRepo(DOC_14))).toEqual([]);
  });

  it("AC1: the table holds eight deeply frozen rows in docs order whose shape, judged cases and judged-row set are frozen as literals (rule 16)", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(ROWS.filter(row => row.section === "Freshness and ambiguity").map(row => row.n)).toEqual([1, 2, 3, 4]);
    expect(ROWS.filter(row => row.section === "Data retention and privacy").map(row => row.n)).toEqual([5, 6, 7, 8]);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(ROWS), "every judged case by sentence, file and title (rule 16)").toEqual(EXPECTED_JUDGED);
    expect(JUDGED_ROWS).toHaveLength(ROWS.filter(row => row.status !== "unpinned").length);
    expect(judgedShapeOf(JUDGED_ROWS), "the set the AC2 it.each runs, by sentence and pin count (rule 16, U2)").toEqual(EXPECTED_JUDGED_ROWS);
    expect(ROWS.every(row => row.tier === "default-gate")).toBe(true);
  });

  it("AC1: each row's section, quote, tier, status, reason and pins are frozen as a per-row digest, so swapping a pin for an unrelated passing case or hollowing a reason reddens the row (rule 16, U5)", () => {
    expect(ROWS.map(digestOf)).toEqual(EXPECTED_ROW_DIGESTS);
  });

  it("AC1: pinned rows carry pins and no reason, partial rows carry both, unpinned rows carry a reason and no pin", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `sentence ${row.n} is pinned and needs at least one pin`).toBeGreaterThan(0);
        expect(row.reason, `sentence ${row.n} is pinned and must not carry a reason`).toBeUndefined();
      } else if (row.status === "partial") {
        expect(row.pins.length, `sentence ${row.n} is partial and needs at least one pin`).toBeGreaterThan(0);
        expect((row.reason ?? "").length, `sentence ${row.n} is partial and needs a reason`).toBeGreaterThan(40);
      } else {
        expect(row.pins, `sentence ${row.n} is unpinned and must carry no pin`).toEqual([]);
        expect((row.reason ?? "").length, `sentence ${row.n} is unpinned and needs a reason`).toBeGreaterThan(40);
      }
    }
  });

  it("AC3: the sentences that are only partly pinned are listed with their reasons so none is ever counted as fully passed", () => {
    const open = ROWS.filter(row => row.status !== "pinned");
    expect(open.map(row => row.n)).toEqual([1, 4, 5, 6]);
    expect(open.find(row => row.n === 1)?.reason).toContain("sourceCursor");
    expect(open.find(row => row.n === 4)?.reason).toContain("wb-752.13");
    expect(open.find(row => row.n === 4)?.reason).toContain("furnace_observe");
    expect(open.find(row => row.n === 5)?.reason).toContain("disk cache");
    expect(open.find(row => row.n === 6)?.reason).toContain("encrypt");
  });

  it.each(JUDGED_ROWS)("AC2 sentence $n: every pinned case is collected once, passed and asserting in the default gate's own report", JUDGING, row => {
    expect(row.pins.length, `sentence ${row.n}: an AC2 case judges a row with pins, never an empty one vacuously (U2)`).toBeGreaterThan(0);
    const verdicts = judge(
      REPORT,
      row.pins.map(pin => casePin(row, pin)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
    expect(
      verdicts.map(verdict => judgedKey(row.n, verdict.pin)),
      `sentence ${row.n}: the cases this AC2 case judged are exactly its frozen EXPECTED_JUDGED entries (rule 16, U2)`,
    ).toEqual(EXPECTED_JUDGED.filter(key => key.startsWith(`${row.n}|`)));
    completed.add(row.n);
  });

  it("AC2 each-liveness (rule 16, U2): the it.each registers one run-mode AC2 case per frozen judged row, in order and on the judging budget, and every one reached its last assertion", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.name.startsWith("AC2 sentence ")) registered.push(`${child.name}|${child.mode}|${child.timeout}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const ids = EXPECTED_JUDGED_ROWS.map(entry => Number(entry.slice(0, entry.indexOf(":"))));
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(registered).toEqual(ids.map(n => `${AC2_CASE(n)}|run|${JUDGE_BUDGET_MS}`));
    expect([...completed], "the AC2 cases that reached their last assertion this run").toEqual(ids);
  });

  it("AC4: the leg judges the gate's own report and spawns nothing: it imports judge, never judgePins, loads no module at runtime and imports exactly its six modules, none of them process-spawning (U6)", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    expect(own.imports.map(entry => entry.module), "the leg's whole import set (U6)").toEqual(["node:crypto", "node:fs", "node:path", "node:url", "vitest", "./helpers/census.js"]);
    const pinned = ROWS.flatMap(row => row.pins.map(pin => basename(pin.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-752.14 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const row2 = ROWS.find(row => row.n === 2);
  const row8 = ROWS.find(row => row.n === 8);

  it("a renamed pinned title is absent from the report and red, naming the sentence, the file and the title", JUDGING, () => {
    const pin = row2?.pins[0];
    expect(row2 !== undefined && pin !== undefined).toBe(true);
    if (row2 === undefined || pin === undefined) return;
    const renamed = { ...pin, title: `${pin.title} (renamed)` };
    const [verdict] = judge(REPORT, [casePin(row2, renamed)]);
    expect(verdict?.code).toBe("absent");
    const [line] = failures(row2, verdict === undefined ? [] : [verdict]);
    expect(line).toContain("sentence 2:");
    expect(line).toContain(pin.file);
    expect(line).toContain(renamed.title);
  });

  it("a file the default config excludes (a native live-tier suite) is never in the default report: a pin there is red, not collected", JUDGING, () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-client.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a row relabelled live-tier is refused by the default report, never carried from a title's presence", JUDGING, () => {
    const pin = row8?.pins[0];
    expect(row8 !== undefined && pin !== undefined).toBe(true);
    if (row8 === undefined || pin === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...row8, tier: "live-tier" }, pin)]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-752.14 rule 16: hollowing the table or narrowing the judged set reddens the frozen literals (in-memory copies)", () => {
  const withRow = (n: number, edit: (row: Row) => Row): readonly Row[] => ROWS.map(row => (row.n === n ? edit(row) : row));

  it("H1 (CT1): deleting one pin of a multi-pin row changes the shape, judged, judged-row and digest literals", () => {
    const mutated = withRow(8, row => ({ ...row, pins: row.pins.slice(1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    expect(judgedShapeOf(mutated)).not.toEqual(EXPECTED_JUDGED_ROWS);
    expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
  });

  it("H2 (CT1b): deleting a pin of a second row (the Claude observer's :23 case) changes the shape, judged and digest literals", () => {
    const mutated = withRow(6, row => ({ ...row, pins: row.pins.slice(0, -1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
  });

  it("H3 (CT2): shortening a quoted requirement phrase keeps the shape but changes the digest, and the docs pin refuses the shortened table", () => {
    const mutated = withRow(3, row => ({ ...row, quote: row.quote.slice(0, -" + stale.".length) }));
    expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
    expect(docs09Failures(readRepo(DOC_09), mutated).length).toBeGreaterThan(0);
  });

  it("H4 (CT3): swapping a pin for an unrelated passing case in the same file (inspector 'status success and missing evidence does not become Verified') keeps the shape but changes the judged and digest literals", () => {
    const mutated = withRow(2, row => ({ ...row, pins: [{ file: INSPECTOR, title: "status success and missing evidence does not become Verified" }, ...row.pins.slice(1)] }));
    expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
  });

  it("H5 (T6 / T6b): hollowing a reason to filler or replacing it with a false one keeps the shape and the judged cases but changes the row digest", () => {
    const hollowed = withRow(6, row => ({ ...row, reason: "x".repeat(45) }));
    const falsified = withRow(1, row => ({ ...row, reason: "All five fields are pinned elsewhere and nothing is open here. Covered: every field of every node." }));
    for (const mutated of [hollowed, falsified]) {
      expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
      expect(judgedOf(mutated)).toEqual(EXPECTED_JUDGED);
      expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
    }
  });

  it("H6 (J1 / J2 / J3): narrowing the judged set to pinned rows only, dropping the tenant-boundary row, or emptying it changes the judged-row literal", () => {
    const narrowed = [ROWS.filter(row => row.status === "pinned"), ROWS.filter(row => row.pins.length > 0 && row.n !== 8), ROWS.filter(row => row.n < 0)];
    for (const mutated of narrowed) expect(judgedShapeOf(mutated)).not.toEqual(EXPECTED_JUDGED_ROWS);
  });

  it("H7: promoting a partial row to pinned (dropping its reason) changes the shape literal, the open set and the digest", () => {
    const mutated = withRow(4, row => ({ n: row.n, section: row.section, quote: row.quote, tier: row.tier, status: "pinned", pins: row.pins }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(mutated.filter(row => row.status !== "pinned").map(row => row.n)).not.toEqual([1, 4, 5, 6]);
    expect(mutated.map(digestOf)).not.toEqual(EXPECTED_ROW_DIGESTS);
  });
});

describe("wb-752.14 docs drift names the sentence or the section (rendered view, string-built fixtures)", () => {
  const body = (section: Section): string => sectionRows(section).map(row => row.quote).join(" ");
  const doc09 = (fresh: string, retention: string, after = ""): string =>
    `# ${DOC_09_PARENT}\n\n## Observer mandate\n\nText.\n\n## Freshness and ambiguity\n\n${fresh}\n\n## Aggregates and profiling\n\nText.\n\n## Data retention and privacy\n\n${retention}\n${after}\n## Acceptance/negative controls\n\nText.\n`;
  const good = doc09(body("Freshness and ambiguity"), body("Data retention and privacy"));
  const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("sentence ")).map(line => line.slice(0, line.indexOf(":")));

  it("accepts both sections exactly as written", () => {
    expect(docs09Failures(good)).toEqual([]);
  });

  it("DC1 names sentence 2 (and only it) when that sentence is dropped from its section", () => {
    const lines = docs09Failures(good.replace(` ${ROWS[1]?.quote ?? ""}`, ""));
    expect(named(lines)).toEqual(["sentence 2"]);
    expect(lines.some(line => line.includes("not exactly its sentences"))).toBe(true);
  });

  it("DC2 names sentence 8 (and only it) when it is reworded", () => {
    expect(named(docs09Failures(good.replace("not just at individual SDK calls", "not at individual SDK calls")))).toEqual(["sentence 8"]);
  });

  it("D1 goes red on the section, naming no sentence, when a weakening qualifier is appended to the paragraph", () => {
    const lines = docs09Failures(doc09(`${body("Freshness and ambiguity")} Unless the host says otherwise.`, body("Data retention and privacy")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its sentences");
  });

  it("D2 goes red on the section when a weakening paragraph is appended inside it", () => {
    const lines = docs09Failures(doc09(body("Freshness and ambiguity"), `${body("Data retention and privacy")}\n\nA host may skip these rules.`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 2 blocks; the census pins 1");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection is appended inside the retention section", () => {
    const lines = docs09Failures(doc09(body("Freshness and ambiguity"), body("Data retention and privacy"), "\n### Exceptions\n\nA host may skip these rules.\n"));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its sentences");
  });

  it("D4 goes red when a heading is renamed away, and when a level-1 heading re-homes the section", () => {
    const renamed = docs09Failures(good.replace("## Freshness and ambiguity", "## Freshness notes"));
    expect(renamed).toHaveLength(1);
    expect(renamed[0]).toContain("the section is refused");
    const rehomed = docs09Failures(good.replace("## Observer mandate", "# Appendix\n\n## Observer mandate"));
    expect(rehomed.length).toBeGreaterThan(0);
    expect(rehomed.every(line => line.includes("the section is refused"))).toBe(true);
  });

  it("D5 names sentence 3 and refuses the HTML when its clause is hidden in an HTML comment", () => {
    const fresh = body("Freshness and ambiguity").replace(ROWS[2]?.quote ?? "", `<!-- ${ROWS[2]?.quote ?? ""} -->`);
    const lines = docs09Failures(doc09(fresh, body("Data retention and privacy")));
    expect(named(lines)).toEqual(["sentence 3"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  const doc14 = (extra = "", lead = ""): string => `# ${DOC_14_PARENT}\n\n## Fault-injection locations\n\nText.\n\n${lead}## ${DOC_14_SECTION}\n\n${DOC14_PARAGRAPH_ONE}\n\n${DOC14_PARAGRAPH_TWO}\n${extra}`;

  it("F1 accepts the docs/14 section as written", () => {
    expect(docs14Failures(doc14())).toEqual([]);
  });

  it("F2 goes red when the falsifier rule is qualified by a trailing clause, qualified by a new paragraph, or moved out of its section", () => {
    expect(docs14Failures(doc14().replace(FALSIFIER_QUOTE, `${FALSIFIER_QUOTE} Unless the package is minor.`)).length).toBeGreaterThan(0);
    expect(docs14Failures(doc14("\nA falsifier is optional for small packages.\n")).length).toBeGreaterThan(0);
    expect(docs14Failures(doc14().replace(FALSIFIER_QUOTE, "")).length).toBeGreaterThan(0);
  });
});
