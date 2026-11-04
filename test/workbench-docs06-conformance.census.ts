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
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";
import { moduleImports, propertyWrites, spelledAnywhere } from "./helpers/docs06-leg-readers.js";

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
/** R692 respin (wb-ouo3 U3): the call-site hook's completion record, pushed after its assertion, so a check that never reaches its assertion reads red. */
const AC2_CHECKED: string[] = [];

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
    AC2_CHECKED.push(CALL_SITE_HOOK);
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
 * other way (a computed key such as vitest["after" + "All"], a member fetched by Reflect.get, the runner's own on("afterAll"))
 * names no registrar the roster reads, so the roster cannot see it. The R692 held-hook census below reds the hook it
 * registers only because every registration the roster reads also RUNS (the R692 respin's executing-registration rule: a
 * dead-coded or conditional registration is a finding of its own), so vitest then holds one hook more in that suite than
 * the roster names; every spelling a source reading sees of the runner's own registrar or its record of held hooks is
 * bound below too (one named import from "vitest", TestRunner read by the census rows alone; the residual of code built
 * from strings is named and pinned quiet there). An omitted, swapped, shadowed, literal or
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
/** R692 second respin (wb-ouo3 refusal #2 U1): one hook registration whose callback guards a hook, as the binder reads it. */
interface CallSite {
  /** The first argument of the registration callback's withinHookBudget call, as written. */
  readonly guards: string;
  /** The registration callback's parameter count and the kinds of its own statements: "<n> parameters | <kind>, <kind>". */
  readonly shape: string;
  /** Every name the registration reads, in source order, as "<name> -> <the declaration the checker binds it to>"; a name the guarded body declares itself (its comparators' parameters) is the body's own and is not listed. */
  readonly names: readonly string[];
  /** Every binding the registration declares outside its guarded body, as "<name> in a <construct> at <line:column>". */
  readonly declares: readonly string[];
  /** R717 (wb-ouo3 cut #4): the registration call's own text, byte for byte (comments included); the call-site text reading digests it, so an edit of the registration that no name or state reading sees (W-BODY-RETURN-BARE: an early return written with no name) reads at collection. */
  readonly text: string;
}
/** A file's hook roster (R687) and, from R692 (wb-ouo3), its describe calls and every direct call of withinHookBudget. */
interface HookRoster {
  readonly registrations: readonly HookRegistration[];
  readonly findings: readonly string[];
  /** Every describe call, as its chain of titles, outermost first, in source order. */
  readonly describes: readonly string[];
  /** Every direct call of withinHookBudget as "<first argument> | <the hook registration or case whose callback makes it>". */
  readonly guards: readonly string[];
  /** R692 respin (wb-ouo3 U1/U3): every reference to a watched binding - never its file-scope declaration of record, an import specifier, a member or key name or a type position - as "<reference> | <where it runs>", and every other declaration of the name (a shadow a row could read) as "<name> declared in a <construct> | <where>". */
  readonly references: readonly string[];
  /** R692 respin (wb-ouo3 U3): every withinHookBudget call as "<first argument> | <its guarded body's own statements, as written, joined by ' ;; '>". */
  readonly guardBodies: readonly string[];
  /** R692 second respin (wb-ouo3 refusal #2 U1): every hook registration whose callback guards a hook, with what each name it reads binds to and what it declares. */
  readonly callSites: readonly CallSite[];
  /** R692 second respin (wb-ouo3 refusal #2 U1/U3): every statement naming a watched binding (a reference or a declaration), as "<name> | <the statement as written, whitespace collapsed> | <where it runs, a case by its title>", in source order. */
  readonly statements: readonly string[];
  /** R692 second respin (wb-ouo3 refusal #2 U1; narrowed to its pins by the final cut, wb-ouo3 refusal #4 U2, R-B258): on the uses of a must-be-called name its rows plant (the "expect is only called" row, C-EXPECT-EXTEND and C-CALLBACK-SHADOW), each use but a direct call that resolves to its named import from "vitest", and that import itself, as "<use> | <where it runs>"; what it reads of any other use - a member named so, the test context's own expect, included - is NOT CLAIMED by this census (wb-mcoj carries the coverage). */
  readonly uncalled: readonly string[];
  /** R692 second respin (wb-ouo3 refusal #2 U1): every each-table case (it.each / test.each through vitest's own import), as 'the case "<title>" | each over <its table as written> -> <what the checker binds a lone identifier table to>'. */
  readonly tables: readonly string[];
  /** R717 (wb-ouo3 cut #4): every variable, parameter, destructured element, function or class declaration named withinHookBudget, anywhere, as "<construct> at file scope | <its own text, byte for byte>" ("nested" for any other place). */
  readonly guardDeclarations: readonly string[];
  /** R717 (wb-ouo3 cut #4): every name a function declaration of withinHookBudget reads but does not declare itself, in source order, as "<name> -> <the declaration the checker binds it to>". */
  readonly guardNames: readonly string[];
}

function hookRoster(file: string, text: string = readFileSync(join(ROOT, file), "utf8"), watched: readonly string[] = [], calledOnly: readonly string[] = []): HookRoster {
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
  /** The hook registration or case whose callback runs a call (or any node), and whether it is that callback's own code; titled names a case by its title. */
  const runsIn = (call: ts.Node, titled = false): string => {
    let innermost: ts.Node | undefined;
    let child: ts.Node = call;
    for (let node = call.parent; node !== undefined; child = node, node = node.parent) {
      if (ts.isCallExpression(node) && node.arguments.some(argument => argument === child)) {
        const kind = kindOf(node);
        if (kind !== undefined) return `${titled && kind === "a case" ? `the case "${titleOf(node)}"` : kind} @ ${kind === "a describe callback" ? ownChain(node) : chainOf(node)}${innermost === child ? "" : ", in a nested function"}`;
      }
      if (innermost === undefined && ts.isFunctionLike(node)) innermost = node;
    }
    return innermost === undefined ? "module code" : `a function outside every hook and case (${site(innermost)})`;
  };
  // R692 respin (wb-ouo3 U1, the executing-registration rule): every registration, describe call and registration guard
  // call the roster reads must RUN - whenever its suite is collected, or whenever its hook runs - or it is a finding. vitest
  // keeps no stamp and no site on an afterAll / afterEach, so the held-hook census binds such a hook by count alone; a
  // dead-coded or conditional registration the roster reads beside a hook registered some way it cannot read (the cut #1
  // escape G-DEADWRAP2 / G-FORGE2) would keep that count. The rule reads the statement a call makes: a registration or a
  // describe call is a statement of its own at file scope or in the own body of a plain inline describe callback (a literal
  // title, a non-async, non-generator function) whose own code neither returns nor throws; a guard call is a statement of
  // its own (under at most one await), the return value or the concise body of the registration callback, whose own code
  // neither returns before it nor throws. A branch, a loop, a try, a label, a never-called function, a && or a comma is a
  // finding, whatever its condition evaluates to.
  /** The return and throw statements of a function's own code (never a nested function's). */
  const exitsOf = (fn: ts.ArrowFunction | ts.FunctionExpression): ts.Statement[] => {
    const out: ts.Statement[] = [];
    const find = (node: ts.Node): void => {
      if (ts.isReturnStatement(node) || ts.isThrowStatement(node)) out.push(node);
      if (!ts.isFunctionLike(node)) ts.forEachChild(node, find);
    };
    ts.forEachChild(fn.body, find);
    return out;
  };
  const exitText = (exit: ts.Statement): string => `${ts.isReturnStatement(exit) ? "returns" : "throws"} at ${site(exit)}`;
  /** The construct a statement sits in, named by the owner of its block for a block. */
  const holderKind = (statement: ts.Node): string => ts.SyntaxKind[(ts.isBlock(statement.parent) ? statement.parent.parent : statement.parent).kind];
  const isInline = (node: ts.Node | undefined): node is ts.ArrowFunction | ts.FunctionExpression => node !== undefined && (ts.isArrowFunction(node) || ts.isFunctionExpression(node));
  const isPlain = (fn: ts.ArrowFunction | ts.FunctionExpression): boolean => !(ts.getModifiers(fn) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword) && !(ts.isFunctionExpression(fn) && fn.asteriskToken !== undefined);
  /** Why a hook registration or describe call would not run whenever its suite is collected; undefined when it would. */
  function whyNotRun(call: ts.CallExpression): string | undefined {
    const statement = call.parent;
    if (!ts.isExpressionStatement(statement) || statement.expression !== call) return `the call is not a statement of its own (it sits in a ${ts.SyntaxKind[statement.kind]})`;
    if (statement.parent === sf) return undefined;
    const callback = ts.isBlock(statement.parent) ? statement.parent.parent : undefined;
    const owner = callback?.parent;
    if (callback === undefined || owner === undefined || !isDescribe(owner) || !owner.arguments.some(argument => argument === callback)) return `its statement sits in a ${holderKind(statement)}, neither file scope nor a describe callback's own body`;
    const why = whyDescribeNotRun(owner);
    return why === undefined ? undefined : `its describe at ${site(owner)} does not run its callback: ${why}`;
  }
  /** Why a describe call would not run its callback as a suite of this file; undefined when it would. */
  function whyDescribeNotRun(call: ts.CallExpression): string | undefined {
    const [title, callback] = call.arguments;
    if (!ts.isIdentifier(call.expression) || !viaVitest(call.expression)) return "describe is not vitest's own named import";
    if (call.arguments.length !== 2 || title === undefined || !ts.isStringLiteralLike(title) || !isInline(callback) || !isPlain(callback)) return "it is not describe(<a literal title>, <a plain inline function>)";
    const exit = exitsOf(callback)[0];
    if (exit !== undefined) return `its callback ${exitText(exit)}`;
    return whyNotRun(call);
  }
  /** Why a withinHookBudget call in a registration's callback would not run whenever the hook runs; undefined when it would. */
  const whyGuardNotRun = (call: ts.CallExpression, callback: ts.Expression | undefined): string | undefined => {
    if (!isInline(callback)) return "the registration's callback is no inline function";
    const expression: ts.Expression = ts.isAwaitExpression(call.parent) && call.parent.expression === call ? call.parent : call;
    const holder = expression.parent;
    if (holder === callback) return undefined;
    if (!(ts.isExpressionStatement(holder) || ts.isReturnStatement(holder)) || holder.expression !== expression) return `the call is not a statement of its own (it sits in a ${ts.SyntaxKind[holder.kind]})`;
    if (holder.parent !== callback.body) return `its statement sits in a ${holderKind(holder)}, not the callback's own body`;
    const exit = exitsOf(callback).find(statement => statement !== holder);
    return exit === undefined ? undefined : `the callback ${exitText(exit)}`;
  };
  const guardCallsIn = (callback: ts.Node | undefined): ts.CallExpression[] => {
    const out: ts.CallExpression[] = [];
    const find = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withinHookBudget") out.push(node);
      ts.forEachChild(node, find);
    };
    if (callback !== undefined) find(callback);
    return out;
  };
  /** Whether an identifier refers to a binding: never a declaration's name, an import specifier, a member or key name, or a type position. */
  const isReference = (id: ts.Identifier): boolean => {
    const parent = id.parent;
    if ((ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent)) && parent.name === id) return false;
    if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
    if ((ts.isPropertyAccessExpression(parent) || ts.isPropertyAssignment(parent)) && parent.name === id) return false;
    for (let up: ts.Node = parent; !ts.isSourceFile(up); up = up.parent) if (ts.isTypeNode(up)) return false;
    return true;
  };
  /** Where a node runs: withinHookBudget's own body, the body a guard runs, or the registration, case, describe callback or module code that holds it. */
  const placeOf = (node: ts.Node, titled = false): string => {
    let child: ts.Node = node;
    for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
      if (ts.isFunctionDeclaration(up) && up.name?.text === "withinHookBudget" && up.parent === sf) return "withinHookBudget's own body";
      if (ts.isCallExpression(up) && ts.isIdentifier(up.expression) && up.expression.text === "withinHookBudget" && up.arguments[3] === child) return `the body the ${up.arguments[0]?.getText(sf) ?? "(no argument)"} guard runs`;
    }
    return runsIn(node, titled);
  };
  const statementsOf = (body: ts.Node | undefined): string => {
    if (!isInline(body)) return "(no inline body)";
    return ts.isBlock(body.body) ? body.body.statements.map(statement => statement.getText(sf)).join(" ;; ") : `(a concise body) ${body.body.getText(sf)}`;
  };
  /** The construct declaring a watched name anywhere but its file-scope declaration of record (a file-scope const, function or import): a shadow; undefined for none. */
  const shadowOf = (id: ts.Identifier): string | undefined => {
    const parent = id.parent;
    const named = (ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) && parent.name === id;
    if (!named) return undefined;
    const ofRecord = (ts.isVariableDeclaration(parent) && ts.isVariableDeclarationList(parent.parent) && ts.isVariableStatement(parent.parent.parent) && parent.parent.parent.parent === sf) || (ts.isFunctionDeclaration(parent) && parent.parent === sf);
    return ofRecord ? undefined : ts.SyntaxKind[parent.kind];
  };
  // R692 second respin (wb-ouo3 refusal #2 U1): the U3 pin reads the guarded body's text, not what its names bind, so a
  // binding that shadows a name the body reads - in the registration callback or anywhere between it and file scope -
  // leaves the pinned text standing and makes the check vacuous (D-EXPECT-SHADOW, D-AC2RAN-SHADOW: 61/61 green at cut #2).
  // The checker binds each name to its one declaration; the declarations of record are a file-scope const, a file-scope
  // function and a named import from "vitest", and anything else is named by its construct and site.
  /** A syntax kind's own name: the enum's marker aliases (FirstStatement for VariableStatement, and the like) never name it. */
  const kindName = (kind: ts.SyntaxKind): string => Object.entries(ts.SyntaxKind).find(([name, value]) => value === kind && !/^(First|Last)/.test(name))?.[0] ?? String(kind);
  /** What the checker binds a name to: a declaration of record, or the construct and site of any other binding. */
  const resolution = (id: ts.Identifier): string => {
    const declarations = checker.getSymbolAtLocation(id)?.declarations ?? [];
    const [bound] = declarations;
    if (declarations.length !== 1 || bound === undefined) return declarations.length === 0 ? "no declaration in this file" : `${declarations.length} declarations`;
    if (ts.isImportSpecifier(bound)) {
      const statement = bound.parent.parent.parent;
      const from = ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : "(no module)";
      return `${bound.propertyName === undefined ? "a named" : "an aliased"} import from "${from}"`;
    }
    if (ts.isVariableDeclaration(bound) && ts.isVariableDeclarationList(bound.parent) && (bound.parent.flags & ts.NodeFlags.BlockScoped) === ts.NodeFlags.Const && ts.isVariableStatement(bound.parent.parent) && bound.parent.parent.parent === sf) return "a file-scope const";
    if (ts.isFunctionDeclaration(bound) && bound.parent === sf) return "a file-scope function";
    return `a ${kindName(bound.kind)} at ${site(bound)}`;
  };
  const within = (node: ts.Node, outer: ts.Node): boolean => node.pos >= outer.pos && node.end <= outer.end;
  /** The name a declaration binds when it is an identifier: a variable, a parameter, a destructured element, a function or a class. */
  const declaredName = (node: ts.Node): ts.Identifier | undefined => {
    const name = ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node) || ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node) ? node.name : undefined;
    return name !== undefined && ts.isIdentifier(name) ? name : undefined;
  };
  const callSites: CallSite[] = [];
  /** Reads one registration whose callback guards a hook: its callback's shape, every name it reads, every binding it declares. */
  const readCallSite = (registration: ts.CallExpression): void => {
    const callback = registration.arguments[0];
    const [guard] = guardCallsIn(callback);
    if (guard === undefined || !isInline(callback)) return;
    const body = guard.arguments[3];
    const ownToBody = (node: ts.Node): boolean => body !== undefined && within(node, body);
    const names: string[] = [];
    const declares: string[] = [];
    const walk = (node: ts.Node): void => {
      const declared = declaredName(node);
      if (declared !== undefined && !ownToBody(node)) declares.push(`${declared.text} in a ${kindName(node.kind)} at ${site(node)}`);
      if (ts.isIdentifier(node) && isReference(node)) {
        const [bound] = checker.getSymbolAtLocation(node)?.declarations ?? [];
        if (bound === undefined || !ownToBody(bound)) names.push(`${node.text} -> ${resolution(node)}`);
      }
      ts.forEachChild(node, walk);
    };
    walk(registration);
    const own = ts.isBlock(callback.body) ? callback.body.statements.map(statement => kindName(statement.kind)).join(", ") || "(none)" : `(a concise body) ${kindName(callback.body.kind)}`;
    callSites.push({ guards: guard.arguments[0]?.getText(sf) ?? "(no argument)", shape: `${callback.parameters.length} parameters | ${own}`, names, declares, text: registration.getText(sf) });
  };
  /** The statement a node sits in, as written with its whitespace collapsed: the nearest node of a statement list. */
  const statementOf = (node: ts.Node): string => {
    let up: ts.Node = node;
    while (up.parent !== undefined && !(ts.isSourceFile(up.parent) || ts.isBlock(up.parent) || ts.isModuleBlock(up.parent) || ts.isCaseClause(up.parent) || ts.isDefaultClause(up.parent))) up = up.parent;
    return up.getText(sf).replace(/\s+/g, " ");
  };
  /** A use of a must-be-called name other than a direct call that resolves to its named import from "vitest" (and that import itself); undefined for those. */
  const useOf = (id: ts.Identifier): string | undefined => {
    const parent = id.parent;
    if (ts.isImportSpecifier(parent)) return parent.name === id && parent.propertyName === undefined && viaVitest(id) ? undefined : `${id.text} in an import specifier (${resolution(parent.name)})`;
    if (declaredName(parent) === id) return `${id.text} declared in a ${kindName(parent.kind)}`;
    if (!isReference(id)) return undefined;
    const bound = resolution(id);
    if (bound !== 'a named import from "vitest"') return `${id.text} -> ${bound}`;
    if (ts.isCallExpression(parent) && parent.expression === id) return undefined;
    return ts.isPropertyAccessExpression(parent) && parent.expression === id ? `${id.text}.${parent.name.text}` : `${id.text} in a ${kindName(parent.kind)}`;
  };
  const statements: string[] = [];
  const uncalled: string[] = [];
  const tables: string[] = [];
  const references: string[] = [];
  const guardBodies: string[] = [];
  const describes: string[] = [];
  const guards: string[] = [];
  const registrations: HookRegistration[] = [];
  const findings: string[] = [];
  const guardDeclarations: string[] = [];
  const guardNames: string[] = [];
  /** R717 (wb-ouo3 cut #4): every name a function reads that the checker binds outside it, in source order. */
  const namesReadBy = (fn: ts.FunctionDeclaration): string[] => {
    const read: string[] = [];
    const walk = (node: ts.Node): void => {
      if (ts.isIdentifier(node) && isReference(node)) {
        const [bound] = checker.getSymbolAtLocation(node)?.declarations ?? [];
        if (bound === undefined || !within(bound, fn)) read.push(`${node.text} -> ${resolution(node)}`);
      }
      ts.forEachChild(node, walk);
    };
    ts.forEachChild(fn, walk);
    return read;
  };
  const visit = (node: ts.Node, chain: readonly string[]): void => {
    let inner = chain;
    const declaredAs = declaredName(node);
    if (declaredAs !== undefined && declaredAs.text === "withinHookBudget") {
      const fileScope = ts.isFunctionDeclaration(node) ? node.parent === sf : ts.isVariableDeclaration(node) && ts.isVariableDeclarationList(node.parent) && ts.isVariableStatement(node.parent.parent) && node.parent.parent.parent === sf;
      guardDeclarations.push(`${kindName(node.kind)} ${fileScope ? "at file scope" : "nested"} | ${node.getText(sf)}`);
      if (ts.isFunctionDeclaration(node)) guardNames.push(...namesReadBy(node));
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "describe") {
      const title = node.arguments[0];
      inner = [...chain, title !== undefined && ts.isStringLiteralLike(title) ? title.text : `(a non-literal title at ${at(node)})`];
      describes.push(inner.join(" > "));
      const why = whyDescribeNotRun(node);
      if (why !== undefined) findings.push(`${at(node)}: describe does not run its callback whenever this file is collected: ${why}`);
    } else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && HOOK_REGISTRARS.includes(node.expression.text)) {
      if (!viaVitest(node.expression)) findings.push(`${at(node)}: ${node.expression.text} is not called through vitest's own named import`);
      const timeout = node.arguments[1];
      registrations.push({ registrar: node.expression.text, chain: chain.join(" > ") || "(file scope)", guards: guardsOf(node.arguments[0]), timeout: timeout?.getText(sf) ?? "(none)", binds: fileScopeConst(timeout), site: site(node) });
      readCallSite(node);
      if (viaVitest(node.expression)) {
        const why = whyNotRun(node);
        if (why !== undefined) findings.push(`${at(node)}: ${node.expression.text} does not run whenever its suite is collected: ${why}`);
        for (const guard of guardCallsIn(node.arguments[0])) {
          const guardWhy = whyGuardNotRun(guard, node.arguments[0]);
          if (guardWhy !== undefined) findings.push(`${at(guard)}: the withinHookBudget call guarding ${guard.arguments[0]?.getText(sf) ?? "(no argument)"} does not run whenever its ${node.expression.text} runs: ${guardWhy}`);
        }
      }
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
      guardBodies.push(`${node.arguments[0]?.getText(sf) ?? "(no argument)"} | ${statementsOf(node.arguments[3])}`);
    } else if (ts.isIdentifier(node) && node.text === "withinHookBudget") {
      const called = ts.isCallExpression(node.parent) && node.parent.expression === node;
      const declared = ts.isFunctionDeclaration(node.parent) && node.parent.name === node;
      if (!called && !declared) findings.push(`${at(node)}: withinHookBudget is named in a ${ts.SyntaxKind[node.parent.kind]}, never called directly`);
    }
    if (ts.isIdentifier(node) && watched.includes(node.text)) {
      const shadow = shadowOf(node);
      const member = ts.isPropertyAccessExpression(node.parent) && node.parent.expression === node ? node.parent.name.text : undefined;
      if (shadow !== undefined) references.push(`${node.text} declared in a ${shadow} | ${placeOf(node)}`);
      else if (isReference(node)) references.push(`${member === undefined ? `${node.text} in a ${ts.SyntaxKind[node.parent.kind]}` : `${node.text}.${member}`} | ${placeOf(node)}`);
      if (isReference(node) || declaredName(node.parent) === node) statements.push(`${node.text} | ${statementOf(node)} | ${placeOf(node, true)}`);
    }
    if (ts.isIdentifier(node) && calledOnly.includes(node.text)) {
      const use = useOf(node);
      if (use !== undefined) uncalled.push(`${use} | ${placeOf(node)}`);
    }
    if (ts.isCallExpression(node) && ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression) && node.expression.expression.name.text === "each" && kindOf(node) === "a case") {
      const each = node.expression.arguments;
      const [table] = each;
      tables.push(`the case "${titleOf(node)}" | each over ${each.map(argument => argument.getText(sf)).join(", ")}${each.length === 1 && table !== undefined && ts.isIdentifier(table) ? ` -> ${resolution(table)}` : ""}`);
    }
    ts.forEachChild(node, child => visit(child, inner));
  };
  visit(sf, []);
  return { registrations, findings, describes, guards, references, guardBodies, callSites, statements, uncalled, tables, guardDeclarations, guardNames };
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
 *   against the roster's line:column). An afterAll / afterEach is bound by count alone, so the census binds it to a
 *   registration that RUNS only with the respin's executing-registration rule below: with every roster registration
 *   running, a hook registered any way the roster cannot read is one hook more in its suite than the roster names, a red.
 *   Cut #1 claimed that red without the rule, and the gate's G-DEADWRAP2 / G-FORGE2 (a getCurrentSuite().on("afterAll")
 *   hook beside the landed registration dead-coded under an if) kept the count: G-FORGE2 56/56 green, G-DEADWRAP2 red on
 *   the R673 readings row alone (wb-ouo3 refusal #1, U2);
 * - the guard census lists every direct call of withinHookBudget in this file with the hook registration or case whose
 *   callback makes it, so a dead-branch decoy beside a relocated or hidden body is two guards of CALL_SITE_HOOK, and
 *   withinHookBudget named any other way (an alias, a member, an argument, a shadowing binding) is a finding;
 * - the work binding places every reference to AC2_RAN but a variable declaration of the name and a push, wherever either
 *   sits, in the body the CALL_SITE_HOOK guard runs, so a guarded no-op body beside the check moved into a case is a red.
 *   Cut #2 said "every read of AC2_RAN (anything but the AC2 cases' push)": the reader exempts every push and every
 *   variable declaration of the name, and the gate's D-PLANT-PUSH (a push from module code beside an it.each narrowed
 *   to four halves) read 60/60 green (wb-ouo3 refusal #2, U2 (d)); the call-site state row of the second respin binds
 *   each.
 * The respin (wb-ouo3 refusal #1: U1 class-closing, U2 claims, U3 the check's own leg) adds five rows. The CLASS: every
 * hook vitest holds, in any suite, binds to a registration that RUNS, and every reading the R673 rows count is written
 * inside withinHookBudget:
 * - the executing-registration rule (in hookRoster, so the landed R687 roster row reads it too): every registration and
 *   describe call the roster reads is a statement of its own at file scope or in the own body of a plain inline describe
 *   callback whose own code neither returns nor throws, and every guard call of a registration is a statement of its own,
 *   the return value or the concise body of the registration callback; a dead or conditional form is a finding, whatever
 *   the hook's registrar spelling beside it;
 * - the readings binding: every reference to HOOK_READINGS is the push in withinHookBudget's own body or a read by an R673
 *   row, and no other declaration of the name exists, so a reading planted in module code, a hidden hook or a case, or a
 *   shadow array a row could read, is a red;
 * - the runtime-handle binding: vitest is imported by name from "vitest" alone (no namespace import, no vitest/suite, no
 *   @vitest/runner), nothing is loaded at run time, and TestRunner - the import that reaches the runner's own registrar
 *   (getCurrentSuite().on) and its record of held hooks (getSuiteHooks) - is read only by the census rows' getSuiteHooks
 *   and declared nowhere else (no shadow), so no spelling a source reading sees registers a hook through the runner's API
 *   or replaces one in vitest's record at run time (code built from strings is the residual below);
 * - the call-site check is the check (U3): the guarded body is the landed assertion followed by a completion record, pinned
 *   statement by statement, and the record is read, so an early return before the assertion or a vacuous expectation
 *   written in the body reads red (the pin is this file's own source: an edit of the check together with its pin is a
 *   visible two-edit change). The pin reads the body's text, not what its names bind: cut #2 claimed that a vacuous
 *   expectation reads red, and the gate's D-EXPECT-SHADOW (a function named expect declared in the registration callback)
 *   and D-AC2RAN-SHADOW (a const named AC2_RAN there) each read 61/61 green, the name filter -t 'AC2 bullet 1' exiting 0
 *   (wb-ouo3 refusal #2, U1 and U2 (a)); the second respin's rows below bind what the body's names resolve to;
 * - named residual, with its pinned quiet row: run-time code built from strings and the globals that reach a module loader
 *   or vitest's worker state (eval, the Function constructor, a constructor member, globalThis, process, require,
 *   __vitest_worker__ and, from the second respin, global - Node's alias of globalThis, through which vitest's matcher
 *   state and its custom equality testers are reachable too) are beyond any reading of source syntax; this file names
 *   none of them, and the quiet row reds the moment one is written as an identifier, a member name or a string key. A
 *   name built from parts at run time (a computed key) is read as nothing: the disclosed edge of the quiet row, not
 *   claimed.
 * The second respin (wb-ouo3 refusal #2: U1 the call-site check's names, U2 claims, U3 the push exemption) adds five rows
 * and a collection-time leg.
 * The CLASS (rule 19 (d), bound on refusal #2): the call-site check is non-vacuous only when every name its guarded body
 * reads (expect, AC2_RAN, FROZEN_JUDGED_SHAPE, AC2_CHECKED, CALL_SITE_HOOK) resolves to its declaration of record and
 * every write to AC2_RAN is the AC2 case's push in the census describe:
 * - the names of record: the checker binds every name the call-site registration reads - its registrar, the guard, the
 *   budget and backstop consts, and every name the guarded body reads but its own comparators' parameters - to a
 *   file-scope const, the file-scope withinHookBudget or a named import from "vitest"; the registration declares nothing
 *   outside its guarded body, and its callback takes no parameter and holds one statement, the return of its guard call.
 *   A shadow in any binding form, anywhere between the body and file scope, rebinds a name the body reads and reads red;
 * - the call-site state: every statement of this file naming AC2_RAN, AC2_CHECKED or FROZEN_JUDGED_SHAPE, as written and
 *   with where it runs (a case by its title), is the literal list - the three declarations of record, the AC1 and M10
 *   reads of the frozen shape, the guarded body's statements, the U3 row's read and the one write of AC2_RAN, the AC2
 *   case's push - so a write or declaration of AC2_RAN anywhere else (module code, another case, the hook's callback, an
 *   alias, an edited or a second push in the AC2 case) and a mutation of the frozen shape where it runs each read red;
 *   and the AC2 cases' each-table is JUDGED, the file-scope const the AC1 rows bind to the frozen judged subset, so a
 *   narrowed table, or a forged entry that pushes a key for a half whose pins it does not judge, reads red here too;
 * - expect is only called, as its reader reads the identifier expect (narrowed to the pins by the final cut, wb-ouo3
 *   refusal #4 U2, R-B258): the reader reads no use of that identifier in this file but a direct call that resolves to
 *   its named import, and reads red each use its rows plant - the "expect is only called" row's aliased import
 *   (import { expect as check }), expect.extend, expect.addEqualityTesters, an alias (const alias = expect), an argument
 *   (register(expect)) and a function named expect declared in a case with the call it captures, and the planted
 *   members C-EXPECT-EXTEND (expect.extend at module scope) and C-CALLBACK-SHADOW (a const named expect in the
 *   call-site callback). The test context's own expect, reached as a member of a case's context parameter, is a member
 *   named expect, not that identifier: it is NOT CLAIMED by this census (the gate's G-CTX-TESTERS changes no reading,
 *   so -t 'AC2 bullet 1' exits 0 under it), and its coverage is wb-mcoj's;
 * - named residual, with its pinned quiet row: this file spells no prototype route (prototype, __proto__, getPrototypeOf,
 *   setPrototypeOf, defineProperty, defineProperties) as an identifier, a member name included, or as a string or
 *   no-substitution template literal, and the quiet row reds the moment one is written so (a template with a
 *   substitution is NOT CLAIMED). Cut #3 said here that the code the guarded body calls without naming a binding - the
 *   matcher behind toEqual, the array's sort and spread, localeCompare - can be tampered with, beyond expect's own members
 *   and the global object, "only through a prototype". Refusal #3 falsified it (U2 (a), R717 (3)): T-CHAI overwrote the
 *   matcher through chai's public plugin API from a static import (import { Assertion } from "chai", then
 *   Assertion.overwriteMethod("toEqual", ...) at module scope), and T-DESC-SORT found Array's prototype among the values
 *   of Object.getOwnPropertyDescriptors(Array), its key never written, and replaced its sort; each read 66/66 green with
 *   -t 'AC2 bullet 1' exiting 0 at cut #3. That code's surface includes expect's own members, the global object, a
 *   prototype route, another module's API (T-CHAI), a reflective route (T-DESC-SORT), a member write and a name built from
 *   parts at run time, and this census does not claim that list complete: cut #4 claims exactly its enumerated classes
 *   (R717 below) and names the rest NOT CLAIMED. A route built from parts at run time - an object's own keys or
 *   descriptors enumerated through a name built that way included - is read as nothing: the disclosed edge of the quiet
 *   row, not claimed;
 * - the fail-closed leg (at the end of this file): a name filter skips every row, so collection re-reads the call-site
 *   binding at module scope, where no binding can shadow the reader, with no matcher, against the literals the rows pin,
 *   and throws on any difference in a reading it names, so that run of this file, -t 'AC2 bullet 1' included, exits 1
 *   (the delivered bytes' filtered run exits 1 on the hook's own check, as landed); the fifth row pins the leg and shows
 *   it is no constant. Cut #3 said every run "then exits 1", and its delivery note "under every member": that held for
 *   the members whose edits a reading of the leg names, and refusal #3's W-SWALLOW-T, T-CHAI, T-DESC-SORT and
 *   W-BODY-SKIP-T changed no reading the leg then read, each exiting 0 under the filter (U2 (b)); cut #4 claims the exit 1
 *   for its enumerated classes only (R717 below);
 * - out of the class, not claimed: the call-site check binds that every frozen judged half ran its AC2 case once; what an
 *   AC2 case asserts after its push is that case's own body (the census helper's three legs judge the pinned cases it
 *   reads), not the call-site check's.
 * The enumerate-the-resolvable cut (cut #4: wb-ouo3 refusal #3 at M:13504, owner R717, orchestrator R-B215; rule 19 (c):
 * the class - the docs06 AC2 call-site check's own leg - is frozen). R717 (1): TAMPER_CLASSES_OF_RECORD is the closed
 * named list of the tamper classes the call-site check detects at collection, one per reading of the fail-closed leg, in
 * the leg's order; a class is the edits of this file's text that change its reading's output on that text (each reader's
 * doc says what it outputs). The R717 rows bind the list to the readings the leg runs, read from the leg's own source
 * (legReadings), and prove each class red-first: every planted member - an edit of this file's own text, made in memory -
 * is refused by the leg naming exactly the readings it changes (one row per member, by its id), every class has a
 * planted member, and the delivered text reads no difference (the fail-closed leg row: green after). Six readings are
 * cut #4's: the modules loaded, the reflective routes spelled, the property writes, the call-site text, the guard's
 * declaration and the guard's names. Refusal #3's members, each a planted row of its id: W-SWALLOW-T (an edit of
 * withinHookBudget's own text: the guard's declaration), W-SWALLOW and W-BODY-SKIP-T (the guard's declaration, and the
 * guard's names: each edit reads the global undefined), T-CHAI (the modules loaded), T-CHAI-NARROW (the each-tables and
 * the modules loaded) and T-DESC-SORT (the reflective routes spelled and the property writes); the seat of the respin
 * that died found W-BODY-RETURN-BARE (an early return written with no name before the guarded check: the call-site
 * text). The frozen shape (rule 16) pins every class with the number of its planted members and every member with the
 * number of readings refusing it.
 * NOT CLAIMED by this census (R717 (2): a tamper outside the enumerated classes is not this leg's): a tamper made outside
 * this file's text - in another module (each module of the modules-loaded record included), in vitest, its config or
 * setup files, or in the runtime; a name built from parts at run time - a computed key reaching a route, a writer API or
 * a key, an object's own keys or descriptors enumerated through such a name included; a builtin replaced by an
 * assignment to its global name; an edit of FROZEN_JUDGED_SHAPE's own declaration, which the leg does not read (the AC1
 * rows and the rule 16 battery judge it in a full run); and an edit that also changes what the leg computes - one of its
 * readers (from the restatement, the shared module's moduleImports, propertyWrites and spelledAnywhere among them),
 * records or digests, its refusal, or a builtin its readers run on - which the full run's rows judge (the
 * fail-closed leg row, the R717 rows and the hollowing batteries), never collection.
 * The final cut (wb-ouo3 refusal #4, M:44680; the rule 19 structural exit R-B258) narrowed the reader claims to their
 * pins and deferred the member coverage to the child wb-mcoj. Refusal #5 (O:1738) took the dependency inversion R-B309,
 * and wb-mcoj landed (landing 840) the readers of the modules loaded and the property writes as the shared module
 * test/helpers/docs06-leg-readers.ts - moduleImports, and propertyWrites composing spelledAnywhere over WRITER_ROUTE,
 * cut #5's code byte for byte - with its own census, test/workbench-docs06-leg-readers-census.test.ts, which pins that
 * code and those readers' readings of its plants. The restatement (the parent's re-cut over its landed carrier: cut
 * #6, cut #7 after refusal #6 (O:1885, R-B406), cut #8 after refusal #7 (O:1923, R-B436), cut #9 after refusal #8
 * (O:1968, R-B474) and cut #10 after refusal #9 (O:2012, R-B508)) rides that module: this file imports moduleImports,
 * propertyWrites and spelledAnywhere from it, and its modules-loaded record holds that load.
 * Through those readers this census claims exactly the readings its own rows take: of this file's text (its loads as
 * the record; no member write and no writer API; no prototype or reflective route spelled), of the "the modules loaded"
 * row's loads.ts, the "the property writes" row's writes.ts and the two route rows' texts, of each planted member's text
 * through the leg (the members those readers refuse: T-CHAI, T-CHAI-NARROW and C-VITEST-SUITE by the modules loaded;
 * T-DESC-SORT and C-MEMBER-WRITE by the property writes; C-PROTOTYPE by the prototype routes spelled; T-DESC-SORT and
 * C-OWN-NAMES by the reflective routes spelled), of each twin's planted text and unit (the restatement rows) and of row
 * (E)'s witnesses. CLAIMED here as well, by the R717 planted-member rows: the leg refuses each gate twin of refusals #4
 * and #5 that wb-mcoj's roster (test/fixtures/docs06-leg-readers-roster.json) plants, each planted on this file's text in
 * memory and refused naming exactly the reading it changes - G-TWIN-TS-NAMED, G-TWIN2-NS, GP9-TWIN-NODE-ALIAS2,
 * GP9-TWIN-NODE-ALIAS and GP9-TWIN-NODE-TYPEONLY (one of this file's import declarations edited: the modules loaded) and
 * G-TWIN2-PW (two lines added in the AC2 case before its push: the property writes), each twin's edit as row (D) reads
 * it. The restatement rows claim, each by its own assertions:
 * (A) that member set is the roster's twins, in the roster's order, each refused by the reading of its roster table;
 * (B) each twin's planted text reads through the shared readers (sharedReading: moduleImports' entries, then
 * propertyWrites' with each write's place, its line counted from this file's AC2 case head, that head's line being 1) as
 * this file's own reading - the record's loads and no write - with exactly the one edit TWIN_READINGS names, as
 * readingEdit gives it, at the index it names: each import twin's entry in place of the entry of the import it edits
 * (index 4, the typescript import, or 1, the node:fs import), and G-TWIN2-PW's one write added at index 8, after the
 * loads: an assignment to sink.length at 3:6, line 3 counted from the AC2 case head and column 6;
 * (C) each twin's unit (twinUnit: an import twin's planted import declarations, one per line in source order, the shared
 * readers' load set aside; G-TWIN2-PW's planted lines after the AC2 case head through its push, between MCOJ_AC2_HEAD
 * and MCOJ_AC2_CLOSE) and its reading through the shared reader of its table hash with the twin's id to exactly the
 * sha256 the roster pins for that plant (rosterDigest: the digest of a plant's id, text and reading, as wb-mcoj's
 * census's rosterPlant computes it and its ROSTER row holds the roster to its plants); this file's own import
 * declarations, the shared readers' load set aside, read as the record less that load and hash so to P-RECORD's; and the
 * record is P-RECORD's reading and then one entry more, the shared readers' load - its eighth entry, last - as this
 * file's text loads the shared readers on the line right after its last other import declaration;
 * (D) each twin's planted text is this file's text outside the twin's unit, piece for piece: unitCut cuts a text at the
 * parts twinUnit takes its unit from (unitParts: an import twin's import declarations but the shared readers' load, each
 * from its first token to its end; G-TWIN2-PW's lines after the AC2 case head through its push, one part), holds those
 * parts, joined as twinUnit joins them, to the text's twinUnit, and keeps the text before the first part, between each
 * two and after the last; and the twin's unit is this file's with one edit (plantReading): an import twin's parts are
 * this file's one for one with exactly one changed, and G-TWIN2-PW's part is this file's lines with exactly two lines
 * added before the last, its push. Its witnesses row reads each OUTSIDE_WITNESSES text - its twin's planted text with
 * the witness's plant applied - as the reading its form names: the "outside" form (content added outside the twin's
 * unit) as another outside with its twin's unit edit, the "unit" form (the unit edited a second time) as this file's
 * outside and another unit, the "dropped" form (an import declaration of the unit removed) as another outside and
 * another unit (its parts not this file's one for one) and the "parts" form (G-TWIN2-PW's push removed, so that the
 * part unitParts cuts is not the text's twinUnit) as parts other than twinUnit's; OUTSIDE_WITNESSES_SHAPE freezes each
 * witness's id, twin and form. What each witness's plant writes, and where, is the witness roster's, not this header's
 * (the witness roster row, cut #9 and cut #10): each OUTSIDE_WITNESSES witness's id, twin, form and line edit of its
 * twin's planted text (lineEdit: the line the edit follows, the lines it removes, the lines it adds and the line it
 * precedes), and each READING_EDIT_WITNESSES witness's id and line edit of this file's text, are the entries
 * test/fixtures/docs06-conformance-witness-roster.json records, in order; and each witness's base text (its twin's
 * planted text, or this file's) holds the line its edit follows or the line it precedes once (placeHeld), so each
 * witness's entry fixes where its edit is (cut #10, refusal #9 U2). The "outside" witnesses add a line of code, a blank
 * line, a line comment or a trailing space at the places the roster records: each of the four after G-TWIN-TS-NAMED's
 * edited import (W-OUT-REEXPORT and W-OUT-SHARED-REPEATED, W-OUT-BLANK-LINE, W-OUT-LINE-COMMENT, W-OUT-TRAILING-SPACE)
 * and after G-TWIN2-PW's push or on the line after it (W-OUT-AFTER-PUSH, W-OUT-PW-BLANK-LINE, W-OUT-PW-LINE-COMMENT,
 * W-OUT-PW-TRAILING-SPACE); a line of code after GP9-TWIN-NODE-TYPEONLY's edited import (W-OUT-TYPEONLY-REEXPORT),
 * before the first import declaration (W-OUT-BEFORE-IMPORTS) and before the AC2 case head (W-OUT-BEFORE-HEAD); and,
 * from cut #10 (refusal #9 U1), each of the four deep inside an outside piece, away from the edges of the unit and of
 * the piece - after HOOK_TIMEOUT_CONSTS' doc line (DEEP_DOC) in G-TWIN-TS-NAMED's piece after the imports
 * (W-OUT-DEEP-CODE, W-OUT-DEEP-BLANK-LINE, W-OUT-DEEP-LINE-COMMENT, W-OUT-DEEP-TRAILING-SPACE) and in G-TWIN2-PW's piece
 * after its push (W-OUT-PW-DEEP-CODE, W-OUT-PW-DEEP-BLANK-LINE, W-OUT-PW-DEEP-LINE-COMMENT, W-OUT-PW-DEEP-TRAILING-SPACE),
 * and after duplicatePins' doc line (EARLY_DOC) in G-TWIN2-PW's piece before its AC2 case head (W-OUT-PW-EARLY-CODE,
 * W-OUT-PW-EARLY-BLANK-LINE, W-OUT-PW-EARLY-LINE-COMMENT, W-OUT-PW-EARLY-TRAILING-SPACE); W-OUT-SHARED-MOVED moves the
 * shared readers' load from after the last import declaration to before G-TWIN-TS-NAMED's edited import. So the
 * witnesses row holds the outside comparison to read a twin's planted text with one of those kinds added at a place
 * where a witness of that twin adds it as another outside, and the comparison narrowed to each piece's edges reds that
 * row (refusal #9's GP24-P1-EDGES3,
 * each piece's first and last three lines, and GP24-P2-EDGES400, its first and last 400 characters);
 * (E) readingEdit reads each READING_EDIT_WITNESSES text through the shared readers - this file's text with its
 * node:crypto import moved after its node:url import, with its node:path and node:url imports swapped, and with its
 * node:fs import repeated, each witness's line edit of this file's text the witness roster's - as exactly the edit
 * READING_EDITS names for it, the moved, swapped and repeated entries inside that edit; and each of those edits and
 * each twin's, applied to this file's reading (applyEdit: the entries before the edit's index, then the entries it
 * adds, then the reading's entries after the ones it drops, which must be the reading's at that index), gives back the
 * text's reading.
 * As far as the roster holds wb-mcoj's plants, (C) and (D) make each twin's planted text this file's text with
 * wb-mcoj's plant of that id in its unit's place - an import twin's unit (its planted import declarations, the shared
 * readers' load set aside) that plant's text, and G-TWIN2-PW's two lines before its push that plant's two statements (a
 * sink declared, then its length written through an object pattern property with a computed key) - and this file's own
 * import declarations, the shared readers' load set aside, P-RECORD (the cut #5 block wb-mcoj's census plants), its
 * reading the record's first seven entries, the shared readers' load the eighth. Falsifiers, each measured red on this
 * census by the cut #10 battery: the gate narrowing each twin witnessed (G-MI-DEFAULT-NAMED, G-MI-DEFAULT-NS,
 * GP9-MI-NODE-ALIAS, GP9-MI-NODE-TYPEONLY, G-PW-COMPUTED-KEY), applied to the shared module, hides its twin from the leg
 * and reds that twin's row and rows (B) and (C); an edit of a twin's plant inside its unit reds (C); one outside its
 * unit, of a kind and at a place one of that twin's "outside" witnesses adds it - a line of code, a blank line, a line
 * comment or a trailing space added next to the unit, after DEEP_DOC or after EARLY_DOC - reds (D), with the twin's
 * TWIN_READINGS entry changed to match (refusal #7's GN1C, GN3C, GN7C, GN8C and GN2C) or kept (their one-literal forms
 * GN1, GN3, GN7, GN8 and GN2, which red (B) as well, and refusal #8's GP4-TS-BLANK, GP4-PW-BLANK and GP4-TS-COMMENT,
 * cut #9's X9-TS-TSPACE, X9-PW-TSPACE and X9-PW-COMMENT and this cut's X10-TS-DEEP-CODE, X10-TS-DEEP-TSPACE,
 * X10-PW-DEEP-COMMENT and X10-PW-EARLY-BLANK, which do not); plantReading's outside comparison narrowed to trimmed
 * pieces (refusal #8's GP4-N-OUT-TRIM), to pieces with their line comments dropped (GP4-N-OUT-NOCOMMENT), to pieces
 * with their blank lines dropped (cut #9's X9-N-OUT-NOBLANK), to lines with their trailing spaces dropped
 * (X9-N-OUT-TRIMEND), to the set of each piece's lines (this cut's X10-P-LINE-SET) or to each piece's edges (refusal
 * #9's GP24-P1-EDGES3 and GP24-P2-EDGES400, and this cut's X10-P-EDGES-100-LINES, each piece's first and last hundred
 * lines, and X10-P-EDGES3+COUNT, its first and last three lines and its line count) reds row (D) witnesses, alone and
 * paired with a twin plant it would hide; a witness's plant edited (refusal #8's GP4-W1 to GP4-W11, this cut's
 * X10-N-DEEP-CODE-TO-EDGE, X10-N-PWEARLY-BLANK-TO-COMMENT, X10-N-PWDEEP-TSPACE-EMPTY, X10-N-DEEP-DOC-SWAP and
 * X10-N-EARLY-DOC-SWAP, and GP4-E1C and GP4-E2C with their READING_EDITS entries) or moved to another place (refusal
 * #9's GP24-R1 and GP24-R2: W-OUT-BEFORE-IMPORTS' and W-OUT-BEFORE-HEAD's plants written after another line of the text
 * each follows; this cut's X10-R-DEEP-BLANK-RELOCATED: W-OUT-DEEP-BLANK-LINE's written after EARLY_DOC), a witness
 * removed from its table and its frozen-shape or READING_EDITS entry (GP4-WC5, GP4-EC5), or a table's witnesses removed
 * from every literal of this file (GP4-WC6, GP4-EC6), reds the witness roster row, and so do lineEdit's precedes
 * narrowed (this cut's X10-L-PRECEDES-NULL, X10-L-PRECEDES-AS-FOLLOWS, X10-L-PRECEDES-OFF-BY-ONE; precedes read from
 * the second text, X10-L-PRECEDES-FROM-TO, is the same line by the tail loop's own condition and stays green) and
 * placeHeld narrowed (X10-H-ALWAYS, X10-H-FOLLOWS-ONLY, X10-H-PRECEDES-ONLY, X10-H-AT-LEAST-ONCE, X10-H-BOTH);
 * readingEdit narrowed to the entries one reading has and the other lacks (refusal #7's N-RE-SET) reds (E);
 * a twin member removed from every literal of this file reds (A); an edit of the roster's digest of a twin or of
 * P-RECORD reds (C), and so does this file's shared readers' load moved to the head of its import block with its record
 * entry and TWIN_READINGS' import indices moved with it (refusal #7's GN5C). NOT CLAIMED by this census, as at the
 * final cut: what the readers of the modules loaded, the
 * property writes and the uses of expect output on any other text - a form or combination neither their rows, the
 * planted members nor the witnesses of rows (D) and (E) plant, G-MI-NSEXPORT's export * as <name> included (the shared
 * module's readings of wb-mcoj's plants are that census's claims, not this one's) - and the test context's own expect, a
 * member named expect (G-CTX-TESTERS, under which -t 'AC2 bullet 1' exits 0; wb-mcoj's named residual R-CTX-EXPECT,
 * whose two quiet rows read this file). NOT CLAIMED by this census either (the restatement's scope at cut #10): what
 * unitParts, unitCut, plantReading, readingEdit and applyEdit return for any text but this file's, the twins' planted
 * texts and the witnesses rows (D) and (E) plant, what lineEdit returns for any pair of texts but a witness's and its
 * base text and PLACE_CONTROL's, and what placeHeld reads for any but those; what plantReading's outside comparison
 * reads for an outside that differs from this file's in a way or at a place no witness plants (a block comment, a tab,
 * a letter's case, a line ending, a line changed in place or lines reordered among the ways; one of the four kinds
 * added to a twin's planted text where no "outside" witness of that twin adds that kind among the places - inside
 * this file's opening doc comment, say, after EARLY_DOC in G-TWIN-TS-NAMED's, or anywhere in GP9-TWIN-NODE-TYPEONLY's
 * but a line of code after its edited import); a witness's plant and its
 * witness roster entry changed or removed together - the witness roster is the witnesses' record, as the docs section
 * is the TABLE's; and wb-mcoj's census itself - (C) matches each unit to the roster's digest and never reads that
 * census, so a twin's plant, its roster digest and wb-mcoj's plant of it changed together are that census's rows' to
 * refuse, not this one's.
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
 * The work a guard runs: every reference to the named state in a source - but any variable declaration of the name and any
 * member access named in writes, wherever either sits - with the withinHookBudget body that holds it ("outside every
 * guard's body" for none). The AC2 call-site hook exists to bind AC2_RAN to FROZEN_JUDGED_SHAPE after every AC2 case ran
 * (fail-closed on a narrowed it.each table and on a name-filtered run), so a guarded no-op body beside the check moved into
 * a case, where a name filter can drop it, keeps the hook, its registration and its guard call standing, and reads red
 * here. Cut #2 said "but its declaration and the member writes the AC2 cases make": the reader skips every variable
 * declaration of the name and every push wherever it sits (wb-ouo3 refusal #2, U2 (c)); the call-site state row binds them.
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

/**
 * R692 respin (wb-ouo3 U1): every import from the vitest family (vitest, vitest/*, @vitest/*) as "<module> | <what it
 * binds>", and every module a source loads at run time (import(), require(), import x = require()), as written. The one
 * named import from "vitest" is the only way this file reaches vitest: a namespace import would reach any export through
 * a computed key, and vitest/suite or @vitest/runner hold the runner's own registrar and its record of held hooks.
 */
function vitestImports(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && /^(vitest(\/|$)|@vitest\/)/.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      const bound: string[] = [];
      if (clause?.name !== undefined) bound.push(`default as ${clause.name.text}`);
      const bindings = clause?.namedBindings;
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) bound.push(`* as ${bindings.name.text}`);
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) bound.push(`${element.isTypeOnly ? "type " : ""}${element.propertyName === undefined ? element.name.text : `${element.propertyName.getText(sf)} as ${element.name.text}`}`);
      }
      out.push(`${node.moduleSpecifier.text} | ${clause?.isTypeOnly === true ? "type " : ""}${bound.join(", ") || "(nothing bound)"}`);
    } else if (ts.isImportEqualsDeclaration(node) || (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require")))) {
      out.push(`${node.getText(sf)} | loaded at run time`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/**
 * R692 respin (wb-ouo3, the named residual of the U1 class): run-time code built from strings, and the globals that reach a
 * module loader or vitest's worker state, are beyond any reading of source syntax - a census reads what a file says, not
 * what a string evaluates to. This file names none of them; namedAnywhere lists every identifier, member name or
 * string-literal element key that spells one, so the quiet row below reds the moment one is written.
 */
const RUNTIME_ESCAPES: readonly string[] = ["eval", "Function", "constructor", "globalThis", "global", "process", "require", "__vitest_worker__", "getBuiltinModule", "createRequire"];
function namedAnywhere(file: string, text: string, names: readonly string[]): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    const keyed = ts.isStringLiteralLike(node) && ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
    if ((ts.isIdentifier(node) || keyed) && names.includes(node.text)) {
      const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
      out.push(`${node.text} at ${line + 1}:${character + 1}${keyed ? " (a string key)" : ""}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
/**
 * R692 second respin (wb-ouo3 refusal #2, the named residual of its class): the prototype routes - one way to tamper with
 * the code the call-site check calls without naming a binding (the matcher behind toEqual, the array's sort and spread,
 * localeCompare). Cut #3 said here that such code can be tampered with, beyond expect's own members and the global
 * object, "only through a prototype"; refusal #3's T-CHAI (chai's Assertion.overwriteMethod from a static import) and
 * T-DESC-SORT (Array's prototype reached through Object.getOwnPropertyDescriptors) falsified it (U2 (a), R717 (3)), and
 * cut #4 reads the modules loaded, the reflective routes spelled and the property writes beside it. PROTOTYPE_ROUTE names
 * the routes as a pattern, never as strings, so the list spells none of them; spelledAnywhere (the shared module's,
 * test/helpers/docs06-leg-readers.ts, from the restatement) lists every identifier, a member name included, and every
 * string or no-substitution template literal that spells one (a template with a substitution is NOT CLAIMED).
 */
const PROTOTYPE_ROUTE = /^(prototype|__proto__|getPrototypeOf|setPrototypeOf|defineProperty|defineProperties)$/;
/**
 * R717 (wb-ouo3 cut #4, the reflective-routes class; refusal #3 U3): the reflective routes this census reads - the APIs
 * that reach a property through its descriptor, through the list of an object's own keys or through its accessor, so a
 * prototype is reached with its key never written (refusal #3 T-DESC-SORT: Array's prototype found among the values of
 * Object.getOwnPropertyDescriptors(Array)). A pattern, never strings, so the list spells none of them; spelledAnywhere
 * (the shared module's) reads each as an identifier, a member name included, or as a string or no-substitution template
 * literal (a template with a substitution is NOT CLAIMED).
 */
const REFLECTIVE_ROUTE = /^(getOwnPropertyDescriptor|getOwnPropertyDescriptors|getOwnPropertyNames|getOwnPropertySymbols|ownKeys|__lookupGetter__|__lookupSetter__)$/;
const R687_SUITE = "R687 (wb-9rto): the AC2 call-site hook is registered with its backstop, read from this file's AST and the runner's record";
const R692_SUITE = "R692 (wb-ouo3): the held-hook census - every suite walked through vitest's record, bound to the roster, and every guard call placed";
/**
 * The call-site binding of record (R692 second respin, wb-ouo3 refusal #2): the rows below pin each reading against these
 * literals, and the collection leg at the end of this file re-reads them at module scope, where a name filter cannot skip
 * it.
 */
/** Every name the AC2 call-site registration reads, in source order, with what the checker binds it to (refusal #2 U1). */
const CALL_SITE_NAMES_OF_RECORD: readonly string[] = [
  'afterAll -> a named import from "vitest"',
  "withinHookBudget -> a file-scope function",
  "CALL_SITE_HOOK -> a file-scope const",
  "CALL_SITE_HOOK_BUDGET_MS -> a file-scope const",
  'expect -> a named import from "vitest"',
  "AC2_RAN -> a file-scope const",
  "FROZEN_JUDGED_SHAPE -> a file-scope const",
  "AC2_CHECKED -> a file-scope const",
  "CALL_SITE_HOOK -> a file-scope const",
  "CALL_SITE_HOOK_BACKSTOP_MS -> a file-scope const",
];
/** Every statement of this file naming AC2_RAN, AC2_CHECKED or FROZEN_JUDGED_SHAPE, as written, with where it runs (refusal #2 U1, U3). */
const CALL_SITE_STATE_OF_RECORD: readonly string[] = [
  'FROZEN_JUDGED_SHAPE | const FROZEN_JUDGED_SHAPE: readonly string[] = ["1/guard:6", "2/guard:4", "3/guard:2", "4/guard:4", "5/digest-mismatch:3"]; | module code',
  "AC2_RAN | const AC2_RAN: string[] = []; | module code",
  "AC2_CHECKED | const AC2_CHECKED: string[] = []; | module code",
  'FROZEN_JUDGED_SHAPE | expect(judgedShape(JUDGED), "the judged subset: the AC2 it.each table").toEqual(FROZEN_JUDGED_SHAPE); | the case "AC1 frozen shape (rule 16): the judged subset is the literal list, so a narrowed judged predicate reds it" @ wb-6hb.6 docs/workbench/06 conformance census (report mode)',
  'AC2_RAN | expect([...AC2_RAN].sort((a, b) => a.localeCompare(b)), "every frozen judged half ran its AC2 case exactly once").toEqual([...FROZEN_JUDGED_SHAPE].sort((a, b) => a.localeCompare(b))); | the body the CALL_SITE_HOOK guard runs',
  'FROZEN_JUDGED_SHAPE | expect([...AC2_RAN].sort((a, b) => a.localeCompare(b)), "every frozen judged half ran its AC2 case exactly once").toEqual([...FROZEN_JUDGED_SHAPE].sort((a, b) => a.localeCompare(b))); | the body the CALL_SITE_HOOK guard runs',
  "AC2_CHECKED | AC2_CHECKED.push(CALL_SITE_HOOK); | the body the CALL_SITE_HOOK guard runs",
  `AC2_RAN | AC2_RAN.push(judgedKey({ row, half })); | the case "AC2 bullet $row.bullet/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report" @ wb-6hb.6 docs/workbench/06 conformance census (report mode)`,
  'FROZEN_JUDGED_SHAPE | expect(judgedShape(narrowed)).not.toEqual(FROZEN_JUDGED_SHAPE); | the case "M10: a judged predicate narrowed to the larger halves leaves the table and its count shape untouched and is red by the frozen judged subset (CT7)" @ wb-6hb.6 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)',
  `AC2_CHECKED | expect(AC2_CHECKED, "the call-site hook's completion record: its assertion statement returned and the record followed, once").toEqual([CALL_SITE_HOOK]); | the case "the call-site check is the check (U3): its guarded body is the landed assertion and then its completion record, and the record says that statement returned, once (what its names bind: the second respin's rows)" @ ${R692_SUITE}`,
];
/** Every each-table case of this file: the AC2 cases' (refusal #2 U1) and, from cut #4, the R717 planted members'. */
const CALL_SITE_TABLES_OF_RECORD: readonly string[] = [
  `the case "AC2 bullet $row.bullet/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report" | each over JUDGED -> a file-scope const`,
  `the case "R717 planted member $id: the leg refuses this file's text with the member planted in memory, naming exactly the readings it changes" | each over PLANTED_MEMBERS -> a file-scope const`,
];
/** Beside them the leg re-reads, restated from the rows that pin them: the hook roster (R687), the vitest import and the runner reads (the runtime-handle row). */
const CALL_SITE_REGISTRATIONS_OF_RECORD: readonly string[] = ["afterAll @ wb-6hb.6 docs/workbench/06 conformance census (report mode) | guards CALL_SITE_HOOK | timeout CALL_SITE_HOOK_BACKSTOP_MS (a file-scope const)"];
const VITEST_IMPORTS_OF_RECORD: readonly string[] = ["vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner"];
const RUNNER_READS_OF_RECORD: readonly string[] = [`TestRunner.getSuiteHooks | a case @ ${R687_SUITE}`, `TestRunner.getSuiteHooks | a case @ ${R687_SUITE}`, `TestRunner.getSuiteHooks | a case @ ${R692_SUITE}`];
/** R717 (wb-ouo3 cut #4): the sha256 of a text, as hex: the call-site registration and the guard are pinned by their own text's digest, so no record repeats the source it pins. */
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
/** "<what> | <text>" as "<what> | sha256 <the text's digest>". */
const digestLine = (line: string): string => `${line.slice(0, line.indexOf(" | "))} | sha256 ${sha256(line.slice(line.indexOf(" | ") + 3))}`;
/**
 * R717 (wb-ouo3 cut #4; narrowed by the restatement, refusal #5 F1): this file's loads as moduleImports reads them, with
 * what each binds - from the restatement (R-B309), the shared readers' module among them (vitestImports reads the vitest
 * family alone).
 */
const MODULE_IMPORTS_OF_RECORD: readonly string[] = [
  "node:crypto | createHash",
  "node:fs | readFileSync",
  "node:path | basename, dirname, join",
  "node:url | fileURLToPath",
  "typescript | default as ts",
  "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
  "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
  "./helpers/docs06-leg-readers.js | moduleImports, propertyWrites, spelledAnywhere",
];
/** R717 (wb-ouo3 cut #4): the call-site registration's own text, byte for byte, as the guard it calls and the text's sha256. */
const CALL_SITE_TEXT_OF_RECORD: readonly string[] = ["CALL_SITE_HOOK | sha256 910f7973da000f5515b4d701b33180cbbd2999fabcb2586df70c58bfb3c45c5d"];
/** R717 (wb-ouo3 cut #4): every declaration named withinHookBudget, as its construct, its place and its own text's sha256. */
const GUARD_DECLARATIONS_OF_RECORD: readonly string[] = ["FunctionDeclaration at file scope | sha256 232f29f9b6834b1aa9d721c324666c00101ed698d180661e4f86747d3555be70"];
/** R717 (wb-ouo3 cut #4): every name the guard's declaration reads but does not declare itself, in source order, with what the checker binds it to. */
const GUARD_NAMES_OF_RECORD: readonly string[] = [
  "performance -> no declaration in this file",
  "Promise -> no declaration in this file",
  "setTimeout -> no declaration in this file",
  "Promise -> no declaration in this file",
  "Promise -> no declaration in this file",
  "Math -> no declaration in this file",
  "performance -> no declaration in this file",
  "HOOK_READINGS -> a file-scope const",
  "expect -> a named import from \"vitest\"",
  "clearTimeout -> no declaration in this file",
];

/**
 * R717 (wb-ouo3 cut #4): the explicit budget of every row that runs the fail-closed leg on a text - the fail-closed leg
 * row (this file's text and four planted sources) and each R717 planted-member row - file-local like JUDGE_BUDGET_MS, so
 * no such row rides vitest's default 5000 ms: one run of the leg builds the binder and checker over this whole file twice
 * and parses it seven more times.
 * Sized as 5 x the measured p99 of the costliest such row (the fail-closed leg row), rounded up to a whole 5 s, then
 * doubled for host load: measured 2026-10-31 at load1 118-145, about a third of the load1 357.8-395.0 the JUDGE_BUDGET_MS
 * sizing above read, over 14 runs of this file alone (6 sequential, 4 rounds of 2-way): the fail-closed leg row min 2120
 * ms, median 2786 ms, p99 3994 ms; the planted-member rows median 611 ms, p99 926 ms. 5 x 3994 ms = 19970 ms, rounded up
 * to 20000 ms, doubled: 40000 ms.
 */
const LEG_BUDGET_MS = 40_000;
const LEG: { readonly timeout: number } = { timeout: LEG_BUDGET_MS };

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

  it("the roster is no constant: a string-keyed registrar is a finding (F3), a computed key is left to the held-hook census, and an L2-D2-shaped source reads two guards, its dead-branch decoy a finding", () => {
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
    expect(read.findings, "the dead-branch decoy's guard, each string key naming a registrar, and the alias; the computed key names none (the census's to catch)").toEqual([
      `${SELF}:5: the withinHookBudget call guarding CALL_SITE_HOOK does not run whenever its afterAll runs: its statement sits in a IfStatement, not the callback's own body`,
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

  it("the executing-registration rule (U1): every registration and describe call the roster reads runs whenever its suite is collected, and every guard call of a registration runs whenever its hook runs", () => {
    expect(hookRoster(SELF).findings, "a registration, describe call or guard call of this file that might not run, or any other finding").toEqual([]);
    const read = hookRoster(
      "executing.ts",
      [
        'import { afterAll, afterEach, beforeAll, describe, it } from "vitest";',
        'afterAll(() => withinHookBudget(HOOK, "B", 1, () => undefined), BACKSTOP);',
        "if (BUDGET < 0) afterAll(() => undefined);",
        "BUDGET < 0 && afterEach(() => undefined);",
        "const later = () => beforeAll(() => undefined);",
        'describe("d", () => {',
        "  afterAll(() => {",
        '    if (BUDGET < 0) return withinHookBudget(HOOK, "B", 1, () => undefined);',
        "  }, BACKSTOP);",
        "  afterAll(async () => {",
        '    await withinHookBudget(HOOK, "B", 1, () => undefined);',
        "  });",
        '  it("c", () => undefined);',
        "});",
        'describe("early", () => {',
        "  if (BUDGET > 0) return;",
        "  afterAll(() => undefined);",
        "});",
        'describe("skipped", { skip: true }, () => {',
        "  afterAll(() => undefined);",
        "});",
        "for (const x of [1]) afterAll(() => x);",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(read.findings, "each dead, conditional or unreached registration, describe call and guard call, as it stands; the live ones at :2, :7 (the registration), :10 and :11 read none").toEqual([
      "executing.ts:3: afterAll does not run whenever its suite is collected: its statement sits in a IfStatement, neither file scope nor a describe callback's own body",
      "executing.ts:4: afterEach does not run whenever its suite is collected: the call is not a statement of its own (it sits in a BinaryExpression)",
      "executing.ts:5: beforeAll does not run whenever its suite is collected: the call is not a statement of its own (it sits in a ArrowFunction)",
      "executing.ts:8: the withinHookBudget call guarding HOOK does not run whenever its afterAll runs: its statement sits in a IfStatement, not the callback's own body",
      "executing.ts:15: describe does not run its callback whenever this file is collected: its callback returns at 16:19",
      "executing.ts:17: afterAll does not run whenever its suite is collected: its describe at 15:1 does not run its callback: its callback returns at 16:19",
      "executing.ts:19: describe does not run its callback whenever this file is collected: it is not describe(<a literal title>, <a plain inline function>)",
      "executing.ts:20: afterAll does not run whenever its suite is collected: its describe at 19:1 does not run its callback: it is not describe(<a literal title>, <a plain inline function>)",
      "executing.ts:22: afterAll does not run whenever its suite is collected: its statement sits in a ForOfStatement, neither file scope nor a describe callback's own body",
    ]);
  });

  it("the readings binding (U1): every reference to HOOK_READINGS is the push in withinHookBudget's own body or a read by an R673 row, and nothing else declares the name, so no reading the R673 rows count is written outside the guard", () => {
    expect(hookRoster(SELF, readRepo(SELF), ["HOOK_READINGS"]).references, "every reference to HOOK_READINGS, with where it runs").toEqual([
      "HOOK_READINGS.push | withinHookBudget's own body",
      `HOOK_READINGS.filter | a case @ ${R673_SUITE}`,
    ]);
    const forged = hookRoster(
      "forged.ts",
      [
        'import { afterAll, describe, it } from "vitest";',
        "HOOK_READINGS.push(FORGED);",
        'describe("d", () => {',
        "  afterAll(() => {",
        "    HOOK_READINGS.push(FORGED);",
        "  });",
        "  const alias = HOOK_READINGS;",
        '  it("c", () => withinHookBudget(HOOK, "B", 1, () => HOOK_READINGS.splice(0)));',
        '  it("r", () => {',
        "    const HOOK_READINGS = [FORGED];",
        "    return HOOK_READINGS.filter(reading => reading);",
        "  });",
        "});",
        "function withinHookBudget(): void {",
        "  HOOK_READINGS.push(READING);",
        "}",
      ].join("\n"),
      ["HOOK_READINGS"],
    );
    expect(forged.references, "a reading planted in module code or a hook, an alias, a write in a guarded body and a shadow a row reads each read as they stand").toEqual([
      "HOOK_READINGS.push | module code",
      "HOOK_READINGS.push | afterAll @ d",
      "HOOK_READINGS in a VariableDeclaration | a describe callback @ d",
      "HOOK_READINGS.splice | the body the HOOK guard runs",
      "HOOK_READINGS declared in a VariableDeclaration | a case @ d",
      "HOOK_READINGS.filter | a case @ d",
      "HOOK_READINGS.push | withinHookBudget's own body",
    ]);
  });

  it("the runtime-handle binding (U1): vitest is imported by name from \"vitest\" alone, nothing is loaded at run time, and TestRunner is read only by the R687 / R692 census rows' getSuiteHooks", () => {
    expect(vitestImports(SELF, readRepo(SELF)), "every import from the vitest family, and every module loaded at run time").toEqual(["vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner"]);
    expect(hookRoster(SELF, readRepo(SELF), ["TestRunner"]).references, "every run-time reference to TestRunner, with where it runs").toEqual([
      `TestRunner.getSuiteHooks | a case @ ${R687_SUITE}`,
      `TestRunner.getSuiteHooks | a case @ ${R687_SUITE}`,
      `TestRunner.getSuiteHooks | a case @ ${R692_SUITE}`,
    ]);
    const handles = [
      'import { getCurrentSuite } from "vitest/suite";',
      'import * as vitestNs from "vitest";',
      'import { afterAll as later, it, TestRunner, type RunnerTask } from "vitest";',
      'import type { Suite } from "@vitest/runner";',
      'const runner = await import("vitest");',
      "const T = TestRunner;",
      'TestRunner.getCurrentSuite().on("afterAll", () => undefined);',
      'it("c", () => TestRunner["getSuiteHooks"](task));',
      'it("d", () => {',
      "  const TestRunner = { getSuiteHooks: () => FAKE };",
      "  return TestRunner.getSuiteHooks(task);",
      "});",
    ].join("\n");
    expect(vitestImports("handles.ts", handles), "the runner's own module, a namespace import, an alias and a run-time load each read as they stand").toEqual([
      "vitest/suite | getCurrentSuite",
      "vitest | * as vitestNs",
      "vitest | afterAll as later, it, TestRunner, type RunnerTask",
      "@vitest/runner | type Suite",
      'import("vitest") | loaded at run time',
    ]);
    expect(hookRoster("handles.ts", handles, ["TestRunner"]).references, "the runner reached as a value, through its own registrar and by a string key").toEqual([
      "TestRunner in a VariableDeclaration | module code",
      "TestRunner.getCurrentSuite | module code",
      "TestRunner in a ElementAccessExpression | a case @ (file scope)",
      "TestRunner declared in a VariableDeclaration | a case @ (file scope)",
      "TestRunner.getSuiteHooks | a case @ (file scope)",
    ]);
  });

  it("the call-site check is the check (U3): its guarded body is the landed assertion and then its completion record, and the record says that statement returned, once (what its names bind: the second respin's rows)", () => {
    expect(AC2_CHECKED, "the call-site hook's completion record: its assertion statement returned and the record followed, once").toEqual([CALL_SITE_HOOK]);
    const roster = hookRoster(SELF, readRepo(SELF), ["AC2_CHECKED"]);
    expect(
      roster.guardBodies.filter(body => body.startsWith(`${nameOf({ CALL_SITE_HOOK })} | `)),
      "the body the CALL_SITE_HOOK guard runs, statement by statement as written: a vacuous expectation or an early return reads red",
    ).toEqual([
      'CALL_SITE_HOOK | expect([...AC2_RAN].sort((a, b) => a.localeCompare(b)), "every frozen judged half ran its AC2 case exactly once").toEqual([...FROZEN_JUDGED_SHAPE].sort((a, b) => a.localeCompare(b))); ;; AC2_CHECKED.push(CALL_SITE_HOOK);',
    ]);
    expect(roster.references, "every reference to AC2_CHECKED, with where it runs").toEqual(["AC2_CHECKED.push | the body the CALL_SITE_HOOK guard runs", `AC2_CHECKED in a CallExpression | a case @ ${R692_SUITE}`]);
  });

  it("named residual, pinned quiet: this file names no run-time code from strings and no global that reaches a module loader or vitest's worker state, and the reader sees each spelling as written", () => {
    expect(namedAnywhere(SELF, readRepo(SELF), RUNTIME_ESCAPES), "eval, Function, a constructor member, globalThis or global, process, require, vitest's worker global or a module loader, named anywhere in this file").toEqual([]);
    const escapes = ["const f = (() => 0).constructor;", "const g = globalThis.process;", 'require("vitest/suite");', 'const w = Reflect.get(globalThis, "__vitest_worker__");', 'const m = g["getBuiltinModule"];', 'const t = global[Symbol.for("$$jest-matchers-object")];'].join("\n");
    expect(namedAnywhere("escapes.ts", escapes, RUNTIME_ESCAPES), "a member name, a global, a loader call and a string key, each read as it stands").toEqual([
      "constructor at 1:21",
      "globalThis at 2:11",
      "process at 2:22",
      "require at 3:1",
      "globalThis at 4:23",
      "getBuiltinModule at 5:13 (a string key)",
      "global at 6:11",
    ]);
  });

  it("the names of record (refusal #2 U1): every name the call-site registration reads resolves to a file-scope const, the file-scope withinHookBudget or a named vitest import, and the registration declares nothing a shadow could be", () => {
    const sites = hookRoster(SELF).callSites;
    expect(
      sites.map(entry => entry.guards),
      "every registration whose callback guards a hook",
    ).toEqual([nameOf({ CALL_SITE_HOOK })]);
    expect(
      sites.map(entry => entry.shape),
      "the call-site callback: no parameter and one statement of its own, the return of its guard call",
    ).toEqual(["0 parameters | ReturnStatement"]);
    expect(
      sites.flatMap(entry => entry.declares),
      "every binding the registration declares outside its guarded body",
    ).toEqual([]);
    expect(
      sites.flatMap(entry => entry.names),
      "every name the registration reads, in source order, with the declaration the checker binds it to",
    ).toEqual(CALL_SITE_NAMES_OF_RECORD);
    const shadowed = hookRoster(
      "shadowed.ts",
      [
        'import { afterAll, describe, expect } from "vitest";',
        "const STATE: string[] = [];",
        "const SHAPE: readonly string[] = [];",
        'const LABEL = "label";',
        'describe("d", () => {',
        "  const SHAPE: readonly string[] = [...STATE];",
        "  afterAll((_suite: unknown, STATE: readonly string[] = []) => {",
        '    const { LABEL } = { LABEL: "forged" };',
        "    function expect(): void {}",
        '    return withinHookBudget(HOOK, "B", 1, () => {',
        "      expect([...STATE].sort((a, b) => a.localeCompare(b)), LABEL).toEqual(SHAPE);",
        "    });",
        "  }, BACKSTOP);",
        "});",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    ).callSites;
    expect(
      shadowed.map(entry => entry.shape),
      "a callback with two parameters and two statements before the return of its guard call",
    ).toEqual(["2 parameters | VariableStatement, FunctionDeclaration, ReturnStatement"]);
    expect(
      shadowed.flatMap(entry => entry.declares),
      "a parameter, a destructured binding and a function the callback declares, each named where it stands",
    ).toEqual(["_suite in a Parameter at 7:13", "STATE in a Parameter at 7:30", "LABEL in a BindingElement at 8:13", "expect in a FunctionDeclaration at 9:5"]);
    expect(
      shadowed.flatMap(entry => entry.names),
      "each name the guarded body reads bound to the shadow nearest it - a function, a parameter, a destructured binding, a describe-level const - and the comparator's own parameters never listed",
    ).toEqual([
      'afterAll -> a named import from "vitest"',
      "withinHookBudget -> a file-scope function",
      "HOOK -> no declaration in this file",
      "expect -> a FunctionDeclaration at 9:5",
      "STATE -> a Parameter at 7:30",
      "LABEL -> a BindingElement at 8:13",
      "SHAPE -> a VariableDeclaration at 6:9",
      "BACKSTOP -> no declaration in this file",
    ]);
  });

  it("the call-site state (refusal #2 U1, U3): every statement naming AC2_RAN, AC2_CHECKED or FROZEN_JUDGED_SHAPE is the literal list, so the one write of AC2_RAN is the AC2 case's push, its cases run over JUDGED, and the frozen shape is never written", () => {
    expect(
      hookRoster(SELF, readRepo(SELF), ["AC2_RAN", "AC2_CHECKED", "FROZEN_JUDGED_SHAPE"]).statements,
      "<name> | the statement as written | where it runs, for every statement of this file naming the call-site state",
    ).toEqual(CALL_SITE_STATE_OF_RECORD);
    const planted = hookRoster(
      "planted.ts",
      [
        'import { afterAll, describe, it } from "vitest";',
        'const STATE: string[] = ["planted"];',
        "const SHAPE: readonly string[] = [];",
        'STATE.push("module");',
        "const alias = STATE;",
        'describe("d", () => {',
        '  afterAll(() => withinHookBudget(HOOK, "B", 1, () => check([...STATE], SHAPE)));',
        '  it("records", () => {',
        "    STATE.push(KEY);",
        "    if (KEY) STATE.push(OTHER);",
        "  });",
        '  it("later", () => {',
        "    (SHAPE as string[]).pop();",
        "  });",
        "});",
      ].join("\n"),
      ["STATE", "SHAPE"],
    ).statements;
    expect(planted, "an initialized declaration, a push from module code, an alias, a second push in the recording case and a mutation in a later case each read as they stand").toEqual([
      'STATE | const STATE: string[] = ["planted"]; | module code',
      "SHAPE | const SHAPE: readonly string[] = []; | module code",
      'STATE | STATE.push("module"); | module code',
      "STATE | const alias = STATE; | module code",
      'STATE | afterAll(() => withinHookBudget(HOOK, "B", 1, () => check([...STATE], SHAPE))); | the body the HOOK guard runs',
      'SHAPE | afterAll(() => withinHookBudget(HOOK, "B", 1, () => check([...STATE], SHAPE))); | the body the HOOK guard runs',
      'STATE | STATE.push(KEY); | the case "records" @ d',
      'STATE | if (KEY) STATE.push(OTHER); | the case "records" @ d',
      'SHAPE | (SHAPE as string[]).pop(); | the case "later" @ d',
    ]);
    expect(hookRoster(SELF).tables, "every each-table case of this file: the AC2 cases run over JUDGED, the file-scope const the AC1 rows bind to the frozen judged subset").toEqual(CALL_SITE_TABLES_OF_RECORD);
    const tables = hookRoster(
      "tables.ts",
      ['import { it, test } from "vitest";', 'it.each(JUDGED.slice(0, 4))("narrowed", () => undefined);', 'it.each([...JUDGED, FORGED])("forged", () => undefined);', 'test.each(ROWS)("rows", () => undefined);', "const ROWS: readonly string[] = [];"].join("\n"),
    ).tables;
    expect(tables, "a narrowed table, a forged one and a table bound to its declaration, each read as it stands").toEqual([
      'the case "narrowed" | each over JUDGED.slice(0, 4)',
      'the case "forged" | each over [...JUDGED, FORGED]',
      'the case "rows" | each over ROWS -> a file-scope const',
    ]);
  });

  it("expect is only called (refusal #2 U1): the reader reads no use of the identifier expect in this file but a direct call that resolves to its named import, and reads each other use its row plants as written", () => {
    expect(hookRoster(SELF, readRepo(SELF), [], ["expect"]).uncalled, "each use of the identifier expect the reader reads, but a direct call of its named import from vitest").toEqual([]);
    const tampered = hookRoster(
      "tampered.ts",
      [
        'import { expect, it } from "vitest";',
        'import { expect as check } from "vitest";',
        "expect.extend({});",
        "expect.addEqualityTesters([]);",
        "const alias = expect;",
        "register(expect);",
        'it("c", () => {',
        "  function expect(): void {}",
        "  expect();",
        "});",
        "expect(1).toBe(check);",
      ].join("\n"),
      [],
      ["expect"],
    ).uncalled;
    expect(tampered, "an aliased import, a member, an alias, an argument and a shadowing declaration with the call it captures each read as they stand; the direct call of the named import reads none").toEqual([
      'expect in an import specifier (an aliased import from "vitest") | module code',
      "expect.extend | module code",
      "expect.addEqualityTesters | module code",
      "expect in a VariableDeclaration | module code",
      "expect in a CallExpression | module code",
      "expect declared in a FunctionDeclaration | a case @ (file scope), in a nested function",
      "expect -> a FunctionDeclaration at 8:3 | a case @ (file scope)",
    ]);
  });

  it("named residual, pinned quiet (refusal #2): this file spells no prototype route, so the matcher, the sort and spread and localeCompare the call-site check calls are the runtime's own, and the reader reads each spelling its row plants as written", () => {
    expect(spelledAnywhere(SELF, readRepo(SELF), PROTOTYPE_ROUTE), "prototype, __proto__, getPrototypeOf, setPrototypeOf, defineProperty or defineProperties, spelled anywhere in this file").toEqual([]);
    const routes = [
      "Object.getPrototypeOf(expect(0)).toEqual = () => undefined;",
      "Array.prototype.sort = sorted;",
      "[].__proto__.push = pushed;",
      "Reflect.setPrototypeOf(AC2_RAN, null);",
      'Object.defineProperty(String.prototype, "localeCompare", { value: compare });',
      'const p = Reflect.get(Array, "prototype");',
      "const q = Array[`defineProperties`];",
      'const r = holder.myprototype + holder.prototypes + "xgetPrototypeOf" + "definePropertyOf";',
    ].join("\n");
    expect(spelledAnywhere("routes.ts", routes, PROTOTYPE_ROUTE), "a member name, a string argument and a template key, each read as it stands; a longer name or string reads as nothing").toEqual([
      "getPrototypeOf at 1:8",
      "prototype at 2:7",
      "__proto__ at 3:4",
      "setPrototypeOf at 4:9",
      "defineProperty at 5:8",
      "prototype at 5:30",
      "prototype at 6:30 (a string)",
      "defineProperties at 7:17 (a string)",
    ]);
  });

  it("the fail-closed leg (refusal #2): collection re-reads the call-site binding at module scope with no matcher and refuses on any difference, so a name-filtered run fails closed; the leg is no constant", LEG, () => {
    expect(CALL_SITE_BINDING_BROKEN, "the call-site binding of record holds at collection").toEqual([]);
    expect(
      hookRoster(SELF, readRepo(SELF), ["CALL_SITE_BINDING_BROKEN"]).statements.map(line => line.slice(0, line.indexOf(" | ", line.indexOf(" | ") + 3)).split("`")[0]),
      "every statement naming the leg's reading, each up to its first template literal, in source order: this row's read, then the reading at module scope and the refusal that names it twice",
    ).toEqual([
      'CALL_SITE_BINDING_BROKEN | expect(CALL_SITE_BINDING_BROKEN, "the call-site binding of record holds at collection").toEqual([]);',
      "CALL_SITE_BINDING_BROKEN | const CALL_SITE_BINDING_BROKEN = callSiteBindingBroken();",
      "CALL_SITE_BINDING_BROKEN | if (CALL_SITE_BINDING_BROKEN.length > 0) throw new Error(",
      "CALL_SITE_BINDING_BROKEN | if (CALL_SITE_BINDING_BROKEN.length > 0) throw new Error(",
    ]);
    const text = readRepo(SELF);
    const hook = "    // R673 (wb-csne): the landed body runs inside withinHookBudget;";
    const declaration = "const AC2_CHECKED: string[] = [];";
    const sources = [
      text.replace(hook, `    const AC2_RAN: readonly string[] = [...FROZEN_JUDGED_SHAPE];\n${hook}`),
      text.replace(declaration, `${declaration}\nAC2_RAN.push("5/digest-mismatch:3");`),
      text.replace(declaration, `${declaration}\nexpect.extend({});`),
      text.replace(declaration, `${declaration}\nconst { length } = FROZEN_JUDGED_SHAPE;`),
    ];
    expect(
      sources.map(source => callSiteBindingBroken(source).map(line => line.slice(0, line.indexOf(":")))),
      "a shadow in the hook's callback, a planted push, a matcher extended and a read of the frozen shape outside the rows, each named by the readings it breaks",
    ).toEqual([
      ["the call-site registrations", "the call-site declarations", "the call-site names", "the call-site state", "the call-site text"],
      ["the call-site state"],
      ["the uses of expect"],
      ["the call-site state"],
    ]);
  });
});

/**
 * R717 (wb-ouo3 cut #4, enumerate-the-resolvable): the readings of the fail-closed leg as its own source names them - the
 * first argument of each differs call in callSiteBindingBroken's body, in source order - so the closed list of tamper
 * classes below is bound to the readings the leg runs, an anchor outside the list itself.
 */
function legReadings(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node, inLeg: boolean): void => {
    const leg = inLeg || (ts.isFunctionDeclaration(node) && node.name !== undefined && node.name.text === "callSiteBindingBroken");
    if (leg && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "differs") {
      const [reading] = node.arguments;
      out.push(reading !== undefined && ts.isStringLiteralLike(reading) ? reading.text : `(a reading named by ${reading?.getText(sf) ?? "nothing"})`);
    }
    ts.forEachChild(node, child => visit(child, leg));
  };
  visit(sf, false);
  return out;
}
/**
 * R717 (1) (wb-ouo3 cut #4): the closed named list of the tamper classes the call-site check detects at collection - one
 * class per reading of the fail-closed leg, in the leg's order. A class is the edits of this file's text that change its
 * reading's output on that text (each reader's doc says what it outputs); the census claims no other class.
 */
const TAMPER_CLASSES_OF_RECORD: readonly string[] = [
  "the roster's findings",
  "the hook registrations",
  "the call-site registrations",
  "the call-site declarations",
  "the call-site names",
  "the call-site state",
  "the each-tables",
  "the uses of expect",
  "the vitest imports",
  "the runner reads",
  "the run-time escapes spelled",
  "the prototype routes spelled",
  "the modules loaded",
  "the reflective routes spelled",
  "the property writes",
  "the call-site text",
  "the guard's declaration",
  "the guard's names",
];
/** R717 (wb-ouo3 cut #4): one member planted on this file's own text, in memory (never on disk), with the leg's readings that refuse it. */
interface PlantedMember {
  readonly id: string;
  /** What the member edits, and where it comes from. */
  readonly what: string;
  readonly plant: (text: string) => string;
  /** The readings the leg names on the planted text, in the leg's order: the classes this member proves. */
  readonly refusedBy: readonly string[];
}
/** A planted edit: the first occurrence of an anchor replaced (a function replacer, so no replacement pattern applies). */
const replacingFirst =
  (anchor: string, by: string) =>
  (text: string): string =>
    text.replace(anchor, () => by);
/** A planted edit: module code appended at the end of the text. */
const appending =
  (...lines: readonly string[]) =>
  (text: string): string =>
    `${text}\n${lines.join("\n")}\n`;
/** Two planted edits, in order. */
const both =
  (first: (text: string) => string, second: (text: string) => string) =>
  (text: string): string =>
    second(first(text));
/** The anchors the members edit, each a fragment whose first occurrence is the code it names (the guard's race, the guarded check, the call-site return, the AC2 each-table, the judging count). */
const GUARD_RACE_BODY = ".then(body).then(";
const CALL_SITE_CHECK_START = "    expect([...AC2_RAN].sort(";
const CALL_SITE_RETURN = "    return withinHookBudget(CALL_SITE_HOOK,";
const AC2_EACH = "it.each(JUDGED)(";
const JUDGING_COUNT = "JUDGING_CASES = 11;";
const CHAI_IMPORT = 'import { Assertion } from "chai";';
const CHAI_OVERWRITE = 'Assertion.overwriteMethod("toEqual", () => function (this: unknown) { return this; });';
const NARROWED = both(replacingFirst(AC2_EACH, "it.each(JUDGED.slice(0, 4))("), replacingFirst(JUDGING_COUNT, "JUDGING_CASES = 10;"));
/**
 * The restatement (R-B309): the code the gate twins of refusals #4 and #5 edit, each a fragment whose first occurrence is
 * the code it names (this file's typescript import, its node:fs import and the AC2 case's push).
 */
const TS_IMPORT = 'import ts from "typescript";';
const FS_IMPORT = 'import { readFileSync } from "node:fs";';
const AC2_PUSH = "    AC2_RAN.push(judgedKey({ row, half }));";
/** The restatement (R-B309): wb-mcoj's roster, the out-of-file anchor of the twin planted members (their ids, row (A), and from cut #7 their units' digests, row (C)), and the id prefix it gives a gate twin. */
const MCOJ_ROSTER = "test/fixtures/docs06-leg-readers-roster.json";
const TWIN_ID = /^(G|GP9)-TWIN/;
/**
 * The restatement (R-B309; cut #7 after refusal #6 U1 and U3): for each twin planted member, the one edit its plant
 * makes in this file's reading through the shared readers (sharedReading: moduleImports' entries, then propertyWrites'
 * with each write's line counted from the AC2 case head), as readingEdit gives it - "<id>: at <index>: <the entries it
 * adds> <- <the entries it drops>", every entry before the index and after the edit the same and in the same order
 * (row (E): applyEdit gives back each twin's reading from this file's and the twin's edit).
 */
const TWIN_READINGS: readonly string[] = [
  "G-TWIN-TS-NAMED: at 4: typescript | default as ts, type Node <- typescript | default as ts",
  "G-TWIN2-NS: at 4: typescript | default as ts, * as tstx <- typescript | default as ts",
  "GP9-TWIN-NODE-ALIAS2: at 1: node:fs | existsSync as exists, readFileSync <- node:fs | readFileSync",
  "GP9-TWIN-NODE-ALIAS: at 1: node:fs | readFileSync, readFileSync as readText <- node:fs | readFileSync",
  "GP9-TWIN-NODE-TYPEONLY: at 1: node:fs | type Dirent, readFileSync <- node:fs | readFileSync",
  "G-TWIN2-PW: at 8: an assignment to sink.length at 3:6 <- (nothing)",
];
/** The restatement (R-B309; cut #7): the opening of this file's AC2 case head - the AC2 each-table's call and its title's first words - by which a twin's unit and its reading's places find that head (its first line opening so). */
const AC2_HEAD = `  ${AC2_EACH}"AC2 bullet `;
/** The restatement (R-B309; cut #7): the module of the shared readers, whose load an import twin's unit sets aside (P-RECORD, this file's import block at cut #5, has none). */
const SHARED_READERS = "./helpers/docs06-leg-readers.js";
/** The restatement (R-B309; cut #7): the first and the last line of wb-mcoj's G-TWIN2-PW plant - its own AC2 case head (a shorter title and no budget) and the line closing that case after its push - which a twin's unit takes from here, never from this file's AC2 case (whose head differs and whose body goes on past its push). */
const MCOJ_AC2_HEAD = `  ${AC2_EACH}"AC2 bullet $row.bullet/$half.id", ({ row, half }) => {`;
const MCOJ_AC2_CLOSE = "  });";
/**
 * The restatement (R-B309; cut #7, refusal #6 U2): a twin planted member's unit, the part of a planted text wb-mcoj's
 * roster digests as that twin's plant - for a twin the modules loaded refuse, the text's import declarations as
 * written, one per line in source order, the shared readers' load set aside (P-RECORD's form); for a twin the property
 * writes refuse, the text's lines after its AC2 case head through that case's push, between MCOJ_AC2_HEAD and
 * MCOJ_AC2_CLOSE (the form of wb-mcoj's G-TWIN2-PW plant).
 */
function twinUnit(text: string, writes: boolean): string {
  if (!writes) {
    const sf = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    return sf.statements
      .filter(ts.isImportDeclaration)
      .filter(statement => !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== SHARED_READERS)
      .map(statement => statement.getText(sf))
      .join("\n");
  }
  const lines = text.split("\n");
  const head = lines.findIndex(line => line.startsWith(AC2_HEAD));
  const push = lines.findIndex((line, index) => index > head && line === AC2_PUSH);
  return [MCOJ_AC2_HEAD, ...lines.slice(head + 1, push + 1), MCOJ_AC2_CLOSE].join("\n");
}
/** The restatement (R-B309; cut #7): a plant's digest as wb-mcoj's roster holds it (that census's rosterPlant) - the sha256 of its id, text and reading, as JSON. */
const rosterDigest = (id: string, text: string, reading: readonly string[]): string => sha256(JSON.stringify([id, text, reading]));
/**
 * The restatement (R-B309; cut #7, refusal #6 U1): a text's reading through the shared readers as the restatement rows
 * read it - its loads (moduleImports), then its writes (propertyWrites), each write's place kept, its line counted from
 * the text's AC2 case head (that head's line is 1, as wb-mcoj's G-TWIN2-PW plant opens with its own AC2 case head).
 */
function sharedReading(text: string): readonly string[] {
  const head = text.split("\n").findIndex(line => line.startsWith(AC2_HEAD));
  const fromHead = (entry: string): string => entry.replace(/ at (\d+):(\d+)( \(a string\))?$/, (_whole: string, line: string, column: string, quoted: string | undefined) => ` at ${Number(line) - head}:${column}${quoted ?? ""}`);
  return [...moduleImports(SELF, text), ...propertyWrites(SELF, text).map(fromHead)];
}
/**
 * The restatement (R-B309; cut #7, refusal #6 U3; cut #8, refusal #7 U2): the one edit that turns one reading into
 * another, as "at <index>: <the entries it adds> <- <the entries it drops>" - index the first entry that differs, every
 * entry before it and after the edit the same and in the same order. CLAIMED as rows (B) and (E) pin it: on each twin's
 * reading (TWIN_READINGS) and on row (E)'s witnesses, whose moved, swapped and repeated entries read inside their edits
 * as READING_EDITS names them, each edit applied by applyEdit to this file's reading giving back the other; on any other
 * pair of readings it is NOT CLAIMED.
 */
function readingEdit(own: readonly string[], read: readonly string[]): string {
  let head = 0;
  while (head < own.length && head < read.length && own[head] === read[head]) head += 1;
  let tail = 0;
  while (tail < own.length - head && tail < read.length - head && own[own.length - 1 - tail] === read[read.length - 1 - tail]) tail += 1;
  return `at ${head}: ${read.slice(head, read.length - tail).join(" ;; ") || "(nothing)"} <- ${own.slice(head, own.length - tail).join(" ;; ") || "(nothing)"}`;
}
/**
 * The restatement (cut #8, refusal #7 U1): where twinUnit takes a text's unit from - its parts, as [start, end) offsets in
 * source order: for a twin the modules loaded refuse, each import declaration but the shared readers' load, from its first
 * token to its end; for a twin the property writes refuse, one part, the lines after the text's AC2 case head through
 * that case's push.
 */
function unitParts(text: string, writes: boolean): readonly (readonly [number, number])[] {
  if (!writes) {
    const sf = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    return sf.statements
      .filter(ts.isImportDeclaration)
      .filter(statement => !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== SHARED_READERS)
      .map(statement => [statement.getStart(sf), statement.getEnd()] as const);
  }
  const lines = text.split("\n");
  const head = lines.findIndex(line => line.startsWith(AC2_HEAD));
  const push = lines.findIndex((line, index) => index > head && line === AC2_PUSH);
  const start = head < 0 ? 0 : lines.slice(0, head + 1).join("\n").length + 1;
  return [[start, start + lines.slice(head + 1, push + 1).join("\n").length]];
}
/** The restatement (cut #8): a text cut at its unit's parts (unitCut). */
interface UnitCut {
  /** The parts' texts, in order. */
  readonly parts: readonly string[];
  /** The text before the first part, between each two parts and after the last, in order. */
  readonly outside: readonly string[];
  /** Whether the parts, joined as twinUnit joins them, are the text's twinUnit. */
  readonly asTwinUnit: boolean;
}
/** The restatement (cut #8, refusal #7 U1): a text cut at the parts unitParts gives, held to the text's twinUnit. */
function unitCut(text: string, writes: boolean): UnitCut {
  const spans = unitParts(text, writes);
  const parts = spans.map(([start, end]) => text.slice(start, end));
  const ends = [0, ...spans.map(([, end]) => end)];
  return {
    parts,
    outside: [...spans.map(([start], index) => text.slice(ends[index], start)), text.slice(ends.at(-1))],
    asTwinUnit: (writes ? [MCOJ_AC2_HEAD, ...parts, MCOJ_AC2_CLOSE] : parts).join("\n") === twinUnit(text, writes),
  };
}
/**
 * The restatement (cut #8, refusal #7 U1; cut #9, refusal #8 U2; cut #10, refusal #9 U1): row (D)'s reading of a
 * planted text's cut against this file's, as "<outside> | <unit>": "this file's outside" when the two outsides are the
 * same, piece for piece, as written, else "another outside" - CLAIMED as row (D)'s witnesses pin it: a twin's planted
 * text with a line of code, a blank line, a line comment or a trailing space added to its outside at a place where one
 * of that twin's "outside" witnesses adds that kind (the places the witness roster records: next to the twin's unit,
 * and deep inside an outside piece after DEEP_DOC or EARLY_DOC) reads "another outside"; for an outside that differs in
 * any other way or at any other place it is NOT CLAIMED; then "one import declaration edited" when an import twin's
 * parts are this file's one for one with exactly one changed, "two lines added before its push" when G-TWIN2-PW's
 * part is this file's lines with exactly two lines added before the last (the push), else "another unit". A cut whose
 * parts are not its text's twinUnit reads "parts other than twinUnit's".
 */
function plantReading(own: UnitCut, planted: UnitCut, writes: boolean): string {
  if (!own.asTwinUnit || !planted.asTwinUnit) return "parts other than twinUnit's";
  const outside = planted.outside.length === own.outside.length && planted.outside.every((piece, index) => piece === own.outside[index]) ? "this file's outside" : "another outside";
  if (!writes) return `${outside} | ${planted.parts.length === own.parts.length && planted.parts.filter((part, index) => part !== own.parts[index]).length === 1 ? "one import declaration edited" : "another unit"}`;
  const before = (own.parts[0] ?? "").split("\n");
  const after = (planted.parts[0] ?? "").split("\n");
  return `${outside} | ${after.length === before.length + 2 && before.every((line, index) => line === after[index === before.length - 1 ? index + 2 : index]) ? "two lines added before its push" : "another unit"}`;
}
/** The restatement (cut #8): the import lines rows (D) and (E) edit, each a fragment whose first occurrence in the text it edits is the import it names. */
const TS_NAMED_IMPORT = 'import ts, { type Node } from "typescript";';
const TYPEONLY_IMPORT = 'import { type Dirent, readFileSync } from "node:fs";';
const SHARED_IMPORT = `import { moduleImports, propertyWrites, spelledAnywhere } from "${SHARED_READERS}";`;
const CRYPTO_IMPORT = 'import { createHash } from "node:crypto";';
const PATH_IMPORT = 'import { basename, dirname, join } from "node:path";';
const URL_IMPORT = 'import { fileURLToPath } from "node:url";';
const CENSUS_IMPORT = 'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";';
/**
 * The restatement (cut #10, refusal #9 U1): the two lines of this file's text row (D)'s "deep" witnesses add their
 * content after, each deep inside its twins' outside pieces, away from the edges of a unit and of a piece -
 * HOOK_TIMEOUT_CONSTS' doc line (in G-TWIN-TS-NAMED's piece after the imports and in G-TWIN2-PW's piece after its push)
 * and duplicatePins' doc line (in G-TWIN2-PW's piece before its AC2 case head) - each a fragment whose first
 * occurrence in the text it edits is that line.
 */
const DEEP_DOC = "/** The file-scope consts a hook registration of this file may pass as its timeout, by name, with the value vitest would stamp. */";
const EARLY_DOC = '/** Every (file, title) a half pins more than once, as "bullet/half: file > title"; the frozen table holds none. */';
/**
 * The restatement (cut #8, refusal #7 U1; cut #9, refusal #8 U1 and U2; cut #10, refusal #9 U1): row (D)'s witnesses,
 * each a twin's planted text edited once more by the witness's plant - the "outside" form, content added outside the
 * twin's unit (from cut #10 the "deep" witnesses add theirs deep inside an outside piece, after DEEP_DOC or
 * EARLY_DOC); the "unit" form, the twin's unit given a second edit; the "dropped" form, an import declaration of the
 * twin's planted text removed; the "parts" form, G-TWIN2-PW's planted text with its push removed, so the part
 * unitParts cuts is not that text's twinUnit. What each plant writes, and where, is the witness roster's entry for it -
 * its line edit of the twin's planted text - not this doc's.
 */
const OUTSIDE_WITNESSES: readonly { readonly id: string; readonly twin: string; readonly form: "outside" | "unit" | "dropped" | "parts"; readonly plant: (planted: string) => string }[] = [
  { id: "W-OUT-REEXPORT", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(TS_NAMED_IMPORT, `${TS_NAMED_IMPORT}\nexport * from "node:os";`) },
  { id: "W-OUT-TYPEONLY-REEXPORT", twin: "GP9-TWIN-NODE-TYPEONLY", form: "outside", plant: replacingFirst(TYPEONLY_IMPORT, `${TYPEONLY_IMPORT}\nexport { statSync } from "node:fs";`) },
  { id: "W-OUT-SHARED-REPEATED", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(TS_NAMED_IMPORT, `${TS_NAMED_IMPORT}\n${SHARED_IMPORT}`) },
  { id: "W-OUT-SHARED-MOVED", twin: "G-TWIN-TS-NAMED", form: "outside", plant: both(replacingFirst(`\n${SHARED_IMPORT}`, ""), replacingFirst(TS_NAMED_IMPORT, `${SHARED_IMPORT}\n${TS_NAMED_IMPORT}`)) },
  { id: "W-OUT-AFTER-PUSH", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(AC2_PUSH, `${AC2_PUSH}\n    sink.length = 2;`) },
  { id: "W-OUT-BEFORE-IMPORTS", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(CRYPTO_IMPORT, `export * from "node:os";\n${CRYPTO_IMPORT}`) },
  { id: "W-OUT-BEFORE-HEAD", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(AC2_HEAD, `  const early = { length: 0 };\n  early.length = 1;\n${AC2_HEAD}`) },
  { id: "W-OUT-BLANK-LINE", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(TS_NAMED_IMPORT, `${TS_NAMED_IMPORT}\n`) },
  { id: "W-OUT-LINE-COMMENT", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(TS_NAMED_IMPORT, `${TS_NAMED_IMPORT}\n// a line comment`) },
  { id: "W-OUT-TRAILING-SPACE", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(TS_NAMED_IMPORT, `${TS_NAMED_IMPORT} `) },
  { id: "W-OUT-PW-BLANK-LINE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(AC2_PUSH, `${AC2_PUSH}\n`) },
  { id: "W-OUT-PW-LINE-COMMENT", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(AC2_PUSH, `${AC2_PUSH}\n    // a line comment`) },
  { id: "W-OUT-PW-TRAILING-SPACE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(`${AC2_PUSH}\n    const verdicts = judge(`, `${AC2_PUSH}\n    const verdicts = judge( `) },
  { id: "W-OUT-DEEP-CODE", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\nvoid 0;`) },
  { id: "W-OUT-DEEP-BLANK-LINE", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\n`) },
  { id: "W-OUT-DEEP-LINE-COMMENT", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\n// a line comment`) },
  { id: "W-OUT-DEEP-TRAILING-SPACE", twin: "G-TWIN-TS-NAMED", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC} `) },
  { id: "W-OUT-PW-DEEP-CODE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\nvoid 0;`) },
  { id: "W-OUT-PW-DEEP-BLANK-LINE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\n`) },
  { id: "W-OUT-PW-DEEP-LINE-COMMENT", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC}\n// a line comment`) },
  { id: "W-OUT-PW-DEEP-TRAILING-SPACE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(DEEP_DOC, `${DEEP_DOC} `) },
  { id: "W-OUT-PW-EARLY-CODE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(EARLY_DOC, `${EARLY_DOC}\nvoid 0;`) },
  { id: "W-OUT-PW-EARLY-BLANK-LINE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(EARLY_DOC, `${EARLY_DOC}\n`) },
  { id: "W-OUT-PW-EARLY-LINE-COMMENT", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(EARLY_DOC, `${EARLY_DOC}\n// a line comment`) },
  { id: "W-OUT-PW-EARLY-TRAILING-SPACE", twin: "G-TWIN2-PW", form: "outside", plant: replacingFirst(EARLY_DOC, `${EARLY_DOC} `) },
  { id: "W-UNIT-SECOND-EDIT", twin: "G-TWIN-TS-NAMED", form: "unit", plant: replacingFirst(FS_IMPORT, 'import { readFileSync, statSync } from "node:fs";') },
  { id: "W-UNIT-ONE-LINE", twin: "G-TWIN2-PW", form: "unit", plant: replacingFirst("    const sink = { length: 1 };\n", "") },
  { id: "W-DROPPED-LAST-IMPORT", twin: "G-TWIN-TS-NAMED", form: "dropped", plant: replacingFirst(`\n${CENSUS_IMPORT}`, "") },
  { id: "W-PARTS-NO-PUSH", twin: "G-TWIN2-PW", form: "parts", plant: replacingFirst(`\n${AC2_PUSH}`, "") },
];
/** The restatement (cut #8; cut #9; cut #10): OUTSIDE_WITNESSES' frozen shape (rule 16) - each witness's id, twin and form, the triple it pins; what each witness's plant writes, and where, is the witness roster's. */
const OUTSIDE_WITNESSES_SHAPE: readonly string[] = [
  "W-OUT-REEXPORT:G-TWIN-TS-NAMED:outside",
  "W-OUT-TYPEONLY-REEXPORT:GP9-TWIN-NODE-TYPEONLY:outside",
  "W-OUT-SHARED-REPEATED:G-TWIN-TS-NAMED:outside",
  "W-OUT-SHARED-MOVED:G-TWIN-TS-NAMED:outside",
  "W-OUT-AFTER-PUSH:G-TWIN2-PW:outside",
  "W-OUT-BEFORE-IMPORTS:G-TWIN-TS-NAMED:outside",
  "W-OUT-BEFORE-HEAD:G-TWIN2-PW:outside",
  "W-OUT-BLANK-LINE:G-TWIN-TS-NAMED:outside",
  "W-OUT-LINE-COMMENT:G-TWIN-TS-NAMED:outside",
  "W-OUT-TRAILING-SPACE:G-TWIN-TS-NAMED:outside",
  "W-OUT-PW-BLANK-LINE:G-TWIN2-PW:outside",
  "W-OUT-PW-LINE-COMMENT:G-TWIN2-PW:outside",
  "W-OUT-PW-TRAILING-SPACE:G-TWIN2-PW:outside",
  "W-OUT-DEEP-CODE:G-TWIN-TS-NAMED:outside",
  "W-OUT-DEEP-BLANK-LINE:G-TWIN-TS-NAMED:outside",
  "W-OUT-DEEP-LINE-COMMENT:G-TWIN-TS-NAMED:outside",
  "W-OUT-DEEP-TRAILING-SPACE:G-TWIN-TS-NAMED:outside",
  "W-OUT-PW-DEEP-CODE:G-TWIN2-PW:outside",
  "W-OUT-PW-DEEP-BLANK-LINE:G-TWIN2-PW:outside",
  "W-OUT-PW-DEEP-LINE-COMMENT:G-TWIN2-PW:outside",
  "W-OUT-PW-DEEP-TRAILING-SPACE:G-TWIN2-PW:outside",
  "W-OUT-PW-EARLY-CODE:G-TWIN2-PW:outside",
  "W-OUT-PW-EARLY-BLANK-LINE:G-TWIN2-PW:outside",
  "W-OUT-PW-EARLY-LINE-COMMENT:G-TWIN2-PW:outside",
  "W-OUT-PW-EARLY-TRAILING-SPACE:G-TWIN2-PW:outside",
  "W-UNIT-SECOND-EDIT:G-TWIN-TS-NAMED:unit",
  "W-UNIT-ONE-LINE:G-TWIN2-PW:unit",
  "W-DROPPED-LAST-IMPORT:G-TWIN-TS-NAMED:dropped",
  "W-PARTS-NO-PUSH:G-TWIN2-PW:parts",
];
/**
 * The restatement (cut #8, refusal #7 U2): row (E)'s witnesses - this file's text with an entry of its reading moved,
 * two entries swapped and an entry repeated - and the edit readingEdit is pinned to read for each (READING_EDITS);
 * each witness's line edit of this file's text is the witness roster's (cut #9, refusal #8 U1).
 */
const READING_EDIT_WITNESSES: readonly { readonly id: string; readonly plant: (text: string) => string }[] = [
  { id: "E-MOVED", plant: both(replacingFirst(`${CRYPTO_IMPORT}\n`, ""), replacingFirst(URL_IMPORT, `${URL_IMPORT}\n${CRYPTO_IMPORT}`)) },
  { id: "E-SWAPPED", plant: replacingFirst(`${PATH_IMPORT}\n${URL_IMPORT}`, `${URL_IMPORT}\n${PATH_IMPORT}`) },
  { id: "E-REPEATED", plant: replacingFirst(FS_IMPORT, `${FS_IMPORT}\n${FS_IMPORT}`) },
];
const READING_EDITS: readonly string[] = [
  "E-MOVED: at 0: node:fs | readFileSync ;; node:path | basename, dirname, join ;; node:url | fileURLToPath ;; node:crypto | createHash <- node:crypto | createHash ;; node:fs | readFileSync ;; node:path | basename, dirname, join ;; node:url | fileURLToPath",
  "E-SWAPPED: at 2: node:url | fileURLToPath ;; node:path | basename, dirname, join <- node:path | basename, dirname, join ;; node:url | fileURLToPath",
  "E-REPEATED: at 2: node:fs | readFileSync <- (nothing)",
];
/**
 * The restatement (cut #8, refusal #7 U2): readingEdit's edit applied to the reading it was taken from - the entries
 * before its index, then the entries it adds, then the reading's entries after the ones it drops - or undefined when the
 * edit does not read so or the entries it drops are not the reading's at its index.
 */
function applyEdit(own: readonly string[], edit: string): readonly string[] | undefined {
  const parsed = /^at (\d+): (.*) <- (.*)$/s.exec(edit);
  if (parsed === null) return undefined;
  const entries = (part: string | undefined): readonly string[] => (part === undefined || part === "(nothing)" ? [] : part.split(" ;; "));
  const index = Number(parsed[1]);
  const drops = entries(parsed[3]);
  return drops.every((entry, offset) => own[index + offset] === entry) ? [...own.slice(0, index), ...entries(parsed[2]), ...own.slice(index + drops.length)] : undefined;
}
/**
 * The restatement (cut #9, refusal #8 U1; cut #10, refusal #9 U2): the out-of-file record of rows (D) and (E)'s
 * witnesses - each witness's id, for row (D)'s its twin and form too, and its line edit (lineEdit) of its base text:
 * its twin's planted text for row (D)'s, this file's text for row (E)'s. The witness roster row holds what each
 * witness's plant writes, and where - the line its edit follows and the line it precedes, one of which its base text
 * holds once (placeHeld) - to this record.
 */
const WITNESS_ROSTER = "test/fixtures/docs06-conformance-witness-roster.json";
/** The restatement (cut #9; cut #10, refusal #9 U2): a line edit, as the witness roster records it - what it writes, and where. */
interface LineEdit {
  /** The last line the two texts share before the edit, or null when the edit opens the text. */
  readonly follows: string | null;
  /** The lines the first text has where the edit is, in order. */
  readonly removes: readonly string[];
  /** The lines the second text has there, in order. */
  readonly adds: readonly string[];
  /** The first line the two texts share after the edit, or null when the edit closes the text (cut #10). */
  readonly precedes: string | null;
}
/**
 * The restatement (cut #9, refusal #8 U1; cut #10, refusal #9 U2): the one line edit that turns a text into another -
 * the lines the two share at their start and the lines they share at their end set aside (the end's never reaching
 * back into the start's), the line the rest follows, the rest of each, and the line the rest precedes, as LineEdit.
 * CLAIMED as the witness roster row pins it, on each witness's text against its base text and on PLACE_CONTROL's; on
 * any other pair of texts it is NOT CLAIMED.
 */
function lineEdit(text: string, edited: string): LineEdit {
  const from = text.split("\n");
  const to = edited.split("\n");
  let head = 0;
  while (head < from.length && head < to.length && from[head] === to[head]) head += 1;
  let tail = 0;
  while (tail < from.length - head && tail < to.length - head && from[from.length - 1 - tail] === to[to.length - 1 - tail]) tail += 1;
  return { follows: head === 0 ? null : (from[head - 1] ?? null), removes: from.slice(head, from.length - tail), adds: to.slice(head, to.length - tail), precedes: tail === 0 ? null : (from[from.length - tail] ?? null) };
}
/**
 * The restatement (cut #10, refusal #9 U2): whether a line edit's place is held by its base text - the line it follows
 * or the line it precedes is a line that text holds exactly once, so the edit sits right after or right before that
 * one line. CLAIMED as the witness roster row pins it, on each witness's line edit of its base text and on
 * PLACE_CONTROL's; for any other text and edit it is NOT CLAIMED.
 */
function placeHeld(base: string, edit: LineEdit): boolean {
  const lines = base.split("\n");
  const once = (line: string | null): boolean => line !== null && lines.filter(other => other === line).length === 1;
  return once(edit.follows) || once(edit.precedes);
}
/** The restatement (cut #10): placeHeld's control - this file's text with a line of code written between the line closing its AC2 case and the blank line before its AC4 case head, two lines this file's text holds more than once. */
const PLACE_CONTROL = replacingFirst('  });\n\n  it("AC4: the live-tier case', '  });\nvoid 0;\n\n  it("AC4: the live-tier case');
/**
 * R717 (wb-ouo3 cut #4): the planted members - refusal #3's members (M:13504), the died respin seat's W-BODY-RETURN-BARE,
 * and one or more members of every other class; from the restatement (R-B309), the six gate twins of refusals #4 and #5
 * that wb-mcoj's roster plants, last.
 */
const PLANTED_MEMBERS: readonly PlantedMember[] = [
  {
    id: "W-SWALLOW-T",
    what: "refusal #3: withinHookBudget's race catches its body's error and rethrows it unless the budget is CALL_SITE_HOOK_BUDGET_MS (1 edit in the guard's own text)",
    plant: replacingFirst(GUARD_RACE_BODY, '.then(body).catch((error: unknown) => { if (budget !== "CALL_SITE_HOOK_BUDGET_MS") throw error; }).then('),
    refusedBy: ["the guard's declaration"],
  },
  {
    id: "W-SWALLOW",
    what: "refusal #3 (control): withinHookBudget's race swallows every body's error (1 edit in the guard's own text)",
    plant: replacingFirst(GUARD_RACE_BODY, ".then(body).catch(() => undefined).then("),
    refusedBy: ["the guard's declaration", "the guard's names"],
  },
  {
    id: "W-BODY-SKIP-T",
    what: "refusal #3: withinHookBudget never calls its body when the budget is CALL_SITE_HOOK_BUDGET_MS (1 edit in the guard's own text)",
    plant: replacingFirst(GUARD_RACE_BODY, '.then(budget === "CALL_SITE_HOOK_BUDGET_MS" ? () => undefined : body).then('),
    refusedBy: ["the guard's declaration", "the guard's names"],
  },
  {
    id: "T-CHAI",
    what: "refusal #3: chai's Assertion imported and toEqual overwritten through its public plugin API at module scope (2 edits, appended)",
    plant: appending(CHAI_IMPORT, CHAI_OVERWRITE),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "T-CHAI-NARROW",
    what: "refusal #3: T-CHAI with the AC2 each-table narrowed to four halves and the judging count to 10",
    plant: both(appending(CHAI_IMPORT, CHAI_OVERWRITE), NARROWED),
    refusedBy: ["the each-tables", "the modules loaded"],
  },
  {
    id: "T-DESC-SORT",
    what: "refusal #3: Array's prototype found among the values of Object.getOwnPropertyDescriptors(Array) and its sort replaced (module code, appended)",
    plant: appending(
      "const arrayMethods = Object.values(Object.getOwnPropertyDescriptors(Array))",
      "  .map(descriptor => descriptor.value as unknown)",
      "  .find(value => Array.isArray(value)) as string[];",
      "const realSort = arrayMethods.sort;",
      "arrayMethods.sort = function (this: string[], compare?: (a: string, b: string) => number): string[] {",
      "  const out = realSort.call(this, compare) as string[];",
      '  return out.length === 1 && out[0] === "1/guard:6" ? ["1/guard:6", "2/guard:4", "3/guard:2", "4/guard:4", "5/digest-mismatch:3"] : out;',
      "} as typeof realSort;",
    ),
    refusedBy: ["the reflective routes spelled", "the property writes"],
  },
  {
    id: "W-BODY-RETURN-BARE",
    what: "the died respin seat's member: an early return written with no name before the guarded check (1 edit in the call-site registration)",
    plant: replacingFirst(CALL_SITE_CHECK_START, `    if ([].length === 0) return;\n${CALL_SITE_CHECK_START}`),
    refusedBy: ["the call-site text"],
  },
  {
    id: "C-ALIAS-REGISTRAR",
    what: "a registrar named as a value, never called",
    plant: appending("const later = afterAll;"),
    refusedBy: ["the roster's findings"],
  },
  {
    id: "C-EXTRA-HOOK",
    what: "a second afterAll registered at file scope",
    plant: appending("afterAll(() => undefined);"),
    refusedBy: ["the hook registrations"],
  },
  {
    id: "C-CALLBACK-SHADOW",
    what: "expect shadowed in the call-site registration's callback, outside the guarded body (the D-EXPECT-SHADOW shape)",
    plant: replacingFirst(CALL_SITE_RETURN, `    const expect = (): undefined => undefined;\n${CALL_SITE_RETURN}`),
    refusedBy: ["the call-site registrations", "the call-site declarations", "the call-site names", "the uses of expect", "the call-site text"],
  },
  {
    id: "C-PLANTED-PUSH",
    what: "a push of the call-site state from module code",
    plant: appending('AC2_RAN.push("planted");'),
    refusedBy: ["the call-site state"],
  },
  {
    id: "C-NARROW",
    what: "the AC2 each-table narrowed to four halves and the judging count to 10 (the D-NARROW-ONLY shape)",
    plant: NARROWED,
    refusedBy: ["the each-tables"],
  },
  {
    id: "C-EXPECT-EXTEND",
    what: "expect used as a value: a matcher extended",
    plant: appending("expect.extend({});"),
    refusedBy: ["the uses of expect"],
  },
  {
    id: "C-VITEST-SUITE",
    what: "the runner's own registrar imported from vitest/suite",
    plant: appending('import { getCurrentSuite } from "vitest/suite";'),
    refusedBy: ["the vitest imports", "the modules loaded"],
  },
  {
    id: "C-RUNNER-ON",
    what: "the runner reached outside the census rows",
    plant: appending("TestRunner.getCurrentSuite();"),
    refusedBy: ["the runner reads"],
  },
  {
    id: "C-GLOBAL",
    what: "the global object named",
    plant: appending("const w = globalThis;"),
    refusedBy: ["the run-time escapes spelled"],
  },
  {
    id: "C-PROTOTYPE",
    what: "a prototype read",
    plant: appending("const p = Array.prototype;"),
    refusedBy: ["the prototype routes spelled"],
  },
  {
    id: "C-OWN-NAMES",
    what: "an object's own keys enumerated",
    plant: appending("const n = Object.getOwnPropertyNames(Array);"),
    refusedBy: ["the reflective routes spelled"],
  },
  {
    id: "C-MEMBER-WRITE",
    what: "a member written",
    plant: appending("const box = { value: 0 };", "box.value = 1;"),
    refusedBy: ["the property writes"],
  },
  {
    id: "C-SECOND-GUARD",
    what: "a second declaration named withinHookBudget, nested",
    plant: appending("function nested(): void {", "  function withinHookBudget(): void {}", "}"),
    refusedBy: ["the guard's declaration"],
  },
  {
    id: "C-SHADOW-BUILTIN",
    what: "a builtin the guard reads shadowed at file scope",
    plant: appending("const performance = { now: (): number => 0 };"),
    refusedBy: ["the guard's names"],
  },
  {
    id: "G-TWIN-TS-NAMED",
    what: "the restatement (refusal #4 U1 (a)'s twin, wb-mcoj's MI-DEFAULT-NAMED plant): a type-only named binding added to this file's default import of typescript (one of this file's import declarations edited, as row (D) reads it)",
    plant: replacingFirst(TS_IMPORT, 'import ts, { type Node } from "typescript";'),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "G-TWIN2-NS",
    what: "the restatement (refusal #4 U1 (b)'s twin, wb-mcoj's MI-DEFAULT-NS plant): a namespace binding added to this file's default import of typescript (one of this file's import declarations edited, as row (D) reads it)",
    plant: replacingFirst(TS_IMPORT, 'import ts, * as tstx from "typescript";'),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "GP9-TWIN-NODE-ALIAS2",
    what: "the restatement (refusal #5 U1's twin, wb-mcoj's MI-NODE-ALIAS plant): an aliased specifier of a second export added to this file's node:fs import (one of this file's import declarations edited, as row (D) reads it)",
    plant: replacingFirst(FS_IMPORT, 'import { existsSync as exists, readFileSync } from "node:fs";'),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "GP9-TWIN-NODE-ALIAS",
    what: "the restatement (refusal #5 U1's second twin, wb-mcoj's MI-NODE-ALIAS plant): readFileSync bound again under an alias in this file's node:fs import (one of this file's import declarations edited, as row (D) reads it)",
    plant: replacingFirst(FS_IMPORT, 'import { readFileSync, readFileSync as readText } from "node:fs";'),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "GP9-TWIN-NODE-TYPEONLY",
    what: "the restatement (refusal #5 U2's twin, wb-mcoj's MI-NODE-TYPEONLY plant): an inline type-only specifier added to this file's node:fs import (one of this file's import declarations edited, as row (D) reads it)",
    plant: replacingFirst(FS_IMPORT, 'import { type Dirent, readFileSync } from "node:fs";'),
    refusedBy: ["the modules loaded"],
  },
  {
    id: "G-TWIN2-PW",
    what: "the restatement (refusal #4 U1 (c)'s twin as wb-mcoj's PW-COMPUTED-KEY row plants it; cut #7, refusal #6 U1): that plant's two statements before its AC2 case's push - a sink declared, then its length written through an object pattern property with a computed key - added in this file's AC2 case before its push (two lines, as row (D) reads it)",
    plant: replacingFirst(AC2_PUSH, `    const sink = { length: 1 };\n    ({ ["length"]: sink.length } = { length: 0 });\n${AC2_PUSH}`),
    refusedBy: ["the property writes"],
  },
];
/** R717 frozen shape (rule 16): every class with the number of planted members proving it, in the leg's order. */
const TAMPER_CLASSES_SHAPE: readonly string[] = [
  "the roster's findings:1",
  "the hook registrations:1",
  "the call-site registrations:1",
  "the call-site declarations:1",
  "the call-site names:1",
  "the call-site state:1",
  "the each-tables:2",
  "the uses of expect:2",
  "the vitest imports:1",
  "the runner reads:1",
  "the run-time escapes spelled:1",
  "the prototype routes spelled:1",
  "the modules loaded:8",
  "the reflective routes spelled:2",
  "the property writes:3",
  "the call-site text:2",
  "the guard's declaration:4",
  "the guard's names:3",
];
/** R717 frozen shape (rule 16): every planted member with the number of readings refusing it, in table order. */
const PLANTED_MEMBERS_SHAPE: readonly string[] = [
  "W-SWALLOW-T:1",
  "W-SWALLOW:2",
  "W-BODY-SKIP-T:2",
  "T-CHAI:1",
  "T-CHAI-NARROW:2",
  "T-DESC-SORT:2",
  "W-BODY-RETURN-BARE:1",
  "C-ALIAS-REGISTRAR:1",
  "C-EXTRA-HOOK:1",
  "C-CALLBACK-SHADOW:5",
  "C-PLANTED-PUSH:1",
  "C-NARROW:1",
  "C-EXPECT-EXTEND:1",
  "C-VITEST-SUITE:2",
  "C-RUNNER-ON:1",
  "C-GLOBAL:1",
  "C-PROTOTYPE:1",
  "C-OWN-NAMES:1",
  "C-MEMBER-WRITE:1",
  "C-SECOND-GUARD:1",
  "C-SHADOW-BUILTIN:1",
  "G-TWIN-TS-NAMED:1",
  "G-TWIN2-NS:1",
  "GP9-TWIN-NODE-ALIAS2:1",
  "GP9-TWIN-NODE-ALIAS:1",
  "GP9-TWIN-NODE-TYPEONLY:1",
  "G-TWIN2-PW:1",
];

describe("R717 (wb-ouo3 cut #4): the enumerated tamper classes - the fail-closed leg's readings, each proven by members planted on this file's text", () => {
  it("R717 (1) the closed list: the tamper classes of record are exactly the fail-closed leg's readings, read from the leg's own source, and each is proven by a planted member", () => {
    expect(legReadings(SELF, readRepo(SELF)), "the readings the leg runs, in its order").toEqual([...TAMPER_CLASSES_OF_RECORD]);
    expect(
      TAMPER_CLASSES_OF_RECORD.filter(reading => !PLANTED_MEMBERS.some(member => member.refusedBy.includes(reading))),
      "a class no planted member proves",
    ).toEqual([]);
    expect(
      PLANTED_MEMBERS.flatMap(member => member.refusedBy.filter(reading => !TAMPER_CLASSES_OF_RECORD.includes(reading)).map(reading => `${member.id}: ${reading}`)),
      "a planted member refused by a reading outside the closed list",
    ).toEqual([]);
    const leg = ["function callSiteBindingBroken(): void {", '  differs("a reading", [], []);', "  differs(READING, [], []);", "}", "function elsewhere(): void {", '  differs("not the leg", [], []);', "}"].join("\n");
    expect(legReadings("leg.ts", leg), "the leg's readings, a literal and a name, never another function's").toEqual(["a reading", "(a reading named by READING)"]);
  });

  it("R717 frozen shape (rule 16): every class with the number of planted members proving it, and every planted member with the number of readings refusing it, is the literal list", () => {
    expect(
      TAMPER_CLASSES_OF_RECORD.map(reading => `${reading}:${PLANTED_MEMBERS.filter(member => member.refusedBy.includes(reading)).length}`),
      "class:members",
    ).toEqual([...TAMPER_CLASSES_SHAPE]);
    expect(
      PLANTED_MEMBERS.map(member => `${member.id}:${member.refusedBy.length}`),
      "member:readings",
    ).toEqual([...PLANTED_MEMBERS_SHAPE]);
  });

  it("the restatement (R-B309), row (A): the gate twins wb-mcoj's roster plants are exactly this file's twin planted members, in the roster's order, each refused by the reading of its roster table", () => {
    const roster = JSON.parse(readRepo(MCOJ_ROSTER)) as { readonly rows: readonly { readonly table: string; readonly plants: readonly { readonly id: string }[] }[] };
    const reading = (table: string): string => (table === "MODULES" ? "the modules loaded" : table === "WRITES" ? "the property writes" : `(a twin of the ${table} table)`);
    const twins = roster.rows.flatMap(row => row.plants.filter(plant => TWIN_ID.test(plant.id)).map(plant => `${plant.id}:${reading(row.table)}`));
    expect(twins.length, "the gate twins the roster plants").toBeGreaterThan(0);
    const members = PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id));
    expect(members.map(member => `${member.id}:${member.refusedBy.join(", ")}`), "this file's twin planted members, each with the readings that refuse it").toEqual(twins);
  });

  it("the restatement (R-B309), row (B): each twin's planted text reads through the shared readers - its loads, then its writes, each write's line counted from the AC2 case head - as this file's own reading with exactly the one edit TWIN_READINGS names, at the index it names, every other entry the same and in the same order", () => {
    const text = readRepo(SELF);
    const own = sharedReading(text);
    expect(own, "this file's own reading through the shared readers: the record's loads, and no write").toEqual([...MODULE_IMPORTS_OF_RECORD]);
    expect(
      PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id)).map(member => `${member.id}: ${readingEdit(own, sharedReading(member.plant(text)))}`),
      "each twin's one edit of this file's reading, at its index",
    ).toEqual([...TWIN_READINGS]);
  });

  it("the restatement (R-B309), row (C): each twin's unit and its reading through the shared reader of its table hash with the twin's id to the sha256 wb-mcoj's roster pins for that plant, and this file's import block, the shared readers' load set aside, hashes so to P-RECORD's, read as the record less that load, and the record ends with that load as its eighth entry", () => {
    const roster = JSON.parse(readRepo(MCOJ_ROSTER)) as { readonly rows: readonly { readonly plants: readonly { readonly id: string; readonly sha256: string }[] }[] };
    const pinned = roster.rows.flatMap(row => row.plants.map(plant => `${plant.id} | sha256 ${plant.sha256}`));
    const text = readRepo(SELF);
    const page = twinUnit(text, false);
    expect(moduleImports("P-RECORD.ts", page), "this file's import block, the shared readers' load set aside: the record less that load").toEqual(MODULE_IMPORTS_OF_RECORD.filter(entry => !entry.startsWith(`${SHARED_READERS} | `)));
    expect(
      MODULE_IMPORTS_OF_RECORD.map(entry => (entry.startsWith(`${SHARED_READERS} | `) ? "(the shared readers' load)" : entry)),
      "the record: P-RECORD's reading, then the shared readers' load as its eighth entry, last (cut #8, refusal #7 F1)",
    ).toEqual([...moduleImports("P-RECORD.ts", page), "(the shared readers' load)"]);
    expect(unitCut(text, false).outside.at(-1)?.split("\n").slice(0, 2), "this file's text: the shared readers' load is the line right after its last other import declaration").toEqual(["", SHARED_IMPORT]);
    const members = PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id));
    const units = [
      `P-RECORD | sha256 ${rosterDigest("P-RECORD", page, moduleImports("P-RECORD.ts", page))}`,
      ...members.map(member => {
        const writes = member.refusedBy.includes("the property writes");
        const unit = twinUnit(member.plant(text), writes);
        return `${member.id} | sha256 ${rosterDigest(member.id, unit, writes ? propertyWrites(`${member.id}.ts`, unit) : moduleImports(`${member.id}.ts`, unit))}`;
      }),
    ];
    expect(units, "P-RECORD and each twin's unit, by the digest of its id, unit and reading").toEqual(
      ["P-RECORD", ...members.map(member => member.id)].map(id => pinned.find(line => line.startsWith(`${id} | `)) ?? `${id} | (no plant of the roster)`),
    );
  });

  it("the restatement (cut #8), row (D): each twin's planted text is this file's text outside the twin's unit, piece for piece, and its unit this file's with one edit - one import declaration edited, or two lines added before G-TWIN2-PW's push", () => {
    const text = readRepo(SELF);
    const members = PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id));
    const own = { imports: unitCut(text, false), writes: unitCut(text, true) };
    expect(
      members.map(member => {
        const writes = member.refusedBy.includes("the property writes");
        return `${member.id}: ${plantReading(writes ? own.writes : own.imports, unitCut(member.plant(text), writes), writes)}`;
      }),
      "each twin's planted text against this file's: its outside, then its unit's edit",
    ).toEqual(members.map(member => `${member.id}: this file's outside | ${member.refusedBy.includes("the property writes") ? "two lines added before its push" : "one import declaration edited"}`));
  });

  it("the restatement (cut #8, cut #9, cut #10), row (D) witnesses: each OUTSIDE_WITNESSES text - its twin's planted text with the witness's plant applied - reads as its form names, and the witnesses, each with its twin and its form, are the frozen list", () => {
    const text = readRepo(SELF);
    const members = PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id));
    const own = { imports: unitCut(text, false), writes: unitCut(text, true) };
    expect(
      OUTSIDE_WITNESSES.map(witness => `${witness.id}:${witness.twin}:${witness.form}`),
      "OUTSIDE_WITNESSES, frozen: each witness with its twin and its form",
    ).toEqual([...OUTSIDE_WITNESSES_SHAPE]);
    expect(
      OUTSIDE_WITNESSES.map(witness => {
        const twin = members.find(member => member.id === witness.twin);
        const writes = twin?.refusedBy.includes("the property writes") ?? false;
        return `${witness.id}: ${twin === undefined ? "(no twin of that id)" : plantReading(writes ? own.writes : own.imports, unitCut(witness.plant(twin.plant(text)), writes), writes)}`;
      }),
      "each witness's text against this file's: its outside, then its unit's edit",
    ).toEqual(
      OUTSIDE_WITNESSES.map(witness => {
        const edit = members.find(member => member.id === witness.twin)?.refusedBy.includes("the property writes") === true ? "two lines added before its push" : "one import declaration edited";
        return `${witness.id}: ${witness.form === "outside" ? `another outside | ${edit}` : witness.form === "unit" ? "this file's outside | another unit" : witness.form === "dropped" ? "another outside | another unit" : "parts other than twinUnit's"}`;
      }),
    );
  });

  it("the restatement (cut #8), row (E): readingEdit reads this file's text with an entry moved, two entries swapped and an entry repeated as exactly the edits READING_EDITS names, and each of those edits and each twin's, applied to this file's reading, gives back the text's reading", () => {
    const text = readRepo(SELF);
    const own = sharedReading(text);
    const witnesses = READING_EDIT_WITNESSES.map(witness => ({ id: witness.id, reading: sharedReading(witness.plant(text)) }));
    expect(
      witnesses.map(({ id, reading }) => `${id}: ${readingEdit(own, reading)}`),
      "each witness's edit of this file's reading",
    ).toEqual([...READING_EDITS]);
    const read = [...witnesses, ...PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id)).map(member => ({ id: member.id, reading: sharedReading(member.plant(text)) }))];
    expect(
      read.map(({ id, reading }) => [id, applyEdit(own, readingEdit(own, reading)) ?? "(not applied)"]),
      "each edit applied to this file's reading",
    ).toEqual(read.map(({ id, reading }) => [id, reading]));
  });

  it("the restatement (cut #9, cut #10), the witness roster: each OUTSIDE_WITNESSES witness - its id, twin and form and its line edit of its twin's planted text - and each READING_EDIT_WITNESSES witness - its id and its line edit of this file's text - is the entry test/fixtures/docs06-conformance-witness-roster.json records for it, in order, and each witness's base text holds the line its edit follows or the line it precedes once", () => {
    const text = readRepo(SELF);
    const members = PLANTED_MEMBERS.filter(member => TWIN_ID.test(member.id));
    const outside = OUTSIDE_WITNESSES.map(witness => {
      const twin = members.find(member => member.id === witness.twin);
      if (twin === undefined) return { id: witness.id, twin: witness.twin, form: witness.form, follows: "(no twin of that id)", removes: [], adds: [] };
      const planted = twin.plant(text);
      return { id: witness.id, twin: witness.twin, form: witness.form, ...lineEdit(planted, witness.plant(planted)) };
    });
    const readingEdits = READING_EDIT_WITNESSES.map(witness => ({ id: witness.id, ...lineEdit(text, witness.plant(text)) }));
    expect(JSON.parse(readRepo(WITNESS_ROSTER)) as unknown, "the witness roster: this file's witnesses, each with its line edit, in order").toEqual({ bead: "wb-ouo3", census: SELF, outside, readingEdits });
    const places = [
      ...OUTSIDE_WITNESSES.map(witness => {
        const planted = members.find(member => member.id === witness.twin)?.plant(text);
        return { id: witness.id, held: planted !== undefined && placeHeld(planted, lineEdit(planted, witness.plant(planted))) };
      }),
      ...READING_EDIT_WITNESSES.map(witness => ({ id: witness.id, held: placeHeld(text, lineEdit(text, witness.plant(text))) })),
    ];
    expect(places.filter(place => !place.held).map(place => place.id), "each witness's place: its base text holds the line its edit follows or the line it precedes once").toEqual([]);
    expect(placeHeld(text, lineEdit(text, PLACE_CONTROL(text))), "PLACE_CONTROL: an edit between two lines this file's text holds more than once is not held").toBe(false);
  });

  it.each(PLANTED_MEMBERS)("R717 planted member $id: the leg refuses this file's text with the member planted in memory, naming exactly the readings it changes", LEG, member => {
    const text = readRepo(SELF);
    const planted = member.plant(text);
    expect(planted, `${member.id} edits this file's text`).not.toBe(text);
    expect(
      callSiteBindingBroken(planted).map(line => line.slice(0, line.indexOf(": read ["))),
      `${member.id}: ${member.what}`,
    ).toEqual([...member.refusedBy]);
  });

  it("R717 budget: exactly the rows that run the fail-closed leg on a text carry LEG_BUDGET_MS, never vitest's default 5000 ms", ({ task }) => {
    const timeouts: number[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") timeouts.push(child.timeout);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(LEG_BUDGET_MS, "the leg budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(LEG_BUDGET_MS, "a budget of its own, never the judging cases'").not.toBe(JUDGE_BUDGET_MS);
    expect(timeouts.filter(timeout => timeout === LEG_BUDGET_MS), "the fail-closed leg row and every planted-member row").toHaveLength(1 + PLANTED_MEMBERS.length);
  });

  it("the modules loaded (R717): the reader reads this file's loads as exactly the record, and names each load form its row plants as written", () => {
    expect(moduleImports(SELF, readRepo(SELF)), "this file's loads as the reader reads them, with what each binds").toEqual([...MODULE_IMPORTS_OF_RECORD]);
    const loads = ['import a from "a";', 'import * as b from "b";', 'import { c, d as e } from "c";', 'import type { F } from "f";', 'import "g";', 'export * from "h";', 'export { i } from "i";', 'const j = await import("j");', 'const k = require("k");', 'import l = require("l");', "export { z };", 'const m = load("m");'].join("\n");
    expect(moduleImports("loads.ts", loads), "a default, namespace, named, type-only and bare import, two re-exports, import(), require() and import = require(); a local export and another call read as nothing").toEqual([
      "a | default as a",
      "b | * as b",
      "c | c, d as e",
      "f | type F",
      "g | (nothing bound)",
      "h | re-exports *",
      "i | re-exports { i }",
      'import("j") | loaded at run time',
      'require("k") | loaded at run time',
      'import l = require("l"); | loaded at run time',
    ]);
  });

  it("the reflective routes (R717, refusal #3 U3): this file spells no reflective route, and the reader reads each spelling its row plants as written", () => {
    expect(spelledAnywhere(SELF, readRepo(SELF), REFLECTIVE_ROUTE), "getOwnPropertyDescriptor(s), getOwnPropertyNames, getOwnPropertySymbols, ownKeys, __lookupGetter__ or __lookupSetter__, spelled anywhere in this file").toEqual([]);
    const routes = [
      "const a = Object.values(Object.getOwnPropertyDescriptors(Array));",
      "const b = Object.getOwnPropertyDescriptor(Array, key);",
      "const c = Reflect.ownKeys(Array);",
      'const d = Object["getOwnPropertyNames"];',
      "const e = Object.getOwnPropertySymbols;",
      "const f = holder.__lookupGetter__(key);",
      "const g = `__lookupSetter__`;",
      'const h = holder.ownKeysOf + holder.myownKeys + "getOwnPropertyNamesOf" + "xgetOwnPropertyNames";',
    ].join("\n");
    expect(spelledAnywhere("reflective.ts", routes, REFLECTIVE_ROUTE), "a member name, a string key and a template, each read as it stands; a longer name or string reads as nothing").toEqual([
      "getOwnPropertyDescriptors at 1:32",
      "getOwnPropertyDescriptor at 2:18",
      "ownKeys at 3:19",
      "getOwnPropertyNames at 4:18 (a string)",
      "getOwnPropertySymbols at 5:18",
      "__lookupGetter__ at 6:18",
      "__lookupSetter__ at 7:11 (a string)",
    ]);
  });

  it("the property writes (R717): the reader reads no member write and no writer API in this file, and reads each write form its row plants as written", () => {
    expect(propertyWrites(SELF, readRepo(SELF)), "the member writes and writer APIs the reader reads in this file").toEqual([]);
    const writes = [
      "a.b = 1;",
      "a[k] += 1;",
      "a.c ??= 2;",
      "a.x ^= 1;",
      "delete a.d;",
      "a.e++;",
      "--a[f];",
      "(a.y)++;",
      "[a.g] = list;",
      "({ h: a.i } = source);",
      "(a.p) = 1;",
      "[...a.q] = list;",
      "({ ...a.r } = source);",
      "(a.s as number) = 1;",
      "(<number>a.t) = 1;",
      "a.u! = 1;",
      "(a.v satisfies number) = 1;",
      "[a.w = 1] = list;",
      "for (a.j of list) {}",
      "for (a.z in source) {}",
      "Object.assign(a, b);",
      "Reflect.set(a, k, 1);",
      "Reflect.deleteProperty(a, k);",
      "a.__defineGetter__(k, g);",
      "a.__defineSetter__(k, g);",
      "const settle = a.assignee + a.asset;",
      "x = 1;",
      "x++;",
    ].join("\n");
    expect(propertyWrites("writes.ts", writes), "the first and last assignment operators and two between, a delete, updates, each unwrapped and destructuring target it plants, both loop heads and each writer API; a name write and a longer name read as nothing").toEqual([
      "an assignment to a.b at 1:1",
      "an assignment to a[k] at 2:1",
      "an assignment to a.c at 3:1",
      "an assignment to a.x at 4:1",
      "a delete of a.d at 5:1",
      "an update of a.e at 6:1",
      "an update of a[f] at 7:1",
      "an update of a.y at 8:1",
      "an assignment to a.g at 9:1",
      "an assignment to a.i at 10:2",
      "an assignment to a.p at 11:1",
      "an assignment to a.q at 12:1",
      "an assignment to a.r at 13:2",
      "an assignment to a.s at 14:1",
      "an assignment to a.t at 15:1",
      "an assignment to a.u at 16:1",
      "an assignment to a.v at 17:1",
      "an assignment to a.w at 18:1",
      "an assignment to a.w at 18:2",
      "a loop head writing a.j at 19:1",
      "a loop head writing a.z at 20:1",
      "a writer named assign at 21:8",
      "a writer named set at 22:9",
      "a writer named deleteProperty at 23:9",
      "a writer named __defineGetter__ at 24:3",
      "a writer named __defineSetter__ at 25:3",
    ]);
  });

  it("the guard's declaration and names, and the call-site text (R717): each is its record, and the readers keep a declaration's and a registration's own text and the names a guard reads", () => {
    const roster = hookRoster(SELF);
    expect(roster.guardDeclarations.map(digestLine), "every declaration named withinHookBudget, by its text's sha256").toEqual([...GUARD_DECLARATIONS_OF_RECORD]);
    expect(roster.guardNames, "every name the guard reads but does not declare, with what the checker binds it to").toEqual([...GUARD_NAMES_OF_RECORD]);
    expect(
      roster.callSites.map(entry => `${entry.guards} | sha256 ${sha256(entry.text)}`),
      "the guarded registration, by its text's sha256",
    ).toEqual([...CALL_SITE_TEXT_OF_RECORD]);
    const site = ["afterAll(() => {", "  // kept", '  return withinHookBudget(HOOK, "B", 1, () => check());', "}, 2)"].join("\n");
    const guarded = [
      'import { afterAll } from "vitest";',
      "function withinHookBudget(hook: string, budget: string, ms: number, body: () => void): number {",
      "  return Math.max(ms, floor);",
      "}",
      "const floor = 1;",
      "const withinHookBudget = (): number => 1;",
      `${site};`,
      "function nested(withinHookBudget: number): void {",
      "  const { withinHookBudget } = source;",
      "  function withinHookBudget(): void {}",
      "  const f = function withinHookBudget(): void {};",
      "  class withinHookBudget {}",
      "  const c = class withinHookBudget {};",
      "}",
    ].join("\n");
    const read = hookRoster("guarded.ts", guarded);
    expect(read.guardDeclarations, "a function and a const at file scope, and a parameter, a destructured element, a function, a function expression, a class and a class expression nested, each with its own text").toEqual([
      "FunctionDeclaration at file scope | function withinHookBudget(hook: string, budget: string, ms: number, body: () => void): number {\n  return Math.max(ms, floor);\n}",
      "VariableDeclaration at file scope | withinHookBudget = (): number => 1",
      "Parameter nested | withinHookBudget: number",
      "BindingElement nested | withinHookBudget",
      "FunctionDeclaration nested | function withinHookBudget(): void {}",
      "FunctionExpression nested | function withinHookBudget(): void {}",
      "ClassDeclaration nested | class withinHookBudget {}",
      "ClassExpression nested | class withinHookBudget {}",
    ]);
    expect(read.guardNames, "a global and a file-scope const the guard reads, never its own parameters").toEqual(["Math -> no declaration in this file", "floor -> a file-scope const"]);
    expect(read.callSites.map(entry => entry.text), "the guarded registration's own text, comment included").toEqual([site]);
  });
});

