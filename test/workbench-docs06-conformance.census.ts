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
 * with a reason and no judged pins: no leg inside that tier judges it today, so it is never counted as covered. Its
 * tier TRUTH is still bound by two binding assertions on the real config files: the file is in the default exclude and
 * in the native include.
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
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
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
        reason:
          "the ecosystem-native pin runs only in the native live tier (its file is excluded from the default gate and listed in the native include); the default report cannot vouch for it and no leg inside that tier judges it today, so it is recorded and never counted as covered",
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
        "the hot change of a RUNNING pinned execution half has no case at b21beb0 (git grep -i for hot change, hot swap and pinned execution over test/ finds none): W06 wb-4ax (open, in progress at the cut base) owns the provider registry and permissions scope, so the half is unpinned and never counted as covered",
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

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.bullet}:${row.halves.map(half => `${half.id}=${half.pins.length}`).join(",")}`);

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));

/** One line per pin that is not ok, naming the bullet and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `bullet ${row.bullet}/${half.id}: ${verdict.code}: ${verdict.why}`);

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

  it.each(JUDGED)("AC2 bullet $row.bullet/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report", ({ row, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("AC4: the live-tier case is carried by no report this leg reads: the default report refuses it as not collected, never as passed", () => {
    const [verdict] = judge(REPORT, [casePin(ECOSYSTEM_PIN)]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("not-collected");
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
});

describe("wb-6hb.6 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (bullet: number): { row: Row; half: Half; entry: Pin } => {
    const found = JUDGED.find(({ row }) => row.bullet === bullet);
    const entry = found?.half.pins[0];
    if (found === undefined || entry === undefined) throw new Error(`bullet ${bullet} holds no judged pin`);
    return { row: found.row, half: found.half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the bullet, the file and the title", () => {
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

  it("M4: a pin with no title is red (the judge finds no such case)", () => {
    const { entry } = firstJudged(1);
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { entry } = firstJudged(4);
    const [verdict] = judge(REPORT, [casePin({ file: IDENTITY, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a pinned title that two bullets share is judged once per bullet, so removing it from one bullet still leaves the other's pin live", () => {
    const owners = TABLE.filter(row => row.halves.some(half => half.pins.some(entry => entry.file === NODE_CONTRACT && entry.title === "L4: unauthorized invocation denied at host even with known capability id")));
    expect(owners.map(row => row.bullet)).toEqual([1, 2]);
  });

  it("M7: a default-tier pin of a file the default config excludes is never in the default report: not collected, a tier cause and never a missing title", () => {
    const [verdict] = judge(REPORT, [{ file: ECOSYSTEM_NATIVE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
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
