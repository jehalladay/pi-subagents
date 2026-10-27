/**
 * wb-973.15 (SCG-R15): census leg for docs/workbench/19-worked-examples.md "Claude role as a swarm context graph worker", a
 * census leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE,
 * in the wb-6hb.11 / wb-cax.24 shape: every sentence of the section is a row, quoted whole, bound by file, describe path and
 * verbatim title to the cases of test/workbench-role-capabilities-settings.test.ts that measure it, or recorded unpinned with
 * a reason (never counted as passed).
 *
 * The leg executes no pinned case and no test run: judge() from test/helpers/census.ts reads vitest's own JSON report of the
 * default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned case
 * counts only when that run collected it exactly once under its bound describe path, recorded it passed, and its body asserts
 * (the helper's three legs, fail-closed, as far as its resolvable-construct roster and named residuals reach;
 * docs/workbench/receipts/wb-u62.md). The docs pin reads the RENDERED view through docsSection / sectionMatches: the section
 * under the unique level-2 heading of the level-1 page title, bounded at the next level-1/2 heading or EOF, renders exactly as
 * composed here (the first paragraph, the settings block, the second paragraph), and each sentence of the live section is a
 * row's quote.
 *
 * Anchors outside this file's literals (standing rule 16, CT-BATTERY v2): the ROWS are anchored by the live page (its
 * sentences must be exactly the rows' quotes, so a row removed from TABLE and from every literal here still reds on the page),
 * the PINS by the out-of-file roster test/fixtures/docs19-scg-worker-role-roster.json (TABLE must equal it row for row and pin
 * for pin, so a pin removed or swapped here and in every literal here still reds on the roster), and FROZEN_SHAPE pins the
 * row/pin shape in this file. JUDGED SUBSET (standing rule 16, refusal #1 U1): the AC2 it.each runs PINNED, the rows whose
 * status is pinned; FROZEN_JUDGED freezes that subset by id and pin count, and the out-of-file roster's own pinned rows must
 * equal it, so a filter, a slice or a hand-edited PINNED that drops a judged row reds. EACH-LIVENESS: the AC2 call site must
 * register exactly one run-mode case per frozen judged row, in order and on the judging budget (read from this file's own
 * collected tasks), and every one must reach its last assertion this run (completed), so a narrowed call site, a skipped or
 * filtered AC2 case, or an AC2 body that returns early reds. Scope: this one section of docs/19; the page's other sections
 * and the bead's two negatives in force now (no rf skill copy tracked, no docs/workbench sentence listing the four rf leaves
 * as served) are measured by their own cases and bound to no row here, except that row R3's second clause is the
 * skill-copy case.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first. */
  readonly suite: readonly string[];
}
interface RowBase {
  readonly id: string;
  /** Which paragraph of the section renders the sentence: 1 before the settings block, 2 after it. */
  readonly paragraph: 1 | 2;
  /** The docs/19 sentence, verbatim in its markdown source. */
  readonly quote: string;
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
const SELF = "test/workbench-docs19-scg-worker-role.census.ts";
const ROSTER_FILE = "test/fixtures/docs19-scg-worker-role-roster.json";
const DOCS_FILE = "docs/workbench/19-worked-examples.md";
const DOCS_PARENT = "19 — Worked usage examples and expected outcomes";
const DOCS_HEADING = "Claude role as a swarm context graph worker";
const CASES_FILE = "test/workbench-role-capabilities-settings.test.ts";
const CASES_SUITE = "wb-973.15 SCG-R15: the docs/19 swarm context graph worker role";
const pin = (title: string): Pin => ({ file: CASES_FILE, title, suite: [CASES_SUITE] });

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
    id: "R1",
    paragraph: 1,
    quote: "A swarm context graph worker is a Claude role that runs `rf` through its shell tool and follows the swarm recipe of the installed rf skill.",
    status: "pinned",
    pins: [pin("SCG-R15 R1: the page's block declares exactly one Claude role, whose tools carry Bash and whose prompt names the installed rf skill and SWARM_RF_WORKSPACE")],
  },
  {
    id: "R2",
    paragraph: 1,
    quote: "`rf install-skill --agent claude` writes that skill to `~/.claude/skills/rf/`, whose `references/swarm-integration.md` holds the recipe.",
    status: "unpinned",
    pins: [],
    reason:
      "RFCLI's own install fact, not Pi's: measured with rf install-skill --list --json on rf 0.1.845 (2026-10-26: the claude destination is ~/.claude/skills/rf and the skill's files include references/swarm-integration.md); the default gate runs no rf, so no default-gate case can vouch for it",
  },
  {
    id: "R3",
    paragraph: 1,
    quote: "This page names that location and never restates the recipe, and the repository tracks no copy of the skill.",
    status: "pinned",
    pins: [
      pin("SCG-R15 R3a: the section names the installed skill's location and restates no recipe step: no rendered rf command beyond rf install-skill"),
      pin("SCG-R15 R3b: the repository tracks no copy of the rf skill: no rf directory under a skills directory, no recipe file and no SKILL.md naming rf"),
    ],
  },
  {
    id: "R4",
    paragraph: 2,
    quote: "Pi loads this `.pi/subagents.json` as written, with `settingSources` a `workbench` key and never a role key.",
    status: "pinned",
    pins: [
      pin("SCG-R15 R4a: Pi loads the page's .pi/subagents.json as written, settingSources a workbench key"),
      pin("SCG-R15 R4b: a role that declares settingSources itself is refused, never read"),
    ],
  },
  {
    id: "R5",
    paragraph: 2,
    quote: "Pi's Claude host passes every session it starts the configured `settingSources`, here `user`, and passes `[]` when the key is absent.",
    status: "pinned",
    pins: [pin("SCG-R15 R5: the Claude host passes every session the configured settingSources, the page's user, and [] when the key is absent")],
  },
  {
    id: "R6",
    paragraph: 2,
    quote: "The installed Agent SDK documents `user` as the global user settings in `~/.claude/settings.json` and `[]` as disabling filesystem settings.",
    status: "pinned",
    pins: [pin("SCG-R15 R6: the installed Agent SDK documents user as the global ~/.claude/settings.json source and [] as disabling filesystem settings")],
  },
  {
    id: "R7",
    paragraph: 2,
    quote: "The role's `tools` replace the workbench-wide `tools` for its sessions, so `Bash` is the shell tool the worker runs `rf` through.",
    status: "pinned",
    pins: [pin("SCG-R15 R7: the role's tools replace the workbench-wide tools for its sessions, so Bash reaches the worker")],
  },
  {
    id: "R8",
    paragraph: 2,
    quote: "The role declares no `capabilities`, so its sessions expose no Pi provider tool and need no capability grant.",
    status: "pinned",
    pins: [pin("SCG-R15 R8: the role declares no capabilities, so its sessions expose no Pi provider tool and the file needs no capability grant")],
  },
  {
    id: "R9",
    paragraph: 2,
    quote:
      "The worker learns the swarm workspace from `RF_WORKSPACE` and `SWARM_RF_WORKSPACE`, and the role adds no environment of its own: its sessions start with no `env` override, and the detached host's launch allowlist carries both names.",
    status: "pinned",
    pins: [
      pin(
        "SCG-R15 R9: the role adds no environment of its own: its sessions get no env override, the detached allowlist carries RF_WORKSPACE and SWARM_RF_WORKSPACE, and a role env is refused",
      ),
    ],
  },
  {
    id: "R10",
    paragraph: 2,
    quote: "The detached host starts its Claude sessions with `settingSources` `[]` whatever this file sets, so there the `user` source is not loaded.",
    status: "pinned",
    pins: [pin("SCG-R15 R10: the detached host starts its Claude sessions with settingSources [] whatever reaches it")],
  },
]);

