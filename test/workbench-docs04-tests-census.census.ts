/**
 * wb-a2g.13 (VC-1/W02): census falsifier for docs/workbench/04-claude-agent-sdk-executor.md section "Tests", a census leg
 * of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is
 * the one post-nl8 adoption cut of a member of the sequenced census class (owner program ruling 2026-10-16: one cut per
 * census, report mode, no bare-text scanning), and it supersedes the refused bc589c8 / bd3151a cuts, which scanned test
 * source itself and never landed.
 *
 * Five docs/04 "Tests" bullets decompose into 18 rows (4 + 8 + 1 + 3 + 2). Every row binds a falsifiable fragment of its
 * bullet to existing cases by file, VERBATIM title and recorded docs/14 truth label, or records itself "unpinned" with a
 * written reason that never counts as satisfied. The leg executes no pinned case: judge() from the shared helper
 * test/helpers/census.ts reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test` before the census step runs), so a pin counts only when the gate's own run collected it exactly once,
 * recorded it passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated,
 * skipped, todo, inverted, excluded or unregistered pinned case therefore reads red, naming the row, the file, the title
 * and the cause, as far as the helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts,
 * receipts/wb-u62.md). This leg scans no test source for case calls itself.
 *
 * Tiers. A pin's tier names the report that vouches for it: every judged pin here is a default-gate case, so the vouching
 * report is the default gate's (judge() refuses a pin of any other tier, tier-mismatch). The docs/14 truth label is a
 * recorded judgment beside it. The live SDK pass evidence is RECORDED, never judged: test/workbench-claude-pi-live.test.ts
 * runs only in the claude-live tier (forge run claude-live, vitest.claude-live.config.ts) and is excluded from the default
 * gate, so this leg checks it at FILE level only - it exists, the claude-live command resolves to its config, the default
 * config excludes it, the default report does not hold it and the default judge refuses it as tier-mismatch - and cites the
 * recorded forge run in docs/workbench/TRACEABILITY.md. NAMED RESIDUAL NATIVE-TITLE: whether the live case's title is still
 * registered is judged by no report this leg reads, and the leg says so rather than counting it. The two probe scripts
 * qa/workbench/live-claude.mjs and qa/workbench/live-resume.mjs are recorded as "code present": no forge command runs them
 * and their only record is TRACEABILITY prose with no revision or command id, so they are never a live pass.
 *
 * Named residuals of what the report proves (the helper's roster, plus these two seat-level ones): (1) BODY-CONTENT - the
 * report and the helper's third leg prove a pinned case ran, passed and reached an assertion; they do not prove that
 * assertion is the one the row's clause needs (for example the AgentManager spies of row P1, or the six override arms of
 * row N8), so a body hollowed to another reachable assertion is not detected by this leg. MEASURED on the delivered bytes: emptying
 * the forbidden-name list of the streaming pin (const forbidden = [] as const, zero spies) leaves this census green, 53 of 53; deleting,
 * renaming, skipping, commenting out or stripping the assertions of a pinned case reads red (row N6, six single-edit mutants,
 * each 1 failed). (2) LABEL - "fixture pass" is a
 * judgment (the case runs over an injected fixture seam) that no report verifies.
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: the section "Tests", under its
 * unique level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, must render as
 * exactly its five frozen bullets. A dropped or reworded clause names its row. The drift falsifiers run over a SYNTHETIC
 * document built from the frozen bullets, never the live docs/04 text, so a legitimate edit of an unpinned section can
 * never redden a falsifier row.
 *
 * Frozen shape (owner standing order, rule 16): the table's own row/pin-level shape is pinned as literals in this file
 * (FROZEN_ROW_SHAPE, FROZEN_REQUIREMENTS, FROZEN_PINS, FROZEN_RECORDED), so deleting a pin, shortening a requirement label
 * or swapping a pin for an unrelated passing case reds the census even though judge() would still pass the remaining pins.
 *
 * Readings recorded (UNDETERMINED, owner-readable): (a) G1 - the h7r v2 operator receipt's one-agent preflight is an
 * instrument warm-up, not a receipted single-agent acceptance (owner ruling F11); it is named as nearest evidence only and
 * G1 carries no live pin. (b) V3 - the wb-dc0.1 transcript bounds (row count and per-row characters of what the host reads
 * back of a session) are pinned as the log size bound; no case bounds a persisted log file's bytes, and the row says so.
 * (c) W2 - no landed case makes a gate run against a wrong worktree or basis FAIL; the wb-a2g.11 Claude-host refusal is
 * the nearest evidence and is not a pin.
 *
 * This census binds cases only: no source, doc or other test file is edited, and the docs/14 and TRACEABILITY rows stay the
 * owner's pass.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, resolveTier, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs04-tests-census.census.ts";
const DOCS_FILE = "docs/workbench/04-claude-agent-sdk-executor.md";
const DOCS_PARENT = "04 — Claude Agent SDK execution host: detailed implementation";
const SECTION_HEADING = "Tests";
const TRACE_FILE = "docs/workbench/TRACEABILITY.md";
const RECEIPT_FILE = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";

/** docs/14 section "Truth labels and release gates": the labels a default-gate pin may carry (live labels need a live tier leg). */
const TRUTH_LABELS = ["code present", "fixture pass", "adversarial pass"] as const;
type Truth = (typeof TRUTH_LABELS)[number];
const LIVE_LABELS: readonly string[] = ["live SDK pass", "scale benchmark pass"];

