/**
 * workflow-conformance-census.test.ts — wb-6hb.9 (VC-2/W05): the docs/05
 * "Conformance" requirement census, a falsifier.
 *
 * docs/workbench/05-script-language-and-runtime.md § "Conformance" (three
 * sentences, eleven requirements):
 *
 *   1. "Run legacy fixtures in upstream Pi mode (where available) and Claude
 *      host mode, comparing script-level result shapes, phase grouping, error
 *      behavior, ordering constraints and cancellation."  -> five rows
 *   2. "Test workload schedule nondeterminism rather than requiring identical
 *      parallel arrival order."                           -> one row
 *   3. "Include invalid/malicious payloads, cycles, prototype pollution
 *      attempts, oversized values and timeout ambiguity." -> five rows
 *
 * Every row below is bound to existing cases by file path, verbatim it/describe
 * title and docs/14 truth label ("tier"). The census reads the pinned files as
 * text and never executes the pinned cases. It goes red, naming the row, when a
 * pinned case is renamed, deleted, duplicated, commented out or skipped, when a
 * tier is outside the docs/14 vocabulary, and when a row's status overstates
 * its pins.
 *
 * Dual-mode honesty (sentence 1): a row is a dual-mode proof only when a pinned
 * case runs the SAME fixture under BOTH upstream Pi mode and Claude host mode
 * (mode "both"). Two single-mode cases never add up to one, because neither
 * compares anything to the other. No such case exists on this base (wb-cax.7,
 * the dual-backend golden equivalence, is not landed), so rows 1-5 are recorded
 * "single-mode" with the missing comparison written out and never count as
 * satisfied. When wb-cax.7 lands, its case is pinned with mode "both" and the
 * row is promoted by editing this file; the guards below refuse a promotion
 * without such a pin.
 *
 * Scope: test-only. It binds to cases that exist, it never edits them, and it
 * leaves wb-6hb.7 (docs/05 "Error taxonomy") and wb-6hb.6 (docs/06) alone.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DOC_PATH = "docs/workbench/05-script-language-and-runtime.md";

/** docs/14 § "Truth labels and release gates" — the only tiers a pin may claim. */
const TIERS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"] as const;
type Tier = (typeof TIERS)[number];

/** Which execution mode a pinned case runs under. Only "both" proves a dual-mode comparison. */
type Mode = "pi" | "claude" | "neutral" | "both";
type Status = "pinned" | "single-mode" | "dual-mode" | "unpinned";

interface Pin {
  readonly file: string;
  /** Verbatim text between the quotes of the it()/describe() call, as written in the source. */
  readonly title: string;
  readonly tier: Tier;
  readonly mode: Mode;
  /** Extra verbatim source snippets the file must still contain (for titles built from a table). */
  readonly anchors?: readonly string[];
}

