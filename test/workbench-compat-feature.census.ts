/**
 * wb-cax.27 (W22): census falsifier for docs/workbench/16-repository-refactor.md "Compatibility feature control", a census
 * leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is
 * one of the sequenced census class (post-u62, post-nl8 adoption cut, report mode only; EXECUTING MODE is never used here).
 *
 * The section states six bullets. This leg binds them as twelve rows (B1.1 B1.2 B2.1 B2.2 B3.1 B3.2 B4.1 B4.2 B5.1 B5.2 B5.3
 * B6.1) to existing cases by file, verbatim title and docs/14 truth label, or records a row as unpinned with a reason. It
 * executes no pinned case and no test run: judge() from the shared helper test/helpers/census.ts reads vitest's own JSON
 * report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a
 * pinned case counts only when the gate's own run collected it exactly once (under its bound describe path where the pin
 * binds one), recorded it passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted,
 * duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore reads red, naming the row, the file,
 * the title and the cause, as far as the helper's resolvable-construct roster and its named residuals reach
 * (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls itself: every title is
 * located by the helper, from vitest's report, never from bare text.
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: the section, under its unique
 * level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, must render as exactly
 * the six frozen bullets and no HTML. A dropped or reworded clause names its row. The docs drift falsifiers run over a
 * SYNTHETIC document built from the frozen bullets, never over the live docs/16 text. The docs/14 truth-label paragraph is
 * pinned the same way, as an exact paragraph of its unique section.
 *
 * Tiers: every row is a "fixture pass" in the default gate (docs/14 vocabulary); no row claims a live SDK pass, and no
 * pin here belongs to a live or native tier. A relabelled pin (any tier but the default gate's) is refused by the default
 * report (tier-mismatch), so the leg never carries a live or native pass from a title's presence.
 *
 * MODE TRUTH: each pin declares the backend mode its case configures (claude, dual or unconfigured) with a written basis.
 * The judge cannot read backend configuration from a report, so a declared mode is a RECORDED READING, never a verified one
 * (NAMED RESIDUAL MODE-READING). The dual-mode row B6.1 is nevertheless never satisfied by a single-mode or unconfigured
 * case: it needs a pin declared dual whose title or enclosing describe path itself names both modes, and that verdict is
 * computed below, not hard-coded.
 *
 * FROZEN SHAPE (owner standing order 2026-10-18, rule 16): the table's own row and pin shape is pinned as literals in this
 * file (ROW_SHAPE, CLAIM_LITERALS, PIN_LITERALS), so deleting a pin, shortening a requirement label or swapping a pin for an
 * unrelated passing case reds the census; the hollowing mutants that prove it are listed with the delivery.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Mode = "claude" | "pi" | "dual" | "unconfigured";
interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
  /** it.each / it.for template pin: the call site must register at least one case per table row. */
  readonly each?: boolean;
  readonly mode: Mode;
  /** Why the mode is declared; a RECORDED READING of the case, not something the report proves. */
  readonly basis: string;
}
interface Row {
  readonly id: string;
  readonly bullet: number;
  /** The clause of the docs bullet the row binds, verbatim in its rendered text. */
  readonly quote: string;
  readonly claim: string;
  readonly label: "fixture pass";
  readonly pins: readonly Pin[];
  /**
   * Cases that name the clause but that the shared judge cannot resolve (NAMED RESIDUAL JUDGE-UNRESOLVED). They are never
   * counted as pins; the census asserts the judge's exact refusal for each, so the day the helper resolves them the
   * assertion reds and the seat flips the candidate to a pin on purpose.
   */
  readonly candidates?: readonly Pin[];
  /** Present on an unpinned row: why no landed case binds it; an unpinned row is never counted as covered. */
  readonly reason?: string;
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-compat-feature.census.ts";
const DOCS_FILE = "docs/workbench/16-repository-refactor.md";
const DOCS_PARENT = "16 — Fork implementation refactor map and upstream compatibility";
const SECTION = "Compatibility feature control";
const DOCS14_FILE = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS14_PARENT = "14 — Test strategy, conformance suite, benchmark and adversarial controls";
const DOCS14_SECTION = "Truth labels and release gates";

/** The six frozen docs/16 bullets, exactly as the rendered section says them. */
const BULLETS: readonly string[] = [
  'Explicit backend configuration: workflowAgentBackend = "claude" for Workbench mode; existing upstream default behavior preserved until migration is validated.',
  "Never silently choose Pi backend after Claude SDK failure. If a legacy Pi path remains enabled, it must be explicitly selected/labeled.",
  "Maintain existing Workflow/SubagentWorkflow collision detection and dialog/menu semantics.",
  "Preserve original config migration and saved-workflow file precedence.",
  'Ensure older journal format remains readable when supported, but does not become unsafe reuse for effectful calls; compatibility may require explicit "journal unsupported" warnings.',
  "Tests must run in both upstream/Pi and new/Claude workbench modes until a documented deprecation is approved.",
];
/** The docs/14 paragraph that defines the truth labels every row names. */
const TRUTH_PARAGRAPH =
  'Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.';

const T = (name: string): string => `test/${name}.test.ts`;
const pin = (name: string, title: string, mode: Mode, basis: string, extra: { suite?: readonly string[]; each?: boolean } = {}): Pin => ({ file: T(name), title, mode, basis, ...extra });

const SAVED_SUITE = (mode: string): string => `saved-workflow precedence and config parity — mode '${mode}'`;
const CLAUDE = "the case builds the Claude host or sets workflowAgentBackend claude";
const NONE = "the case sets no backend: it proves neither mode alone";
const BOTH = "the case runs the same assertion under both backends";

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
function freezeDeep<V>(value: V): V {
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
    id: "B1.1",
    bullet: 1,
    quote: 'workflowAgentBackend = "claude" for Workbench mode',
    claim: 'workflowAgentBackend = "claude" is an explicit selection, validated, never implied',
    label: "fixture pass",
    pins: [
      pin("workbench-host-contract", "L4: Workbench backend is explicit and invalid config is rejected, not silently Pi", "claude", CLAUDE),
      pin("workbench-pi-client", "L2: an explicitly selected Claude backend launches a script through the registered Pi tool", "claude", CLAUDE),
    ],
  },
  {
    id: "B1.2",
    bullet: 1,
    quote: "existing upstream default behavior preserved until migration is validated",
    claim: "existing upstream default preserved: no Workbench tool registers without the claude backend, standard tools still do",
    label: "fixture pass",
    pins: [
      pin("workbench-boot-isolation", "activates and registers its standard tools without touching a native SDK", "unconfigured", NONE),
      pin("workbench-pi-reconcile", "registers only under the claude backend", "dual", "asserts the Workbench tool is absent under the pi backend and present under claude"),
    ],
  },
  {
    id: "B2.1",
    bullet: 2,
    quote: "Never silently choose Pi backend after Claude SDK failure.",
    claim: "a Claude SDK failure or shutdown never falls back to the Pi manager spawn path",
    label: "fixture pass",
    pins: [
      pin("workbench-pi-streaming", "preserves native %s failure and never falls back to manager", "claude", CLAUDE, { each: true }),
      pin("workbench-pi-streaming", "session shutdown requests owned SDK abort and records cancellation, never Pi workflow spawn", "claude", CLAUDE),
      pin("workbench-host-contract", "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported", "claude", CLAUDE),
    ],
  },
  {
    id: "B2.2",
    bullet: 2,
    quote: "If a legacy Pi path remains enabled, it must be explicitly selected/labeled.",
    claim: "a legacy Pi path that stays enabled is explicitly selected and labeled",
    label: "fixture pass",
    pins: [],
    reason:
      "no landed case asserts that a legacy Pi path enabled alongside the Claude backend is labeled: the explicit-selection half is B1.1, and wb-a2g.11 (landed, closed) pins the isolation and gate refusals of the Claude host, not a label on a legacy Pi path; the row stays unpinned until a case labels that path",
  },
  {
    id: "B3.1",
    bullet: 3,
    quote: "Maintain existing Workflow/SubagentWorkflow collision detection",
    claim: "Workflow/SubagentWorkflow collision detection with another extension is preserved",
    label: "fixture pass",
    pins: [
      pin("workflow-tool", "warns when another extension already owns the tool name", "unconfigured", NONE, { suite: ["collisions with another extension"] }),
      pin("workflow-tool", "withdraws its tool when another extension provides a `Workflow` tool", "unconfigured", NONE, { suite: ["collisions with another extension"] }),
    ],
  },
  {
    id: "B3.2",
    bullet: 3,
    quote: "dialog/menu semantics",
    claim: "dialog and agents-menu semantics are preserved",
    label: "fixture pass",
    pins: [
      pin("workflow-command", "offers the entry in the agents menu", "unconfigured", NONE),
      pin("workflow-command", "hides the entry when workflows are off", "unconfigured", NONE),
      pin("workflow-dialog", "moves the phase selection with j/k and clamps at both ends", "unconfigured", NONE, { suite: ["keys"] }),
    ],
  },
  {
    id: "B4.1",
    bullet: 4,
    quote: "Preserve original config migration",
    claim: "original config handling is preserved: a legacy settings file loads without being rewritten and still selects upstream behavior",
    label: "fixture pass",
    pins: [
      pin("workbench-saved-precedence", "loads the settings file without rewriting it, and a legacy file selects upstream behavior", "unconfigured", "mode 'legacy': no workbench config at all, the upstream default", { suite: [SAVED_SUITE("legacy")] }),
      pin("workbench-saved-precedence", "loads the settings file without rewriting it, and a legacy file selects upstream behavior", "pi", "mode 'pi': workflowAgentBackend pi", { suite: [SAVED_SUITE("pi")] }),
      pin("workbench-saved-precedence", "loads the settings file without rewriting it, and a legacy file selects upstream behavior", "claude", "mode 'claude': workflowAgentBackend claude", { suite: [SAVED_SUITE("claude")] }),
    ],
  },
  {
    id: "B4.2",
    bullet: 4,
    quote: "saved-workflow file precedence",
    claim: "saved-workflow file precedence is preserved (project over user directory, saved name precedence)",
    label: "fixture pass",
    pins: [
      pin("workbench-saved-precedence", "picks the identical file in all three modes for the same tree", "dual", "the title itself names all three modes"),
      pin("workflow-tool", "falls back to the user's agent dir, and lets the project shadow it", "unconfigured", NONE),
    ],
  },
  {
    id: "B5.1",
    bullet: 5,
    quote: "Ensure older journal format remains readable when supported",
    claim: "an older journal format stays readable when supported",
    label: "fixture pass",
    pins: [],
    candidates: [
      pin("workflow-journal-compat", "classifies pre-basis agent entries readable legacy-agent, with the live-rerun-on-resume note", "unconfigured", NONE),
      pin("workflow-journal-compat", "classifies fully readable, with zero unsupported findings and no warnings", "unconfigured", NONE, { suite: ["AC4: the byte-identical pre-basis journal stays fully supported"] }),
    ],
    reason:
      "the cases that state it (test/workflow-journal-compat.test.ts, the pre-basis journal reader) cannot be judged: the shared judge fails closed on that file (context-unknown: its module-level CASES table reads a property named expect, which the judge takes for an assertion handle used as a binary expression), and this cut edits neither the helper nor the pinned file; the row is unpinned and the two candidates are held to that exact refusal",
  },
  {
    id: "B5.2",
    bullet: 5,
    quote: "does not become unsafe reuse for effectful calls",
    claim: "an older journal never becomes unsafe reuse for an effectful call",
    label: "fixture pass",
    pins: [
      pin("workflow-effect-replay", "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect", "unconfigured", NONE),
      pin("workflow-examples-claude-backend", "a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing", "dual", BOTH, { suite: ["dual-backend golden equivalence (fixture pass, not live SDK)", "declared effect classes: the W12 tripwire is exercised identically on both backends"] }),
    ],
    candidates: [pin("workflow-journal-compat", "refuses a recorded non-read node with the typed uncertain-effect reason, whatever its outcome or basis", "unconfigured", NONE)],
  },
  {
    id: "B5.3",
    bullet: 5,
    quote: 'compatibility may require explicit "journal unsupported" warnings',
    claim: 'unreadable or foreign journal lines carry an explicit "journal unsupported" warning',
    label: "fixture pass",
    pins: [],
    candidates: [
      pin("workflow-journal-compat", "names each skipped line with its line number and reason, and carries the explicit warning", "unconfigured", NONE),
      pin("workflow-journal-compat", "warns journal unsupported for another schema version, while still reporting what the reader does with the line", "unconfigured", NONE),
    ],
    reason:
      "the cases that state it (test/workflow-journal-compat.test.ts, the journal-unsupported verdict and warning) cannot be judged: the shared judge fails closed on that file (context-unknown on its module-level CASES table, which reads a property named expect), and this cut edits neither the helper nor the pinned file; the row is unpinned and the two candidates are held to that exact refusal",
  },
  {
    id: "B6.1",
    bullet: 6,
    quote: "Tests must run in both upstream/Pi and new/Claude workbench modes until a documented deprecation is approved.",
    claim: "tests run in both upstream/Pi and new/Claude workbench modes",
    label: "fixture pass",
    pins: [
      pin("workflow-examples-claude-backend", "a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing", "dual", BOTH, { suite: ["dual-backend golden equivalence (fixture pass, not live SDK)", "declared effect classes: the W12 tripwire is exercised identically on both backends"] }),
      pin("workflow-examples-claude-backend", "exhausting the agent budget fails the run with the same class under both backends", "dual", BOTH, { suite: ["dual-backend golden equivalence (fixture pass, not live SDK)", "schema, budget and option behaviour"] }),
      pin("workbench-saved-precedence", "picks the identical file in all three modes for the same tree", "dual", "the title itself names all three modes"),
    ],
  },
]);

