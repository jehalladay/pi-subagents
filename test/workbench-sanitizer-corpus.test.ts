/**
 * wb-952 respin: ONE shared helper, sanitizeWorkbenchText in src/workbench/redaction.ts, normalizes, redacts and strips every
 * display path. The table-driven corpus below runs through the helper, every exported sanitizer and the public function of every
 * census site on trunk. Rulings pinned, quoted from the bead notes:
 * - 12:10Z FIX SHAPE: "normalize once: whitespace controls (\t \n \r \f \v) become ONE space; ALL other C0/C1, bidi, zero-width
 *   AND default-ignorable characters are DELETED, then redact once ... then strip once for display. No count ties, no
 *   spaced-form fallback (U6 resolved by construction)." REQUIRED REDS: "the U5 glued-after-newline regression cases (G1-G3,
 *   D1) and the split-KEYWORD corpus from the seat probe."
 * - 16:44Z POLICY: "U+FEFF, U+0085, NUL, and ANY default-ignorable or control code point that can split a token, are
 *   SEPARATORS: normalized to ONE space BEFORE any deletion, so credential regexes always see boundaries. DELETION NEVER
 *   PRECEDES REDACTION." The corpus "carries these three beside the three d6446db glue cases ... and the transcript-class
 *   multiline/preserve-lines mode (16:05Z)".
 * - 16:07Z HELPER BINDING: "a multiline / preserve-lines mode: whole-text redaction FIRST, then per-line strip of dangerous
 *   controls with LF row structure preserved and zero-width deleted. Newline collapse is for single-line display labels only."
 * - 17:32Z POLICY REFINEMENT: "the 16:44Z separators-before-deletion rule applies BETWEEN token boundaries; deletion of
 *   default-ignorables WITHIN a token must never create splits - position-aware normalization is the ruled shape, not a
 *   uniform pass." The acceptance set grows by the G10/G11 trade corpus of the wb-752.2 respin gate, the F2 correction and
 *   the wb-0kg.6 known-residual rows; observe-query.ts clean() is SITE 22.
 * Seat rule F11: every invisible or control code point here is built with String.fromCodePoint; none is typed raw or as a
 * four-digit escape.
 */