/**
 * R692 second respin (wb-ouo3 refusal #2, the fail-closed leg). The landed header binds a name-filtered run of this file
 * to fail closed, and refusal #2's RESPIN ORDER binds -t 'AC2 bullet 1' to exit 1 on the delivered bytes and under every
 * member of its class. A name filter runs the AC2 case it selects and the call-site hook and skips every row above, so a
 * binding that makes the hook's check vacuous passes a filtered run unseen (D-AC2RAN-SHADOW, D-EXPECT-SHADOW and
 * S-EXPECT-DESTRUCT exited 0 under the filter at cut #2), and a tamper of the matcher hollows the rows' own toEqual as
 * well (T-EXTEND and T-PROTO read every row green at cut #2, and over this respin's rows before the leg). This file's
 * collection therefore re-reads the call-site binding at
 * module scope - where no binding can shadow the reader - with no matcher, against the literals the rows above pin:
 * collection throws on any difference in a reading it names, so that run of this file, a name-filtered one included,
 * exits 1, the error naming each reading that differs. Read here: the roster's findings and registrations, the call-site
 * registration's shape, declarations and names, every statement naming the call-site state but the frozen shape's own
 * declaration (that literal is the AC1 rows' and the rule 16 battery's, which a full run judges), every each-table case
 * (the AC2 cases' and the R717 planted members'), the uses of the identifier expect its reader reads (a member named
 * expect: NOT CLAIMED, the final cut's narrowing, R-B258), the vitest import, the runner reads, the
 * spellings of the two named residuals and, from cut #4 (R717), the modules loaded, the reflective routes spelled, the
 * property writes, the call-site text, the guard's declaration and the guard's names - the closed list
 * TAMPER_CLASSES_OF_RECORD. Cut #3 said here that every run exits 1 on any difference; refusal #3's W-SWALLOW-T, T-CHAI,
 * T-DESC-SORT and W-BODY-SKIP-T changed no reading read here at cut #3 and exited 0 under the filter (U2 (b)), so the
 * exit 1 is claimed for the enumerated classes only. The comparisons index the arrays directly; the readers run on the
 * runtime's own builtins, on this file's own readers and records and, from the restatement (R-B309), on the shared
 * module's moduleImports, propertyWrites and spelledAnywhere (test/helpers/docs06-leg-readers.ts), so an edit that also
 * changes what the leg computes (a builtin its readers run on, a reader - the shared module's included - a record or the
 * refusal) is NOT CLAIMED at collection: the full run's rows judge it.
 */
