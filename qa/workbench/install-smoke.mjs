/** Clean external npm consumer. No publication or changes to the development install. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const root = process.cwd();
const scratch = mkdtempSync(join(tmpdir(), 'pi-workbench-install-'));
try {
  const packed = spawnSync('npm', ['pack','--ignore-scripts','--json','--pack-destination',scratch], {cwd:root,encoding:'utf8',timeout:60000});
  assert.equal(packed.status,0,packed.stderr);
  const receipt=JSON.parse(packed.stdout)[0];
  const consumer=join(scratch,'consumer');mkdirSync(consumer);
  writeFileSync(join(consumer,'package.json'),JSON.stringify({name:'workbench-external-smoke',version:'0.0.0',private:true,type:'module'}));
  const installed=spawnSync('npm',['install','--ignore-scripts','--no-audit','--no-fund',join(scratch,receipt.filename)],{cwd:consumer,encoding:'utf8',timeout:180000});
  assert.equal(installed.status,0,installed.stderr);
  writeFileSync(join(consumer,'probe.mjs'),readFileSync(join(root,'qa/workbench/installed-consumer.mjs'),'utf8'));
  const probe=spawnSync(process.execPath,['probe.mjs'],{cwd:consumer,encoding:'utf8',timeout:30000});
  assert.equal(probe.status,0,probe.stderr);
  console.log(probe.stdout.trim());
} finally {rmSync(scratch,{recursive:true,force:true});}
