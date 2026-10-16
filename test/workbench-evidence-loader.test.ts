import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { CapabilityError } from '../src/workbench/capability-registry.js';
import {
  EVIDENCE_CONTRACT,
  EVIDENCE_LINE_CHARS,
  type EvidenceContent,
  type EvidenceLoader,
  EvidenceRefusal,
  type EvidenceRequest,
  EvidenceStore,
} from '../src/workbench/evidence-loader.js';
import {
  CLAUDE_TRANSCRIPT_GRANT,
  createEvidenceLoaders,
  EVIDENCE_LOADER_ROWS,
  FORGE_INSPECT_GRANT,
  FURNACE_INSPECT_GRANT,
  type FurnaceEvidenceRead,
} from '../src/workbench/evidence-producers.js';
import type { NativeRef, ObservationScope } from '../src/workbench/observation.js';

const scope: ObservationScope = { workspace: 'workspace', principal: 'reader' };
const native = (provider: string, id = 'n1', type = 'operation'): NativeRef => ({ provider, type, id });
const at = '2026-10-15T00:00:00Z';
const content = (preview: readonly string[], extra: Partial<EvidenceContent> = {}): EvidenceContent => ({
  kind: 'fixture', provider: 'fixture', capturedAt: at, bytes: preview.join('\n').length, truncated: false, preview, freshness: 'current', ...extra,
});
interface Counting extends EvidenceLoader { calls: EvidenceRequest[] }
function counting(handler: (request: EvidenceRequest) => Promise<EvidenceContent>, provider = 'fixture'): Counting {
  const calls: EvidenceRequest[] = [];
  return { provider, requiredGrant: 'fixture:read', calls, canLoad: ref => ref.startsWith('ev:'), load: request => { calls.push(request); return handler(request); } };
}
const store = (loaders: readonly EvidenceLoader[], extra: Partial<ConstructorParameters<typeof EvidenceStore>[0]> = {}) =>
  new EvidenceStore({ loaders, maxEntries: 8, maxBytes: 4096, timeoutMs: 200, ...extra });

