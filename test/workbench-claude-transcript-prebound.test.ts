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
 *
 * Respin (gate-3 verdict cmd_2a1541ce38d3 on d3250c3, U1/U2): the F-text's "so no sequence straddles the cut" is pinned at the
 * window itself. The d3250c3 window cut at a fixed offset, so an escape sequence that began in view and ended past the cut
 * reached the helper unterminated and its body or parameters became row text the whole-text read hides (OSC titles,
 * clipboard writes and hyperlink targets, DCS/SOS/PM/APC bodies, CSI parameter bytes). Every row below reads through
 * readClaudeTranscript and must equal the whole-text row, and no window the helper reads may end inside a sequence in
 * either of the two readings the helper gives one (UNSAFE_UNIT and LONE_C1_UNIT in redaction.ts, wb-xbq).
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

const seen = vi.hoisted(() => ({ lengths: [] as number[], inputs: [] as string[] }));

vi.mock('../src/workbench/redaction.js', async importOriginal => {
  const original = await importOriginal<typeof import('../src/workbench/redaction.js')>();
  return {
    ...original,
    sanitizeWorkbenchText: (value: string, max?: number, layout?: Parameters<typeof original.sanitizeWorkbenchText>[2]) => {
      seen.lengths.push(value.length);
      seen.inputs.push(value);
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
  seen.inputs.length = 0;
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
  }, 120_000);
});


// ---------------------------------------------------------------------------------------------------------------------
// wb-ig7 respin (gate-3 verdict cmd_2a1541ce38d3, U1 + U2): the window never ends inside an escape sequence.
// ---------------------------------------------------------------------------------------------------------------------
const BEL = cp(0x07);
const NUL = cp(0x00);
const TAB = cp(0x09);
/** ST in its 7-bit form (ESC \) and its 8-bit form (U+009C); U+009B is CSI in 8-bit form. */
const ST = `${ESC}\\`;
const ST8 = cp(0x9c);
const CSI8 = cp(0x9b);
const OSC8 = cp(0x9d);
const DCS8 = cp(0x90);
const SOS8 = cp(0x98);
const PM8 = cp(0x9e);
const APC8 = cp(0x9f);
const WINDOW = CLAUDE_TRANSCRIPT_PREBOUND_CHARS;
/** The corpus and 1 MB cost rows run thousands of reads; their budget is explicit so load cannot turn a pass into a timeout. */
const CORPUS_TIMEOUT_MS = 180_000;

/**
 * Every escape sequence of a raw text, read both ways the shared helper reads one (redaction.ts, wb-xbq): LONE_C1_UNIT's 7-bit
 * grammar (ESC [ through a final byte; ESC ] P X ^ _ through BEL or ESC \) and UNSAFE_UNIT's both-forms grammar (U+009B and
 * U+009D U+0090 U+0098 U+009E U+009F introduce too, U+009C ends a string as well, and no string body holds it). Authored here
 * from those grammars, independently of the module's own scan.
 */
const SEQUENCE_READINGS: readonly RegExp[] = [
  /\x1b\[[0-?]*[ -/]*[@-~]|\x1b[\]P^X_][^\x07\x1b]*(?:\x07|\x1b\\)/gu,
  /(?:\x1b\[|\x9b)[0-?]*[ -/]*[@-~]|(?:\x1b[\]P^X_]|[\x90\x98\x9d-\x9f])[^\x07\x1b\x9c]*(?:\x07|\x1b\\|\x9c)/gu,
];

function insideSequence(raw: string, cut: number): boolean {
  for (const reading of SEQUENCE_READINGS) {
    for (const match of raw.matchAll(reading)) if (match.index < cut && cut < match.index + match[0].length) return true;
  }
  return false;
}

interface WindowedRead {
  row: ClaudeTranscriptRow;
  /** The raw-text cut of every window the helper read (a window is a raw prefix plus the two closers). */
  cuts: number[];
  windows: string[];
  /** Whether the helper also read the whole raw text. */
  wholeRead: boolean;
}

