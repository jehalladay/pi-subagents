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
      "No single case names all five fields. Covered: freshness and lastConfirmedAt (observation :29), sourceConnectionState (observation :43), observedAt and the coverage/completeness value on a detached reading (detached-observer :49). sourceCursor on a projection node has no asserting case at the re-cut base (its only test mention is a forbidden-term list in test/workbench-timeline.test.ts), so the five-field claim stays partial.",
  },
  {
    n: 2,
    section: "Freshness and ambiguity",
    quote: "UI shows STALE/UNKNOWN visibly.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-inspector.test.ts", title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner" },
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
    ],
    reason:
      "The pure reply builder (wb-752.2, closed) is pinned by its O2 case, which cites this very sentence. The Pi tool wiring half is unpinned: at the re-cut base wb-752.9 is in_progress and wb-752.13 is open, and test/workbench-security-pi-tools.test.ts holds no stale-summary assertion. Flip the wiring half to pinned in the same commit that lands its first case.",
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
      "The in-memory hot window is pinned by two default-gate vitest cases (both files are matched by the vitest include and not excluded, verified by the tier-truth pin below; the nearby forge.toml command observation-recovery-bench is a separate bench-receipt run these rows do not claim). The optional local/private disk cache half is unpinned: optional, no disk-cache code exists under src/workbench at the re-cut base, so no case exists to bind.",
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
    ],
    reason:
      "Reference-not-body and redacted preview are pinned for the HyperUnix, Forge-evidence and detached readers. test/workbench-claude-observer.test.ts registers two cases at the re-cut base and neither asserts that bodies are never retained, so the Claude observer stays unpinned; the encrypt-where-required clause is deployment-owned with no case.",
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

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const sectionRows = (section: Section): readonly Row[] => ROWS.filter(row => row.section === section);
const SECTIONS: readonly Section[] = ["Freshness and ambiguity", "Data retention and privacy"];

/** A section's whole rendered block list: one paragraph holding exactly its sentences (sectionMatches form). */
const sectionBlocks = (section: Section): readonly RenderedBlock[] => {
  const text = sectionRows(section)
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

/** One line per pin that is not ok, naming the sentence; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `sentence ${row.n}: ${verdict.code}: ${verdict.why}`);

/** Every docs/09 drift, each naming the sentence (or the section) it breaks. */
function docs09Failures(markdown: string): string[] {
  const out: string[] = [];
  for (const heading of SECTIONS) {
    const section = docsSection(markdown, heading, 2, [DOC_09_PARENT]);
    if (!section.ok) {
      out.push(`${DOC_09} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const text = section.blocks.map(renderedText).join(" ");
    for (const row of sectionRows(heading)) {
      if (!text.includes(row.quote)) out.push(`sentence ${row.n}: "${row.quote}" no longer renders in ${DOC_09} § ${heading}`);
    }
    const exact = sectionMatches(section, sectionBlocks(heading));
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

const PINNED_ROWS = ROWS.filter(row => row.status !== "unpinned");

describe("wb-752.14 docs/09 freshness-and-retention census (report mode)", () => {
  it("AC1: the Freshness and ambiguity and Data retention and privacy sections render exactly their sentences, and docs/14 keeps the falsifier rule whole", () => {
    expect(docs09Failures(readRepo(DOC_09))).toEqual([]);
    expect(docs14Failures(readRepo(DOC_14))).toEqual([]);
  });

  it("AC1: the table holds eight deeply frozen rows in docs order whose shape is frozen as a literal (rule 16)", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(ROWS.filter(row => row.section === "Freshness and ambiguity").map(row => row.n)).toEqual([1, 2, 3, 4]);
    expect(ROWS.filter(row => row.section === "Data retention and privacy").map(row => row.n)).toEqual([5, 6, 7, 8]);
    expect(ROWS.map(row => `${row.n}:${row.status}:${row.pins.length}`)).toEqual(["1:partial:3", "2:pinned:2", "3:pinned:2", "4:partial:1", "5:partial:2", "6:partial:3", "7:pinned:2", "8:pinned:3"]);
    expect(ROWS.every(row => row.tier === "default-gate")).toBe(true);
  });

  it("AC1: each row's pin list is frozen as a digest, so swapping a pin for an unrelated passing case reddens the row (rule 16)", () => {
    const digests = ROWS.map(row => `${row.n}:${createHash("sha256").update(JSON.stringify(row.pins)).digest("hex").slice(0, 12)}`);
    expect(digests).toEqual(["1:c85dcc5ba9af", "2:82f5a4f60655", "3:840c19c7d262", "4:ddee5cd0c584", "5:bf373ca421c4", "6:037d35785904", "7:113408f27c13", "8:ad9dae873d70"]);
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
    expect(open.find(row => row.n === 4)?.reason).toContain("wb-752.9");
    expect(open.find(row => row.n === 5)?.reason).toContain("disk cache");
  });

  it.each(PINNED_ROWS)("AC2 sentence $n: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(
      REPORT,
      row.pins.map(pin => casePin(row, pin)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    const pinned = PINNED_ROWS.flatMap(row => row.pins.map(pin => basename(pin.file, ".ts")));
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

  it("a renamed pinned title is absent from the report and red, naming the sentence, the file and the title", () => {
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

  it("a file the default config excludes (a native live-tier suite) is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-client.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a row relabelled live-tier is refused by the default report, never carried from a title's presence", () => {
    const pin = row8?.pins[0];
    expect(row8 !== undefined && pin !== undefined).toBe(true);
    if (row8 === undefined || pin === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...row8, tier: "live-tier" }, pin)]);
    expect(verdict?.code).toBe("tier-mismatch");
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
