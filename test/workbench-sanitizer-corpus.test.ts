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
import { selectAttention } from "../src/workbench/attention.js";
import { type BeadsReadClient, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import { type CapabilityDescriptor, CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { readClaudeMessageEvidence } from "../src/workbench/claude-evidence.js";
import { type ClaudeTopologyInput, projectClaudeTopology } from "../src/workbench/claude-topology.js";
import { CONTROL_CONTRACT_VERSION, CONTROL_PERMIT_POLICY, type NativeControlReceipt } from "../src/workbench/control.js";
import { buildControlReply, MAX_CONTROL_REPLY_BYTES } from "../src/workbench/control-reply.js";
import type { WorkflowSource } from "../src/workbench/designer.js";
import { type DetachedControlClient, type DetachedControlExecution, type DetachedControlInput, executeDetachedControl } from "../src/workbench/detached-control.js";
import { projectDetachedReading } from "../src/workbench/detached-observer.js";
import { type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { buildWorkflowExecuteReply, decideExecute, EXECUTE_GRANT, type ExecuteDecision, type LaunchOutcome, type WorkflowExecuteRequest } from "../src/workbench/execute.js";
import { readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { FurnaceHostedExecutor, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
import { decodeDetachedCommand } from "../src/workbench/hosts/local-detached.js";
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
// wb-xbq: the 8-bit C1 introducers and ST, each the same control as its 7-bit ESC form.
const C1_DCS = cp(0x90);
const C1_SOS = cp(0x98);
const C1_CSI = cp(0x9b);
const C1_ST = cp(0x9c);
const C1_OSC = cp(0x9d);
const C1_PM = cp(0x9e);
const C1_APC = cp(0x9f);
// wb-rqd: format controls (General_Category Cf, not default-ignorable) that defeat a reader: the interlinear annotation
// anchor, separator and terminator, and two of the Egyptian hieroglyph format controls.
const ANNOTATION_ANCHOR = cp(0xfff9);
const ANNOTATION_SEPARATOR = cp(0xfffa);
const ANNOTATION_TERMINATOR = cp(0xfffb);
const HIEROGLYPH_JOINER = cp(0x13430);
const HIEROGLYPH_OVERLAY = cp(0x13436);

/**
 * Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates,
 * and the format controls that defeat a reader (wb-rqd: the interlinear annotation controls and the Egyptian hieroglyph format
 * controls).
 */
const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

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

/** Each 7-bit escape introducer, and the 7-bit ST, beside the one C1 code point that is the same control (wb-xbq). */
const EIGHT_BIT_FORMS: readonly (readonly [seven: string, eight: string])[] = [
  [`${ESC}[`, C1_CSI], [`${ESC}P`, C1_DCS], [`${ESC}X`, C1_SOS], [`${ESC}\\`, C1_ST], [`${ESC}]`, C1_OSC], [`${ESC}^`, C1_PM], [`${ESC}_`, C1_APC],
];
/** The 8-bit twin of a text: every 7-bit introducer and ST in it written as its C1 form, nothing else changed. */
const eightBit = (raw: string): string => EIGHT_BIT_FORMS.reduce((text, [seven, eight]) => text.replaceAll(seven, eight), raw);
/** The probes, then the 8-bit twin of every probe holding a 7-bit escape introducer or ST, with the same secrets (wb-xbq). */
function withEightBitTwins(probes: readonly Probe[]): readonly Probe[] {
  const twins = probes.filter(probe => eightBit(probe.raw) !== probe.raw).map(probe => ({ id: `${probe.id} (8-bit twin)`, raw: eightBit(probe.raw), secrets: probe.secrets }));
  return [...probes, ...twins];
}

const CORPUS: readonly Probe[] = withEightBitTwins([
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
  // wb-xbq: the four shapes the wb-69g.5 gate measured on the landing merge (gate-2 cmd_bd3343f25a3d): the 8-bit SGR forms
  // showed the token, the 7-bit forms redacted. Every 7-bit row here, these and the SGR rows above, gains its 8-bit twin.
  { id: "W1 8-bit SGR around the scheme", raw: `${C1_CSI}1mBearer${C1_CSI}0m TOKENAAA`, secrets: ["TOKENAAA"] },
  { id: "W2 7-bit SGR around the scheme", raw: `${ESC}[1mBearer${ESC}[0m TOKENBBB`, secrets: ["TOKENBBB"] },
  { id: "W3 8-bit SGR before sk-ant-", raw: `key=${C1_CSI}31msk-ant-TOKENCCC`, secrets: ["TOKENCCC"] },
  { id: "W4 7-bit SGR before sk-ant-", raw: `key=${ESC}[31msk-ant-TOKENDDD`, secrets: ["TOKENDDD"] },
  // wb-xbq: every string sequence glued inside a keyword in its 7-bit form (twinned), and ST in the other form.
  { id: "Q1 OSC inside password", raw: `pass${ESC}]0;title${BEL}word=OSCSECRET`, secrets: ["OSCSECRET"] },
  { id: "Q2 DCS inside the scheme", raw: `Authorization: Bea${ESC}Pq${ESC}\\rer DCSSECRET`, secrets: ["DCSSECRET"] },
  { id: "Q3 SOS inside ghp_", raw: `see gh${ESC}Xs${ESC}\\p_SOSSECRET`, secrets: ["SOSSECRET"] },
  { id: "Q4 PM inside api_key", raw: `api${ESC}^p${ESC}\\_key=PMSECRET`, secrets: ["PMSECRET"] },
  { id: "Q5 APC inside sk-ant-", raw: `key sk-${ESC}_a${ESC}\\ant-APCSECRET`, secrets: ["APCSECRET"] },
  { id: "Q6 OSC ended by the 8-bit ST", raw: `pass${ESC}]0;t${C1_ST}word=STEIGHTSECRET`, secrets: ["STEIGHTSECRET"] },
  { id: "Q7 8-bit OSC ended by the 7-bit ST", raw: `pass${C1_OSC}0;t${ESC}\\word=STSEVENSECRET`, secrets: ["STSEVENSECRET"] },
  // wb-rqd: the two shapes the wb-69g.5 gate measured showing the secret on all six execute display paths (an interlinear
  // annotation anchor inside the keyword and inside the scheme), the other two annotation controls, and two Egyptian
  // hieroglyph format controls, the overlay both before and inside the scheme.
  { id: "R1 U+FFF9 inside password", raw: `pass${ANNOTATION_ANCHOR}word=ANCHORSECRET`, secrets: ["ANCHORSECRET"] },
  { id: "R2 U+FFF9 inside the scheme", raw: `Authorization: Bea${ANNOTATION_ANCHOR}rer ANCHORTOKEN`, secrets: ["ANCHORTOKEN"] },
  { id: "R3 U+FFFA inside api_key", raw: `api${ANNOTATION_SEPARATOR}_key=SEPARATORSECRET`, secrets: ["SEPARATORSECRET"] },
  { id: "R4 U+FFFB inside sk-ant-", raw: `key sk-${ANNOTATION_TERMINATOR}ant-TERMINATORSECRET`, secrets: ["TERMINATORSECRET"] },
  { id: "R5 U+13430 inside ghp_", raw: `see gh${HIEROGLYPH_JOINER}p_JOINERSECRET`, secrets: ["JOINERSECRET"] },
  { id: "R6 U+13436 before and inside the scheme", raw: `x${HIEROGLYPH_OVERLAY}Bea${HIEROGLYPH_OVERLAY}rer OVERLAYSECRET`, secrets: ["OVERLAYSECRET"] },
]);

/**
 * The 17:32Z acceptance set. Units: every code point the wb-752.2 respin gate measured as the ONLY separator before
 * ghp_/sk-ant-/Bearer/Basic (G10 residual, G11 gains), the F2 correction (U+0085 and NUL before a \b prefix), the wb-0kg.6
 * known-residual code points (U+2061, U+2064, U+206A, U+115F, U+FFA0, U+E0020, U+1D173), the site-24 and timeline
 * real-path classes (U+0080, U+009F, U+202A, U+202C, U+2069 beside the rest), further default-ignorables, the bidi marks
 * and an SGR sequence. Positions: between two tokens (before each \b-anchored start, and as the space after a scheme),
 * inside a keyword, prefix, key or token (the G11 keyword splits and the U+202E in-token regression), and the
 * position-aware mixes. wb-xbq: the OSC and DCS string sequences, ST in either form, and the 8-bit twin of every shape
 * holding a 7-bit escape unit. wb-rqd: the three interlinear annotation controls and the first, the overlay and the last of
 * the Egyptian hieroglyph format controls.
 */
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0, 0xfff9, 0xfffa, 0xfffb, 0x13430, 0x13436, 0x1343f,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map(code => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", `${ESC}[0m`],
  ["OSC", `${ESC}]0;t${BEL}`],
  ["DCS", `${ESC}Pq${ESC}\\`],
  ["OSC ended by the 8-bit ST", `${ESC}]0;t${C1_ST}`],
  ["8-bit OSC ended by the 7-bit ST", `${C1_OSC}0;t${ESC}\\`],
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
const ACCEPTANCE: readonly Probe[] = withEightBitTwins(ACCEPTANCE_UNITS.flatMap(([name, unit]) =>
  [...BETWEEN_TOKENS, ...(isWhitespace(unit) ? [] : WITHIN_TOKENS)].map(([position, shape]) => {
    const secret = `ACCEPT${name.replace(/[^A-Z0-9]/g, "")}${position.replace(/[^a-z]/g, "").slice(0, 24)}`;
    return { id: `${name} ${position}`, raw: shape(unit, secret), secrets: [secret] };
  }),
));

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

/**
 * Site 23 DIRECT-CALLER row (wb-0kg.6 respin U4, owner O1 bound 2026-10-16 08:31Z): detached-control.ts sanitized() calls the
 * one helper with the label layout, and wb-952 counts it as census site 23. Every display it feeds runs through the REAL
 * executeDetachedControl: the client frame (decoded by the host's own decodeDetachedCommand, as the real client does before
 * writing it), the reason the host's controlAudit stores from that frame (local-detached.ts:650 redacts the decoded reason),
 * the host-refusal, client-refusal, EACCES and transport diagnostics, and every string of each execution. The projection is
 * seeded by hand with the W13-G reader convention: an invocation owned by its host process, confirmed by host instance, pid
 * and owner.
 */
const CONTROL_OWNER = "local-os:uid:1000";
const CONTROL_SCOPE: ObservationScope = { workspace: "/tmp/detached-control-ws", principal: CONTROL_OWNER };
const CONTROL_HOST = "ab".repeat(24);
const CONTROL_INVOCATION: NativeRef = { provider: "local-detached", type: "invocation", id: "inv-control-corpus" };
const CONTROL_HOST_PROCESS: NativeRef = { provider: "local-detached", type: "host-process", id: `${CONTROL_HOST}:4242` };
function controlProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [CONTROL_INVOCATION, CONTROL_HOST_PROCESS]) {
    projection.refresh({
      source, scope: CONTROL_SCOPE, capturedAt: NOW, observedAt: NOW, kind: `local-detached.${source.type}.snapshot`,
      node: { title: source.id, type: "workflow", statusText: "running", statusTone: "active" },
    });
  }
  projection.relate({
    scope: CONTROL_SCOPE, from: CONTROL_INVOCATION, to: CONTROL_HOST_PROCESS, kind: "ownership",
    provenance: { source: "local-detached", observedAt: NOW, nativeConfirmationRef: `local-detached:${CONTROL_HOST}:4242:${CONTROL_OWNER}` },
  });
  return projection;
}
function controlExecution(reason: string, cancel: DetachedControlClient["cancel"]): Promise<DetachedControlExecution> {
  const request: DetachedControlInput["request"] = {
    scope: { ...CONTROL_SCOPE }, principal: { id: CONTROL_OWNER, role: "local-operator" }, grants: ["control:local-detached.cancel"],
    target: { ...CONTROL_INVOCATION }, action: "cancel", params: { confirmed: true, reason }, invocationId: "inv-control-request",
    requestedAt: "2026-10-15T11:59:00.000Z",
  };
  const shutdown: DetachedControlClient["shutdown"] = async () => {
    throw new Error("the site-23 driver sends cancel only");
  };
  return executeDetachedControl({ request, deps: { projection: controlProjection() }, connect: () => ({ cancel, shutdown }), now: () => NOW });
}
async function detachedControlTexts(raw: string): Promise<string[]> {
  const frames: string[] = [];
  const settled = await controlExecution(raw, async frame => {
    decodeDetachedCommand({ command: "cancel", invocationId: CONTROL_INVOCATION.id, reason: frame });
    frames.push(frame);
    return { accepted: true, terminalConfirmed: false };
  });
  if (settled.status !== "settled" || frames.length !== 1) throw new Error(`site 23: the frame did not reach the host (${settled.status})`);
  const texts = [frames[0], redactWorkbenchText(frames[0]), ...strings(settled)];
  const failures: readonly (readonly [error: Error, status: DetachedControlExecution["status"]])[] = [
    [new Error(`Detached authorization: ${raw}`), "refused"],
    [new Error(`Authorization: ${raw}`), "refused"],
    [Object.assign(new Error(`connect EACCES ${raw}`), { code: "EACCES" }), "refused"],
    [new Error(`Detached host disconnected before reply. ${raw}`), "uncertain"],
  ];
  for (const [error, status] of failures) {
    const execution = await controlExecution("operator note", async () => {
      throw error;
    });
    if (execution.status !== status) throw new Error(`site 23: expected ${status}, got ${execution.status}`);
    texts.push(...strings(execution));
  }
  return texts;
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

/**
 * DIRECT-CALLER row (wb-752.4 O1, owner 2026-10-16T01:22Z): site 13 control-reply.ts buildControlReply routes every display
 * string of the workflow_control reply through the one helper with the text layout, exactly once. A hand-built result receipt
 * carries the producer's raw text in the requested target id and in both native echo refs, as the control wiring could hand the
 * builder a receipt the core did not mint (the landed core refuses unsafe refs); the cap is the maximum, so no compact cut hides
 * a secret.
 */
function controlReplyTexts(raw: string): string[] {
  const receipt: NativeControlReceipt = {
    contractVersion: CONTROL_CONTRACT_VERSION, requestId: "ctl_corpus", scope: { workspace: ALICE.workspace, principal: ALICE.principal }, principal: { id: ALICE.principal },
    grant: "control:furnace.stop", policy: CONTROL_PERMIT_POLICY, target: { provider: "furnace", type: "run", id: raw }, action: "stop", invocationId: "inv-control-corpus",
    ownershipConfirmationRef: "req-control-corpus", requestedAt: NOW, decidedAt: NOW, phase: "result", acknowledgedAt: NOW, nativeAckRef: raw, outcome: "completed",
    nativeResultRef: raw, settledAt: NOW,
  };
  return strings(buildControlReply(receipt, { maxBytes: MAX_CONTROL_REPLY_BYTES }).reply);
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
  { site: "telemetry.ts providerName (buildOperationsTelemetry eventLag.providers)", texts: telemetryTexts },
  { site: "site 7 topology-slice.ts labelOf (selectLinkedTopology)", texts: topologyTexts },
  { site: "site 8 furnace-hosted.ts safeText (FurnaceHostedExecutor.start)", texts: hostedTexts },
  { site: "site 9 patch-proposal.ts displayText (proposeWorkflowPatch)", texts: patchTexts },
  { site: "site 10 beads-observer.ts cleanText (readBeadsWork, projectBeadsWork)", texts: beadsTexts },
  { site: "site 13 control-reply.ts buildControlReply (requested target id, acknowledged and result echo refs)", texts: controlReplyTexts },
  { site: "site 15 furnace-evidence.ts sanitize (readFurnaceAttemptLogEvidence)", texts: furnaceEvidenceTexts },
  { site: "site 16 evidence-loader.ts safeChunks (EvidenceStore)", texts: storeTexts },
  { site: "claude-evidence.ts sanitizeRow (readClaudeMessageEvidence preview lines)", texts: claudeEvidenceTexts },
  { site: "site 18 detached-observer.ts shown (projectDetachedReading)", texts: detachedTexts },
  { site: "sites 19/20 workflow_inspect and workbench_catalog replies", texts: replyTexts },
  { site: "site 12 execute.ts buildWorkflowExecuteReply (DIRECT-CALLER: reason, policy value and key, native reference id and scope, definition id, invocation reference)", texts: executeTexts },
  { site: "site 22 observe-query.ts clean (observeInvocation)", texts: observeTexts },
  { site: "wb-h8f.10 latency.ts displayText (selectLatencyDecomposition provider and evidence paths)", texts: latencyTexts },
  { site: "site 23 detached-control.ts sanitized (executeDetachedControl)", texts: detachedControlTexts },
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

/**
 * wb-xbq (owner-filed from the wb-69g.5 gate F1): "parse 8-bit C1 CSI/string sequences as WHOLE ESCAPE UNITS mirroring the
 * 7-bit forms. RED-FIRST: the four measured shapes through the 952 corpus SITES; the 952 corpus gains the 8-BIT TWINS of
 * every 7-bit SGR shape; EQUIVALENCE CHECK 7-bit vs 8-bit on every corpus row." CORPUS and ACCEPTANCE above carry the measured
 * shapes and the twins through every census site. Every assertion here names its probe and never prints a secret-bearing value.
 */
describe("wb-xbq 8-bit C1 sequences are whole escape units, as their 7-bit forms", () => {
  const LAYOUTS = ["text", "label", "terminal", "lines"] as const;
  /**
   * Site 9's displayed text alone. Its reply also carries the sha256 of the raw candidate and the designer's verdict on it,
   * both read from the raw source rather than displayed from it: designer.ts refuses the 7-bit candidate for its C0 ESC and
   * admits the 8-bit one, whose C1 introducers it does not refuse (a validator asymmetry outside the one helper).
   */
  function patchDisplayTexts(raw: string): string[] {
    const commented = raw.split(LF).map(line => `// ${line}`).join(LF);
    const proposal = proposeWorkflowPatch({ base: memorySource("return 1;"), candidateSource: `${HEADER}${commented}\nreturn 1;`, rationale: raw });
    return [proposal.rationale, ...proposal.diff.hunks.map(hunk => hunk.text)];
  }

  it("every corpus row and its 8-bit twin display identically through every census site (a row without a 7-bit unit is its own twin)", async () => {
    const twinned = [...CORPUS, ...ACCEPTANCE].filter(probe => eightBit(probe.raw) !== probe.raw);
    // Not vacuous: the measured 7-bit shapes, every SGR row, the class probes and every string sequence are twinned.
    const named = ["W2 7-bit SGR around the scheme", "W4 7-bit SGR before sk-ant-", "S2 bearer wrapped in SGR", "S3 SGR after the scheme", "S6 SGR around the keyword", "X7 SGR before and inside sk-ant-", "C0 separators {}", "Q1 OSC inside password", "Q2 DCS inside the scheme", "Q3 SOS inside ghp_", "Q4 PM inside api_key", "Q5 APC inside sk-ant-", "Q6 OSC ended by the 8-bit ST", "Q7 8-bit OSC ended by the 7-bit ST", "SGR inside password", "OSC inside Bearer", "DCS before ghp_"];
    expect(named.filter(id => !twinned.some(probe => probe.id === id))).toEqual([]);
    // The same displayed strings, in any order: the execute policy echo keeps its keys in canonical raw code-unit order, which
    // puts ESC before the letters and U+009B after them.
    const displayed = async (texts: Site["texts"], raw: string): Promise<string> => JSON.stringify([...(await texts(raw))].sort());
    const failures: string[] = [];
    for (const { site, texts } of SITES) {
      const shown = texts === patchTexts ? patchDisplayTexts : texts;
      for (const probe of twinned) if ((await displayed(shown, probe.raw)) !== (await displayed(shown, eightBit(probe.raw)))) failures.push(`${site}: ${probe.id}`);
    }
    expect(failures).toEqual([]);
  });

  it("the four shapes the wb-69g.5 gate measured: the 8-bit SGR forms render exactly as the 7-bit forms, in every layout", () => {
    const measured = [
      { id: "scheme", eight: `${C1_CSI}1mBearer${C1_CSI}0m TOKENAAA`, seven: `${ESC}[1mBearer${ESC}[0m TOKENBBB`, shown: { text: "[REDACTED]", label: "[REDACTED]", terminal: "[REDACTED]", lines: "[REDACTED]" } },
      { id: "prefix", eight: `key=${C1_CSI}31msk-ant-TOKENCCC`, seven: `key=${ESC}[31msk-ant-TOKENDDD`, shown: { text: "key=[REDACTED]", label: "key= [REDACTED]", terminal: "key=[REDACTED]", lines: "key=[REDACTED]" } },
    ];
    const failures: string[] = [];
    for (const { id, eight, seven, shown } of measured) {
      for (const layout of LAYOUTS) {
        if (sanitizeWorkbenchText(seven, 2000, layout) !== shown[layout]) failures.push(`${id} 7-bit (${layout})`);
        if (sanitizeWorkbenchText(eight, 2000, layout) !== shown[layout]) failures.push(`${id} 8-bit (${layout})`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("stripUnsafeText removes an 8-bit sequence whole, as its 7-bit form, and an unterminated introducer on its own", () => {
    expect(stripUnsafeText(`a${C1_CSI}1;31mb`)).toBe(stripUnsafeText(`a${ESC}[1;31mb`));
    expect(stripUnsafeText(`a${C1_CSI}1;31mb`)).toBe("ab");
    for (const introducer of [C1_DCS, C1_SOS, C1_OSC, C1_PM, C1_APC]) {
      for (const end of [BEL, C1_ST, `${ESC}\\`]) expect(stripUnsafeText(`a${introducer}0;body${end}b`), `U+${introducer.codePointAt(0)?.toString(16)}`).toBe("ab");
    }
    // ST is one control in either form, whichever form opened the string, and the first one ends it.
    expect(stripUnsafeText(`a${ESC}]0;body${C1_ST}b`)).toBe("ab");
    expect(stripUnsafeText(`a${C1_OSC}0;t${C1_ST}b${BEL}c`)).toBe(stripUnsafeText(`a${ESC}]0;t${ESC}\\b${BEL}c`));
    expect(stripUnsafeText(`a${C1_OSC}0;t${C1_ST}b${BEL}c`)).toBe("abc");
    // Unterminated, the introducer is one unit and the rest stays text, as ESC is for the 7-bit prefix.
    expect(stripUnsafeText(`a${C1_OSC}0;title`)).toBe("a0;title");
    expect(stripUnsafeText(`a${ESC}]0;title`)).toBe("a]0;title");
    expect(stripUnsafeText(`a${C1_CSI}1;`)).toBe("a1;");
    expect(stripUnsafeText(C1_CSI)).toBe("");
  });

  it("an 8-bit introducer or ST is still one C1 control: the reading that drops it alone stays covered", () => {
    const lone = [
      // The final byte of the CSI read whole is also the next letter of the keyword when the introducer is dropped alone.
      { id: "CSI inside Bearer", raw: `Authorization: Bea${C1_CSI}rer LONESECRETONE` },
      { id: "CSI inside password", raw: `pass${C1_CSI}word=LONESECRETTWO` },
      { id: "CSI inside ghp_", raw: `see gh${C1_CSI}p_LONESECRETTHREE` },
      // The body of the string read whole is the rest of the keyword when its introducer and ST are dropped alone.
      { id: "OSC body inside Bearer", raw: `Authorization: Bea${C1_OSC}rer${C1_ST} LONESECRETFOUR` },
      // Read as one control, U+009C is body inside a 7-bit string, which then ends at BEL instead.
      { id: "ST inside a 7-bit string", raw: `Authorization: Bea${ESC}]0;x${C1_ST}rer${BEL}rer LONESECRETFIVE` },
    ];
    const failures: string[] = [];
    for (const { id, raw } of lone) {
      for (const layout of LAYOUTS) if (sanitizeWorkbenchText(raw, 2000, layout).includes("LONESECRET")) failures.push(`${id} (${layout})`);
    }
    expect(failures).toEqual([]);
  });

  it("a JSON key an 8-bit sequence splits is still a secret field, as with the 7-bit form, and so is one a lone introducer splits", () => {
    const fields = [
      { name: "8-bit SGR inside password", key: `pass${C1_CSI}0mword`, value: "opaque-c1-secret" },
      { name: "8-bit OSC inside api_key", key: `api${C1_OSC}0;t${C1_ST}_key`, value: "opaque-c1-string" },
      { name: "7-bit SGR inside password", key: `pass${ESC}[0mword`, value: "opaque-esc-secret" },
      { name: "lone U+009B inside password", key: `pass${C1_CSI}word`, value: "opaque-c1-lone" },
    ];
    const text = JSON.stringify(sanitizeWorkbenchJson(Object.fromEntries(fields.map(({ key, value }) => [key, value]))));
    expect(fields.filter(({ value }) => text.includes(value)).map(({ name }) => name)).toEqual([]);
  });
});

/**
 * wb-rqd (owner-filed from the wb-69g.5 gate F2): "a FALSE-POSITIVE CENSUS over the 952 corpus and the fixture texts". CORPUS
 * rows R1-R6 and the ACCEPTANCE shapes of six wb-rqd units carry the refused format controls through every census site; no
 * other row holds a format control that is not default-ignorable, so the widening changes no other row's display. The rest of
 * the census (the engine's format controls, the fixture texts, identity admission) is test/workbench-format-control-census.test.ts.
 */
describe("wb-rqd false-positive census over the 952 corpus", () => {
  it("only the wb-rqd rows hold a format control that is not default-ignorable, and each such control is one of its six refused units", () => {
    const FORMAT = /\p{Cf}/u;
    const IGNORABLE = /\p{Default_Ignorable_Code_Point}/u;
    const units = [0xfff9, 0xfffa, 0xfffb, 0x13430, 0x13436, 0x1343f];
    const formatControls = (text: string): number[] => [...text].filter(unit => FORMAT.test(unit) && !IGNORABLE.test(unit)).map(unit => unit.codePointAt(0) ?? -1);
    const names = units.map(code => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    const fromRqd = (probe: Probe): boolean => /^R[1-6] /.test(probe.id) || names.some(name => probe.id.startsWith(`${name} `));
    const probes = [...CORPUS, ...ACCEPTANCE];
    expect(probes.filter(fromRqd).length).toBe(6 + units.length * (BETWEEN_TOKENS.length + WITHIN_TOKENS.length));
    expect(probes.filter(probe => formatControls(probe.raw).length > 0 !== fromRqd(probe)).map(probe => probe.id)).toEqual([]);
    expect(probes.filter(probe => formatControls(probe.raw).some(code => !units.includes(code))).map(probe => probe.id)).toEqual([]);
  });
});