import { createHash } from "node:crypto";
import type { LogsReadDto, Response } from "@furnace/sdk";
import { describe, expect, it } from "vitest";
import { safeWorkflowTerminalText } from "../src/ui/workflow-card.js";
import { type InspectorModel, initialInspectorState, layoutInspector } from "../src/ui/workflow-inspector.js";
import { ATTENTION_CLOCK_CAVEAT, ATTENTION_CONTRACT, type AttentionReport, selectAttention } from "../src/workbench/attention.js";
import { type BeadsReadClient, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import { type CapabilityDescriptor, CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { readClaudeMessageEvidence } from "../src/workbench/claude-evidence.js";
import { type ClaudeTopologyInput, projectClaudeTopology } from "../src/workbench/claude-topology.js";
import type { WorkflowSource } from "../src/workbench/designer.js";
import { projectDetachedReading } from "../src/workbench/detached-observer.js";
import { type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { buildWorkflowExecuteReply, decideExecute, EXECUTE_GRANT, type ExecuteDecision, type LaunchOutcome, type WorkflowExecuteRequest } from "../src/workbench/execute.js";
import { readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { FurnaceHostedExecutor, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { selectLatencyDecomposition } from "../src/workbench/latency.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type ObservedNode, type Relation } from "../src/workbench/observation.js";
import { type ObserveReader, observeInvocation } from "../src/workbench/observe-query.js";
import { proposeWorkflowPatch } from "../src/workbench/patch-proposal.js";
import { redactWorkbenchText, sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";
import { buildOperationsTelemetry } from "../src/workbench/telemetry.js";
import { buildTimelineLanes, type TimelineReader } from "../src/workbench/timeline.js";
import { buildWorkflowCatalogReply, buildWorkflowInspectReply, type CapabilityCatalogEntry } from "../src/workbench/tool-replies.js";
import { selectLinkedTopology } from "../src/workbench/topology-slice.js";

const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const TAB = cp(0x09);
const LF = cp(0x0a);
const CR = cp(0x0d);
const ESC = cp(0x1b);
const NEL = cp(0x85);
const ZWSP = cp(0x200b);
const ZWJ = cp(0x200d);
const LRM = cp(0x200e);
const RLM = cp(0x200f);
const LS = cp(0x2028);
const RLO = cp(0x202e);
const WJ = cp(0x2060);
const BOM = cp(0xfeff);
const LONE_HIGH = cp(0xd800);

/** Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates. */
const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}

const IGNORABLES = [0xad, 0x2061, 0x180e, 0x34f, 0xfe0f, 0x200e, 0xe0041, 0x61c];

/** One code point or sequence of each gap class the helper may read as a separator or as glue. */
const CLASS_UNIT = { quiet: BOM, control: BEL, escape: `${ESC}[0m`, invisible: ZWSP } as const;
type GapClassName = keyof typeof CLASS_UNIT;
const GAP_CLASS_NAMES: readonly GapClassName[] = ["quiet", "control", "escape", "invisible"];
/** Every choice of at most two separator classes: a bearer credential forces a separator in at most two positions. */
const SEPARATOR_CHOICES: readonly (readonly GapClassName[])[] = [
  [],
  ...GAP_CLASS_NAMES.flatMap((first, index) => [[first], ...GAP_CLASS_NAMES.slice(index + 1).map(second => [first, second])]),
];
/**
 * A bearer credential exposed only when the chosen classes separate (the boundary before the scheme and the space after
 * it) while every other class sits glued inside the scheme, so no uniform choice for a class exposes the others.
 */
function classProbe(separators: readonly GapClassName[], index: number): Probe {
  const glue = GAP_CLASS_NAMES.filter(name => !separators.includes(name)).map(name => CLASS_UNIT[name]);
  const scheme = [..."Bearer"].map((letter, at) => `${letter}${glue[at] ?? ""}`).join("");
  const before = separators[0] === undefined ? "" : `x${CLASS_UNIT[separators[0]]}`;
  const after = separators[1] === undefined ? " " : CLASS_UNIT[separators[1]];
  return { id: `C${index} separators {${separators.join(",")}}`, raw: `${before}${scheme}${after}CLASSTOKEN${index}`, secrets: [`CLASSTOKEN${index}`] };
}

const CORPUS: readonly Probe[] = [
  // The seat probe corpus named by the gate (U4, /tmp/fw-g1r3-g1g1-scripts/redaction-probe.mjs).
  { id: "S1 bearer", raw: "Authorization: Bearer abc123", secrets: ["abc123"] },
  { id: "S2 bearer wrapped in SGR", raw: `Authorization: ${ESC}[1mBearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "S3 SGR after the scheme", raw: `Authorization: Bearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "S4 ZWSP inside the scheme", raw: `token: Bear${ZWSP}er abc123`, secrets: ["abc123"] },
  { id: "S5 json api_key", raw: '{"api_key":"xyz"}', secrets: ["xyz"] },
  { id: "S6 SGR around the keyword", raw: `${ESC}[33mapi_key${ESC}[0m=xyz`, secrets: ["xyz"] },
  // Split KEYWORD (gate U1/U3): an invisible inside the keyword itself.
  { id: "K1 BEL inside password", raw: `pass${BEL}word=hunter2`, secrets: ["hunter2"] },
  { id: "K2 RLO inside password", raw: `pass${RLO}word=hunter2`, secrets: ["hunter2"] },
  { id: "K3 BEL inside the scheme", raw: `Authorization: Bear${BEL}er abc123`, secrets: ["abc123"] },
  { id: "K4 ZWJ inside password", raw: `pass${ZWJ}word=hunter2`, secrets: ["hunter2"] },
  { id: "K5 WJ inside api_key", raw: `api${WJ}_key=xyz789`, secrets: ["xyz789"] },
  { id: "K6 BEL inside password, spaced colon", raw: `pass${BEL}word : SPACEDSECRET`, secrets: ["SPACEDSECRET"] },
  { id: "K7 ZWSP inside password, quoted value with a space", raw: `pass${ZWSP}word="two QUOTEDSECRET"`, secrets: ["QUOTEDSECRET"] },
  { id: "K8 ZWSP inside a JSON key", raw: `{"pass${ZWSP}word":"JSONSPLITSECRET"}`, secrets: ["JSONSPLITSECRET"] },
  // U5 glued-after-newline regressions of the first delivery (G1-G3, D1).
  { id: "G1 key after LF", raw: `first line${LF}sk-ant-api03-GLUEONE`, secrets: ["GLUEONE"] },
  { id: "G2 key after TAB", raw: `col1${TAB}ghp_GLUETWO`, secrets: ["GLUETWO"] },
  { id: "G3 key after CRLF", raw: `done${CR}${LF}github_pat_GLUETHREE`, secrets: ["GLUETHREE"] },
  { id: "D1 key after BEL", raw: `key${BEL}sk-ant-GLUEFOUR`, secrets: ["GLUEFOUR"] },
  // The three glue cases the wb-dc0.1 gate measured on d6446db (16:03Z F5).
  { id: "E1 token line then key", raw: `token: x${LF}sk-ant-api03-ENTRYONE`, secrets: ["ENTRYONE"] },
  { id: "E2 auth line then bearer", raw: `auth${LF}Bearer ENTRYTWO`, secrets: ["ENTRYTWO"] },
  { id: "E3 bearer TAB token", raw: `Bearer${TAB}ENTRYTHREE`, secrets: ["ENTRYTHREE"] },
  // 16:44Z separator policy (wb-752.2 gate F3).
  { id: "P1 BOM separator", raw: `Authorization: Bearer${BOM}SEPONE`, secrets: ["SEPONE"] },
  { id: "P2 NEL separator", raw: `Authorization: Bearer${NEL}SEPTWO`, secrets: ["SEPTWO"] },
  { id: "P3 NUL separator", raw: `Authorization: Bearer${NUL}SEPTHREE`, secrets: ["SEPTHREE"] },
  { id: "P4 line separator", raw: `token: x${LS}sk-ant-api03-SEPFOUR`, secrets: ["SEPFOUR"] },
  // U6: one input needing both readings at once; no count tie can pick one.
  { id: "U6 separator and glue together", raw: `x${BEL}sk-ant-TIESECRETAAAA pass${BEL}word=hunter2`, secrets: ["TIESECRETAAAA", "hunter2"] },
  // U7: default-ignorables inside a credential.
  ...IGNORABLES.map((code, index) => ({
    id: `I${index + 1} U+${code.toString(16).toUpperCase()} inside a key`,
    raw: `sk-ant-aaaa${cp(code)}TAILIGNORABLE${index + 1}`,
    secrets: [`TAILIGNORABLE${index + 1}`],
  })),
  // Prefix splits (wb-752.4 control-reply and wb-69g.5 execute reply probes).
  { id: "Z1 ZWSP after the prefix", raw: `sk-ant-${ZWSP}ZEROWIDTHSECRET`, secrets: ["ZEROWIDTHSECRET"] },
  { id: "Z2 LRM inside ghp_", raw: `gh${LRM}p_PREFIXSPLITSECRET`, secrets: ["PREFIXSPLITSECRET"] },
  { id: "Z3 RLM inside sk-ant-", raw: `sk-${RLM}ant-RLMSECRET`, secrets: ["RLMSECRET"] },
  { id: "Z4 BOM inside github_pat_", raw: `github${BOM}_pat_BOMSECRET`, secrets: ["BOMSECRET"] },
  { id: "Z5 lone surrogate inside a key", raw: `sk-ant-aaaa${LONE_HIGH}SURROGATETAIL`, secrets: ["SURROGATETAIL"] },
  // A separator and a glued keyword in one input.
  { id: "M1 LF then BEL inside the scheme", raw: `x${LF}Bear${BEL}er MIXEDSECRET`, secrets: ["MIXEDSECRET"] },
  // A zero-width space as a separator: base redacted it, deleting it first glues the key (16:44Z: it can split a token).
  { id: "Y1 ZWSP before a key", raw: `key${ZWSP}sk-ant-ZWSEPSECRET`, secrets: ["ZWSEPSECRET"] },
  // Position-aware (17:32Z): the SAME unit separates two tokens and sits glued inside a keyword, prefix, key or token, so no
  // uniform reading of its class exposes the credential.
  { id: "X1 ZWSP before and inside the scheme", raw: `x${ZWSP}Bea${ZWSP}rer MIXONESECRET`, secrets: ["MIXONESECRET"] },
  { id: "X2 ZWSP before and inside ghp_", raw: `see${ZWSP}gh${ZWSP}p_MIXTWOSECRET`, secrets: ["MIXTWOSECRET"] },
  { id: "X3 BOM inside the scheme and as its space", raw: `Authorization: Bea${BOM}rer${BOM}MIXTHREESECRET`, secrets: ["MIXTHREESECRET"] },
  { id: "X4 BEL before, inside and after the scheme", raw: `x${BEL}Bear${BEL}er${BEL}MIXFOURSECRET`, secrets: ["MIXFOURSECRET"] },
  { id: "X5 RLO before the scheme and inside its token", raw: `x${RLO}Bearer SEC${RLO}MIXFIVESECRET`, secrets: ["MIXFIVESECRET"] },
  { id: "X6 ZWSP ends a key token and splits the next key name", raw: `ghp_abc${ZWSP}pass${ZWSP}word=MIXSIXSECRET`, secrets: ["MIXSIXSECRET"] },
  { id: "X7 SGR before and inside sk-ant-", raw: `key${ESC}[0msk-${ESC}[0mant-MIXSEVENSECRET`, secrets: ["MIXSEVENSECRET"] },
  { id: "X8 NUL before and inside the scheme", raw: `x${NUL}Ba${NUL}sic MIXEIGHTSECRET`, secrets: ["MIXEIGHTSECRET"] },
  // Class-level probes: each choice of at most two separator classes, every other class glued inside the scheme.
  ...SEPARATOR_CHOICES.map(classProbe),
];

/**
 * The 17:32Z acceptance set. Units: every code point the wb-752.2 respin gate measured as the ONLY separator before
 * ghp_/sk-ant-/Bearer/Basic (G10 residual, G11 gains), the F2 correction (U+0085 and NUL before a \b prefix), the wb-0kg.6
 * known-residual code points (U+2061, U+2064, U+206A, U+115F, U+FFA0, U+E0020, U+1D173), the site-24 and timeline
 * real-path classes (U+0080, U+009F, U+202A, U+202C, U+2069 beside the rest), further default-ignorables, the bidi marks
 * and an SGR sequence. Positions: between two tokens (before each \b-anchored start, and as the space after a scheme),
 * inside a keyword, prefix, key or token (the G11 keyword splits and the U+202E in-token regression), and the
 * position-aware mixes.
 */
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map(code => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", `${ESC}[0m`],
];
type Shape = (unit: string, secret: string) => string;
/** A unit here sits between two tokens: a separator reading exposes the credential. */
const BETWEEN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["before ghp_", (unit, secret) => `see${unit}ghp_${secret}`],
  ["before sk-ant-", (unit, secret) => `key${unit}sk-ant-${secret}`],
  ["before Bearer", (unit, secret) => `x${unit}Bearer ${secret}`],
  ["before Basic", (unit, secret) => `x${unit}Basic ${secret}`],
  ["as the space after Bearer", (unit, secret) => `Authorization: Bearer${unit}${secret}`],
  ["as the space after Basic", (unit, secret) => `Authorization: Basic${unit}${secret}`],
];
/** A unit here sits inside a keyword, prefix, key or token (and, in the mixes, between two tokens as well). */
const WITHIN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["inside Bearer", (unit, secret) => `Authorization: Bea${unit}rer ${secret}`],
  ["inside ghp_", (unit, secret) => `see gh${unit}p_${secret}`],
  ["inside a Bearer token", (unit, secret) => `Bearer SEC${unit}${secret}`],
  ["inside password", (unit, secret) => `pass${unit}word=${secret}`],
  ["before and inside Bearer", (unit, secret) => `x${unit}Bea${unit}rer ${secret}`],
  ["before and inside ghp_", (unit, secret) => `see${unit}gh${unit}p_${secret}`],
  ["inside and after Bearer", (unit, secret) => `Authorization: Bea${unit}rer${unit}${secret}`],
  ["before, inside and after Bearer", (unit, secret) => `x${unit}Bea${unit}rer${unit}${secret}`],
  ["after a key token and inside the next key name", (unit, secret) => `ghp_abc${unit}pass${unit}word=${secret}`],
];
/**
 * Whitespace always separates (12:10Z), so a whitespace unit inside a keyword ends it as it does for the plain redactor:
 * the helper's whitespace units (TAB, LF, VT, FF, CR, NEL, LS, PS), not JavaScript's \s, which holds the BOM and lacks NEL.
 */
const WHITESPACE_UNITS: ReadonlySet<string> = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map(cp));
const isWhitespace = (unit: string): boolean => WHITESPACE_UNITS.has(unit);
const ACCEPTANCE: readonly Probe[] = ACCEPTANCE_UNITS.flatMap(([name, unit]) =>
  [...BETWEEN_TOKENS, ...(isWhitespace(unit) ? [] : WITHIN_TOKENS)].map(([position, shape]) => {
    const secret = `ACCEPT${name.replace(/[^A-Z0-9]/g, "")}${position.replace(/[^a-z]/g, "").slice(0, 24)}`;
    return { id: `${name} ${position}`, raw: shape(unit, secret), secrets: [secret] };
  }),
);

/** Every string leaf of a value, keys included. */
function strings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const item of value) strings(item, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      into.push(key);
      strings(item, into);
    }
  }
  return into;
}