/** Read one row and capture what the helper read for it, before any whole-text oracle call below adds to the record. */
async function readWindows(text: string): Promise<WindowedRead> {
  seen.inputs.length = 0;
  seen.lengths.length = 0;
  const row = await readRow(text);
  const windows = seen.inputs.filter(input => input !== text);
  const wholeRead = windows.length < seen.inputs.length;
  for (const window of windows) expect(text.startsWith(window.slice(0, -2)), 'a window is a prefix of the raw text').toBe(true);
  return { row, cuts: windows.map(window => window.length - 2), windows, wholeRead };
}

/**
 * The respin oracle for one raw text: what differs from the whole-text row, and every window cut that falls inside an escape
 * sequence (either reading). An empty list is a pass; a corpus row fails with every failing case listed and counted.
 */
async function sequenceProblems(text: string, hidden?: string): Promise<{ problems: string[]; read: WindowedRead }> {
  const read = await readWindows(text);
  const problems: string[] = [];
  for (const cut of read.cuts) if (insideSequence(text, cut)) problems.push(`window cut at ${cut} inside a sequence`);
  if (read.row.text !== wholeTextRow(text)) problems.push('text differs from the whole-text row');
  if (read.row.clipped !== wholeTextClipped(text)) problems.push('clipped differs from the whole-text row');
  if (hidden !== undefined && read.row.text.includes(hidden)) problems.push(`shows ${JSON.stringify(hidden)}`);
  return { problems, read };
}

/** Run a corpus and fail with the count and the list of failing cases. */
async function expectCorpus(cases: ReadonlyArray<readonly [string, string, string?]>): Promise<number> {
  const failing: string[] = [];
  for (const [label, text, hidden] of cases) {
    const { problems } = await sequenceProblems(text, hidden);
    if (problems.length > 0) failing.push(`${label}: ${problems.join('; ')}`);
  }
  expect(failing, `${failing.length} of ${cases.length} cases fail`).toEqual([]);
  return cases.length;
}

function denseWithoutStops(size: number): string {
  const unit = `abcdefg${ZWSP}hij${LF}kl api_key=mnop `;
  return unit.repeat(Math.ceil(size / unit.length)).slice(0, size);
}

