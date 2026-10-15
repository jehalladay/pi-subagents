/**
 * W04-B privacy and size-bound falsifier for the Claude transcript adapter.
 * Fixture SessionMessage shapes through an injected reader; the SDK is never executed.
 */
import { readFileSync } from 'node:fs';
import type { SessionMessage } from '@anthropic-ai/claude-agent-sdk';
import { describe, expect, it } from 'vitest';
import {
  CLAUDE_TRANSCRIPT_MAX_ROWS,
  CLAUDE_TRANSCRIPT_ROW_CHARS,
  readClaudeTranscript,
} from '../src/workbench/claude-transcript.js';
import { redactWorkbenchText, sanitizeWorkbenchText } from '../src/workbench/redaction.js';

type ReaderOptions = { dir?: string; limit?: number };

function session(type: SessionMessage['type'], uuid: string, message: unknown): SessionMessage {
  return { type, uuid, session_id: 'native-session', message, parent_tool_use_id: null, parent_agent_id: null };
}

// Invisible and control characters are built from code points so this file carries none raw.
const LF = String.fromCharCode(10);
const TAB = String.fromCharCode(9);
const VT = String.fromCharCode(11);
const FF = String.fromCharCode(12);
const CR = String.fromCharCode(13);
const ESC = String.fromCharCode(27);
const NEL = String.fromCharCode(0x85);
const ZWSP = String.fromCharCode(0x200b);
const RLO = String.fromCharCode(0x202e);
// Everything stripUnsafeText removes, except LF which is the row structure.
const UNSAFE_NO_LF = new RegExp(`[${String.fromCharCode(0)}-${String.fromCharCode(9)}${VT}-${String.fromCharCode(0x1f)}${String.fromCharCode(0x7f)}-${String.fromCharCode(0x9f)}${String.fromCharCode(0x202a)}-${RLO}${String.fromCharCode(0x2066)}-${String.fromCharCode(0x2069)}${ZWSP}]`);

function fixtureReader(messages: SessionMessage[]) {
  const calls: Array<{ sessionId: string; options: ReaderOptions | undefined }> = [];
  const read = async (sessionId: string, options?: ReaderOptions): Promise<SessionMessage[]> => {
    calls.push({ sessionId, options });
    return messages;
  };
  return { read, calls };
}

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
    expect(calls.slice(1).map(call => call.options?.limit)).toEqual([1, 1, 100]);
    expect(calls[0]?.options?.dir).toBe('/work');
    const source = readFileSync(new URL('../src/workbench/claude-transcript.ts', import.meta.url), 'utf8');
    for (const literal of ['500', '100']) {
      const lines = source.split('\n').filter(line => new RegExp(`\\b${literal}\\b`).test(line));
      expect(lines.length).toBe(1);
      expect(lines[0]).toMatch(/^export const CLAUDE_TRANSCRIPT_/);
    }
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

  it('T3: no credential survives any separator shape, on string content and on a text part', async () => {
    for (const probe of probes) {
      const { read } = fixtureReader([
        session('assistant', 'as-part', { content: [{ type: 'text', text: probe.text }] }),
        session('assistant', 'as-string', { content: probe.text }),
      ]);
      for (const row of await readClaudeTranscript('native-session', '/work', 40, read)) {
        expect(row.text, `${probe.name} (${row.uuid})`).not.toContain(probe.secret);
        expect(row.text, `${probe.name} (${row.uuid}) marks the redaction`).toContain('[REDACTED]');
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

  it('T3c: line structure is preserved, parts join with LF, separators never fuse words', async () => {
    const { read } = fixtureReader([
      session('assistant', 'lines', { content: `line one${LF}line two` }),
      session('assistant', 'parts', { content: [{ type: 'text', text: 'one' }, { type: 'text', text: 'two' }] }),
      session('assistant', 'tabbed', { content: `a${TAB}b${CR}c${VT}d${FF}e` }),
      session('assistant', 'zero-width', { content: `in${ZWSP}visible` }),
    ]);
    const rows = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(rows.map(row => row.text)).toEqual([`line one${LF}line two`, `one${LF}two`, 'a b c d e', 'invisible']);
  });

  it('T3d: output is display-safe, idempotent per line, and redaction is a fixed point', async () => {
    const raw = `key api_key="w04-transcript-secret" auth Bearer ${TOK} ${ESC}[31mred${ESC}[0m rtl ${RLO}evil${LF}${LF}tail${ESC}`;
    const { read } = fixtureReader([session('assistant', 'secret-row', { content: [{ type: 'text', text: raw }] })]);
    const [row] = await readClaudeTranscript('native-session', '/work', 40, read);
    const text = row?.text ?? '';
    for (const leaked of ['w04-transcript-secret', TOK, ESC, RLO]) expect(text).not.toContain(leaked);
    expect(text).not.toMatch(UNSAFE_NO_LF);
    expect(text).toContain(`${LF}${LF}tail`);
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
