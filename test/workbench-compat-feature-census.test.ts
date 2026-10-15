/**
 * wb-cax.27 (W22): docs/workbench/16 "Compatibility feature control" census.
 *
 * Binds the six bullets of that section (quoted verbatim below and re-read from
 * the doc on every run) to EXISTING cases by file, verbatim it/describe title
 * and docs/14 truth label. The census never executes a pinned case and never
 * imports another test file: it reads each file's text and looks for the title
 * in a LIVE call position. A rename, a deletion, a .skip / .todo / .skipIf /
 * .fails / .only / .runIf modifier, or a commented-out case turns the row red
 * and names it. A row with no case is UNPINNED with a written reason and never
 * passes as pinned. B6 (both modes) is never satisfied by a single-mode case:
 * a row whose cases cover only one mode is recorded single-mode with the
 * missing mode written.
 *
 * Pin-flip oracles (in flight, never widened here): wb-cax.11 (B4 precedence
 * parity across modes), wb-cax.7 (B6 dual-backend golden), wb-a2g.11 (B2
 * degradation). When one lands, its row flips from unpinned / single-mode to a
 * pinned dual-mode row in the same commit.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TESTS = join(ROOT, "test");

/** The docs/14 "Truth labels and release gates" vocabulary. */
const TRUTH_LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"] as const;
type TruthLabel = (typeof TRUTH_LABELS)[number];

type Mode = "pi" | "claude" | "both";
type CallKind = "it" | "describe";

interface PinnedCase {
  readonly file: string;
  readonly kind: CallKind;
  readonly title: string;
  readonly mode: Mode;
}

interface Row {
  readonly id: string;
  readonly bullet: number;
  readonly claim: string;
  /** Present on a pinned row. */
  readonly label?: TruthLabel;
  readonly cases: readonly PinnedCase[];
  /** Present on an unpinned row: why no case binds it. */
  readonly unpinned?: string;
  /** Present on a single-mode row: the mode its cases do not cover. */
  readonly missingMode?: string;
}

const BULLETS: readonly string[] = [
  'Explicit backend configuration: workflowAgentBackend = "claude" for Workbench mode; existing upstream default behavior preserved until migration is validated.',
  "Never silently choose Pi backend after Claude SDK failure. If a legacy Pi path remains enabled, it must be explicitly selected/labeled.",
  "Maintain existing Workflow/SubagentWorkflow collision detection and dialog/menu semantics.",
  "Preserve original config migration and saved-workflow file precedence.",
  'Ensure older journal format remains readable when supported, but does not become unsafe reuse for effectful calls; compatibility may require explicit "journal unsupported" warnings.',
  "Tests must run in both upstream/Pi and new/Claude workbench modes until a documented deprecation is approved.",
];