describe('EvidenceStore contract (docs/workbench/20)', () => {
  it('names the contract and never loads on construction or get', () => {
    expect(EVIDENCE_CONTRACT).toBe('workbench.evidence-loader/v1');
    const loader = counting(async () => content(['x']));
    const s = store([loader]);
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'not-requested' });
    expect(loader.calls).toHaveLength(0);
  });

  it('loads one ref lazily and idempotently while loading', async () => {
    let release: (value: EvidenceContent) => void = () => {};
    const loader = counting(() => new Promise<EvidenceContent>(resolve => { release = resolve; }));
    const s = store([loader]);
    const first = s.request(scope, native('fixture'), 'ev:1');
    const second = s.request(scope, native('fixture'), 'ev:1');
    expect(second).toBe(first);
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'loading' });
    release(content(['hello']));
    await first;
    expect(loader.calls).toHaveLength(1);
    const entry = s.get(scope, native('fixture'), 'ev:1');
    expect(entry).toMatchObject({ state: 'loaded', provider: 'fixture', preview: ['hello'], truncated: false, freshness: 'current' });
    await s.request(scope, native('fixture'), 'ev:1');
    expect(loader.calls).toHaveLength(1);
  });

  it('routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader', async () => {
    const loader = counting(async () => content(['x']));
    const s = store([loader]);
    await s.request(scope, native('other'), 'ev:1');
    await s.request(scope, native('fixture'), 'unknown-kind:1');
    expect(s.get(scope, native('other'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'no-loader' });
    expect(s.get(scope, native('fixture'), 'unknown-kind:1')).toEqual({ state: 'unavailable', reason: 'no-loader' });
    expect(loader.calls).toHaveLength(0);
  });

  it('keys entries producer-qualified so same-scope cross-producer ref strings cannot collide', async () => {
    const a = counting(async () => content(['from a']), 'a');
    const b = counting(async () => content(['from b']), 'b');
    const s = store([a, b]);
    await s.request(scope, native('a'), 'ev:1');
    await s.request(scope, native('b'), 'ev:1');
    expect(s.get(scope, native('a'), 'ev:1')).toMatchObject({ preview: ['from a'] });
    expect(s.get(scope, native('b'), 'ev:1')).toMatchObject({ preview: ['from b'] });
    expect(s.get(scope, { ...native('a'), scope: 'other-root' }, 'ev:1')).toEqual({ state: 'not-requested' });
  });

  it('maps loader failures to a reason and never keeps raw error text', async () => {
    const cases: Array<[Error, string]> = [
      [new Error('secret sk-ant-leak boom'), 'transport'],
      [new CapabilityError('authorization', 'nope sk-ant-leak'), 'unauthorized'],
      [new CapabilityError('transport', 'down sk-ant-leak'), 'transport'],
      [new CapabilityError('unavailable', 'gone sk-ant-leak'), 'transport'],
      [new CapabilityError('uncertain-effect', 'maybe sk-ant-leak'), 'transport'],
      [new CapabilityError('validation', 'bad sk-ant-leak'), 'no-loader'],
      [new EvidenceRefusal('too-large'), 'too-large'],
    ];
    for (const [error, reason] of cases) {
      const s = store([counting(async () => { throw error; })]);
      await s.request(scope, native('fixture'), 'ev:1');
      const entry = s.get(scope, native('fixture'), 'ev:1');
      expect(entry).toMatchObject({ state: 'unavailable', reason });
      expect(JSON.stringify(entry)).not.toContain('leak');
      expect('preview' in entry).toBe(false);
    }
  });

  it('a synchronous throw from a loader is a transport failure, not an unhandled rejection', async () => {
    const loader: EvidenceLoader = { provider: 'fixture', requiredGrant: 'fixture:read', canLoad: () => true, load: () => { throw new Error('sync boom'); } };
    const s = store([loader]);
    await expect(s.request(scope, native('fixture'), 'ev:1')).resolves.toBeUndefined();
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'transport' });
  });

  it('times out a slow loader, aborts its signal, and drops the late result', async () => {
    let late: (value: EvidenceContent) => void = () => {};
    const loader = counting(() => new Promise<EvidenceContent>(resolve => { late = resolve; }));
    const s = store([loader], { timeoutMs: 15 });
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'timeout' });
    expect(loader.calls[0].signal.aborted).toBe(true);
    late(content(['too late']));
    await Promise.resolve();
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'timeout' });
  });

  it('abort() aborts the loader signal, returns the ref to not-requested, and ignores the late result', async () => {
    let late: (value: EvidenceContent) => void = () => {};
    const loader = counting(() => new Promise<EvidenceContent>(resolve => { late = resolve; }));
    const s = store([loader]);
    const pending = s.request(scope, native('fixture'), 'ev:1');
    s.abort(scope, native('fixture'), 'ev:1');
    expect(loader.calls[0].signal.aborted).toBe(true);
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'not-requested' });
    late(content(['ghost']));
    await pending;
    expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'not-requested' });
  });

  it('abortAll() stops every in-flight read and leaves loaded entries alone', async () => {
    const hang = counting(() => new Promise<EvidenceContent>(() => {}));
    const done = counting(async () => content(['kept']), 'done');
    const s = store([hang, done]);
    await s.request(scope, native('done'), 'ev:1');
    void s.request(scope, native('fixture', 'a'), 'ev:1');
    void s.request(scope, native('fixture', 'b'), 'ev:1');
    s.abortAll();
    expect(hang.calls.every(call => call.signal.aborted)).toBe(true);
    expect(s.get(scope, native('fixture', 'a'), 'ev:1')).toEqual({ state: 'not-requested' });
    expect(s.get(scope, native('done'), 'ev:1')).toMatchObject({ state: 'loaded' });
  });

  it('holds at most maxEntries entries with LRU eviction (a get refreshes recency)', async () => {
    const s = store([counting(async request => content([request.evidenceRef]))], { maxEntries: 2 });
    await s.request(scope, native('fixture', 'a'), 'ev:1');
    await s.request(scope, native('fixture', 'b'), 'ev:1');
    expect(s.get(scope, native('fixture', 'a'), 'ev:1').state).toBe('loaded');
    await s.request(scope, native('fixture', 'c'), 'ev:1');
    expect(s.size).toBe(2);
    expect(s.get(scope, native('fixture', 'b'), 'ev:1')).toEqual({ state: 'not-requested' });
    expect(s.get(scope, native('fixture', 'a'), 'ev:1').state).toBe('loaded');
    expect(s.get(scope, native('fixture', 'c'), 'ev:1').state).toBe('loaded');
  });

  it('evicting an in-flight entry aborts its read', async () => {
    const hang = counting(() => new Promise<EvidenceContent>(() => {}));
    const quick = counting(async () => content(['q']), 'quick');
    const s = store([hang, quick], { maxEntries: 1 });
    void s.request(scope, native('fixture'), 'ev:1');
    await s.request(scope, native('quick'), 'ev:1');
    expect(hang.calls[0].signal.aborted).toBe(true);
  });

  it('bounds a 1 MiB payload: truncated, bytes reported, preview inside the byte budget and visibly marked', async () => {
    const big = 'x'.repeat(1024 * 1024);
    const loader = counting(async () => content([big], { bytes: big.length }));
    const s = store([loader], { maxBytes: 2048 });
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    expect(entry.truncated).toBe(true);
    expect(entry.bytes).toBe(1024 * 1024);
    expect(entry.preview.at(-1)).toBe('[truncated]');
    expect(entry.preview.reduce((sum, line) => sum + Buffer.byteLength(line), 0)).toBeLessThanOrEqual(2048 + '[truncated]'.length);
    expect(entry.preview.every(line => line.length <= EVIDENCE_LINE_CHARS)).toBe(true);
    expect(loader.calls[0].maxBytes).toBe(2048);
  });

  it('a loader reporting more bytes than the budget is truncated even when its preview is short', async () => {
    const s = store([counting(async () => content(['short'], { bytes: 10_000 }))], { maxBytes: 100 });
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1')).toMatchObject({ truncated: true, bytes: 10_000, preview: ['short', '[truncated]'] });
  });

  it('a per-request override can only lower the store budget', async () => {
    const loader = counting(async () => content(['x']));
    const s = store([loader], { maxBytes: 1000 });
    await s.request(scope, native('fixture', 'lower'), 'ev:1', { maxBytes: 100 });
    await s.request(scope, native('fixture', 'higher'), 'ev:1', { maxBytes: 5_000_000 });
    expect(loader.calls.map(call => call.maxBytes)).toEqual([100, 1000]);
  });

  it('marks a loader-declared truncation and many-line payloads as truncated', async () => {
    const s = store([counting(async () => content(Array.from({ length: 5000 }, (_, i) => `line ${i}`), { bytes: 40000 }))], { maxBytes: 1_000_000 });
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    expect(entry.truncated).toBe(true);
    expect(entry.preview.length).toBeLessThanOrEqual(200);
    const declared = store([counting(async () => content(['a'], { truncated: true }))]);
    await declared.request(scope, native('fixture'), 'ev:1');
    expect(declared.get(scope, native('fixture'), 'ev:1')).toMatchObject({ truncated: true, preview: ['a', '[truncated]'] });
  });

  it('redacts secrets before display, including one that would straddle a chunk boundary', async () => {
    const straddle = `${'A'.repeat(EVIDENCE_LINE_CHARS - 8)} Bearer straddlesecret99`;
    const s = store([counting(async () => content(['Authorization: Bearer abc123', '{"api_key":"xyz"}', straddle, 'sk-ant-supersecret']))]);
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    const text = entry.preview.join('\n');
    expect(text).toContain('[REDACTED]');
    for (const secret of ['abc123', 'xyz', 'straddlesecret99', 'supersecret']) expect(text).not.toContain(secret);
  });

  it('strips terminal escapes, bidi and zero-width characters from preview lines', async () => {
    const s = store([counting(async () => content(['red \x1b[31mtext\x1b[0m', 'rtl \u202Eevil', 'zero\u200Bwidth', 'osc \x1b]0;title\x07done', 'multi\nline\r\nsplit']))]);
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    const text = entry.preview.join('\n');
    expect(text).not.toMatch(/[\u001b\u0007\u202E\u200B]/);
    expect(text).toContain('zerowidth');
    expect(entry.preview).toEqual(expect.arrayContaining(['multi', 'line', 'split']));
  });

  it('keeps only digest-shaped sourceBasis, a bounded sanitized receipt, and honors stale freshness', async () => {
    const digest = 'sha256:' + 'a1'.repeat(32);
    const kept = store([counting(async () => content(['x'], { sourceBasis: digest, freshness: 'stale', producerReceipt: 'cmd_1\x1b[31m' }))]);
    await kept.request(scope, native('fixture'), 'ev:1');
    expect(kept.get(scope, native('fixture'), 'ev:1')).toMatchObject({ sourceBasis: digest, freshness: 'stale', producerReceipt: 'cmd_1' });
    const dropped = store([counting(async () => content(['x'], { sourceBasis: 'trust me, I am a basis' }))]);
    await dropped.request(scope, native('fixture'), 'ev:1');
    expect('sourceBasis' in dropped.get(scope, native('fixture'), 'ev:1')).toBe(false);
  });

  it('reports a malformed loader result as transport, never a fabricated entry', async () => {
    for (const bad of [content(['x'], { capturedAt: 'yesterday-ish' }), content(['x'], { bytes: -1 }), content(['x'], { bytes: Number.NaN })]) {
      const s = store([counting(async () => bad)]);
      await s.request(scope, native('fixture'), 'ev:1');
      expect(s.get(scope, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'transport' });
    }
  });

  it('a loader cannot relabel its provider', async () => {
    const s = store([counting(async () => content(['x'], { provider: 'forge' }))]);
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1')).toMatchObject({ provider: 'fixture' });
  });

  it('refuses a cross-scope ref as unauthorized without invoking any loader', async () => {
    const loader = counting(async () => content(['secret of the other workspace']));
    const s = store([loader], { scope });
    for (const other of [{ workspace: 'elsewhere', principal: 'reader' }, { workspace: 'workspace', principal: 'intruder' }]) {
      await s.request(other, native('fixture'), 'ev:1');
      expect(s.get(other, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'unauthorized' });
    }
    expect(loader.calls).toHaveLength(0);
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1').state).toBe('loaded');
    expect(s.get({ workspace: 'elsewhere', principal: 'reader' }, native('fixture'), 'ev:1')).toEqual({ state: 'unavailable', reason: 'unauthorized' });
  });

  it('binds to the first requested scope when the host did not, then refuses any other', async () => {
    const loader = counting(async () => content(['x']));
    const s = store([loader]);
    await s.request(scope, native('fixture'), 'ev:1');
    await s.request({ workspace: 'workspace', principal: 'other' }, native('fixture'), 'ev:1');
    expect(loader.calls).toHaveLength(1);
  });

  it('rejects non-positive budgets', () => {
    for (const bad of [{ maxEntries: 0 }, { maxBytes: 0 }, { timeoutMs: 0 }, { maxEntries: 1.5 }]) expect(() => store([], bad)).toThrow(RangeError);
  });

  it('a retry after an unavailable result asks the loader again', async () => {
    let fail = true;
    const loader = counting(async () => { if (fail) throw new Error('down'); return content(['back']); });
    const s = store([loader]);
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1')).toMatchObject({ reason: 'transport' });
    fail = false;
    await s.request(scope, native('fixture'), 'ev:1');
    expect(s.get(scope, native('fixture'), 'ev:1')).toMatchObject({ state: 'loaded', preview: ['back'] });
  });
});

