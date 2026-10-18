/**
 * wb-cax.24 (W22): census falsifier for docs/workbench/13-contracts-and-config.md "Key validations", a census leg of the
 * wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE.
 *
 * The section states six validations in two sentences. This leg binds each validation to existing cases by file,
 * verbatim title and tier, or records it as unpinned with a reason. It executes no pinned case and no test run: judge()
 * from the shared helper test/helpers/census.ts reads vitest's own JSON report of the default gate's test step
 * (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned case counts only when the
 * gate's own run collected it exactly once (under its bound describe path where the row binds one), recorded it passed,
 * and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted,
 * excluded or unregistered pinned case therefore reads red, naming the validation, the file, the title and the cause, as
 * far as the helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md);
 * this leg adds no scanner of its own (docs/workbench/14 "Each major work package must have a falsifier: a negative test
 * that would fail if a critical guarantee was quietly weakened."). The docs pin reads the RENDERED view through the
 * helper's docsSection / sectionMatches: the section under the unique level-2 "Key validations" heading of the level-1
 * parent heading, bounded at the next level-1/2 heading or EOF (FOLD-1: a "###" subsection belongs to it), must render as
 * exactly the two sentences, and a dropped or reworded clause names its validation. A title's presence is never a live or
 * native pass: each row carries the tier whose own report vouches for it, and the default report vouches for the default
 * gate's test tier only (a pin of any other tier is refused by judge(), R2 = (i)).
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
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
}
interface RowBase {
  readonly n: number;
  readonly validation: string;
  /** The docs/13 clause, verbatim. */
  readonly quote: string;
  readonly tier: Tier;
}
interface PinnedRow extends RowBase {
  readonly status: "pinned";
  readonly pins: readonly Pin[];
}
interface UnpinnedRow extends RowBase {
  readonly status: "unpinned";
  readonly pins: readonly [];
  readonly reason: string;
}
type Row = PinnedRow | UnpinnedRow;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-key-validations.census.ts";
const DOCS_FILE = "docs/workbench/13-contracts-and-config.md";
const DOCS_PARENT = "13 — Low-level contracts, type sketches and configuration";
const DOCS_HEADING = "Key validations";

const SENTENCE_ONE =
  "Contract hashes and source digests must be pinned in execution receipt; typed payload validated at boundary; no arbitrary code from descriptor field; compare controlled vs observed state; unrecognized SDK message version => diagnostic rather than silent success.";
const SENTENCE_TWO = "All date/timestamp strings have timezone and are not used as total global event order.";
/** The section's whole rendered block list: one paragraph holding exactly the two sentences (sectionMatches form). */
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "paragraph", text: `${SENTENCE_ONE} ${SENTENCE_TWO}`, markdown: `${SENTENCE_ONE} ${SENTENCE_TWO}` }];

const R5_SUITE = "R5 docs/workbench/13 § Key validations: an unrecognized native answer is a diagnostic, never silent success";

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

const TABLE: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    n: 1,
    validation: "contract hashes and source digests pinned in the execution receipt",
    quote: "Contract hashes and source digests must be pinned in execution receipt",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-identity.test.ts", title: "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction" },
      { file: "test/workbench-patch-proposal.test.ts", title: "pins the experiment to source digests and refuses a base that does not match its bytes first" },
    ],
  },
  {
    n: 2,
    validation: "typed payload validated at the boundary",
    quote: "typed payload validated at boundary",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-registry-auth.test.ts", title: "rejects oversized nesting and pollution before executing providers" },
      { file: "test/workbench-control.test.ts", title: "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial" },
    ],
  },
  {
    n: 3,
    validation: "no arbitrary code from a descriptor field",
    quote: "no arbitrary code from descriptor field",
    tier: "default-gate",
    status: "unpinned",
    pins: [],
    reason:
      "no descriptor-code case: grep of the registry and capability suites finds no case where a descriptor field carrying code is refused as code (the designer metadata cases cover script metadata, not a registry descriptor field); W06 wb-4ax scope",
  },
  {
    n: 4,
    validation: "controlled state is compared against observed state",
    quote: "compare controlled vs observed state",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-furnace-control.test.ts",
        title: "parks an answer that is transport success without the native echo: never acknowledged without the request echo, never settled without the terminal echo",
      },
    ],
  },
  {
    n: 5,
    validation: "an unrecognized SDK message version is a diagnostic, never silent success",
    quote: "unrecognized SDK message version => diagnostic rather than silent success",
    tier: "default-gate",
    status: "pinned",
    // The R5 describe is bound as the exact suite path of its pinned case: renaming, skipping or duplicating the describe
    // reddens the case pin, which is the helper's only describe binding.
    pins: [{ file: "test/workbench-furnace-evidence.test.ts", title: "refuses a response of another kind as unavailable", suite: [R5_SUITE] }],
  },
  {
    n: 6,
    validation: "timestamps carry a timezone and never serve as a total global event order",
    quote: "All date/timestamp strings have timezone and are not used as total global event order.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-timeline.test.ts", title: "carries no global sequence or ordering field and no elapsed, estimated or progress field" },
      { file: "test/workbench-forge-evidence.test.ts", title: "C4: the capture time is the host clock and must be a timezone-qualified instant" },
    ],
  },
]);

