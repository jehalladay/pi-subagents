/**
 * wb-6hb.6 (W06 / VC-2): census falsifier for the "Conformance tests" section of
 * docs/workbench/06-capability-registry.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (the post-nl8
 * adoption cut: judge(.forge/vitest-report.json, pins) through the shared helper test/helpers/census.ts).
 *
 * docs/workbench/14 "Truth labels and release gates" requires that "Each major work package must have a falsifier: a
 * negative test that would fail if a critical guarantee was quietly weakened." The section lists five conformance
 * bullets. This leg binds each of them to existing cases by file, verbatim title and tier, or records the half no
 * landed case covers as unpinned with a reason. It executes no pinned case: judge() reads vitest's own JSON report of
 * the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a
 * pinned case counts only when the gate's own run collected it exactly once, recorded it passed, and its body asserts -
 * the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or
 * unregistered pinned case therefore reads red, naming the row, the file, the title and the cause, as far as the
 * helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md).
 * This leg scans no test source for case calls itself and spawns no process: every default-gate title is located by
 * the helper, from vitest's report, never from bare text.
 *
 * Tiers: the default report vouches for the default gate's test tier only, and judge() refuses a pin of any other
 * tier (tier-mismatch, R2 = (i)). The one live-tier case this section touches (bullet 3's ecosystem-native pin, whose
 * file is excluded from the default gate and runs only in the native tier) is therefore RECORDED as a live-tier half
 * with a reason and no judged pins. Its live leg is named on the half: `forge run native-read` (forge.toml
 * [build.commands.native-read], vitest.native.config.ts) RUNS the case, with the receipts of record wb-tz2.13
 * (cmd_f6e8a1758d5d) and wb-tz2.14 (cmd_97f66bf848a0), 4 files, 8 of 8 rows passed. No census leg judges the native
 * tier's report and the default report cannot vouch for it, so the case stays recorded and is never counted as
 * covered. Its tier TRUTH is still bound by binding assertions on the real files: the file is in the default exclude
 * and in the native include, the forge.toml command runs the native config, and both receipts name their run.
 *
 * Docs: the section is judged through the helper's rendered view (docsSection / sectionMatches). Under its unique
 * level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, it must render as
 * exactly its one frozen five-item list. A dropped, reworded, reordered or hidden bullet names its row; any other edit
 * of the section names the section. The drift falsifiers run over a SYNTHETIC document built from the frozen blocks,
 * never over the live docs/06 text, so a legitimate edit of any other section can never redden a falsifier row.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does
 * not follow; bullet 1's pins bind the wb-6hb.4 parity matrix and each surface's authorization boundary, not a live
 * run; bullet 3's no-silent-CLI-fallback claim rests on the D2a case alone for the default gate; the hot change of a
 * RUNNING pinned execution (bullet 5) has no case at all.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16; the R582 cure). AC1 pins the table's shape as
 * literals copied from the TABLE at the cut base bfdb58d: every half's pin count (EXPECTED_SHAPE), every judged pin's
 * identity - bullet, half, position, tier, file and title (FROZEN_PINS) - the judged subset the AC2 it.each runs
 * (FROZEN_JUDGED_SHAPE), and the recorded live-tier case with its leg (FROZEN_RECORDED); no half pins one case twice.
 * Deleting a pin, shortening a quote, swapping a pin for an unrelated passing case, putting a copy of a neighbour in a
 * pin's place or narrowing the judged subset changes the TABLE and reds AC1, so hollowing the census takes a second,
 * visible edit here. The AC2 call site is bound as well: each judged half records that its AC2 case ran, and an
 * afterAll asserts that set equals FROZEN_JUDGED_SHAPE, so a narrowed it.each table reads red (so does a name-filtered
 * run of this file, fail-closed).
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Tier = "default-gate" | "live-tier";
interface Pin {
  readonly file: string;
  readonly title: string;
}
interface Half {
  readonly id: string;
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  /** Why no landed default-gate case binds this half; an unpinned half is never counted as covered. */
  readonly reason?: string;
  /** For a live-tier half: the case that runs only in its own native tier (recorded, never judged by the default report). */
  readonly live?: Pin;
  /** For a live-tier half: the tier command that runs its case and that command's receipts of record (named, never judged here). */
  readonly leg?: LiveLeg;
}
/** A live tier's leg: the forge.toml [build.commands.<command>] table, the vitest config it runs, and its receipts of record. */
interface LiveLeg {
  readonly command: string;
  readonly config: string;
  readonly receipts: readonly { readonly bead: string; readonly run: string }[];
}
interface Row {
  readonly bullet: number;
  /** The docs/06 bullet, verbatim in the rendered section (a list item without its marker). */
  readonly quote: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs06-conformance.census.ts";
const DOCS_FILE = "docs/workbench/06-capability-registry.md";
const DOCS_HEADING = "Conformance tests";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_PARENT = `06 ${EM_DASH} Capability registry, typed node providers and agent tools`;
const VITEST_CONFIG = "vitest.config.ts";
const NATIVE_CONFIG = "vitest.native.config.ts";

const NODE_CONTRACT = "test/workbench-node-contract.test.ts";
const REGISTRY_AUTH = "test/workbench-registry-auth.test.ts";
const SECURITY_WORKFLOW = "test/workbench-security-workflow.test.ts";
const SECURITY_CAPABILITY = "test/workbench-security-capability.test.ts";
const FURNACE_HOSTED = "test/workbench-furnace-hosted.test.ts";
const DEGRADATION = "test/workbench-degradation-policy.test.ts";
const PARITY = "test/workbench-capability-surface-parity.test.ts";
const CLAUDE_TOOLS = "test/workbench-claude-capability-tools.test.ts";
const FURNACE_CONTROL = "test/workbench-furnace-control.test.ts";
const DETACHED_FAULTS = "test/workbench-detached-faults-receipt.test.ts";
const VALIDATE_REPLY = "test/workbench-validate-reply.test.ts";
const PATCH_PROPOSAL = "test/workbench-patch-proposal.test.ts";
const IDENTITY = "test/workbench-identity.test.ts";
const ECOSYSTEM_NATIVE = "test/workbench-ecosystem-native.test.ts";

const pin = (file: string, title: string): Pin => ({ file, title });
const guard = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const unpinned = (id: string, reason: string): Half => ({ id, tier: "default-gate", pins: [], reason });

const QUOTES: readonly string[] = [
  "Same capability in workflow node() and Pi invocation uses identical authorization and input contracts.",
  "Read-only agent cannot invoke write capability even if it knows ID.",
  "Missing native SDK/provider is explicit error, not silent CLI fallback.",
  "Unknown effects never auto-retry after disconnect.",
  "Registry provider hot change does not silently alter a running pinned execution. Version/digest mismatch must fail or explicitly begin new invocation.",
];
/** The frozen section as its source markdown, and as what a reader sees: one unordered list of the five bullets. */
const SECTION_MARKDOWN: readonly string[] = [QUOTES.map(quote => `- ${quote}`).join("\n")];
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "list", ordered: false, items: QUOTES.map(quote => ({ text: quote, markdown: quote })) }];

const ECOSYSTEM_PIN = pin(ECOSYSTEM_NATIVE, "Furnace inspect preserves a missing Run as a typed unavailable refusal");

/** Freezes the table and everything it holds, so no row, half or pin can be edited at runtime. */
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

