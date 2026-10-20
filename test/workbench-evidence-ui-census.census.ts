/**
 * wb-6ze.41 (VC-5/W15): census falsifier for docs/workbench/20-evidence-loader-contract.md "UI integration" and
 * "Owner rulings on the design conflicts" (the sibling wb-6ze.40 binds "Producer mapping" and "Refusal and freshness
 * rules" of the same document). A census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts), judged in wb-u62 REPORT MODE: a member of the sequenced census class (owner program ruling
 * 2026-10-16: one post-u62 adoption cut per census, report mode, no bare-text scanning).
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test
 * that would fail if a critical guarantee was quietly weakened."
 *
 * Every half of the seventeen docs rows (seven UI clauses, ten numbered rulings) binds a falsifiable fragment of the
 * contract to existing cases by file and VERBATIM title, or is recorded "unpinned" or "superseded" with a written reason
 * that never counts as satisfied. The leg executes no pinned case and no test run: judge() from the shared helper
 * test/helpers/census.ts reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test` before the census step runs), so a pin counts only when the gate's own run collected it exactly once,
 * recorded it passed, and its body asserts (the helper's three legs, fail-closed). A renamed, deleted, duplicated,
 * skipped, todo, inverted, excluded or unregistered pinned case reads red, naming the row, the half, the file, the title
 * and the cause, as far as the helper's resolvable-construct roster and its named residuals reach
 * (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls: every title is located by
 * the helper, from the report, never from bare text. The one source read it makes is the AST read of the ui-5 literal
 * (below), anchored at the call site the report locates.
 *
 * Tiers. Every pin is a default-gate case, so the vouching report is the default gate's (judge() refuses a pin of any
 * other tier, tier-mismatch; a pin of a file vitest.config.ts excludes is not collected and reads red). The docs/14 truth
 * label ("fixture pass" | "adversarial pass") is carried beside it as a recorded judgment: "adversarial pass" is a
 * judgment (does the case try to defeat the guarantee) no report verifies, and this leg says so. No pin carries a live
 * or native label; a default-gate presence check never reports a live, native or scale pass (the tier relabel falsifier).
 *
 * ui-5 literal. The row binds the literal "not loaded (Enter)" to the BODY of the A1 case, not to a file-wide count (the
 * literal occurs twice in the inspector suite): literalInCase() parses the source with the TypeScript AST, anchors at
 * the call the report locates, and counts the literal only inside a string or template literal of the case's arguments
 * past its title, so a comment, a sibling case, the title itself or a split literal never counts (B-rows).
 *
 * Docs exactness. Each section renders (docsSection / sectionMatches) as exactly its frozen blocks: the single UI
 * paragraph, and the ten numbered rulings as one ordered list, each item whole, under the unique level-2 heading of the
 * level-1 parent, bounded at the next level-1/2 heading or EOF. The clause fields of the halves are verbatim fragments
 * that must render in their own paragraph or list item, and a ruling's halves must join back to the whole ruling text.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16): the table pins its own row/half/pin shape as two
 * literals, SHAPE (id, half, status, pin count, clause length) and PIN_SHAPE (every pin's file, title and literal), so
 * deleting one pin, shortening a clause or swapping a pin for an unrelated passing case reds the census (CT-rows).
 *
 * Pin-fit readings (stated, not hidden): ruling-7 is about the e/enter deltas INSIDE the details view; A1 is the
 * closest case, A2 (j/k reset) and A3 (e outside the details view) bound the delta from either side. The ruling-2
 * redaction half evidences the redact-after-strip order the store pipeline uses; the idempotence half (wb-3l3, landed)
 * is evidenced by the redaction suite's second-pass rows. ruling-6 binds the loader grant AND the host transcript path
 * (the landed security-pi-tools refusal case).
 *
 * Record honesty (corrections to the refused dac18fd/89c9ac2 deliveries this file supersedes, neither of which landed):
 * those cuts ran their own collect-only child runs from inside the default gate (the executing-mode class this program
 * retired), carried an unreproducible recorded red, "22 distinct" titles that were 20 over 24 pin entries, a tier field
 * that was constant-vs-constant and a frozen ruling-2 line that wb-3l3 has since rewritten.
 *
 * Disclosed limits (never claimed as covered): a case whose assertions live only in a helper it calls (the helper's
 * third leg counts an assertion call in the case body itself), a clause that stays in docs/20 but is qualified by prose
 * in another document, and everything this file does not execute: it never runs a pinned case, never renders, and
 * claims no live, native or scale pass from a title being present.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SECTION_SIGN = String.fromCodePoint(0xa7);
const SELF = "test/workbench-evidence-ui-census.census.ts";
const DOCS_FILE = "docs/workbench/20-evidence-loader-contract.md";
const DOCS_PARENT = `20 ${String.fromCodePoint(0x2014)} EvidenceLoader contract (workbench.evidence-loader/v1)`;

/** docs/14 section "Truth labels and release gates": the labels a default-gate pin may carry (live labels need a live tier leg). */
const TRUTH_LABELS = ["code present", "fixture pass", "adversarial pass"] as const;
type Truth = (typeof TRUTH_LABELS)[number];
const LIVE_LABELS: readonly string[] = ["live SDK pass", "scale benchmark pass"];

type Status = "pinned" | "unpinned" | "superseded";
type Section = "ui" | "rulings";

interface Pin {
  readonly file: string;
  /** Verbatim case title, exactly as registered (for an it.each pin, the literal template). */
  readonly title: string;
  /** Recorded docs/14 judgment label; the vouching report is the default gate's for every pin of this census. */
  readonly tier: Truth;
  /** An it.each pin: the least number of table rows the template must register, each passed. */
  readonly each?: number;
  /** ui-5 only: a literal that must sit in a string of THIS case's body (AST read), not anywhere else in the file. */
  readonly bodyLiteral?: string;
  /** A stated pin-fit reading, when the case is the closest available rather than an exact match. */
  readonly reading?: string;
}

interface Half {
  readonly id: string;
  /** Verbatim fragment of the docs text this half covers. */
  readonly clause: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** Unpinned and superseded halves: why no case counts. */
  readonly reason?: string;
}