/** Standing rule 16: the table's row/pin shape, frozen at the cut. */
const FROZEN_SHAPE: readonly string[] = ["R1:1", "R2:0", "R3:2", "R4:2", "R5:1", "R6:1", "R7:1", "R8:1", "R9:1", "R10:1"];
/** Standing rule 16 (refusal #1 U1): the judged subset the AC2 it.each runs, by row id and pin count, frozen at the cut. */
const FROZEN_JUDGED: readonly string[] = ["R1:1", "R3:2", "R4:2", "R5:1", "R6:1", "R7:1", "R8:1", "R9:1", "R10:1"];
/** The title the AC2 it.each registers for a judged row: vitest renders a string $id quoted. */
const AC2_CASE = (id: string): string => `AC2 row '${id}': every pinned case is collected once, passed and asserting in the default gate's own report`;
/** EACH-LIVENESS: the id of every judged row whose AC2 case reached its last assertion this run, in run order. */
const completed = new Set<string>();

/** The section's settings file, exactly as its json fence shows it. */
const SETTINGS_BLOCK = `{
  "workbench": {
    "workflowAgentBackend": "claude",
    "settingSources": ["user"],
    "roles": {
      "scg-worker": {
        "prompt": "Work as a swarm context graph worker: follow the swarm recipe of the rf skill installed at ~/.claude/skills/rf, and pass the directory SWARM_RF_WORKSPACE names as --workspace to every rf command.",
        "tools": ["Bash", "Read"]
      }
    }
  }
}`;

