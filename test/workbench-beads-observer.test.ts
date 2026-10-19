/** wb-752.6 (W13-F/VC-4): the Beads Work readiness reader adapter. Pure projector plus an injected `bd show --json` argv seam;
 * fixtures are pinned to the shape measured with bd 1.1.0-rc.1 (2d9e4321c). No live bd runs in this suite. */
import {readFileSync} from 'node:fs';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {
  BEADS_WORK_CONTRACT,
  type BeadsReadClient,
  type BeadsWorkReading,
  type BeadsWorkRelation,
  projectBeadsWork,
  readBeadsWork,
} from '../src/workbench/beads-observer.js';
import {CapabilityError} from '../src/workbench/capability-registry.js';
import {type NativeRef, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';

const workspaceRoot = '/tmp/beads-observer-ws';
const scope: ObservationScope = {workspace: workspaceRoot, principal: 'operator'};
const now = (): string => '2026-10-15T08:00:00.000Z';
const limits = {maxDependencies: 8, maxTitleChars: 80, timeoutMs: 5000};
const workId = 'wb-752.6';

interface Dep {
  id: string;
  title: string;
  status: string;
  issue_type: string;
  priority: number;
  dependency_type: string;
  description: string;
  notes: string;
}
const dep = (id: string, dependency_type: string, status = 'open'): Dep => ({
  id,
  title: `title of ${id}`,
  status,
  issue_type: 'task',
  priority: 2,
  dependency_type,
  description: 'DEP-DESCRIPTION-SECRET',
  notes: 'DEP-NOTES-SECRET',
});
/** bd-1.1.0-rc.1: `bd show <id> --json` prints an ARRAY of issue objects. */
function issue(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    acceptance_criteria: 'ACCEPTANCE-SECRET',
    comment_count: 0,
    created_at: '2026-10-15T07:00:00Z',
    created_by: 'flywheel',
    dependencies: [dep('wb-g1g.2', 'blocks')],
    dependency_count: 1,
    dependent_count: 0,
    description: 'DESCRIPTION-SECRET',
    id: workId,
    issue_type: 'task',
    notes: 'NOTES-SECRET',
    owner: 'someone@example.com',
    priority: 2,
    spec_id: '',
    status: 'in_progress',
    title: 'Beads adapter',
    updated_at: '2026-10-15T07:30:00Z',
    ...overrides,
  };
}
const ok = (records: unknown): {exit: number; stdout: string; stderr: string} => ({exit: 0, stdout: JSON.stringify(records), stderr: ''});
interface Seen {id: string; cwd: string; timeoutMs: number; signal?: AbortSignal}
function fake(result: {exit: number; stdout: string; stderr: string; producerVersion?: string}): BeadsReadClient & {seen: Seen[]} {
  const seen: Seen[] = [];
  return {
    seen,
    async show(id, call) {
      seen.push({id, ...call});
      return result;
    },
  };
}
const read = (client: BeadsReadClient, extra: {limits?: typeof limits; scope?: ObservationScope; signal?: AbortSignal} = {}): Promise<BeadsWorkReading> =>
  readBeadsWork(client, {workId, workspaceRoot, scope: extra.scope ?? scope, limits: extra.limits ?? limits, now, ...(extra.signal ? {signal: extra.signal} : {})});
async function category(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof CapabilityError) return error.category;
    throw error;
  }
  return 'resolved';
}
const nodeRef = (id: string): NativeRef => ({provider: 'beads', type: 'work', id, scope: workspaceRoot});
const confirmation = `bd:show:${workId}`;

