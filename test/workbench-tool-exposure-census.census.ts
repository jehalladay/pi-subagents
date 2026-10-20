/**
 * wb-6hb.10 (VC-2/W06): census falsifier for docs/workbench/06-capability-registry.md "Tool exposure" (WB-034 binding)
 * and "Optional inspect/observe" (WB-023 binding), a census leg of the wb-nl8 census tier (vitest.census.config.ts,
 * include test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (owner
 * program ruling 2026-10-16: one post-u62 adoption cut per census, report mode, no bare-text scanning).
 *
 * Every row binds a falsifiable sentence of the two sections to existing cases by file, VERBATIM title and tier, or
 * records it "unpinned" with a written reason that never counts as satisfied. The leg executes no pinned case and no
 * test run: judge() from the shared helper test/helpers/census.ts reads vitest's own JSON report of the default gate's
 * test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pin counts only when the
 * gate's own run collected it exactly once, recorded it passed, and its body asserts - the helper's three legs,
 * fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore
 * reads red, naming the row, the file, the title and the cause, as far as the helper's resolvable-construct roster and
 * its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case
 * calls itself: every title is located by the helper, from vitest's report, never from bare text.
 *
 * Tiers. A pin's tier names the report that vouches for it: here every pin is a default-gate case, so the vouching
 * report is the default gate's (judge() refuses a pin of any other tier, tier-mismatch). The docs/14 truth label
 * ("fixture pass" | "adversarial pass") is carried beside it as a recorded judgment label: "adversarial pass" is a
 * judgment (does the case try to defeat the guarantee) that no report verifies, and this leg says so rather than
 * claiming it machine-checked. No pin carries a live or native label: a live SDK pass would need its own tier leg, and
 * a default-gate presence check never reports one (tier relabel falsifier below).
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: each of the two sections,
 * under its unique level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF,
 * must render as exactly its frozen paragraphs. A dropped or reworded clause names its row. The drift falsifiers run
 * over a SYNTHETIC document built from the frozen paragraphs, never the live docs/06 text, so a legitimate edit of an
 * unpinned section (Conformance tests, Discovery examples) can never redden a falsifier row.
 *
 * This census binds cases only: the WB-023/WB-034 row upgrades in docs/workbench/TRACEABILITY.md stay the owner's
 * pass, and no source, doc or other test file is edited. It leaves docs/06 "Conformance tests" (wb-6hb.6) alone.
 *
 * Record honesty (corrections to the c663b9a/cccd388 deliveries this file supersedes, neither of which landed): those
 * cuts ran their own collect-only and probe child runs from inside the default gate (the executing-mode class this
 * program retired) and carried a hand-written config-exclusion tier audit; this leg judges the gate's report instead.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-tool-exposure-census.census.ts";
const DOCS_FILE = "docs/workbench/06-capability-registry.md";
const DOCS_PARENT = "06 — Capability registry, typed node providers and agent tools";

/** docs/14 section "Truth labels and release gates": the labels a default-gate pin may carry (live labels need a live tier leg). */
const TRUTH_LABELS = ["code present", "fixture pass", "adversarial pass"] as const;
type Truth = (typeof TRUTH_LABELS)[number];
const LIVE_LABELS: readonly string[] = ["live SDK pass", "scale benchmark pass"];

type Status = "pinned" | "unpinned";
type Section = "tool-exposure" | "inspect-observe";

interface Pin {
  readonly file: string;
  /** Verbatim case title, exactly as registered. */
  readonly title: string;
  /** Recorded docs/14 judgment label; the vouching report is the default gate's for every pin of this census. */
  readonly tier: Truth;
}