describe('grant-gated producer loaders (docs/workbench/20 § Producer mapping)', () => {
  const uuid = '11111111-2222-3333-4444-555555555555';
  const claudeRef = native('claude-agent-sdk', 'session-1', 'session');
  const grants = (...held: string[]) => { const list = [...held]; return { list, read: () => list }; };

  it('builds a loader for each supplied reader; without its exact grant every load refuses unauthorized and reads nothing', async () => {
    const readers = { claude: vi.fn(async () => []), furnace: vi.fn(), forge: vi.fn() };
    const targets: ReadonlyArray<readonly [NativeRef, string]> = [
      [claudeRef, `claude-message:${uuid}`],
      [native('furnace', 'run-1', 'run'), 'attempt-1'],
      [native('forge', 'pkg', 'gate-status'), 'forge-operation:op-1'],
    ];
    for (const held of [[], ['claude:transcript-x', 'furnace:*', 'FORGE:INSPECT']]) {
      const loaders = createEvidenceLoaders({ grants: () => held, ...readers });
      expect(loaders.map(l => l.provider)).toEqual(['claude-agent-sdk', 'furnace', 'forge']);
      const s = store(loaders);
      for (const [ref, evidenceRef] of targets) {
        await s.request(scope, ref, evidenceRef);
        expect(s.get(scope, ref, evidenceRef)).toEqual({ state: 'unavailable', reason: 'unauthorized' });
      }
    }
    for (const read of [readers.claude, readers.furnace, readers.forge]) expect(read).not.toHaveBeenCalled();
    expect(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT, FURNACE_INSPECT_GRANT, FORGE_INSPECT_GRANT], ...readers }).map(l => l.provider)).toEqual(['claude-agent-sdk', 'furnace', 'forge']);
    expect(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT] })).toHaveLength(0);
  });

  it('claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves', async () => {
    const readRows = vi.fn(async () => [{ type: 'user', uuid, text: 'hi' }]);
    const s = store(createEvidenceLoaders({ grants: () => [FORGE_INSPECT_GRANT], claude: readRows }));
    await s.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toEqual({ state: 'unavailable', reason: 'unauthorized' });
    const held = grants(CLAUDE_TRANSCRIPT_GRANT);
    const revoked = store(createEvidenceLoaders({ grants: held.read, claude: readRows }));
    held.list.length = 0;
    await revoked.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toEqual(revoked.get(scope, claudeRef, `claude-message:${uuid}`));
    expect(readRows).not.toHaveBeenCalled();
  });

  it('claude: with the grant it selects the row by uuid; a revoked grant refuses on the next load', async () => {
    const held = grants(CLAUDE_TRANSCRIPT_GRANT);
    const readRows = vi.fn(async () => [{ type: 'user', uuid: 'other', text: 'no' }, { type: 'assistant', uuid, text: 'answer\nsecond line' }]);
    const s = store(createEvidenceLoaders({ grants: held.read, claude: readRows, now: () => new Date(at) }));
    await s.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toMatchObject({ state: 'loaded', kind: 'claude-message', preview: ['assistant:', 'answer', 'second line'], freshness: 'current' });
    expect(readRows).toHaveBeenCalledWith(expect.objectContaining({ sessionId: 'session-1' }));
    held.list.length = 0;
    await s.request(scope, claudeRef, 'claude-message:ffffffff-0000-0000-0000-000000000000');
    expect(s.get(scope, claudeRef, 'claude-message:ffffffff-0000-0000-0000-000000000000')).toEqual({ state: 'unavailable', reason: 'unauthorized' });
  });

  it('claude: capturedAt is stamped from the injected clock, never the host clock', async () => {
    const readRows = vi.fn(async () => [{ type: 'assistant', uuid, text: 'answer' }]);
    const s = store(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], claude: readRows, now: () => new Date(at) }));
    await s.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toMatchObject({ state: 'loaded', capturedAt: new Date(at).toISOString() });
  });

  it('claude: a loader built without an injected clock refuses transport and reads nothing, never inventing a timestamp', async () => {
    const readRows = vi.fn(async () => [{ type: 'assistant', uuid, text: 'answer' }]);
    const s = store(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], claude: readRows }));
    await s.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toEqual({ state: 'unavailable', reason: 'transport' });
    expect(readRows).not.toHaveBeenCalled();
  });

  it('claude: a uuid outside the bounded window is transport, never a fabricated row', async () => {
    // The clock is injected so the answer comes from the window check itself, not from the clockless refusal that precedes it.
    const readRows = vi.fn(async () => [{ type: 'user', uuid: 'other', text: 'x' }]);
    const s = store(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], claude: readRows, now: () => new Date(at) }));
    await s.request(scope, claudeRef, `claude-message:${uuid}`);
    expect(s.get(scope, claudeRef, `claude-message:${uuid}`)).toEqual({ state: 'unavailable', reason: 'transport' });
    expect(readRows).toHaveBeenCalledTimes(1);
  });

  it('claude: a non-session node does not resolve claude-message refs', async () => {
    const readRows = vi.fn(async () => []);
    const s = store(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], claude: readRows }));
    const toolUse = native('claude-agent-sdk', 'tool-1', 'tool-use');
    await s.request(scope, toolUse, `claude-message:${uuid}`);
    expect(s.get(scope, toolUse, `claude-message:${uuid}`)).toEqual({ state: 'unavailable', reason: 'no-loader' });
    expect(readRows).not.toHaveBeenCalled();
  });

  const runRef = native('furnace', 'run-1', 'run');
  const furnaceRead = (over: Partial<FurnaceEvidenceRead> = {}): FurnaceEvidenceRead => ({
    runId: 'run-1', attemptId: 'attempt-1', stream: 'stdout', text: 'built\nok', complete: true, lossy: false, capturedAt: at, ...over,
  });

  it('furnace: reads the attempt log with run/attempt identity checks', async () => {
    const reader = vi.fn(async () => furnaceRead());
    const s = store(createEvidenceLoaders({ grants: () => [FURNACE_INSPECT_GRANT], furnace: reader }));
    await s.request(scope, runRef, 'attempt-1');
    expect(s.get(scope, runRef, 'attempt-1')).toMatchObject({ state: 'loaded', kind: 'furnace-attempt-log', truncated: false, preview: ['stdout:', 'built', 'ok'] });
    expect(reader).toHaveBeenCalledWith(expect.objectContaining({ runId: 'run-1', attemptId: 'attempt-1' }));
  });

  it('furnace: lossy, incomplete or paged reads are loaded with truncated true', async () => {
    for (const over of [{ lossy: true }, { complete: false }, { nextCursor: 'cursor-2' }]) {
      const s = store(createEvidenceLoaders({ grants: () => [FURNACE_INSPECT_GRANT], furnace: async () => furnaceRead(over) }));
      await s.request(scope, runRef, 'attempt-1');
      expect(s.get(scope, runRef, 'attempt-1')).toMatchObject({ state: 'loaded', truncated: true });
    }
  });

  it('furnace: an attempt belonging to another run is unauthorized, without its text', async () => {
    for (const over of [{ runId: 'run-2', text: 'foreign log' }, { attemptId: 'attempt-9', text: 'foreign log' }]) {
      const s = store(createEvidenceLoaders({ grants: () => [FURNACE_INSPECT_GRANT], furnace: async () => furnaceRead(over) }));
      await s.request(scope, runRef, 'attempt-1');
      const entry = s.get(scope, runRef, 'attempt-1');
      expect(entry).toEqual({ state: 'unavailable', reason: 'unauthorized' });
      expect(JSON.stringify(entry)).not.toContain('foreign');
    }
  });

  it('furnace: no furnace:inspect grant refuses unauthorized and reads nothing', async () => {
    const reader = vi.fn(async () => furnaceRead());
    const s = store(createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], furnace: reader }));
    await s.request(scope, runRef, 'attempt-1');
    expect(s.get(scope, runRef, 'attempt-1')).toEqual({ state: 'unavailable', reason: 'unauthorized' });
    expect(reader).not.toHaveBeenCalled();
  });

  const forgeRef = native('forge', 'pkg', 'gate-status');
  it('forge: a failed domain verdict is loaded as its own status and never rendered as verified', async () => {
    const s = store(createEvidenceLoaders({
      grants: () => [FORGE_INSPECT_GRANT],
      forge: async () => ({ status: 'failed', verdict: 'FAIL', lines: ['lint ok', 'test failed'], capturedAt: at, sourceBasis: 'sha256:' + 'b2'.repeat(32), producerReceipt: 'cmd_abc' }),
    }));
    await s.request(scope, forgeRef, 'forge-operation:op-1');
    const entry = s.get(scope, forgeRef, 'forge-operation:op-1');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    expect(entry.preview).toEqual(['status: failed', 'verdict: FAIL', 'lint ok', 'test failed']);
    expect(entry.preview.join(' ')).not.toMatch(/verified/i);
    expect(entry.producerReceipt).toBe('cmd_abc');
  });

  it('forge: only validated forge-operation refs resolve; a partial read is truncated', async () => {
    const reader = vi.fn(async () => ({ status: 'running', partial: true, capturedAt: at }));
    const s = store(createEvidenceLoaders({ grants: () => [FORGE_INSPECT_GRANT], forge: reader }));
    await s.request(scope, forgeRef, 'forge-operation:../../etc/passwd');
    await s.request(scope, forgeRef, 'forge-operation:op-2');
    expect(s.get(scope, forgeRef, 'forge-operation:../../etc/passwd')).toEqual({ state: 'unavailable', reason: 'no-loader' });
    expect(s.get(scope, forgeRef, 'forge-operation:op-2')).toMatchObject({ state: 'loaded', truncated: true });
    expect(reader).toHaveBeenCalledTimes(1);
    expect(reader).toHaveBeenCalledWith(expect.objectContaining({ operationId: 'op-2' }));
  });

  it('forge: a reader that bounded and labelled its own result has preview, bytes, truncation and staleness carried verbatim', async () => {
    const s = store(createEvidenceLoaders({
      grants: () => [FORGE_INSPECT_GRANT],
      forge: async () => ({
        status: 'error · FAIL · current gate failed', preview: ['forge-operation:op-3', 'status: error · FAIL · current gate failed'],
        bytes: 4_321, truncated: true, freshness: 'stale', capturedAt: at, producerReceipt: 'op-3',
      }),
    }));
    await s.request(scope, forgeRef, 'forge-operation:op-3');
    const entry = s.get(scope, forgeRef, 'forge-operation:op-3');
    if (entry.state !== 'loaded') throw new Error('expected loaded');
    // The store appends its own single truncation marker to the carried preview.
    expect(entry.preview).toEqual(['forge-operation:op-3', 'status: error · FAIL · current gate failed', '[truncated]']);
    expect(entry.bytes).toBe(4_321);
    expect(entry.truncated).toBe(true);
    expect(entry.freshness).toBe('stale');
    expect(entry.producerReceipt).toBe('op-3');
  });
});