const ROWS: readonly Row[] = [
  {
    id: "B1.1",
    bullet: 1,
    claim: 'workflowAgentBackend = "claude" is an explicit selection, validated, never implied',
    label: "fixture pass",
    cases: [
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L4: Workbench backend is explicit and invalid config is rejected, not silently Pi", mode: "claude" },
      { file: "workbench-pi-client.test.ts", kind: "it", title: "L2: an explicitly selected Claude backend launches a script through the registered Pi tool", mode: "claude" },
    ],
  },
  {
    id: "B1.2",
    bullet: 1,
    claim: "existing upstream default preserved: no Workbench tool registers without the claude backend, standard tools still do",
    label: "fixture pass",
    cases: [
      { file: "workbench-boot-isolation.test.ts", kind: "it", title: "activates and registers its standard tools without touching a native SDK", mode: "pi" },
      { file: "workbench-pi-reconcile.test.ts", kind: "it", title: "registers only under the claude backend", mode: "pi" },
    ],
  },
  {
    id: "B2.1",
    bullet: 2,
    claim: "a Claude SDK failure or shutdown never falls back to the Pi manager spawn path",
    label: "fixture pass",
    cases: [
      { file: "workbench-pi-streaming.test.ts", kind: "it", title: "preserves native %s failure and never falls back to manager", mode: "claude" },
      { file: "workbench-pi-streaming.test.ts", kind: "it", title: "session shutdown requests owned SDK abort and records cancellation, never Pi workflow spawn", mode: "claude" },
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported", mode: "claude" },
    ],
  },
  {
    id: "B2.2",
    bullet: 2,
    claim: "a legacy Pi path that stays enabled is explicitly selected and labeled",
    cases: [],
    unpinned:
      "no case asserts that a legacy Pi path enabled alongside the Claude backend is labeled; the explicit-selection half is B1.1 and the degradation conformance bead wb-a2g.11 is in flight, so this row stays unpinned until its landing notice",
  },
  {
    id: "B3.1",
    bullet: 3,
    claim: "Workflow/SubagentWorkflow collision detection with another extension is preserved",
    label: "fixture pass",
    cases: [
      { file: "workflow-tool.test.ts", kind: "describe", title: "collisions with another extension", mode: "pi" },
      { file: "workflow-tool.test.ts", kind: "it", title: "warns when another extension already owns the tool name", mode: "pi" },
    ],
  },
  {
    id: "B3.2",
    bullet: 3,
    claim: "dialog and agents-menu semantics are preserved",
    label: "fixture pass",
    cases: [
      { file: "workflow-command.test.ts", kind: "it", title: "offers the entry in the agents menu", mode: "pi" },
      { file: "workflow-command.test.ts", kind: "it", title: "hides the entry when workflows are off", mode: "pi" },
      { file: "workflow-dialog.test.ts", kind: "describe", title: "keys", mode: "pi" },
    ],
  },
  {
    id: "B4.1",
    bullet: 4,
    claim: "original config migration is preserved",
    cases: [],
    unpinned:
      "no case in test/ exercises a settings migration path (the word migrat appears in no settings or workflow case title or body); a migration claim would be invented, so the row stays unpinned",
  },
  {
    id: "B4.2",
    bullet: 4,
    claim: "saved-workflow file precedence is preserved (project over user directory, saved name precedence)",
    label: "fixture pass",
    cases: [
      { file: "workflow-tool.test.ts", kind: "it", title: "falls back to the user's agent dir, and lets the project shadow it", mode: "pi" },
      { file: "workbench-designer.test.ts", kind: "it", title: "catalogs saved precedence and byte-exact source with digest/cursor", mode: "claude" },
      { file: "workbench-designer.test.ts", kind: "it", title: "refuses outside project script paths while supporting saved name precedence", mode: "claude" },
    ],
  },
  {
    id: "B5.1",
    bullet: 5,
    claim: "an older journal format stays readable when supported",
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "classifies pre-basis agent entries readable legacy-agent, with the live-rerun-on-resume note", mode: "pi" },
      { file: "workflow-journal-compat.test.ts", kind: "describe", title: "AC4: the byte-identical pre-basis journal stays fully supported", mode: "pi" },
    ],
  },
  {
    id: "B5.2",
    bullet: 5,
    claim: "an older journal never becomes unsafe reuse for an effectful call",
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "refuses a recorded non-read node with the typed uncertain-effect reason, whatever its outcome or basis", mode: "pi" },
      { file: "workflow-effect-replay.test.ts", kind: "it", title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect", mode: "pi" },
    ],
  },
  {
    id: "B5.3",
    bullet: 5,
    claim: 'unreadable or foreign journal lines carry an explicit "journal unsupported" warning',
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "names each skipped line with its line number and reason, and carries the explicit warning", mode: "pi" },
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "warns journal unsupported for another schema version, while still reporting what the reader does with the line", mode: "pi" },
    ],
  },
  {
    id: "B6.1",
    bullet: 6,
    claim: "tests run in both upstream/Pi and new/Claude workbench modes",
    label: "fixture pass",
    cases: [
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported", mode: "claude" },
      { file: "workbench-local-detached-effects.test.ts", kind: "it", title: "refuses nested workflow resolution on both backends", mode: "claude" },
    ],
    missingMode:
      "upstream/Pi: no case runs the same assertions under the upstream Pi spawn path (the detached 'both backends' case spans deterministic and claude, not upstream Pi); wb-cax.7 dual-backend golden equivalence is the pin-flip oracle",
  },
];

interface CallMatch {
  readonly kind: string;
  readonly modifiers: string;
  readonly title: string;
}

/** Whole-line comments only: a block-comment regex would eat code after a "/*" inside a string. */
function stripCommentLines(source: string): string {
  return source
    .split("\n")
    .map(line => (/^\s*(\/\/|\/\*|\*)/.test(line) ? "" : line))
    .join("\n");
}