function expectClean(texts: readonly string[], probe: Probe): void {
  expect(texts.length).toBeGreaterThan(0);
  for (const text of texts) {
    for (const secret of probe.secrets) expect(text, `${probe.id} leaked ${secret}`).not.toContain(secret);
    expect(text, `${probe.id} kept an unsafe code point`).not.toMatch(UNSAFE_DISPLAY);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Site drivers: each reaches one census site through its PUBLIC function and returns the display strings it produced.
// ---------------------------------------------------------------------------------------------------------------------

const FORGE_SCOPE: ObservationScope = { workspace: "/tmp/forge-ws", principal: "local-operator:tester" };
function forgeReading(reason: string, operation?: string): JsonValue {
  const historical = { ref: "code:pi-subagents", last_result: "success", authoritative_current: false, unverified_reason: reason };
  return {
    contract: "forge.gate.status/v1",
    protocolMethod: "gate.status",
    source: {
      status: "success",
      ...(operation === undefined ? {} : { operation_id: operation }),
      envelope: { verdict: null, reason_code: "FORGE_OK" },
      data: { packages: [{ ref: "code:a", last_result: "success", authoritative_current: true, verification_ref: "cmd_current" }, historical] },
    },
  };
}

const HX_SCOPE: ObservationScope = { workspace: "/tmp/hyperunix-observer-ws", principal: "local-operator:tester" };
function hyperunixTexts(raw: string): string[] {
  const reading: JsonValue = {
    contract: "hyperunix.find/v1",
    source: { representation: "hyperunix.result/1", execution_status: { kind: "incomplete" }, coverage_summary: { licenses_absence: false }, rows: [], rows_retained: true, operation: raw },
    workspaceRoot: HX_SCOPE.workspace,
    runtime: { version: "0.1.0", binarySha256: "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d" },
  };
  const context: HyperUnixTopologyContext = { scope: HX_SCOPE, target: { kind: "hx.fs/regular-file", root: raw }, capturedAt: "2026-10-15T08:40:00Z", observedAt: "2026-10-15T08:40:01Z" };
  const topology = hyperunixTopology(reading, context);
  return [...topology.snapshots.flatMap(snapshot => [snapshot.node.title, snapshot.node.statusText]), ...topology.diagnostics];
}

function claudeTexts(raw: string): string[] {
  const input: ClaudeTopologyInput = {
    call: { agentId: "wf-agent-2", index: 2, label: raw },
    snapshot: {
      provider: "claude-agent-sdk", sessionId: "sess-1", lastMessageId: "m-9", observedMessages: 7, assistantCharacters: 42,
      tools: [{ toolUseId: "toolu_corpus", name: raw, state: "completed" }], toolsTruncated: false, freshness: "current",
    },
    scope: { workspace: "/tmp/claude-topology-ws", principal: "operator" },
    invocationId: "wf_5d0c9e3a7b1f",
    observedAt: "2026-10-15T07:30:00.000Z",
    sequence: 3,
  };
  return projectClaudeTopology(input).snapshots.flatMap(snapshot => [snapshot.node.title, snapshot.node.statusText]);
}

const TIMELINE_SCOPE: ObservationScope = { workspace: "ws-timeline", principal: "operator" };
function timelineTexts(raw: string): string[] {
  const projection = new ObservationProjection();
  const at = "2026-10-15T12:00:30.000Z";
  const ref: NativeRef = { provider: "forge", type: "operation", id: "op-corpus" };
  projection.refresh({
    source: ref, scope: TIMELINE_SCOPE, capturedAt: at, observedAt: at, kind: "fixture.snapshot",
    node: { title: "placeholder", type: "sdk-operation", statusText: "running", statusTone: "active" },
    trace: { invocationId: "inv-corpus" }, interval: { startedAt: "2026-10-15T12:00:00.000Z" },
  });
  // ObservationProjection refuses control bytes in a title; a stand-in reader hands the timeline the producer's raw text.
  const reader: TimelineReader = {
    window: filter => {
      const page = projection.window(filter);
      return { ...page, nodes: page.nodes.map(node => ({ ...node, presentation: { ...node.presentation, title: raw } })) };
    },
    relations: input => projection.relations(input),
    relationRevision: () => projection.relationRevision(),
  };
  const model = buildTimelineLanes(reader, { scope: TIMELINE_SCOPE, invocationId: "inv-corpus", offset: 0, limit: 100, zoom: 1, pan: 0, columns: 40 });
  return model.lanes.flatMap(lane => lane.rows.map(row => row.title));
}

/** Site 5 through the REAL projection: undefined when the projection refuses the title (it refuses C0 and DEL only). */
function timelineRealTexts(raw: string): string[] | undefined {
  const projection = new ObservationProjection();
  const at = "2026-10-15T12:00:30.000Z";
  try {
    projection.refresh({
      source: { provider: "forge", type: "operation", id: "op-real" }, scope: TIMELINE_SCOPE, capturedAt: at, observedAt: at, kind: "fixture.snapshot",
      node: { title: raw, type: "sdk-operation", statusText: "running", statusTone: "active" },
      trace: { invocationId: "inv-real" }, interval: { startedAt: "2026-10-15T12:00:00.000Z" },
    });
  } catch {
    return undefined;
  }
  const model = buildTimelineLanes(projection, { scope: TIMELINE_SCOPE, invocationId: "inv-real", offset: 0, limit: 100, zoom: 1, pan: 0, columns: 40 });
  return model.lanes.flatMap(lane => [lane.label, ...lane.rows.map(row => row.title)]);
}

const ALICE: ObservationScope = { workspace: "ws-attention", principal: "alice" };
const NOW = "2026-10-15T12:00:00.000Z";
function attentionTexts(raw: string): string[] {
  const node: ObservedNode = {
    key: JSON.stringify([ALICE.workspace, ALICE.principal, "furnace", "operation", "", "hostile"]),
    nativeRef: { provider: "furnace", type: "operation", id: "hostile" }, scope: ALICE, sourceKind: "observed", observedAt: NOW,
    sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title: raw, type: "sdk-operation", statusText: "RUNNING", statusTone: "active" }, kind: "native.snapshot",
    invocationId: "inv-attention", evidenceRefs: [], interval: { startedAt: "2026-10-15T11:59:00.000Z" },
  };
  const view = {
    query: (filter: { limit: number }) => ({ nodes: [node].slice(0, filter.limit), examined: 1, truncated: false }),
    relations: () => [],
  };
  return selectAttention(view, { scope: ALICE, invocationId: "inv-attention", now: NOW }).bottlenecks.map(bottleneck => bottleneck.title);
}

/**
 * The workflow-inspector.ts attention panel (layoutInspector overview): a DIRECT-CALLER row under the 21:00Z display-path rule.
 * The panel inherits the workflow-card.ts "terminal" site through the inspector's safe() and passes every producer string through
 * it exactly once (wb-6ze.21 respin, owner rulings 21:43Z). The probe rides a bottleneck title, that bottleneck's provider and a
 * disconnected provider; the overview is drawn at the gate's 120x40 and at 200x40, where no title is cut, in both tiers.
 */
const PANEL_SCOPE: ObservationScope = { workspace: "ws-inspector-panel", principal: "operator" };
function panelReport(raw: string): AttentionReport {
  return {
    contract: ATTENTION_CONTRACT, basis: "observed", now: NOW, examined: { nodes: 1, truncated: false },
    counts: { active: 1, waiting: 0, success: 0, failure: 0, unknown: 0, stale: 0, disconnected: 1, withInterval: 1, withoutInterval: 0 },
    disconnectedProviders: [raw],
    bottlenecks: [{ key: "panel-probe", nativeRef: { provider: raw, type: "operation", id: "panel-probe" }, title: raw, tone: "active", freshness: "current", openMs: 60_000, measured: true }],
    unmeasured: 0, clockSkew: 0, criticalPath: { label: "incomplete-trace", reasons: ["no-dependency-edges"] }, clockCaveat: ATTENTION_CLOCK_CAVEAT,
  };
}
function panelLines(model: InspectorModel): string[] {
  return [120, 200].flatMap(width => [false, true].flatMap(ascii => layoutInspector(model, initialInspectorState(), { width, rows: 40, ascii })));
}
function inspectorPanelTexts(raw: string): string[] {
  return panelLines({ projection: new ObservationProjection(), scope: PANEL_SCOPE, invocationId: "inv-panel", title: "Panel corpus", status: "running", attention: panelReport(raw) });
}
/** The panel through the REAL projection, the provider as the projection admits it: undefined when the projection does not hold the node. */
function inspectorPanelRealTexts(raw: string): string[] | undefined {
  const projection = new ObservationProjection();
  const at = "2026-10-15T12:00:30.000Z";
  try {
    projection.refresh({
      source: { provider: raw, type: "operation", id: "op-panel" }, scope: PANEL_SCOPE, capturedAt: at, observedAt: at, kind: "fixture.snapshot",
      node: { title: "Panel real path", type: "sdk-operation", statusText: "running", statusTone: "active" },
      trace: { invocationId: "inv-panel-real" }, interval: { startedAt: "2026-10-15T12:00:00.000Z" },
    });
    projection.disconnect(raw);
  } catch {
    return undefined;
  }
  if (projection.window({ scope: PANEL_SCOPE, invocationId: "inv-panel-real", offset: 0, limit: 1 }).total === 0) return undefined;
  const attention = selectAttention(projection, { scope: PANEL_SCOPE, invocationId: "inv-panel-real", now: "2026-10-15T12:01:00.000Z" });
  return panelLines({ projection, scope: PANEL_SCOPE, invocationId: "inv-panel-real", title: "Panel real path", status: "running", attention });
}

/**
 * DIRECT-CALLER row (wb-cax.13 O1, owner 2026-10-16T00:01Z): telemetry.ts providerName calls the one helper with the label
 * layout, and the report's sampled-provider list is its display. A structural projection hands the report the producer's raw
 * provider, as the attention driver hands selectAttention a raw title (the real projection refuses C0 controls in identity).
 */
function telemetryTexts(raw: string): string[] {
  const report = buildOperationsTelemetry(
    {
      query: () => ({ nodes: [], examined: 0, truncated: false }),
      stats: () => ({ nodes: 0, events: 1, edges: 0 }),
      events: () => ({
        events: [{ projectionEventId: "e-telemetry", source: { provider: raw, type: "run", id: "src-telemetry" }, scope: ALICE, observedAt: NOW, sourceTimestamp: "2026-10-15T11:59:59.000Z", kind: "native.event" }],
        truncated: false,
        completeness: "complete",
      }),
    },
    { scope: ALICE, now: NOW },
  );
  return report.eventLag.state === "measured" ? report.eventLag.value.providers : [];
}

const sliceKey = (id: string): string => JSON.stringify([ALICE.workspace, ALICE.principal, "furnace", "operation", "", id]);
function topologyTexts(raw: string): string[] {
  const edges: Relation[] = [
    { from: sliceKey("A"), to: sliceKey("F"), kind: "dependency", provenance: { source: raw, observedAt: NOW } },
    { from: sliceKey("F"), to: sliceKey(raw), kind: "dependency", provenance: { source: "declared workflow", observedAt: NOW } },
  ];
  const relations = {
    relations: (input: { from?: string; to?: string; limit?: number }) =>
      edges.filter(edge => (input.from === undefined || edge.from === input.from) && (input.to === undefined || edge.to === input.to)).slice(0, input.limit ?? 100),
  };
  const slice = selectLinkedTopology({ scope: ALICE, relations }, sliceKey("F"), {});
  // nativeRef is the navigable identity; the display fields are the label and the provenance label.
  return [...slice.upstream.edges, ...slice.downstream.edges].flatMap(edge => [edge.label, edge.provenance.sourceLabel]);
}

async function hostedTexts(raw: string): Promise<string[]> {
  const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow: async () => ({ status: "success" }), sdk: SHIPPED_FURNACE_SDK });
  const vars: Record<string, string> = {};
  // A non-string variable value is the cheapest public path to the adapter's text sanitizer: the refusal names the key.
  Reflect.set(vars, raw, 1);
  const failure = await executor.start({ formula: "corpus", vars }).then(
    () => undefined,
    (error: unknown) => error,
  );
  if (!(failure instanceof CapabilityError)) throw new Error("expected a validation refusal");
  return [failure.message];
}