describe('preview bounding cuts on code-point boundaries (wb-v53)', () => {
  const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;

  it('a multibyte preview at a small byte budget never contains U+FFFD and stays within maxBytes', async () => {
    const s = store([counting(async () => content(['漢'.repeat(1000)], { bytes: 3000 }))], { maxBytes: 100 });
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected a loaded entry');
    const body = entry.preview.filter(line => line !== '[truncated]');
    expect(entry.truncated).toBe(true);
    expect(body.join('')).not.toContain('�');
    expect(body.reduce((sum, line) => sum + Buffer.byteLength(line), 0)).toBeLessThanOrEqual(100);
  });

  it('a surrogate-pair preview is never split into lone surrogates across chunks', async () => {
    const s = store([counting(async () => content(['a' + '😀'.repeat(130)]))]);
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected a loaded entry');
    expect(entry.preview.length).toBeGreaterThan(1);
    for (const line of entry.preview) expect(line).not.toMatch(LONE_SURROGATE);
    expect(entry.preview.join('')).toBe('a' + '😀'.repeat(130));
  });
});

describe('a clipped preview is a strict prefix ending at the cut (wb-v53 respin U1/U3)', () => {
  const TRUNCATED = '[truncated]';

  async function previewOf(lines: readonly string[], maxBytes: number, bytes = 10_000): Promise<readonly string[]> {
    const s = store([counting(async () => content(lines, { bytes }))], { maxBytes });
    await s.request(scope, native('fixture'), 'ev:1');
    const entry = s.get(scope, native('fixture'), 'ev:1');
    if (entry.state !== 'loaded') throw new Error('expected a loaded entry');
    return entry.preview;
  }

  it('C1: text after a mid-line cut is not appended (budget is exhausted on a clip)', async () => {
    expect(await previewOf(['漢漢\nab'], 4)).toEqual(['漢', TRUNCATED]);
  });

  it('C2: a part clipped to nothing emits no line and nothing after it', async () => {
    expect(await previewOf(['漢\nx'], 1)).toEqual([TRUNCATED]);
  });

  it('C3: blank lines after a mid-line cut are not appended', async () => {
    expect(await previewOf(['漢漢\n\n\n\nb'], 4)).toEqual(['漢', TRUNCATED]);
  });

  it('C5: a long run of newlines after the cut does not fill the line cap', async () => {
    expect(await previewOf(['漢漢' + '\n'.repeat(300)], 4)).toEqual(['漢', TRUNCATED]);
  });

  it('C6: later lines never appear after the cut line', async () => {
    expect(await previewOf(['漢'.repeat(7) + '\nrm -rf /tmp/x\nok'], 20)).toEqual(['漢'.repeat(6), TRUNCATED]);
  });

  it('U3: an exactly fitting code point is kept (maxBytes 99 keeps 33 of three-byte characters)', async () => {
    const preview = await previewOf(['漢'.repeat(100)], 99, 300);
    expect(preview).toEqual(['漢'.repeat(33), TRUNCATED]);
    expect(Buffer.byteLength(preview[0] ?? '')).toBe(99);
  });
});