const CALL = /\b(it|test|describe)((?:\.[A-Za-z]+)*)\s*(?:\([^()]*\))?\s*\(\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/g;

function scanCalls(source: string): CallMatch[] {
  const matches: CallMatch[] = [];
  for (const m of stripCommentLines(source).matchAll(CALL)) {
    matches.push({ kind: m[1], modifiers: m[2], title: m[4] });
  }
  return matches;
}

/** A case is live only as a plain call or a plain .each; every other modifier removes or conditions it. */
const LIVE_MODIFIERS = new Set(["", ".each"]);

type Verdict = { ok: true } | { ok: false; reason: string };

function judgeCase(source: string, c: Pick<PinnedCase, "kind" | "title">): Verdict {
  const same = scanCalls(source).filter(m => m.kind === c.kind && m.title === c.title);
  if (same.length === 0) return { ok: false, reason: `no ${c.kind}(...) with title ${JSON.stringify(c.title)} (renamed, deleted or commented out)` };
  if (!same.some(m => LIVE_MODIFIERS.has(m.modifiers))) {
    return { ok: false, reason: `${c.kind}${same[0].modifiers}(...) with title ${JSON.stringify(c.title)} is not a live case` };
  }
  return { ok: true };
}

function modeStatus(row: Row): "unpinned" | "single-mode" | "dual-mode" {
  if (row.cases.length === 0) return "unpinned";
  // Only a case that itself runs under BOTH modes proves dual-mode. Different cases
  // for different modes are not the same assertions, so mixing them stays single-mode.
  return row.cases.some(c => c.mode === "both") ? "dual-mode" : "single-mode";
}

function readTest(file: string): string {
  return readFileSync(join(TESTS, file), "utf8");
}

function docSection(path: string, heading: string): string {
  const text = readFileSync(join(ROOT, path), "utf8");
  const start = text.indexOf(`\n## ${heading}\n`);
  if (start < 0) throw new Error(`${path}: section "${heading}" is missing`);
  const rest = text.slice(start + 1);
  const next = rest.indexOf("\n## ", 4);
  return next < 0 ? rest : rest.slice(0, next);
}

const squash = (s: string): string => s.replace(/\s+/g, " ").trim();

describe("docs/16 Compatibility feature control: the bullets this census binds", () => {
  const section = squash(docSection("docs/workbench/16-repository-refactor.md", "Compatibility feature control"));

  it.each(BULLETS.map((b, i) => [i + 1, b] as const))("bullet %i is quoted verbatim in the doc", (_n, bullet) => {
    expect(section).toContain(squash(`- ${bullet}`));
  });

  it("the doc section has exactly six bullets, so a seventh cannot go unbound", () => {
    const raw = docSection("docs/workbench/16-repository-refactor.md", "Compatibility feature control");
    expect(raw.split("\n").filter(line => line.startsWith("- "))).toHaveLength(BULLETS.length);
  });

  it("docs/14 still defines every truth label this census uses", () => {
    const labels = squash(docSection("docs/workbench/14-qa-and-benchmarks.md", "Truth labels and release gates"));
    for (const label of TRUTH_LABELS) expect(labels).toContain(`"${label}"`);
  });
});

describe("census table shape", () => {
  it("has twelve rows and ids unique, each bound to a real bullet 1..6", () => {
    expect(ROWS).toHaveLength(12);
    expect(new Set(ROWS.map(r => r.id)).size).toBe(ROWS.length);
    for (const row of ROWS) expect(row.bullet >= 1 && row.bullet <= BULLETS.length, `${row.id}: bullet out of range`).toBe(true);
    const perBullet = [1, 2, 3, 4, 5, 6].map(b => ROWS.filter(r => r.bullet === b).length);
    expect(perBullet).toEqual([2, 2, 2, 2, 3, 1]);
  });

  it("a pinned row names a docs/14 truth label and an unpinned row names none and carries a reason", () => {
    for (const row of ROWS) {
      if (row.cases.length > 0) {
        expect(row.label, `${row.id}: pinned row needs a truth label`).toBeDefined();
        expect(TRUTH_LABELS as readonly string[], `${row.id}: unknown truth label`).toContain(row.label);
        expect(row.unpinned, `${row.id}: pinned row must not also be unpinned`).toBeUndefined();
      } else {
        expect(row.label, `${row.id}: an unpinned row claims no label`).toBeUndefined();
        expect((row.unpinned ?? "").length, `${row.id}: unpinned row needs a written reason`).toBeGreaterThan(40);
      }
    }
  });

  it("pinned titles carry no backslash (titles are compared as raw source text)", () => {
    for (const row of ROWS) for (const c of row.cases) expect(c.title, `${row.id}`).not.toContain("\\");
  });
});

describe("every pinned case is a live case in its file", () => {
  for (const row of ROWS) {
    for (const c of row.cases) {
      it(`${row.id}: ${c.file} ${c.kind} ${JSON.stringify(c.title)}`, () => {
        const verdict = judgeCase(readTest(c.file), c);
        expect(verdict.ok, `row ${row.id} (bullet ${row.bullet}) lost its pin: ${verdict.ok ? "" : verdict.reason}`).toBe(true);
      });
    }
  }
});

describe("unpinned and single-mode rows stay honest", () => {
  it("an unpinned row never counts as pinned: it has no case at all", () => {
    for (const row of ROWS.filter(r => r.unpinned !== undefined)) expect(row.cases, row.id).toHaveLength(0);
    expect(ROWS.filter(r => modeStatus(r) === "unpinned").map(r => r.id)).toEqual(["B2.2", "B4.1"]);
  });

  it("B6.1 is single-mode with the missing mode written, never presented as the dual-mode proof", () => {
    const b6 = ROWS.find(r => r.id === "B6.1");
    expect(b6).toBeDefined();
    expect(modeStatus(b6!)).toBe("single-mode");
    expect(b6!.missingMode ?? "", "B6.1 must name the mode its cases do not cover").toMatch(/upstream\/Pi/);
    expect(ROWS.filter(r => modeStatus(r) === "dual-mode").map(r => r.id), "no row is dual-mode until wb-cax.7 lands").toEqual([]);
  });

  it("a row that declares a missing mode is single-mode, and a single-mode B6 row must declare one", () => {
    for (const row of ROWS) {
      if (row.missingMode !== undefined) expect(modeStatus(row), row.id).toBe("single-mode");
    }
    for (const row of ROWS.filter(r => r.bullet === 6)) {
      if (modeStatus(row) === "single-mode") expect(row.missingMode, row.id).toBeDefined();
    }
  });
});

describe("scanner falsifiers: the census would go red on each way a pin can be lost", () => {
  const source = [
    'describe("suite", () => {',
    '  it("alive", () => {});',
    '  it.each([1, 2])("each %i", () => {});',
    '  it.skip("skipped", () => {});',
    '  it.todo("todo");',
    '  it.skipIf(false)("conditional", () => {});',
    '  it.fails("inverted", () => {});',
    '  it.only("only", () => {});',
    '  // it("commented", () => {});',
    '  /* it("blocked", () => {}); */',
    "  it('single quoted', () => {});",
    '  it("has `backticks` inside", () => {});',
    "});",
  ].join("\n");

  it("accepts a plain case, a plain .each, either quote form and a title with backticks", () => {
    for (const title of ["alive", "each %i", "single quoted", "has `backticks` inside"]) {
      expect(judgeCase(source, { kind: "it", title }), title).toEqual({ ok: true });
    }
    expect(judgeCase(source, { kind: "describe", title: "suite" })).toEqual({ ok: true });
  });

  it.each(["skipped", "todo", "conditional", "inverted", "only"])("refuses %s as a pin", title => {
    const verdict = judgeCase(source, { kind: "it", title });
    expect(verdict.ok).toBe(false);
  });

  it("refuses a renamed, deleted, wrong-kind or commented-out case", () => {
    expect(judgeCase(source, { kind: "it", title: "alive renamed" }).ok).toBe(false);
    expect(judgeCase(source, { kind: "it", title: "missing" }).ok).toBe(false);
    expect(judgeCase(source, { kind: "describe", title: "alive" }).ok).toBe(false);
    expect(judgeCase(source, { kind: "it", title: "commented" }).ok).toBe(false);
    expect(judgeCase(source, { kind: "it", title: "blocked" }).ok).toBe(false);
  });

  it("names the lost pin in the reason, so a red row is attributable", () => {
    const verdict = judgeCase(source, { kind: "it", title: "skipped" });
    expect(verdict).toMatchObject({ ok: false });
    expect(verdict.ok ? "" : verdict.reason).toContain("skipped");
  });
});
