/** External producer-boundary regressions for Forge and RF read envelopes. */
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readForgeGateStatus } from '../src/workbench/providers/forge.js';
import { nativeReactiveFiberPreview } from '../src/workbench/providers/reactivefiber.js';

const forge = vi.hoisted(() => ({ reply: null as unknown, method: '', close: vi.fn(async () => {}) }));
vi.mock('@forge/sdk', async importOriginal => ({
  ...await importOriginal<typeof import('@forge/sdk')>(),
  ServerConnection: { spawn: () => ({
    initialize: async () => 'compatible',
    capabilities: { stateOf: () => 'supported' },
    request: async (method: string) => { forge.method = method; return forge.reply; },
    close: forge.close,
  }) },
}));

const forgeReply = (status: 'success' | 'partial' | 'error') => ({
  contract_version: 'result-envelope/v1', status, command: 'gate.status',
  diagnostics: status === 'success' ? [] : [{ code: 'FORGE_GATE_INCOMPLETE', level: 'warning', message: 'Not verified' }],
  envelope: { verdict: status === 'partial' ? 'COULD_NOT_JUDGE' : null, reason_code: 'FORGE_GATE_INCOMPLETE' },
  data: { packages: [{ ref: 'code:pi-subagents', authoritative_current: false }] },
});

describe('Forge negotiated producer response', () => {
  afterEach(() => { forge.close.mockClear(); });
  it.each(['result-envelope/v999', undefined])('refuses unrecognized result contract %s and closes SDK', async version => {
    forge.reply = { ...forgeReply('success'), contract_version: version };
    await expect(readForgeGateStatus(process.cwd())).rejects.toMatchObject({ category: 'transport' });
    expect(forge.close).toHaveBeenCalledOnce();
  });
  it('refuses a build command wearing a gate.status reply frame', async () => {
    forge.reply = { ...forgeReply('success'), command: 'build' };
    await expect(readForgeGateStatus(process.cwd())).rejects.toMatchObject({ category: 'transport' });
    expect(forge.method).toBe('gate.status');
    expect(forge.close).toHaveBeenCalledOnce();
  });
  it.each(['partial', 'error'] as const)('retains genuine %s domain status without boolean success', async status => {
    const reply = forgeReply(status); forge.reply = reply;
    const result = await readForgeGateStatus(process.cwd());
    expect(result).toEqual({ contract: 'forge.gate.status/v1', protocolMethod: 'gate.status', source: reply });
    expect(JSON.stringify(result)).not.toContain('"verified":true');
    expect(forge.close).toHaveBeenCalledOnce();
  });
});