describe('producer-mapping conformance pass (wb-6ze.20, docs/workbench/20 § Producer mapping)', () => {
  const uuid = '11111111-2222-3333-4444-555555555555';
  const claudeTarget: readonly [NativeRef, string] = [native('claude-agent-sdk', 'session-1', 'session'), `claude-message:${uuid}`];
  const furnaceTarget: readonly [NativeRef, string] = [native('furnace', 'run-1', 'run'), 'attempt-1'];
  const forgeTarget: readonly [NativeRef, string] = [native('forge', 'pkg', 'gate-status'), 'forge-operation:op-1'];
  const allGrants = [CLAUDE_TRANSCRIPT_GRANT, FURNACE_INSPECT_GRANT, FORGE_INSPECT_GRANT];
  const forgeRead = (over: Record<string, unknown> = {}) => ({ status: 'passed', capturedAt: at, ...over });
  const readers = () => ({
    claude: vi.fn(async () => [{ type: 'user', uuid, text: 'hi' }]),
    furnace: vi.fn(async () => ({ runId: 'run-1', attemptId: 'attempt-1', stream: 'stdout', text: 'ok', complete: true, lossy: false, capturedAt: at })),
    forge: vi.fn(async () => forgeRead()),
  });
  const PINNED_ROWS = [
    { provider: 'claude-agent-sdk', requiredGrant: 'claude:transcript', refKind: 'claude-message:<uuid>' },
    { provider: 'furnace', requiredGrant: 'furnace:inspect', refKind: 'native Attempt id listed on the owning run node' },
    { provider: 'forge', requiredGrant: 'forge:inspect', refKind: 'forge-operation:<operation_id>' },
  ];

  it('EVIDENCE_LOADER_ROWS is the frozen docs/20 three-row producer table and nothing else', () => {
    expect(EVIDENCE_LOADER_ROWS).toEqual(PINNED_ROWS);
    expect(Object.isFrozen(EVIDENCE_LOADER_ROWS)).toBe(true);
    for (const row of EVIDENCE_LOADER_ROWS) expect(Object.isFrozen(row)).toBe(true);
    expect(() => (EVIDENCE_LOADER_ROWS as unknown as unknown[]).push({ provider: 'hyperunix', requiredGrant: 'hyperunix:inspect', refKind: 'x' })).toThrow(TypeError);
    // The pinned-table assertion itself fails when a fourth row is appended.
    const appended = [...EVIDENCE_LOADER_ROWS, { provider: 'hyperunix', requiredGrant: 'hyperunix:inspect', refKind: 'x' }];
    expect(() => expect(appended).toEqual(PINNED_ROWS)).toThrow();
  });

  it('createEvidenceLoaders returns loaders in row order carrying each row provider and requiredGrant', () => {
    const loaders = createEvidenceLoaders({ grants: () => allGrants, ...readers() });
    expect(loaders.map(l => [l.provider, l.requiredGrant])).toEqual(EVIDENCE_LOADER_ROWS.map(row => [row.provider, row.requiredGrant]));
    expect(EVIDENCE_LOADER_ROWS.map(row => row.requiredGrant)).toEqual([CLAUDE_TRANSCRIPT_GRANT, FURNACE_INSPECT_GRANT, FORGE_INSPECT_GRANT]);
  });

  it('no loader exists for a provider outside the table even when its grant is held and every reader is supplied', async () => {
    const spies = readers();
    const loaders = createEvidenceLoaders({ grants: () => [...allGrants, 'hyperunix:inspect', 'reactivefiber:inspect', 'beads:inspect'], ...spies });
    expect(loaders.map(l => l.provider)).toEqual(EVIDENCE_LOADER_ROWS.map(row => row.provider));
    const s = store(loaders);
    for (const provider of ['hyperunix', 'reactivefiber', 'beads', 'unknown']) {
      const ref = native(provider, 'n1', 'operation');
      await s.request(scope, ref, 'forge-operation:op-1');
      expect(s.get(scope, ref, 'forge-operation:op-1')).toEqual({ state: 'unavailable', reason: 'no-loader' });
    }
    for (const spy of Object.values(spies)) expect(spy).not.toHaveBeenCalled();
  });

  it('canLoad accepts exactly its row ref shape and rejects the other two shapes', () => {
    const [claude, furnace, forge] = createEvidenceLoaders({ grants: () => allGrants, ...readers() });
    const shapes = [claudeTarget[1], furnaceTarget[1], forgeTarget[1]];
    expect(shapes.map(ref => claude?.canLoad(ref))).toEqual([true, false, false]);
    expect(shapes.map(ref => furnace?.canLoad(ref))).toEqual([false, true, false]);
    expect(shapes.map(ref => forge?.canLoad(ref))).toEqual([false, false, true]);
  });

  it('routes provider-first: of the nine provider x ref-shape pairs exactly the three row pairs reach a reader, and only on load', async () => {
    const spies = readers();
    const loaders = createEvidenceLoaders({ grants: () => allGrants, ...spies });
    for (const spy of Object.values(spies)) expect(spy).toHaveBeenCalledTimes(0);
    const s = store(loaders);
    const providers = [claudeTarget[0], furnaceTarget[0], forgeTarget[0]];
    const shapes = [claudeTarget[1], furnaceTarget[1], forgeTarget[1]];
    const states: string[][] = [];
    for (const [p, ref] of providers.entries()) {
      const row: string[] = [];
      for (const [r, shape] of shapes.entries()) {
        await s.request(scope, ref, shape);
        const entry = s.get(scope, ref, shape);
        row.push(entry.state === 'unavailable' ? `unavailable:${entry.reason}` : entry.state);
        if (p === r) expect(entry).toMatchObject({ state: 'loaded' });
      }
      states.push(row);
    }
    expect(states).toEqual([
      ['loaded', 'unavailable:no-loader', 'unavailable:no-loader'],
      ['unavailable:no-loader', 'loaded', 'unavailable:no-loader'],
      ['unavailable:no-loader', 'unavailable:no-loader', 'loaded'],
    ]);
    for (const spy of Object.values(spies)) expect(spy).toHaveBeenCalledTimes(1);
  });

  it('a forge result carries sourceBasis only when digest-shaped and copies truncation, freshness, capturedAt and receipt from the reader', async () => {
    const digest = `sha256:${'a1'.repeat(32)}`;
    const load = async (sourceBasis: string) => {
      const s = store(createEvidenceLoaders({
        grants: () => [FORGE_INSPECT_GRANT],
        forge: async () => forgeRead({ lines: ['gate ok'], preview: ['gate ok'], bytes: 7, truncated: true, freshness: 'stale', sourceBasis, producerReceipt: 'cmd_42' }),
      }));
      await s.request(scope, forgeTarget[0], forgeTarget[1]);
      return s.get(scope, forgeTarget[0], forgeTarget[1]);
    };
    expect(await load(digest)).toMatchObject({ state: 'loaded', sourceBasis: digest, truncated: true, capturedAt: at, freshness: 'stale', producerReceipt: 'cmd_42' });
    for (const bad of ['main', '/tmp/x', 'sha256:abc']) {
      const entry = await load(bad);
      expect(entry).toMatchObject({ state: 'loaded', truncated: true, capturedAt: at });
      expect('sourceBasis' in entry).toBe(false);
    }
  });

  it('the producer module imports no SDK or child_process and never labels a result verified', () => {
    const source = readFileSync(new URL('../src/workbench/evidence-producers.ts', import.meta.url), 'utf8');
    const specifiers = [...source.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)].map(match => match[1] ?? '');
    expect(specifiers.length).toBeGreaterThan(0);
    for (const specifier of specifiers) expect(specifier.startsWith('./')).toBe(true);
    expect(source).not.toMatch(/child_process|@anthropic|claude-agent-sdk\/|verified/i);
  });
});