const TABLE: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    bullet: 1,
    quote: QUOTES[0] ?? "",
    halves: [
      guard("guard", [
        pin(NODE_CONTRACT, "L4: unauthorized invocation denied at host even with known capability id"),
        pin(REGISTRY_AUTH, "copies caller grants before asynchronous dispatch and never escalates another caller"),
        pin(REGISTRY_AUTH, "closes the script-side raw RPC vehicle while host authorization stays typed"),
        pin(SECURITY_WORKFLOW, "node() refuses grant/identity options before dispatching to a host capability"),
        pin(PARITY, "registry-decided authorization and unavailable refusals are verbatim on every surface"),
        pin(PARITY, "has no cell where a surface permits and the oracle refuses, and records no known widening"),
      ]),
    ],
  },
  {
    bullet: 2,
    quote: QUOTES[1] ?? "",
    halves: [
      guard("guard", [
        pin(REGISTRY_AUTH, "discovery alone exposes detached metadata but cannot invoke or inspect"),
        pin(REGISTRY_AUTH, "permission-free providers still require an explicit invocation grant"),
        pin(SECURITY_CAPABILITY, "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
        pin(NODE_CONTRACT, "L4: unauthorized invocation denied at host even with known capability id"),
      ]),
    ],
  },
  {
    bullet: 3,
    quote: QUOTES[2] ?? "",
    halves: [
      guard("guard", [
        pin(FURNACE_HOSTED, "refuses to start when the SDK cannot decode execution contexts, before any socket, client or Run exists"),
        pin(DEGRADATION, "D2a the node outcome is a typed unavailable CapabilityError and nothing is fabricated or spawned"),
      ]),
      {
        id: "live-ecosystem-native",
        tier: "live-tier",
        pins: [],
        live: ECOSYSTEM_PIN,
        leg: { command: "native-read", config: NATIVE_CONFIG, receipts: [{ bead: "wb-tz2.13", run: "cmd_f6e8a1758d5d" }, { bead: "wb-tz2.14", run: "cmd_97f66bf848a0" }] },
        reason:
          "the ecosystem-native pin runs only in the native live tier (its file is excluded from the default gate and listed in the native include): the native-read leg (forge run native-read, forge.toml [build.commands.native-read], vitest.native.config.ts) RUNS this case, receipts of record wb-tz2.13 cmd_f6e8a1758d5d and wb-tz2.14 cmd_97f66bf848a0 (4 files, 8 of 8 rows passed); no census leg judges the native tier's report and the default report cannot vouch for it, so it stays recorded and is never counted as covered",
      },
    ],
  },
  {
    bullet: 4,
    quote: QUOTES[3] ?? "",
    halves: [
      guard("guard", [
        pin(NODE_CONTRACT, "L4: effectful invocation with lost response is reported uncertain, never automatically retried"),
        pin(CLAUDE_TOOLS, "explicit effectful fixture retains uncertain-effect on oversized output and never retries"),
        pin(FURNACE_CONTROL, "stops waiting at the bound, discards the late answer and never re-issues the verb"),
        pin(DETACHED_FAULTS, "requires the unknown inspection to carry source, observation and a never-retry reconcile hint"),
      ]),
    ],
  },
  {
    bullet: 5,
    quote: QUOTES[4] ?? "",
    halves: [
      guard("digest-mismatch", [
        pin(VALIDATE_REPLY, "a digest mismatch is its own typed refusal, never a warning, and the core never runs"),
        pin(PATCH_PROPOSAL, "pins the experiment to source digests and refuses a base that does not match its bytes first"),
        pin(IDENTITY, "rejects lockfile changes, missing artifact and lockfile/manifest mismatch"),
      ]),
      unpinned(
        "hot-change-running-pinned",
        "the hot change of a RUNNING pinned execution half has no case at bfdb58d (git grep -i for hot change, hot swap and pinned execution over test/ finds none): W06 wb-4ax (open, in progress at the cut base) owns the provider registry and permissions scope, so the half is unpinned and never counted as covered",
      ),
    ],
  },
]);

/** The frozen row-and-pin shape (rule 16): deleting one pin, dropping a half or moving a pin between halves reds AC1. */
const EXPECTED_SHAPE: readonly string[] = [
  "1:guard=6",
  "2:guard=4",
  "3:guard=2,live-ecosystem-native=0",
  "4:guard=4",
  "5:digest-mismatch=3,hot-change-running-pinned=0",
];
/** Every half no report this leg reads vouches for, as "bullet/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = ["3/live-ecosystem-native", "5/hot-change-running-pinned"];
/**
 * FROZEN SHAPE (rule 16, the R582 U1 cure): every judged pin's identity, "bullet/half/position tier file > title", in table
 * order, copied from the TABLE at the cut base bfdb58d. A pin swapped for an unrelated passing case of the same file
 * (CT3), a pin replaced by a copy of its neighbour (CT11) or a pin moved reds AC1, though judge() would pass every case.
 */