/** FROZEN SHAPE (rule 16): the row ids with their pin counts, as the TABLE stood at the cut's base. */
const ROW_SHAPE: readonly string[] = ["B1.1:2", "B1.2:2", "B2.1:3", "B2.2:0", "B3.1:2", "B3.2:3", "B4.1:3", "B4.2:2", "B5.1:0", "B5.2:2", "B5.3:0", "B6.1:3"];
/** FROZEN SHAPE: each row's requirement label, so shortening one reds the census. */
const CLAIM_LITERALS: readonly string[] = [
  'B1.1|workflowAgentBackend = "claude" is an explicit selection, validated, never implied',
  "B1.2|existing upstream default preserved: no Workbench tool registers without the claude backend, standard tools still do",
  "B2.1|a Claude SDK failure or shutdown never falls back to the Pi manager spawn path",
  "B2.2|a legacy Pi path that stays enabled is explicitly selected and labeled",
  "B3.1|Workflow/SubagentWorkflow collision detection with another extension is preserved",
  "B3.2|dialog and agents-menu semantics are preserved",
  "B4.1|original config handling is preserved: a legacy settings file loads without being rewritten and still selects upstream behavior",
  "B4.2|saved-workflow file precedence is preserved (project over user directory, saved name precedence)",
  "B5.1|an older journal format stays readable when supported",
  "B5.2|an older journal never becomes unsafe reuse for an effectful call",
  'B5.3|unreadable or foreign journal lines carry an explicit "journal unsupported" warning',
  "B6.1|tests run in both upstream/Pi and new/Claude workbench modes",
];
/** FROZEN SHAPE: every pin's identity (row, file, title), so swapping a pin for an unrelated passing case reds the census. */
const PIN_LITERALS: readonly string[] = [
  "B1.1|workbench-host-contract|L4: Workbench backend is explicit and invalid config is rejected, not silently Pi",
  "B1.1|workbench-pi-client|L2: an explicitly selected Claude backend launches a script through the registered Pi tool",
  "B1.2|workbench-boot-isolation|activates and registers its standard tools without touching a native SDK",
  "B1.2|workbench-pi-reconcile|registers only under the claude backend",
  "B2.1|workbench-pi-streaming|preserves native %s failure and never falls back to manager",
  "B2.1|workbench-pi-streaming|session shutdown requests owned SDK abort and records cancellation, never Pi workflow spawn",
  "B2.1|workbench-host-contract|L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
  "B3.1|workflow-tool|warns when another extension already owns the tool name|collisions with another extension",
  "B3.1|workflow-tool|withdraws its tool when another extension provides a `Workflow` tool|collisions with another extension",
  "B3.2|workflow-command|offers the entry in the agents menu",
  "B3.2|workflow-command|hides the entry when workflows are off",
  "B3.2|workflow-dialog|moves the phase selection with j/k and clamps at both ends|keys",
  "B4.1|workbench-saved-precedence|loads the settings file without rewriting it, and a legacy file selects upstream behavior|saved-workflow precedence and config parity — mode 'legacy'",
  "B4.1|workbench-saved-precedence|loads the settings file without rewriting it, and a legacy file selects upstream behavior|saved-workflow precedence and config parity — mode 'pi'",
  "B4.1|workbench-saved-precedence|loads the settings file without rewriting it, and a legacy file selects upstream behavior|saved-workflow precedence and config parity — mode 'claude'",
  "B4.2|workbench-saved-precedence|picks the identical file in all three modes for the same tree",
  "B4.2|workflow-tool|falls back to the user's agent dir, and lets the project shadow it",
  "B5.2|workflow-effect-replay|neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
  "B5.2|workflow-examples-claude-backend|a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing|dual-backend golden equivalence (fixture pass, not live SDK)>declared effect classes: the W12 tripwire is exercised identically on both backends",
  "B6.1|workflow-examples-claude-backend|a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing|dual-backend golden equivalence (fixture pass, not live SDK)>declared effect classes: the W12 tripwire is exercised identically on both backends",
  "B6.1|workflow-examples-claude-backend|exhausting the agent budget fails the run with the same class under both backends|dual-backend golden equivalence (fixture pass, not live SDK)>schema, budget and option behaviour",
  "B6.1|workbench-saved-precedence|picks the identical file in all three modes for the same tree",
];
/** FROZEN SHAPE: the judge-unresolved candidates (never pins), as row|file|title. */
const CANDIDATE_LITERALS: readonly string[] = [
  "B5.1|workflow-journal-compat|classifies pre-basis agent entries readable legacy-agent, with the live-rerun-on-resume note",
  "B5.1|workflow-journal-compat|classifies fully readable, with zero unsupported findings and no warnings",
  "B5.2|workflow-journal-compat|refuses a recorded non-read node with the typed uncertain-effect reason, whatever its outcome or basis",
  "B5.3|workflow-journal-compat|names each skipped line with its line number and reason, and carries the explicit warning",
  "B5.3|workflow-journal-compat|warns journal unsupported for another schema version, while still reporting what the reader does with the line",
];
const UNPINNED_ROWS: readonly string[] = ["B2.2", "B5.1", "B5.3"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER, ...(entry.suite === undefined ? {} : { suite: entry.suite }), ...(entry.each === true ? { each: { minCases: 1 } } : {}) });
const JUDGED = TABLE.filter(row => row.pins.length > 0);
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