const PINNED: readonly PinnedRow[] = TABLE.filter((row): row is PinnedRow => row.status === "pinned");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/**
 * The forge.toml command whose own run must vouch for a row. The default report is the default gate's test step, so a
 * "live-tier" label names no report this leg reads: judge() refuses it (tier-mismatch) instead of carrying a live claim
 * from a title's presence.
 */
const tierCommand = (tier: Tier): string => (tier === "default-gate" ? DEFAULT_GATE_TIER : tier);

const casePin = (row: RowBase, pin: Pin): CasePin => ({ file: pin.file, title: pin.title, tier: tierCommand(row.tier), ...(pin.suite === undefined ? {} : { suite: pin.suite }) });

/** One line per pin that is not ok, naming the validation; the helper's why names the file, title, tier and cause. */
const failures = (row: RowBase, verdicts: readonly PinVerdict[]): string[] =>
  verdicts.filter(verdict => !verdict.ok).map(verdict => `validation ${row.n} (${row.validation}): ${verdict.code}: ${verdict.why}`);

const renderedText = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text);

/**
 * Every docs drift, each naming the validation (or the section) it breaks. The per-row clause checks read the section's
 * RENDERED text and run independently of the exactness check, so a dropped or reworded clause names its validation.
 */
function docsFailures(markdown: string): string[] {
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) return [`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`];
  const text = section.blocks.map(renderedText).join(" ");
  const out: string[] = [];
  for (const row of TABLE) {
    if (!text.includes(row.quote)) out.push(`validation ${row.n} (${row.validation}): its clause "${row.quote}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its two sentences: ${exact.why}`);
  return out;
}