interface Row {
  readonly id: string;
  readonly sentence: 1 | 2 | 3;
  /** The exact fragment of the docs/05 sentence this row binds. */
  readonly requirement: string;
  readonly dualMode: boolean;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** Modes the pins cover (computed and compared, so it cannot go stale). */
  readonly covers: readonly Mode[];
  /** single-mode rows: what comparison is missing. */
  readonly unmet?: string;
  /** unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

const S1 =
  "Run legacy fixtures in upstream Pi mode (where available) and Claude host mode, comparing script-level result shapes, phase grouping, error behavior, ordering constraints and cancellation.";
const S2 = "Test workload schedule nondeterminism rather than requiring identical parallel arrival order.";
const S3 = "Include invalid/malicious payloads, cycles, prototype pollution attempts, oversized values and timeout ambiguity.";

const COMPAT = "test/workflow-claude-code-compat.test.ts";
const E2E = "test/e2e/workflow.e2e.test.ts";
const RUNTIME = "test/workflow-runtime.test.ts";
const PROGRESS = "test/workflow-progress.test.ts";
const HOST = "test/workbench-host-contract.test.ts";
const CANCEL = "test/workbench-claude-cancel-faults.test.ts";
const NODE = "test/workbench-node-contract.test.ts";
const LIMITS = "test/workbench-node-limits.test.ts";
const AUTH = "test/workbench-registry-auth.test.ts";
/** The cycle case is generated from a table (`it(\`rejects ${name} on the way out\`)`), so its verbatim source title carries the placeholder. */
const GENERATED_TITLE = ["rejects $", "{name} on the way out"].join("");
const SECURITY = "test/workbench-security-workflow.test.ts";

const DUAL_UNMET =
  "The same legacy fixture compared under upstream Pi mode and Claude host mode on this property. The pinned cases each run one mode (or a host-neutral stub) and compare nothing to each other; the dual-backend golden equivalence is wb-cax.7, not landed on this base.";

const ROWS: readonly Row[] = [
  {
    id: "S1-result-shapes",
    sentence: 1,
    requirement: "script-level result shapes",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral", "pi"],
    unmet: DUAL_UNMET,
    pins: [
      { file: COMPAT, title: "runs the canonical review-changes example", tier: "fixture pass", mode: "neutral" },
      {
        file: HOST,
        title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
        tier: "fixture pass",
        mode: "claude",
      },
      {
        file: E2E,
        title: "runs a real script whose agents reach real sessions with the script's prompts",
        tier: "fixture pass",
        mode: "pi",
      },
    ],
  },
  {
    id: "S1-phase-grouping",
    sentence: 1,
    requirement: "phase grouping",
    dualMode: true,
    status: "single-mode",
    covers: ["neutral"],
    unmet: `${DUAL_UNMET} The phase-group cases are host-neutral reducers and a stub-host run; no case observes phase grouping from a Pi-mode or Claude-mode run.`,
    pins: [
      { file: PROGRESS, title: "orders groups by phase index, not first appearance", tier: "fixture pass", mode: "neutral" },
      { file: RUNTIME, title: "files the child's agents under their own phase group", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S1-error-behavior",
    sentence: 1,
    requirement: "error behavior",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral", "pi"],
    unmet: DUAL_UNMET,
    pins: [
      { file: RUNTIME, title: "maps a failed agent to null rather than throwing", tier: "fixture pass", mode: "neutral" },
      { file: HOST, title: "L4: error result after partial assistant never becomes success", tier: "fixture pass", mode: "claude" },
      { file: E2E, title: "surfaces a script that fails to parse instead of launching it", tier: "fixture pass", mode: "pi" },
    ],
  },
  {
    id: "S1-ordering-constraints",
    sentence: 1,
    requirement: "ordering constraints",
    dualMode: true,
    status: "single-mode",
    covers: ["neutral"],
    unmet: `${DUAL_UNMET} The ordering cases run on the stub host only.`,
    pins: [
      { file: RUNTIME, title: "is a barrier and folds a throwing thunk to null", tier: "fixture pass", mode: "neutral" },
      {
        file: RUNTIME,
        title: "overlaps stages — item A reaches stage 2 before item B leaves stage 1",
        tier: "fixture pass",
        mode: "neutral",
      },
    ],
  },
  {
    id: "S1-cancellation",
    sentence: 1,
    requirement: "cancellation",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral"],
    unmet: `${DUAL_UNMET} No pinned cancellation case runs the Pi AgentManager path at all.`,
    pins: [
      { file: RUNTIME, title: "terminates the run and aborts every in-flight child", tier: "fixture pass", mode: "neutral" },
      {
        file: CANCEL,
        title: "F5 a pre-aborted host signal makes zero query() calls and settles skipped",
        tier: "fixture pass",
        mode: "claude",
      },
    ],
  },
  {
    id: "S2-schedule-nondeterminism",
    sentence: 2,
    requirement: "schedule nondeterminism rather than requiring identical parallel arrival order",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    gap: "Both pins are order-insensitive: one proves the progress reducer yields index order whatever order entries arrive in, the other that a 24-way fan-out completes under the cap with no assumption about which agent starts first. The runtime pipeline case that asserts one exact arrival sequence is deliberately NOT a pin for this row.",
    pins: [
      { file: PROGRESS, title: "orders agents by index regardless of arrival order", tier: "fixture pass", mode: "neutral" },
      {
        file: RUNTIME,
        title: "never exceeds the configured concurrency under a large fan-out",
        tier: "fixture pass",
        mode: "neutral",
      },
    ],
  },
  {
    id: "S3-invalid-malicious-payloads",
    sentence: 3,
    requirement: "invalid/malicious payloads",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      { file: NODE, title: "L4: malformed input and non-JSON payload fail before provider effects", tier: "adversarial pass", mode: "neutral" },
      { file: SECURITY, title: "rejects a raw ANSI escape in source before VM execution", tier: "adversarial pass", mode: "neutral" },
      { file: RUNTIME, title: "rejects a script with control characters", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S3-cycles",
    sentence: 3,
    requirement: "cycles",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      {
        file: RUNTIME,
        title: GENERATED_TITLE,
        tier: "fixture pass",
        mode: "neutral",
        anchors: ['["a cycle", "const a = {}; a.self = a; return a;", "a circular structure"]'],
      },
    ],
  },
  {
    id: "S3-prototype-pollution",
    sentence: 3,
    requirement: "prototype pollution attempts",
    dualMode: false,
    status: "pinned",
    covers: ["claude", "neutral"],
    gap: "Pinned at the registry (a JSON.parse'd __proto__ input is refused before any provider runs) and at the Claude host role allowlist (constructor/__proto__/toString/hasOwnProperty never resolve a role). A __proto__ key through the Claude capability_invoke tool surface is wb-8i1, not landed on this base; it is pinned here when it lands.",
    pins: [
      { file: AUTH, title: "rejects oversized nesting and pollution before executing providers", tier: "adversarial pass", mode: "neutral" },
      { file: HOST, title: "L4: inherited prototype names never satisfy a role allowlist", tier: "adversarial pass", mode: "claude" },
    ],
  },
  {
    id: "S3-oversized-values",
    sentence: 3,
    requirement: "oversized values",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      { file: LIMITS, title: "refuses oversized input before native provider is called", tier: "adversarial pass", mode: "neutral" },
      { file: AUTH, title: "rejects deep JSON in the worker with a typed diagnostic before host dispatch", tier: "adversarial pass", mode: "neutral" },
      { file: RUNTIME, title: "rejects a script over the size limit", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S3-timeout-ambiguity",
    sentence: 3,
    requirement: "timeout ambiguity",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      {
        file: NODE,
        title: "L4: effectful invocation with lost response is reported uncertain, never automatically retried",
        tier: "adversarial pass",
        mode: "neutral",
      },
      {
        file: AUTH,
        title: "classifies effectful cancellation as uncertain and aborts only the provider wait",
        tier: "adversarial pass",
        mode: "neutral",
      },
    ],
  },
];

/** Expected census outcome: promoting a row (or losing one) is an edit to this file, never silent. */
const SATISFIED = [
  "S2-schedule-nondeterminism",
  "S3-invalid-malicious-payloads",
  "S3-cycles",
  "S3-prototype-pollution",
  "S3-oversized-values",
  "S3-timeout-ambiguity",
];
const NOT_SATISFIED = ["S1-result-shapes", "S1-phase-grouping", "S1-error-behavior", "S1-ordering-constraints", "S1-cancellation"];

// ---------------------------------------------------------------------------
// The scanner. Reads source text; never imports or runs a pinned file.
// ---------------------------------------------------------------------------

type ReadSource = (file: string) => string | undefined;

const readFromDisk: ReadSource = file => {
  try {
    return readFileSync(`${ROOT}${file}`, "utf8");
  } catch {
    return undefined;
  }
};

/** it()/test()/describe() calls with a string-literal title: name, modifier chain, quote, raw title. */
const CALL = /\b(describe|it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/g;
/** `.only` anywhere in a file stops every other case in it from running, so it voids every pin in the file. */
const FILE_ONLY = /\b(?:describe|it|test)\.only\b/;
/** A skip, todo or conditional modifier voids the pins it encloses. (`.fails` is judged on the pinned case itself.) */
const DISABLING = /\b(?:(?:describe|it|test)\.(?:skip|todo|skipIf|runIf)|xit|xdescribe)\b/g;

/** Index just past the brace that closes the block opened at `open`, skipping strings, templates and comments; undefined when unbalanced. */
function blockEnd(source: string, open: number): number | undefined {
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      i++;
      while (i < source.length && source[i] !== ch) i += source[i] === "\\" ? 2 : 1;
    } else if (ch === "/" && source[i + 1] === "/") {
      while (i < source.length && source[i] !== "\n") i++;
    } else if (ch === "/" && source[i + 1] === "*") {
      i = source.indexOf("*/", i + 2);
      if (i < 0) return undefined;
      i++;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return undefined;
}

/** The disabling modifiers whose callback block contains `position`; an unbalanced block is treated as containing it. */
function disablingAround(source: string, position: number): string[] {
  const around: string[] = [];
  for (const match of source.matchAll(DISABLING)) {
    const open = source.indexOf("{", match.index);
    if (open < 0 || open > position) continue;
    const end = blockEnd(source, open);
    if (end === undefined || position < end) around.push(match[0]);
  }
  return around;
}

interface Declaration {
  readonly modifier: string;
  readonly commented: boolean;
  readonly position: number;
}

function declarations(source: string, title: string): Declaration[] {
  const found: Declaration[] = [];
  for (const match of source.matchAll(CALL)) {
    if (match[4] !== title) continue;
    const lineStart = source.lastIndexOf("\n", match.index) + 1;
    const lead = source.slice(lineStart, match.index).trimStart();
    found.push({
      modifier: match[2] ?? "",
      commented: lead.startsWith("//") || lead.startsWith("*") || lead.startsWith("/*"),
      position: match.index,
    });
  }
  return found;
}

function auditPin(row: Row, pin: Pin, read: ReadSource): string[] {
  const where = `row ${row.id}: ${pin.file} "${pin.title}"`;
  if (!TIERS.includes(pin.tier)) return [`${where}: tier "${pin.tier}" is not a docs/14 truth label`];
  const source = read(pin.file);
  if (source === undefined) return [`${where}: pinned file is missing`];
  const problems: string[] = [];
  if (FILE_ONLY.test(source)) problems.push(`${where}: file carries an .only modifier, so its other cases do not run`);
  const live = declarations(source, pin.title).filter(d => !d.commented);
  if (live.length === 0) problems.push(`${where}: no live case with this verbatim title (renamed, deleted or commented out)`);
  if (live.length > 1) problems.push(`${where}: title is declared ${live.length} times, so the pin is ambiguous`);
  for (const declared of live) {
    if (declared.modifier !== "") problems.push(`${where}: case carries the modifier "${declared.modifier}"`);
    for (const around of disablingAround(source, declared.position)) {
      problems.push(`${where}: case sits inside a disabled or conditional block (${around})`);
    }
  }
  for (const anchor of pin.anchors ?? []) {
    if (!source.includes(anchor)) problems.push(`${where}: anchor ${JSON.stringify(anchor)} no longer appears in the file`);
  }
  return problems;
}

/** Every reason this row is not what it claims to be. Empty means the row's declared status is honest. */
function auditRow(row: Row, read: ReadSource): string[] {
  const problems: string[] = [];
  const modes = [...new Set(row.pins.map(pin => pin.mode))].sort();
  if (JSON.stringify(modes) !== JSON.stringify([...row.covers].sort())) {
    problems.push(`row ${row.id}: declares covers ${JSON.stringify(row.covers)} but the pins cover ${JSON.stringify(modes)}`);
  }
  switch (row.status) {
    case "unpinned":
      if (row.pins.length > 0) problems.push(`row ${row.id}: is unpinned yet lists ${row.pins.length} pin(s)`);
      if ((row.reason ?? "").trim().length < 20) problems.push(`row ${row.id}: an unpinned row needs a written reason`);
      break;
    case "single-mode":
      if (!row.dualMode) problems.push(`row ${row.id}: only a dual-mode requirement can be recorded single-mode`);
      if (row.pins.length === 0) problems.push(`row ${row.id}: single-mode with no pin at all is unpinned`);
      if (row.pins.some(pin => pin.mode === "both")) problems.push(`row ${row.id}: a "both" pin exists, so the row must be promoted to dual-mode`);
      if ((row.unmet ?? "").trim().length < 20) problems.push(`row ${row.id}: a single-mode row must write the missing comparison`);
      break;
    case "dual-mode":
      if (!row.dualMode) problems.push(`row ${row.id}: not a dual-mode requirement`);
      if (!row.pins.some(pin => pin.mode === "both")) {
        problems.push(`row ${row.id}: dual-mode needs a case that runs the same fixture under BOTH modes; single-mode cases never satisfy it`);
      }
      break;
    case "pinned":
      if (row.dualMode) problems.push(`row ${row.id}: a dual-mode requirement is never plain "pinned"`);
      if (row.pins.length === 0) problems.push(`row ${row.id}: pinned with no pin`);
      break;
  }
  for (const pin of row.pins) problems.push(...auditPin(row, pin, read));
  return problems;
}

/** Only a plain pinned row or a proven dual-mode row counts. Single-mode and unpinned rows never do. */
const satisfied = (row: Row): boolean => row.status === "pinned" || row.status === "dual-mode";

// ---------------------------------------------------------------------------
// The census against the repository.
// ---------------------------------------------------------------------------

describe("docs/05 Conformance census: the requirement text", () => {
  const doc = readFileSync(`${ROOT}${DOC_PATH}`, "utf8");
  const section = /^## Conformance\s*\n([\s\S]*?)(?=^## )/m.exec(doc)?.[1].trim() ?? "";

  it("still says exactly the three sentences this census binds", () => {
    expect(section).toBe(`${S1} ${S2} ${S3}`);
  });

  it("binds every row to a fragment of the sentence it claims", () => {
    const sentences = { 1: S1, 2: S2, 3: S3 } as const;
    for (const row of ROWS) {
      expect(sentences[row.sentence], `row ${row.id}`).toContain(row.requirement);
    }
  });

  it("holds eleven rows: five for sentence 1, one for sentence 2, five for sentence 3", () => {
    expect(ROWS).toHaveLength(11);
    expect(ROWS.filter(row => row.sentence === 1)).toHaveLength(5);
    expect(ROWS.filter(row => row.sentence === 2)).toHaveLength(1);
    expect(ROWS.filter(row => row.sentence === 3)).toHaveLength(5);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(11);
    // Sentence 1 is the dual-mode sentence; the other ten are not.
    expect(ROWS.filter(row => row.dualMode).map(row => row.sentence)).toEqual([1, 1, 1, 1, 1]);
  });
});

describe("docs/05 Conformance census: every row is bound to a live case", () => {
  for (const row of ROWS) {
    it(`${row.id} (${row.status}) is honest and every pin resolves by file, verbatim title and tier`, () => {
      expect(auditRow(row, readFromDisk)).toEqual([]);
    });
  }

  it("counts exactly the rows expected as satisfied, and never a single-mode or unpinned one", () => {
    expect(ROWS.filter(satisfied).map(row => row.id)).toEqual(SATISFIED);
    expect(ROWS.filter(row => !satisfied(row)).map(row => row.id)).toEqual(NOT_SATISFIED);
    expect(ROWS.filter(row => row.status === "unpinned")).toEqual([]);
  });

  it("states what the pollution row cannot prove and where the gap closes", () => {
    const row = ROWS.find(candidate => candidate.id === "S3-prototype-pollution");
    expect(row?.gap).toContain("wb-8i1");
  });
});

// ---------------------------------------------------------------------------
// Falsifiers: the census is only evidence if it goes red when a pin is lost.
// ---------------------------------------------------------------------------

describe("docs/05 Conformance census: falsifiers", () => {
  const FILE = "test/fixture-pinned.test.ts";
  const SOURCE = [
    'import { describe, expect, it } from "vitest";',
    'describe("suite", () => {',
    '  it("pinned case one", () => { expect(1).toBe(1); });',
    "  it(",
    '    "pinned case two",',
    "    () => { expect(2).toBe(2); },",
    "  );",
    "});",
    "",
  ].join("\n");
  const readers = (source: string | undefined): ReadSource => file => (file === FILE ? source : undefined);
  const row = (overrides: Partial<Row> & { pins?: readonly Pin[] } = {}): Row => ({
    id: "T-row",
    sentence: 3,
    requirement: "cycles",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [{ file: FILE, title: "pinned case one", tier: "fixture pass", mode: "neutral" }],
    ...overrides,
  });

  it("accepts a live case, including one whose call spans several lines", () => {
    expect(auditRow(row(), readers(SOURCE))).toEqual([]);
    const pins: readonly Pin[] = [{ file: FILE, title: "pinned case two", tier: "fixture pass", mode: "neutral" }];
    expect(auditRow(row({ pins }), readers(SOURCE))).toEqual([]);
  });

  it("goes red naming the row when a pinned case is renamed", () => {
    const problems = auditRow(row(), readers(SOURCE.replace("pinned case one", "pinned case 1")));
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("row T-row");
    expect(problems[0]).toContain("no live case with this verbatim title");
  });

  it("goes red when a pinned case is deleted or its file is gone", () => {
    expect(auditRow(row(), readers(SOURCE.replace(/ {2}it\("pinned case one".*\n/, "")))).toEqual([
      expect.stringContaining("no live case with this verbatim title"),
    ]);
    expect(auditRow(row(), readers(undefined))).toEqual([expect.stringContaining("pinned file is missing")]);
  });

  it("goes red when a pinned case is commented out", () => {
    const problems = auditRow(row(), readers(SOURCE.replace('  it("pinned case one"', '  // it("pinned case one"')));
    expect(problems).toEqual([expect.stringContaining("no live case with this verbatim title")]);
  });

  it.each([".skip", ".todo", ".skipIf(true)", ".runIf(false)", ".fails"])("goes red when a pinned case gains the %s modifier", modifier => {
    const problems = auditRow(row(), readers(SOURCE.replace('it("pinned case one"', `it${modifier}("pinned case one"`)));
    expect(problems.length).toBeGreaterThan(0);
    expect(problems.join("\n")).toContain("row T-row");
  });

  it("stays green when an unrelated sibling case is skipped, because the pin still runs", () => {
    expect(auditRow(row(), readers(SOURCE.replace("  it(\n", "  it.skip(\n")))).toEqual([]);
  });

  it.each(["describe.skip", "describe.todo", "describe.runIf(false)", "describe.skipIf(true)", "xdescribe"])(
    "goes red when the pinned case sits inside %s",
    wrapper => {
      const problems = auditRow(row(), readers(SOURCE.replace('describe("suite"', `${wrapper}("suite"`)));
      expect(problems).toEqual([expect.stringContaining("inside a disabled or conditional block")]);
    },
  );

  it("treats an unbalanced wrapper block as enclosing the pin", () => {
    const broken = SOURCE.replace('describe("suite", () => {', 'describe.skip("suite", () => {  const open = "{";').replace(/\n\}\);\n$/, "\n");
    expect(auditRow(row(), readers(broken))).toEqual([expect.stringContaining("inside a disabled or conditional block")]);
  });

  it("goes red when .only elsewhere in the file keeps the pinned case from running", () => {
    expect(auditRow(row(), readers(`${SOURCE}it.only("other", () => {});\n`))).toEqual([expect.stringContaining(".only modifier")]);
  });

  it("goes red when the title is declared twice, so the pin would be ambiguous", () => {
    const problems = auditRow(row(), readers(`${SOURCE}it("pinned case one", () => {});\n`));
    expect(problems).toEqual([expect.stringContaining("declared 2 times")]);
  });

  it("goes red when a tier is outside the docs/14 vocabulary", () => {
    const pins = [{ file: FILE, title: "pinned case one", tier: "passes" as unknown as Tier, mode: "neutral" as const }];
    expect(auditRow(row({ pins }), readers(SOURCE))).toEqual([expect.stringContaining("not a docs/14 truth label")]);
  });

  it("goes red when an anchor line a generated title depends on disappears", () => {
    const pins: readonly Pin[] = [
      { file: FILE, title: "pinned case one", tier: "fixture pass", mode: "neutral", anchors: ['["a cycle", "x"]'] },
    ];
    expect(auditRow(row({ pins }), readers(SOURCE))).toEqual([expect.stringContaining("no longer appears in the file")]);
    expect(auditRow(row({ pins }), readers(`${SOURCE}// ["a cycle", "x"]\n`))).toEqual([]);
  });

  it("goes red when a row's declared mode coverage drifts from its pins", () => {
    expect(auditRow(row({ covers: ["claude"] }), readers(SOURCE))).toEqual([expect.stringContaining("declares covers")]);
  });

  describe("dual-mode rows are never satisfied by a single-mode case", () => {
    const dual = (overrides: Partial<Row>): Row =>
      row({ id: "T-dual", sentence: 1, requirement: "cancellation", dualMode: true, status: "single-mode", unmet: "the same fixture compared under both modes", ...overrides });

    it("accepts a single-mode record that writes the missing comparison, and does not count it satisfied", () => {
      const recorded = dual({});
      expect(auditRow(recorded, readers(SOURCE))).toEqual([]);
      expect(satisfied(recorded)).toBe(false);
    });

    it("refuses a dual-mode claim backed only by pi, claude or neutral cases", () => {
      for (const mode of ["pi", "claude", "neutral"] as const) {
        const pins: readonly Pin[] = [{ file: FILE, title: "pinned case one", tier: "fixture pass", mode }];
        const problems = auditRow(dual({ status: "dual-mode", covers: [mode], pins }), readers(SOURCE));
        expect(problems).toEqual([expect.stringContaining("BOTH modes")]);
      }
    });

    it("refuses two single-mode cases, one per mode, as a dual-mode proof", () => {
      const pins: readonly Pin[] = [
        { file: FILE, title: "pinned case one", tier: "fixture pass", mode: "pi" },
        { file: FILE, title: "pinned case two", tier: "fixture pass", mode: "claude" },
      ];
      const problems = auditRow(dual({ status: "dual-mode", covers: ["claude", "pi"], pins }), readers(SOURCE));
      expect(problems).toEqual([expect.stringContaining("BOTH modes")]);
    });

    it("accepts a dual-mode claim only with a case that runs both, and then counts it satisfied", () => {
      const pins: readonly Pin[] = [{ file: FILE, title: "pinned case one", tier: "fixture pass", mode: "both" }];
      const promoted = dual({ status: "dual-mode", covers: ["both"], pins, unmet: undefined });
      expect(auditRow(promoted, readers(SOURCE))).toEqual([]);
      expect(satisfied(promoted)).toBe(true);
    });

    it("refuses to leave a row single-mode once a both-modes case is pinned", () => {
      const pins: readonly Pin[] = [{ file: FILE, title: "pinned case one", tier: "fixture pass", mode: "both" }];
      expect(auditRow(dual({ covers: ["both"], pins }), readers(SOURCE))).toEqual([expect.stringContaining("must be promoted")]);
    });

    it("refuses a single-mode record that omits the missing comparison", () => {
      expect(auditRow(dual({ unmet: "" }), readers(SOURCE))).toEqual([expect.stringContaining("must write the missing comparison")]);
    });

    it("refuses a plain pinned status on a dual-mode requirement", () => {
      expect(auditRow(dual({ status: "pinned" }), readers(SOURCE))).toEqual([expect.stringContaining('never plain "pinned"')]);
    });
  });

  describe("unpinned rows are reasoned and never pass", () => {
    const unpinned = (overrides: Partial<Row>): Row => row({ status: "unpinned", pins: [], covers: [], ...overrides });

    it("accepts a reasoned no-case row and does not count it satisfied", () => {
      const missing = unpinned({ reason: "No case on this base exercises this requirement; it is filed for a later bead." });
      expect(auditRow(missing, readers(SOURCE))).toEqual([]);
      expect(satisfied(missing)).toBe(false);
    });

    it("refuses an unpinned row with no reason, and one that also lists pins", () => {
      expect(auditRow(unpinned({}), readers(SOURCE))).toEqual([expect.stringContaining("needs a written reason")]);
      const withPin = unpinned({
        reason: "A reason long enough to be a reason.",
        pins: [{ file: FILE, title: "pinned case one", tier: "fixture pass", mode: "neutral" }],
        covers: ["neutral"],
      });
      expect(auditRow(withPin, readers(SOURCE))).toEqual([expect.stringContaining("yet lists 1 pin")]);
    });
  });
});