describe('wb-ig7 respin: the pre-bound window never ends inside an escape sequence (U1)', () => {
  it('E1 the gate shapes P1-P6 and P3b (plus the SOS and PM twins of P4): the row is the whole-text row and never shows what it hides', async () => {
    const shapes: ReadonlyArray<readonly [string, string, string]> = [
      ['P1 OSC 0 title, BEL past the cut', `${'A'.repeat(100)}${ESC}]0;${'TITLEPAYLOAD-'.repeat(800)}${BEL} tail`, 'TITLEPAYLOAD'],
      ['P2 OSC 52 clipboard write, ST past the cut', `copied: ${ESC}]52;c;${'Q0xJUEJPQVJEREFUQQ'.repeat(600)}${ST} done`, 'Q0xJUEJPQVJEREFUQQ'],
      ['P3 OSC 8 hyperlink target past the cut', `see ${ESC}]8;;https://example.invalid/path/${'segment/'.repeat(1200)}${ST}link${ESC}]8;;${ST} end`, 'example.invalid'],
      [
        'P3b OSC 8 hidden target carrying an obviously fake signed query',
        `Download: ${ESC}]8;;https://bucket.example.invalid/report.pdf?X-Amz-Signature=FAKESIGNATUREFAKESIGNATURE&pad=${'p'.repeat(9000)}${ST}report${ESC}]8;;${ST} (expires soon)`,
        'FAKESIGNATURE',
      ],
      ['P4 DCS body past the cut', `x ${ESC}P${'DCSBODY;'.repeat(1200)}${ST} y`, 'DCSBODY'],
      ['P4b SOS body past the cut', `x ${ESC}X${'SOSBODY;'.repeat(1200)}${ST} y`, 'SOSBODY'],
      ['P4c PM body past the cut', `x ${ESC}^${'PMBODY;;'.repeat(1200)}${ST} y`, 'PMBODY'],
      ['P5 APC body past the cut', `x ${ESC}_${'DCSBODY;'.repeat(1200)}${ST} y`, 'DCSBODY'],
      ['P6 CSI split at the cut, margin-tuned', `${'V'.repeat(498)}${ZWSP.repeat(WINDOW - 498 - 3)}${ESC}[31mmore text after`, '[3'],
    ];
    for (const [label, text, hidden] of shapes) expect(wholeTextRow(text), `${label}: the whole-text row hides it`).not.toContain(hidden);
    expect(await expectCorpus(shapes)).toBe(9);
  }, CORPUS_TIMEOUT_MS);

  it('E2 every string kind (OSC with BEL and with ST, DCS, SOS, PM, APC) starting in view, its body ending past the cut or before it', async () => {
    const kinds: ReadonlyArray<readonly [string, string, string]> = [
      ['OSC/BEL', `${ESC}]0;`, BEL],
      ['OSC/ST', `${ESC}]8;;`, ST],
      ['DCS', `${ESC}P`, ST],
      ['SOS', `${ESC}X`, ST],
      ['PM', `${ESC}^`, ST],
      ['APC', `${ESC}_`, ST],
    ];
    const cases: Array<readonly [string, string, string]> = [];
    for (const [kind, introducer, terminator] of kinds) {
      for (const start of [0, 1, 37, 250, 499]) {
        for (const [reach, bodyLength] of [['crossing', WINDOW + 300 - start], ['inside', WINDOW / 2 - start]] as const) {
          const body = 'BODYTEXT'.repeat(Math.ceil(bodyLength / 8)).slice(0, bodyLength);
          cases.push([`${kind} start ${start} ${reach}`, `${'V'.repeat(start)}${introducer}${body}${terminator} tail`, 'BODYTEXT']);
        }
      }
    }
    expect(await expectCorpus(cases)).toBe(60);
  }, CORPUS_TIMEOUT_MS);

  it('E3 a CSI split at every interior offset, with margins that put the cut where the first window would fill the row', async () => {
    const cases: Array<readonly [string, string, string]> = [];
    for (const kind of ['[0m', '[38;5;196m', '[?25l', '[2J', '[1;31;4m', '[2 q']) {
      const sequence = `${ESC}${kind}`;
      for (let split = 1; split < sequence.length; split++) {
        for (const margin of new Set([501 - split, 499, 505])) {
          const text = `${'V'.repeat(margin)}${ZWSP.repeat(WINDOW - margin - split)}${sequence}more text after the sequence`;
          cases.push([`CSI ${JSON.stringify(kind)} split ${split} margin ${margin}`, text, '[']);
        }
      }
    }
    expect(await expectCorpus(cases)).toBe(93);
  }, CORPUS_TIMEOUT_MS);

  it('E4 the cut just before a BEL, between the ESC and the backslash of ST, and one or two code units after an introducer', async () => {
    const cases: Array<readonly [string, string, string]> = [];
    for (const margin of [0, 100, 499, 505]) {
      const beforeBel = `${'V'.repeat(margin)}${ESC}]0;${'T'.repeat(WINDOW - margin - 4)}${BEL} tail`;
      expect(beforeBel.charCodeAt(WINDOW)).toBe(0x07);
      cases.push([`cut just before BEL, margin ${margin}`, beforeBel, ']0;']);
      const insideSt = `${'V'.repeat(margin)}${ESC}]0;${'T'.repeat(WINDOW - margin - 5)}${ST} tail`;
      expect([insideSt.charCodeAt(WINDOW - 1), insideSt.charCodeAt(WINDOW)]).toEqual([0x1b, 0x5c]);
      cases.push([`cut between ESC and backslash of ST, margin ${margin}`, insideSt, ']0;']);
      for (const after of [1, 2]) {
        const opened = `${'V'.repeat(margin)}${ZWSP.repeat(WINDOW - margin - after)}${ESC}]0;${'T'.repeat(100)}${BEL} tail`;
        cases.push([`cut ${after} after the ESC of an OSC, margin ${margin}`, opened, ']']);
      }
    }
    expect(await expectCorpus(cases)).toBe(16);
  }, CORPUS_TIMEOUT_MS);

  it('E5 the 8-bit forms (U+009B CSI; U+009D U+0090 U+0098 U+009E U+009F strings; U+009C ST) and mixed terminators straddling the cut', async () => {
    const shapes: ReadonlyArray<readonly [string, string]> = [
      ['8-bit OSC, BEL past the cut', `${'A'.repeat(100)}${OSC8}0;${'TITLEPAYLOAD-'.repeat(800)}${BEL} tail`],
      ['8-bit OSC, 8-bit ST past the cut', `copied: ${OSC8}52;c;${'Q0xJUEJPQVJEREFUQQ'.repeat(600)}${ST8} done`],
      ['8-bit DCS, 7-bit ST past the cut', `x ${DCS8}${'DCSBODY;'.repeat(1200)}${ST} y`],
      ['8-bit SOS, 8-bit ST past the cut', `x ${SOS8}${'SOSBODY;'.repeat(1200)}${ST8} y`],
      ['8-bit PM, 8-bit ST past the cut', `x ${PM8}${'PMBODY;;'.repeat(1200)}${ST8} y`],
      ['8-bit APC, 8-bit ST past the cut', `x ${APC8}${'APCBODY;'.repeat(1200)}${ST8} y`],
      ['8-bit CSI split at the cut, margin-tuned', `${'V'.repeat(498)}${ZWSP.repeat(WINDOW - 498 - 2)}${CSI8}31mmore text after`],
      ['7-bit OSC ended by the 8-bit ST past the cut', `${'A'.repeat(100)}${ESC}]0;${'TITLEPAYLOAD-'.repeat(800)}${ST8} tail`],
      ['7-bit OSC holding an 8-bit ST, ended by BEL past the cut', `${'A'.repeat(100)}${ESC}]0;ti${ST8}${'tle-'.repeat(2500)}${BEL} tail`],
    ];
    expect(await expectCorpus(shapes)).toBe(9);
  }, CORPUS_TIMEOUT_MS);

  it('E6 cut corpus: sequence templates (7-bit, 8-bit, mixed) x gap classes before them x every interior cut offset x margins', async () => {
    const templates = [
      `${ESC}[0m`,
      `${ESC}[38;5;196m`,
      `${ESC}[2 q`,
      `${ESC}]0;title${BEL}`,
      `${ESC}]8;;https://example.invalid/x${ST}`,
      `${ESC}P1$r${ST}`,
      `${ESC}Xsos${ST}`,
      `${ESC}^pm${ST}`,
      `${ESC}_apc${ST}`,
      `${CSI8}0m`,
      `${CSI8}38;5;196m`,
      `${OSC8}0;title${BEL}`,
      `${OSC8}8;;https://example.invalid/x${ST8}`,
      `${DCS8}1$r${ST8}`,
      `${SOS8}sos${ST8}`,
      `${PM8}pm${ST}`,
      `${APC8}apc${ST8}`,
      `${ESC}]0;title${ST8}`,
      `${ESC}]0;ti${ST8}tle${BEL}`,
      // An introducer no reading terminates, then a sequence that does: the second one must still be found.
      `${ESC}]ab${ESC}[31m`,
      `${OSC8}ab${ESC}[31m`,
      `${ESC}[3${ESC}]0;t${BEL}`,
    ];
    const gaps = ['', NUL, LF, TAB, `${ESC}[0m`];
    const cases: Array<readonly [string, string]> = [];
    for (const template of templates) {
      for (let offset = 1; offset < template.length; offset++) {
        for (const gap of gaps) {
          for (const margin of new Set([Math.max(0, 501 - offset), 499, 505])) {
            const text = `${'V'.repeat(margin)}${gap}${ZWSP.repeat(WINDOW - margin - gap.length - offset)}${template} after`;
            cases.push([`template ${JSON.stringify(template)} offset ${offset} gap ${JSON.stringify(gap)} margin ${margin}`, text]);
          }
        }
      }
    }
    expect(await expectCorpus(cases)).toBe(2680);
  }, CORPUS_TIMEOUT_MS);

  it('E7 a whitespace gap the cut divides (TAB VT FF LF CR before it, a line break or TAB after it), alone and around a straddled OSC', async () => {
    const before = [TAB, cp(0x0b), cp(0x0c), LF, cp(0x0d)];
    const after = [LF, cp(0x85), cp(0x2028), TAB, cp(0x0d)];
    const cases: Array<readonly [string, string]> = [];
    for (const first of before) {
      for (const second of after) {
        for (const margin of [497, 498, 499, 500]) {
          const pair = `${first.charCodeAt(0)}|${second.charCodeAt(0)} margin ${margin}`;
          cases.push([`gap ${pair}`, `${'V'.repeat(margin)}${ZWSP.repeat(WINDOW - margin - 1)}${first}${second}more text`]);
          const sequence = `${ESC}]0;${'T'.repeat(200)}${BEL}`;
          cases.push([`gap around a straddled OSC ${pair}`, `${'V'.repeat(margin)}${first}${ZWSP.repeat(WINDOW - margin - 3)}${sequence}${second}more text`]);
        }
      }
    }
    expect(await expectCorpus(cases)).toBe(200);
  }, CORPUS_TIMEOUT_MS);

  it('K1 cost: a terminated sequence crossing every x4 bound does not force the whole-text read; the next window starts past it', async () => {
    // 'A' x100, then ESC ] 0 ; (four code units), the body, and BEL.
    const sequenceEnd = 100 + 4 + 700_000 + 1;
    const text = `${'A'.repeat(100)}${ESC}]0;${'T'.repeat(700_000)}${BEL}${dense(400_000)}`;
    expect(text.charCodeAt(sequenceEnd - 1)).toBe(0x07);
    const { problems, read } = await sequenceProblems(text, ']0;');
    expect(problems).toEqual([]);
    expect(read.wholeRead, 'K1 never reads the whole text').toBe(false);
    expect(read.cuts[0], 'the first window stops where the sequence starts').toBe(100);
    expect(read.cuts[1], 'the next window starts past the sequence').toBeGreaterThanOrEqual(sequenceEnd);
    expect(Math.max(...read.cuts)).toBeLessThanOrEqual(sequenceEnd + WINDOW);
  }, CORPUS_TIMEOUT_MS);

  it('K2/K3 cost: an introducer that no reading terminates (7-bit and 8-bit) stays one code point, so a dense 1 MB row stays bounded', async () => {
    for (const [label, introducer] of [['K2 7-bit OSC never terminated', `${ESC}]0;`], ['K3 8-bit OSC never terminated', `${OSC8}0;`]] as const) {
      const text = `${'A'.repeat(10)}${introducer}${denseWithoutStops(MEGABYTE)}`;
      const { problems, read } = await sequenceProblems(text);
      expect(problems, label).toEqual([]);
      expect(read.wholeRead, `${label}: no whole-text read`).toBe(false);
      expect(Math.max(...read.cuts), label).toBeLessThanOrEqual(WINDOW * 4);
    }
  }, CORPUS_TIMEOUT_MS);
});

