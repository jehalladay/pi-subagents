/**
 * workbench-tool-exposure-census.test.ts - wb-6hb.10 (VC-2/W06): the docs/06
 * "Tool exposure" and "Optional inspect/observe" requirement census, a
 * falsifier.
 *
 * docs/workbench/06-capability-registry.md binds two sections:
 *
 *   section "Tool exposure" (WB-034 binding, three paragraphs: Pi side, Claude Agent
 *     SDK side, script side)
 *   section "Optional inspect/observe" (WB-023 binding, two paragraphs)
 *
 * Every row below is bound to existing cases by file path, verbatim it/describe
 * title and docs/14 truth label ("tier"). The census reads the pinned files as
 * text and never executes the pinned cases. It goes red, naming the row, when a
 * pinned case is renamed, deleted, duplicated, commented out or skipped, when a
 * tier is outside the docs/14 vocabulary, and when a row's status overstates
 * its pins.
 *
 * A requirement with no existing case is recorded "unpinned" with the reason
 * written out and NEVER counts as satisfied. This census binds cases only: the
 * WB-023/WB-034 row upgrades in docs/workbench/TRACEABILITY.md stay the owner's
 * pass, and no source, doc or other test file is edited here.
 *
 * Scope: test-only. It leaves wb-6hb.6 (docs/06 "Conformance tests") alone.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DOC_PATH = "docs/workbench/06-capability-registry.md";

/** docs/14 section "Truth labels and release gates" - the only tiers a pin may claim. */
const TIERS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"] as const;
type Tier = (typeof TIERS)[number];

type Status = "pinned" | "unpinned";
type Section = "tool-exposure" | "inspect-observe";

interface Pin {
  readonly file: string;
  /** Verbatim text between the quotes of the it()/describe() call, as written in the source. */
  readonly title: string;
  readonly tier: Tier;
}

