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
import { sanitizeWorkbenchText, stripUnsafeText } from '../src/workbench/redaction.js';

type ReaderOptions = { dir?: string; limit?: number };

function session(type: SessionMessage['type'], uuid: string, message: unknown): SessionMessage {
  return { type, uuid, session_id: 'native-session', message, parent_tool_use_id: null } as SessionMessage;
}

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

  it('T3: row text routes through the shared sanitizers and is idempotent', async () => {
    const raw = 'key api_key="w04-transcript-secret" auth Bearer w04bearertoken123 \u001b[31mred\u001b[0m rtl ‮evil';
    const { read } = fixtureReader([session('assistant', 'secret-row', { content: [{ type: 'text', text: raw }] })]);
    const [row] = await readClaudeTranscript('native-session', '/work', 40, read);
    expect(row).toBeDefined();
    const text = row?.text ?? '';
    expect(text).toBe(sanitizeWorkbenchText(stripUnsafeText(raw.slice(0, CLAUDE_TRANSCRIPT_ROW_CHARS))));
    for (const leaked of ['w04-transcript-secret', 'w04bearertoken123', '\u001b', '‮']) expect(text).not.toContain(leaked);
    expect(sanitizeWorkbenchText(text)).toBe(text);
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