describe('wb-ig7 respin: credential straddles on the early-return path (U2, gate C1/C2 shapes)', () => {
  it('C1/C2: the FIRST window fills the row (output 502..520) with the secret split at the cut, and redacts it as the whole-text read does', async () => {
    const cases: ReadonlyArray<readonly [string, string, string]> = [
      ['C1 Bearer split inside its token', `${'V'.repeat(495)}${ZWSP.repeat(WINDOW - 495 - 15)}Bearer abcdefghijklmnop tail`, 'abcdefgh'],
      ['C2 assignment split inside its value', `${'V'.repeat(495)}${ZWSP.repeat(WINDOW - 495 - 13)}password=hunter2 tail`, 'hunt'],
    ];
    for (const [label, text, secret] of cases) {
      const { row, windows } = await readWindows(text);
      expect(windows, `${label}: one window read`).toHaveLength(1);
      const [window] = windows;
      if (window === undefined) throw new Error('no window');
      expect(window.length, `${label}: the first window`).toBe(WINDOW + 2);
      const filled = sanitizeWorkbenchText(window, Number.MAX_SAFE_INTEGER, 'lines').length;
      expect(filled, `${label}: margin-tuned`).toBeGreaterThanOrEqual(CLAUDE_TRANSCRIPT_ROW_CHARS + 2);
      expect(filled, `${label}: margin-tuned`).toBeLessThanOrEqual(CLAUDE_TRANSCRIPT_ROW_CHARS + 20);
      expect(row.text, `${label}: text`).toBe(wholeTextRow(text));
      expect(row.clipped, `${label}: clipped`).toBe(wholeTextClipped(text));
      expect(row.text, `${label}: secret`).not.toContain(secret);
    }
  });
});