const HEADER = 'export const meta = { name: "sample", description: "description" };\n';
function memorySource(body: string): WorkflowSource {
  const source = `${HEADER}${body}`;
  const artifactDigest = `sha256:${createHash("sha256").update(source, "utf8").digest("hex")}`;
  return { definition: { kind: "script", id: "mem.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest }, sourceRef: "mem.js", source };
}
function patchTexts(raw: string): string[] {
  // Each producer line becomes a comment line of the candidate, so the diff renders it; the rationale carries it whole.
  const commented = raw.split(LF).map(line => `// ${line}`).join(LF);
  const proposal = proposeWorkflowPatch({ base: memorySource("return 1;"), candidateSource: `${HEADER}${commented}\nreturn 1;`, rationale: raw });
  return strings(proposal);
}

const BEADS_SCOPE: ObservationScope = { workspace: "/tmp/beads-observer-ws", principal: "operator" };
async function beadsTexts(raw: string): Promise<string[]> {
  const issue = {
    comment_count: 0, created_at: "2026-10-15T07:00:00Z", created_by: "flywheel", dependencies: [], dependency_count: 0, dependent_count: 0,
    id: "wb-752.6", issue_type: "task", priority: 2, spec_id: "", status: "in_progress", title: raw, updated_at: "2026-10-15T07:30:00Z",
  };
  const client: BeadsReadClient = { show: async () => ({ exit: 0, stdout: JSON.stringify([issue]), stderr: "" }) };
  const reading = await readBeadsWork(client, {
    workId: "wb-752.6", workspaceRoot: BEADS_SCOPE.workspace, scope: BEADS_SCOPE,
    limits: { maxDependencies: 8, maxTitleChars: 80, timeoutMs: 5000 }, now: () => "2026-10-15T08:00:00.000Z",
  });
  return [...strings(reading), ...strings(projectBeadsWork(reading, BEADS_SCOPE))];
}

async function furnaceEvidenceTexts(raw: string): Promise<string[]> {
  const data: LogsReadDto = {
    run_id: "frn-run-evidence-1", attempt_id: "frn-atm-evidence-1-2", stream: "stderr", complete: true, limit: 4096, returned: 120,
    next_cursor: null, lossy: false, lines: [raw],
  };
  const response: Response<LogsReadDto> = { protocolVersion: 1, kind: "logs_read", requestId: "req-logs", data, exit: { code: 0, signal: null }, stderr: "" };
  const content = await readFurnaceAttemptLogEvidence({
    client: { logs: { read: async () => response } }, runId: "frn-run-evidence-1", workspaceRoot: "/tmp/furnace-evidence-ws",
    owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: "frn-run-evidence-1", scope: "/tmp/furnace-evidence-ws" }, evidenceRefs: ["frn-atm-evidence-1-2"] },
    attemptId: "frn-atm-evidence-1-2", stream: "stderr", maxBytes: 4096, maxLines: 200, timeoutMs: 2000,
    signal: new AbortController().signal, capturedAt: () => "2026-10-15T09:00:00.000Z",
  });
  return [...content.preview];
}