const FROZEN_PINS: readonly string[] = [
  "1/guard/1 default-gate test/workbench-node-contract.test.ts > L4: unauthorized invocation denied at host even with known capability id",
  "1/guard/2 default-gate test/workbench-registry-auth.test.ts > copies caller grants before asynchronous dispatch and never escalates another caller",
  "1/guard/3 default-gate test/workbench-registry-auth.test.ts > closes the script-side raw RPC vehicle while host authorization stays typed",
  "1/guard/4 default-gate test/workbench-security-workflow.test.ts > node() refuses grant/identity options before dispatching to a host capability",
  "1/guard/5 default-gate test/workbench-capability-surface-parity.test.ts > registry-decided authorization and unavailable refusals are verbatim on every surface",
  "1/guard/6 default-gate test/workbench-capability-surface-parity.test.ts > has no cell where a surface permits and the oracle refuses, and records no known widening",
  "2/guard/1 default-gate test/workbench-registry-auth.test.ts > discovery alone exposes detached metadata but cannot invoke or inspect",
  "2/guard/2 default-gate test/workbench-registry-auth.test.ts > permission-free providers still require an explicit invocation grant",
  "2/guard/3 default-gate test/workbench-security-capability.test.ts > hostile caller-added outer identity/grants never reach provider; inner authority fields are refused",
  "2/guard/4 default-gate test/workbench-node-contract.test.ts > L4: unauthorized invocation denied at host even with known capability id",
  "3/guard/1 default-gate test/workbench-furnace-hosted.test.ts > refuses to start when the SDK cannot decode execution contexts, before any socket, client or Run exists",
  "3/guard/2 default-gate test/workbench-degradation-policy.test.ts > D2a the node outcome is a typed unavailable CapabilityError and nothing is fabricated or spawned",
  "4/guard/1 default-gate test/workbench-node-contract.test.ts > L4: effectful invocation with lost response is reported uncertain, never automatically retried",
  "4/guard/2 default-gate test/workbench-claude-capability-tools.test.ts > explicit effectful fixture retains uncertain-effect on oversized output and never retries",
  "4/guard/3 default-gate test/workbench-furnace-control.test.ts > stops waiting at the bound, discards the late answer and never re-issues the verb",
  "4/guard/4 default-gate test/workbench-detached-faults-receipt.test.ts > requires the unknown inspection to carry source, observation and a never-retry reconcile hint",
  "5/digest-mismatch/1 default-gate test/workbench-validate-reply.test.ts > a digest mismatch is its own typed refusal, never a warning, and the core never runs",
  "5/digest-mismatch/2 default-gate test/workbench-patch-proposal.test.ts > pins the experiment to source digests and refuses a base that does not match its bytes first",
  "5/digest-mismatch/3 default-gate test/workbench-identity.test.ts > rejects lockfile changes, missing artifact and lockfile/manifest mismatch",
];
/** FROZEN SHAPE (rule 16, the R582 U2 cure): the judged subset as "bullet/half:pins", in table order - exactly the halves the AC2 it.each judges. */
const FROZEN_JUDGED_SHAPE: readonly string[] = ["1/guard:6", "2/guard:4", "3/guard:2", "4/guard:4", "5/digest-mismatch:3"];
/** FROZEN SHAPE: every recorded (never judged) live-tier case, with the leg that runs it and that leg's receipts of record. */
const FROZEN_RECORDED: readonly string[] = [
  "3/live-ecosystem-native live-tier test/workbench-ecosystem-native.test.ts > Furnace inspect preserves a missing Run as a typed unavailable refusal | leg native-read vitest.native.config.ts | wb-tz2.13 cmd_f6e8a1758d5d, wb-tz2.14 cmd_97f66bf848a0",
];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.bullet}:${row.halves.map(half => `${half.id}=${half.pins.length}`).join(",")}`);

const pinIdentities = (rows: readonly Row[]): string[] =>
  rows.flatMap(row => row.halves.flatMap(half => half.pins.map((entry, index) => `${row.bullet}/${half.id}/${index + 1} ${half.tier} ${entry.file} > ${entry.title}`)));
/** Every (file, title) a half pins more than once, as "bullet/half: file > title"; the frozen table holds none. */
const duplicatePins = (rows: readonly Row[]): string[] =>
  rows.flatMap(row =>
    row.halves.flatMap(half =>
      half.pins.filter((entry, index) => half.pins.findIndex(other => other.file === entry.file && other.title === entry.title) !== index).map(entry => `${row.bullet}/${half.id}: ${entry.file} > ${entry.title}`),
    ),
  );
const recordedIdentities = (rows: readonly Row[]): string[] =>
  rows.flatMap(row =>
    row.halves
      .filter(half => half.live !== undefined || half.leg !== undefined)
      .map(
        half =>
          `${row.bullet}/${half.id} ${half.tier} ${half.live?.file ?? "none"} > ${half.live?.title ?? "none"} | leg ${half.leg?.command ?? "none"} ${half.leg?.config ?? "none"} | ${(half.leg?.receipts ?? []).map(receipt => `${receipt.bead} ${receipt.run}`).join(", ")}`,
      ),
  );

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));
const judgedKey = ({ row, half }: { readonly row: Row; readonly half: Half }): string => `${row.bullet}/${half.id}:${half.pins.length}`;
const judgedShape = (judged: readonly { readonly row: Row; readonly half: Half }[]): string[] => judged.map(judgedKey);
/** The judged halves whose AC2 case ran in this file's run, as judgedKey; the afterAll binds the AC2 call site to FROZEN_JUDGED_SHAPE. */
const AC2_RAN: string[] = [];

/** One line per pin that is not ok, naming the bullet and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `bullet ${row.bullet}/${half.id}: ${verdict.code}: ${verdict.why}`);

/**
 * The explicit budget of every judging case in this file (the landed wb-6hb.9 R546 shape), file-local so no other census
 * file's budget moves: no judging case rides vitest's default 5000 ms, which the costliest case exceeded in this respin's
 * battery under host load. Sized as 5 x the measured p99 of the costliest judging case (AC2 bullet 1, six pins over four
 * files), rounded up to a whole 5 s. Measured 2026-10-20 against the 13-pinned-file default-tier report with other lanes
 * live (load1 357.8-395.0): 16 runs of this file alone, 8 sequential and 8 at 2-way, costliest case min 1364 ms, median
 * 2661 ms, p99 9809 ms, 2 of 16 above 5000 ms (the gate's R582 census run on the full report at load1 ~390-430: 1881 ms).
 * 5 x 9809 ms = 49045 ms, rounded up to 50000 ms.
 */
const JUDGE_BUDGET_MS = 50_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The cases that carry JUDGING: AC2 per judged half (5), the AC4 live not-collected case, the U5 live leg, and M1, M4, M5 and M7. */
const JUDGING_CASES = 11;

/**
 * R673 (wb-csne): the explicit budget of the AC2 call-site hook (the afterAll that binds AC2_RAN to FROZEN_JUDGED_SHAPE),
 * file-local so no other census file's budget moves (the wb-hk9l PACKAGE_COPY_ROW_BUDGET_MS pattern): the hook never rides
 * vitest's default 10000 ms hookTimeout. The land-prep try-1 red the judge keyed to this describe (hook@wb-6hb.6 at :430,
 * landings 224, 226 and 229) was never this hook running long: it is AC2 bullet 1/guard's AssertionError carrying the
 * parity file's collection error "Hook timed out in 10000ms" from the default report (cmd_9204c30d7a56, census
 * diagnostic), the cascade the parity file's own budget (PARITY_SUITE_HOOK_BUDGET_MS) removes at its source. The budget is
 * the owner floor of 20000 ms, more than 2 x the hook's worst measured wall (WORST_MEASURED_CALL_SITE_HOOK_WALL_MS).
 * Exceeding it is a real red: withinHookBudget fails the hook with an AssertionError naming this constant.
 */
const CALL_SITE_HOOK_BUDGET_MS = 20_000;
/**
 * The worst measured wall of the AC2 call-site hook (a synchronous sort and comparison, timed by withinHookBudget): 13 ms,
 * from wb-csne runs of this file on the 13-pinned-file default report on 2026-10-21 at load1 325-358 (6 sequential runs
 * 1-13 ms, 8-way 1-3 ms).
 */
const WORST_MEASURED_CALL_SITE_HOOK_WALL_MS = 13;
/** vitest's own timer for the hook: a backstop past the budget, so the budget's named AssertionError always fires first. */
const CALL_SITE_HOOK_BACKSTOP_MS = 2 * CALL_SITE_HOOK_BUDGET_MS;
const CALL_SITE_HOOK = "the docs06 census AC2 call-site hook";

interface HookReading {
  readonly hook: string;
  readonly budgetMs: number;
  readonly wallMs: number;
  readonly outcome: "settled" | "overrun";
}
/** One reading per guarded hook run, appended by withinHookBudget before it judges the run: the evidence a hook ran under its budget. */
const HOOK_READINGS: HookReading[] = [];

/**
 * Runs a hook body under its file-local budget (R673). The body races a timer of budgetMs; an overrun - a body that
 * finishes late, or one still running when the timer fires - fails the hook with an AssertionError naming the budget and
 * its value. A body's own error propagates unchanged.
 */
async function withinHookBudget(hook: string, budget: string, budgetMs: number, body: () => void | Promise<void>): Promise<void> {
  const started = performance.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const overrun = new Promise<"overrun">(resolve => {
    timer = setTimeout(() => resolve("overrun"), budgetMs);
  });
  try {
    const outcome = await Promise.race([Promise.resolve().then(body).then(() => "settled" as const), overrun]);
    const wallMs = Math.round(performance.now() - started);
    HOOK_READINGS.push({ hook, budgetMs, wallMs, outcome });
    const still = outcome === "overrun" ? " and was still running" : "";
    expect(outcome === "settled" && wallMs <= budgetMs, `${hook} ran ${wallMs} ms${still}, past its file-local budget ${budget} = ${budgetMs} ms (R673)`).toBe(true);
  } finally {
    clearTimeout(timer);
  }
}

/** The rendered text a bullet is looked up in: the list items of the section. */
const bulletRenders = (row: Row, blocks: readonly RenderedBlock[]): boolean => blocks.some(block => block.kind === "list" && block.items.some(item => item.text === row.quote));

/**
 * Every docs drift, each naming the bullet or the section it breaks. The per-bullet checks read the section's rendered
 * blocks and run independently of the exactness check, so a dropped or reworded bullet names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  for (const row of TABLE) {
    if (!bulletRenders(row, section.blocks)) out.push(`bullet ${row.bullet}: its sentence "${row.quote}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen blocks under the real heading shape, never the live text. */