const id = 'a'.repeat(22);
const digest = `sha256:${'a'.repeat(64)}`;
const validRf = () => ({
  schema: 'reactive-fiber.cli/v1', ok: true, command: 'context.render',
  operation_id: `rfo_${id}`, workspace: { id: `rfw_${id}`, root: process.cwd() },
  transaction_id: null,
  result: {
    ephemeral: true, render_id: null, output: { text: 'context' },
    provenance: { graph_revision_id: digest },
    budget: { formula_terms: { context_window: 1000000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 } },
    diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
    work: { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
  }, diagnostics: [],
});
const dirs: string[] = [];
const originalPath = process.env.PATH;
afterEach(() => { process.env.PATH = originalPath; for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });
function producer(reply: unknown): void {
  const dir = mkdtempSync(join(tmpdir(), 'rf-envelope-audit-'));
  dirs.push(dir);
  const binary = join(dir, 'rf');
  writeFileSync(binary, `#!/usr/bin/env node\nprocess.stdout.write(JSON.stringify(${JSON.stringify(reply)}));\nprocess.exit(${(reply as {ok?:boolean})?.ok===false ? 3 : 0});\n`);
  chmodSync(binary, 0o700);
  process.env.PATH = `${dir}:${originalPath ?? ''}`;
}

describe('RF external CLI preview producer', () => {
  it('retains native ephemeral text and structured graph provenance', async () => {
    producer(validRf());
    const result = await nativeReactiveFiberPreview('model', 'task', process.cwd());
    expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: process.cwd(), source: validRf() });
  });
  // wb-2j3.9 (R10) acceptance (c): R1's cli_version admission adds no required key, so the cli_version-free fixture must keep validating.
  it('admits the cli_version-free envelope: eight top-level keys, six work keys, no cli_version required', async () => {
    const fixture = validRf();
    expect(Object.keys(fixture)).toHaveLength(8);
    expect(Object.keys(fixture.result.work)).toHaveLength(6);
    expect(JSON.stringify(fixture)).not.toContain('cli_version');
    producer(fixture);
    const result = await nativeReactiveFiberPreview('model', 'task', process.cwd());
    expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: process.cwd(), source: fixture });
  });
  it('preserves a genuine RF workspace refusal as an unavailable native result', async () => {
    producer({ ...validRf(), ok: false, workspace: null, result: null, diagnostics: [{ code: 'RF_WORKSPACE_INVALID', severity: 'error', message: 'No initialized workspace', hint: null, source: 'host', metadata: {} }] });
    await expect(nativeReactiveFiberPreview('model', 'task', process.cwd())).rejects.toMatchObject({ category: 'unavailable', message: expect.stringContaining('RF_WORKSPACE_INVALID') });
  });
  it.each([
    ['absent operation id', () => { const e = validRf(); return { ...e, operation_id: undefined }; }],
    ['empty operation id', () => ({ ...validRf(), operation_id: '' })],
    ['malformed workspace id', () => ({ ...validRf(), workspace: { id: '', root: process.cwd() } })],
    ['wrong workspace root', () => ({ ...validRf(), workspace: { id: `rfw_${id}`, root: '/other/workspace' } })],
    ['absent workspace', () => ({ ...validRf(), workspace: undefined })],
    ['extra top-level key', () => ({ ...validRf(), error: 'pretend success' })],
    ['boolean provenance', () => ({ ...validRf(), result: { ...validRf().result, provenance: true } })],
    ['absent graph digest', () => ({ ...validRf(), result: { ...validRf().result, provenance: {} } })],
    ['malformed graph digest', () => ({ ...validRf(), result: { ...validRf().result, provenance: { graph_revision_id: 'sha256:abc' } } })],
    // wb-2j3.9 (R10): envelope strictness stays under the R1/R2/R4 landing (test-only pins, no loosening).
    ['null graph digest', () => ({ ...validRf(), result: { ...validRf().result, provenance: { graph_revision_id: null } } })],
    ['numeric graph digest', () => ({ ...validRf(), result: { ...validRf().result, provenance: { graph_revision_id: 7 } } })],
    ['uppercase graph digest', () => ({ ...validRf(), result: { ...validRf().result, provenance: { graph_revision_id: `sha256:${'A'.repeat(64)}` } } })],
    ['seventh result.work key', () => ({ ...validRf(), result: { ...validRf().result, work: { ...validRf().result.work, seventh_count: 0 } } })],
    ['five-key result.work', () => { const { necessity_eval_count: _dropped, ...five } = validRf().result.work; return { ...validRf(), result: { ...validRf().result, work: five } }; }],
    ['string storage write count', () => ({ ...validRf(), result: { ...validRf().result, work: { ...validRf().result.work, storage_write_count: '0' } } })],
    ['null storage write count', () => ({ ...validRf(), result: { ...validRf().result, work: { ...validRf().result.work, storage_write_count: null } } })],
    ['seven-key top-level (diagnostics absent)', () => ({ ...validRf(), diagnostics: undefined })],
    ['seven-key top-level (transaction_id absent)', () => ({ ...validRf(), transaction_id: undefined })],
    ['seven-key top-level (result absent)', () => ({ ...validRf(), result: undefined })],
    ['non-null ephemeral transaction id', () => ({ ...validRf(), transaction_id: `rft_${id}` })],
    ['non-null ephemeral render id', () => ({ ...validRf(), result: { ...validRf().result, render_id: `rfr_${id}` } })],
    ['non-null ephemeral commit sequence', () => ({ ...validRf(), result: { ...validRf().result, commit_seq: 1 } })],
    ['missing budget', () => ({ ...validRf(), result: { ...validRf().result, budget: undefined } })],
    ['missing work accounting', () => ({ ...validRf(), result: { ...validRf().result, work: undefined } })],
    ['claimed ephemeral storage write', () => ({ ...validRf(), result: { ...validRf().result, work: { ...validRf().result.work, storage_write_count: 1 } } })],
    ['malformed diagnostic', () => ({ ...validRf(), diagnostics: [{ code: 'RF_WARNING', message: 'unstructured' }] })],
    ['missing output text', () => ({ ...validRf(), result: { ...validRf().result, output: {} } })],
  ])('refuses %s instead of presenting producer data as a preview', async (_label, mutate) => {
    producer(mutate());
    await expect(nativeReactiveFiberPreview('model', 'task', process.cwd())).rejects.toMatchObject({ category: 'transport' });
  });
});