async function storeTexts(raw: string): Promise<string[]> {
  const loader: EvidenceLoader = {
    provider: "fixture", requiredGrant: "fixture:read", canLoad: ref => ref.startsWith("ev:"),
    load: async () => ({ kind: raw, provider: "fixture", capturedAt: NOW, bytes: raw.length, truncated: false, preview: [raw], freshness: "current", producerReceipt: raw }),
  };
  const store = new EvidenceStore({ loaders: [loader], maxEntries: 8, maxBytes: 4096, timeoutMs: 200 });
  const ref: NativeRef = { provider: "fixture", type: "operation", id: "n1" };
  await store.request(ALICE, ref, "ev:1");
  const entry = store.get(ALICE, ref, "ev:1");
  if (entry.state !== "loaded") throw new Error(`expected a loaded entry, got ${entry.state}`);
  return [...entry.preview, entry.kind, entry.producerReceipt ?? ""];
}

/**
 * DIRECT-CALLER row (wb-6ze.10 O1, owner 2026-10-16T01:36Z): claude-evidence.ts sanitizeRow calls the one helper with the
 * lines layout over the whole selected transcript row, and the bounded preview lines are its display. The injected read
 * seam hands the reader the producer's raw row text, as the furnace driver hands its reader a raw log line.
 */
async function claudeEvidenceTexts(raw: string): Promise<string[]> {
  const uuid = "00000000-0000-4000-8000-0000000000c1";
  const ref = `claude-message:${uuid}`;
  const content = await readClaudeMessageEvidence(ref, {
    grants: () => ["claude:transcript"],
    owningNode: { nativeRef: { provider: "claude-agent-sdk", type: "session", id: "sess-corpus" }, evidenceRefs: [ref], freshness: "current" },
    readTranscript: async () => [{ type: "assistant", uuid, text: raw }],
    cwd: "/tmp/claude-evidence-ws", maxMessages: 40, maxBytes: 65_536, maxLines: 200,
    signal: new AbortController().signal, capturedAt: () => NOW,
  });
  return [...content.preview];
}

function detachedTexts(raw: string): string[] {
  const host = "a1".repeat(24);
  const operator = { issuer: "local-os-dac", uid: 1000, id: "local-os:uid:1000" } as const;
  const reading = projectDetachedReading({
    receipt: {
      contract: "workbench.local-detached/v1", invocationId: "inv-det-1", hostInstanceId: host, pid: 4242, sessionId: 4242, processStartTicks: "123456",
      owner: { ...operator }, invocationDirectory: "/tmp/detached-ws/.detached/inv-det-1", socketPath: "/tmp/detached-ws/.detached/inv-det-1/host.sock",
      launchedAt: "2026-10-15T09:00:00.000Z", deploymentDigest: "dep-digest", inputDigest: "in-digest", scriptDigest: "script-digest", snapshotDigest: "snap-digest",
      permissions: ["inspect"], security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash", nativeRuntimeIdentity: "unsupported",
      evidenceClass: "local-computation",
    },
    snapshot: {
      contract: "workbench.local-detached/v1", invocationId: "inv-det-1", observation: "unknown", observedAt: "2026-10-15T09:00:03.000Z",
      source: "local-client-transport", nativeRuntimeIdentity: "unsupported", progress: [], droppedProgress: 0, controlAudit: [], cancellationRequested: false,
      diagnostic: raw, reconcileHint: raw,
    },
    scope: { workspace: "/tmp/detached-ws", principal: "local-os:uid:1000" },
    operator,
    observedAt: "2026-10-15T09:00:05Z",
  });
  return reading.snapshots.flatMap(snapshot => [snapshot.node.title, snapshot.node.statusText]);
}

function descriptor(description: string): CapabilityDescriptor {
  return {
    id: "forge.build", version: "1.0.0", description, inputSchema: { type: "object", properties: { q: { type: "string", description } } },
    effectClass: "read", permissions: [], supportedModes: ["invoke", "inspect"],
  };
}
/** Sites 19 and 20: the builders' replies and the wiring's outer serialization, as the model receives them. */
function replyTexts(raw: string): string[] {
  const snapshot: CapabilityCatalogEntry[] = [{ descriptor: descriptor(raw), inspectImplemented: true }];
  const catalog = buildWorkflowCatalogReply(snapshot, ["discover:forge.build"], {});
  const inspect = buildWorkflowInspectReply(snapshot, ["inspect:forge.build"], "forge.build");
  return [catalog, inspect].flatMap(reply => [...strings(reply), ...strings(JSON.parse(sanitizeWorkbenchJsonText(reply)))]);
}