describe('wb-752.6 Beads Work readiness reader', () => {
  it('reads the measured envelope through the injected seam with cwd = workspaceRoot', async () => {
    const client = fake(ok([issue()]));
    const reading = await read(client);
    expect(client.seen).toEqual([{id: workId, cwd: workspaceRoot, timeoutMs: 5000}]);
    expect(reading).toEqual({
      contract: BEADS_WORK_CONTRACT,
      source: {provider: 'beads', workId, workspaceRoot, ownership: 'external', producer: 'bd'},
      capturedAt: now(),
      observedAt: now(),
      freshness: 'current',
      completeness: 'complete',
      work: {title: 'Beads adapter', status: 'in_progress', issueType: 'task', priority: 2, closeReasonPresent: false},
      dependencies: {offered: 1, returned: 1, truncated: false, items: [{id: 'wb-g1g.2', dependencyType: 'blocks', status: 'open'}]},
      unmappedDependencyTypes: {},
    });
    expect(BEADS_WORK_CONTRACT).toBe('beads.work.readiness/v1');
  });

  it('producerVersion appears only when the seam measured it', async () => {
    const measured = await read(fake({...ok([issue()]), producerVersion: '1.1.0-rc.1'}));
    expect(measured.source.producerVersion).toBe('1.1.0-rc.1');
    const unmeasured = await read(fake(ok([issue()])));
    expect(Object.hasOwn(unmeasured.source, 'producerVersion')).toBe(false);
  });

  // Falsifier 1: C8 identity.
  it('F1: a returned id that differs from the requested id is unavailable and nothing is projected', async () => {
    expect(await category(read(fake(ok([issue({id: 'wb-other.1'})]))))).toBe('unavailable');
    expect(await category(read(fake(ok([issue(), issue({id: 'wb-other.1'})]))))).toBe('resolved');
    expect(await category(read(fake(ok([issue({id: 'wb-other.1'}), issue()]))))).toBe('unavailable');
  });

  // Falsifier 2: C8 shape.
  it('F2: non-zero exit, malformed JSON, a non-array, an empty array or a foreign shape is unavailable, never empty-ready', async () => {
    const bad = [
      {exit: 1, stdout: JSON.stringify([issue()]), stderr: 'no beads database'},
      {exit: 0, stdout: 'not json', stderr: ''},
      {exit: 0, stdout: '', stderr: ''},
      ok({id: workId}),
      ok([]),
      ok([null]),
      ok(['x']),
      ok([issue({status: undefined})]),
      ok([issue({status: 7})]),
      ok([issue({issue_type: undefined})]),
      ok([issue({priority: 'high'})]),
      ok([issue({title: undefined})]),
      ok([issue({dependencies: undefined})]),
      ok([issue({dependencies: [{...dep('wb-x.1', 'blocks'), dependency_type: undefined}]})]),
      ok([issue({dependencies: [{...dep('wb-x.1', 'blocks'), id: 7}]})]),
      ok([issue({dependencies: [null]})]),
    ];
    for (const result of bad) expect(await category(read(fake(result)))).toBe('unavailable');
  });

  it('a client that throws is unavailable and its error text never reaches the diagnostic', async () => {
    const client: BeadsReadClient = {
      async show() {
        throw new Error('spawn bd ENOENT sk-ant-SECRETTOKEN123');
      },
    };
    try {
      await read(client);
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(CapabilityError);
      expect((error as CapabilityError).category).toBe('unavailable');
      expect((error as CapabilityError).message).not.toContain('SECRETTOKEN');
    }
  });

  // Falsifier 7: host-bound scope.
  it('F7: scope.workspace that differs from workspaceRoot is authorization and bd is never called', async () => {
    const client = fake(ok([issue()]));
    expect(await category(read(client, {scope: {workspace: '/elsewhere', principal: 'operator'}}))).toBe('authorization');
    expect(await category(read(client, {scope: {workspace: workspaceRoot, principal: ''}}))).toBe('authorization');
    expect(client.seen).toEqual([]);
    const reading = await read(fake(ok([issue()])));
    expect(() => projectBeadsWork(reading, {workspace: '/elsewhere', principal: 'operator'})).toThrowError(expect.objectContaining({category: 'authorization'}));
  });

  it('validates the budgets', async () => {
    for (const bad of [{...limits, maxDependencies: 0}, {...limits, maxTitleChars: 1.5}, {...limits, timeoutMs: 0}]) {
      expect(await category(read(fake(ok([issue()])), {limits: bad}))).toBe('validation');
    }
  });

  // Falsifier 8: transport.
  it('F8: an aborted signal is transport, before and after the call, and the signal reaches the seam', async () => {
    const pre = new AbortController();
    pre.abort();
    const client = fake(ok([issue()]));
    expect(await category(read(client, {signal: pre.signal}))).toBe('transport');
    expect(client.seen).toEqual([]);
    const mid = new AbortController();
    const late: BeadsReadClient = {
      async show() {
        mid.abort();
        return ok([issue()]);
      },
    };
    expect(await category(read(late, {signal: mid.signal}))).toBe('transport');
    const live = new AbortController();
    const passing = fake(ok([issue()]));
    await read(passing, {signal: live.signal});
    expect(passing.seen[0]?.signal).toBe(live.signal);
    const throwing = new AbortController();
    const abortedThrow: BeadsReadClient = {
      async show() {
        throwing.abort();
        throw new Error('killed');
      },
    };
    expect(await category(read(abortedThrow, {signal: throwing.signal}))).toBe('transport');
  });

  // Falsifier 3: C1/C3.
  it('F3: related and discovered-from entries produce zero edges and are counted', async () => {
    const reading = await read(
      fake(ok([issue({dependencies: [dep('wb-a.1', 'related'), dep('wb-b.1', 'discovered-from'), dep('wb-c.1', 'related'), dep('constructor', 'related')]})])),
    );
    expect(reading.unmappedDependencyTypes).toEqual({related: 3, 'discovered-from': 1});
    const topology = projectBeadsWork(reading, scope);
    expect(topology.relations).toEqual([]);
    expect(reading.dependencies.items).toHaveLength(4);
  });

  it('unmapped counting survives prototype-named and hostile dependency types', async () => {
    const reading = await read(
      fake(ok([issue({dependencies: [dep('wb-a.1', 'constructor'), dep('wb-b.1', '__proto__'), dep('wb-c.1', '\u001b[31mred\u001b[0m'), dep('wb-d.1', 'constructor')]})])),
    );
    const total = Object.values(reading.unmappedDependencyTypes).reduce((sum, count) => sum + count, 0);
    expect(total).toBe(4);
    expect(Object.hasOwn(reading.unmappedDependencyTypes, 'constructor') ? reading.unmappedDependencyTypes.constructor : 0).toBe(2);
    expect(JSON.stringify(reading)).not.toContain('\u001b');
    expect(Object.getPrototypeOf(reading.unmappedDependencyTypes)).toBeNull();
  });

  it('a dependency id outside the bd id shape is unavailable, never a borrowed node key', async () => {
    for (const id of ['', 'a b', '../x', 'x\u001b[2J', 'a'.repeat(200)]) {
      expect(await category(read(fake(ok([issue({dependencies: [dep(id, 'blocks')]})]))))).toBe('unavailable');
    }
  });

  it("blocks -> a dependency edge from the dependent work to its blocker, with native confirmation provenance", async () => {
    const reading = await read(fake(ok([issue({dependencies: [dep('wb-g1g.2', 'blocks'), dep('wb-g1g.3', 'blocks')]})])));
    const {relations, snapshot} = projectBeadsWork(reading, scope);
    expect(snapshot.source).toEqual({provider: 'beads', type: 'work', id: workId, scope: workspaceRoot});
    expect(relations).toEqual(
      ['wb-g1g.2', 'wb-g1g.3'].map((id) => ({
        scope,
        kind: 'dependency',
        from: nodeRef(workId),
        to: nodeRef(id),
        provenance: {source: 'beads', observedAt: now(), nativeConfirmationRef: confirmation},
      })),
    );
  });

  it('parent-child and the parent field give ONE grouping edge, parent -> work, deduplicated', async () => {
    const both = await read(fake(ok([issue({parent: 'wb-752', dependencies: [dep('wb-752', 'parent-child'), dep('wb-g1g.2', 'blocks')]})])));
    const grouping = projectBeadsWork(both, scope).relations.filter((relation) => relation.kind === 'grouping');
    expect(grouping).toEqual([
      {scope, kind: 'grouping', from: nodeRef('wb-752'), to: nodeRef(workId), provenance: {source: 'beads', observedAt: now(), nativeConfirmationRef: confirmation}},
    ]);
    expect(both.work.parent).toBe('wb-752');
    const entryOnly = await read(fake(ok([issue({dependencies: [dep('wb-752', 'parent-child')]})])));
    expect(projectBeadsWork(entryOnly, scope).relations.map((relation) => relation.kind)).toEqual(['grouping']);
    const fieldOnly = await read(fake(ok([issue({parent: 'wb-752', dependencies: []})])));
    expect(projectBeadsWork(fieldOnly, scope).relations.map((relation) => relation.kind)).toEqual(['grouping']);
    expect(entryOnly.work.parent).toBe('wb-752');
  });

  it('C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge', async () => {
    const reading = await read(
      fake(ok([issue({parent: 'wb-752', dependencies: [dep('wb-752', 'parent-child'), dep('wb-g1g.2', 'blocks'), dep('wb-z.1', 'related'), dep('wb-y.1', 'discovered-from')]})])),
    );
    const {snapshot, relations} = projectBeadsWork(reading, scope);
    expect(new Set(relations.map((relation) => relation.kind))).toEqual(new Set(['dependency', 'grouping']));
    const projection = new ObservationProjection();
    projection.refresh(snapshot);
    for (const relation of relations) projection.relate(relation);
    expect(projection.relations({scope}).map((edge) => edge.kind).sort()).toEqual(['dependency', 'grouping']);
    expectTypeOf<BeadsWorkRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
  });

  // wb-752.11 A1 (F3): the mapped literals are compared on the RAW dependency_type, never on sanitized text.
  it('wb-752.11 A1: a hostile type that sanitizes onto a mapped literal mints zero edges and is counted under its sanitized label', async () => {
    const reading = await read(
      fake(
        ok([
          issue({
            dependencies: [
              dep('wb-h.1', 'blo\u200bcks'),
              dep('wb-h.2', '\u001b[1mblocks\u001b[0m'),
              dep('wb-h.3', 'parent-\u200bchild'),
              dep('wb-g1g.2', 'blocks'),
            ],
          }),
        ]),
      ),
    );
    const {relations} = projectBeadsWork(reading, scope);
    expect(relations.map((relation) => [relation.kind, relation.to.id])).toEqual([['dependency', 'wb-g1g.2']]);
    // Post-wb-952 the shared helper strips U+200B and ANSI, so every hostile form sanitizes onto a mapped literal and is
    // counted under that sanitized label; the RAW comparison keeps all of them from minting an edge.
    expect(reading.unmappedDependencyTypes).toEqual({blocks: 2, 'parent-child': 1});
    expect(reading.work.parent).toBeUndefined();
    expect(JSON.stringify(reading)).not.toMatch(/[\u200b\u001b]/);
  });

  // wb-752.11 A2 (F5): the parent FIELD is authoritative and a naming entry collapses into it.
  it('wb-752.11 A2: the parent field is authoritative; a parent-child entry naming another pair adds no second grouping edge', async () => {
    const reading = await read(fake(ok([issue({parent: 'wb-752', dependencies: [dep('wb-other.1', 'parent-child'), dep('wb-752', 'parent-child')]})])));
    const grouping = projectBeadsWork(reading, scope).relations.filter((relation) => relation.kind === 'grouping');
    expect(grouping.map((relation) => relation.from.id)).toEqual(['wb-752']);
    expect(reading.work.parent).toBe('wb-752');
  });

  // wb-752.11 A3 (F4): symmetric self-reference refusal.
  it('wb-752.11 A3: an entry or parent field naming the work itself mints no edge in either direction and is counted', async () => {
    const reading = await read(fake(ok([issue({dependencies: [dep(workId, 'blocks'), dep(workId, 'parent-child'), dep('wb-g1g.2', 'blocks')]})])));
    const {relations} = projectBeadsWork(reading, scope);
    expect(relations.map((relation) => [relation.kind, relation.from.id, relation.to.id])).toEqual([['dependency', workId, 'wb-g1g.2']]);
    expect(reading.selfReferences).toBe(2);
    expect(reading.work.parent).toBeUndefined();
    const field = await read(fake(ok([issue({parent: workId, dependencies: []})])));
    expect(projectBeadsWork(field, scope).relations).toEqual([]);
    expect(field.selfReferences).toBe(1);
    // The reading layer itself never exports a self parent (the projection guard below must not be the only defense).
    expect(field.work.parent).toBeUndefined();
    expect(Object.hasOwn(field.work, 'parent')).toBe(false);
    // The projection layer independently refuses a reading whose parent already names the work.
    const forged: BeadsWorkReading = {...field, work: {...field.work, parent: workId}};
    expect(projectBeadsWork(forged, scope).relations).toEqual([]);
    const clean = await read(fake(ok([issue()])));
    expect(Object.hasOwn(clean, 'selfReferences')).toBe(false);
  });

  // wb-752.11 A4 (F6): the unrecognized bucket carries an exact count.
  it('wb-752.11 A4: types outside the bd type shape are counted exactly under the unrecognized bucket', async () => {
    const reading = await read(
      fake(ok([issue({dependencies: [dep('wb-u.1', 'Weird Type!'), dep('wb-u.2', 'x'.repeat(40)), dep('wb-u.3', '9lives'), dep('wb-u.4', 'related')]})])),
    );
    expect(reading.unmappedDependencyTypes).toEqual({unrecognized: 3, related: 1});
    expect(reading.dependencies.items.map((item) => item.dependencyType)).toEqual(['unrecognized', 'unrecognized', 'unrecognized', 'related']);
    expect(projectBeadsWork(reading, scope).relations).toEqual([]);
  });

  // wb-752.11 U4 (gate default reading, pinned): with no parent field, the FIRST parent-child entry is the single parent.
  it('wb-752.11 U4: no parent field and two distinct parent-child entries give one grouping edge from the first; the second is retained in items only', async () => {
    const reading = await read(fake(ok([issue({dependencies: [dep('wb-p.1', 'parent-child'), dep('wb-p.2', 'parent-child')]})])));
    const grouping = projectBeadsWork(reading, scope).relations.filter((relation) => relation.kind === 'grouping');
    expect(grouping.map((relation) => relation.from.id)).toEqual(['wb-p.1']);
    expect(reading.work.parent).toBe('wb-p.1');
    expect(reading.dependencies.items.map((item) => item.id)).toEqual(['wb-p.1', 'wb-p.2']);
    expect(reading.unmappedDependencyTypes).toEqual({});
  });

  // wb-752.11 O1: a self entry of an unmapped type is counted under its type, never as a self-reference.
  it('wb-752.11 O1: a self entry of an unmapped type counts under its type and never in selfReferences', async () => {
    const reading = await read(fake(ok([issue({dependencies: [dep(workId, 'related')]})])));
    expect(reading.unmappedDependencyTypes).toEqual({related: 1});
    expect(Object.hasOwn(reading, 'selfReferences')).toBe(false);
    expect(projectBeadsWork(reading, scope).relations).toEqual([]);
  });

  // wb-752.11 O2: a self parent field suppresses the entry fallback.
  it('wb-752.11 O2: a self parent field suppresses the parent-child entry fallback', async () => {
    const reading = await read(fake(ok([issue({parent: workId, dependencies: [dep('wb-752', 'parent-child')]})])));
    expect(reading.work.parent).toBeUndefined();
    expect(reading.selfReferences).toBe(1);
    expect(projectBeadsWork(reading, scope).relations.filter((relation) => relation.kind === 'grouping')).toEqual([]);
  });

  // Falsifier 4: C6 closed is never success.
  it('F4: a closed work item never renders statusTone success; statuses map as pinned', async () => {
    const tone = async (status: string): Promise<[string, string]> => {
      const {snapshot} = projectBeadsWork(await read(fake(ok([issue({status})]))), scope);
      return [snapshot.node.statusText, snapshot.node.statusTone];
    };
    expect(await tone('closed')).toEqual(['closed', 'unknown']);
    expect(await tone('in_progress')).toEqual(['in_progress', 'active']);
    expect(await tone('open')).toEqual(['open', 'waiting']);
    expect(await tone('blocked')).toEqual(['blocked', 'waiting']);
    expect(await tone('deferred')).toEqual(['deferred', 'waiting']);
    expect(await tone('pinned')).toEqual(['pinned', 'unknown']);
    expect(await tone('toString')).toEqual(['toString', 'unknown']);
    expect(await tone('hooked')).toEqual(['hooked', 'unknown']);
    const closed = await read(fake(ok([issue({status: 'closed', closed_at: '2026-10-15T07:59:00Z', close_reason: 'CLOSE-SECRET'})])));
    expect(closed.work.closedAt).toBe('2026-10-15T07:59:00Z');
    expect(closed.work.closeReasonPresent).toBe(true);
    const open = await read(fake(ok([issue({close_reason: ''})])));
    expect(open.work.closeReasonPresent).toBe(false);
    expect(Object.hasOwn(open.work, 'closedAt')).toBe(false);
  });

  it('snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented', async () => {
    const task = projectBeadsWork(await read(fake({...ok([issue()]), producerVersion: '1.1.0-rc.1'})), scope).snapshot;
    expect(task).toEqual({
      source: {provider: 'beads', type: 'work', id: workId, scope: workspaceRoot},
      scope,
      capturedAt: now(),
      observedAt: now(),
      coverage: 'complete',
      sourceVersion: '1.1.0-rc.1',
      kind: 'beads.work.snapshot',
      node: {title: 'Beads adapter', type: 'sdk-operation', statusText: 'in_progress', statusTone: 'active'},
    });
    expect(Object.hasOwn(task, 'evidenceRefs')).toBe(false);
    const epic = projectBeadsWork(await read(fake(ok([issue({issue_type: 'epic'})]))), scope).snapshot;
    expect(epic.node.type).toBe('group');
    expect(Object.hasOwn(epic, 'sourceVersion')).toBe(false);
    expect(Object.hasOwn(epic, 'sourceRevision')).toBe(false);
  });

  // Falsifier 5: C7 retention and sanitization.
  it('F5: a hostile title is sanitized and bounded; description, notes, acceptance and close_reason never appear', async () => {
    const hostile = `\u001b[31mTitle\u001b[0m \u202Eevil\u0007 Bearer abc.def.ghi password=hunter2 ${'x'.repeat(500)}`;
    const reading = await read(
      fake(ok([issue({title: hostile, status: 'closed', close_reason: 'CLOSE-SECRET', closed_at: '2026-10-15T07:59:00Z', dependencies: [{...dep('wb-g1g.2', 'blocks'), title: hostile}]})])),
    );
    const topology = projectBeadsWork(reading, scope);
    const text = JSON.stringify([reading, topology]);
    for (const secret of ['DESCRIPTION-SECRET', 'NOTES-SECRET', 'ACCEPTANCE-SECRET', 'CLOSE-SECRET', 'DEP-DESCRIPTION-SECRET', 'DEP-NOTES-SECRET', 'someone@example.com']) {
      expect(text).not.toContain(secret);
    }
    for (const unsafe of ['\u001b', '\u202E', '\u202E', '\u0007', 'abc.def.ghi', 'hunter2']) expect(text).not.toContain(unsafe);
    expect(reading.work.title.length).toBeLessThanOrEqual(limits.maxTitleChars);
    expect(reading.work.title).toContain('Title');
    expect(text).not.toContain('title of');
    // Dependency titles are not retained at all.
    expect(Object.keys(reading.dependencies.items[0] ?? {}).sort()).toEqual(['dependencyType', 'id', 'status']);
  });

  it('an empty-after-sanitizing title falls back to the work id and a hostile status is sanitized', async () => {
    const reading = await read(fake(ok([issue({title: '\u001b[2J\u0007', status: 'in_\u001b[31mprogress'})])));
    expect(reading.work.title).toBe(workId);
    expect(reading.work.status).toBe('in_progress');
    expect(await category(read(fake(ok([issue({status: '\u0007\u0007'})]))))).toBe('unavailable');
  });

  // Falsifier 6: bounded page.
  it('F6: dependencies beyond maxDependencies are cut, counts are honest and completeness is partial', async () => {
    const many = Array.from({length: 5}, (_, index) => dep(`wb-d.${index}`, 'blocks'));
    const reading = await read(fake(ok([issue({dependencies: many, dependency_count: 5})])), {limits: {...limits, maxDependencies: 3}});
    expect(reading.dependencies).toMatchObject({offered: 5, returned: 3, truncated: true});
    expect(reading.dependencies.items.map((item) => item.id)).toEqual(['wb-d.0', 'wb-d.1', 'wb-d.2']);
    expect(reading.completeness).toBe('partial');
    const topology = projectBeadsWork(reading, scope);
    expect(topology.truncated).toBe(true);
    expect(topology.snapshot.coverage).toBe('partial');
    expect(topology.relations).toHaveLength(3);
    const exact = await read(fake(ok([issue({dependencies: many.slice(0, 3)})])), {limits: {...limits, maxDependencies: 3}});
    expect(exact.dependencies).toMatchObject({offered: 3, returned: 3, truncated: false});
    expect(exact.completeness).toBe('complete');
  });

  it('is read-only: the only call is show, once, and the reading is a plain structured-cloneable value', async () => {
    const client = fake(ok([issue()]));
    const reading = await read(client);
    expect(client.seen).toHaveLength(1);
    expect(Object.keys(client).sort()).toEqual(['seen', 'show']);
    expect(structuredClone(reading)).toEqual(reading);
  });

  // Falsifier 9: static source assertions.
  it('F9: the module imports nothing from node:child_process and no Beads SDK', () => {
    const source = readFileSync(new URL('../src/workbench/beads-observer.ts', import.meta.url), 'utf8');
    expect(source).not.toMatch(/child_process/);
    expect(source).not.toMatch(/from\s+['"][^'"]*(?:beads|bd-sdk)[^'"]*['"]/i);
    expect(source).not.toMatch(/\brequire\s*\(|\bimport\s*\(/);
    // wb-952 pin flip: the shared sanitizers compose into the one helper; the module calls it and no local composition.
    expect(source).toMatch(/\bsanitizeWorkbenchText\(/);
    expect(source).not.toMatch(/\b(?:redactWorkbenchText|stripUnsafeText)\b/);
    expect(source.match(/beads\.work\.readiness\/v1/g)).toHaveLength(1);
  });
});
