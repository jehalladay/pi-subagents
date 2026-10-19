import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gitStamp } from './git-stamp.mjs';
import { buildPackageReceipt, bundledLockEntries, classifyPackedPaths, missingRequiredPackedPaths } from './package-boundary.mjs';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';
installScratchLeakGuard();
const root = process.cwd();
const scratch = makeScratch('pi-workbench-pack-');
const scratch2 = makeScratch('pi-workbench-pack2-');
try {
  const packArgs = ['pack', '--ignore-scripts', '--json', '--pack-destination', scratch];
  const packed = spawnSync('npm', packArgs, {cwd: root, encoding: 'utf8'});
  assert.equal(packed.status, 0, packed.stderr);
  const receipts = JSON.parse(packed.stdout);
  assert.equal(receipts.length, 1);
  const names = receipts[0].files.map(file => file.path);
  for (const name of ['LICENSE','src/index.ts','dist/workbench/claude-host.js','src/workbench/capability-registry.ts','vendor/forge-sdk-0.1.0.tgz','vendor/furnace-sdk-0.1.0.tgz','vendor/hyperunix-sdk-0.1.0.tgz','vendor/dependency-lock.json']) assert.ok(names.includes(name), `missing packed ${name}`);
  const absent = missingRequiredPackedPaths(names);
  assert.equal(absent.length, 0, `packed artifact is missing ${absent.length} required path(s):\n${absent.map(v => `  ${v.rule}: ${v.path}`).join('\n')}`);
  assert.ok(!names.some(name => name.startsWith('.beads/') || name.startsWith('.forge/')), 'private state leaked into npm package');
  assert.equal(readFileSync(join(root,'vendor/dependency-lock.json'),'utf8'),readFileSync(join(root,'package-lock.json'),'utf8'),'packaged dependency lock drift');
  const manifest = JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
  assert.equal(manifest.dependencies['@anthropic-ai/claude-agent-sdk'],'0.3.300');
  assert.ok(manifest.pi.extensions.includes('./src/index.ts'));
  const bundled = bundledLockEntries(JSON.parse(readFileSync(join(root,'package-lock.json'),'utf8')));
  const { violations, topLevel } = classifyPackedPaths(names, {bundledLockEntries: bundled});
  assert.equal(violations.length, 0, `packed artifact boundary violated by ${violations.length} path(s):\n${violations.map(v => `  ${v.rule}: ${v.path}`).join('\n')}`);
  const repacked = spawnSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', scratch2], {cwd: root, encoding: 'utf8'});
  assert.equal(repacked.status, 0, repacked.stderr);
  const second = JSON.parse(repacked.stdout)[0];
  assert.ok(second.shasum === receipts[0].shasum && second.integrity === receipts[0].integrity, `pack is not deterministic: first shasum=${receipts[0].shasum} integrity=${receipts[0].integrity}; second shasum=${second.shasum} integrity=${second.integrity}`);
  const run = (cmd, args) => spawnSync(cmd, args, {cwd: root, encoding: 'utf8'});
  const stamp = gitStamp(root);
  const npmVersion = run('npm', ['--version']);
  console.log(JSON.stringify(buildPackageReceipt({
    fileCount: names.length, shasum: receipts[0].shasum, integrity: receipts[0].integrity,
    git: stamp,
    node: process.version, npm: npmVersion.status === 0 ? npmVersion.stdout.trim() : 'unknown', platform: process.platform, arch: process.arch,
    utc: new Date().toISOString(), command: `npm ${[...packArgs.slice(0, -1), "<scratch>"].join(" ")}`, topLevel, bundled,
  })));
} finally { removeScratch(scratch, scratch2); }