describe("wb-cax.24 docs/workbench/13 § Key validations census (report mode)", () => {
  it("AC1: the Key validations section renders exactly its two sentences, every validation's clause verbatim", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the table holds six deeply frozen rows numbered 1 to 6 whose quotes are the clauses of the two sentences", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => row.n)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(`${TABLE.slice(0, 5).map(row => row.quote).join("; ")}.`).toBe(SENTENCE_ONE);
    expect(TABLE[5]?.quote).toBe(SENTENCE_TWO);
    for (const row of TABLE) {
      expect(["default-gate", "live-tier"], `validation ${row.n}: tier`).toContain(row.tier);
      if (row.status === "pinned") expect(row.pins.length, `validation ${row.n} (${row.validation}): a pinned row has no pins`).toBeGreaterThan(0);
      else {
        expect(row.pins, `validation ${row.n}: an unpinned row carries no pins`).toEqual([]);
        expect(row.reason.trim().length, `validation ${row.n} (${row.validation}): an unpinned row needs a reason`).toBeGreaterThan(20);
      }
    }
  });

  it("AC3: the unpinned validations are listed so none is ever counted as passed, each naming its reason", () => {
    const unpinned = TABLE.filter((row): row is UnpinnedRow => row.status === "unpinned");
    expect(unpinned.map(row => row.n)).toEqual([3]);
    expect(unpinned[0]?.reason).toContain("wb-4ax");
  });

  it.each(PINNED)("AC2 validation $n: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(REPORT, row.pins.map(pin => casePin(row, pin)));
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
    const pinned = PINNED.flatMap(row => row.pins.map(pin => basename(pin.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-cax.24 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const v2 = PINNED.find(row => row.n === 2);
  const v5 = PINNED.find(row => row.n === 5);
  const v6 = PINNED.find(row => row.n === 6);

  it("a renamed pinned title is absent from the report and red, naming the validation, the file and the title", () => {
    const pin = v2?.pins[0];
    expect(v2 !== undefined && pin !== undefined).toBe(true);
    if (v2 === undefined || pin === undefined) return;
    const renamed = { ...pin, title: `${pin.title} (renamed)` };
    const [verdict] = judge(REPORT, [casePin(v2, renamed)]);
    expect(verdict?.code).toBe("absent");
    const [line] = failures(v2, verdict === undefined ? [] : [verdict]);
    expect(line).toContain("validation 2 (typed payload validated at the boundary)");
    expect(line).toContain(pin.file);
    expect(line).toContain(renamed.title);
  });

  it("the validation 5 pin binds its R5 describe: the same case under a renamed describe path is absent", () => {
    const pin = v5?.pins[0];
    expect(v5 !== undefined && pin?.suite !== undefined).toBe(true);
    if (v5 === undefined || pin === undefined) return;
    const [verdict] = judge(REPORT, [casePin(v5, { ...pin, suite: [`${R5_SUITE} (renamed)`] })]);
    expect(verdict?.code).toBe("absent");
  });

  it("a file the default config excludes (a native live-tier suite) is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-client.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a row relabelled live-tier is refused by the default report, never carried from a title's presence", () => {
    const pin = v6?.pins[0];
    expect(v6 !== undefined && pin !== undefined).toBe(true);
    if (v6 === undefined || pin === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...v6, tier: "live-tier" }, pin)]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-cax.24 docs drift names the validation or the section (U2, FOLD-1, rendered view)", () => {
  const doc = (body: string, after = ""): string => `# ${DOCS_PARENT}\n\n## Host boundary\n\nText.\n\n## ${DOCS_HEADING}\n\n${body}\n${after}`;
  const good = doc(`${SENTENCE_ONE} ${SENTENCE_TWO}`);
  const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("validation ")).map(line => line.slice(0, line.indexOf(" (")));

  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(good)).toEqual([]);
    expect(docsFailures(doc(`${SENTENCE_ONE} ${SENTENCE_TWO}`, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("K7 names validation 3 (and only it) when clause 3 is dropped from sentence one", () => {
    const lines = docsFailures(good.replace(" no arbitrary code from descriptor field;", ""));
    expect(named(lines)).toEqual(["validation 3"]);
    expect(lines.some(line => line.includes("not exactly its two sentences"))).toBe(true);
  });

  it("K8 names validation 4 (and only it) when clause 4 is reworded", () => {
    expect(named(docsFailures(good.replace("compare controlled vs observed state", "compare controlled with observed state")))).toEqual(["validation 4"]);
  });

  it("K9 names validation 6 (and only it) when sentence two is dropped", () => {
    expect(named(docsFailures(good.replace(SENTENCE_TWO, "")))).toEqual(["validation 6"]);
  });

  it("D1 goes red on the section, naming no validation, when a weakening qualifier is appended to the paragraph", () => {
    const lines = docsFailures(good.replace(SENTENCE_TWO, `${SENTENCE_TWO} Unless the host says otherwise.`));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its two sentences");
  });

  it("D1b goes red on the section when a weakening paragraph is appended inside it", () => {
    const lines = docsFailures(doc(`${SENTENCE_ONE} ${SENTENCE_TWO}\n\nA host may skip these validations.`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 2 blocks; the census pins 1");
  });

  it("D2 goes red when the heading is renamed away", () => {
    const lines = docsFailures(good.replace(`## ${DOCS_HEADING}`, "## Validation notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection is appended inside the section, at EOF and before a next level-2 heading", () => {
    const sub = "\n### Exceptions\n\nA host may skip these validations.\n";
    for (const text of [doc(`${SENTENCE_ONE} ${SENTENCE_TWO}`, sub), doc(`${SENTENCE_ONE} ${SENTENCE_TWO}`, `${sub}\n## Next\n\nOther text.\n`)]) {
      const lines = docsFailures(text);
      expect(named(lines)).toEqual([]);
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain("not exactly its two sentences");
    }
  });

  it("D9 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(good.replace("## Host boundary", "# Appendix\n\n## Host boundary"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D10 names validation 2 when its clause is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(good.replace("typed payload validated at boundary", "<!-- typed payload validated at boundary -->"));
    expect(named(lines)).toEqual(["validation 2"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });
});