interface Row {
  readonly id: string;
  readonly section: Section;
  /** The exact fragment of the docs/06 section this row binds. */
  readonly requirement: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

const TOOL_EXPOSURE = [
  "**Pi side:** register concise discovery/invocation/observation tools and Pi commands. Pi does not need hundreds of eagerly advertised provider-specific tools. Allow on-demand capability contract retrieval.",
  '**Claude Agent SDK side:** expose a curated subset through documented custom MCP tools/in-process MCP servers (or other verified native tool API). Include permissions, tool identity, bounded observations and redaction. Do not prescribe generic "asTools()" in core SDKs; provider edge owns adaptation.',
  "**Script side:** node() is a deterministic host RPC, not an LLM tool call. Agent tool calls and script node calls are separately observable.",
].join(" ");

const INSPECT_OBSERVE = [
  'A capability can invoke once and return a value; not all operations expose long-lived status. For native operations with a Run/operation ID, advertise independent inspect/observe. A one-shot function need not implement fake "poll until done" semantics.',
  "Observe must support snapshot and event stream if native provider supports them; otherwise explicit polling with provider-specific freshness. Control actions are separate, explicitly registered by a provider with per-action preconditions and acknowledgements. No mandatory universal pause/resume/cancel methods.",
].join(" ");

const PI_REPLIES = "test/workbench-pi-tool-replies.test.ts";
const REPLIES = "test/workbench-tool-replies.test.ts";
const SEC_PI = "test/workbench-security-pi-tools.test.ts";
const SEC_WF = "test/workbench-security-workflow.test.ts";
const PI_CLIENT = "test/workbench-pi-client.test.ts";
const PI_FURNACE = "test/workbench-pi-furnace-observer.test.ts";
const CLAUDE_TOOLS = "test/workbench-claude-capability-tools.test.ts";
const CLAUDE_ROLE = "test/workbench-claude-role-tools.test.ts";
const CLAUDE_OBS = "test/workbench-claude-observer.test.ts";
const NODE = "test/workbench-node-contract.test.ts";
const PROGRESS = "test/workflow-progress.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const FURNACE_OBS = "test/workbench-furnace-observer.test.ts";
const FORGE_OBS = "test/workbench-forge-observer.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const FURNACE_CTL = "test/workbench-furnace-control.test.ts";

const ROWS: readonly Row[] = [
  {
    id: "TE-pi-discovery-invocation-observation-tools",
    section: "tool-exposure",
    requirement: "register concise discovery/invocation/observation tools",
    status: "pinned",
    gap: "Discovery (workbench_catalog), inspection (workflow_inspect), invocation (the registered launch tool) and observation (the Furnace attach) are each pinned by a registration case. Whether the whole registered surface stays concise is the surface census (wb-cax.4), not these pins.",
    pins: [
      { file: PI_REPLIES, title: "registers workflow_inspect in claude mode and leaves workbench_catalog registered", tier: "fixture pass" },
      { file: SEC_PI, title: "workbench_catalog is settings-scoped and does not echo a secret in unrelated settings", tier: "adversarial pass" },
      { file: PI_CLIENT, title: "L2: an explicitly selected Claude backend launches a script through the registered Pi tool", tier: "fixture pass" },
      { file: PI_FURNACE, title: "registers read-only native attachment but denies absence of explicit provider grant", tier: "fixture pass" },
    ],
  },
  {
    id: "TE-pi-commands",
    section: "tool-exposure",
    requirement: "and Pi commands",
    status: "unpinned",
    reason:
      "The only Pi command the extension registers is the upstream agents command (src/index.ts registerCommand); no Workbench Pi command exists, and test/workflow-command.test.ts pins the /agents menu and the absence of a /workflows command, not a Workbench command. Pinned when a Workbench command lands.",
    pins: [],
  },
  {
    id: "TE-pi-no-eager-provider-tools",
    section: "tool-exposure",
    requirement: "Pi does not need hundreds of eagerly advertised provider-specific tools.",
    status: "unpinned",
    reason:
      "No case bounds the number of Pi tools the Workbench registers; the registered-surface census is wb-cax.4, which is respinning and not landed on this base. Pinned when it lands.",
    pins: [],
  },
  {
    id: "TE-pi-contract-retrieval",
    section: "tool-exposure",
    requirement: "Allow on-demand capability contract retrieval.",
    status: "pinned",
    pins: [
      {
        file: PI_REPLIES,
        title: "returns the builder's definition reply under the exact inspect:<id> grant, without calling any provider",
        tier: "fixture pass",
      },
      {
        file: REPLIES,
        title: "returns the definition view by default for an inspect-granted advertised and implemented capability",
        tier: "fixture pass",
      },
      {
        file: CLAUDE_TOOLS,
        title: "roundtrips three generic real MCP schemas, compact discovery, on-demand contract and native values",
        tier: "fixture pass",
      },
    ],
  },
  {
    id: "TE-claude-curated-subset",
    section: "tool-exposure",
    requirement: "expose a curated subset through documented custom MCP tools/in-process MCP servers",
    status: "pinned",
    pins: [
      { file: CLAUDE_ROLE, title: "adds only curated role MCP tools to actual SDK options without provider auto-grants", tier: "fixture pass" },
      {
        file: CLAUDE_TOOLS,
        title: "discovery is finite and does not enumerate provider registrations outside the role",
        tier: "adversarial pass",
      },
      {
        file: CLAUDE_TOOLS,
        title: "a role list never turns a registered write fixture into an executable operation",
        tier: "adversarial pass",
      },
    ],
  },
  {
    id: "TE-claude-permissions",
    section: "tool-exposure",
    requirement: "Include permissions",
    status: "pinned",
    gap: "WB-034 first binding: the claude agent sees only curated, authorized provider tools and list/inspect never grant invoke. The pins prove it at the in-process MCP boundary against an actual SDK server; a live SDK pass is a separate tier.",
    pins: [
      { file: CLAUDE_TOOLS, title: "registration and discovery never authorize invocation", tier: "adversarial pass" },
      { file: CLAUDE_TOOLS, title: "requires BOTH role membership and exact invoke grant plus producer permission", tier: "adversarial pass" },
      { file: CLAUDE_TOOLS, title: "discovery, contract and native inspect remain independently granted", tier: "adversarial pass" },
      { file: CLAUDE_TOOLS, title: "validates finite host policy and refuses wildcard or incomplete authority", tier: "adversarial pass" },
    ],
  },
  {
    id: "TE-claude-tool-identity",
    section: "tool-exposure",
    requirement: "tool identity",
    status: "pinned",
    pins: [
      { file: CLAUDE_TOOLS, title: "does not accept SDK-stripped identity arguments as host authority", tier: "adversarial pass" },
      {
        file: CLAUDE_TOOLS,
        title: "rejects contract drift, malformed native payload, and impersonation before provider dispatch",
        tier: "adversarial pass",
      },
      { file: CLAUDE_TOOLS, title: "pins distinct logical IDs across concurrent asynchronous host checks", tier: "adversarial pass" },
    ],
  },
  {
    id: "TE-claude-bounded-observations",
    section: "tool-exposure",
    requirement: "bounded observations",
    status: "pinned",
    pins: [
      { file: CLAUDE_TOOLS, title: "bounds serialized input/output and call counts without fake domain success", tier: "adversarial pass" },
      { file: CLAUDE_TOOLS, title: "rejects oversized native read answers instead of reporting a fabricated status", tier: "adversarial pass" },
      {
        file: CLAUDE_OBS,
        title: "caps samples and tool evidence while terminal is always emitted and snapshots are immutable",
        tier: "fixture pass",
      },
    ],
  },
  {
    id: "TE-claude-redaction",
    section: "tool-exposure",
    requirement: "redaction",
    status: "pinned",
    pins: [
      { file: CLAUDE_TOOLS, title: "redacts successful native strings/secret fields and terminal escapes", tier: "adversarial pass" },
      {
        file: CLAUDE_TOOLS,
        title: "redacts unexpected provider errors and keeps authorization/resource failure native",
        tier: "adversarial pass",
      },
    ],
  },
  {
    id: "TE-claude-no-generic-astools",
    section: "tool-exposure",
    requirement: 'Do not prescribe generic "asTools()" in core SDKs; provider edge owns adaptation.',
    status: "unpinned",
    reason:
      "A negative design constraint on the core SDKs' public surface; no case asserts that no core SDK exports an asTools adapter, and the adapters under test live at the provider edge by construction. Pinned only by a surface assertion that does not exist yet.",
    pins: [],
  },
  {
    id: "TE-script-node-is-host-rpc",
    section: "tool-exposure",
    requirement: "node() is a deterministic host RPC, not an LLM tool call.",
    status: "pinned",
    pins: [
      { file: NODE, title: "L3: deterministic SDK node returns its typed native domain result without an agent", tier: "fixture pass" },
      { file: NODE, title: "L4: unauthorized invocation denied at host even with known capability id", tier: "adversarial pass" },
      { file: SEC_WF, title: "node() refuses grant/identity options before dispatching to a host capability", tier: "adversarial pass" },
    ],
  },
  {
    id: "TE-script-separately-observable",
    section: "tool-exposure",
    requirement: "Agent tool calls and script node calls are separately observable.",
    status: "pinned",
    gap: "The pins prove node calls are journaled and replayed as their own kind (never served from the settled-agent journal) and that progress names agents and node reads separately. No case observes an agent tool call and a script node call side by side in one live run; that comparison is unpinned.",
    pins: [
      { file: NODE, title: "L4: node calls are never served from the settled-agent journal", tier: "adversarial pass" },
      { file: NODE, title: "L4: a node between identical agents invalidates downstream journal replay", tier: "adversarial pass" },
      { file: PROGRESS, title: "names replayed agents and node reads from the resume journal", tier: "fixture pass" },
    ],
  },
  {
    id: "IO-independent-inspect-observe",
    section: "inspect-observe",
    requirement: "For native operations with a Run/operation ID, advertise independent inspect/observe.",
    status: "pinned",
    gap: "WB-023 first binding: inspect/observe are exposed only where the producer supports them. The pins prove the advertised-and-implemented gate for inspect and a native Run/Attempt read for observe; event cursor and snapshot freshness are pinned under the snapshot row.",
    pins: [
      {
        file: REPLIES,
        title: "requires an advertised AND implemented inspect mode, else explicit unavailable with the reason",
        tier: "fixture pass",
      },
      { file: CLAUDE_TOOLS, title: "discovery, contract and native inspect remain independently granted", tier: "adversarial pass" },
      {
        file: FURNACE_OBS,
        title: "reads native Run, Attempt and bounded log reference without promoting output or owning the Run",
        tier: "fixture pass",
      },
    ],
  },
  {
    id: "IO-one-shot-no-fake-polling",
    section: "inspect-observe",
    requirement: 'A one-shot function need not implement fake "poll until done" semantics.',
    status: "pinned",
    pins: [
      { file: PI_REPLIES, title: "reports inspect-not-advertised and inspect-not-implemented as typed unavailable replies", tier: "fixture pass" },
      {
        file: REPLIES,
        title: "requires an advertised AND implemented inspect mode, else explicit unavailable with the reason",
        tier: "fixture pass",
      },
      { file: NODE, title: "L3: deterministic SDK node returns its typed native domain result without an agent", tier: "fixture pass" },
    ],
  },
  {
    id: "IO-snapshot-and-event-stream",
    section: "inspect-observe",
    requirement: "Observe must support snapshot and event stream if native provider supports them",
    status: "pinned",
    pins: [
      {
        file: OBSERVATION,
        title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
        tier: "fixture pass",
      },
      {
        file: OBSERVATION,
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
        tier: "fixture pass",
      },
    ],
  },
  {
    id: "IO-explicit-polling-freshness",
    section: "inspect-observe",
    requirement: "otherwise explicit polling with provider-specific freshness",
    status: "pinned",
    pins: [
      {
        file: FURNACE_OBS,
        title: "a bounded poll ending on a still-active Run emits last-known stale state instead of ending silently",
        tier: "fixture pass",
      },
      {
        file: FURNACE_OBS,
        title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
        tier: "fixture pass",
      },
      {
        file: FORGE_OBS,
        title: "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone",
        tier: "fixture pass",
      },
    ],
  },
  {
    id: "IO-control-separate-and-explicit",
    section: "inspect-observe",
    requirement:
      "Control actions are separate, explicitly registered by a provider with per-action preconditions and acknowledgements.",
    status: "pinned",
    pins: [
      {
        file: CONTROL,
        title: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)",
        tier: "adversarial pass",
      },
      { file: CONTROL, title: "rule 4: the exact grant control:<provider>.<action> is required verbatim", tier: "adversarial pass" },
      {
        file: CONTROL,
        title: "requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp",
        tier: "fixture pass",
      },
      {
        file: FURNACE_CTL,
        title: "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
        tier: "adversarial pass",
      },
    ],
  },
  {
    id: "IO-no-universal-lifecycle-methods",
    section: "inspect-observe",
    requirement: "No mandatory universal pause/resume/cancel methods.",
    status: "pinned",
    pins: [
      {
        file: CONTROL,
        title: "freezes the per-provider allowlist; an unlisted provider such as hyperunix has no permitted action at all",
        tier: "adversarial pass",
      },
      {
        file: FURNACE_CTL,
        title: "is exactly run pause/stop/resume and attempt stop, each a verbatim vendored clientOperations row, deep-frozen",
        tier: "fixture pass",
      },
    ],
  },
];