/** Does the pin's own title or enclosing describe path name both modes? A declared mode alone never counts. */
const namesBothModes = (entry: Pin): boolean => /both backends|all three modes|every mode/i.test([entry.title, ...(entry.suite ?? [])].join(" "));
/** The computed dual-mode verdict of a row: its pins declared dual AND naming both modes in their own text. */
const dualProof = (row: Row): readonly Pin[] => row.pins.filter(entry => entry.mode === "dual" && namesBothModes(entry));

const bulletBlocks = (bullets: readonly string[]): readonly RenderedBlock[] => [{ kind: "list", ordered: false, items: bullets.map(text => ({ text, markdown: text })) }];
const truthBlock: RenderedBlock = { kind: "paragraph", text: TRUTH_PARAGRAPH, markdown: TRUTH_PARAGRAPH };

/** Every docs/16 drift, each naming the row or the section it breaks; row checks run independently of the exactness check. */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, SECTION, 2, [DOCS_PARENT]);
  if (!section.ok) return [`${DOCS_FILE} § ${SECTION}: the section is refused: ${section.why}`];
  const first = section.blocks[0];
  const items = first?.kind === "list" ? first.items.map(item => item.text) : [];
  for (const row of TABLE) {
    if (!(items[row.bullet - 1] ?? "").includes(row.quote)) out.push(`row ${row.id}: its clause "${row.quote}" no longer renders in bullet ${row.bullet} of ${DOCS_FILE} § ${SECTION}`);
  }
  const exact = sectionMatches(section, bulletBlocks(BULLETS));
  if (!exact.ok) out.push(`${DOCS_FILE} § ${SECTION} is not exactly its six frozen bullets: ${exact.why}`);
  return out;
}
/** The docs/14 truth-label paragraph must be the first block of its unique section, exact, with no HTML in the section. */
function truthFailures(markdown: string): string[] {
  const section = docsSection(markdown, DOCS14_SECTION, 2, [DOCS14_PARENT]);
  if (!section.ok) return [`${DOCS14_FILE} § ${DOCS14_SECTION}: the section is refused: ${section.why}`];
  if (section.hasHtml) return [`${DOCS14_FILE} § ${DOCS14_SECTION}: the section carries HTML`];
  const exact = sectionMatches({ ...section, blocks: section.blocks.slice(0, 1) }, [truthBlock]);
  return exact.ok ? [] : [`${DOCS14_FILE} § ${DOCS14_SECTION}: the truth-label paragraph is not exact: ${exact.why}`];
}