interface Row {
  readonly id: string;
  readonly section: Section;
  /** For a ruling: its number (the frozen list item). For a UI clause: 0. */
  readonly ruling: number;
  readonly halves: readonly Half[];
}

/** The frozen docs/20 "UI integration" body: its single paragraph, as the markdown source says it. */
const UI_MARKDOWN =
  'Mirrors the lazy transcript pattern: the inspector details view renders per-ref state from a synchronous `store.get`; Enter on a selected ref emits a `load-evidence` action the dialog wires to `store.request`; `e` inside details advances the evidence selection; j/k reset it. `not-requested` renders as "not loaded (Enter)", never optimistic loading. Dialog close calls `abortAll` and never cancels the workflow. With no store supplied the details view renders byte-identical to today.';

/** The frozen docs/20 "Owner rulings on the design conflicts" body: every numbered item, whole, in order. */
const RULINGS_MARKDOWN: readonly string[] = [
  "`loaded` equals the full `EvidenceContent` (kind, sourceBasis, freshness included).",
  "The double redaction in the sanitizer order is deliberate. A second pass is idempotent or over-redacts only, never a leak: a marker an earlier pass left as an assignment's whole value stays as it is when only closing brackets and a value end follow it, and any other change a second pass makes hides more text and shows none (wb-3l3).",
  "Loaders take the full request, not a bare ref; routing is provider-first.",
  "Cache keys are producer-qualified, matching the projection.",
  "Forge nodes will emit `forge-operation:<operation_id>` evidence refs from native-evidence shaping (parent slice); the loader also accepts synthesis from the owning ref until then. The parent slice implemented this: `forge.gate.status` shaping now emits `forge-operation:<operation_id>` whenever the native payload carries a validated operation id.",
  "A new `claude:transcript` grant gates the loader, and the existing `c` transcript path adopts the same grant in the parent slice so the two paths cannot diverge. The parent slice implemented the grant: the host transcript path now refuses with a typed permission message unless `claude:transcript` is granted.",
  "The `e`/`enter` reducer deltas inside the details view are accepted behavior changes.",
  "Zero-width characters are stripped in the loader's own preview pass; the acceptance wording is width-boundedness.",
  "Store-level default budgets with per-request overrides.",
  "Until the parent wires `load-evidence`, Enter renders the inert not-loaded hint.",
];

/** What a reader sees of a markdown fragment here: the code-span markers are the only inline markup the two sections use. */
const renderedOf = (markdown: string): string => markdown.replaceAll("`", "");

const SECTION_HEADING: Readonly<Record<Section, string>> = { ui: "UI integration", rulings: "Owner rulings on the design conflicts" };
const SECTION_ORDER: readonly Section[] = ["ui", "rulings"];
const sectionBlocks = (section: Section): readonly RenderedBlock[] =>
  section === "ui"
    ? [{ kind: "paragraph", text: renderedOf(UI_MARKDOWN), markdown: UI_MARKDOWN }]
    : [{ kind: "list", ordered: true, items: RULINGS_MARKDOWN.map(markdown => ({ text: renderedOf(markdown), markdown })) }];

const INSPECTOR = "test/workbench-inspector.test.ts";
const LOADER = "test/workbench-evidence-loader.test.ts";
const WIRING = "test/workbench-evidence-wiring.test.ts";
const NATIVE_EVIDENCE = "test/workbench-native-evidence.test.ts";
const FORGE_OBSERVER = "test/workbench-forge-observer.test.ts";
const NATIVE_DETAILS = "test/workbench-native-details.test.ts";
const SECURITY_PI_TOOLS = "test/workbench-security-pi-tools.test.ts";
const REDACTION = "test/workbench-redaction.test.ts";

const fixture = (file: string, title: string, extra: Pick<Pin, "each" | "bodyLiteral" | "reading"> = {}): Pin => ({ file, title, tier: "fixture pass", ...extra });
const adversarial = (file: string, title: string, extra: Pick<Pin, "each" | "bodyLiteral" | "reading"> = {}): Pin => ({ file, title, tier: "adversarial pass", ...extra });
const pinned = (id: string, clause: string, pins: readonly Pin[]): Half => ({ id, clause, status: "pinned", pins });
const whole = (clause: string, pins: readonly Pin[]): readonly Half[] => [pinned("whole", clause, pins)];
const ruling = (n: number): string => RULINGS_MARKDOWN[n - 1] ?? "";

