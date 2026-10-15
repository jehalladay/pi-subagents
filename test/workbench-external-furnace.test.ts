/** L2 read-only attachment to a Run launched outside Pi with real bd and Furnace.
 * Opt in with PI_FURNACE_FIXTURE_ROOT and PI_FURNACE_FIXTURE_RUN_ID. This test never starts,
 * pauses, stops, resumes, retries, or deletes a Run. Use a disposable /tmp workspace only.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, realpath, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { nativeFurnaceRunInspect } from '../src/workbench/providers/furnace.js';

const workspace = process.env.PI_FURNACE_FIXTURE_ROOT;
const runId = process.env.PI_FURNACE_FIXTURE_RUN_ID;
if (workspace === undefined || runId === undefined) {
  throw new Error('External Furnace test requires PI_FURNACE_FIXTURE_ROOT and PI_FURNACE_FIXTURE_RUN_ID from an independently launched disposable real-bd Run.');
}

async function fileHashes(root: string): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  async function collect(directory: string): Promise<void> {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, item.name);
      if (item.isDirectory()) await collect(path);
      else if (item.isFile()) result[relative(root, path)] = createHash('sha256').update(await readFile(path)).digest('hex');
    }
  }
  await collect(join(root, '.beads'));
  await collect(join(root, '.furnace'));
  return result;
}

describe('independently launched native Furnace Run (real bd)', () => {
  it('attaches to the existing Run, retains native identities, and leaves both stores byte-identical', async () => {
    const root = await realpath(workspace);
    expect(root).toMatch(/^\/tmp\/pi-external-furnace-realbd\.[^/]+$/);
    expect(root).not.toBe(await realpath(process.cwd()));
    expect((await stat(join(root, '.beads', 'embeddeddolt'))).isDirectory()).toBe(true);
    expect((await stat(join(root, '.furnace', 'runs', runId, 'run.json'))).isFile()).toBe(true);
    const before = await fileHashes(root);
    const observed = await nativeFurnaceRunInspect(root, runId) as {
      contract: string;
      workspaceRoot: string;
      version: { binary_path: string; binary_digest: string; binary_revision: string; beads_version: string };
      source: { kind: string; data: { run_id: string; beads_run_id: string; creating_request_id: string; formula: string; state: string; workspace: string }; exit: { code: number } };
    };
    expect(observed.contract).toBe('furnace.run.inspect/v1');
    expect(observed.workspaceRoot).toBe(root);
    expect(observed.source.kind).toBe('run_inspect');
    expect(observed.source.data).toMatchObject({
      run_id: runId, workspace: root, formula: 'external-inspect', state: 'completed',
    });
    expect(observed.source.data.beads_run_id).toMatch(/^fx-wisp-/);
    expect(observed.source.data.creating_request_id).toMatch(/^external-fixture-/);
    expect(observed.source.exit.code).toBe(0);
    expect(observed.version.binary_path).toMatch(/\/furnace$/);
    expect(observed.version.binary_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(observed.version.binary_revision).toMatch(/^[a-f0-9]+$/);
    expect(observed.version.beads_version).toBe('1.1.0-rc.1');
    expect(await fileHashes(root)).toEqual(before);

    const cancelled = new AbortController();
    cancelled.abort();
    await expect(nativeFurnaceRunInspect(root, runId, cancelled.signal)).rejects.toMatchObject({ category: 'transport' });
    expect(await fileHashes(root)).toEqual(before);
    const again = await nativeFurnaceRunInspect(root, runId) as { source: { data: { state: string; run_id: string } } };
    expect(again.source.data).toMatchObject({ run_id: runId, state: 'completed' });
    expect(await fileHashes(root)).toEqual(before);
  }, 90_000);

  it('refuses an unknown Run without creating a record', async () => {
    const root = await realpath(workspace);
    expect(root).toMatch(/^\/tmp\/pi-external-furnace-realbd\.[^/]+$/);
    const before = await fileHashes(root);
    await expect(nativeFurnaceRunInspect(root, 'frn-run-nonexistent-external-fixture')).rejects.toMatchObject({ category: 'unavailable' });
    expect(await fileHashes(root)).toEqual(before);
  }, 90_000);
});