/** The synthetic document the drift falsifiers run over: the frozen bullets under the real heading shape. */
const synthetic = (edit: (bullets: readonly string[]) => readonly string[] = bullets => bullets, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Principle\n\nText.\n\n## ${SECTION}\n\n${edit(BULLETS)
    .map(bullet => `- ${bullet}`)
    .join("\n")}\n\n## Upstream maintainability\n\nOther.\n${tail}`;
const weaken = (index: number, from: string, to: string) => (bullets: readonly string[]): readonly string[] => bullets.map((bullet, at) => (at === index ? bullet.replace(from, to) : bullet));
const truthDoc = (paragraph: string): string => `# ${DOCS14_PARENT}\n\n## Truth labels and release gates\n\n${paragraph}\n\nUse Forge build/test/gates as primary interface.\n`;

describe("wb-cax.27 docs/16 compatibility feature census (report mode)", () => {
  it("AC1: the table holds the twelve frozen rows in order, deeply frozen, and pins its own row and pin shape as literals", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => `${row.id}:${row.pins.length}`)).toEqual(ROW_SHAPE);
    expect(TABLE.map(row => `${row.id}|${row.claim}`)).toEqual(CLAIM_LITERALS);
    expect(TABLE.flatMap(row => row.pins.map(entry => `${row.id}|${basename(entry.file, ".test.ts")}|${entry.title}${entry.suite === undefined ? "" : `|${entry.suite.join(">")}`}`))).toEqual(PIN_LITERALS);
    expect(TABLE.flatMap(row => (row.candidates ?? []).map(entry => `${row.id}|${basename(entry.file, ".test.ts")}|${entry.title}`))).toEqual(CANDIDATE_LITERALS);
    expect(TABLE).toHaveLength(12);
  });

  it("AC1: the live docs/16 section renders exactly the six frozen bullets and every row's clause renders in its bullet", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    expect(BULLETS).toHaveLength(6);
    expect(new Set(TABLE.map(row => row.bullet))).toEqual(new Set([1, 2, 3, 4, 5, 6]));
  });

  it("AC1: the docs/14 truth-label paragraph is exact, and every row names a label that paragraph defines", () => {
    expect(truthFailures(readRepo(DOCS14_FILE))).toEqual([]);
    const defined = [...TRUTH_PARAGRAPH.matchAll(/"([^"]+)"/g)].map(match => match[1]);
    expect(defined).toEqual(["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"]);
    for (const row of TABLE) expect(defined, `row ${row.id}: truth label`).toContain(row.label);
  });

  it("AC1: a pinned row carries pins and no reason, an unpinned row carries a reason and no pins, and every pin declares a mode with a basis", () => {
    for (const row of TABLE) {
      if (row.reason === undefined) expect(row.pins.length, `row ${row.id}: a pinned row has pins`).toBeGreaterThan(0);
      else {
        expect(row.pins, `row ${row.id}: an unpinned row carries no pins`).toEqual([]);
        expect(row.reason.trim().length, `row ${row.id}: an unpinned row needs a written reason`).toBeGreaterThan(80);
      }
      for (const entry of row.pins) {
        expect(["claude", "pi", "dual", "unconfigured"], `row ${row.id}: mode`).toContain(entry.mode);
        expect(entry.basis.trim().length, `row ${row.id}: ${entry.title}: a declared mode needs a basis`).toBeGreaterThan(20);
      }
    }
  });

  it("AC3: the unpinned rows are listed so none is ever counted as passed, each naming its reason", () => {
    expect(TABLE.filter(row => row.reason !== undefined).map(row => row.id)).toEqual(UNPINNED_ROWS);
    const b22 = TABLE.find(row => row.id === "B2.2");
    expect(b22?.reason).toContain("wb-a2g.11");
    expect(b22?.reason).toContain("legacy Pi path");
    expect(JUDGED.map(row => row.id)).not.toContain("B2.2");
    for (const id of ["B5.1", "B5.3"]) expect(TABLE.find(row => row.id === id)?.reason, `row ${id}`).toContain("context-unknown");
    expect(JUDGED.map(row => row.id)).toEqual(["B1.1", "B1.2", "B2.1", "B3.1", "B3.2", "B4.1", "B4.2", "B5.2", "B6.1"]);
  });

  it.each(JUDGED.map(row => ({ row })))("AC2 row $row.id: every pinned case is collected, passed and asserting in the default gate's own report", ({ row }) => {
    const verdicts = judge(
      REPORT,
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("NAMED RESIDUAL JUDGE-UNRESOLVED: each journal-compat candidate is held to the judge's exact refusal and is never counted as a pin", () => {
    const candidates = TABLE.flatMap(row => (row.candidates ?? []).map(entry => ({ row, entry })));
    expect(candidates).toHaveLength(CANDIDATE_LITERALS.length);
    for (const { row, entry } of candidates) {
      const [verdict] = judge(REPORT, [casePin(entry)]);
      expect(verdict?.ok, `row ${row.id}: ${entry.title}: the judge resolves it - flip the candidate to a pin`).toBe(false);
      expect(verdict?.code, `row ${row.id}: ${entry.title}`).toBe("context-unknown");
      expect(row.pins).not.toContain(entry);
    }
  });

  it("B6 mode truth: the dual-mode verdict is computed, and no single-mode or unconfigured pin ever proves it", () => {
    const b6 = TABLE.find(row => row.id === "B6.1");
    expect(b6 === undefined ? [] : dualProof(b6).map(entry => entry.title)).toEqual([
      "a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing",
      "exhausting the agent budget fails the run with the same class under both backends",
      "picks the identical file in all three modes for the same tree",
    ]);
    const claudeOnly = TABLE.flatMap(row => row.pins).filter(entry => entry.mode !== "dual");
    expect(claudeOnly.length).toBeGreaterThan(0);
    for (const entry of claudeOnly) expect(dualProof({ ...TABLE[0], pins: [entry] } as Row), entry.title).toEqual([]);
    // a pin declared dual whose own text names no mode is not a dual proof; the declaration alone is a recorded reading
    const bare: Pin = { file: T("x"), title: "registers only under the claude backend", mode: "dual", basis: "declared only, no mode named in the title" };
    expect(dualProof({ ...TABLE[0], pins: [bare] } as Row)).toEqual([]);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    const pinned = TABLE.flatMap(row => row.pins.map(entry => basename(entry.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    expect(fileURLToPath(import.meta.url).endsWith(SELF)).toBe(true);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-cax.27 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (id: string): { row: Row; entry: Pin } => {
    const row = JUDGED.find(candidate => candidate.id === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no judged pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstJudged("B3.2");
    const wrong = { ...entry, title: entry.title.replace("agents", "agentS") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row B3.2");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-shape pin", () => {
    expect(TABLE.filter(row => row.id !== "B6.1").map(row => `${row.id}:${row.pins.length}`)).not.toEqual(ROW_SHAPE);
  });

  it("M3: a pin promoted without a title is red, naming the row (the judge finds no such case)", () => {
    const { entry } = firstJudged("B1.1");
    const [verdict] = judge(REPORT, [casePin({ ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("a pin bound to a describe path is absent under a renamed describe: the B6.1 suite binding is live", () => {
    const { entry } = firstJudged("B6.1");
    expect(entry.suite).toBeDefined();
    const [verdict] = judge(REPORT, [casePin({ ...entry, suite: [...(entry.suite ?? []), "renamed"] })]);
    expect(verdict?.code).toBe("absent");
  });

  it("a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-rf-preview.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a pin relabelled to a live or native tier is refused by the default report, never carried from a title's presence", () => {
    const { entry } = firstJudged("B1.1");
    const [verdict] = judge(REPORT, [{ ...casePin(entry), tier: "native-read" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-cax.27 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the six bullets exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`${synthetic()}\n## Migration acceptance\n\nOther.\n`)).toEqual([]);
    expect(docsFailures(synthetic().replace("\n## Upstream maintainability\n\nOther.\n", ""))).toEqual([]);
  });

  it("K1 names row B2.1 (and only it) when the never-silent-Pi clause is dropped", () => {
    const lines = docsFailures(synthetic(weaken(1, "Never silently choose Pi backend after Claude SDK failure. ", "")));
    expect(named(lines)).toEqual(["row B2.1"]);
    expect(lines.some(line => line.includes("not exactly its six frozen bullets"))).toBe(true);
  });

  it("K2 names row B5.2 (and only it) when the effectful-reuse clause is weakened", () => {
    expect(named(docsFailures(synthetic(weaken(4, "does not become unsafe reuse", "may become reuse"))))).toEqual(["row B5.2"]);
  });

  it("K3 names row B6.1 (and only it) when the both-modes clause is weakened", () => {
    expect(named(docsFailures(synthetic(weaken(5, "Tests must run in both", "Tests may run in either"))))).toEqual(["row B6.1"]);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to a bullet", () => {
    const lines = docsFailures(synthetic(weaken(2, "dialog/menu semantics.", "dialog/menu semantics. Unless the host says otherwise.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its six frozen bullets");
  });

  it("D2 goes red when a seventh weakening bullet is appended inside the section", () => {
    const lines = docsFailures(synthetic(bullets => [...bullets, "A host may skip all of the above."]));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its six frozen bullets");
  });

  it("D3 goes red when a bullet is hidden in an HTML comment and replaced by an inverted one, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(bullets => bullets.map((bullet, at) => (at === 1 ? `<!-- ${bullet} -->\nA legacy Pi path may be chosen silently after a Claude SDK failure.` : bullet))));
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
    expect(named(lines)).toContain("row B2.1");
  });

  it("D4 goes red when the section heading is renamed away or duplicated at EOF", () => {
    expect(docsFailures(synthetic().replace(`## ${SECTION}`, "## Compatibility notes"))[0]).toContain("the section is refused");
    expect(docsFailures(synthetic(undefined, `\n## ${SECTION}\n\n- A weakened copy.\n`))[0]).toContain("the section is refused");
  });

  it("D5 goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(undefined, "").replace("\n## Upstream maintainability", "\n### Exceptions\n\nA host may skip these rules.\n\n## Upstream maintainability"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("not exactly its six frozen bullets"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    expect(docsFailures(synthetic().replace(`## ${SECTION}`, `# Appendix\n\n## ${SECTION}`))[0]).toContain("the section is refused");
  });

  it("D7 goes red on the docs/14 truth-label paragraph when 'must distinguish' is weakened, when HTML hides it, and when the section is duplicated", () => {
    expect(truthFailures(truthDoc(TRUTH_PARAGRAPH))).toEqual([]);
    expect(truthFailures(truthDoc(TRUTH_PARAGRAPH.replace("must distinguish", "may optionally distinguish")))).toHaveLength(1);
    expect(truthFailures(truthDoc(`<!-- ${TRUTH_PARAGRAPH} -->`))).toHaveLength(1);
    expect(truthFailures(`${truthDoc(TRUTH_PARAGRAPH)}\n## ${DOCS14_SECTION}\n\nA weakened copy.\n`)[0]).toContain("the section is refused");
  });
});