/**
 * DIRECT-CALLER row (wb-69g.5 respin U1, BOUNDARY 21:00Z F6 rule; cax.13 O1 precedent): site 12 is execute.ts itself, not the
 * sanitizeWorkbenchJsonText proxy above. buildWorkflowExecuteReply renders five display paths, and its policy echo goes through
 * sanitizeWorkbenchJson, which names no layout, so this row drives the real reply through every one with the probe as the only
 * hostile member: the launch reason, a policy value and key, a native reference id and scope, the definition id, and the
 * invocation reference (admitted and refused replies). An identity member refuses unsafe text typed rather than deleting it, so
 * its typed refusal is what is displayed then.
 */
function executeTexts(raw: string): string[] {
  const definition = { kind: "script" as const, id: "review.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest: `sha256:${"e".repeat(64)}` };
  const ref: NativeRef = { provider: "furnace", type: "run", id: "frn-run-execute", scope: "/tmp/execute-ws" };
  const decide = (overrides: Partial<WorkflowExecuteRequest>, invocationId = "inv-execute-corpus", grants = [EXECUTE_GRANT]): ExecuteDecision =>
    decideExecute({ definitionRef: { ...definition }, input: { topic: "corpus" }, hostMode: "embedded", ...overrides }, { grants, invocationId });
  const shown = (decision: ExecuteDecision, outcome: LaunchOutcome): string[] => {
    try {
      return strings(buildWorkflowExecuteReply(decision, outcome));
    } catch (error) {
      // A native reference carrying an unsafe unit is a typed host defect; its constant message is the display.
      if (error instanceof CapabilityError) return [error.message];
      throw error;
    }
  };
  const paths = [
    shown(decide({}), { status: "refused", reason: raw }),
    shown(decide({ policy: { note: raw, [raw]: raw } }), { status: "launched", nativeRefs: [ref] }),
    shown(decide({}), { status: "launched", nativeRefs: [{ ...ref, id: raw, scope: raw }] }),
    shown(decide({ definitionRef: { ...definition, id: raw } }), { status: "accepted" }),
    shown(decide({}, raw), { status: "launched", nativeRefs: [ref] }),
    shown(decide({}, raw, []), { status: "accepted" }),
  ];
  if (paths.some(texts => texts.length === 0)) throw new Error("an execute display path produced no text");
  return paths.flat();
}

/** Site 22: observe-query.ts clean(), through every producer string of a workflow_observe reply node. */
function observeTexts(raw: string): string[] {
  const node: ObservedNode = {
    key: JSON.stringify([ALICE.workspace, ALICE.principal, "forge", "run", "", "observe"]), nativeRef: { provider: "forge", type: "run", id: raw },
    scope: ALICE, sourceKind: "observed", observedAt: NOW, sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title: raw, type: "sdk-operation", statusText: raw, statusTone: "active" }, kind: raw, evidenceRefs: [raw], subjectBasis: raw,
  };
  const reader: ObserveReader = {
    window: filter => ({ nodes: [node].slice(filter.offset, filter.offset + filter.limit), total: 1, revision: 1 }),
    relations: () => [],
    events: () => ({ events: [], truncated: false, completeness: "complete" }),
    relationRevision: () => 0,
    stats: () => ({ nodes: 1, events: 0, edges: 0 }),
  };
  return strings(observeInvocation(reader, { scope: ALICE, invocationId: "inv-observe" }));
}

/** wb-h8f.10: latency.ts displayText (selectLatencyDecomposition), the provider and the evidence-ref paths, joined to the corpus in the same commit as its routing through the one helper. */
function latencyTexts(raw: string): string[] {
  const node: ObservedNode = {
    key: JSON.stringify([ALICE.workspace, ALICE.principal, raw, "operation", "", "latency"]), nativeRef: { provider: raw, type: "operation", id: "latency" },
    scope: ALICE, sourceKind: "observed", observedAt: NOW, sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title: "latency", type: "sdk-operation", statusText: "DONE", statusTone: "success" }, kind: "native.snapshot", invocationId: "inv-latency",
    evidenceRefs: [raw], interval: { startedAt: "2026-10-15T09:00:00Z", endedAt: "2026-10-15T09:00:05Z" },
  };
  const report = selectLatencyDecomposition({ query: filter => ({ nodes: [node].slice(0, filter.limit), examined: 1, truncated: false }) }, { scope: ALICE, invocationId: "inv-latency" });
  return [...report.components.flatMap(item => item.providers), ...report.evidenceRefs, ...report.components.flatMap(item => item.evidenceRefs), report.invocationId];
}

interface Site {
  readonly site: string;
  readonly texts: (raw: string) => string[] | Promise<string[]>;
}
const SITES: readonly Site[] = [
  { site: "redaction.ts sanitizeWorkbenchText (text)", texts: raw => [sanitizeWorkbenchText(raw)] },
  { site: "redaction.ts sanitizeWorkbenchText (label)", texts: raw => [sanitizeWorkbenchText(raw, 2000, "label")] },
  { site: "redaction.ts sanitizeWorkbenchText (terminal)", texts: raw => [sanitizeWorkbenchText(raw, 2000, "terminal")] },
  { site: "redaction.ts sanitizeWorkbenchJson keys and values", texts: raw => strings(sanitizeWorkbenchJson({ note: [raw], [raw]: raw })) },
  { site: "redaction.ts sanitizeWorkbenchJsonText (site 12 execute reply class)", texts: raw => strings(JSON.parse(sanitizeWorkbenchJsonText({ note: raw }))) },
  { site: "workflow-card.ts safeWorkflowTerminalText", texts: raw => [safeWorkflowTerminalText(raw)] },
  { site: "site 1 forge-observer.ts shown (forgeGateTopology)", texts: raw => strings(forgeGateTopology(forgeReading(raw), { scope: FORGE_SCOPE, target: FORGE_SCOPE.workspace, capturedAt: "2026-10-15T07:00:00Z", observedAt: "2026-10-15T07:00:01Z" })) },
  {
    site: "site 2 forge-evidence.ts display (readForgeOperationEvidence)",
    texts: async raw => {
      const loaded = await readForgeOperationEvidence("forge-operation:op_8f2c41", {
        grants: () => ["forge:inspect"], scope: FORGE_SCOPE, target: FORGE_SCOPE.workspace, read: async () => forgeReading(raw, "op_8f2c41"), now: () => "2026-10-15T09:30:00Z",
      });
      return [...loaded.preview, loaded.statusText];
    },
  },
  { site: "site 3 hyperunix-observer.ts shown (hyperunixTopology)", texts: hyperunixTexts },
  { site: "site 4 claude-topology.ts shown (projectClaudeTopology)", texts: claudeTexts },
  { site: "site 5 timeline.ts shown (buildTimelineLanes)", texts: timelineTexts },
  { site: "site 6 attention.ts titleOf (selectAttention)", texts: attentionTexts },
  { site: "workflow-inspector.ts attention panel (layoutInspector overview)", texts: inspectorPanelTexts },
  { site: "telemetry.ts providerName (buildOperationsTelemetry eventLag.providers)", texts: telemetryTexts },
  { site: "site 7 topology-slice.ts labelOf (selectLinkedTopology)", texts: topologyTexts },
  { site: "site 8 furnace-hosted.ts safeText (FurnaceHostedExecutor.start)", texts: hostedTexts },
  { site: "site 9 patch-proposal.ts displayText (proposeWorkflowPatch)", texts: patchTexts },
  { site: "site 10 beads-observer.ts cleanText (readBeadsWork, projectBeadsWork)", texts: beadsTexts },
  { site: "site 15 furnace-evidence.ts sanitize (readFurnaceAttemptLogEvidence)", texts: furnaceEvidenceTexts },
  { site: "site 16 evidence-loader.ts safeChunks (EvidenceStore)", texts: storeTexts },
  { site: "claude-evidence.ts sanitizeRow (readClaudeMessageEvidence preview lines)", texts: claudeEvidenceTexts },
  { site: "site 18 detached-observer.ts shown (projectDetachedReading)", texts: detachedTexts },
  { site: "sites 19/20 workflow_inspect and workbench_catalog replies", texts: replyTexts },
  { site: "site 12 execute.ts buildWorkflowExecuteReply (DIRECT-CALLER: reason, policy value and key, native reference id and scope, definition id, invocation reference)", texts: executeTexts },
  { site: "site 22 observe-query.ts clean (observeInvocation)", texts: observeTexts },
  { site: "wb-h8f.10 latency.ts displayText (selectLatencyDecomposition provider and evidence paths)", texts: latencyTexts },
];