const A1 = "A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection";
const A2 = "A2 j/k reset the evidence selection";
const A3 = "A3 e outside the details view still opens it; a node without references has no load action";
const A7 = "A7 Esc and ctrl+c while loading only close; abort stops the local read and nothing touches the projection";
const A8 = "A8 layoutInspector is synchronous and never awaits a pending loader";
const A9 = "A9 without a store the details view is the pre-existing rendering and Enter still folds";
const A11 = "A11 claude evidence is refused unauthorized without the claude:transcript grant, rendered byte-identical to a revoked grant, and loaded with it";
const A12 = "A12 the dialog does not treat load-evidence as close or cancel";

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
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
  { id: "ui-1", section: "ui", ruling: 0, halves: whole("the inspector details view renders per-ref state from a synchronous `store.get`", [fixture(INSPECTOR, A8)]) },
  {
    id: "ui-2",
    section: "ui",
    ruling: 0,
    halves: whole("Enter on a selected ref emits a `load-evidence` action the dialog wires to `store.request`", [fixture(INSPECTOR, A1), fixture(WIRING, "wires Enter in the details view to store.request for the focused reference")]),
  },
  {
    id: "ui-3",
    section: "ui",
    ruling: 0,
    halves: whole("`e` inside details advances the evidence selection", [
      fixture(INSPECTOR, A1),
      fixture(INSPECTOR, A3, { reading: "A3 pins the outside-details guard that bounds the inside-details advance; A1 is the case that asserts the advance." }),
    ]),
  },
  { id: "ui-4", section: "ui", ruling: 0, halves: whole("j/k reset it", [fixture(INSPECTOR, A2)]) },
  {
    id: "ui-5",
    section: "ui",
    ruling: 0,
    halves: [
      pinned("not-loaded-label", '`not-requested` renders as "not loaded (Enter)"', [fixture(INSPECTOR, A1, { bodyLiteral: "not loaded (Enter)" })]),
      pinned("never-optimistic", "never optimistic loading", [fixture(INSPECTOR, A1), fixture(INSPECTOR, A12)]),
    ],
  },
  {
    id: "ui-6",
    section: "ui",
    ruling: 0,
    halves: whole("Dialog close calls `abortAll` and never cancels the workflow", [fixture(WIRING, "wires dialog close to abortAll and never to workflow cancellation"), fixture(INSPECTOR, A7)]),
  },
  { id: "ui-7", section: "ui", ruling: 0, halves: whole("With no store supplied the details view renders byte-identical to today", [fixture(INSPECTOR, A9)]) },
  {
    id: "ruling-1",
    section: "rulings",
    ruling: 1,
    halves: whole(ruling(1), [fixture(LOADER, "keeps only digest-shaped sourceBasis, a bounded sanitized receipt, and honors stale freshness")]),
  },
  {
    id: "ruling-2",
    section: "rulings",
    ruling: 2,
    halves: [
      pinned("redaction-order", "The double redaction in the sanitizer order is deliberate.", [
        fixture(LOADER, "redacts secrets before display, including one that would straddle a chunk boundary"),
        fixture(REDACTION, "does not regress the redact-after-strip order the store pipeline uses", { reading: "Proves the redact-after-strip order the store pipeline uses, which is the order the double redaction sits in." }),
      ]),
      pinned("idempotent-or-over-redacts", "A second pass is idempotent or over-redacts only, never a leak: a marker an earlier pass left as an assignment's whole value stays as it is when only closing brackets and a value end follow it,", [
        adversarial(REDACTION, "redact(redact(x)) equals redact(x) for %s", { each: 12 }),
        adversarial(REDACTION, "keeps the closing brace of a JSON-embedded secret on the second pass"),
      ]),
      pinned("any-other-change-hides-more", "and any other change a second pass makes hides more text and shows none (wb-3l3).", [
        adversarial(REDACTION, "only over-redacts where a second pass still changes the text"),
        adversarial(REDACTION, "still redacts a raw value that merely follows an already-redacted marker field"),
      ]),
    ],
  },
  { id: "ruling-3", section: "rulings", ruling: 3, halves: whole(ruling(3), [fixture(LOADER, "routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader")]) },
  { id: "ruling-4", section: "rulings", ruling: 4, halves: whole(ruling(4), [fixture(LOADER, "keys entries producer-qualified so same-scope cross-producer ref strings cannot collide")]) },
  {
    id: "ruling-5",
    section: "rulings",
    ruling: 5,
    halves: [
      pinned("forge-nodes-emit", "Forge nodes will emit `forge-operation:<operation_id>` evidence refs from native-evidence shaping (parent slice);", [
        fixture(FORGE_OBSERVER, "projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference"),
        fixture(NATIVE_DETAILS, "lists a forge-operation evidence ref in the node details pane"),
      ]),
      {
        id: "synthesis-until-then",
        clause: "the loader also accepts synthesis from the owning ref until then.",
        status: "superseded",
        pins: [],
        reason:
          "Historical interim: the parent slice now emits forge-operation refs from native-evidence shaping, and the host wiring re-reads only a ref an observed node lists as evidence. No case exercises loader-side synthesis from the owning ref, so the clause is recorded superseded, never pinned and never counted as passed.",
      },
      pinned("parent-slice-implemented", "The parent slice implemented this: `forge.gate.status` shaping now emits `forge-operation:<operation_id>` whenever the native payload carries a validated operation id.", [
        fixture(NATIVE_EVIDENCE, "emits exactly one forge-operation ref from a validated native operation id"),
      ]),
    ],
  },
  {
    id: "ruling-6",
    section: "rulings",
    ruling: 6,
    halves: [
      pinned("loader-grant", "A new `claude:transcript` grant gates the loader,", [
        adversarial(INSPECTOR, A11),
        adversarial(LOADER, "claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves"),
      ]),
      pinned(
        "host-transcript-path",
        "and the existing `c` transcript path adopts the same grant in the parent slice so the two paths cannot diverge. The parent slice implemented the grant: the host transcript path now refuses with a typed permission message unless `claude:transcript` is granted.",
        [adversarial(SECURITY_PI_TOOLS, "refuses the transcript read with a typed permission message when the grant is absent")],
      ),
    ],
  },
  {
    id: "ruling-7",
    section: "rulings",
    ruling: 7,
    halves: whole(ruling(7), [
      fixture(INSPECTOR, A1, { reading: "Closest case: e advances and Enter loads INSIDE the details view, which is the delta the ruling accepts." }),
      fixture(INSPECTOR, A2, { reading: "Bounds the delta: j/k reset the evidence selection." }),
      fixture(INSPECTOR, A3, { reading: "Bounds the delta from outside: e outside the details view is unchanged." }),
    ]),
  },
  { id: "ruling-8", section: "rulings", ruling: 8, halves: whole(ruling(8), [adversarial(LOADER, "strips terminal escapes, bidi and zero-width characters from preview lines")]) },
  { id: "ruling-9", section: "rulings", ruling: 9, halves: whole(ruling(9), [fixture(LOADER, "a per-request override can only lower the store budget")]) },
  {
    id: "ruling-10",
    section: "rulings",
    ruling: 10,
    halves: [
      {
        id: "whole",
        clause: ruling(10),
        status: "superseded",
        pins: [],
        reason: "wb-6ze.17 landed the load-evidence wiring; the inert not-loaded hint was the pre-wiring state. The ruling stays in the docs as history and is never pinned and never counted as passed.",
      },
    ],
  },
]);