interface Row {
  readonly id: string;
  readonly section: Section;
  /** The exact fragment of the docs/06 section this row binds. */
  readonly requirement: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** Unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

/** The frozen docs/06 paragraphs, as the markdown source says them. */
const SECTION_MARKDOWN: Readonly<Record<Section, readonly string[]>> = {
  "tool-exposure": [
    "**Pi side:** register concise discovery/invocation/observation tools and Pi commands. Pi does not need hundreds of eagerly advertised provider-specific tools. Allow on-demand capability contract retrieval.",
    '**Claude Agent SDK side:** expose a curated subset through documented custom MCP tools/in-process MCP servers (or other verified native tool API). Include permissions, tool identity, bounded observations and redaction. Do not prescribe generic "asTools()" in core SDKs; provider edge owns adaptation.',
    "**Script side:** node() is a deterministic host RPC, not an LLM tool call. Agent tool calls and script node calls are separately observable.",
  ],
  "inspect-observe": [
    'A capability can invoke once and return a value; not all operations expose long-lived status. For native operations with a Run/operation ID, advertise independent inspect/observe. A one-shot function need not implement fake "poll until done" semantics.',
    "Observe must support snapshot and event stream if native provider supports them; otherwise explicit polling with provider-specific freshness. Control actions are separate, explicitly registered by a provider with per-action preconditions and acknowledgements. No mandatory universal pause/resume/cancel methods.",
  ],
};
const SECTION_HEADING: Readonly<Record<Section, string>> = { "tool-exposure": "Tool exposure", "inspect-observe": "Optional inspect/observe" };
const SECTION_ORDER: readonly Section[] = ["tool-exposure", "inspect-observe"];
/** What a reader sees of each paragraph: the markdown source without its emphasis markers. */
const renderedOf = (markdown: string): string => markdown.replaceAll("**", "");
const sectionBlocks = (section: Section): readonly RenderedBlock[] => SECTION_MARKDOWN[section].map(markdown => ({ kind: "paragraph", text: renderedOf(markdown), markdown }));

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
const SURFACE = "test/workbench-surface-census.test.ts";

const fixture = (file: string, title: string): Pin => ({ file, title, tier: "fixture pass" });
const adversarial = (file: string, title: string): Pin => ({ file, title, tier: "adversarial pass" });

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
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
    id: "TE-pi-discovery-invocation-observation-tools",
    section: "tool-exposure",
    requirement: "discovery/invocation/observation tools",
    status: "pinned",
    pins: [
      fixture(PI_REPLIES, "registers workflow_inspect in claude mode and leaves workbench_catalog registered"),
      adversarial(SEC_PI, "workbench_catalog is settings-scoped and does not echo a secret in unrelated settings"),
      fixture(PI_CLIENT, "L2: an explicitly selected Claude backend launches a script through the registered Pi tool"),
      fixture(PI_FURNACE, "registers read-only native attachment but denies absence of explicit provider grant"),
    ],
  },
  {
    id: "TE-pi-concise-surface",
    section: "tool-exposure",
    requirement: "register concise",
    status: "unpinned",
    reason:
      "The concise half of the sentence is a bound on how many tools the Workbench registers with Pi and how small each one is; no case asserts any such bound on this base. The four registration cases pinned under TE-pi-discovery-invocation-observation-tools prove discovery, inspection, invocation and observation tools exist, not that the surface stays concise. The landed wb-cax.4 registered-surface census pins the exact registered set (stability, see TE-pi-no-eager-provider-tools), not a size bound: no case asserts a numeric ceiling on the tool count or on a tool's size, so this half stays unpinned.",
    pins: [],
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
    status: "pinned",
    gap: "Flipped from unpinned when the wb-cax.4 registered-surface census landed. The pins prove the registered Pi surface is an exact finite set and that grants never add to it (no provider-specific tool is advertised because a grant exists). They assert no numeric ceiling; the conciseness half stays unpinned on TE-pi-concise-surface.",
    pins: [
      fixture(SURFACE, "modes C and D register exactly legacy plus workbench tools and nothing else"),
      fixture(SURFACE, "grants never change the registered surface (D equals C; B equals A)"),
    ],
  },
  {
    id: "TE-pi-contract-retrieval",
    section: "tool-exposure",
    requirement: "Allow on-demand capability contract retrieval.",
    status: "pinned",
    pins: [
      fixture(PI_REPLIES, "returns the builder's definition reply under the exact inspect:<id> grant, without calling any provider"),
      fixture(REPLIES, "returns the definition view by default for an inspect-granted advertised and implemented capability"),
      fixture(CLAUDE_TOOLS, "roundtrips three generic real MCP schemas, compact discovery, on-demand contract and native values"),
    ],
  },
  {
    id: "TE-claude-curated-subset",
    section: "tool-exposure",
    requirement: "expose a curated subset through documented custom MCP tools/in-process MCP servers",
    status: "pinned",
    pins: [
      fixture(CLAUDE_ROLE, "adds only curated role MCP tools to actual SDK options without provider auto-grants"),
      adversarial(CLAUDE_TOOLS, "discovery is finite and does not enumerate provider registrations outside the role"),
      adversarial(CLAUDE_TOOLS, "a role list never turns a registered write fixture into an executable operation"),
    ],
  },
  {
    id: "TE-claude-permissions",
    section: "tool-exposure",
    requirement: "Include permissions",
    status: "pinned",
    gap: "WB-034 first binding: the claude agent sees only curated, authorized provider tools and list/inspect never grant invoke. The pins prove it at the in-process MCP boundary against an actual SDK server; a live SDK pass is a separate tier.",
    pins: [
      adversarial(CLAUDE_TOOLS, "registration and discovery never authorize invocation"),
      adversarial(CLAUDE_TOOLS, "requires BOTH role membership and exact invoke grant plus producer permission"),
      adversarial(CLAUDE_TOOLS, "discovery, contract and native inspect remain independently granted"),
      adversarial(CLAUDE_TOOLS, "validates finite host policy and refuses wildcard or incomplete authority"),
    ],
  },
  {
    id: "TE-claude-tool-identity",
    section: "tool-exposure",
    requirement: "tool identity",
    status: "pinned",
    pins: [
      adversarial(CLAUDE_TOOLS, "does not accept SDK-stripped identity arguments as host authority"),
      adversarial(CLAUDE_TOOLS, "rejects contract drift, malformed native payload, and impersonation before provider dispatch"),
      adversarial(CLAUDE_TOOLS, "pins distinct logical IDs across concurrent asynchronous host checks"),
    ],
  },
  {
    id: "TE-claude-bounded-observations",
    section: "tool-exposure",
    requirement: "bounded observations",
    status: "pinned",
    pins: [
      adversarial(CLAUDE_TOOLS, "bounds serialized input/output and call counts without fake domain success"),
      adversarial(CLAUDE_TOOLS, "rejects oversized native read answers instead of reporting a fabricated status"),
      fixture(CLAUDE_OBS, "caps samples and tool evidence while terminal is always emitted and snapshots are immutable"),
    ],
  },
  {
    id: "TE-claude-redaction",
    section: "tool-exposure",
    requirement: "redaction",
    status: "pinned",
    pins: [
      adversarial(CLAUDE_TOOLS, "redacts successful native strings/secret fields and terminal escapes"),
      adversarial(CLAUDE_TOOLS, "redacts unexpected provider errors and keeps authorization/resource failure native"),
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
      fixture(NODE, "L3: deterministic SDK node returns its typed native domain result without an agent"),
      adversarial(NODE, "L4: unauthorized invocation denied at host even with known capability id"),
      adversarial(SEC_WF, "node() refuses grant/identity options before dispatching to a host capability"),
    ],
  },
  {
    id: "TE-script-node-calls-separately-observable",
    section: "tool-exposure",
    requirement: "script node calls are separately observable",
    status: "pinned",
    pins: [
      adversarial(NODE, "L4: node calls are never served from the settled-agent journal"),
      adversarial(NODE, "L4: a node between identical agents invalidates downstream journal replay"),
      fixture(PROGRESS, "names replayed agents and node reads from the resume journal"),
    ],
  },
  {
    id: "TE-script-agent-vs-node-side-by-side",
    section: "tool-exposure",
    requirement: "Agent tool calls and script node calls",
    status: "unpinned",
    reason:
      "The pins under TE-script-node-calls-separately-observable prove node calls are journaled and replayed as their own kind and that progress names agents and node reads separately. No case observes an agent tool call and a script node call side by side in one live run, so the comparison the sentence states is unpinned.",
    pins: [],
  },
  {
    id: "IO-independent-inspect-observe",
    section: "inspect-observe",
    requirement: "For native operations with a Run/operation ID, advertise independent inspect/observe.",
    status: "pinned",
    gap: "WB-023 first binding: inspect/observe are exposed only where the producer supports them. The pins prove the advertised-and-implemented gate for inspect and a native Run/Attempt read for observe; event cursor and snapshot freshness are pinned under the snapshot row.",
    pins: [
      fixture(REPLIES, "requires an advertised AND implemented inspect mode, else explicit unavailable with the reason"),
      adversarial(CLAUDE_TOOLS, "discovery, contract and native inspect remain independently granted"),
      fixture(FURNACE_OBS, "reads native Run, Attempt and bounded log reference without promoting output or owning the Run"),
    ],
  },
  {
    id: "IO-one-shot-no-fake-polling",
    section: "inspect-observe",
    requirement: 'A one-shot function need not implement fake "poll until done" semantics.',
    status: "pinned",
    pins: [
      fixture(PI_REPLIES, "reports inspect-not-advertised and inspect-not-implemented as typed unavailable replies"),
      fixture(REPLIES, "requires an advertised AND implemented inspect mode, else explicit unavailable with the reason"),
      fixture(NODE, "L3: deterministic SDK node returns its typed native domain result without an agent"),
    ],
  },
  {
    id: "IO-snapshot-and-event-stream",
    section: "inspect-observe",
    requirement: "Observe must support snapshot and event stream if native provider supports them",
    status: "pinned",
    pins: [
      fixture(OBSERVATION, "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
      fixture(OBSERVATION, "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
    ],
  },
  {
    id: "IO-explicit-polling-freshness",
    section: "inspect-observe",
    requirement: "otherwise explicit polling with provider-specific freshness",
    status: "pinned",
    pins: [
      fixture(FURNACE_OBS, "a bounded poll ending on a still-active Run emits last-known stale state instead of ending silently"),
      fixture(FURNACE_OBS, "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING"),
      fixture(FORGE_OBS, "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
    ],
  },
  {
    id: "IO-control-separate-and-explicit",
    section: "inspect-observe",
    requirement: "Control actions are separate, explicitly registered by a provider with per-action preconditions and acknowledgements.",
    status: "pinned",
    pins: [
      adversarial(CONTROL, "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)"),
      adversarial(CONTROL, "rule 4: the exact grant control:<provider>.<action> is required verbatim"),
      fixture(CONTROL, "requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp"),
      adversarial(FURNACE_CTL, "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb"),
    ],
  },
  {
    id: "IO-no-universal-lifecycle-methods",
    section: "inspect-observe",
    requirement: "No mandatory universal pause/resume/cancel methods.",
    status: "pinned",
    pins: [
      adversarial(CONTROL, "freezes the per-provider allowlist; an unlisted provider such as hyperunix has no permitted action at all"),
      fixture(FURNACE_CTL, "is exactly run pause/stop/resume and attempt stop, each a verbatim vendored clientOperations row, deep-frozen"),
    ],
  },
]);


/** Expected census outcome: promoting a row (or losing one) is an edit to this file, never silent. */
const SATISFIED: readonly string[] = [
  "TE-pi-discovery-invocation-observation-tools",
  "TE-pi-no-eager-provider-tools",
  "TE-pi-contract-retrieval",
  "TE-claude-curated-subset",
  "TE-claude-permissions",
  "TE-claude-tool-identity",
  "TE-claude-bounded-observations",
  "TE-claude-redaction",
  "TE-script-node-is-host-rpc",
  "TE-script-node-calls-separately-observable",
  "IO-independent-inspect-observe",
  "IO-one-shot-no-fake-polling",
  "IO-snapshot-and-event-stream",
  "IO-explicit-polling-freshness",
  "IO-control-separate-and-explicit",
  "IO-no-universal-lifecycle-methods",
];
/** Every unpinned row, in table order; a seat that lands a case flips the row consciously and edits this list. */
const NOT_SATISFIED: readonly string[] = ["TE-pi-concise-surface", "TE-pi-commands", "TE-claude-no-generic-astools", "TE-script-agent-vs-node-side-by-side"];

/**
 * wb-22c (rule 16, F1 of the wb-6hb.10 gate): the census's own judged-row shape, frozen as literals derived from the
 * TABLE above. Deleting or duplicating a pin, shortening a requirement phrase, swapping a pin for an unrelated passing
 * case, or narrowing the JUDGED predicate (so fewer or zero AC2 rows run) reds the AC1 frozen-shape case below.
 */
const FROZEN_ROW_PINS: readonly string[] = [
  "TE-pi-discovery-invocation-observation-tools:4",
  "TE-pi-concise-surface:0",
  "TE-pi-commands:0",
  "TE-pi-no-eager-provider-tools:2",
  "TE-pi-contract-retrieval:3",
  "TE-claude-curated-subset:3",
  "TE-claude-permissions:4",
  "TE-claude-tool-identity:3",
  "TE-claude-bounded-observations:3",
  "TE-claude-redaction:2",
  "TE-claude-no-generic-astools:0",
  "TE-script-node-is-host-rpc:3",
  "TE-script-node-calls-separately-observable:3",
  "TE-script-agent-vs-node-side-by-side:0",
  "IO-independent-inspect-observe:3",
  "IO-one-shot-no-fake-polling:3",
  "IO-snapshot-and-event-stream:2",
  "IO-explicit-polling-freshness:3",
  "IO-control-separate-and-explicit:4",
  "IO-no-universal-lifecycle-methods:2",
];
const FROZEN_JUDGED_PINS: readonly string[] = [
  "TE-pi-discovery-invocation-observation-tools:4",
  "TE-pi-no-eager-provider-tools:2",
  "TE-pi-contract-retrieval:3",
  "TE-claude-curated-subset:3",
  "TE-claude-permissions:4",
  "TE-claude-tool-identity:3",
  "TE-claude-bounded-observations:3",
  "TE-claude-redaction:2",
  "TE-script-node-is-host-rpc:3",
  "TE-script-node-calls-separately-observable:3",
  "IO-independent-inspect-observe:3",
  "IO-one-shot-no-fake-polling:3",
  "IO-snapshot-and-event-stream:2",
  "IO-explicit-polling-freshness:3",
  "IO-control-separate-and-explicit:4",
  "IO-no-universal-lifecycle-methods:2",
];
const FROZEN_REQUIREMENT_LENGTHS: readonly string[] = [
  "TE-pi-discovery-invocation-observation-tools:38",
  "TE-pi-concise-surface:16",
  "TE-pi-commands:15",
  "TE-pi-no-eager-provider-tools:72",
  "TE-pi-contract-retrieval:46",
  "TE-claude-curated-subset:82",
  "TE-claude-permissions:19",
  "TE-claude-tool-identity:13",
  "TE-claude-bounded-observations:20",
  "TE-claude-redaction:9",
  "TE-claude-no-generic-astools:81",
  "TE-script-node-is-host-rpc:57",
  "TE-script-node-calls-separately-observable:43",
  "TE-script-agent-vs-node-side-by-side:38",
  "IO-independent-inspect-observe:85",
  "IO-one-shot-no-fake-polling:72",
  "IO-snapshot-and-event-stream:79",
  "IO-explicit-polling-freshness:59",
  "IO-control-separate-and-explicit:117",
  "IO-no-universal-lifecycle-methods:51",
];
const FROZEN_PIN_DIGESTS: readonly string[] = [
  "TE-pi-discovery-invocation-observation-tools:c2ff5e1010e3",
  "TE-pi-concise-surface:e3b0c44298fc",
  "TE-pi-commands:e3b0c44298fc",
  "TE-pi-no-eager-provider-tools:03f3f70a2ed5",
  "TE-pi-contract-retrieval:c78d11d5b92b",
  "TE-claude-curated-subset:13380e531174",
  "TE-claude-permissions:ff4c1bc47710",
  "TE-claude-tool-identity:9adc1de22cff",
  "TE-claude-bounded-observations:58d52a978c0a",
  "TE-claude-redaction:dbc3a01f068b",
  "TE-claude-no-generic-astools:e3b0c44298fc",
  "TE-script-node-is-host-rpc:d401ba81bd28",
  "TE-script-node-calls-separately-observable:74be266fa522",
  "TE-script-agent-vs-node-side-by-side:e3b0c44298fc",
  "IO-independent-inspect-observe:99fbc4f43513",
  "IO-one-shot-no-fake-polling:28508a006194",
  "IO-snapshot-and-event-stream:a5b6068dd554",
  "IO-explicit-polling-freshness:82d4e6a89098",
  "IO-control-separate-and-explicit:9de213ea523a",
  "IO-no-universal-lifecycle-methods:92f688357751",
];
/** A short digest of a row's ordered (file, title, tier) pins: a changed, swapped, retitled or retiered pin changes it. */
const pinDigest = (row: Row): string => createHash("sha256").update(row.pins.map(entry => `${entry.file}\n${entry.title}\n${entry.tier}`).join("\n\n")).digest("hex").slice(0, 12);

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** Every row that holds pins, with its pins as the helper's CasePin: all default-gate (the report this leg reads). */
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });
const JUDGED = ROWS.filter(row => row.pins.length > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row requirement checks read the section's
 * rendered text and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  for (const section of SECTION_ORDER) {
    const heading = SECTION_HEADING[section];
    const found = docsSection(markdown, heading, 2, [DOCS_PARENT]);
    if (!found.ok) {
      out.push(`${DOCS_FILE} § ${heading}: the section is refused: ${found.why}`);
      continue;
    }
    const rendered = found.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
    for (const row of ROWS) {
      if (row.section === section && !rendered.includes(renderedOf(row.requirement))) out.push(`row ${row.id}: its clause "${row.requirement}" no longer renders in ${DOCS_FILE} § ${heading}`);
    }
    const exact = sectionMatches(found, sectionBlocks(section));
    if (!exact.ok) out.push(`${DOCS_FILE} § ${heading} is not exactly its frozen paragraphs: ${exact.why}`);
  }
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bodies under the real heading shape, never the live text. */
const synthetic = (edit: (section: Section, body: string) => string = (_section, body) => body, tail = ""): string => {
  const sections = SECTION_ORDER.map(section => `## ${SECTION_HEADING[section]}\n\n${edit(section, SECTION_MARKDOWN[section].join("\n\n"))}\n`).join("\n");
  return `# ${DOCS_PARENT}\n\n## Location and scope\n\nOther text.\n\n${sections}\n## Discovery examples (proposed identifiers)\n\n- a -> b\n${tail}`;
};
const editSection = (section: Section, from: string, to: string) => (current: Section, body: string): string => (current === section ? body.replace(from, to) : body);
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-6hb.10 docs/06 tool-exposure census (report mode): the table and the requirement text", () => {
  it("AC1: the table holds the twenty frozen rows (14 Tool exposure, 6 Optional inspect/observe), deeply frozen, with unique ids", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS).toHaveLength(20);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(20);
    expect(ROWS.filter(row => row.section === "tool-exposure")).toHaveLength(14);
    expect(ROWS.filter(row => row.section === "inspect-observe")).toHaveLength(6);
  });

  it("AC1 frozen shape (wb-22c): the row/pin-count list, the judged subset, every requirement phrase and every pin's identity are frozen literals", () => {
    expect(
      ROWS.map(row => `${row.id}:${row.pins.length}`),
      "row:pin-count over the whole table",
    ).toEqual(FROZEN_ROW_PINS);
    expect(
      JUDGED.map(row => `${row.id}:${row.pins.length}`),
      "row:pin-count over the judged rows (the AC2 it.each set)",
    ).toEqual(FROZEN_JUDGED_PINS);
    expect(
      ROWS.map(row => `${row.id}:${row.requirement.length}`),
      "row:requirement length",
    ).toEqual(FROZEN_REQUIREMENT_LENGTHS);
    expect(
      ROWS.map(row => `${row.id}:${pinDigest(row)}`),
      "row:digest of the ordered (file, title, tier) pins",
    ).toEqual(FROZEN_PIN_DIGESTS);
    for (const row of ROWS) {
      expect(new Set(row.pins.map(entry => `${entry.file}\n${entry.title}`)).size, `row ${row.id}: no pin repeats a (file, title) pair inside its row`).toBe(row.pins.length);
    }
  });

  it("AC1: the two sections render exactly their frozen paragraphs (HTML-free, whole-section equality) and every row's clause renders in its own section", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    for (const section of SECTION_ORDER) {
      expect(sectionMatches(docsSection(readRepo(DOCS_FILE), SECTION_HEADING[section], 2, [DOCS_PARENT]), sectionBlocks(section)), section).toEqual({ ok: true, why: "" });
    }
  });

  it("AC3: a pinned row holds pins and no reason, an unpinned row holds a reason and no pins, and a pin's label is a default-gate docs/14 label", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `row ${row.id}: a pinned row has pins`).toBeGreaterThan(0);
        expect(row.reason, `row ${row.id}: a pinned row carries no unpinned reason`).toBeUndefined();
      } else {
        expect(row.pins, `row ${row.id}: an unpinned row carries no pins`).toEqual([]);
        expect((row.reason ?? "").trim().length, `row ${row.id}: an unpinned row needs a written reason`).toBeGreaterThan(40);
      }
      for (const entry of row.pins) {
        expect(TRUTH_LABELS, `row ${row.id}: ${entry.title}`).toContain(entry.tier);
        expect(LIVE_LABELS, `row ${row.id}: a live label needs a live tier leg this census does not have`).not.toContain(entry.tier);
      }
    }
  });

  it("AC3: the satisfied and unpinned rows are exactly the expected lists, so no unpinned row is ever counted as passed", () => {
    expect(ROWS.filter(row => row.status === "pinned").map(row => row.id)).toEqual(SATISFIED);
    expect(ROWS.filter(row => row.status === "unpinned").map(row => row.id)).toEqual(NOT_SATISFIED);
    const reasons = Object.fromEntries(ROWS.filter(row => row.status === "unpinned").map(row => [row.id, row.reason ?? ""]));
    expect(reasons["TE-pi-commands"]).toContain("agents");
    expect(reasons["TE-claude-no-generic-astools"]).toContain("asTools");
    expect(reasons["TE-script-agent-vs-node-side-by-side"]).toContain("side by side");
    expect(reasons["TE-pi-concise-surface"]).toContain("numeric ceiling");
  });

  it("AC3: the first WB-034 and WB-023 bindings and the half-coverage gaps are written on their rows", () => {
    const gap = (id: string): string => ROWS.find(row => row.id === id)?.gap ?? "";
    expect(gap("TE-claude-permissions")).toContain("WB-034 first binding");
    expect(gap("IO-independent-inspect-observe")).toContain("WB-023 first binding");
    expect(gap("TE-pi-no-eager-provider-tools")).toContain("numeric ceiling");
  });

  it("AC3: no row pins a .census.ts file, and the only pins from a file named census are the two direct wb-cax.4 surface-census boot-mode cases", () => {
    const pinnedFiles = ROWS.flatMap(row => row.pins.map(entry => entry.file));
    expect(pinnedFiles.filter(file => file.includes("census"))).toEqual([SURFACE, SURFACE]);
    expect(pinnedFiles.some(file => file.endsWith(".census.ts"))).toBe(false);
  });

  it.each(JUDGED)("AC2 row $id: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(
      REPORT,
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.map(entry => entry.module).filter(module => module.includes("child_process") || module.includes("worker_threads"))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6hb.10 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.id === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("TE-claude-permissions");
    const wrong = { ...entry, title: entry.title.replace("never authorize", "never authorizE") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row TE-claude-permissions");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the satisfied list no longer matches)", () => {
    expect(ROWS.filter(row => row.status === "pinned" && row.id !== "IO-snapshot-and-event-stream").map(row => row.id)).not.toEqual(SATISFIED);
  });

  it("M3: a pin promoted without a title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("TE-pi-contract-retrieval");
    const [verdict] = judge(REPORT, [casePin({ ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a pin pointed at a file the default gate never ran is red, not collected", () => {
    const { entry } = firstPin("TE-claude-redaction");
    const [verdict] = judge(REPORT, [casePin({ ...entry, file: "test/workbench-no-such-file.test.ts" })]);
    expect(verdict?.ok).toBe(false);
    expect(["unreadable", "not-collected", "unmapped-location", "absent"]).toContain(verdict?.code);
  });

  it("M5: a pin relabelled to a non-default tier is refused by the default report, never carried from a title's presence", () => {
    const { entry } = firstPin("TE-claude-bounded-observations");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "native-read" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M6: a row's pins judged against a report that does not hold them are all red (an empty report cannot pass)", () => {
    const { row } = firstPin("IO-no-universal-lifecycle-methods");
    const verdicts = judge(join(ROOT, ".forge", "no-such-report.json"), row.pins.map(entry => casePin(entry)));
    expect(verdicts.every(verdict => !verdict.ok)).toBe(true);
  });
});

describe("wb-6hb.10 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the two sections exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(synthetic(undefined, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("K1 names row TE-claude-permissions (and only it) when its clause is dropped from the Claude paragraph", () => {
    const lines = docsFailures(synthetic(editSection("tool-exposure", "Include permissions, ", "")));
    expect(named(lines)).toEqual(["row TE-claude-permissions"]);
    expect(lines.some(line => line.includes("not exactly its frozen paragraphs"))).toBe(true);
  });

  it("K2 names row TE-script-node-is-host-rpc (and only it) when the host-RPC sentence is weakened", () => {
    expect(named(docsFailures(synthetic(editSection("tool-exposure", "not an LLM tool call", "an LLM tool call"))))).toEqual(["row TE-script-node-is-host-rpc"]);
  });

  it("K3 names row IO-no-universal-lifecycle-methods (and only it) when the lifecycle sentence is reworded", () => {
    expect(named(docsFailures(synthetic(editSection("inspect-observe", "No mandatory universal pause/resume/cancel methods.", "Universal pause/resume/cancel methods are mandatory."))))).toEqual(["row IO-no-universal-lifecycle-methods"]);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to a paragraph", () => {
    const lines = docsFailures(synthetic(editSection("tool-exposure", "separately observable.", "separately observable. Unless the host says otherwise.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Tool exposure is not exactly its frozen paragraphs");
  });

  it("D1b goes red on the section when a weakening paragraph is appended inside it", () => {
    const lines = docsFailures(synthetic(editSection("inspect-observe", "cancel methods.", "cancel methods.\n\nA host may add them.")));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 3 blocks; the census pins 2");
  });

  it("D2 goes red when a section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace("## Optional inspect/observe", "## Optional notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Optional inspect/observe: the section is refused");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection is appended inside a section", () => {
    const lines = docsFailures(synthetic(editSection("tool-exposure", "adaptation.", "adaptation.\n\n### Exceptions\n\nA host may skip these rules.")));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D9 goes red when a level-1 heading inserted above re-homes a section", () => {
    const lines = docsFailures(synthetic().replace("## Optional inspect/observe", "# Appendix\n\n## Optional inspect/observe"));
    expect(lines.some(line => line.includes("Optional inspect/observe: the section is refused"))).toBe(true);
  });

  it("D10 names the clause row when it is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editSection("tool-exposure", "node() is a deterministic host RPC, not an LLM tool call.", "<!-- node() is a deterministic host RPC, not an LLM tool call. -->")));
    expect(named(lines)).toContain("row TE-script-node-is-host-rpc");
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D11 (same-view): a verbatim archived copy of the section inside an HTML comment cannot stand in for the real section once its clause is dropped", () => {
    const hidden = `<!--\n## Tool exposure\n\n${SECTION_MARKDOWN["tool-exposure"].join("\n\n")}\n-->\n`;
    const weakened = synthetic(editSection("tool-exposure", "Include permissions, ", "")).replace("## Tool exposure", `${hidden}\n## Tool exposure`);
    expect(named(docsFailures(weakened))).toEqual(["row TE-claude-permissions"]);
    expect(docsFailures(synthetic().replace("## Tool exposure", `${hidden}\n## Tool exposure`))).toEqual([]);
  });

  it("an edit of an unpinned section never reddens a row: Location and scope and Discovery examples are free to change", () => {
    expect(docsFailures(synthetic().replace("Other text.", "Changed text.").replace("- a -> b", "- c -> d"))).toEqual([]);
  });
});