describe("wb-952 one-helper corpus through every census site's public function", () => {
  for (const { site, texts } of SITES) {
    it.each(CORPUS)(`${site}: $id`, async probe => {
      expectClean(await texts(probe.raw), probe);
    });
  }
});

describe("wb-952 acceptance set (17:32Z): every unit between, inside and both, through every census site", () => {
  for (const { site, texts } of SITES) {
    it(`${site}: ${ACCEPTANCE.length} shapes`, async () => {
      const failures: string[] = [];
      for (const probe of ACCEPTANCE) {
        const shown = await texts(probe.raw);
        if (shown.length === 0) failures.push(`${probe.id}: no display text`);
        for (const text of shown) {
          if (probe.secrets.some(secret => text.includes(secret))) failures.push(`${probe.id}: leaked`);
          if (UNSAFE_DISPLAY.test(text)) failures.push(`${probe.id}: kept an unsafe code point`);
        }
      }
      expect([...new Set(failures)]).toEqual([]);
    });
  }

  it("site 5 timeline.ts shown through the REAL ObservationProjection -> buildTimelineLanes path, every admissible shape (18:32Z)", () => {
    const probes = [...CORPUS, ...ACCEPTANCE];
    const failures: string[] = [];
    let admitted = 0;
    for (const probe of probes) {
      const shown = timelineRealTexts(probe.raw);
      if (shown === undefined) continue;
      admitted += 1;
      for (const text of shown) {
        if (probe.secrets.some(secret => text.includes(secret))) failures.push(`${probe.id}: leaked`);
        if (UNSAFE_DISPLAY.test(text)) failures.push(`${probe.id}: kept an unsafe code point`);
      }
    }
    // Every shape without a C0 control or DEL reaches the real path, so none is skipped silently.
    expect(admitted).toBe(probes.filter(probe => !/[\x00-\x1f\x7f]/.test(probe.raw)).length);
    expect([...new Set(failures)]).toEqual([]);
  });

  it("workflow-inspector.ts attention panel through the REAL ObservationProjection -> selectAttention -> layoutInspector path, every provider the projection holds (wb-6ze.21 respin U1)", () => {
    const probes = [...CORPUS, ...ACCEPTANCE];
    const failures: string[] = [];
    let held = 0;
    for (const probe of probes) {
      const shown = inspectorPanelRealTexts(probe.raw);
      if (shown === undefined) continue;
      held += 1;
      // A held node reaches the panel twice: as a measured bottleneck row and as a disconnected provider.
      if (!shown.some(text => text.includes("open 01:00 measured"))) failures.push(`${probe.id}: no bottleneck row`);
      if (!shown.some(text => text.includes("(providers: "))) failures.push(`${probe.id}: no disconnected provider`);
      for (const text of shown) {
        if (probe.secrets.some(secret => text.includes(secret))) failures.push(`${probe.id}: leaked`);
        if (UNSAFE_DISPLAY.test(text)) failures.push(`${probe.id}: kept an unsafe code point`);
      }
    }
    // A shape without any unsafe unit is held whatever admission refuses, so the path is never skipped wholesale.
    expect(held).toBeGreaterThanOrEqual(probes.filter(probe => stripUnsafeText(probe.raw) === probe.raw).length);
    expect([...new Set(failures)]).toEqual([]);
  });
});