/** Frozen shape (rule 16), derived from ROWS at this cut's base: id/half:status:pins:clause length. */
const SHAPE: readonly string[] = [
  "ui-1/whole:pinned:1:79",
  "ui-2/whole:pinned:2:90",
  "ui-3/whole:pinned:2:50",
  "ui-4/whole:pinned:1:12",
  "ui-5/not-loaded-label:pinned:1:47",
  "ui-5/never-optimistic:pinned:2:24",
  "ui-6/whole:pinned:2:60",
  "ui-7/whole:pinned:1:71",
  "ruling-1/whole:pinned:1:83",
  "ruling-2/redaction-order:pinned:2:58",
  "ruling-2/idempotent-or-over-redacts:pinned:2:193",
  "ruling-2/any-other-change-hides-more:pinned:2:81",
  "ruling-3/whole:pinned:1:73",
  "ruling-4/whole:pinned:1:59",
  "ruling-5/forge-nodes-emit:pinned:2:113",
  "ruling-5/synthesis-until-then:superseded:0:65",
  "ruling-5/parent-slice-implemented:pinned:1:167",
  "ruling-6/loader-grant:pinned:2:49",
  "ruling-6/host-transcript-path:pinned:1:259",
  "ruling-7/whole:pinned:3:85",
  "ruling-8/whole:pinned:1:113",
  "ruling-9/whole:pinned:1:55",
  "ruling-10/whole:superseded:0:80",
];

/** Frozen pin identities (rule 16, pin level): half/file/title, with the each count and the body literal when a pin carries one. */
const PIN_SHAPE: readonly string[] = [
  "ui-1/whole|test/workbench-inspector.test.ts|A8 layoutInspector is synchronous and never awaits a pending loader|fixture pass||",
  "ui-2/whole|test/workbench-inspector.test.ts|A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection|fixture pass||",
  "ui-2/whole|test/workbench-evidence-wiring.test.ts|wires Enter in the details view to store.request for the focused reference|fixture pass||",
  "ui-3/whole|test/workbench-inspector.test.ts|A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection|fixture pass||",
  "ui-3/whole|test/workbench-inspector.test.ts|A3 e outside the details view still opens it; a node without references has no load action|fixture pass||",
  "ui-4/whole|test/workbench-inspector.test.ts|A2 j/k reset the evidence selection|fixture pass||",
  "ui-5/not-loaded-label|test/workbench-inspector.test.ts|A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection|fixture pass||not loaded (Enter)",
  "ui-5/never-optimistic|test/workbench-inspector.test.ts|A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection|fixture pass||",
  "ui-5/never-optimistic|test/workbench-inspector.test.ts|A12 the dialog does not treat load-evidence as close or cancel|fixture pass||",
  "ui-6/whole|test/workbench-evidence-wiring.test.ts|wires dialog close to abortAll and never to workflow cancellation|fixture pass||",
  "ui-6/whole|test/workbench-inspector.test.ts|A7 Esc and ctrl+c while loading only close; abort stops the local read and nothing touches the projection|fixture pass||",
  "ui-7/whole|test/workbench-inspector.test.ts|A9 without a store the details view is the pre-existing rendering and Enter still folds|fixture pass||",
  "ruling-1/whole|test/workbench-evidence-loader.test.ts|keeps only digest-shaped sourceBasis, a bounded sanitized receipt, and honors stale freshness|fixture pass||",
  "ruling-2/redaction-order|test/workbench-evidence-loader.test.ts|redacts secrets before display, including one that would straddle a chunk boundary|fixture pass||",
  "ruling-2/redaction-order|test/workbench-redaction.test.ts|does not regress the redact-after-strip order the store pipeline uses|fixture pass||",
  "ruling-2/idempotent-or-over-redacts|test/workbench-redaction.test.ts|redact(redact(x)) equals redact(x) for %s|adversarial pass|12|",
  "ruling-2/idempotent-or-over-redacts|test/workbench-redaction.test.ts|keeps the closing brace of a JSON-embedded secret on the second pass|adversarial pass||",
  "ruling-2/any-other-change-hides-more|test/workbench-redaction.test.ts|only over-redacts where a second pass still changes the text|adversarial pass||",
  "ruling-2/any-other-change-hides-more|test/workbench-redaction.test.ts|still redacts a raw value that merely follows an already-redacted marker field|adversarial pass||",
  "ruling-3/whole|test/workbench-evidence-loader.test.ts|routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader|fixture pass||",
  "ruling-4/whole|test/workbench-evidence-loader.test.ts|keys entries producer-qualified so same-scope cross-producer ref strings cannot collide|fixture pass||",
  "ruling-5/forge-nodes-emit|test/workbench-forge-observer.test.ts|projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference|fixture pass||",
  "ruling-5/forge-nodes-emit|test/workbench-native-details.test.ts|lists a forge-operation evidence ref in the node details pane|fixture pass||",
  "ruling-5/parent-slice-implemented|test/workbench-native-evidence.test.ts|emits exactly one forge-operation ref from a validated native operation id|fixture pass||",
  "ruling-6/loader-grant|test/workbench-inspector.test.ts|A11 claude evidence is refused unauthorized without the claude:transcript grant, rendered byte-identical to a revoked grant, and loaded with it|adversarial pass||",
  "ruling-6/loader-grant|test/workbench-evidence-loader.test.ts|claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves|adversarial pass||",
  "ruling-6/host-transcript-path|test/workbench-security-pi-tools.test.ts|refuses the transcript read with a typed permission message when the grant is absent|adversarial pass||",
  "ruling-7/whole|test/workbench-inspector.test.ts|A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection|fixture pass||",
  "ruling-7/whole|test/workbench-inspector.test.ts|A2 j/k reset the evidence selection|fixture pass||",
  "ruling-7/whole|test/workbench-inspector.test.ts|A3 e outside the details view still opens it; a node without references has no load action|fixture pass||",
  "ruling-8/whole|test/workbench-evidence-loader.test.ts|strips terminal escapes, bidi and zero-width characters from preview lines|adversarial pass||",
  "ruling-9/whole|test/workbench-evidence-loader.test.ts|a per-request override can only lower the store budget|fixture pass||",
];

const shapeOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.halves.map(half => `${row.id}/${half.id}:${half.status}:${half.pins.length}:${half.clause.length}`));
const pinShapeOf = (rows: readonly Row[]): string[] =>
  rows.flatMap(row =>
    row.halves.flatMap(half => half.pins.map(entry => `${row.id}/${half.id}|${entry.file}|${entry.title}|${entry.tier}|${entry.each ?? ""}|${entry.bodyLiteral ?? ""}`)),
  );

/** Expected census outcome: promoting a half (or losing one) is an edit to this file, never silent. */
const PINNED_HALVES: readonly string[] = SHAPE.filter(line => line.includes(":pinned:")).map(line => line.slice(0, line.indexOf(":")));
const SUPERSEDED_HALVES: readonly string[] = ["ruling-5/synthesis-until-then", "ruling-10/whole"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** Every pinned half that holds pins, with its pins as the helper's CasePin: all default-gate (the report this leg reads). */
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER, ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }) });
const JUDGED = ROWS.flatMap(row => row.halves.filter(half => half.pins.length > 0).map(half => ({ key: `${row.id}/${half.id}`, half })));

/** One line per pin that is not ok, naming the half; the helper's why names the file, title, tier and cause. */
const failures = (key: string, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `half ${key}: ${verdict.code}: ${verdict.why}`);

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** Where the default gate's own report locates a case: its 1-based line and the column of its call (the report's anchor for the AST legs). */
function reportLocation(reportPath: string, file: string, title: string): { readonly line: number; readonly column: number } | undefined {
  const parsed: unknown = JSON.parse(readFileSync(reportPath, "utf8"));
  const results = isRecord(parsed) && Array.isArray(parsed.testResults) ? (parsed.testResults as unknown[]) : [];
  const hits: { line: number; column: number }[] = [];
  for (const entry of results) {
    if (!isRecord(entry) || typeof entry.name !== "string" || !entry.name.endsWith(`/${file}`) || !Array.isArray(entry.assertionResults)) continue;
    for (const assertion of entry.assertionResults as unknown[]) {
      if (!isRecord(assertion) || assertion.title !== title || !isRecord(assertion.location)) continue;
      const { line, column } = assertion.location;
      if (typeof line === "number" && typeof column === "number") hits.push({ line, column });
    }
  }
  return hits.length === 1 ? hits[0] : undefined;
}

/**
 * ui-5: is `literal` inside a string or template literal of the case's arguments past its title, in the call the report
 * locates? An AST read: a comment, a sibling case, the title itself, a split literal and a located non-call never count.
 */
function literalInCase(source: string, line: number, column: number, literal: string): boolean {
  const sf = ts.createSourceFile("case.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const anchors = new Set([column, column - 1].filter(candidate => candidate >= 0).map(candidate => sf.getPositionOfLineAndCharacter(line - 1, candidate)));
  let call: ts.CallExpression | undefined;
  const find = (node: ts.Node): void => {
    if (call !== undefined) return;
    if (ts.isCallExpression(node) && anchors.has(node.getStart(sf))) {
      call = node;
      return;
    }
    ts.forEachChild(node, find);
  };
  find(sf);
  if (call === undefined) return false;
  let found = false;
  const scan = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (node.text.includes(literal)) found = true;
    }
    ts.forEachChild(node, scan);
  };
  for (const argument of call.arguments.slice(1)) scan(argument);
  return found;
}

/** The position of a needle in a source, as the report would locate it (1-based line, 0-based column). */
const at = (source: string, needle: string): { line: number; column: number } => {
  const index = source.indexOf(needle);
  if (index < 0) throw new Error(`needle ${needle} is not in the fixture`);
  const before = source.slice(0, index).split("\n");
  return { line: before.length, column: before[before.length - 1]?.length ?? 0 };
};