function callSiteBindingBroken(text: string = readRepo(SELF)): readonly string[] {
  const broken: string[] = [];
  const differs = (reading: string, read: readonly string[], record: readonly string[]): void => {
    let same = read.length === record.length;
    for (let index = 0; same && index < read.length; index += 1) same = read[index] === record[index];
    if (!same) broken.push(`${reading}: read [${read.join(" ;; ")}]`);
  };
  const ownDeclaration = (line: string): boolean => line.startsWith("FROZEN_JUDGED_SHAPE | const FROZEN_JUDGED_SHAPE: ") && line.endsWith(" | module code");
  const roster = hookRoster(SELF, text, ["AC2_RAN", "AC2_CHECKED", "FROZEN_JUDGED_SHAPE"], ["expect"]);
  differs("the roster's findings", roster.findings, []);
  differs("the hook registrations", roster.registrations.map(rosterLine), CALL_SITE_REGISTRATIONS_OF_RECORD);
  differs("the call-site registrations", roster.callSites.map(entry => `${entry.guards} | ${entry.shape}`), ["CALL_SITE_HOOK | 0 parameters | ReturnStatement"]);
  differs("the call-site declarations", roster.callSites.flatMap(entry => entry.declares), []);
  differs("the call-site names", roster.callSites.flatMap(entry => entry.names), CALL_SITE_NAMES_OF_RECORD);
  differs("the call-site state", roster.statements.filter(line => !ownDeclaration(line)), CALL_SITE_STATE_OF_RECORD.filter(line => !ownDeclaration(line)));
  differs("the each-tables", roster.tables, CALL_SITE_TABLES_OF_RECORD);
  differs("the uses of expect", roster.uncalled, []);
  differs("the vitest imports", vitestImports(SELF, text), VITEST_IMPORTS_OF_RECORD);
  differs("the runner reads", hookRoster(SELF, text, ["TestRunner"]).references, RUNNER_READS_OF_RECORD);
  differs("the run-time escapes spelled", namedAnywhere(SELF, text, RUNTIME_ESCAPES), []);
  differs("the prototype routes spelled", spelledAnywhere(SELF, text, PROTOTYPE_ROUTE), []);
  differs("the modules loaded", moduleImports(SELF, text), MODULE_IMPORTS_OF_RECORD);
  differs("the reflective routes spelled", spelledAnywhere(SELF, text, REFLECTIVE_ROUTE), []);
  differs("the property writes", propertyWrites(SELF, text), []);
  differs("the call-site text", roster.callSites.map(entry => `${entry.guards} | sha256 ${sha256(entry.text)}`), CALL_SITE_TEXT_OF_RECORD);
  differs("the guard's declaration", roster.guardDeclarations.map(digestLine), GUARD_DECLARATIONS_OF_RECORD);
  differs("the guard's names", roster.guardNames, GUARD_NAMES_OF_RECORD);
  return broken;
}
const CALL_SITE_BINDING_BROKEN = callSiteBindingBroken();
if (CALL_SITE_BINDING_BROKEN.length > 0) throw new Error(`R692 second respin (wb-ouo3 refusal #2): the AC2 call-site binding differs from its record, so this file refuses collection and every run of it, a name-filtered one included, exits 1: ${CALL_SITE_BINDING_BROKEN.join(" | ")}`);
