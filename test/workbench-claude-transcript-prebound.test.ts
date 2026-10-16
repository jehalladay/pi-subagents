/**
 * wb-ig7 falsifier (wb-dc0.1 gate-2 F3, owner-ordered): the Claude transcript adapter must not run the shared display
 * helper over a whole SDK-materialized row before the row clip. Spec F-text: "claude-transcript helper runs over whole
 * SDK text pre-clip: plain 1 MB 3 ms vs crafted dense 1 MB 230 ms; add a straddle-safe pre-bound (clip with an overlap
 * window wider than the longest unsafe unit so no sequence straddles the cut), red-first with the crafted dense input
 * and a straddle control".
 *
 * Cost is pinned deterministically (the largest input the helper ever receives), never by wall time. The helper is
 * wrapped, not replaced: every call still runs the real sanitizeWorkbenchText. Every invisible or control code point is
 * built with String.fromCodePoint (seat rule F11).
 */
import type { SessionMessage } from '@anthropic-ai/claude-agent-sdk';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CLAUDE_TRANSCRIPT_PREBOUND_CHARS,
  CLAUDE_TRANSCRIPT_ROW_CHARS,
  type ClaudeTranscriptRow,
  readClaudeTranscript,
} from '../src/workbench/claude-transcript.js';
import { sanitizeWorkbenchText } from '../src/workbench/redaction.js';

const seen = vi.hoisted(() => ({ lengths: [] as number[] }));

vi.mock('../src/workbench/redaction.js', async importOriginal => {
  const original = await importOriginal<typeof import('../src/workbench/redaction.js')>();
  return {
    ...original,
    sanitizeWorkbenchText: (value: string, max?: number, layout?: Parameters<typeof original.sanitizeWorkbenchText>[2]) => {
      seen.lengths.push(value.length);
      return original.sanitizeWorkbenchText(value, max, layout);
    },
  };
});

const cp = (code: number): string => String.fromCodePoint(code);
const ZWSP = cp(0x200b);
const ESC = cp(0x1b);
const LF = cp(0x0a);

const MEGABYTE = 1024 * 1024;

function row(text: string, shape: 'string' | 'part'): SessionMessage {
  const message = shape === 'string' ? { content: text } : { content: [{ type: 'text', text }] };
  return { type: 'assistant', uuid: `row-${shape}`, session_id: 'native-session', message, parent_tool_use_id: null, parent_agent_id: null };
}

async function readRow(text: string, shape: 'string' | 'part' = 'string'): Promise<ClaudeTranscriptRow> {
  const rows = await readClaudeTranscript('native-session', '/work', 40, async () => [row(text, shape)]);
  expect(rows).toHaveLength(1);
  const [only] = rows;
  if (!only) throw new Error('no row');
  return only;
}

async function readOne(text: string, shape: 'string' | 'part' = 'string'): Promise<string> {
  return (await readRow(text, shape)).text;
}

/** What the adapter returned before the pre-bound: the helper over the WHOLE text, then the row clip. */
function wholeTextRow(text: string): string {
  const shown = sanitizeWorkbenchText(text, Number.MAX_SAFE_INTEGER, 'lines');
  return shown.slice(0, CLAUDE_TRANSCRIPT_ROW_CHARS);
}

/** The whole-text row as wb-idq lands it: `clipped: true` only where the 500-char row bound cut the helper output. */
function wholeTextClipped(text: string): true | undefined {
  return sanitizeWorkbenchText(text, Number.MAX_SAFE_INTEGER, 'lines').length > CLAUDE_TRANSCRIPT_ROW_CHARS ? true : undefined;
}

function dense(size: number): string {
  const unit = `abcdefg${ZWSP}hij${ESC}[0mkl${LF}api_key=mnop `;
  return unit.repeat(Math.ceil(size / unit.length)).slice(0, size);
}

beforeEach(() => {
  seen.lengths.length = 0;
});