describe("wb-952 the one helper: normalize once, redact the union of every reading, strip once", () => {
  it("is position-aware: a unit between two tokens separates while the same unit inside a keyword or token glues (17:32Z)", () => {
    expect(sanitizeWorkbenchText(`x${ZWSP}Bea${ZWSP}rer tok123`)).toBe("x[REDACTED]");
    expect(sanitizeWorkbenchText(`see${ZWSP}gh${ZWSP}p_abc123 end`)).toBe("see[REDACTED] end");
    expect(sanitizeWorkbenchText(`ghp_abc${ZWSP}pass${ZWSP}word=hunter2`)).toBe("[REDACTED]=[REDACTED]");
    expect(sanitizeWorkbenchText(`x${BEL}Bear${BEL}er${BEL}tok123`, 2000, "label")).toBe("x [REDACTED]");
    // Deletion inside a token never splits it (the G11 regression: U+202E inside a Bearer token).
    expect(sanitizeWorkbenchText(`Bearer SEC${RLO}RETabc123XYZ`)).toBe("[REDACTED]");
    // The F2 correction: U+0085 and NUL before a \b-anchored prefix.
    expect(sanitizeWorkbenchText(`see${NEL}ghp_abc123`)).toBe("see [REDACTED]");
    expect(sanitizeWorkbenchText(`see${NUL}ghp_abc123`)).toBe("see[REDACTED]");
    // An assignment is read at every key occurrence, and a scheme match's space is part of its value, as the plain redactor's
    // marker makes it: the split scheme and the split key name hide nothing.
    expect(sanitizeWorkbenchText(`password=Bea${ZWSP}rer tok"rest`)).toBe("password=[REDACTED]");
    expect(sanitizeWorkbenchText(`ghp_x${ZWSP}pass${ZWSP}word=Bearer tok"rest`)).toBe("[REDACTED]=[REDACTED]");
    // The raw text is read as the plain redactor reads it: U+0085 is no JavaScript whitespace, so it stays inside the token.
    expect(sanitizeWorkbenchText(`Bearer SEC${NEL}RETTAIL`)).toBe("[REDACTED]");
    // A quoted value never crosses a line break, as in plain text.
    expect(sanitizeWorkbenchText(`password="abc${LF}def"`, 2000, "lines")).toBe(`password=[REDACTED]${LF}def"`);
    // A scheme glued to the word before it stays plain text, as for the plain redactor: no gap there to separate.
    expect(sanitizeWorkbenchText(`xBearer tok123 ${ZWSP}`)).toBe(redactWorkbenchText("xBearer tok123 "));
  });

  it("rejoins a keyword an invisible split (glued invisibles vanish) and keeps whitespace as a separator", () => {
    expect(sanitizeWorkbenchText(`pass${BEL}word=hunter2`)).toBe("password=[REDACTED]");
    expect(sanitizeWorkbenchText(`Authorization: Bear${ZWSP}er abc123`)).toBe("Authorization: [REDACTED]");
    expect(sanitizeWorkbenchText(`first line${LF}sk-ant-api03-GLUEONE`)).toBe("first line [REDACTED]");
    expect(sanitizeWorkbenchText(`auth${LF}Bearer ENTRYTWO`)).toBe("auth [REDACTED]");
    expect(sanitizeWorkbenchText(`Bearer${TAB}ENTRYTHREE`)).toBe("[REDACTED]");
  });

  it("treats U+FEFF, U+0085 and NUL as separators before any deletion (16:44Z)", () => {
    for (const separator of [BOM, NEL, NUL]) expect(sanitizeWorkbenchText(`Authorization: Bearer${separator}tok123`)).toBe("Authorization: [REDACTED]");
    // The same code point glued inside a credential is still caught: deletion is one of the readings, never the only one.
    expect(sanitizeWorkbenchText(`ghp_aaaa${BOM}TAILTHREE33`)).toBe("[REDACTED]");
  });

  it("renders one marker across a gap that displays as nothing", () => {
    expect(sanitizeWorkbenchText(`sk-ant-aaaa${cp(0xad)}TAIL`)).toBe("[REDACTED]");
    expect(sanitizeWorkbenchText(`sk-ant-aaaa${cp(0xad)}TAIL`, 2000, "label")).toBe("[REDACTED]");
    // Two runs meeting at a gap neither reading covers (the raw reading keeps U+0085 inside the token, the BOM ends it there).
    expect(sanitizeWorkbenchText(`Bearer a${NEL}b${BOM}ghp_c`)).toBe("[REDACTED]");
  });

  it("displays NUL and the BOM as separators where the layout spaces controls, and as nothing in text", () => {
    expect(sanitizeWorkbenchText(`a${BOM}b${NUL}c`)).toBe("abc");
    expect(sanitizeWorkbenchText(`a${BOM}b${NUL}c`, 2000, "terminal")).toBe("a b c");
    expect(sanitizeWorkbenchText(`a${BOM}b${NUL}c`, 2000, "label")).toBe("a b c");
  });

  it("redacts both readings of one input instead of choosing one (U6)", () => {
    expect(sanitizeWorkbenchText(`x${BEL}sk-ant-TIESECRETAAAA pass${BEL}word=hunter2`)).toBe("x[REDACTED] password=[REDACTED]");
  });

  it("never fuses words across a whitespace control and deletes glue controls in the text layout", () => {
    expect(sanitizeWorkbenchText(`alpha${LF}beta${TAB}gamma`)).toBe("alpha beta gamma");
    expect(sanitizeWorkbenchText(`ab${BEL}cd${ESC}[31mef${ZWSP}gh${RLO}`)).toBe("abcdefgh");
  });

  it("label layout: escapes and controls become one space, whitespace collapses, the ends are trimmed", () => {
    expect(sanitizeWorkbenchText(`  find${ESC}[0mBearer abc123 ${RLO} end `, 120, "label")).toBe("find [REDACTED] end");
    expect(sanitizeWorkbenchText(`x${BEL}Bear${ZWSP}er tok123`, 120, "label")).toBe("x [REDACTED]");
    // Coverage does not depend on the layout: the text layout redacts the same credential and only renders the gap away.
    expect(sanitizeWorkbenchText(`x${BEL}Bear${ZWSP}er tok123`)).toBe("x[REDACTED]");
  });

  it("terminal layout: escape sequences vanish as the card's parser removes them, controls space, nothing is trimmed", () => {
    expect(safeWorkflowTerminalText(`error: ${ESC}[31mfailed${ESC}[0m${BEL}now${TAB}${TAB}end`)).toBe("error: failed now end");
    expect(safeWorkflowTerminalText(`cmd_1${ESC}[31m`)).toBe("cmd_1");
    expect(safeWorkflowTerminalText(" padded ")).toBe(" padded ");
  });

  it("lines layout (transcript class): whole-text redaction first, LF rows preserved, zero-width deleted", () => {
    const transcript = `row one${CR}${LF}token: x${LF}sk-ant-api03-LINESECRET${LF}a${ZWSP}b${TAB}c${ESC}[2Jd${LF}${LF}end`;
    expect(sanitizeWorkbenchText(transcript, 2000, "lines")).toBe(`row one${LF}token: x${LF}[REDACTED]${LF}ab cd${LF}${LF}end`);
    expect(sanitizeWorkbenchText(`pass${BEL}word=hunter2${LF}next`, 2000, "lines")).toBe(`password=[REDACTED]${LF}next`);
    expect(sanitizeWorkbenchText(`a${CR}b${NEL}c${LS}d`, 2000, "lines")).toBe(`a${LF}b${LF}c${LF}d`);
  });

  it("is byte-identical to redactWorkbenchText on text without an unsafe code point", () => {
    const plain = [
      "RF_WORKSPACE_NOT_FOUND: no initialized workspace", "Authorization: Bearer abc123, then sk-ant-xyz and password: \"two words\"",
      'secret=sk-ant-abc!xyz api_key="a b" Basic dXNlcjpwYXNz;', "x".repeat(3000), "spaces   inside   text", "",
      // Two matches with nothing between them: the plain path keeps redactWorkbenchText's two markers.
      'password="abc"sk-ant-x',
    ];
    for (const value of plain) {
      expect(sanitizeWorkbenchText(value)).toBe(redactWorkbenchText(value));
      expect(sanitizeWorkbenchText(value, 120)).toBe(redactWorkbenchText(value, 120));
      expect(sanitizeWorkbenchText(value, 120, "label")).toBe(redactWorkbenchText(value.replace(/\s+/g, " ").trim(), 120));
    }
  });

  // redactWorkbenchText's own second pass keeps a marker before closing brackets and a value end, and otherwise only
  // over-redacts (wb-3l3, pinned in workbench-redaction.test.ts).
  it("leaves nothing unsafe after one pass, so a second pass is the plain redactor and exposes nothing", () => {
    for (const probe of CORPUS) {
      for (const layout of ["text", "label", "terminal", "lines"] as const) {
        const once = sanitizeWorkbenchText(probe.raw, 2000, layout);
        expect(once.split(LF).join(""), `${probe.id} (${layout})`).not.toMatch(UNSAFE_DISPLAY);
        if (layout !== "lines") expect(sanitizeWorkbenchText(once, 2000, layout)).toBe(redactWorkbenchText(once));
        const twice = sanitizeWorkbenchText(once, 2000, layout);
        for (const secret of probe.secrets) expect(twice, `${probe.id} (${layout})`).not.toContain(secret);
      }
    }
  });

  it("stripUnsafeText maps every unsafe unit, default-ignorables included, to the replacement (U7)", () => {
    const mixed = `a${ZWSP}b${cp(0xad)}c${BOM}d${ESC}[1me${LRM}f${cp(0xe0041)}g`;
    expect(stripUnsafeText(mixed)).toBe("abcdefg");
    expect(stripUnsafeText(mixed, " ")).toBe("a b c d e f g");
  });

  it("a JSON key an invisible split is still a secret field", () => {
    const text = JSON.stringify(sanitizeWorkbenchJson({ [`pass${BEL}word`]: "opaque-key-secret", [`api${ZWSP}_key`]: "second-opaque" }));
    expect(text).not.toContain("opaque-key-secret");
    expect(text).not.toContain("second-opaque");
  });
});
