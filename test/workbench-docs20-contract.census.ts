/**
 * wb-6ze.40 (VC-5/W15, sequenced census class): census falsifier for docs/workbench/20-evidence-loader-contract.md, a census
 * leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE.
 *
 * Binds the four "Producer mapping" rows and the five "Refusal and freshness rules" sentences to existing cases by file,
 * verbatim title and tier, or records a half-sentence as unpinned with its reason. It executes no pinned case and no test
 * run: judge() from the shared helper test/helpers/census.ts reads vitest's own JSON report of the default gate's test step
 * (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned case counts only when the gate's
 * own run collected it exactly once, recorded it passed, and its body asserts - the helper's three legs, fail-closed. A
 * renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore reads red, naming the
 * row, the file, the title and the cause, as far as the helper's resolvable-construct roster and its named residuals reach
 * (test/helpers/census.ts, receipts/wb-u62.md). This leg adds no title scanner of its own: no regex or bare-text reading of
 * case titles, and no collect-only child run (docs/workbench/14 "Each major work package must have a falsifier: a negative
 * test that would fail if a critical guarantee was quietly weakened.").
 *
 * Docs exactness reads the RENDERED view through the helper's docsSection / sectionMatches: the section under each unique
 * level-2 heading of the level-1 parent heading, bounded at the next level-1/2 heading or EOF (FOLD-1: a "###" subsection
 * belongs to it), must render as exactly the pinned block list - the whole Producer mapping table (every cell of every row)
 * and the one paragraph holding the five Refusal and freshness sentences. A dropped or reworded cell or sentence names its row.
 *
 * Tier: every pinned case is a default-gate case (the default tier's own report vouches for it). No row pins a live or native
 * case, so there is no presence-only live pin and nothing here claims a live, native or scale pass from a title being present;
 * a row relabelled to any other tier is refused by judge() (tier-mismatch, R2 = (i)).
 *
 * Record honesty (this file supersedes the 10029f7 / dbbf8ae cuts, whose bare-text scanner and executing collect-only child
 * run are gone): a half-sentence with no case is listed as UNPINNED with its reason below and is never counted as passed.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
  /** Present only for an it.each template pin: the least number of table rows the gate's run must have collected. */
  readonly each?: number;
}
interface Half {
  readonly id: string;
  /** Verbatim part of the doc row or sentence this half covers. */
  readonly clause: string;
  readonly pins: readonly Pin[];
  /** Present only when the half has no pin: why none exists. */
  readonly reason?: string;
}
interface Row {
  readonly id: string;
  readonly kind: "producer" | "rule";
  /** The rendered doc texts that must still be present, each naming this row on drift. */
  readonly texts: readonly string[];
  readonly halves: readonly Half[];
}
interface PinnedHalf {
  readonly row: Row;
  readonly half: Half;
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs20-contract.census.ts";
const DOC = "docs/workbench/20-evidence-loader-contract.md";
const DOC_PARENT = "20 — EvidenceLoader contract (workbench.evidence-loader/v1)";
const PRODUCER_HEADING = "Producer mapping";
const RULES_HEADING = "Refusal and freshness rules";

const LOADER = "test/workbench-evidence-loader.test.ts";
const WIRING = "test/workbench-evidence-wiring.test.ts";
const FURNACE = "test/workbench-furnace-evidence.test.ts";
const FORGE = "test/workbench-forge-evidence.test.ts";
const CLAUDE = "test/workbench-claude-evidence.test.ts";
const INSPECTOR = "test/workbench-inspector.test.ts";

const pin = (file: string, title: string, each?: number): Pin => (each === undefined ? { file, title } : { file, title, each });

/** The Producer mapping table as a reader sees it: header cells, then each row's cells, joined by a space (renderedOther). */
const PRODUCER_ROWS: readonly (readonly string[])[] = [
  ["claude-agent-sdk session", "claude-message:<uuid>", "bounded transcript read, select the row by uuid; a ref outside the bounded window is transport, never fabricated", "claude:transcript (new)"],
  [
    "furnace run",
    "native Attempt id listed on the owning run node",
    "the observer's bounded logs read with its run/attempt/stream identity checks; lossy, incomplete or paged reads are loaded with truncated true; an attempt belonging to another run is unauthorized",
    "furnace:inspect",
  ],
  [
    "forge operation",
    "forge-operation:<operation_id>",
    're-read through the registered read capability; a failed or partial domain verdict is a legitimate loaded result rendered as its own status, never "verified"',
    "forge:inspect",
  ],
  ["anything else", "—", "unavailable: no-loader, a visible unknown", "—"],
];
const PRODUCER_TABLE_TEXT = [["Producer", "Ref", "Resolution", "Grant"], ...PRODUCER_ROWS].map(cells => cells.join(" ")).join(" ");
/**
 * The paragraph after the table (the claude row's prose): pinned whole, because the section's slice equality covers every block
 * (U3). Its rendered text is the markdown with the code-span backticks removed (no other markup occurs in it).
 */
const CLAUDE_PARAGRAPH_MARKDOWN =
  "The claude row is served by the claude-evidence module (`workbench.claude-evidence/v1`, `src/workbench/claude-evidence.ts`) through the host wiring (wb-idq): its `kind` is `claude-message`, the ref prefix spelling; the ref grammar is the module's uuid form; ownership is the requested node's own listing, never the first node in scope that lists the ref, so a session that does not list the ref, an unobserved session and a non-session node all refuse `unauthorized` with no read; between sessions (no cwd) and on any failed or malformed read the entry is `transport`, carrying `stale` when the owning node is not current; `no-loader` is reserved for the store's own routing. Every capture time comes from the clock the host injects once at boot (`src/index.ts`); the store has no clock of its own and a clockless claude loader is a type error. `truncated` is honest end to end: a row the transcript adapter cut at `CLAUDE_TRANSCRIPT_ROW_CHARS` arrives flagged `clipped` and loads truncated, the store's `[truncated]` line being the one visible marker (the module's own marker is stripped by the loader), and the inspector transcript view renders such a row with its own marker line. The preview's first line is the row's role (`user:`, `assistant:` or `system:`).";
const CLAUDE_PARAGRAPH_TEXT = CLAUDE_PARAGRAPH_MARKDOWN.replaceAll("`", "");
const PRODUCER_BLOCKS: readonly RenderedBlock[] = [
  { kind: "other", type: "table", text: PRODUCER_TABLE_TEXT },
  { kind: "paragraph", text: CLAUDE_PARAGRAPH_TEXT, markdown: CLAUDE_PARAGRAPH_MARKDOWN },
];

const RULE_SENTENCES: readonly string[] = [
  "Unknown producer or ref kind: no-loader, ref stays listed sanitized.",
  "Scope mismatch or missing/revoked exact grant: unauthorized.",
  "Stale or disconnected owning nodes label loaded evidence stale; a failed read against a disconnected source is transport plus stale.",
  "A loaded entry never upgrades projection freshness and never changes node status text or tone.",
  "Transport success never implies verification.",
];
const RULES_TEXT = RULE_SENTENCES.join(" ");
const RULES_BLOCKS: readonly RenderedBlock[] = [{ kind: "paragraph", text: RULES_TEXT, markdown: RULES_TEXT }];

const NO_LOADER_PINS: readonly Pin[] = [
  pin(LOADER, "routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader"),
  pin(WIRING, "renders a forge operation ref as the visible no-loader unknown when the host supplies no registry"),
];

/** Freezes the table and everything it holds, so no row, half or pin can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}
const isDeepFrozen = (value: unknown): boolean => value === null || typeof value !== "object" || (Object.isFrozen(value) && Object.values(value).every(isDeepFrozen));

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    id: "producer:claude-agent-sdk-session",
    kind: "producer",
    texts: PRODUCER_ROWS[0] ?? [],
    halves: [
      {
        id: "whole",
        clause: "claude-agent-sdk session",
        pins: [
          pin(LOADER, "claude: with the grant it selects the row by uuid through the module (role prefix, bounded rows, the 40-row window); a revoked grant refuses on the next load"),
          pin(LOADER, "claude: a uuid outside the bounded window is transport, never a fabricated row"),
          pin(CLAUDE, "loads exactly the row whose uuid the ref names, from one bounded read keyed by the owning session id"),
          pin(WIRING, "loads a claude transcript row under the live grant and refuses after revocation"),
        ],
      },
    ],
  },
  {
    id: "producer:furnace-run",
    kind: "producer",
    texts: PRODUCER_ROWS[1] ?? [],
    halves: [
      {
        id: "whole",
        clause: "furnace run",
        pins: [
          pin(FURNACE, "loads a complete stderr read of a listed Attempt as furnace.attempt.log evidence with the producer receipt"),
          pin(LOADER, "furnace: lossy, incomplete or paged reads are loaded with truncated true"),
          pin(LOADER, "furnace: an attempt belonging to another run is unauthorized, without its text"),
        ],
      },
    ],
  },
  {
    id: "producer:forge-operation",
    kind: "producer",
    texts: PRODUCER_ROWS[2] ?? [],
    halves: [
      {
        id: "whole",
        clause: "forge operation",
        pins: [
          pin(FORGE, "C1: a valid ref re-reads exactly once through the injected seam and loads EvidenceContent-shaped data"),
          pin(FORGE, "C2: a failed gate loads as its own failed status, never verified"),
          pin(LOADER, "forge: only validated forge-operation refs resolve; a partial read is truncated"),
        ],
      },
    ],
  },
  { id: "producer:anything-else", kind: "producer", texts: PRODUCER_ROWS[3] ?? [], halves: [{ id: "whole", clause: "anything else", pins: NO_LOADER_PINS }] },
  {
    id: "rule:no-loader",
    kind: "rule",
    texts: [RULE_SENTENCES[0] ?? ""],
    halves: [
      { id: "no-loader-fallback", clause: "Unknown producer or ref kind: no-loader", pins: NO_LOADER_PINS },
      { id: "ref-stays-listed", clause: "ref stays listed", pins: [pin(INSPECTOR, "A4 every state renders as a visible label at %j ascii=%s, and preview text only for loaded", 4)] },
      {
        id: "ref-sanitized",
        clause: "sanitized",
        pins: [],
        reason:
          "No case asserts that a hostile ref string is sanitized in the visible no-loader line: A5 sanitizes PREVIEW text of loaded entries only, and the unavailable no-loader entry carries no ref text in the store. Unpinned; pin it in the commit that lands a hostile-ref rendering case. Tier: none (no case exists to label).",
      },
    ],
  },
  {
    id: "rule:unauthorized",
    kind: "rule",
    texts: [RULE_SENTENCES[1] ?? ""],
    halves: [
      {
        id: "whole",
        clause: "Scope mismatch or missing/revoked exact grant: unauthorized",
        pins: [
          pin(LOADER, "refuses a cross-scope ref as unauthorized without invoking any loader"),
          pin(LOADER, "builds a loader for each supplied reader; without its exact grant every load refuses unauthorized and reads nothing"),
          pin(FORGE, "C3: only the exact forge:inspect grant loads; everything else is an authorization denial with a spy-proven untouched seam"),
          pin(FORGE, "C3: the live grant set is re-read on every load, so mid-view revocation refuses"),
          pin(CLAUDE, "re-reads the live grant set: a revocation during the read refuses unauthorized and returns no preview"),
        ],
      },
    ],
  },
  {
    id: "rule:stale-and-transport-plus-stale",
    kind: "rule",
    texts: [RULE_SENTENCES[2] ?? ""],
    halves: [
      {
        id: "stale-label",
        clause: "Stale or disconnected owning nodes label loaded evidence stale",
        pins: [
          pin(INSPECTOR, "A14 a stale or disconnected owner labels loaded evidence stale and a failed read as transport plus stale"),
          pin(FORGE, "C2: a stale or disconnected owner labels loaded evidence stale; a current owner labels it current"),
          pin(WIRING, "labels a forge read stale when the owning node is stale and truncated when the reader bounded it"),
          pin(CLAUDE, "labels loaded evidence stale when the owning node is stale or unknown, and current only when it is current"),
        ],
      },
      {
        id: "transport-plus-stale",
        clause: "a failed read against a disconnected source is transport plus stale",
        pins: [pin(FORGE, "C2: a failed read against a disconnected owner is transport plus stale")],
      },
    ],
  },
  {
    id: "rule:loaded-never-upgrades-freshness",
    kind: "rule",
    texts: [RULE_SENTENCES[3] ?? ""],
    halves: [
      {
        id: "projection-freshness",
        clause: "A loaded entry never upgrades projection freshness",
        pins: [],
        reason:
          "No case loads evidence on an already-stale projection and then asserts the projection node stays stale: A6 loads on a CURRENT projection (no disconnect or markStale), so it has no stale baseline; A14 disconnects AFTER the load and asserts the entry label; the wiring stale case asserts only the entry's own freshness. Unpinned; a stale-baseline case would pin it. Tier: none (no case exists to label).",
      },
      {
        id: "status-text-and-tone",
        clause: "never changes node status text or tone",
        pins: [pin(INSPECTOR, "A6 a loaded entry never changes status text, tone glyph or the confirmed/definition lines")],
      },
    ],
  },
  {
    id: "rule:transport-never-verification",
    kind: "rule",
    texts: [RULE_SENTENCES[4] ?? ""],
    halves: [
      {
        id: "whole",
        clause: "Transport success never implies verification",
        pins: [
          pin(FURNACE, "%s states no verdict, status, tone or outcome, and freshness only as current", 2),
          pin(FORGE, "C2: a failed gate loads as its own failed status, never verified"),
          pin(FORGE, "C2: a partial COULD_NOT_JUDGE verdict loads as its own partial status, never verified"),
          pin(CLAUDE, "a failed agent message stays that message's own content and exposes no status, tone or verification field"),
        ],
      },
    ],
  },
]);

const PINNED: readonly PinnedHalf[] = ROWS.flatMap(row => row.halves.filter(half => half.pins.length > 0).map(half => ({ row, half })));
const UNPINNED: readonly PinnedHalf[] = ROWS.flatMap(row => row.halves.filter(half => half.pins.length === 0).map(half => ({ row, half })));
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The default report is the default gate's test step: every pin is judged under that tier, an it.each pin with its table floor. */
const casePin = (pinned: Pin, tier: string = DEFAULT_GATE_TIER): CasePin => ({ file: pinned.file, title: pinned.title, tier, ...(pinned.each === undefined ? {} : { each: { minCases: pinned.each } }) });

/** One line per pin that is not ok, naming the row and half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `${row.id} / ${half.id}: ${verdict.code}: ${verdict.why}`);

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row text checks read the section's RENDERED text and
 * run independently of the exactness check, so a dropped or reworded cell or sentence names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const sections: readonly { readonly heading: string; readonly kind: Row["kind"]; readonly expected: readonly RenderedBlock[] }[] = [
    { heading: PRODUCER_HEADING, kind: "producer", expected: PRODUCER_BLOCKS },
    { heading: RULES_HEADING, kind: "rule", expected: RULES_BLOCKS },
  ];
  for (const { heading, kind, expected } of sections) {
    const section = docsSection(markdown, heading, 2, [DOC_PARENT]);
    if (!section.ok) {
      out.push(`${DOC} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const text = section.blocks.map(block => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text)).join(" ");
    for (const row of ROWS.filter(candidate => candidate.kind === kind)) {
      for (const cell of row.texts) {
        if (!text.includes(cell)) out.push(`${row.id}: "${cell}" no longer renders in ${DOC} § ${heading}`);
      }
    }
    const exact = sectionMatches(section, expected);
    if (!exact.ok) out.push(`${DOC} § ${heading} is not exactly the pinned blocks: ${exact.why}`);
  }
  return out;
}

describe("wb-6ze.40 docs/workbench/20 evidence-loader contract census (report mode)", () => {
  it("AC1: Producer mapping renders exactly its table, and Refusal and freshness rules exactly its five sentences", () => {
    expect(docsFailures(readRepo(DOC))).toEqual([]);
  });

  it("AC1: the table holds four producer rows and five rule sentences, deeply frozen, every doc text a verbatim cell or sentence", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.filter(row => row.kind === "producer").map(row => row.texts[0])).toEqual(PRODUCER_ROWS.map(cells => cells[0]));
    expect(ROWS.filter(row => row.kind === "rule").flatMap(row => row.texts)).toEqual(RULE_SENTENCES);
    expect(PRODUCER_ROWS).toHaveLength(4);
    expect(RULE_SENTENCES).toHaveLength(5);
    for (const row of ROWS) {
      expect(row.halves.length, `${row.id}: a row needs a half`).toBeGreaterThan(0);
      for (const half of row.halves) {
        if (half.pins.length === 0) expect((half.reason ?? "").trim().length, `${row.id} / ${half.id}: an unpinned half needs a reason`).toBeGreaterThan(80);
        else expect(half.reason, `${row.id} / ${half.id}: a pinned half carries no reason`).toBeUndefined();
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed, each naming its reason", () => {
    expect(UNPINNED.map(({ row, half }) => `${row.id} / ${half.id}`)).toEqual(["rule:no-loader / ref-sanitized", "rule:loaded-never-upgrades-freshness / projection-freshness"]);
    for (const { half } of UNPINNED) expect(half.reason).toContain("Unpinned");
  });

  it.each(PINNED)("AC2 $row.id / $half.id: every pinned case is collected once, passed and asserting in the default gate's own report", ({ row, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(each => casePin(each)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.map(entry => entry.module)).not.toContain("node:child_process");
    const pinned = PINNED.flatMap(({ half }) => half.pins.map(each => basename(each.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6ze.40 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const halfOf = (rowId: string, halfId: string): PinnedHalf => {
    const found = PINNED.find(({ row, half }) => row.id === rowId && half.id === halfId);
    if (found === undefined) throw new Error(`no pinned half ${rowId} / ${halfId}`);
    return found;
  };
  const firstPin = (pinned: PinnedHalf): Pin => {
    const first = pinned.half.pins[0];
    if (first === undefined) throw new Error("a pinned half has a pin");
    return first;
  };

  it("a renamed pinned title is absent from the report and red, naming the row, the file and the title", () => {
    const target = halfOf("producer:forge-operation", "whole");
    const original = firstPin(target);
    const renamed = { ...original, title: `${original.title} (renamed)` };
    const [verdict] = judge(REPORT, [casePin(renamed)]);
    expect(verdict?.code).toBe("absent");
    const [line] = failures(target.row, target.half, verdict === undefined ? [] : [verdict]);
    expect(line).toContain("producer:forge-operation / whole");
    expect(line).toContain(renamed.file);
    expect(line).toContain(renamed.title);
  });

  it("a wrong pin goes red: the same title under another file is absent, never matched across files", () => {
    const target = firstPin(halfOf("rule:unauthorized", "whole"));
    const [verdict] = judge(REPORT, [casePin({ ...target, file: FURNACE })]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("absent");
  });

  it("an it.each pin that claims more table rows than the gate's run collected is red, not ok", () => {
    const target = firstPin(halfOf("rule:no-loader", "ref-stays-listed"));
    expect(target.each).toBe(4);
    const [verdict] = judge(REPORT, [casePin({ ...target, each: 99 })]);
    expect(verdict?.ok).toBe(false);
  });

  it("a file the default config excludes (a native live-tier suite) is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-client.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a row relabelled to a live tier is refused by the default report, never carried from a title's presence", () => {
    const target = firstPin(halfOf("producer:furnace-run", "whole"));
    const [verdict] = judge(REPORT, [casePin(target, "native-read")]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-6ze.40 docs drift names the row or the section (U3, FOLD-1, rendered view)", () => {
  const doc = readRepo(DOC);
  const edit = (from: string, to: string): string => {
    expect(doc.includes(from), `the doc carries ${from}`).toBe(true);
    return doc.replace(from, to);
  };
  const named = (lines: readonly string[]): string[] => lines.filter(line => /^(producer|rule):/u.test(line)).map(line => line.slice(0, line.indexOf(":", line.indexOf(":") + 1)));

  it("accepts both sections exactly as written", () => {
    expect(docsFailures(doc)).toEqual([]);
  });

  it("D1 names the furnace row when its grant cell is changed", () => {
    const lines = docsFailures(edit("| `furnace:inspect` |", "| `furnace:*` |"));
    expect(named(lines)).toEqual(["producer:furnace-run"]);
    expect(lines.some(line => line.includes("not exactly the pinned blocks"))).toBe(true);
  });

  it("D2 names the forge row when its ref cell is widened", () => {
    expect(named(docsFailures(edit("`forge-operation:<operation_id>`", "`forge-operation:<any string>`")))).toEqual(["producer:forge-operation"]);
  });

  it("D3 names the claude row when its grant cell is dropped", () => {
    expect(named(docsFailures(edit("`claude:transcript` (new)", "—")))).toEqual(["producer:claude-agent-sdk-session"]);
  });

  it("D4 names the anything-else row when its resolution is silently dropped", () => {
    expect(named(docsFailures(edit("`unavailable: no-loader`, a visible unknown", "—")))).toEqual(["producer:anything-else"]);
  });

  it("D5 goes red on the section, naming no row, when a fifth producer row is added", () => {
    const lines = docsFailures(edit("| anything else | — | `unavailable: no-loader`, a visible unknown | — |", "| anything else | — | `unavailable: no-loader`, a visible unknown | — |\n| a fifth | x | y | z |"));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly the pinned blocks");
  });

  it("D6 names the rule row when a sentence is reworded", () => {
    expect(named(docsFailures(edit("Transport success never implies verification.", "Transport success usually implies verification.")))).toEqual(["rule:transport-never-verification"]);
  });

  it("D7 names the rule row when a sentence is deleted", () => {
    expect(named(docsFailures(edit(" Scope mismatch or missing/revoked exact grant: unauthorized.", "")))).toEqual(["rule:unauthorized"]);
  });

  it("D8 (FOLD-1) goes red on the section when a weakening ### subsection is added inside Producer mapping or Refusal and freshness rules", () => {
    const sub = "\n### Exceptions\n\nA host may skip these rules.\n";
    for (const [anchor, heading] of [
      ["\n## Refusal and freshness rules", PRODUCER_HEADING],
      ["\n## UI integration", RULES_HEADING],
    ] as const) {
      const lines = docsFailures(edit(anchor, `${sub}${anchor}`));
      expect(lines.filter(line => line.includes(`§ ${heading} is not exactly`))).toHaveLength(1);
    }
  });

  it("D9 goes red when a weakening paragraph is appended inside Refusal and freshness rules", () => {
    const lines = docsFailures(edit(RULES_TEXT, `${RULES_TEXT}\n\nA host may skip these rules.`));
    expect(lines.some(line => line.includes("the section has 2 blocks; the census pins 1"))).toBe(true);
  });

  it("D10 goes red when a heading is renamed away, and when a level-1 heading inserted above re-homes the sections", () => {
    expect(docsFailures(edit(`## ${PRODUCER_HEADING}`, "## Producer notes")).some(line => line.includes("the section is refused"))).toBe(true);
    expect(docsFailures(edit(`## ${PRODUCER_HEADING}`, `# Appendix\n\n## ${PRODUCER_HEADING}`)).some(line => line.includes("the section is refused"))).toBe(true);
  });

  it("D11 names the rule row when its sentence is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(edit("Transport success never implies verification.", "<!-- Transport success never implies verification. -->"));
    expect(named(lines)).toEqual(["rule:transport-never-verification"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });
});