const synthetic = (edit: (blocks: readonly string[]) => readonly string[] = blocks => blocks, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Discovery examples\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(SECTION_MARKDOWN).join("\n\n")}\n${tail}\n## Current experimental policy surface\n\nText.\n`;
const editBlock = (index: number, from: string, to: string) => (blocks: readonly string[]): readonly string[] => blocks.map((block, at) => (at === index ? block.replace(from, to) : block));
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("bullet ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-6hb.6 docs/workbench/06 conformance census (report mode)", () => {
  it("AC1: the table holds the five frozen bullets in order, deeply frozen, with the frozen row-and-pin shape and each sentence rendered in its section", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => row.bullet)).toEqual([1, 2, 3, 4, 5]);
    expect(TABLE.map(row => row.quote)).toEqual(QUOTES);
    expect(shapeOf(TABLE)).toEqual(EXPECTED_SHAPE);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1 frozen shape (rule 16): every judged pin's identity is the literal list, so a pin swapped for an unrelated passing case reds it", () => {
    expect(pinIdentities(TABLE), "every pin's bullet, half, position, tier, file and title").toEqual(FROZEN_PINS);
  });

  it("AC1 frozen shape (rule 16): no half pins one case twice, so a pin replaced by a copy of its neighbour reds it", () => {
    expect(duplicatePins(TABLE), "a (file, title) pair occurs at most once per half").toEqual([]);
  });

  it("AC1 frozen shape (rule 16): the judged subset is the literal list, so a narrowed judged predicate reds it", () => {
    expect(judgedShape(JUDGED), "the judged subset: the AC2 it.each table").toEqual(FROZEN_JUDGED_SHAPE);
  });

  it("AC1 frozen shape: the recorded live-tier case, its leg and the leg's receipts are the literal list", () => {
    expect(recordedIdentities(TABLE), "the recorded live-tier case and its leg").toEqual(FROZEN_RECORDED);
  });

  it("AC1 counts at the cut base: 19 judged pin entries (6 + 4 + 2 + 4 + 3), 18 unique (file, title) cases across 13 files", () => {
    const entries = JUDGED.flatMap(({ half }) => [...half.pins]);
    expect(entries).toHaveLength(19);
    expect(new Set(entries.map(entry => `${entry.file} > ${entry.title}`)).size, "bullets 1 and 2 share the L4 unauthorized case").toBe(18);
    expect(new Set(entries.map(entry => entry.file)).size).toBe(13);
  });

  it("AC1: the live section renders exactly its one frozen five-item list, HTML-free", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(QUOTES).toHaveLength(5);
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the two", () => {
    for (const row of TABLE) {
      expect(row.halves.length, `bullet ${row.bullet}: a row holds at least one half`).toBeGreaterThan(0);
      expect(
        row.halves.some(half => half.tier === "default-gate" && half.pins.length > 0),
        `bullet ${row.bullet}: a bullet is never silently unjudged: at least one default-gate half holds pins`,
      ).toBe(true);
      for (const half of row.halves) {
        expect(["default-gate", "live-tier"], `bullet ${row.bullet}/${half.id}: tier`).toContain(half.tier);
        if (half.reason === undefined) expect(half.pins.length, `bullet ${row.bullet}/${half.id}: a pinned half has pins`).toBeGreaterThan(0);
        else {
          expect(half.pins, `bullet ${row.bullet}/${half.id}: an unpinned half carries no pins`).toEqual([]);
          expect(half.reason.trim().length, `bullet ${row.bullet}/${half.id}: an unpinned half needs a reason`).toBeGreaterThan(40);
        }
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed; the live-tier half names its case and the hot-change half names wb-4ax", () => {
    const listed = TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => `${row.bullet}/${half.id}`));
    expect(listed).toEqual(UNPINNED_HALVES);
    const liveHalves = TABLE.flatMap(row => row.halves.filter(half => half.tier === "live-tier"));
    expect(liveHalves.map(half => half.live)).toEqual([ECOSYSTEM_PIN]);
    for (const half of liveHalves) expect(half.reason, `live-tier half ${half.id}`).toContain("never counted as covered");
    const hot = TABLE.find(row => row.bullet === 5)?.halves.find(half => half.id === "hot-change-running-pinned");
    expect(hot?.reason).toContain("wb-4ax");
    expect(hot?.tier).toBe("default-gate");
  });

  it("AC3: bullets 1 and 3 hold the landed cases that closed their old partial reasons (wb-6hb.4 parity matrix, wb-cax.5 D2a)", () => {
    const pins = (bullet: number): Pin[] => TABLE.find(row => row.bullet === bullet)?.halves.flatMap(half => [...half.pins]) ?? [];
    expect(pins(1).filter(entry => entry.file === PARITY)).toHaveLength(2);
    expect(pins(3).filter(entry => entry.file === DEGRADATION).map(entry => entry.title)).toEqual(["D2a the node outcome is a typed unavailable CapabilityError and nothing is fabricated or spawned"]);
  });

  it("O1 tier truth: the live-tier pin's file is excluded from the default config and listed in the native config, and no default-gate pin file is excluded", () => {
    const defaultConfig = readRepo(VITEST_CONFIG);
    const nativeConfig = readRepo(NATIVE_CONFIG);
    expect(defaultConfig).toContain(`"${ECOSYSTEM_NATIVE}"`);
    expect(nativeConfig).toContain(`"${ECOSYSTEM_NATIVE}"`);
    const gateFiles = new Set(JUDGED.flatMap(({ half }) => half.pins.map(entry => entry.file)));
    const excludeLine = defaultConfig.split("\n").find(line => line.includes("exclude:")) ?? "";
    for (const file of gateFiles) expect(excludeLine, `default-gate pin file ${file} must not be in the default exclude`).not.toContain(file);
  });

  afterAll(() => {
    // R673 (wb-csne): the landed body runs inside withinHookBudget; its lines are kept byte-identical (no edits to landed lines), one level shallower than the callback they now sit in.
    return withinHookBudget(CALL_SITE_HOOK, "CALL_SITE_HOOK_BUDGET_MS", CALL_SITE_HOOK_BUDGET_MS, () => {
    expect([...AC2_RAN].sort((a, b) => a.localeCompare(b)), "every frozen judged half ran its AC2 case exactly once").toEqual([...FROZEN_JUDGED_SHAPE].sort((a, b) => a.localeCompare(b)));
  });
  }, CALL_SITE_HOOK_BACKSTOP_MS);

  it.each(JUDGED)("AC2 bullet $row.bullet/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report", JUDGING, ({ row, half }) => {
    AC2_RAN.push(judgedKey({ row, half }));
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("AC4: the live-tier case is carried by no report this leg reads: the default report refuses it as not collected, never as passed", JUDGING, () => {
    const [verdict] = judge(REPORT, [casePin(ECOSYSTEM_PIN)]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("not-collected");
  });

  it("U5 live leg: the live-tier half names forge run native-read, which runs the native config, and both receipts of record name their run", JUDGING, () => {
    const live = TABLE.flatMap(row => row.halves.filter(half => half.tier === "live-tier"));
    expect(live.map(half => half.leg?.command)).toEqual(["native-read"]);
    const command = readRepo("forge.toml")
      .split("\n[")
      .find(block => block.startsWith("build.commands.native-read]"));
    expect(command, "forge.toml [build.commands.native-read] runs the native config").toContain(`command = "./node_modules/.bin/vitest run --config ${NATIVE_CONFIG}"`);
    for (const half of live) {
      expect(half.leg?.config).toBe(NATIVE_CONFIG);
      expect(half.leg?.receipts.map(receipt => receipt.bead)).toEqual(["wb-tz2.13", "wb-tz2.14"]);
      for (const receipt of half.leg?.receipts ?? []) {
        const text = readRepo(`docs/workbench/receipts/${receipt.bead}.md`);
        expect(text, `${receipt.bead} names its run of record`).toContain(`\`forge run native-read\` = ${receipt.run}`);
        expect(text, `${receipt.bead} records the tier's whole run`).toContain("4 files, 8 of 8 rows passed");
      }
      expect(half.reason).toContain("RUNS this case");
      expect(half.reason).toContain("no census leg judges the native tier's report");
    }
    const [asNative] = judge(REPORT, [{ file: ECOSYSTEM_PIN.file, title: ECOSYSTEM_PIN.title, tier: "native-read" }]);
    expect(asNative?.code, "the default report never vouches for the native tier").toBe("tier-mismatch");
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = TABLE.flatMap(row => row.halves.flatMap(half => half.pins.map(entry => basename(entry.file, ".ts"))));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });

  it("exactly the judging cases carry the file-local budget, and it is never vitest's default 5000 ms", ({ task }) => {
    const timeouts: number[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") timeouts.push(child.timeout);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(timeouts.filter(timeout => timeout === JUDGE_BUDGET_MS), "the cases that run under JUDGE_BUDGET_MS").toHaveLength(JUDGING_CASES);
  });
});

describe("wb-6hb.6 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (bullet: number): { row: Row; half: Half; entry: Pin } => {
    const found = JUDGED.find(({ row }) => row.bullet === bullet);
    const entry = found?.half.pins[0];
    if (found === undefined || entry === undefined) throw new Error(`bullet ${bullet} holds no judged pin`);
    return { row: found.row, half: found.half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the bullet, the file and the title", JUDGING, () => {
    const { row, half, entry } = firstJudged(2);
    const wrong = { ...entry, title: entry.title.replace("discovery", "Discovery") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, half, verdicts);
    expect(line).toContain("bullet 2/guard");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a bullet removed from the table fails the shape pin (the frozen shape no longer matches)", () => {
    expect(shapeOf(TABLE.filter(row => row.bullet !== 4))).not.toEqual(EXPECTED_SHAPE);
  });

  it("M3: a pin deleted from a multi-pin half fails the frozen shape (one pin of the parity pair, one of the digest trio)", () => {
    const dropOne = (bullet: number, half: string): Row[] =>
      TABLE.map(row => (row.bullet === bullet ? { ...row, halves: row.halves.map(candidate => (candidate.id === half ? { ...candidate, pins: candidate.pins.slice(1) } : candidate)) } : row));
    expect(shapeOf(dropOne(1, "guard"))).not.toEqual(EXPECTED_SHAPE);
    expect(shapeOf(dropOne(5, "digest-mismatch"))).not.toEqual(EXPECTED_SHAPE);
  });

  it("M4: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    const { entry } = firstJudged(1);
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", JUDGING, () => {
    const { entry } = firstJudged(4);
    const [verdict] = judge(REPORT, [casePin({ file: IDENTITY, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a pinned title that two bullets share is judged once per bullet, so removing it from one bullet still leaves the other's pin live", () => {
    const owners = TABLE.filter(row => row.halves.some(half => half.pins.some(entry => entry.file === NODE_CONTRACT && entry.title === "L4: unauthorized invocation denied at host even with known capability id")));
    expect(owners.map(row => row.bullet)).toEqual([1, 2]);
  });

  it("M7: a default-tier pin of a file the default config excludes is never in the default report: not collected, a tier cause and never a missing title", JUDGING, () => {
    const [verdict] = judge(REPORT, [{ file: ECOSYSTEM_NATIVE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M8: a pin swapped for another case of its own file keeps the count shape and is red only by the frozen pin identity (CT3)", () => {
    const swapped = TABLE.map(row =>
      row.bullet === 2 ? { ...row, halves: row.halves.map(half => ({ ...half, pins: half.pins.map((entry, index) => (index === 1 ? { ...entry, title: "an unrelated passing case of the same file" } : entry)) })) } : row,
    );
    expect(shapeOf(swapped)).toEqual(EXPECTED_SHAPE);
    expect(duplicatePins(swapped)).toEqual([]);
    expect(pinIdentities(swapped)).not.toEqual(FROZEN_PINS);
  });

  it("M9: a pin replaced by a copy of its half's neighbour keeps the count shape and is red by the frozen pin identity and the per-half uniqueness (CT11)", () => {
    const copied = TABLE.map(row =>
      row.bullet === 5 ? { ...row, halves: row.halves.map(half => (half.id === "digest-mismatch" ? { ...half, pins: half.pins.map((entry, index, all) => (index === 2 ? (all[0] ?? entry) : entry)) } : half)) } : row,
    );
    expect(shapeOf(copied)).toEqual(EXPECTED_SHAPE);
    expect(pinIdentities(copied)).not.toEqual(FROZEN_PINS);
    expect(duplicatePins(copied)).toEqual([`5/digest-mismatch: ${VALIDATE_REPLY} > a digest mismatch is its own typed refusal, never a warning, and the core never runs`]);
  });

  it("M10: a judged predicate narrowed to the larger halves leaves the table and its count shape untouched and is red by the frozen judged subset (CT7)", () => {
    const narrowed = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 3).map(half => ({ row, half })));
    expect(shapeOf(TABLE), "a narrowed predicate leaves the table's count shape untouched").toEqual(EXPECTED_SHAPE);
    expect(judgedShape(narrowed)).toEqual(["1/guard:6", "2/guard:4", "4/guard:4"]);
    expect(judgedShape(narrowed)).not.toEqual(FROZEN_JUDGED_SHAPE);
  });
});

describe("wb-6hb.6 docs drift names the bullet or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${SECTION_MARKDOWN.join("\n\n")}\n`)).toEqual([]);
  });

  it("K1 names bullet 2 (and only it) when its sentence is reworded to allow the write", () => {
    expect(named(docsFailures(synthetic(editBlock(0, "cannot invoke write capability", "can invoke write capability"))))).toEqual(["bullet 2"]);
  });

  it("K2 names bullet 4 (and only it) when the never-retry sentence is dropped from the list", () => {
    const lines = docsFailures(synthetic(editBlock(0, "\n- Unknown effects never auto-retry after disconnect.", "")));
    expect(named(lines)).toEqual(["bullet 4"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K3 names bullet 3 (and only it) when the no-silent-fallback clause is weakened", () => {
    expect(named(docsFailures(synthetic(editBlock(0, "not silent CLI fallback", "silent CLI fallback allowed"))))).toEqual(["bullet 3"]);
  });

  it("K4 names bullet 5 (and only it) when its version/digest sentence is removed", () => {
    expect(named(docsFailures(synthetic(editBlock(0, " Version/digest mismatch must fail or explicitly begin new invocation.", ""))))).toEqual(["bullet 5"]);
  });

  it("K5 names bullet 1 (and only it) when identical contracts are loosened to similar ones", () => {
    expect(named(docsFailures(synthetic(editBlock(0, "uses identical authorization", "uses similar authorization"))))).toEqual(["bullet 1"]);
  });

  it("D1 goes red on the section, naming no bullet, when a sixth unclassified bullet is added to the list", () => {
    const lines = docsFailures(synthetic(editBlock(0, "begin new invocation.", "begin new invocation.\n- A new unclassified conformance bullet.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("D2 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, "## Conformance notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_HEADING}: the section is refused`);
  });

  it("D3 goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(blocks => blocks, "\n### Exceptions\n\nA host may skip these tests.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D4 names bullet 2 when its sentence is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editBlock(0, "- Read-only agent cannot invoke write capability even if it knows ID.", "- <!-- Read-only agent cannot invoke write capability even if it knows ID. -->")));
    expect(named(lines)).toEqual(["bullet 2"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D5 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D6 goes red on the section, naming no bullet, when two bullets swap places", () => {
    const first = QUOTES[0] ?? "";
    const second = QUOTES[1] ?? "";
    const lines = docsFailures(synthetic(editBlock(0, `- ${first}\n- ${second}`, `- ${second}\n- ${first}`)));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("an edit of any other section never reddens a bullet: the discovery and policy-surface sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});

describe("R673 (wb-csne): the AC2 call-site hook runs under its file-local budget, and an overrun is a real red naming it", () => {
  it("the AC2 call-site hook ran once under CALL_SITE_HOOK_BUDGET_MS, settled inside the budget, never on vitest's default hookTimeout", () => {
    const hook = HOOK_READINGS.filter(reading => reading.hook === CALL_SITE_HOOK);
    expect(hook.map(reading => `${reading.hook}|${reading.budgetMs}|${reading.outcome}`), "the guarded call-site hook's readings").toEqual([`${CALL_SITE_HOOK}|${CALL_SITE_HOOK_BUDGET_MS}|settled`]);
    expect(hook[0]?.wallMs, "the call-site hook's wall").toBeLessThanOrEqual(CALL_SITE_HOOK_BUDGET_MS);
  });

  it("the budget clears the owner floor and twice the worst measured wall, and vitest's own timer is a backstop past it", () => {
    expect(CALL_SITE_HOOK_BUDGET_MS, "the owner floor").toBeGreaterThanOrEqual(20_000);
    expect(WORST_MEASURED_CALL_SITE_HOOK_WALL_MS, "the worst measured wall: 13 ms (wb-csne)").toBeGreaterThanOrEqual(13);
    expect(CALL_SITE_HOOK_BUDGET_MS, "more than 2 x the worst measured wall").toBeGreaterThan(2 * WORST_MEASURED_CALL_SITE_HOOK_WALL_MS);
    expect(CALL_SITE_HOOK_BACKSTOP_MS, "vitest's backstop sits past the budget").toBeGreaterThan(CALL_SITE_HOOK_BUDGET_MS);
  });

  it("an overrun is an AssertionError naming the budget, whether the body finishes late or is still running; a body inside its budget passes", async () => {
    const late = () =>
      withinHookBudget("probe late", "PROBE_BUDGET_MS", 20, () => {
        const until = performance.now() + 60;
        while (performance.now() < until) {
          /* busy wait: a body that finishes past its budget */
        }
      });
    const hung = () => withinHookBudget("probe hung", "PROBE_BUDGET_MS", 20, () => new Promise<void>(() => undefined));
    for (const [probe, name, still] of [
      [late, "probe late", ""],
      [hung, "probe hung", " and was still running"],
    ] as const) {
      const caught: unknown = await probe().then(
        () => undefined,
        (error: unknown) => error,
      );
      expect(caught, `${name}: an overrun fails the hook`).toBeInstanceOf(Error);
      expect((caught as Error).name, `${name}: a real red, never a timing marker`).toBe("AssertionError");
      expect((caught as Error).message, `${name}: the red names the budget`).toMatch(new RegExp(`^${name} ran \\d+ ms${still}, past its file-local budget PROBE_BUDGET_MS = 20 ms \\(R673\\)`));
      expect((caught as Error).message, `${name}: never a hook timeout`).not.toContain("timed out");
    }
    await expect(withinHookBudget("probe quick", "PROBE_BUDGET_MS", 5_000, () => undefined)).resolves.toBeUndefined();
  });

  it("a hook body's own error propagates unchanged through the guard", async () => {
    const own = new TypeError("the body's own failure");
    await expect(
      withinHookBudget("probe broken", "PROBE_BUDGET_MS", 5_000, () => {
        throw own;
      }),
    ).rejects.toBe(own);
  });
});

/**
 * R687 (wb-9rto, the wb-csne F1 class): the R673 rows above pin the budget and backstop CONSTANTS; the rows below bind the
 * ARGUMENT the AC2 call-site hook is registered with. vitest 4.1.10 keeps an afterAll's timeout only in the closure of the
 * withTimeout timer it wraps the hook in (it stamps a registered timeout on the beforeAll and beforeEach hooks it stores,
 * never on an afterAll: the runner row below pins that this file's afterAll carries none, and the capability-surface-parity
 * R687 row reads the stamp a beforeAll carries), so this file's own AST is the evidence. hookRoster
 * reads every hook registration of the file through the TypeScript binder (the census helper's single-file program: no
 * lib, no module resolution): its registrar, the describe titles around it, the hook its callback guards (the first
 * argument of its withinHookBudget call) and its timeout argument with the file-scope const that argument binds. It reads
 * hook registrations only, never case calls. A registrar NAMED any way but a direct call of vitest's own named import - an
 * alias, a dot member, a string-keyed member or destructuring key (vitest["afterAll"], const { "afterAll": a } = vitest:
 * R692, wb-ouo3, the wb-9rto F3 cure), a value, another module - is a finding, never a reading. A registrar reached any
 * other way (a computed key such as vitest["after" + "All"], a member fetched by Reflect.get) names no registrar the roster
 * reads, so the roster cannot see it; the R692 held-hook census below reds the hook it registers, since vitest then holds
 * a hook the roster does not name. An omitted, swapped, shadowed, literal or
 * undefined argument is a red below, where the gate's omission probe of the registration left 48/48 green (wb-csne gate
 * cmd_d14ebd6c549f, F1).
 */
const HOOK_REGISTRARS: readonly string[] = ["beforeAll", "afterAll", "beforeEach", "afterEach", "aroundAll", "aroundEach"];
/** The key vitest stamps a registered timeout under, on the beforeAll and beforeEach hooks it stores; an afterAll carries none. */
const REGISTERED_HOOK_TIMEOUT = Symbol.for("VITEST_CLEANUP_TIMEOUT");
/** A binding's own name (a shorthand property's key is its identifier), so no expectation spells a const it binds by hand. */
const nameOf = (binding: Readonly<Record<string, unknown>>): string => Object.keys(binding).join(", ");

interface HookRegistration {
  readonly registrar: string;
  /** The titles of the describe calls around the registration, outermost first; "(file scope)" for none. */
  readonly chain: string;
  /** The first argument of each withinHookBudget call in the hook's callback, as written; "nothing" when it calls none. */
  readonly guards: string;
  /** The timeout argument as written; "(none)" when the registration passes none and vitest applies its default hookTimeout. */
  readonly timeout: string;
  /** The file-scope const the timeout argument binds through the binder; undefined for none, a literal, or an inner or non-const binding. */
  readonly binds: string | undefined;
  /** Where the registration call starts, as line:column (1-based): the site vitest's registration stack names (R692). */
  readonly site: string;
}
/** A file's hook roster (R687) and, from R692 (wb-ouo3), its describe calls and every direct call of withinHookBudget. */
interface HookRoster {
  readonly registrations: readonly HookRegistration[];
  readonly findings: readonly string[];
  /** Every describe call, as its chain of titles, outermost first, in source order. */
  readonly describes: readonly string[];
  /** Every direct call of withinHookBudget as "<first argument> | <the hook registration or case whose callback makes it>". */
  readonly guards: readonly string[];
}

function hookRoster(file: string, text: string = readFileSync(join(ROOT, file), "utf8")): HookRoster {
  const path = join(ROOT, file);
  const sf = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === path ? sf : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => ROOT,
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === path,
    readFile: name => (name === path ? text : undefined),
  };
  const checker = ts.createProgram({ rootNames: [path], options: { noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest, module: ts.ModuleKind.ESNext }, host }).getTypeChecker();
  const at = (node: ts.Node): string => `${file}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`;
  const declaration = (id: ts.Identifier): ts.Declaration | undefined => {
    const declarations = checker.getSymbolAtLocation(id)?.declarations ?? [];
    return declarations.length === 1 ? declarations[0] : undefined;
  };
  const viaVitest = (id: ts.Identifier): boolean => {
    const bound = declaration(id);
    if (bound === undefined || !ts.isImportSpecifier(bound) || bound.propertyName !== undefined) return false;
    const statement = bound.parent.parent.parent;
    return ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === "vitest";
  };
  const fileScopeConst = (argument: ts.Expression | undefined): string | undefined => {
    if (argument === undefined || !ts.isIdentifier(argument)) return undefined;
    const bound = declaration(argument);
    if (bound === undefined || !ts.isVariableDeclaration(bound) || !ts.isVariableDeclarationList(bound.parent) || (bound.parent.flags & ts.NodeFlags.Const) === 0) return undefined;
    return ts.isVariableStatement(bound.parent.parent) && bound.parent.parent.parent === sf ? argument.text : undefined;
  };
  const guardsOf = (callback: ts.Node | undefined): string => {
    const guarded: string[] = [];
    const find = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withinHookBudget") guarded.push(node.arguments[0]?.getText(sf) ?? "(no argument)");
      ts.forEachChild(node, find);
    };
    if (callback !== undefined) find(callback);
    return guarded.join(", ") || "nothing";
  };
  // R692 (wb-ouo3): the registration site, the describe chain of any node, and the hook registration or case a call runs in.
  const site = (node: ts.Node): string => {
    const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    return `${line + 1}:${character + 1}`;
  };
  const titleOf = (call: ts.CallExpression): string => {
    const title = call.arguments[0];
    return title !== undefined && ts.isStringLiteralLike(title) ? title.text : `(a non-literal title at ${at(call)})`;
  };
  const isDescribe = (node: ts.Node): node is ts.CallExpression => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "describe";
  const chainOf = (node: ts.Node): string => {
    const titles: string[] = [];
    for (let up = node.parent; up !== undefined; up = up.parent) if (isDescribe(up)) titles.unshift(titleOf(up));
    return titles.join(" > ") || "(file scope)";
  };
  const ownChain = (call: ts.CallExpression): string => (chainOf(call) === "(file scope)" ? titleOf(call) : `${chainOf(call)} > ${titleOf(call)}`);
  const rootOf = (callee: ts.Expression): ts.Expression => (ts.isCallExpression(callee) || ts.isPropertyAccessExpression(callee) ? rootOf(callee.expression) : callee);
  /** What a call registers through vitest's own named import: a hook (its registrar), "a case" or "a describe callback"; undefined for anything else. */
  const kindOf = (call: ts.CallExpression): string | undefined => {
    const callee = call.expression;
    if (ts.isIdentifier(callee) && HOOK_REGISTRARS.includes(callee.text)) return viaVitest(callee) ? callee.text : undefined;
    if (isDescribe(call)) return "a describe callback";
    const root = rootOf(callee);
    return ts.isIdentifier(root) && (root.text === "it" || root.text === "test") && viaVitest(root) ? "a case" : undefined;
  };
  /** The hook registration or case whose callback runs a call, and whether the call is that callback's own code. */
  const runsIn = (call: ts.CallExpression): string => {
    let innermost: ts.Node | undefined;
    let child: ts.Node = call;
    for (let node = call.parent; node !== undefined; child = node, node = node.parent) {
      if (ts.isCallExpression(node) && node.arguments.some(argument => argument === child)) {
        const kind = kindOf(node);
        if (kind !== undefined) return `${kind} @ ${kind === "a describe callback" ? ownChain(node) : chainOf(node)}${innermost === child ? "" : ", in a nested function"}`;
      }
      if (innermost === undefined && ts.isFunctionLike(node)) innermost = node;
    }
    return innermost === undefined ? "module code" : `a function outside every hook and case (${site(innermost)})`;
  };
  const describes: string[] = [];
  const guards: string[] = [];
  const registrations: HookRegistration[] = [];
  const findings: string[] = [];
  const visit = (node: ts.Node, chain: readonly string[]): void => {
    let inner = chain;
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "describe") {
      const title = node.arguments[0];
      inner = [...chain, title !== undefined && ts.isStringLiteralLike(title) ? title.text : `(a non-literal title at ${at(node)})`];
      describes.push(inner.join(" > "));
    } else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && HOOK_REGISTRARS.includes(node.expression.text)) {
      if (!viaVitest(node.expression)) findings.push(`${at(node)}: ${node.expression.text} is not called through vitest's own named import`);
      const timeout = node.arguments[1];
      registrations.push({ registrar: node.expression.text, chain: chain.join(" > ") || "(file scope)", guards: guardsOf(node.arguments[0]), timeout: timeout?.getText(sf) ?? "(none)", binds: fileScopeConst(timeout), site: site(node) });
    } else if (ts.isIdentifier(node) && HOOK_REGISTRARS.includes(node.text)) {
      const called = ts.isCallExpression(node.parent) && node.parent.expression === node;
      const imported = ts.isImportSpecifier(node.parent) && node.parent.propertyName === undefined;
      if (!called && !imported) findings.push(`${at(node)}: ${node.text} is named in a ${ts.SyntaxKind[node.parent.kind]}, never called as a hook registration`);
    } else if (ts.isStringLiteralLike(node) && HOOK_REGISTRARS.includes(node.text)) {
      // R692 (wb-ouo3, the wb-9rto F3 cure): a registrar named by a string key - vitest["afterAll"] or const { "afterAll": a } = vitest.
      const keyed = (ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node) || (ts.isBindingElement(node.parent) && node.parent.propertyName === node);
      if (keyed) findings.push(`${at(node)}: ${node.text} is named by a string key in a ${ts.SyntaxKind[node.parent.kind]}, never called as a hook registration`);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withinHookBudget") {
      const bound = declaration(node.expression);
      if (bound === undefined || !ts.isFunctionDeclaration(bound) || bound.parent !== sf) findings.push(`${at(node)}: withinHookBudget is called, but binds no file-scope function declaration`);
      guards.push(`${node.arguments[0]?.getText(sf) ?? "(no argument)"} | ${runsIn(node)}`);
    } else if (ts.isIdentifier(node) && node.text === "withinHookBudget") {
      const called = ts.isCallExpression(node.parent) && node.parent.expression === node;
      const declared = ts.isFunctionDeclaration(node.parent) && node.parent.name === node;
      if (!called && !declared) findings.push(`${at(node)}: withinHookBudget is named in a ${ts.SyntaxKind[node.parent.kind]}, never called directly`);
    }
    ts.forEachChild(node, child => visit(child, inner));
  };
  visit(sf, []);
  return { registrations, findings, describes, guards };
}

const rosterLine = (registration: HookRegistration): string =>
  `${registration.registrar} @ ${registration.chain} | guards ${registration.guards} | timeout ${registration.timeout}${registration.binds === undefined ? "" : " (a file-scope const)"}`;

describe("R687 (wb-9rto): the AC2 call-site hook is registered with its backstop, read from this file's AST and the runner's record", () => {
  it("the roster: every hook registration of this file, read through the binder, is the literal list, and no hook is registered any other way", () => {
    const roster = hookRoster(SELF);
    expect(roster.findings, "a hook registrar reached any way but a direct call of vitest's own named import").toEqual([]);
    expect(roster.registrations.map(rosterLine), "every hook registration: registrar, describe chain, guarded hook and timeout argument").toEqual([
      "afterAll @ wb-6hb.6 docs/workbench/06 conformance census (report mode) | guards CALL_SITE_HOOK | timeout CALL_SITE_HOOK_BACKSTOP_MS (a file-scope const)",
    ]);
  });

  it("the binding: the one registration guarding CALL_SITE_HOOK passes the file-scope CALL_SITE_HOOK_BACKSTOP_MS, 2 x the budget, as its timeout", () => {
    const guarding = hookRoster(SELF).registrations.filter(registration => registration.guards === nameOf({ CALL_SITE_HOOK }));
    expect(
      guarding.map(registration => registration.binds),
      "the file-scope const each registration guarding the call-site hook binds as its timeout: an omitted, literal, shadowed or undefined argument binds none, a swapped one another const",
    ).toEqual([nameOf({ CALL_SITE_HOOK_BACKSTOP_MS })]);
    expect(CALL_SITE_HOOK_BACKSTOP_MS, "the backstop of record is 2 x the budget").toBe(2 * CALL_SITE_HOOK_BUDGET_MS);
  });

  it("the runner: vitest holds exactly the hooks the roster names, one afterAll on the census describe and none at file scope, and stamps no timeout on it", ({ task }) => {
    const roster = hookRoster(SELF).registrations;
    const chain = roster.find(registration => registration.guards === nameOf({ CALL_SITE_HOOK }))?.chain;
    const census = task.file.tasks.find((child): child is RunnerTestSuite => child.type === "suite" && child.name === chain);
    const held = (hooks: ReturnType<typeof TestRunner.getSuiteHooks>): string[] => Object.entries(hooks).flatMap(([registrar, listeners]) => Array.from(listeners, () => registrar));
    const stamped = (hooks: ReturnType<typeof TestRunner.getSuiteHooks>): unknown[] => Object.values(hooks).flatMap(listeners => Array.from(listeners, (hook: object): unknown => Reflect.get(hook, REGISTERED_HOOK_TIMEOUT)));
    expect(census, "the describe the roster places the call-site hook in is a suite of this file").toBeDefined();
    const fileHooks = TestRunner.getSuiteHooks(task.file);
    const censusHooks = TestRunner.getSuiteHooks(census ?? task.file);
    expect(held(fileHooks), "the hooks vitest holds at file scope, as the roster names them").toEqual(roster.filter(registration => registration.chain === "(file scope)").map(registration => registration.registrar));
    expect(held(censusHooks), "the hooks vitest holds on the census describe, as the roster names them").toEqual(roster.filter(registration => registration.chain === chain).map(registration => registration.registrar));
    expect(
      stamped(censusHooks),
      "the registered timeout vitest stamps on each hook it holds on the census describe: none on its one afterAll, whose timeout lives only in its timer's closure, so the AST above is the evidence for it",
    ).toEqual([undefined]);
  });
});

/**
 * R692 (wb-ouo3, the wb-9rto F2/F3 class): the R687 runner row above reads vitest's record of file scope and of the census
 * describe only, and the roster reads Identifier callees only. The gate's L2-D2 decoy (a namespace import; the AC2
 * registration replaced by a decoy afterAll whose dead branch textually guards CALL_SITE_HOOK and keeps the backstop; the
 * real guarded body registered through vitestNs["afterAll"] in a NEW describe with one carrier case and no timeout) left
 * all three R687 rows and every other row green, 52/52. The rows below close it from four sides:
 * - the walk reads TestRunner.getSuiteHooks for EVERY suite of this file, never file scope and the census describe alone,
 *   and the suites it reaches must be exactly the describe calls the roster reads;
 * - the held-hook census binds every hook vitest holds, in any suite, to a registration the roster names in that suite:
 *   an afterAll / afterEach as vitest keeps it (no stamp and no site), a beforeAll / beforeEach / aroundAll / aroundEach by
 *   its stamped timeout (the value of the HOOK_TIMEOUT_CONSTS const its registration binds; an omitted timeout, a literal
 *   or an unlisted const reads red, fail-closed) and its registration site (vitest's source-mapped registration stack
 *   against the roster's line:column). A hook registered any way the roster cannot read is a hook vitest holds that the
 *   roster does not name: a red;
 * - the guard census lists every direct call of withinHookBudget in this file with the hook registration or case whose
 *   callback makes it, so a dead-branch decoy beside a relocated or hidden body is two guards of CALL_SITE_HOOK, and
 *   withinHookBudget named any other way (an alias, a member, an argument, a shadowing binding) is a finding;
 * - the work binding places every read of AC2_RAN (anything but the AC2 cases' push) in the body the CALL_SITE_HOOK guard
 *   runs, so a guarded no-op body beside the check moved into a case is a red.
 */
/** The file-scope consts a hook registration of this file may pass as its timeout, by name, with the value vitest would stamp. */
const HOOK_TIMEOUT_CONSTS: Readonly<Record<string, number>> = { CALL_SITE_HOOK_BACKSTOP_MS };
/** The keys vitest 4.1.10 stamps a beforeAll's / beforeEach's and an aroundAll's / aroundEach's registration stack and timeout under. */
const REGISTRATION_STACK = Symbol.for("VITEST_CLEANUP_STACK_TRACE");
const AROUND_TIMEOUT = Symbol.for("VITEST_AROUND_TIMEOUT");
const AROUND_STACK = Symbol.for("VITEST_AROUND_STACK_TRACE");
const SELF_PATH = fileURLToPath(import.meta.url);
const KEEPS_NEITHER = "no stamp and no registration site (vitest keeps neither on it)";
const R673_SUITE = "R673 (wb-csne): the AC2 call-site hook runs under its file-local budget, and an overrun is a real red naming it";

/** What vitest keeps a held hook's timeout and registration stack under, by registrar; an afterAll / afterEach keeps neither. */
const stampKeys = (registrar: string): { readonly timeout: symbol; readonly stack: symbol } | undefined =>
  registrar.startsWith("before") ? { timeout: REGISTERED_HOOK_TIMEOUT, stack: REGISTRATION_STACK } : registrar.startsWith("around") ? { timeout: AROUND_TIMEOUT, stack: AROUND_STACK } : undefined;

/** Every suite of a file: the file first, then each describe depth-first in collection order, as its chain of titles. */
function suitesOf(file: RunnerTestFile): { readonly chain: string; readonly suite: RunnerTestFile | RunnerTestSuite }[] {
  const out: { chain: string; suite: RunnerTestFile | RunnerTestSuite }[] = [{ chain: "(file scope)", suite: file }];
  const walk = (tasks: readonly RunnerTask[], titles: readonly string[]): void => {
    for (const child of tasks) {
      if (child.type !== "suite") continue;
      out.push({ chain: [...titles, child.name].join(" > "), suite: child });
      walk(child.tasks, [...titles, child.name]);
    }
  };
  walk(file.tasks, []);
  return out;
}

/** The line of a registration stack vitest stamped, resolved to this file's line:column; undefined when none names this file. */
const stackSite = (stamped: unknown): string | undefined => {
  const frame = (stamped instanceof Error ? (stamped.stack ?? "") : "").split("\n").find(line => line.includes(`${SELF_PATH}:`));
  const position = frame?.match(/:(\d+):(\d+)\)?$/);
  return position === undefined || position === null ? undefined : `${position[1]}:${position[2]}`;
};
/** One hook vitest holds, as the census reads it: suite | registrar | what vitest keeps on it. */
const heldLine = (chain: string, registrar: string, hook: object): string => {
  const keys = stampKeys(registrar);
  if (keys === undefined) return `${chain} | ${registrar} | ${KEEPS_NEITHER}`;
  return `${chain} | ${registrar} | stamped ${String(Reflect.get(hook, keys.timeout))} | registered at ${stackSite(Reflect.get(hook, keys.stack)) ?? "(no site in this file)"}`;
};
/** The line vitest must hold for one registration the roster reads, in the same shape. */
const rosterHeldLine = (registration: HookRegistration): string => {
  if (stampKeys(registration.registrar) === undefined) return `${registration.chain} | ${registration.registrar} | ${KEEPS_NEITHER}`;
  const value = registration.binds === undefined ? undefined : HOOK_TIMEOUT_CONSTS[registration.binds];
  return `${registration.chain} | ${registration.registrar} | stamped ${value ?? `(timeout ${registration.timeout}: no listed file-scope const)`} | registered at ${registration.site}`;
};
const byText = (a: string, b: string): number => a.localeCompare(b);

/**
 * The work a guard runs: every reference to the named state in a source - but its declaration and the member writes the
 * AC2 cases make - with the withinHookBudget body that holds it ("outside every guard's body" for none). The AC2 call-site
 * hook exists to bind AC2_RAN to FROZEN_JUDGED_SHAPE after every AC2 case ran (fail-closed on a narrowed it.each table and
 * on a name-filtered run), so a guarded no-op body beside the check moved into a case, where a name filter can drop it,
 * keeps the hook, its registration and its guard call standing, and reads red here.
 */
function guardedWork(file: string, text: string, names: readonly string[], writes: readonly string[]): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const bodyOf = (node: ts.Node): string => {
    let child: ts.Node = node;
    for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
      if (ts.isCallExpression(up) && ts.isIdentifier(up.expression) && up.expression.text === "withinHookBudget" && up.arguments[3] === child) return `in the body the ${up.arguments[0]?.getText(sf) ?? "(no argument)"} guard runs`;
    }
    return "outside every guard's body";
  };
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && names.includes(node.text)) {
      const parent = node.parent;
      const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : undefined;
      const declared = ts.isVariableDeclaration(parent) && parent.name === node;
      if (!declared && (member === undefined || !writes.includes(member))) out.push(`${member === undefined ? `${node.text} in a ${ts.SyntaxKind[parent.kind]}` : `${node.text}.${member}`} | ${bodyOf(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

describe("R692 (wb-ouo3): the held-hook census - every suite walked through vitest's record, bound to the roster, and every guard call placed", () => {
  it("the walk reaches every suite of this file: the suites vitest collected are exactly the describe calls the roster reads", ({ task }) => {
    const roster = hookRoster(SELF);
    expect(
      suitesOf(task.file).map(entry => entry.chain),
      "the suites the walk reaches, file scope first",
    ).toEqual(["(file scope)", ...roster.describes]);
    expect(roster.describes.length, "the describe calls of this file").toBeGreaterThanOrEqual(6);
  });

  it("the held-hook census: every hook vitest holds in any suite of this file is a registration the roster names in that suite, as vitest keeps it", ({ task }) => {
    const roster = hookRoster(SELF);
    const census: string[] = [];
    let walked = 0;
    for (const { chain, suite } of suitesOf(task.file)) {
      walked += 1;
      for (const [registrar, listeners] of Object.entries(TestRunner.getSuiteHooks(suite))) for (const hook of listeners) census.push(heldLine(chain, registrar, hook));
    }
    expect(walked, "the census read vitest's record of every suite the roster reads, never two of them alone").toBe(roster.describes.length + 1);
    expect([...census].sort(byText), "every hook vitest holds, against every registration the roster reads").toEqual(roster.registrations.map(rosterHeldLine).sort(byText));
    expect(census, "the held-hook census of record").toEqual([`wb-6hb.6 docs/workbench/06 conformance census (report mode) | afterAll | ${KEEPS_NEITHER}`]);
  });

  it("the guard census: every direct call of withinHookBudget in this file, with the registration or case whose callback makes it, is the literal list", () => {
    const roster = hookRoster(SELF);
    expect(roster.findings, "a hook registrar or withinHookBudget reached any way but a direct call of its own binding").toEqual([]);
    expect(roster.guards, "first argument | the hook registration or case that runs the call").toEqual([
      "CALL_SITE_HOOK | afterAll @ wb-6hb.6 docs/workbench/06 conformance census (report mode)",
      `"probe late" | a case @ ${R673_SUITE}, in a nested function`,
      `"probe hung" | a case @ ${R673_SUITE}, in a nested function`,
      `"probe quick" | a case @ ${R673_SUITE}`,
      `"probe broken" | a case @ ${R673_SUITE}`,
    ]);
  });

  it("the work the guard runs: the AC2 call-site check (every read of AC2_RAN) sits in the body the CALL_SITE_HOOK guard runs, and the reader is no constant", () => {
    expect(guardedWork(SELF, readRepo(SELF), ["AC2_RAN"], ["push"]), "every reference to AC2_RAN but its declaration and the AC2 cases' push, with the guard body that holds it").toEqual([
      "AC2_RAN in a SpreadElement | in the body the CALL_SITE_HOOK guard runs",
    ]);
    const hollow = [
      'afterAll(() => withinHookBudget(CALL_SITE_HOOK, "B", 1, () => undefined), BACKSTOP);',
      "if (AC2_RAN.length < 0) undefined;",
      'it("checks", () => expect([...AC2_RAN]).toEqual(SHAPE));',
      'it("guarded", () => withinHookBudget(OTHER, "B", 1, () => AC2_RAN.sort()));',
    ].join("\n");
    expect(guardedWork("hollow.ts", hollow, ["AC2_RAN"], ["push"])).toEqual([
      "AC2_RAN.length | outside every guard's body",
      "AC2_RAN in a SpreadElement | outside every guard's body",
      "AC2_RAN.sort | in the body the OTHER guard runs",
    ]);
  });

  it("the roster is no constant: a string-keyed registrar is a finding (F3), a computed key is left to the held-hook census, and an L2-D2-shaped source reads two guards", () => {
    const read = hookRoster(
      SELF,
      [
        'import * as vitestNs from "vitest";',
        'import { afterAll, describe, it } from "vitest";',
        'describe("census", () => {',
        "  afterAll(() => {",
        '    if (AC2_RAN.length < 0) return withinHookBudget(CALL_SITE_HOOK, "B", 1, () => undefined);',
        "  }, CALL_SITE_HOOK_BACKSTOP_MS);",
        "});",
        'describe("carrier", () => {',
        '  vitestNs["afterAll"](() => withinHookBudget(CALL_SITE_HOOK, "B", 1, () => undefined));',
        "  vitestNs[`afterEach`](() => undefined);",
        '  const { "beforeAll": early } = vitestNs;',
        '  vitestNs["after" + "All"](() => undefined);',
        '  it("carries", () => undefined);',
        "});",
        "const run = withinHookBudget;",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(read.findings, "each string key naming a registrar, and the alias; the computed key names none (the census's to catch)").toEqual([
      `${SELF}:9: afterAll is named by a string key in a ElementAccessExpression, never called as a hook registration`,
      `${SELF}:10: afterEach is named by a string key in a ElementAccessExpression, never called as a hook registration`,
      `${SELF}:11: beforeAll is named by a string key in a BindingElement, never called as a hook registration`,
      `${SELF}:15: withinHookBudget is named in a VariableDeclaration, never called directly`,
    ]);
    expect(read.registrations.map(rosterLine), "the roster reads the decoy only").toEqual(["afterAll @ census | guards CALL_SITE_HOOK | timeout CALL_SITE_HOOK_BACKSTOP_MS"]);
    expect(read.describes).toEqual(["census", "carrier"]);
    expect(read.guards, "the dead-branch decoy and the hidden body: two guards of CALL_SITE_HOOK").toEqual([
      "CALL_SITE_HOOK | afterAll @ census",
      "CALL_SITE_HOOK | a describe callback @ carrier, in a nested function",
    ]);
  });
});
