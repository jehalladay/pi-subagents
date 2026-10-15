import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const root = process.cwd();
const scratch = mkdtempSync(join(tmpdir(), 'pi-workbench-pack-'));
try {
  const packed = spawnSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', scratch], {cwd: root, encoding: 'utf8'});
  assert.equal(packed.status, 0, packed.stderr);
  const receipts = JSON.parse(packed.stdout);
  assert.equal(receipts.length, 1);
  const names = receipts[0].files.map(file => file.path);
  for (const name of ['LICENSE','src/index.ts','dist/workbench/claude-host.js','src/workbench/capability-registry.ts','vendor/forge-sdk-0.1.0.tgz','vendor/furnace-sdk-0.1.0.tgz','vendor/hyperunix-sdk-0.1.0.tgz','vendor/dependency-lock.json']) assert.ok(names.includes(name), `missing packed ${name}`);
  assert.ok(!names.some(name => name.startsWith('.beads/') || name.startsWith('.forge/')), 'private state leaked into npm package');
  assert.equal(readFileSync(join(root,'vendor/dependency-lock.json'),'utf8'),readFileSync(join(root,'package-lock.json'),'utf8'),'packaged dependency lock drift');
  const manifest = JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
  assert.equal(manifest.dependencies['@anthropic-ai/claude-agent-sdk'],'0.3.300');
  assert.ok(manifest.pi.extensions.includes('./src/index.ts'));
  console.log(JSON.stringify({contract:'workbench.package-smoke/v1',fileCount:names.length,sha:receipts[0].shasum,integrity:receipts[0].integrity,privateStateIncluded:false}));
} finally { rmSync(scratch, {recursive:true,force:true}); }
