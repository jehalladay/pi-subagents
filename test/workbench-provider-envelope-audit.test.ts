/** External producer-boundary regressions for Forge and RF read envelopes. */
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import { readForgeGateStatus } from '../src/workbench/providers/forge.js';
import { nativeReactiveFiberPreview, registerNativeReactiveFiberRender, registerReactiveFiberRender } from '../src/workbench/providers/reactivefiber.js';

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
/** Installs a stub rf as the ONLY PATH entry (absolute-node shebang, so no PATH lookup and no host rf behind it) that records the argv it was spawned with (wb-973.1/.3) and returns that record's path. */
function producer(reply: unknown): string {
  const dir = mkdtempSync(join(tmpdir(), 'rf-envelope-audit-'));
  dirs.push(dir);
  const binary = join(dir, 'rf');
  const argvRecord = join(dir, 'argv.json');
  writeFileSync(binary, `#!${process.execPath}\nrequire('node:fs').writeFileSync(${JSON.stringify(argvRecord)}, JSON.stringify(process.argv.slice(2)));\nprocess.stdout.write(JSON.stringify(${JSON.stringify(reply)}));\nprocess.exit(${(reply as {ok?:boolean})?.ok===false ? 3 : 0});\n`);
  chmodSync(binary, 0o700);
  process.env.PATH = dir;
  return argvRecord;
}
/** The argv the stub rf recorded, or undefined when no rf process was ever spawned. */
function recordedArgv(record: string): string[] | undefined {
  if (!existsSync(record)) return undefined;
  const argv: unknown = JSON.parse(readFileSync(record, 'utf8'));
  if (!Array.isArray(argv)) throw new Error('stub rf recorded a non-array argv');
  const tokens: unknown[] = argv;
  return tokens.map(token => {
    if (typeof token !== 'string') throw new Error('stub rf recorded a non-string argv token');
    return token;
  });
}

describe('RF stand-in hermeticity (wb-n0z: a refusal row never goes green through the host rf)', () => {
  it('the stand-in is the only PATH entry, so no host rf can ever be resolved behind it', () => {
    producer(validRf());
    expect(process.env.PATH?.split(delimiter)).toHaveLength(1);
  });
  it('a stand-in that cannot be executed refuses as could-not-launch, never through the host rf', async () => {
    const record = producer(validRf());
    chmodSync(join(dirname(record), 'rf'), 0o600);
    await expect(nativeReactiveFiberPreview('model', 'task', process.cwd())).rejects.toMatchObject({ category: 'transport', message: 'RF preview could not launch the installed binary.' });
  });
  it('the stand-in interpreter is the absolute node of this run, not a PATH lookup', () => {
    const record = producer(validRf());
    expect(readFileSync(join(dirname(record), 'rf'), 'utf8').split('\n')[0]).toBe(`#!${process.execPath}`);
  });
});

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
  // wb-693.4 (RF-TSX-AND-EMBEDDING-R6) acceptance 3: "One provider-audit row proves malformed engine_metrics refused as transport
  // while an absent one passes"; the producer's schema is closed to {tsx_worker_spawns, tsx_resource_rounds}.
  it('admits an envelope that states no engine_metrics, and one stating exactly the two producer-closed counters', async () => {
    for (const engineMetrics of [undefined, { tsx_worker_spawns: 0, tsx_resource_rounds: 0 }, { tsx_worker_spawns: 2, tsx_resource_rounds: 1 }]) {
      const fixture = { ...validRf(), result: { ...validRf().result, ...(engineMetrics === undefined ? {} : { engine_metrics: engineMetrics }) } };
      producer(fixture);
      const result = await nativeReactiveFiberPreview('model', 'task', process.cwd());
      expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: process.cwd(), source: fixture });
    }
  });
  it.each([
    ['null engine_metrics', null],
    ['list engine_metrics', [1, 0]],
    ['empty engine_metrics', {}],
    ['one-key engine_metrics', { tsx_worker_spawns: 1 }],
    ['extra-key engine_metrics', { tsx_worker_spawns: 1, tsx_resource_rounds: 0, detail: 'x' }],
    ['negative spawn count', { tsx_worker_spawns: -1, tsx_resource_rounds: 0 }],
    ['fractional round count', { tsx_worker_spawns: 1, tsx_resource_rounds: 0.5 }],
    ['string spawn count', { tsx_worker_spawns: '1', tsx_resource_rounds: 0 }],
  ])('refuses %s as a transport error instead of presenting it as a preview', async (_label, engineMetrics) => {
    producer({ ...validRf(), result: { ...validRf().result, engine_metrics: engineMetrics } });
    await expect(nativeReactiveFiberPreview('model', 'task', process.cwd())).rejects.toMatchObject({ category: 'transport' });
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
    // wb-n0z: pin the CAUSE, not just the category - a could-not-launch or malformed-JSON transport refusal must not pass this row.
    await expect(nativeReactiveFiberPreview('model', 'task', process.cwd())).rejects.toMatchObject({ category: 'transport', message: expect.stringMatching(/^RF preview returned an unrecognized (native|or contradictory)/) });
  });
});