/**
 * The explicit budget of each case below that calls judge() (the R546 sizing recipe, file-local); every other case keeps
 * vitest's 5000 ms default. judge() reads the default tier's whole report and analyses each pinned file with its relative
 * import closure on the calling thread, so the first such case pays the cold reads; vitest cannot interrupt the
 * synchronous body, so the budget moves only that duration verdict, never an assertion. Wall of record: the cold AC2 row
 * R1 at 5656 ms (seat run 2026-10-26, this file alone against an 18-file targeted report, load1 190-300), timed out
 * against the default; 5 x 5656 ms = 28280 ms, rounded up to a whole 5 s.
 */
const JUDGE_BUDGET_MS = 30_000;

const PINNED: readonly PinnedRow[] = TABLE.filter((row): row is PinnedRow => row.status === "pinned");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const paragraphOf = (table: readonly Row[], paragraph: 1 | 2): string =>
  table
    .filter(row => row.paragraph === paragraph)
    .map(row => row.quote)
    .join(" ");
/** The section as this census composes it from TABLE and the settings block: its heading line through its last sentence. */
const composedSection = (table: readonly Row[] = TABLE): string =>
  `## ${DOCS_HEADING}\n\n${paragraphOf(table, 1)}\n\n\`\`\`json\n${SETTINGS_BLOCK}\n\`\`\`\n\n${paragraphOf(table, 2)}\n`;
/** A page holding the composed section under the page title, after one other section, with `after` following it. */
const composedPage = (section: string, after = ""): string => `# ${DOCS_PARENT}\n\n## Measured experimental read example\n\nText.\n\n${section}${after}`;
/** The rendered blocks the composed section renders, through the same helper the live page goes through. */
function composedBlocks(): readonly RenderedBlock[] {
  const section = docsSection(composedPage(composedSection()), DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) throw new Error(`the composed section is refused: ${section.why}`);
  return section.blocks;
}
/** The sentences of a section's paragraphs, in their markdown source, split after a full stop that whitespace follows. */
const sentencesOf = (blocks: readonly RenderedBlock[]): string[] =>
  blocks.flatMap(block => (block.kind === "paragraph" ? block.markdown.split(/(?<=\.)\s+/u) : [])).filter(sentence => sentence !== "");

/**
 * Every docs drift, each naming the row (or the section) it breaks. The per-row checks read the live section's sentences
 * and run independently of the exactness check, so a dropped or reworded sentence names its row.
 */
