/**
 * W04-B privacy and size-bound falsifier for the Claude transcript adapter (wb-dc0.1).
 * Fixture SessionMessage shapes through the injected reader seam (T5); the SDK is never executed.
 *
 * Respin 3 pins SITE 21 (the wb-952 census site readClaudeTranscript) to the ONE shared helper with its NAMED "lines"
 * layout: whole-text redaction over every reading of every gap first, then LF row structure kept and every other unsafe
 * unit dropped, so the adapter deletes nothing before redaction has read it. The prior cut inverted that order: a local
 * strip DELETED separator-class units and glued tokens that its second redaction pass could no longer see (305 of 756
 * corpus shapes leaked on the live EvidenceStore claude path, measured by the 2026-10-16 04:38Z gate). The separator corpus
 * below therefore runs through readClaudeTranscript AND the real EvidenceStore claude path the host builds.
 * Seat rule F11: every invisible or control code point is built with String.fromCodePoint; none is typed raw.
 */
import { readFileSync } from 'node:fs';
import type { SessionMessage } from '@anthropic-ai/claude-agent-sdk';
import { describe, expect, it } from 'vitest';
import {
  CLAUDE_TRANSCRIPT_MAX_ROWS,
  CLAUDE_TRANSCRIPT_ROW_CHARS,
  type ClaudeTranscriptRow,
  readClaudeTranscript,
} from '../src/workbench/claude-transcript.js';
import { CLAUDE_TRANSCRIPT_GRANT } from '../src/workbench/evidence-producers.js';
import { createWorkbenchEvidenceStore } from '../src/workbench/evidence-wiring.js';
import { type NativeRef, ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import { redactWorkbenchText, sanitizeWorkbenchText, stripUnsafeText } from '../src/workbench/redaction.js';

// ---------------------------------------------------------------------------------------------------------------------
// The wb-952 separator corpus, MIRRORED VERBATIM from test/workbench-sanitizer-corpus.test.ts lines 48-212 at b459773
// (module-private there, and queued cuts edit that file, so it is mirrored rather than imported). Breadth is pinned below.
// ---------------------------------------------------------------------------------------------------------------------
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

const VT = cp(0x0b);
const FF = cp(0x0c);
const PS = cp(0x2029);

type ReaderOptions = { dir?: string; limit?: number };

function session(type: SessionMessage['type'], uuid: string, message: unknown): SessionMessage {
  return { type, uuid, session_id: 'native-session', message, parent_tool_use_id: null, parent_agent_id: null };
}

function fixtureReader(messages: SessionMessage[]) {
  const calls: Array<{ sessionId: string; options: ReaderOptions | undefined }> = [];
  const read = async (sessionId: string, options?: ReaderOptions): Promise<SessionMessage[]> => {
    calls.push({ sessionId, options });
    return messages;
  };
  return { read, calls };
}

/** The shared helper's own output for a row's text (U3 routing proof): the adapter returns exactly this, then the T2 clip. */
const helperLines = (raw: string): string => sanitizeWorkbenchText(raw, Number.MAX_SAFE_INTEGER, 'lines');
/** A row keeps LF as its line structure; any other unsafe unit in it is a defect. */
const unsafeBesideLineFeed = (text: string): boolean => text.split(LF).some(line => UNSAFE_DISPLAY.test(line));
/** Whether a string carries a lone surrogate, read code point by code point. */
const hasLoneSurrogate = (text: string): boolean =>
  [...text].some(unit => {
    const code = unit.codePointAt(0) ?? 0;
    return code >= 0xd800 && code <= 0xdfff;
  });

const TOOL_INPUT_MARKER = 'W04-TOOL-INPUT-MARKER';
const TOOL_RESULT_MARKER = 'W04-TOOL-RESULT-MARKER';
const THINKING_MARKER = 'W04-THINKING-MARKER';

describe('Claude transcript adapter privacy and bounds', () => {
  it('T1: tool bodies and thinking never enter rows, placeholders are exact', async () => {
    const { read } = fixtureReader([
      session('user', 'u-1', { content: [{ type: 'text', text: 'hello there' }] }),
      session('assistant', 'u-2', {
        content: [
          { type: 'text', text: 'calling a tool' },
          { type: 'tool_use', id: 't-1', name: 'Read', input: { path: TOOL_INPUT_MARKER } },
          { type: 'thinking', thinking: THINKING_MARKER },
        ],
      }),
      session('user', 'u-3', { content: [{ type: 'tool_result', tool_use_id: 't-1', content: TOOL_RESULT_MARKER }] }),
      session('assistant', 'u-4', { content: [{ type: 'thinking', thinking: THINKING_MARKER }] }),
      session('system', 'u-5', undefined),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows.map(row => row.uuid)).toEqual(['u-1', 'u-2', 'u-3', 'u-4', 'u-5']);
    expect(rows.map(row => row.text)).toEqual([
      'hello there',
      'calling a tool',
      '(tool or non-text content)',
      '(tool or non-text content)',
      '(no text)',
    ]);
    const serialized = JSON.stringify(rows);
    for (const marker of [TOOL_INPUT_MARKER, TOOL_RESULT_MARKER, THINKING_MARKER]) expect(serialized).not.toContain(marker);
  });

  it('T2: bounds are exported single-carrier constants with unchanged values', async () => {
    expect(CLAUDE_TRANSCRIPT_ROW_CHARS).toBe(500);
    expect(CLAUDE_TRANSCRIPT_MAX_ROWS).toBe(100);
    const marked = `${'a'.repeat(501)}BEYOND-MARKER${'b'.repeat(1500)}`;
    const { read, calls } = fixtureReader([
      session('assistant', 'long-part', { content: [{ type: 'text', text: marked }] }),
      session('assistant', 'long-string', { content: marked }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.text.length).toBe(CLAUDE_TRANSCRIPT_ROW_CHARS);
      expect(row.text).not.toContain('BEYOND-MARKER');
    }
    for (const requested of [0, -5, 1000]) await readClaudeTranscript('native-session', '/work', requested, read);
    // The SDK counts its limit and offset from the START of the chain, so the adapter asks for the whole chain and keeps the
    // bounded TAIL itself (T2e); every call carries the project directory and no SDK limit.
    expect(calls.map(call => call.options)).toEqual(calls.map(() => ({ dir: '/work' })));
    expect(calls).toHaveLength(4);
    const source = readFileSync(new URL('../src/workbench/claude-transcript.ts', import.meta.url), 'utf8');
    for (const literal of ['500', '100']) {
      const lines = source.split('\n').filter(line => new RegExp(`\\b${literal}\\b`).test(line));
      expect(lines.length).toBe(1);
      expect(lines[0]).toMatch(/^export const CLAUDE_TRANSCRIPT_/);
    }
  });

  it('T2e (wb-idq): the bounded window is the TAIL of the chain, where the rows hosts list as evidence live: a 45-message chain read at 40 keeps messages 5..44', async () => {
    const chain = Array.from({ length: 45 }, (_, index) => session('assistant', `tail-${index}`, { content: `message ${index}` }));
    const { read, calls } = fixtureReader(chain);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows.map(row => row.uuid)).toEqual(chain.slice(5).map(message => message.uuid));
    expect(rows.map(row => row.text)).toEqual(chain.slice(5).map((_, index) => `message ${index + 5}`));
    expect(calls).toEqual([{ sessionId: 'native-session', options: { dir: '/work' } }]);
    for (const [requested, kept] of [[0, 1], [-5, 1], [1000, 45]] as const) {
      const bounded = await readClaudeTranscript('native-session', '/work', requested, read);
      expect(bounded.map(row => row.uuid), `requested ${requested}`).toEqual(chain.slice(-kept).map(message => message.uuid));
    }
  });

  it('T2b: whole-text redaction precedes the clip, so a quoted secret straddling the row bound shows no fragment', async () => {
    const raw = `${'w'.repeat(470)} password="alpha STRADDLESECRET omega" tail`;
    // A clip BEFORE redaction ends inside the quoted value, where only its first word is an unquoted match.
    expect(raw.slice(0, CLAUDE_TRANSCRIPT_ROW_CHARS)).toContain('STRADDLE');
    const { read } = fixtureReader([
      session('assistant', 'straddle-part', { content: [{ type: 'text', text: raw }] }),
      session('assistant', 'straddle-string', { content: raw }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.text).toBe(`${'w'.repeat(470)} password=[REDACTED] tail`);
      for (const fragment of ['alpha', 'STRADDLE', 'omega']) expect(row.text, row.uuid).not.toContain(fragment);
    }
  });

  it('T2c: the row clip never splits a surrogate pair (gate O1: helper first, then a code-point-safe clip)', async () => {
    const face = cp(0x1f600);
    const straddling = `${'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS - 1)}${face}tail`;
    const fitting = `${'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS - 2)}${face}tail`;
    const { read } = fixtureReader([
      session('assistant', 'straddling', { content: straddling }),
      session('assistant', 'fitting', { content: [{ type: 'text', text: fitting }] }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows.map(row => row.text)).toEqual([
      'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS - 1),
      `${'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS - 2)}${face}`,
    ]);
    for (const row of rows) expect(hasLoneSurrogate(row.text), row.uuid).toBe(false);
  });

  it('T2d (wb-idq): a row the bound cut carries clipped: true and an uncut row carries no clipped key at all', async () => {
    const cut = `${'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS)}BEYOND`;
    const exact = 'b'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS);
    const { read } = fixtureReader([
      session('assistant', 'cut', { content: cut }),
      session('assistant', 'exact', { content: [{ type: 'text', text: exact }] }),
      session('user', 'short', { content: 'short row' }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows.map(row => row.clipped)).toEqual([true, undefined, undefined]);
    expect(rows.map(row => 'clipped' in row)).toEqual([true, false, false]);
    expect(rows[0]).toEqual({ type: 'assistant', uuid: 'cut', text: 'a'.repeat(CLAUDE_TRANSCRIPT_ROW_CHARS), clipped: true });
    expect(rows[1]).toEqual({ type: 'assistant', uuid: 'exact', text: exact });
    expect(rows[2]).toEqual({ type: 'user', uuid: 'short', text: 'short row' });
  });

  const ANT = 'sk-ant-api03-W04SECRETvalue123';
  const GHP = 'ghp_W04SECRETvalue456';
  const TOK = 'w04bearertoken789';

  /** U1 probes P1-P8 and P13 plus the glue shapes: a credential must not survive any whitespace or control separator. */
  const probes: Array<{ name: string; text: string; secret: string }> = [
    { name: 'P1 field then LF then sk-ant', text: `token: x${LF}${ANT}`, secret: 'W04SECRETvalue123' },
    { name: 'P2 word then LF then ghp', text: `see${LF}${GHP}`, secret: 'W04SECRETvalue456' },
    { name: 'P3 word then LF then Bearer', text: `auth${LF}Bearer ${TOK}`, secret: TOK },
    { name: 'P4 Bearer TAB token', text: `Bearer${TAB}${TOK}`, secret: TOK },
    { name: 'P5 Basic VT token', text: `Basic${VT}${TOK}`, secret: TOK },
    { name: 'P6 Authorization Bearer LF token', text: `Authorization: Bearer${LF}${TOK}`, secret: TOK },
    { name: 'P8 zero-width inside the prefix', text: `sk-${ZWSP}ant-api03-W04SECRETvalue123`, secret: 'W04SECRETvalue123' },
    { name: 'P13 escape sequence between Bearer and token', text: `Bearer${ESC}[0m ${TOK}`, secret: TOK },
    { name: 'glue CR before ghp', text: `x${CR}${GHP}`, secret: 'W04SECRETvalue456' },
    { name: 'glue FF before sk-ant', text: `x${FF}${ANT}`, secret: 'W04SECRETvalue123' },
    { name: 'NEL inside an unquoted secret value is redacted before it is spaced out', text: `password=w04partone${NEL}w04parttwo`, secret: 'w04parttwo' },
    { name: 'glue VT after api_key', text: `api_key${VT}=${VT}"w04opaque"`, secret: 'w04opaque' },
  ];

  it('T3: no credential survives any separator shape, on string content and on a text part, through the helper itself', async () => {
    for (const probe of probes) {
      const { read } = fixtureReader([
        session('assistant', 'as-part', { content: [{ type: 'text', text: probe.text }] }),
        session('assistant', 'as-string', { content: probe.text }),
      ]);
      const rows = await readClaudeTranscript('native-session', '/work', 40, read);
      // Gate F2: a probe that yields no row would pass every check below vacuously.
      expect(rows.map(row => row.uuid), probe.name).toEqual(['as-part', 'as-string']);
      for (const row of rows) {
        expect(row.text, `${probe.name} (${row.uuid})`).not.toContain(probe.secret);
        expect(row.text, `${probe.name} (${row.uuid}) marks the redaction`).toContain('[REDACTED]');
        expect(row.text, `${probe.name} (${row.uuid}) is the helper's lines output`).toBe(helperLines(probe.text));
      }
    }
  });

  it('T3b: P7 a credential split across two text parts is redacted', async () => {
    const { read } = fixtureReader([
      session('assistant', 'two-parts', { content: [{ type: 'text', text: 'first part' }, { type: 'text', text: ANT }] }),
    ]);
    const [row] = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(row?.text).toBe(`first part${LF}[REDACTED]`);
  });

  it('T3c: line structure is preserved, parts join with LF, separators never fuse words (the lines layout)', async () => {
    const { read } = fixtureReader([
      session('assistant', 'lines', { content: `line one${LF}line two` }),
      session('assistant', 'parts', { content: [{ type: 'text', text: 'one' }, { type: 'text', text: 'two' }] }),
      session('assistant', 'tabbed', { content: `a${TAB}b${CR}c${VT}d${FF}e` }),
      session('assistant', 'zero-width', { content: `in${ZWSP}visible` }),
      session('assistant', 'breaks', { content: `crlf${CR}${LF}nel${NEL}ls${LS}ps${PS}end` }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    // The named layout's documented breaks: CRLF, CR, NEL, LS and PS each become ONE LF; TAB, VT and FF one space.
    expect(rows.map(row => row.text)).toEqual([
      `line one${LF}line two`,
      `one${LF}two`,
      `a b${LF}c d e`,
      'invisible',
      `crlf${LF}nel${LF}ls${LF}ps${LF}end`,
    ]);
  });

  it('T3d: output is display-safe, exactly the helper output, idempotent, and redaction is a fixed point', async () => {
    const raw = `key api_key="w04-transcript-secret" auth Bearer ${TOK} ${ESC}[31mred${ESC}[0m rtl ${RLO}evil${LF}${LF}tail${ESC}`;
    const { read } = fixtureReader([session('assistant', 'secret-row', { content: [{ type: 'text', text: raw }] })]);
    const [row] = await readClaudeTranscript('native-session', '/work', 40, read);
    const text = row?.text ?? '';
    for (const leaked of ['w04-transcript-secret', TOK, ESC, RLO]) expect(text).not.toContain(leaked);
    expect(unsafeBesideLineFeed(text)).toBe(false);
    expect(text).toContain(`${LF}${LF}tail`);
    // Routing, not a local regex: the row IS the shared helper's NAMED-layout output on the fixture text.
    expect(text).toBe(helperLines(raw));
    expect(helperLines(text)).toBe(text);
    for (const line of text.split(LF)) expect(sanitizeWorkbenchText(line)).toBe(line);
    expect(redactWorkbenchText(text, Number.POSITIVE_INFINITY)).toBe(text);
  });

  it('T4 and T5: uuid and type pass through in source order as plain {type, uuid, text} rows', async () => {
    const source = [
      session('user', 'dup', { content: 'same' }),
      session('assistant', 'dup', { content: 'same' }),
      session('system', 'sys', { content: [{ type: 'text', text: 'note' }] }),
    ];
    const { read, calls } = fixtureReader(source);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows).toEqual([
      { type: 'user', uuid: 'dup', text: 'same' },
      { type: 'assistant', uuid: 'dup', text: 'same' },
      { type: 'system', uuid: 'sys', text: 'note' },
    ]);
    for (const row of rows) expect(Object.keys(row).sort()).toEqual(['text', 'type', 'uuid']);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.sessionId).toBe('native-session');
  });
});

describe('SITE 21 separator corpus: readClaudeTranscript rows and the real EvidenceStore claude path (respin U1)', () => {
  const SHAPES: readonly Probe[] = [...CORPUS, ...ACCEPTANCE];
  const SCOPE: ObservationScope = { workspace: '/work', principal: 'local-operator:1:s1' };
  const CAPTURED = '2026-10-16T00:00:00Z';
  /** The module's ref grammar is a uuid (wb-idq): one deterministic uuid per fixture row, s-rows and p-rows apart. */
  const corpusUuid = (kind: 's' | 'p', index: number): string => `0000000${kind === 's' ? '1' : '2'}-0000-4000-8000-${index.toString(16).padStart(12, '0')}`;
  const GLUE_UUID = '00000003-0000-4000-8000-000000000000';
  const STEER_UUID = '00000004-0000-4000-8000-000000000000';
  /** Two fixture messages per shape, string content (s<i>) and one text part (p<i>), under one session per shape. */
  const sessions = new Map<string, SessionMessage[]>(
    SHAPES.map((probe, index) => [
      `sess-${index}`,
      [
        session('assistant', corpusUuid('s', index), { content: probe.raw }),
        session('assistant', corpusUuid('p', index), { content: [{ type: 'text', text: probe.raw }] }),
      ],
    ]),
  );
  const corpusReader = async (sessionId: string): Promise<SessionMessage[]> => [...(sessions.get(sessionId) ?? [])];

  /** The host's EvidenceStore (src/index.ts builds it with no claudeRead, so its default reaches readClaudeTranscript). The
   * projection holds the requesting session nodes: ownership is the requested node's own listing (wb-idq). */
  const projection = new ObservationProjection({ maxEvents: 4096, maxNodes: 2048, maxEdges: 4, maxQuery: 4 });
  function hostStore(claudeRead: (sessionId: string, cwd: string) => Promise<readonly ClaudeTranscriptRow[]>) {
    return createWorkbenchEvidenceStore({
      grants: () => [CLAUDE_TRANSCRIPT_GRANT],
      scope: () => SCOPE,
      projection,
      cwd: () => '/work',
      claudeRead,
      now: () => new Date(CAPTURED),
    });
  }

  async function preview(store: ReturnType<typeof hostStore>, sessionId: string, uuid: string): Promise<readonly string[] | string> {
    const ref: NativeRef = { provider: 'claude-agent-sdk', type: 'session', id: sessionId };
    projection.refresh({
      source: ref, scope: SCOPE, capturedAt: CAPTURED, observedAt: CAPTURED,
      node: { title: `Claude ${sessionId}`, type: 'agent', statusText: 'running', statusTone: 'active' },
      trace: { invocationId: 'wf-privacy' },
      evidenceRefs: [`claude-message:${uuid}`],
    });
    await store.request(SCOPE, ref, `claude-message:${uuid}`);
    const entry = store.get(SCOPE, ref, `claude-message:${uuid}`);
    return entry.state === 'loaded' ? entry.preview : `state ${entry.state}`;
  }

  it('wb-idq store path: the latest message of a 45-row chain loads (inside the 40-row tail) and the first message is a visible transport failure (outside it)', async () => {
    const chain = Array.from({ length: 45 }, (_, index) => session('assistant', `${index.toString(16).padStart(8, '0')}-0000-4000-8000-00000000c0de`, { content: `message ${index}` }));
    const sdkRead = async (): Promise<SessionMessage[]> => [...chain];
    const store = hostStore((sessionId, cwd) => readClaudeTranscript(sessionId, cwd, 40, sdkRead));
    expect(await preview(store, 'chain-session', chain[44]?.uuid ?? '')).toEqual(['assistant:', 'message 44']);
    expect(await preview(store, 'chain-session', chain[0]?.uuid ?? '')).toBe('state unavailable');
  });

  it('mirrors the full corpus breadth, every shape short enough that the row clip never touches it', () => {
    // Each-liveness: an emptied or shrunk table fails here instead of passing every loop below vacuously.
    expect(CORPUS).toHaveLength(60);
    expect(ACCEPTANCE).toHaveLength(696);
    for (const probe of SHAPES) expect(helperLines(probe.raw).length, probe.id).toBeLessThan(CLAUDE_TRANSCRIPT_ROW_CHARS);
  });

  it('U1 mechanism: deleting units before redaction leaks the three measured glue shapes; the adapter rows do not', async () => {
    const measured = [
      { raw: `Authorization: Bearer${NUL}SEPTHREE`, secret: 'SEPTHREE' },
      { raw: `x${ZWSP}Bea${ZWSP}rer MIXONESECRET`, secret: 'MIXONESECRET' },
      { raw: `sk-ant-aaaa${cp(0xad)}TAILIGNORABLE1`, secret: 'TAILIGNORABLE1' },
    ];
    for (const { raw, secret } of measured) {
      // The inversion, demonstrated with the shared primitives (redact, delete, redact again): the token reaches the output.
      const inverted = redactWorkbenchText(stripUnsafeText(redactWorkbenchText(raw, Number.MAX_SAFE_INTEGER)), Number.MAX_SAFE_INTEGER);
      expect(inverted, raw).toContain(secret);
      const { read } = fixtureReader([session('assistant', GLUE_UUID, { content: raw })]);
      const [row] = await readClaudeTranscript('native-session', '/work', 40, read);
      expect(row?.text, raw).toBe(helperLines(raw));
      expect(row?.text, raw).not.toContain(secret);
      const store = hostStore((sessionId, cwd) => readClaudeTranscript(sessionId, cwd, 40, read));
      const shown = await preview(store, 'native-session', GLUE_UUID);
      expect(Array.isArray(shown), `${raw} loads through the store`).toBe(true);
      for (const line of Array.isArray(shown) ? shown : []) expect(line, raw).not.toContain(secret);
    }
  });

  it('GATE-STEER1 (08:08Z fold): planted [REDACTED] marker text never picks which reading wins, on either surface', async () => {
    // The 6ze.32 attack: literal markers in producer text inflate one reading's count so a glued credential prints. The one
    // helper chooses no reading (it redacts under every reading at once), so no marker count can steer it.
    const markers = [`[REDAC${ZWSP}TED]`, '[REDACTED]'];
    const glues = [NUL, ZWSP, BEL, `${ESC}[0m`, BOM];
    const steered: Array<{ raw: string; secret: string }> = [];
    for (const [g, glue] of glues.entries()) {
      for (const [m, marker] of markers.entries()) {
        for (const count of [1, 2, 4, 8]) {
          const secret = `STEERG${g}M${m}N${count}TOKEN`;
          const planted = `${marker} `.repeat(count);
          steered.push(
            { raw: `${planted}Bearer${glue}${secret}`, secret },
            { raw: `${planted}x${glue}Bea${glue}rer ${secret}`, secret },
            { raw: `${planted}sk-ant-aaaa${glue}${secret}`, secret },
          );
        }
      }
    }
    expect(steered).toHaveLength(120);
    const reader = async (sessionId: string): Promise<SessionMessage[]> => {
      const index = Number(sessionId.slice('steer-'.length));
      return [session('assistant', STEER_UUID, { content: steered[index]?.raw ?? '' })];
    };
    const store = hostStore((sessionId, cwd) => readClaudeTranscript(sessionId, cwd, 40, reader));
    const failures: string[] = [];
    for (const [index, { raw, secret }] of steered.entries()) {
      const [row] = await readClaudeTranscript(`steer-${index}`, '/work', 40, reader);
      if (row?.text !== helperLines(raw)) failures.push(`${secret}: row is not the helper's lines output`);
      if (row?.text.includes(secret)) failures.push(`${secret}: leaked on the viewer`);
      const shown = await preview(store, `steer-${index}`, STEER_UUID);
      if (typeof shown === 'string') failures.push(`${secret}: ${shown}`);
      else if (shown.some(line => line.includes(secret))) failures.push(`${secret}: leaked through the store`);
    }
    expect(failures).toEqual([]);
  });

  it(`viewer rows: all ${60 + 696} shapes redacted, display-safe beside LF, exactly the helper lines output, one row per message`, async () => {
    const failures: string[] = [];
    let checked = 0;
    for (const [index, probe] of SHAPES.entries()) {
      const rows = await readClaudeTranscript(`sess-${index}`, '/work', 40, corpusReader);
      if (rows.map(row => row.uuid).join(',') !== `${corpusUuid('s', index)},${corpusUuid('p', index)}`) failures.push(`${probe.id}: rows ${rows.map(row => row.uuid).join(',')}`);
      for (const row of rows) {
        checked += 1;
        if (probe.secrets.some(secret => row.text.includes(secret))) failures.push(`${probe.id} (${row.uuid}): leaked`);
        if (unsafeBesideLineFeed(row.text)) failures.push(`${probe.id} (${row.uuid}): kept an unsafe unit`);
        if (row.text !== helperLines(probe.raw)) failures.push(`${probe.id} (${row.uuid}): not the helper's lines output`);
      }
    }
    expect(failures).toEqual([]);
    expect(checked).toBe(2 * SHAPES.length);
  });

  it('EvidenceStore claude path: adapter rows leak nothing and keep no unsafe unit, regressing nothing the raw-row baseline hides', async () => {
    // The production wiring with only the SDK reader injected: createWorkbenchEvidenceStore -> claudeLoader ->
    // readClaudeTranscript -> EvidenceStore admit/boundPreview/safeChunks.
    const adapted = hostStore((sessionId, cwd) => readClaudeTranscript(sessionId, cwd, 40, corpusReader));
    // The baseline: trunk's adapter returned these shapes verbatim (each is shorter than its row slice).
    const raw = hostStore(async sessionId => {
      const index = Number(sessionId.slice('sess-'.length));
      const text = SHAPES[index]?.raw ?? '';
      return [
        { type: 'assistant' as const, uuid: corpusUuid('s', index), text },
        { type: 'assistant' as const, uuid: corpusUuid('p', index), text },
      ];
    });
    const failures: string[] = [];
    const baselineLeaks: string[] = [];
    let checked = 0;
    for (const [index, probe] of SHAPES.entries()) {
      for (const uuid of [corpusUuid('s', index), corpusUuid('p', index)]) {
        const shown = await preview(adapted, `sess-${index}`, uuid);
        const base = await preview(raw, `sess-${index}`, uuid);
        if (typeof shown === 'string' || shown.length < 2) {
          failures.push(`${probe.id} (${uuid}): ${typeof shown === 'string' ? shown : 'no preview line'}`);
          continue;
        }
        checked += 1;
        if (shown.some(line => probe.secrets.some(secret => line.includes(secret)))) failures.push(`${probe.id} (${uuid}): leaked through the store`);
        if (shown.some(line => UNSAFE_DISPLAY.test(line))) failures.push(`${probe.id} (${uuid}): store kept an unsafe unit`);
        if (typeof base === 'string') failures.push(`${probe.id} (${uuid}) baseline: ${base}`);
        else if (base.some(line => probe.secrets.some(secret => line.includes(secret)))) baselineLeaks.push(`${probe.id} (${uuid})`);
      }
    }
    expect(failures).toEqual([]);
    expect(baselineLeaks).toEqual([]);
    expect(checked).toBe(2 * SHAPES.length);
  });
});