/** Expected census outcome: promoting a row (or losing one) is an edit to this file, never silent. */
const SATISFIED = [
  "TE-pi-discovery-invocation-observation-tools",
  "TE-pi-contract-retrieval",
  "TE-claude-curated-subset",
  "TE-claude-permissions",
  "TE-claude-tool-identity",
  "TE-claude-bounded-observations",
  "TE-claude-redaction",
  "TE-script-node-is-host-rpc",
  "TE-script-separately-observable",
  "IO-independent-inspect-observe",
  "IO-one-shot-no-fake-polling",
  "IO-snapshot-and-event-stream",
  "IO-explicit-polling-freshness",
  "IO-control-separate-and-explicit",
  "IO-no-universal-lifecycle-methods",
];
const NOT_SATISFIED = ["TE-pi-commands", "TE-pi-no-eager-provider-tools", "TE-claude-no-generic-astools"];

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
  return problems;
}

/** Every reason this row is not what it claims to be. Empty means the row's declared status is honest. */
function auditRow(row: Row, read: ReadSource): string[] {
  const problems: string[] = [];
  switch (row.status) {
    case "unpinned":
      if (row.pins.length > 0) problems.push(`row ${row.id}: is unpinned yet lists ${row.pins.length} pin(s)`);
      if ((row.reason ?? "").trim().length < 20) problems.push(`row ${row.id}: an unpinned row needs a written reason`);
      break;
    case "pinned":
      if (row.pins.length === 0) problems.push(`row ${row.id}: pinned with no pin`);
      break;
  }
  for (const pin of row.pins) problems.push(...auditPin(row, pin, read));
  return problems;
}