type Status = "pinned" | "unpinned";
type Bullet = 1 | 2 | 3 | 4 | 5;

interface Pin {
  readonly file: string;
  /** Verbatim case title, exactly as registered (the literal template for an it.each pin). */
  readonly title: string;
  /** Recorded docs/14 judgment label; the vouching report is the default gate's for every pin of this census. */
  readonly tier: Truth;
  /** Exact enclosing describe path, outermost first, when the case sits under a describe the row relies on. */
  readonly suite?: readonly string[];
  /** Marks an it.each template pin. */
  readonly each?: number;
}

/** Evidence this leg RECORDS and never judges: a claude-live case or a probe script no forge command runs. */
interface Recorded {
  readonly file: string;
  /** The case title for a claude-live case; absent for a script. */
  readonly title?: string;
  readonly label: "live SDK pass" | "code present";
  /** The forge.toml command that runs it, or "none" when no command does. */
  readonly tier: "claude-live" | "none";
  /** The forge run ids TRACEABILITY.md records for a live label; empty for a script. */
  readonly cites: readonly string[];
  readonly note: string;
}

interface Row {
  readonly id: string;
  readonly bullet: Bullet;
  /** The exact fragment of the docs/04 bullet this row binds. */
  readonly requirement: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly recorded?: readonly Recorded[];
  /** Unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Unpinned rows: the nearest evidence, named and never a pin. */
  readonly nearest?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

/** The frozen docs/04 "Tests" bullets, as the markdown source says them. */
const BULLETS: readonly string[] = [
  "Golden real SDK single agent, parallel 3 agents, structured schema, successful resume.",
  "Negative: invalid model, absent credentials, malformed native output, stream error after partial text, aborted query, resumed unknown session, inaccessible cwd, invalid tool policy.",
  "Strict assertion that workflow agent() never calls Pi's createAgentSession/AgentManager under Claude backend.",
  "No false successful tool or domain verdict after SDK result error; transcript privacy and log size bounds.",
  "Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails.",
];
const EXPECTED_BLOCKS: readonly RenderedBlock[] = [{ kind: "list", ordered: false, items: BULLETS.map(text => ({ text, markdown: text })) }];

const HOST = "test/workbench-host-contract.test.ts";
const ADVERSE = "test/workbench-claude-adverse-faults.test.ts";
const CANCEL = "test/workbench-claude-cancel-faults.test.ts";
const STREAMING = "test/workbench-pi-streaming.test.ts";
const PI_LIVE = "test/workbench-claude-pi-live.test.ts";
const LIVE_CLAUDE = "qa/workbench/live-claude.mjs";
const LIVE_RESUME = "qa/workbench/live-resume.mjs";
const GATE_WORKTREE = "test/workflow-gate-worktree.test.ts";
const CAPABILITY = "test/workbench-claude-capability-tools.test.ts";
const DEGRADATION = "test/workbench-degradation-policy.test.ts";
const PRIVACY = "test/workbench-claude-transcript-privacy.test.ts";

const PI_LIVE_TITLE = "runs three parallel structured agents with actual sessions and no Pi manager invocation";
const PI_LIVE_CITES: readonly string[] = ["cmd_b5f4df13dd3b"];

const fixture = (file: string, title: string, suite?: readonly string[], each?: number): Pin => ({ file, title, tier: "fixture pass", ...(suite === undefined ? {} : { suite }), ...(each === undefined ? {} : { each }) });
const piLive = (note: string): Recorded => ({ file: PI_LIVE, title: PI_LIVE_TITLE, label: "live SDK pass", tier: "claude-live", cites: PI_LIVE_CITES, note });
const script = (file: string, note: string): Recorded => ({ file, label: "code present", tier: "none", cites: [], note });

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

const ADVERSE_N3 = ["N2/N3 malformed native output is never a success"] as const;
const ADVERSE_N4 = ["N6 a non-abort stream throw after partial text is failed, never cancelled"] as const;
const ADVERSE_N7 = ["N1 inaccessible cwd refuses before any query"] as const;
const ADVERSE_V1 = ["N8 error-subtype results are never a success"] as const;
const CANCEL_F3 = ["Claude host at the SDK boundary, through the fixture query seam", "F3 cancel after streamed assistant text, before the result message"] as const;

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  // ---- Bullet 1: golden real SDK ----------------------------------------------------------------------------------
  {
    id: "G1",
    bullet: 1,
    requirement: "single agent",
    status: "pinned",
    pins: [fixture(HOST, "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported")],
    gap: `No single-agent LIVE case exists: live-claude.mjs runs two parallel agents and the Pi live case runs three; neither is relabelled as the single-agent golden. Owner ruling F11: the h7r v2 operator receipt (${RECEIPT_FILE}, revision e07474a) one-agent preflight is an instrument warm-up, not a receipted single-agent acceptance, so it is named here as the nearest evidence only. G1 stays open until its own small receipted journey exists.`,
  },
  {
    id: "G2",
    bullet: 1,
    requirement: "parallel 3 agents",
    status: "pinned",
    pins: [fixture(STREAMING, "returns parallel structured values under distinct native session identities through registered Pi tool")],
    recorded: [piLive("The one live SDK pass: three parallel structured agents through the registered Pi tool, recorded in TRACEABILITY; judged by no report this leg reads (NATIVE-TITLE).")],
  },
  {
    id: "G3",
    bullet: 1,
    requirement: "structured schema",
    status: "pinned",
    pins: [fixture(HOST, "L3: parallel schema agents return object values from native SDK structured_output")],
    recorded: [script(LIVE_CLAUDE, "A live probe script no forge command runs; its only record is TRACEABILITY prose with no revision or command id, so it is code present, never a live pass.")],
  },
  {
    id: "G4",
    bullet: 1,
    requirement: "successful resume",
    status: "pinned",
    pins: [fixture(HOST, "L4: resumed role preserves the same system prompt and tools")],
    recorded: [script(LIVE_RESUME, "A live probe script no forge command runs; same record limit as live-claude.mjs, so code present, never a live pass.")],
  },
  // ---- Bullet 2: the eight negatives ------------------------------------------------------------------------------
  {
    id: "N1",
    bullet: 2,
    requirement: "invalid model",
    status: "pinned",
    pins: [fixture(STREAMING, "preserves native %s failure and never falls back to manager", undefined, 2)],
    gap: "The model rejection is an SDK-reported error result through the fixture seam; no case drives an unsupported model id through the resolved model alone.",
  },
  {
    id: "N2",
    bullet: 2,
    requirement: "absent credentials",
    status: "pinned",
    pins: [
      fixture(DEGRADATION, "D1a the host outcome is a typed, sanitized config error that names the auth prerequisite", ["D1 missing Claude auth is a clear typed config error, never a Pi-model answer"]),
      fixture(DEGRADATION, "D1b through runWorkflow the agent row carries the typed error, yields no value, and no Pi agent runs", ["D1 missing Claude auth is a clear typed config error, never a Pi-model answer"]),
    ],
    gap: "Flipped from unpinned when wb-cax.5 landed. The pins prove the absent-auth refusal over the injected fixture seam; no live case runs without credentials.",
  },
  {
    id: "N3",
    bullet: 2,
    requirement: "malformed native output",
    status: "pinned",
    pins: [
      fixture(ADVERSE, "N2: a declared schema with structured_output undefined reports missing structured_output", ADVERSE_N3),
      fixture(ADVERSE, "N3: a structured_output that fails schema.check reports did not match schema, with no text", ADVERSE_N3),
    ],
  },
  {
    id: "N4",
    bullet: 2,
    requirement: "stream error after partial text",
    status: "pinned",
    pins: [
      fixture(ADVERSE, "is ok:false with the query-failed prefix, the init session id, and a redacted diagnostic", ADVERSE_N4),
      fixture(ADVERSE, "a thrown non-Error value is stringified and redacted the same way", ADVERSE_N4),
    ],
  },
  {
    id: "N5",
    bullet: 2,
    requirement: "aborted query",
    status: "pinned",
    pins: [
      fixture(CANCEL, "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort"),
      fixture(CANCEL, "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure", CANCEL_F3),
    ],
  },
  {
    id: "N6",
    bullet: 2,
    requirement: "resumed unknown session",
    status: "pinned",
    pins: [fixture(HOST, "L4: unknown resume session refuses without invoking a new query")],
  },
  {
    id: "N7",
    bullet: 2,
    requirement: "inaccessible cwd",
    status: "pinned",
    pins: [
      fixture(ADVERSE, "a relative cwd yields the typed diagnostic and zero query() calls", ADVERSE_N7),
      fixture(ADVERSE, "a non-existent absolute cwd yields the typed diagnostic and zero query() calls", ADVERSE_N7),
    ],
  },
  {
    id: "N8",
    bullet: 2,
    requirement: "invalid tool policy",
    status: "pinned",
    pins: [fixture(CAPABILITY, "validates finite host policy and refuses wildcard or incomplete authority")],
    gap: "The curated MCP capability policy only (wildcard allow-list, over-cap allow-list, wildcard grants, relative workspace, empty principal, zero maxCalls). claude-host does not validate the SDK `tools` allowlist option itself, so no case refuses an invalid SDK tool list; the pin covers the capability tool policy and nothing wider. BODY-CONTENT residual: the report proves the case asserts, not that every override arm is still present.",
  },
  // ---- Bullet 3: never Pi under the Claude backend ----------------------------------------------------------------
  {
    id: "P1",
    bullet: 3,
    requirement: "never calls Pi's createAgentSession/AgentManager under Claude backend",
    status: "pinned",
    pins: [
      fixture(STREAMING, "returns parallel structured values under distinct native session identities through registered Pi tool"),
      fixture(STREAMING, "preserves native %s failure and never falls back to manager", undefined, 2),
    ],
    recorded: [piLive("The live case spies AgentManager.prototype across three parallel Claude agents; judged by no report this leg reads (NATIVE-TITLE).")],
    gap: "The streaming pins spy AgentManager.prototype (spawn, spawnAndWait, resume) through the registered Pi tool and assert every spy untouched. host-contract L3 is deliberately NOT a pin: its local manager mock is never injected into the host, so its not-called assertions are vacuous. No case asserts createAgentSession specifically. BODY-CONTENT residual: the report proves the pinned cases ran and asserted, not that the spy assertion is still the one that ran; the spy target import is checked at AST level only.",
  },
  // ---- Bullet 4: no false verdict, privacy, log bounds ------------------------------------------------------------
  {
    id: "V1",
    bullet: 4,
    requirement: "No false successful tool or domain verdict after SDK result error",
    status: "pinned",
    pins: [
      fixture(ADVERSE, "an error subtype with is_error:false is still not a success", ADVERSE_V1),
      fixture(HOST, "L4: error result after partial assistant never becomes success"),
    ],
  },
  {
    id: "V2",
    bullet: 4,
    requirement: "transcript privacy",
    status: "pinned",
    pins: [
      fixture(PRIVACY, "T1: tool bodies and thinking never enter rows, placeholders are exact"),
      fixture(PRIVACY, "T3: no credential survives any separator shape, on string content and on a text part, through the helper itself"),
    ],
    gap: "Flipped from unpinned when wb-dc0.1 landed. The pins prove the transcript adapter's rows carry no tool body, no thinking and no credential over fixture SessionMessage shapes; the SDK is never executed.",
  },
  {
    id: "V3",
    bullet: 4,
    requirement: "log size bounds",
    status: "pinned",
    pins: [
      fixture(PRIVACY, "T2: bounds are exported single-carrier constants with unchanged values"),
      fixture(PRIVACY, "T2e (wb-idq): the bounded window is the TAIL of the chain, where the rows hosts list as evidence live: a 45-message chain read at 40 keeps messages 5..44"),
    ],
    gap: "UNDETERMINED reading, owner-readable: the pins bound what the host reads back of a session transcript (row count and per-row characters). No case bounds a persisted log file's bytes, so the row stays a transcript-read bound and claims no more; the observer cap in workbench-claude-observer.test.ts bounds projected samples and is not accepted here.",
  },
  // ---- Bullet 5: gate on the exact child basis --------------------------------------------------------------------
  {
    id: "W1",
    bullet: 5,
    requirement: "Gate executes against exact child candidate basis, before cleanup",
    status: "pinned",
    pins: [fixture(GATE_WORKTREE, "runs the gate inside the child's worktree, while it still exists", ["gate on an isolated child"])],
    gap: "The Pi workflow host (createWorkflowHost) gate path only: exact worktree cwd, gate ran before teardown. The Claude host refuses worktree isolation and gates (wb-a2g.11), so a Claude-host child basis gate has no case.",
  },
  {
    id: "W2",
    bullet: 5,
    requirement: "worktree mismatch fails",
    status: "unpinned",
    pins: [],
    reason:
      "No landed case makes a gate run against the wrong worktree or basis FAIL: workflow-gate-worktree asserts cwd equality on the happy path and a failing gate's own output, never a basis mismatch, and workflow-isolated only forwards the isolated flag. Stays unpinned until a case with a mismatched worktree or basis lands.",
    nearest:
      "test/workbench-claude-host-degradation.test.ts (wb-a2g.11, landed): the Claude host refuses isolation and gates outright rather than running one against a wrong basis. That is a refusal, not a mismatch detection, so it is named here and never accepted as a pin.",
  },
]);