describe('wb-ig7 straddle-safe pre-bound on the Claude transcript row text', () => {
  it('B1: the pre-bound is a single exported constant wider than the row clip by a wide margin', () => {
    expect(CLAUDE_TRANSCRIPT_PREBOUND_CHARS).toBeGreaterThanOrEqual(CLAUDE_TRANSCRIPT_ROW_CHARS * 8);
    expect(CLAUDE_TRANSCRIPT_PREBOUND_CHARS).toBeLessThan(MEGABYTE / 16);
  });

  it('B2: a crafted dense 1 MB row never sends more than a few windows to the helper, and the row equals the whole-text row', async () => {
    const text = dense(MEGABYTE);
    for (const shape of ['string', 'part'] as const) {
      seen.lengths.length = 0;
      const shown = await readOne(text, shape);
      expect(Math.max(...seen.lengths), shape).toBeLessThanOrEqual(CLAUDE_TRANSCRIPT_PREBOUND_CHARS * 4);
      expect(shown, shape).toBe(wholeTextRow(text));
    }
  });

  it('B3: a plain 1 MB row is bounded the same way and equals the whole-text row', async () => {
    const text = 'plain prose without any unsafe unit. '.repeat(Math.ceil(MEGABYTE / 37)).slice(0, MEGABYTE);
    seen.lengths.length = 0;
    const shown = await readOne(text);
    expect(Math.max(...seen.lengths)).toBeLessThanOrEqual(CLAUDE_TRANSCRIPT_PREBOUND_CHARS * 4);
    expect(shown).toBe(wholeTextRow(text));
  });

  it('B4 straddle control: a prefixed key cut by the window is redacted whole, not shown as a fragment', async () => {
    const secret = 'sk-ant-api03-STRADDLESECRET99';
    const text = `${ZWSP.repeat(CLAUDE_TRANSCRIPT_PREBOUND_CHARS - 5)}${secret}${ZWSP.repeat(2 * MEGABYTE)}`;
    const shown = await readOne(text);
    expect(shown).toBe('[REDACTED]');
    expect(shown).toBe(wholeTextRow(text));
  });

  it('B5 straddle control: a quoted secret opened before the cut and closed after it is redacted whole', async () => {
    const text = `password="${'alpha omega '.repeat(2000)}" tail${LF}${'z'.repeat(MEGABYTE)}`;
    expect(text.indexOf('" tail')).toBeGreaterThan(CLAUDE_TRANSCRIPT_PREBOUND_CHARS);
    const shown = await readOne(text);
    expect(shown.startsWith('password=[REDACTED] tail')).toBe(true);
    for (const fragment of ['alpha', 'omega']) expect(shown).not.toContain(fragment);
    expect(shown).toBe(wholeTextRow(text));
  });

  it('B6 straddle control: a Bearer token cut by the window is redacted whole', async () => {
    const text = `${ZWSP.repeat(CLAUDE_TRANSCRIPT_PREBOUND_CHARS - 9)}Bearer abcdefghijklmnop${ZWSP.repeat(MEGABYTE)}`;
    const shown = await readOne(text);
    expect(shown).toBe('[REDACTED]');
    expect(shown).toBe(wholeTextRow(text));
  });

  it('B7: a row that fits the window is untouched by the bound (the helper sees exactly the whole text)', async () => {
    const text = `${'w'.repeat(470)} password="alpha STRADDLESECRET omega" tail`;
    seen.lengths.length = 0;
    expect(await readOne(text)).toBe(wholeTextRow(text));
    expect(seen.lengths).toContain(text.length);
  });

  it('B8 (wb-idq clipped flag): the pre-bound row carries clipped: true exactly where the 500-char bound cuts, and no clipped key where it does not', async () => {
    const cases: Array<[string, string, boolean]> = [
      ['dense 1 MB', dense(MEGABYTE), true],
      ['plain 1 MB', 'plain prose without any unsafe unit. '.repeat(Math.ceil(MEGABYTE / 37)).slice(0, MEGABYTE), true],
      ['prefixed key straddling the window, redacted whole', `${ZWSP.repeat(CLAUDE_TRANSCRIPT_PREBOUND_CHARS - 5)}sk-ant-api03-STRADDLESECRET99${ZWSP.repeat(2 * MEGABYTE)}`, false],
      ['Bearer straddling the window, redacted whole', `${ZWSP.repeat(CLAUDE_TRANSCRIPT_PREBOUND_CHARS - 9)}Bearer abcdefghijklmnop${ZWSP.repeat(MEGABYTE)}`, false],
      ['row that fits the window and the bound', `${'w'.repeat(100)} tail`, false],
    ];
    for (const [label, text, cut] of cases) {
      for (const shape of ['string', 'part'] as const) {
        const result = await readRow(text, shape);
        expect(result.clipped, `${label}/${shape}`).toBe(cut ? true : undefined);
        expect('clipped' in result, `${label}/${shape} key`).toBe(cut);
        expect(result.clipped, `${label}/${shape} whole-text`).toBe(wholeTextClipped(text));
        expect(result.text, `${label}/${shape} text`).toBe(wholeTextRow(text));
      }
    }
  });
});