/** Only a pinned row counts. An unpinned row never does. */
const satisfied = (row: Row): boolean => row.status === "pinned";

// ---------------------------------------------------------------------------
// The census against the repository.
// ---------------------------------------------------------------------------

/** A section's body: from its heading to the next heading, whitespace-collapsed. */
function sectionText(doc: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const body = new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## )`, "m").exec(doc)?.[1] ?? "";
  return body.trim().replace(/\s+/g, " ");
}

describe("docs/06 tool-exposure census: the requirement text", () => {
  const doc = readFileSync(`${ROOT}${DOC_PATH}`, "utf8");

  it("still says exactly the three Tool exposure paragraphs this census binds", () => {
    expect(sectionText(doc, "Tool exposure")).toBe(TOOL_EXPOSURE);
  });

  it("still says exactly the two Optional inspect/observe paragraphs this census binds", () => {
    expect(sectionText(doc, "Optional inspect/observe")).toBe(INSPECT_OBSERVE);
  });

  it("binds every row to a fragment of the section it claims", () => {
    const sections: Record<Section, string> = { "tool-exposure": TOOL_EXPOSURE, "inspect-observe": INSPECT_OBSERVE };
    for (const row of ROWS) {
      expect(sections[row.section], `row ${row.id}`).toContain(row.requirement);
    }
  });

  it("holds eighteen unique rows: twelve for Tool exposure, six for Optional inspect/observe", () => {
    expect(ROWS).toHaveLength(18);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(18);
    expect(ROWS.filter(row => row.section === "tool-exposure")).toHaveLength(12);
    expect(ROWS.filter(row => row.section === "inspect-observe")).toHaveLength(6);
  });
});