/** Expected census outcome: promoting a row (or losing one) is an edit to this file, never silent. */
const SATISFIED: readonly string[] = ["G1", "G2", "G3", "G4", "N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "P1", "V1", "V2", "V3", "W1"];
/** Every unpinned row, in table order; a seat that lands a case flips the row consciously and edits this list. */
const NOT_SATISFIED: readonly string[] = ["W2"];
const EXPECTED_BULLET_COUNTS: readonly number[] = [4, 8, 1, 3, 2];

/** FROZEN SHAPE (rule 16): row id : bullet : judged pin count : recorded count, in table order. Deleting a pin of any row reds it. */
const FROZEN_ROW_SHAPE: readonly string[] = [
  "G1:1:1:0",
  "G2:1:1:1",
  "G3:1:1:1",
  "G4:1:1:1",
  "N1:2:1:0",
  "N2:2:2:0",
  "N3:2:2:0",
  "N4:2:2:0",
  "N5:2:2:0",
  "N6:2:1:0",
  "N7:2:2:0",
  "N8:2:1:0",
  "P1:3:2:1",
  "V1:4:2:0",
  "V2:4:2:0",
  "V3:4:2:0",
  "W1:5:1:0",
  "W2:5:0:0",
];
/** FROZEN SHAPE: every requirement label, so shortening or swapping one reds it. */
const FROZEN_REQUIREMENTS: readonly string[] = [
  "G1=single agent",
  "G2=parallel 3 agents",
  "G3=structured schema",
  "G4=successful resume",
  "N1=invalid model",
  "N2=absent credentials",
  "N3=malformed native output",
  "N4=stream error after partial text",
  "N5=aborted query",
  "N6=resumed unknown session",
  "N7=inaccessible cwd",
  "N8=invalid tool policy",
  "P1=never calls Pi's createAgentSession/AgentManager under Claude backend",
  "V1=No false successful tool or domain verdict after SDK result error",
  "V2=transcript privacy",
  "V3=log size bounds",
  "W1=Gate executes against exact child candidate basis, before cleanup",
  "W2=worktree mismatch fails",
];
/** FROZEN SHAPE: every judged pin's identity (row, file, title), so swapping a pin for an unrelated passing case reds it. */
const FROZEN_PINS: readonly string[] = [
  "G1|test/workbench-host-contract.test.ts|L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
  "G2|test/workbench-pi-streaming.test.ts|returns parallel structured values under distinct native session identities through registered Pi tool",
  "G3|test/workbench-host-contract.test.ts|L3: parallel schema agents return object values from native SDK structured_output",
  "G4|test/workbench-host-contract.test.ts|L4: resumed role preserves the same system prompt and tools",
  "N1|test/workbench-pi-streaming.test.ts|preserves native %s failure and never falls back to manager",
  "N2|test/workbench-degradation-policy.test.ts|D1a the host outcome is a typed, sanitized config error that names the auth prerequisite",
  "N2|test/workbench-degradation-policy.test.ts|D1b through runWorkflow the agent row carries the typed error, yields no value, and no Pi agent runs",
  "N3|test/workbench-claude-adverse-faults.test.ts|N2: a declared schema with structured_output undefined reports missing structured_output",
  "N3|test/workbench-claude-adverse-faults.test.ts|N3: a structured_output that fails schema.check reports did not match schema, with no text",
  "N4|test/workbench-claude-adverse-faults.test.ts|is ok:false with the query-failed prefix, the init session id, and a redacted diagnostic",
  "N4|test/workbench-claude-adverse-faults.test.ts|a thrown non-Error value is stringified and redacted the same way",
  "N5|test/workbench-claude-cancel-faults.test.ts|F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort",
  "N5|test/workbench-claude-cancel-faults.test.ts|F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
  "N6|test/workbench-host-contract.test.ts|L4: unknown resume session refuses without invoking a new query",
  "N7|test/workbench-claude-adverse-faults.test.ts|a relative cwd yields the typed diagnostic and zero query() calls",
  "N7|test/workbench-claude-adverse-faults.test.ts|a non-existent absolute cwd yields the typed diagnostic and zero query() calls",
  "N8|test/workbench-claude-capability-tools.test.ts|validates finite host policy and refuses wildcard or incomplete authority",
  "P1|test/workbench-pi-streaming.test.ts|returns parallel structured values under distinct native session identities through registered Pi tool",
  "P1|test/workbench-pi-streaming.test.ts|preserves native %s failure and never falls back to manager",
  "V1|test/workbench-claude-adverse-faults.test.ts|an error subtype with is_error:false is still not a success",
  "V1|test/workbench-host-contract.test.ts|L4: error result after partial assistant never becomes success",
  "V2|test/workbench-claude-transcript-privacy.test.ts|T1: tool bodies and thinking never enter rows, placeholders are exact",
  "V2|test/workbench-claude-transcript-privacy.test.ts|T3: no credential survives any separator shape, on string content and on a text part, through the helper itself",
  "V3|test/workbench-claude-transcript-privacy.test.ts|T2: bounds are exported single-carrier constants with unchanged values",
  "V3|test/workbench-claude-transcript-privacy.test.ts|T2e (wb-idq): the bounded window is the TAIL of the chain, where the rows hosts list as evidence live: a 45-message chain read at 40 keeps messages 5..44",
  "W1|test/workflow-gate-worktree.test.ts|runs the gate inside the child's worktree, while it still exists",
];
/** FROZEN SHAPE: every recorded (never judged) entry, with its label and tier. */
const FROZEN_RECORDED: readonly string[] = [
  "G2|test/workbench-claude-pi-live.test.ts|live SDK pass|claude-live",
  "G3|qa/workbench/live-claude.mjs|code present|none",
  "G4|qa/workbench/live-resume.mjs|code present|none",
  "P1|test/workbench-claude-pi-live.test.ts|live SDK pass|claude-live",
];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** Every row that holds pins, with its pins as the helper's CasePin: all default-gate (the report this leg reads). */
const casePin = (entry: Pin): CasePin => ({
  file: entry.file,
  title: entry.title,
  tier: DEFAULT_GATE_TIER,
  ...(entry.suite === undefined ? {} : { suite: entry.suite }),
  ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }),
});
const JUDGED = ROWS.filter(row => row.pins.length > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/** The rendered text of each bullet of a found section ("" for a missing one). */
function renderedBullets(found: ReturnType<typeof docsSection>): readonly string[] {
  const list = found.blocks.find(block => block.kind === "list");
  return list?.kind === "list" ? list.items.map(item => item.text) : [];
}

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row requirement checks read the section's
 * rendered bullets and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string): string[] {
  const found = docsSection(markdown, SECTION_HEADING, 2, [DOCS_PARENT]);
  if (!found.ok) return [`${DOCS_FILE} § ${SECTION_HEADING}: the section is refused: ${found.why}`];
  const out: string[] = [];
  const bullets = renderedBullets(found);
  for (const row of ROWS) {
    if (!(bullets[row.bullet - 1] ?? "").includes(row.requirement)) out.push(`row ${row.id}: its clause "${row.requirement}" no longer renders in bullet ${row.bullet} of ${DOCS_FILE} § ${SECTION_HEADING}`);
  }
  const exact = sectionMatches(found, EXPECTED_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${SECTION_HEADING} is not exactly its frozen bullets: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bullets under the real heading shape, never the live text. */
const synthetic = (edit: (body: string) => string = body => body, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Intent\n\nOther text.\n\n## ${SECTION_HEADING}\n\n${edit(BULLETS.map(bullet => `- ${bullet}`).join("\n"))}\n${tail}`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-a2g.13 docs/04 Tests census (report mode): the table and the requirement text", () => {
  it("AC1: the table holds the eighteen frozen rows (4 + 8 + 1 + 3 + 2), deeply frozen, with unique ids", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS).toHaveLength(18);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(18);
    expect([1, 2, 3, 4, 5].map(bullet => ROWS.filter(row => row.bullet === bullet).length)).toEqual(EXPECTED_BULLET_COUNTS);
  });

  it("AC1 frozen shape: every row's id, bullet, judged-pin count and recorded count are the literal list (a deleted pin, in any row, reds this)", () => {
    expect(ROWS.map(row => `${row.id}:${row.bullet}:${row.pins.length}:${(row.recorded ?? []).length}`)).toEqual([...FROZEN_ROW_SHAPE]);
  });

  it("AC1 frozen shape: every row's requirement label is the literal list (a shortened or swapped label reds this)", () => {
    expect(ROWS.map(row => `${row.id}=${row.requirement}`)).toEqual([...FROZEN_REQUIREMENTS]);
  });

  it("AC1 frozen shape: every judged pin's identity is the literal list (a pin swapped for an unrelated passing case reds this)", () => {
    expect(ROWS.flatMap(row => row.pins.map(entry => `${row.id}|${entry.file}|${entry.title}`))).toEqual([...FROZEN_PINS]);
  });

  it("AC1 frozen shape: every recorded entry's file, label and tier are the literal list", () => {
    expect(ROWS.flatMap(row => (row.recorded ?? []).map(entry => `${row.id}|${entry.file}|${entry.label}|${entry.tier}`))).toEqual([...FROZEN_RECORDED]);
  });

  it("AC1: the Tests section renders exactly its five frozen bullets (HTML-free, whole-section equality) and every row's clause renders in its own bullet", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    const found = docsSection(readRepo(DOCS_FILE), SECTION_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(found, EXPECTED_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(renderedBullets(found)).toEqual([...BULLETS]);
  });

  it("AC3: a pinned row holds pins and no reason, an unpinned row holds a reason and no pins, and a pin's label is a default-gate docs/14 label", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `row ${row.id}: a pinned row has pins`).toBeGreaterThan(0);
        expect(row.reason, `row ${row.id}: a pinned row carries no unpinned reason`).toBeUndefined();
      } else {
        expect(row.pins, `row ${row.id}: an unpinned row carries no pins`).toEqual([]);
        expect(row.recorded ?? [], `row ${row.id}: an unpinned row carries no recorded evidence`).toEqual([]);
        expect((row.reason ?? "").trim().length, `row ${row.id}: an unpinned row needs a written reason`).toBeGreaterThan(40);
      }
      for (const entry of row.pins) {
        expect(TRUTH_LABELS, `row ${row.id}: ${entry.title}`).toContain(entry.tier);
        expect(LIVE_LABELS, `row ${row.id}: a live label needs a live tier leg, which a judged default-gate pin never has`).not.toContain(entry.tier);
      }
    }
  });

  it("AC3: the satisfied and unpinned rows are exactly the expected lists, so no unpinned row is ever counted as passed", () => {
    expect(ROWS.filter(row => row.status === "pinned").map(row => row.id)).toEqual(SATISFIED);
    expect(ROWS.filter(row => row.status === "unpinned").map(row => row.id)).toEqual(NOT_SATISFIED);
    const w2 = ROWS.find(row => row.id === "W2");
    expect(w2?.reason).toContain("basis mismatch");
    expect(w2?.nearest).toContain("wb-a2g.11");
  });

  it("AC3: the half-coverage gaps and the owner readings are written on their rows", () => {
    const gap = (id: string): string => ROWS.find(row => row.id === id)?.gap ?? "";
    expect(gap("G1")).toContain("F11");
    expect(gap("G1")).toContain("e07474a");
    expect(gap("N8")).toContain("SDK `tools` allowlist");
    expect(gap("P1")).toContain("vacuous");
    expect(gap("P1")).toContain("createAgentSession");
    expect(gap("V3")).toContain("UNDETERMINED");
    expect(gap("W1")).toContain("wb-a2g.11");
    expect(existsSync(join(ROOT, RECEIPT_FILE)), `${RECEIPT_FILE} is the nearest evidence G1 names`).toBe(true);
  });

  it("AC3: no judged pin is another bead's census, a live-tier file or a census-tier file", () => {
    const pinnedFiles = ROWS.flatMap(row => row.pins.map(entry => entry.file));
    expect(pinnedFiles.some(file => file.endsWith(".census.ts"))).toBe(false);
    expect(pinnedFiles.some(file => file.includes("census"))).toBe(false);
    expect(pinnedFiles).not.toContain(PI_LIVE);
  });

  it.each(JUDGED)("AC2 row $id: every pinned case is collected, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(
      REPORT,
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC3 tier truth: the live label is carried only by recorded claude-live entries that cite a recorded forge run, and a script is never a live pass", () => {
    const trace = readRepo(TRACE_FILE);
    const recorded = ROWS.flatMap(row => (row.recorded ?? []).map(entry => ({ row, entry })));
    expect(recorded.length).toBe(FROZEN_RECORDED.length);
    for (const { row, entry } of recorded) {
      if (entry.label === "live SDK pass") {
        expect(entry.tier, `row ${row.id}: a live label names the tier that runs it`).toBe("claude-live");
        expect(entry.cites.length, `row ${row.id}: a live label cites its recorded run`).toBeGreaterThan(0);
        for (const cite of entry.cites) expect(trace, `row ${row.id}: ${TRACE_FILE} records ${cite}`).toContain(cite);
      } else {
        expect(entry.tier, `row ${row.id}: ${entry.file} is run by no forge command`).toBe("none");
        expect(entry.cites, `row ${row.id}: a code-present script cites no run`).toEqual([]);
      }
    }
    const forge = readRepo("forge.toml");
    expect(forge).not.toContain(LIVE_CLAUDE);
    expect(forge).not.toContain(LIVE_RESUME);
  });

  it("AC3 tier truth: the claude-live case is a claude-live file judged by no report this leg reads: the tier resolves to its config, the default config excludes it, the default report does not hold it", () => {
    for (const file of [PI_LIVE, LIVE_CLAUDE, LIVE_RESUME]) expect(existsSync(join(ROOT, file)), `${file} exists`).toBe(true);
    const tier = resolveTier(ROOT, "claude-live");
    expect(tier.ok, tier.why).toBe(true);
    expect(tier.argv).toEqual(["run", "--config", "vitest.claude-live.config.ts"]);
    expect(readRepo("vitest.claude-live.config.ts")).toContain(PI_LIVE);
    expect(readRepo("vitest.config.ts")).toContain(`"${PI_LIVE}"`);
    const [asLive] = judge(REPORT, [{ file: PI_LIVE, title: PI_LIVE_TITLE, tier: "claude-live" }]);
    expect(asLive?.code, "a claude-live pin is never carried by the default report").toBe("tier-mismatch");
    const [asDefault] = judge(REPORT, [{ file: PI_LIVE, title: PI_LIVE_TITLE, tier: DEFAULT_GATE_TIER }]);
    expect(asDefault?.code, "the live file is not in the default gate's report").toBe("not-collected");
  });

  it("AC4: P1 names the AgentManager spy target at AST level: the streaming file imports AgentManager from the source module (BODY-CONTENT stays a named residual)", () => {
    const structure = sourceStructure(ROOT, STREAMING);
    expect(structure.ok, structure.why).toBe(true);
    const manager = structure.imports.filter(entry => entry.module === "../src/agent-manager.js" && !entry.typeOnly).flatMap(entry => entry.names);
    expect(manager).toContain("AgentManager");
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

describe("wb-a2g.13 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.id === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("N6");
    const wrong = { ...entry, title: entry.title.replace("refuses", "refusEs") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row N6");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the satisfied list no longer matches)", () => {
    expect(ROWS.filter(row => row.status === "pinned" && row.id !== "V2").map(row => row.id)).not.toEqual(SATISFIED);
  });

  it("M3: a pin promoted without a title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("N8");
    const [verdict] = judge(REPORT, [casePin({ ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a pin pointed at a file the default gate never ran is red, not collected", () => {
    const { entry } = firstPin("W1");
    const [verdict] = judge(REPORT, [casePin({ ...entry, file: "test/workbench-no-such-file.test.ts" })]);
    expect(verdict?.ok).toBe(false);
    expect(["unreadable", "not-collected", "unmapped-location", "absent"]).toContain(verdict?.code);
  });

  it("M5: a pin relabelled to a non-default tier is refused by the default report, never carried from a title's presence", () => {
    const { entry } = firstPin("N5");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "claude-live" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M6: a row's pins judged against a report that does not hold them are all red (an empty report cannot pass)", () => {
    const { row } = firstPin("V2");
    const verdicts = judge(
      join(ROOT, ".forge", "no-such-report.json"),
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts.every(verdict => !verdict.ok)).toBe(true);
  });

  it("M7: a pinned describe path altered is red (the enclosing suite is part of the pin)", () => {
    const { entry } = firstPin("N7");
    const [verdict] = judge(REPORT, [casePin({ ...entry, suite: ["N1 inaccessible cwd refuses before ANY query"] })]);
    expect(verdict?.ok).toBe(false);
  });
});

describe("wb-a2g.13 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(synthetic(undefined, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("K1 names row N2 (and only it) when its clause is dropped from the negatives bullet", () => {
    const lines = docsFailures(synthetic(body => body.replace("absent credentials, ", "")));
    expect(named(lines)).toEqual(["row N2"]);
    expect(lines.some(line => line.includes("not exactly its frozen bullets"))).toBe(true);
  });

  it("K2 names row P1 (and only it) when the never-Pi sentence is weakened", () => {
    expect(named(docsFailures(synthetic(body => body.replace("never calls Pi's", "may call Pi's"))))).toEqual(["row P1"]);
  });

  it("K3 names row W2 (and only it) when the worktree-mismatch clause is dropped", () => {
    expect(named(docsFailures(synthetic(body => body.replace("; worktree mismatch fails", ""))))).toEqual(["row W2"]);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to a bullet", () => {
    const lines = docsFailures(synthetic(body => body.replace("successful resume.", "successful resume. Unless the host says otherwise.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen bullets");
  });

  it("D1b goes red on the section when a weakening bullet is appended inside it", () => {
    const lines = docsFailures(synthetic(body => `${body}\n- A host may skip these tests.`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen bullets");
  });

  it("D2 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${SECTION_HEADING}`, "## Test notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(body => `${body}\n\n### Exceptions\n\nA host may skip these tests.`));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D4 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${SECTION_HEADING}`, `# Appendix\n\n## ${SECTION_HEADING}`));
    expect(lines.some(line => line.includes("the section is refused"))).toBe(true);
  });

  it("D5 (unique heading) goes red when a decoy second Tests section is added, so a weakened real section cannot hide behind it", () => {
    const lines = docsFailures(synthetic(undefined, `\n## ${SECTION_HEADING}\n\n${BULLETS.map(bullet => `- ${bullet}`).join("\n")}\n`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("occurs 2 times");
  });

  it("D6 goes red when bullet 3 is split off the list into a paragraph (a non-bullet is not the frozen list)", () => {
    const lines = docsFailures(synthetic(body => body.replace("- Strict assertion", "\nStrict assertion").replace("backend.\n- No false", "backend.\n\n- No false")));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D7 names the clause row when it is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(body => body.replace("aborted query, ", "<!-- aborted query, -->")));
    expect(named(lines)).toContain("row N5");
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D8 (same-view): a verbatim archived copy of the section inside an HTML comment cannot stand in for the real section once a clause is dropped", () => {
    const hidden = `<!--\n## ${SECTION_HEADING}\n\n${BULLETS.map(bullet => `- ${bullet}`).join("\n")}\n-->\n`;
    const weakened = synthetic(body => body.replace("absent credentials, ", "")).replace(`## ${SECTION_HEADING}`, `${hidden}\n## ${SECTION_HEADING}`);
    expect(named(docsFailures(weakened))).toEqual(["row N2"]);
    expect(docsFailures(synthetic().replace(`## ${SECTION_HEADING}`, `${hidden}\n## ${SECTION_HEADING}`))).toEqual([]);
  });

  it("an edit of an unpinned section never reddens a row: the Intent section is free to change", () => {
    expect(docsFailures(synthetic().replace("Other text.", "Changed text."))).toEqual([]);
  });
});