function docsFailures(markdown: string): string[] {
  const where = `${DOCS_FILE} § ${DOCS_HEADING}`;
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) return [`${where}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (section.hasHtml) out.push(`${where}: the section carries HTML (a comment or a tag), whose rendered text can hide what its source says`);
  const sentences = sentencesOf(section.blocks);
  for (const row of TABLE) if (!sentences.includes(row.quote)) out.push(`row ${row.id}: its sentence no longer renders in ${where}: ${JSON.stringify(row.quote)}`);
  for (const sentence of sentences) if (!TABLE.some(row => row.quote === sentence)) out.push(`${where}: a sentence no row binds renders: ${JSON.stringify(sentence)}`);
  const exact = sectionMatches(section, composedBlocks());
  if (!exact.ok) out.push(`${where} is not exactly its composed section: ${exact.why}`);
  return out;
}

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, suite: entry.suite, tier: DEFAULT_GATE_TIER });
/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: RowBase, verdicts: readonly PinVerdict[]): string[] =>
  verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/** A row as the out-of-file roster records it. */
const rosterView = (row: Row): Record<string, unknown> => ({
  id: row.id,
  paragraph: row.paragraph,
  quote: row.quote,
  status: row.status,
  pins: row.pins.map(entry => ({ file: entry.file, title: entry.title, suite: [...entry.suite] })),
  ...(row.status === "unpinned" ? { reason: row.reason } : {}),
});

describe("wb-973.15 docs/workbench/19 § Claude role as a swarm context graph worker census (report mode)", () => {
  it("AC1: the live section renders exactly its composed section, every sentence a row's quote and every row's quote a sentence", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    expect(sentencesOf(composedBlocks())).toEqual(TABLE.map(row => row.quote));
  });

  it("AC1 (rule 16 frozen shape): the table holds ten deeply frozen rows whose row/pin shape is the frozen literal", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    for (const row of TABLE) {
      if (row.status === "pinned") {
        expect(row.pins.length, `row ${row.id}: a pinned row has no pins`).toBeGreaterThan(0);
        for (const entry of row.pins) expect(entry, `row ${row.id}: every pin binds the cases file and its describe`).toMatchObject({ file: CASES_FILE, suite: [CASES_SUITE] });
      } else {
        expect(row.pins, `row ${row.id}: an unpinned row carries no pins`).toEqual([]);
        expect(row.reason.trim().length, `row ${row.id}: an unpinned row needs a reason`).toBeGreaterThan(20);
      }
    }
  });

  it("AC1 (rule 16 anchor): the table equals the out-of-file roster row for row and pin for pin", () => {
    const roster: unknown = JSON.parse(readRepo(ROSTER_FILE));
    expect(roster).toMatchObject({ bead: "wb-973.15", doc: DOCS_FILE, section: DOCS_HEADING, census: SELF, cases: CASES_FILE });
    const rows = roster !== null && typeof roster === "object" && "rows" in roster ? roster.rows : undefined;
    expect(rows).toEqual(TABLE.map(rosterView));
  });

  it("AC1 (rule 16 judged subset, U1): the AC2 it.each runs exactly the frozen judged rows, and they are the roster's pinned rows", () => {
    expect(PINNED.map(row => `${row.id}:${row.pins.length}`), "the set the AC2 it.each runs, by row id and pin count").toEqual(FROZEN_JUDGED);
    expect(PINNED.every(row => row.status === "pinned" && row.pins.length > 0)).toBe(true);
    const roster: unknown = JSON.parse(readRepo(ROSTER_FILE));
    const rows: unknown = roster !== null && typeof roster === "object" && "rows" in roster ? roster.rows : undefined;
    const rosterPinned = Array.isArray(rows)
      ? rows.flatMap((row: unknown) => {
          if (row === null || typeof row !== "object" || !("id" in row) || !("status" in row) || !("pins" in row)) return [];
          return row.status === "pinned" && Array.isArray(row.pins) ? [`${String(row.id)}:${row.pins.length}`] : [];
        })
      : [];
    expect(rosterPinned, "the out-of-file roster's pinned rows, the anchor outside this file").toEqual(FROZEN_JUDGED);
  });

  it("AC3: the unpinned rows are listed so none is ever counted as passed, each naming its reason", () => {
    const unpinned = TABLE.filter((row): row is UnpinnedRow => row.status === "unpinned");
    expect(unpinned.map(row => row.id)).toEqual(["R2"]);
    expect(unpinned[0]?.reason).toContain("rf install-skill --list --json");
  });

  it.each(PINNED)("AC2 row $id: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    expect(row.pins.length, `row ${row.id}: an AC2 case judges a row with pins, never an empty one vacuously`).toBeGreaterThan(0);
    const verdicts = judge(REPORT, row.pins.map(casePin));
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
    completed.add(row.id);
  }, JUDGE_BUDGET_MS);

  it("AC2 each-liveness (rule 16, U1): the it.each registers one run-mode AC2 case per frozen judged row, in order and on the judging budget, and every one reached its last assertion", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.name.startsWith("AC2 row ")) registered.push(`${child.name}|${child.mode}|${child.timeout}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const ids = FROZEN_JUDGED.map(entry => entry.slice(0, entry.indexOf(":")));
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(registered, "the AC2 cases this file registers, by title, mode and timeout").toEqual(ids.map(id => `${AC2_CASE(id)}|run|${JUDGE_BUDGET_MS}`));
    expect([...completed], "the AC2 cases that reached their last assertion this run").toEqual(ids);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module.includes(basename(CASES_FILE, ".ts")))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-973.15 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const r4 = PINNED.find(row => row.id === "R4");
  const r5 = PINNED.find(row => row.id === "R5");

  it("a renamed pinned title is absent from the report and red, naming the row, the file and the title", () => {
    const entry = r4?.pins[1];
    expect(r4 !== undefined && entry !== undefined).toBe(true);
    if (r4 === undefined || entry === undefined) return;
    const renamed = { ...entry, title: `${entry.title} (renamed)` };
    const [verdict] = judge(REPORT, [casePin(renamed)]);
    expect(verdict?.code).toBe("absent");
    const [line] = failures(r4, verdict === undefined ? [] : [verdict]);
    expect(line).toContain("row R4");
    expect(line).toContain(entry.file);
    expect(line).toContain(renamed.title);
  }, JUDGE_BUDGET_MS);

  it("a pin binds its describe: the same case under a renamed describe path is absent", () => {
    const entry = r5?.pins[0];
    expect(entry).toBeDefined();
    if (entry === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...entry, suite: [`${CASES_SUITE} (renamed)`] })]);
    expect(verdict?.code).toBe("absent");
  }, JUDGE_BUDGET_MS);

  it("a pin relabelled to another tier is refused by the default report, never carried from a title's presence", () => {
    const entry = r5?.pins[0];
    expect(entry).toBeDefined();
    if (entry === undefined) return;
    const [verdict] = judge(REPORT, [{ ...casePin(entry), tier: "native-read" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  }, JUDGE_BUDGET_MS);
});

describe("wb-973.15 docs drift names the row or the section (rendered view, bounded section)", () => {
  const good = composedPage(composedSection());
  const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));
  const quote = (id: string): string => TABLE.find(row => row.id === id)?.quote ?? "";

  it("accepts the section exactly as composed, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(good)).toEqual([]);
    expect(docsFailures(composedPage(composedSection(), "\n## Next\n\nOther text that no row binds.\n"))).toEqual([]);
  });

  it("D1 names row R5 (and only it) when its sentence is dropped", () => {
    const lines = docsFailures(good.replace(` ${quote("R5")}`, ""));
    expect(named(lines)).toEqual(["row R5"]);
    expect(lines.some(line => line.includes("not exactly its composed section"))).toBe(true);
  });

  it("D2 names row R8 (and only it) when its sentence is reworded, and names the reworded sentence as unbound", () => {
    const lines = docsFailures(good.replace("expose no Pi provider tool", "expose no provider tool"));
    expect(named(lines)).toEqual(["row R8"]);
    expect(lines.some(line => line.includes("a sentence no row binds renders"))).toBe(true);
  });

  it("D3 goes red on the section, naming no row, when a weakening sentence is appended to the second paragraph", () => {
    const lines = docsFailures(good.replace(quote("R10"), `${quote("R10")} Unless the operator says otherwise.`));
    expect(named(lines)).toEqual([]);
    expect(lines.some(line => line.includes("a sentence no row binds renders"))).toBe(true);
    expect(lines.some(line => line.includes("not exactly its composed section"))).toBe(true);
  });

  it("D4 names row R3 when its sentence moves out of the section into a following level-2 section", () => {
    const moved = composedPage(composedSection().replace(` ${quote("R3")}`, ""), `\n## Next\n\n${quote("R3")}\n`);
    expect(named(docsFailures(moved))).toEqual(["row R3"]);
  });

  it("D5 goes red on the section when an HTML comment sits inside it", () => {
    const lines = docsFailures(good.replace(quote("R6"), `${quote("R6")} <!-- hidden -->`));
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 refuses the section when its heading occurs twice", () => {
    const lines = docsFailures(`${good}\n## ${DOCS_HEADING}\n\nA second copy.\n`);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D7 goes red on the section, naming no row, when the settings block drops Bash from the role's tools", () => {
    const lines = docsFailures(good.replace('"tools": ["Bash", "Read"]', '"tools": ["Read"]'));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its composed section");
  });
});