describe("docs/06 tool-exposure census: every row is bound to a live case", () => {
  for (const row of ROWS) {
    it(`${row.id} (${row.status}) is honest and every pin resolves by file, verbatim title and tier`, () => {
      expect(auditRow(row, readFromDisk)).toEqual([]);
    });
  }

  it("counts exactly the rows expected as satisfied, and never an unpinned one", () => {
    expect(ROWS.filter(satisfied).map(row => row.id)).toEqual(SATISFIED);
    expect(ROWS.filter(row => !satisfied(row)).map(row => row.id)).toEqual(NOT_SATISFIED);
    expect(ROWS.filter(row => row.status === "unpinned").map(row => row.id)).toEqual(NOT_SATISFIED);
  });

  it("states what the permission and observability rows cannot prove", () => {
    const get = (id: string) => ROWS.find(candidate => candidate.id === id);
    expect(get("TE-claude-permissions")?.gap).toContain("WB-034");
    expect(get("IO-independent-inspect-observe")?.gap).toContain("WB-023");
    expect(get("TE-script-separately-observable")?.gap).toContain("side by side");
  });

  it("does not pin a case from another bead's census as its own evidence", () => {
    const census = ROWS.flatMap(row => row.pins).filter(pin => /census/.test(pin.file));
    expect(census).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Falsifiers: the census is only evidence if it goes red when a pin is lost.
// ---------------------------------------------------------------------------

describe("docs/06 tool-exposure census: falsifiers", () => {
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
    section: "tool-exposure",
    requirement: "redaction",
    status: "pinned",
    pins: [{ file: FILE, title: "pinned case one", tier: "fixture pass" }],
    ...overrides,
  });

  it("accepts a live case, including one whose call spans several lines", () => {
    expect(auditRow(row(), readers(SOURCE))).toEqual([]);
    const pins: readonly Pin[] = [{ file: FILE, title: "pinned case two", tier: "fixture pass" }];
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
    const pins = [{ file: FILE, title: "pinned case one", tier: "passes" as unknown as Tier }];
    expect(auditRow(row({ pins }), readers(SOURCE))).toEqual([expect.stringContaining("not a docs/14 truth label")]);
  });

  describe("unpinned rows are reasoned and never pass", () => {
    const unpinned = (overrides: Partial<Row>): Row => row({ status: "unpinned", pins: [], ...overrides });

    it("accepts a reasoned no-case row and does not count it satisfied", () => {
      const missing = unpinned({ reason: "No case on this base exercises this requirement; it is filed for a later bead." });
      expect(auditRow(missing, readers(SOURCE))).toEqual([]);
      expect(satisfied(missing)).toBe(false);
    });

    it("refuses an unpinned row with no reason, and one that also lists pins", () => {
      expect(auditRow(unpinned({}), readers(SOURCE))).toEqual([expect.stringContaining("needs a written reason")]);
      const withPin = unpinned({
        reason: "A reason long enough to be a reason.",
        pins: [{ file: FILE, title: "pinned case one", tier: "fixture pass" }],
      });
      expect(auditRow(withPin, readers(SOURCE))).toEqual([expect.stringContaining("yet lists 1 pin")]);
    });

    it("refuses a pinned row with no pin at all", () => {
      expect(auditRow(row({ pins: [] }), readers(SOURCE))).toEqual([expect.stringContaining("pinned with no pin")]);
    });
  });
});