/**
 * Every docs drift, each naming the half or the section it breaks. The per-half clause checks read the section's own
 * paragraph or list item and run independently of the exactness check, so a dropped or reworded clause names its half.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  for (const section of SECTION_ORDER) {
    const heading = SECTION_HEADING[section];
    const found = docsSection(markdown, heading, 2, [DOCS_PARENT]);
    if (!found.ok) {
      out.push(`${DOCS_FILE} ${SECTION_SIGN} ${heading}: the section is refused: ${found.why}`);
      continue;
    }
    const block = found.blocks[0];
    for (const row of ROWS) {
      if (row.section !== section) continue;
      const host = block?.kind === "paragraph" ? block.markdown : block?.kind === "list" && row.ruling > 0 ? (block.items[row.ruling - 1]?.markdown ?? "") : "";
      for (const half of row.halves) {
        if (!host.includes(half.clause)) out.push(`half ${row.id}/${half.id}: its clause no longer renders verbatim in ${DOCS_FILE} ${SECTION_SIGN} ${heading}`);
      }
    }
    const exact = sectionMatches(found, sectionBlocks(section));
    if (!exact.ok) out.push(`${DOCS_FILE} ${SECTION_SIGN} ${heading} is not exactly its frozen blocks: ${exact.why}`);
  }
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bodies under the real heading shape, never the live text. */
const synthetic = (ui: string = UI_MARKDOWN, rulings: readonly string[] = RULINGS_MARKDOWN, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Types\n\nOther text.\n\n## Producer mapping\n\n- a -> b\n\n## ${SECTION_HEADING.ui}\n\n${ui}\n\n## ${SECTION_HEADING.rulings}\n\n${rulings.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n${tail}`;
const swap = (document: string, from: string, to: string): string => {
  if (!document.includes(from)) throw new Error(`the mutant does not apply: ${from}`);
  return document.replace(from, to);
};
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("half ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-6ze.41 docs/20 UI-integration and owner-rulings census (report mode): the table and the requirement text", () => {
  it("AC1: the table holds the seventeen frozen rows (7 UI clauses, 10 numbered rulings), deeply frozen, with unique ids and half ids", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS).toHaveLength(17);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(17);
    expect(ROWS.filter(row => row.section === "ui")).toHaveLength(7);
    expect(ROWS.filter(row => row.section === "rulings").map(row => row.ruling)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const row of ROWS) expect(new Set(row.halves.map(half => half.id)).size, row.id).toBe(row.halves.length);
  });

  it("AC1: the two sections render exactly their frozen blocks (HTML-free, whole-section equality) and every half's clause renders verbatim in its own paragraph or item", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    for (const section of SECTION_ORDER) {
      expect(sectionMatches(docsSection(readRepo(DOCS_FILE), SECTION_HEADING[section], 2, [DOCS_PARENT]), sectionBlocks(section)), section).toEqual({ ok: true, why: "" });
    }
  });

  it("AC1: a ruling's halves join back to the whole ruling text, so no part of a ruling is left unclassified", () => {
    for (const row of ROWS.filter(candidate => candidate.section === "rulings")) {
      expect(row.halves.map(half => half.clause).join(" "), row.id).toBe(ruling(row.ruling));
    }
  });

  it("AC1: the seven UI clauses are the seven ';'-separated and sentence clauses of the paragraph, in order", () => {
    const clauses = ROWS.filter(row => row.section === "ui").flatMap(row => row.halves.map(half => half.clause));
    let from = 0;
    for (const clause of clauses) {
      const index = UI_MARKDOWN.indexOf(clause, from);
      expect(index, clause).toBeGreaterThanOrEqual(from);
      from = index + clause.length;
    }
  });

  it("AC3: a pinned half holds pins and no reason; an unpinned or superseded half holds a reason and no pins; a pin's label is a default-gate docs/14 label", () => {
    for (const row of ROWS) {
      for (const half of row.halves) {
        const key = `${row.id}/${half.id}`;
        if (half.status === "pinned") {
          expect(half.pins.length, `half ${key}: a pinned half has pins`).toBeGreaterThan(0);
          expect(half.reason, `half ${key}: a pinned half carries no reason`).toBeUndefined();
        } else {
          expect(half.pins, `half ${key}: a ${half.status} half carries no pins`).toEqual([]);
          expect((half.reason ?? "").trim().length, `half ${key}: a ${half.status} half needs a written reason`).toBeGreaterThan(40);
        }
        for (const entry of half.pins) {
          expect(TRUTH_LABELS, `half ${key}: ${entry.title}`).toContain(entry.tier);
          expect(LIVE_LABELS, `half ${key}: a live label needs a live tier leg this census does not have`).not.toContain(entry.tier);
        }
      }
    }
  });

  it("AC3: the superseded halves are exactly ruling-5's interim synthesis clause and ruling 10, so neither is ever counted as passed", () => {
    const superseded = ROWS.flatMap(row => row.halves.filter(half => half.status === "superseded").map(half => `${row.id}/${half.id}`));
    expect(superseded).toEqual(SUPERSEDED_HALVES);
    expect(ROWS.flatMap(row => row.halves.filter(half => half.status === "unpinned"))).toEqual([]);
    const reason = (id: string, half: string): string => ROWS.find(row => row.id === id)?.halves.find(candidate => candidate.id === half)?.reason ?? "";
    expect(reason("ruling-10", "whole")).toContain("wb-6ze.17");
    expect(reason("ruling-5", "synthesis-until-then")).toContain("superseded");
  });

  it("AC3: the pinned halves are exactly the expected list, so promoting or losing a half is an edit to this file", () => {
    expect(ROWS.flatMap(row => row.halves.filter(half => half.status === "pinned").map(half => `${row.id}/${half.id}`))).toEqual(PINNED_HALVES);
    expect(PINNED_HALVES).toHaveLength(21);
  });

  it("FROZEN SHAPE (rule 16): the row/half/pin-count/clause-length shape of the table is the literal list, so a deleted pin or a shortened clause reds here", () => {
    expect(shapeOf(ROWS)).toEqual(SHAPE);
  });

  it("FROZEN SHAPE (rule 16): every pin's half, file, title, label, each count and body literal is the literal list, so a swapped pin reds here", () => {
    expect(pinShapeOf(ROWS)).toEqual(PIN_SHAPE);
  });

  it.each(JUDGED)("AC2 half $key: every pinned case is collected once, passed and asserting in the default gate's own report", ({ key, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(key, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("AC2 ui-5: the literal \"not loaded (Enter)\" sits in a string of the A1 case's own body, located by the report (AST read), not file-wide", () => {
    const pin = ROWS.find(row => row.id === "ui-5")?.halves[0]?.pins[0];
    expect(pin?.bodyLiteral).toBe("not loaded (Enter)");
    if (pin === undefined || pin.bodyLiteral === undefined) throw new Error("ui-5 holds no body-literal pin");
    const where = reportLocation(REPORT, pin.file, pin.title);
    expect(where, "the report locates the A1 case exactly once").toBeDefined();
    if (where === undefined) throw new Error("A1 is not located by the report");
    expect(literalInCase(readRepo(pin.file), where.line, where.column, pin.bodyLiteral)).toBe(true);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.map(entry => entry.module).filter(module => module.includes("child_process") || module.includes("worker_threads"))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6ze.41 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string, half: string): { key: string; entry: Pin } => {
    const entry = ROWS.find(row => row.id === id)?.halves.find(candidate => candidate.id === half)?.pins[0];
    if (entry === undefined) throw new Error(`half ${id}/${half} holds no pin`);
    return { key: `${id}/${half}`, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the half, the file and the title", () => {
    const { key, entry } = firstPin("ruling-6", "host-transcript-path");
    const wrong = { ...entry, title: entry.title.replace("typed permission", "typed permissioN") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(key, verdicts);
    expect(line).toContain("half ruling-6/host-transcript-path");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a half removed from the table fails the half-set pin", () => {
    expect(ROWS.flatMap(row => row.halves.filter(half => half.status === "pinned" && half.id !== "host-transcript-path").map(half => `${row.id}/${half.id}`))).not.toEqual(PINNED_HALVES);
  });

  it("M3: a pin promoted without a title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("ruling-3", "whole");
    const [verdict] = judge(REPORT, [casePin({ ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a pin pointed at a file the default gate never ran, or one vitest.config.ts excludes, is red, not collected", () => {
    const { entry } = firstPin("ruling-4", "whole");
    const [missing] = judge(REPORT, [casePin({ ...entry, file: "test/workbench-no-such-file.test.ts" })]);
    expect(missing?.ok).toBe(false);
    expect(["unreadable", "not-collected", "unmapped-location", "absent"]).toContain(missing?.code);
    const [excluded] = judge(REPORT, [casePin({ ...entry, file: "test/workbench-claude-control-live.test.ts" })]);
    expect(excluded?.ok).toBe(false);
  });

  it("M5: a pin relabelled to a non-default tier is refused by the default report, never carried from a title's presence", () => {
    const { entry } = firstPin("ruling-8", "whole");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "native-read" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M6: a half's pins judged against a report that does not hold them are all red (an empty report cannot pass)", () => {
    const half = ROWS.find(row => row.id === "ruling-7")?.halves[0];
    const verdicts = judge(join(ROOT, ".forge", "no-such-report.json"), (half?.pins ?? []).map(entry => casePin(entry)));
    expect(verdicts).toHaveLength(3);
    expect(verdicts.every(verdict => !verdict.ok)).toBe(true);
  });

  it("M7: an it.each pin asking for more table rows than the template registers is red", () => {
    const { entry } = firstPin("ruling-2", "idempotent-or-over-redacts");
    expect(entry.each).toBe(12);
    const [verdict] = judge(REPORT, [casePin({ ...entry, each: 999 })]);
    expect(verdict?.ok).toBe(false);
  });
});

describe("wb-6ze.41 ui-5 literal falsifiers (AST read of the case body, synthetic sources)", () => {
  const T = "A1 the pinned case";
  const body = (inner: string): string => `describe("suite", () => {\n  it("${T}", () => {\n    ${inner}\n  });\n});\n`;
  const probe = (source: string, needle: string): boolean => {
    const where = at(source, needle);
    return literalInCase(source, where.line, where.column, "not loaded (Enter)");
  };
  const head = `it("${T}"`;

  it("B0: the literal inside an expect string of the pinned case stays green", () => {
    expect(probe(body('expect(text).toContain("not loaded (Enter)");'), head)).toBe(true);
  });

  it("B1: the literal removed from the pinned case reads red", () => {
    expect(probe(body("expect(text).toContain(1);"), head)).toBe(false);
  });

  it("B2: the literal only in a SIBLING case (the file-wide count would stay green) reads red", () => {
    const source = `${body("expect(1).toBe(1);")}it("sibling", () => {\n  expect(text).toContain("not loaded (Enter)");\n});\n`;
    expect(probe(source, head)).toBe(false);
  });

  it("B3: the literal only in a comment inside the pinned case reads red", () => {
    expect(probe(body('// "not loaded (Enter)"\n    expect(1).toBe(1);'), head)).toBe(false);
  });

  it("B4: the literal only in the pinned case's own title reads red", () => {
    const source = `describe("suite", () => {\n  it("${T} not loaded (Enter)", () => {\n    expect(1).toBe(1);\n  });\n});\n`;
    expect(probe(source, `it("${T} not loaded (Enter)"`)).toBe(false);
  });

  it("B5: the literal split across a concatenation reads red (fail-closed: a split literal is not the label)", () => {
    expect(probe(body('expect(text).toContain("not loaded " + "(Enter)");'), head)).toBe(false);
  });

  it("B6: a location that anchors no call (a comment line) reads red", () => {
    expect(literalInCase(`// header\n${body('expect(text).toContain("not loaded (Enter)");')}`, 1, 0, "not loaded (Enter)")).toBe(false);
  });

  it("B7: the literal in a template literal of the pinned case stays green", () => {
    expect(probe(body("expect(text).toContain(`not loaded (Enter)`);"), head)).toBe(true);
  });
});

describe("wb-6ze.41 frozen-shape falsifiers (rule 16: hollowing mutants of the table, throwaway in-memory copies)", () => {
  const mutate = (edit: (row: Row) => Row | undefined): Row[] => ROWS.flatMap(row => edit(row) ?? []);
  const dropPin = (id: string, halfId: string, index: number) => (row: Row): Row => ({
    ...row,
    halves: row.id === id ? row.halves.map(half => (half.id === halfId ? { ...half, pins: half.pins.filter((_pin, position) => position !== index) } : half)) : row.halves,
  });

  it("CT1: deleting one pin of a multi-pin row changes the shape (the pin count) and the pin shape", () => {
    const rows = mutate(dropPin("ui-2", "whole", 1));
    expect(shapeOf(rows)).not.toEqual(SHAPE);
    expect(pinShapeOf(rows)).not.toEqual(PIN_SHAPE);
  });

  it("CT1b: deleting one pin of a second row changes the shape too", () => {
    const rows = mutate(dropPin("ruling-7", "whole", 2));
    expect(shapeOf(rows)).not.toEqual(SHAPE);
    expect(pinShapeOf(rows)).not.toEqual(PIN_SHAPE);
  });

  it("CT2: shortening a requirement phrase changes the clause length in the shape", () => {
    const rows = mutate(row => ({ ...row, halves: row.id === "ui-6" ? row.halves.map(half => ({ ...half, clause: half.clause.replace(" and never cancels the workflow", "") })) : row.halves }));
    expect(shapeOf(rows)).not.toEqual(SHAPE);
  });

  it("CT3: swapping a pin to an unrelated passing case leaves the counts and changes only the pin shape", () => {
    const rows = mutate(row => ({
      ...row,
      halves: row.id === "ruling-9" ? row.halves.map(half => ({ ...half, pins: half.pins.map(entry => ({ ...entry, title: "A8 layoutInspector is synchronous and never awaits a pending loader", file: INSPECTOR })) })) : row.halves,
    }));
    expect(shapeOf(rows)).toEqual(SHAPE);
    expect(pinShapeOf(rows)).not.toEqual(PIN_SHAPE);
  });

  it("CT4: relabelling a superseded half as pinned, or flipping its status, changes the shape", () => {
    const rows = mutate(row => ({ ...row, halves: row.id === "ruling-10" ? row.halves.map(half => ({ ...half, status: "pinned" as const })) : row.halves }));
    expect(shapeOf(rows)).not.toEqual(SHAPE);
  });

  it("CT5: the unmutated copy reproduces both literals (the control)", () => {
    expect(shapeOf(mutate(row => row))).toEqual(SHAPE);
    expect(pinShapeOf(mutate(row => row))).toEqual(PIN_SHAPE);
  });
});

describe("wb-6ze.41 docs drift names the half or the section (synthetic document, rendered view)", () => {
  it("accepts the two sections exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(synthetic(undefined, undefined, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("D1 names half ruling-6/host-transcript-path when ruling 6's security sentence is weakened", () => {
    const lines = docsFailures(swap(synthetic(), "now refuses with a typed permission message", "now warns with a typed permission message"));
    expect(named(lines)).toEqual(["half ruling-6/host-transcript-path"]);
    expect(lines.some(line => line.includes("not exactly its frozen blocks"))).toBe(true);
  });

  it("D2 names half ruling-6/host-transcript-path when ruling 6's security sentence is deleted", () => {
    const lines = docsFailures(swap(synthetic(), " The parent slice implemented the grant: the host transcript path now refuses with a typed permission message unless `claude:transcript` is granted.", ""));
    expect(named(lines)).toContain("half ruling-6/host-transcript-path");
  });

  it("D3 names half ruling-5/synthesis-until-then when ruling 5's interim clause is deleted", () => {
    const lines = docsFailures(swap(synthetic(), " the loader also accepts synthesis from the owning ref until then.", ""));
    expect(named(lines)).toContain("half ruling-5/synthesis-until-then");
  });

  it("D4 goes red on the section when the UI paragraph gains a qualifier on j/k reset (the clause substring survives, the section equality does not)", () => {
    const lines = docsFailures(swap(synthetic(), "j/k reset it.", "j/k reset it only after a load completes."));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("UI integration is not exactly its frozen blocks");
  });

  it("D5 goes red when abortAll gains an exemption", () => {
    const lines = docsFailures(swap(synthetic(), "never cancels the workflow.", "never cancels the workflow except in compact mode."));
    expect(lines.some(line => line.includes("not exactly its frozen blocks"))).toBe(true);
  });

  it("D6 goes red when an exemption is appended to ruling 3", () => {
    const lines = docsFailures(swap(synthetic(), "routing is provider-first.", "routing is provider-first, unless a loader opts out."));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D7 goes red when ruling 9 moves under a new level-2 heading", () => {
    const lines = docsFailures(swap(synthetic(), "\n9. Store-level default budgets with per-request overrides.\n10.", "\n## Budgets\n\n9. Store-level default budgets with per-request overrides.\n10."));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D8 goes red when the UI integration heading is demoted to a level-3 heading", () => {
    const lines = docsFailures(swap(synthetic(), "## UI integration", "### UI integration"));
    expect(lines.some(line => line.includes("UI integration: the section is refused"))).toBe(true);
  });

  it("D9 goes red when the UI integration heading is duplicated with a second body", () => {
    const lines = docsFailures(synthetic(undefined, undefined, "\n## UI integration\n\nGrants are advisory.\n"));
    expect(lines.some(line => line.includes("UI integration: the section is refused"))).toBe(true);
  });

  it("D10 (FOLD-1) goes red when a weakening ### subsection is appended inside the UI section", () => {
    const lines = docsFailures(swap(synthetic(), "details view renders byte-identical to today.", "details view renders byte-identical to today.\n\n### Exceptions\n\nThe store is optional."));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D11 goes red when a stray paragraph follows the rulings", () => {
    const lines = docsFailures(synthetic(undefined, undefined, "\nRulings are advisory.\n"));
    expect(lines.some(line => line.includes("the section has 2 blocks; the census pins 1"))).toBe(true);
  });

  it("D12 goes red when an HTML comment hides a second copy of a heading", () => {
    const lines = docsFailures(synthetic(undefined, undefined, "\n<!--\n## Owner rulings on the design conflicts\n-->\n"));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D13 goes red when an HTML comment sits inside the rulings (rendered text unchanged, source changed)", () => {
    const lines = docsFailures(swap(synthetic(), "\n4. Cache keys", "\n<!-- note -->\n4. Cache keys"));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D14 names half ruling-7/whole when ruling 7 is negated", () => {
    const lines = docsFailures(swap(synthetic(), "are accepted behavior changes", "are not accepted behavior changes"));
    expect(named(lines)).toContain("half ruling-7/whole");
  });

  it("D15 goes red when a ruling is deleted (nine left)", () => {
    const lines = docsFailures(swap(synthetic(), "\n9. Store-level default budgets with per-request overrides.", ""));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("DC1 control: section order is not pinned, so swapping the two sections stays green (each is located by its own heading)", () => {
    const real = synthetic();
    const ui = real.indexOf(`## ${SECTION_HEADING.ui}`);
    const rulings = real.indexOf(`## ${SECTION_HEADING.rulings}`);
    expect(docsFailures(`${real.slice(0, ui)}${real.slice(rulings)}\n${real.slice(ui, rulings)}`)).toEqual([]);
  });

  it("D17 names half ruling-2/any-other-change-hides-more when ruling 2's wb-3l3 tail is reworded", () => {
    const lines = docsFailures(swap(synthetic(), "hides more text and shows none", "hides more text and may show some"));
    expect(named(lines)).toContain("half ruling-2/any-other-change-hides-more");
  });

  it("D18 goes red when a level-1 heading inserted above re-homes a section", () => {
    const lines = docsFailures(swap(synthetic(), `## ${SECTION_HEADING.rulings}`, `# Appendix\n\n## ${SECTION_HEADING.rulings}`));
    expect(lines.some(line => line.includes("Owner rulings on the design conflicts: the section is refused"))).toBe(true);
  });

  it("an edit of an unpinned section never reddens a half: Types and Producer mapping are free to change", () => {
    expect(docsFailures(swap(swap(synthetic(), "Other text.", "Changed text."), "- a -> b", "- c -> d"))).toEqual([]);
  });
});