/**
 * wb-973.1 (SCG-R1) + wb-973.3 (SCG-R3), one cut. The reactivefiber.render.preview capability admits exactly two input
 * arms - the legacy {model, task} preview and the served {view, taskId, model?} render - and the stub rf above records
 * the argv each one spawns. R1: the view arm spawns `rf --workspace <root> context render --view V --task-id T
 * [--model M] --no-commit --no-input --json`; every mixed shape is refused at input validation by the descriptor's
 * exclusive oneOf, before an rf process exists. R3: the legacy argv stays byte-identical to the measured rf@0.1.583
 * form, every admitted argv ends with --no-commit --no-input --json and carries no unserved selector, and both
 * registrations keep their read/render/invoke-only descriptor.
 */
describe('SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3)', () => {
  const RF_CAPABILITY = 'reactivefiber.render.preview';
  const VIEW = 'swarm.worker';
  const TASK_ID = 'bead-fixture-000';
  const MODEL = 'model-fixture';
  const TAIL = ['--no-commit', '--no-input', '--json'];
  const UNSERVED = ['--component', '--candidate', '--overlay', '--commit', '--actor', '--session', '--redact', '--reveal'];
  /** The measured rf@0.1.583 legacy form for {model:'model', task:'task'} (the R3 fence). */
  const legacyForm = () => ['--workspace', process.cwd(), 'context', 'render', '--model', 'model', '--task', 'task', ...TAIL];
  const invokeContext = () => ({ grants: ['reactivefiber:render'], signal: new AbortController().signal });
  function nativeRegistry(): CapabilityRegistry {
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, process.cwd());
    return registry;
  }
  /** The pinned RFCLI ViewContractOutcome.to_json key order and vocabularies (src/reactive_fiber_cli/domain/view_contract.py
   * :85-116, :236-248 @8a8b83e4d). */
  const VIEW_CONTRACT_KEYS = ['view_id', 'view_revision', 'satisfied', 'degraded', 'checks', 'failures', 'unavailable_sources', 'contract_digest'];
  const CHECK_NAMES = ['required_source_present', 'max_output_bytes', 'non_empty_output', 'no_truncated_blocks', 'required_keys_observed', 'latency_ms'];
  const CHECK_STATUSES = ['passed', 'failed', 'advisory'];
  const SHA256_REF = /^sha256:[0-9a-f]{64}$/;
  /** The elements of a JSON array, or a thrown error when the value is not one. */
  function jsonArray(value: unknown): unknown[] {
    if (!Array.isArray(value)) throw new Error('expected a JSON array');
    const items: unknown[] = value;
    return items;
  }
  /** The elements of a JSON array of objects, or a thrown error naming what was not one. */
  function objectRows(value: unknown): Record<string, unknown>[] {
    return jsonArray(value).map(item => {
      if (item === null || typeof item !== 'object' || Array.isArray(item)) throw new Error('expected a JSON object row');
      const entries: [string, unknown][] = Object.entries(item);
      return Object.fromEntries(entries);
    });
  }
  /** A satisfied result.view_contract in the pinned RFCLI ViewContractOutcome.to_json shape, for a view whose contract
   * requires one lens key and the non_empty_output invariant under a latency budget: both deterministic rows passed,
   * the advisory latency row is recorded, nothing failed and no required source is lacking ('context' is 7 bytes). */
  const satisfiedViewContract = () => ({
    view_id: VIEW,
    view_revision: `sha256:${'b'.repeat(64)}`,
    satisfied: true,
    degraded: false,
    checks: [
      { check: 'required_source_present', expected: 'lens:beads.current.title', actual: 'present', status: 'passed' },
      { check: 'non_empty_output', expected: 'non-empty output', actual: '7 bytes', status: 'passed' },
      { check: 'latency_ms', expected: '<= 60000 ms', actual: '12 ms', status: 'advisory' },
    ],
    failures: [],
    unavailable_sources: [],
    contract_digest: `sha256:${'c'.repeat(64)}`,
  });
  /** A served --view render envelope: the legacy keys plus the additive view keys rf puts beside them in result. */
  const viewRenderEnvelope = () => {
    const envelope = validRf();
    return { ...envelope, result: { ...envelope.result, view_id: VIEW, effective_scopes: [{ kind: 'shared', revision: digest }], view_contract: satisfiedViewContract() } };
  };

  it('SCG-R1: {view,taskId} spawns the served --view --task-id argv', async () => {
    const envelope = viewRenderEnvelope();
    const record = producer(envelope);
    const result = await nativeRegistry().invoke(RF_CAPABILITY, { view: VIEW, taskId: TASK_ID }, invokeContext());
    expect(recordedArgv(record)).toEqual(['--workspace', process.cwd(), 'context', 'render', '--view', VIEW, '--task-id', TASK_ID, ...TAIL]);
    expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: process.cwd(), source: envelope });
  });

  it('SCG-R1: {view,taskId,model} carries --model after --task-id', async () => {
    const record = producer(viewRenderEnvelope());
    await nativeRegistry().invoke(RF_CAPABILITY, { view: VIEW, taskId: TASK_ID, model: MODEL }, invokeContext());
    expect(recordedArgv(record)).toEqual(['--workspace', process.cwd(), 'context', 'render', '--view', VIEW, '--task-id', TASK_ID, '--model', MODEL, ...TAIL]);
  });

  it('SCG-R1: a view render envelope (view_id, effective_scopes, satisfied view_contract) round-trips verbatim through nativeReactiveFiberPreview', async () => {
    const envelope = viewRenderEnvelope();
    producer(envelope);
    const result = await nativeReactiveFiberPreview('model', 'task', process.cwd());
    expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: process.cwd(), source: envelope });
  });

  // wb-973.1 re-cut, owner ruling R468(b) (folds in gate-2 F1): the fixture names the contract RFCLI serves, so the
  // R2 reader (wb-973.2) is built against the real object, never an invented one.
  it('SCG-R1 (R468 F1): the view_contract fixture is the pinned RFCLI ViewContractOutcome.to_json object (view_contract.py:236-248 @8a8b83e4d)', () => {
    const outcome: Record<string, unknown> = viewRenderEnvelope().result.view_contract;
    expect(Object.keys(outcome)).toEqual(VIEW_CONTRACT_KEYS);
    expect(outcome.view_id).toBe(VIEW);
    expect(outcome.view_revision).toMatch(SHA256_REF);
    expect(outcome.contract_digest).toMatch(SHA256_REF);
    const checks = objectRows(outcome.checks);
    for (const row of checks) {
      expect(Object.keys(row)).toEqual(['check', 'expected', 'actual', 'status']);
      expect(CHECK_NAMES).toContain(row.check);
      expect(CHECK_STATUSES).toContain(row.status);
    }
    // failures are the failed rows as {check, expected, actual}; satisfied iff none failed; degraded is its negation.
    const failures = objectRows(outcome.failures);
    expect(failures).toEqual(checks.filter(row => row.status === 'failed').map(({ check, expected, actual }) => ({ check, expected, actual })));
    expect(outcome.satisfied).toBe(failures.length === 0);
    expect(outcome.degraded).toBe(outcome.satisfied === false);
    expect(jsonArray(outcome.unavailable_sources).every(ref => typeof ref === 'string' && ref.startsWith('lens:'))).toBe(true);
    expect(outcome.satisfied).toBe(true);
  });

  it.each([
    ['{view,task}', { view: VIEW, task: 'task' }],
    ['{view,taskId,task}', { view: VIEW, taskId: TASK_ID, task: 'task' }],
    ['{taskId}', { taskId: TASK_ID }],
    ['{view}', { view: VIEW }],
    ['{model}', { model: 'model' }],
    ['{model,task,taskId}', { model: 'model', task: 'task', taskId: TASK_ID }],
  ])('SCG-R1: the mixed shape %s is refused at input validation and never spawns rf', async (_shape, input) => {
    const record = producer(validRf());
    await expect(nativeRegistry().invoke(RF_CAPABILITY, input, invokeContext())).rejects.toMatchObject({
      name: 'CapabilityError', category: 'validation', message: 'Invalid input schema for capability reactivefiber.render.preview.',
    });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it.each([
    ['an empty view', { view: '', taskId: TASK_ID }],
    ['an empty taskId', { view: VIEW, taskId: '' }],
    ['an empty model under --view', { view: VIEW, taskId: TASK_ID, model: '' }],
    ['a non-string taskId', { view: VIEW, taskId: 7 }],
  ])('SCG-R1: %s is refused at input validation and never spawns rf', async (_case, input) => {
    const record = producer(validRf());
    await expect(nativeRegistry().invoke(RF_CAPABILITY, input, invokeContext())).rejects.toMatchObject({ category: 'validation' });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it('SCG-R1: the descriptor advertises the two arms as one exclusive oneOf, the legacy arm unchanged', () => {
    const legacyArm = { type: 'object', properties: { model: { type: 'string', minLength: 1 }, task: { type: 'string', minLength: 1 } }, required: ['model', 'task'], additionalProperties: false };
    const viewArm = { type: 'object', properties: { view: { type: 'string', minLength: 1 }, taskId: { type: 'string', minLength: 1 }, model: { type: 'string', minLength: 1 } }, required: ['view', 'taskId'], additionalProperties: false };
    const [row] = nativeRegistry().catalogSnapshot();
    expect(row?.descriptor.inputSchema).toEqual({ type: 'object', oneOf: [legacyArm, viewArm] });
  });

  it('SCG-R3: the legacy argv is byte-identical to the measured 0.1.583 form', async () => {
    const viaRegistry = producer(validRf());
    await nativeRegistry().invoke(RF_CAPABILITY, { model: 'model', task: 'task' }, invokeContext());
    expect(recordedArgv(viaRegistry)).toEqual(legacyForm());
    const viaPreview = producer(validRf());
    await nativeReactiveFiberPreview('model', 'task', process.cwd());
    expect(JSON.stringify(recordedArgv(viaPreview))).toBe(JSON.stringify(legacyForm()));
  });

  it.each([
    ['{model,task}', { model: 'model', task: 'task' }],
    ['{view,taskId}', { view: VIEW, taskId: TASK_ID }],
    ['{view,taskId,model}', { view: VIEW, taskId: TASK_ID, model: MODEL }],
  ])('SCG-R3: the admitted shape %s ends with --no-commit --no-input --json and adds no unserved selector', async (_shape, input) => {
    const record = producer(validRf());
    await nativeRegistry().invoke(RF_CAPABILITY, input, invokeContext());
    const argv = recordedArgv(record);
    expect(argv).toBeDefined();
    expect(argv?.slice(-TAIL.length)).toEqual(TAIL);
    expect(argv?.filter(token => TAIL.includes(token))).toEqual(TAIL);
    expect(argv?.filter(token => UNSERVED.includes(token))).toEqual([]);
  });

  it('SCG-R3: both registered descriptors keep effectClass read, the render permission and invoke-only modes', () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, async () => validRf(), process.cwd());
    for (const registry of [nativeRegistry(), injected]) {
      const rows = registry.catalogSnapshot();
      expect(rows).toHaveLength(1);
      const [row] = rows;
      expect(row?.descriptor.id).toBe(RF_CAPABILITY);
      expect(row?.descriptor.effectClass).toBe('read');
      expect(row?.descriptor.permissions).toEqual(['reactivefiber:render']);
      expect(row?.descriptor.supportedModes).toEqual(['invoke']);
      expect(row?.inspectImplemented).toBe(false);
    }
  });
});
