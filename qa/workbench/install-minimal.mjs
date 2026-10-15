/** Clean external npm consumer run under a scrubbed environment and a read-only installed tree. */
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {chmodSync,copyFileSync,lstatSync,mkdirSync,mkdtempSync,readdirSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {resolveNodeBinary,scrubbedEnvironment,treeCensus} from './install-minimal-lib.mjs';
const root=process.cwd();
const scratch=mkdtempSync(join(tmpdir(),'pi-workbench-install-minimal-'));
const consumer=join(scratch,'consumer');
function setWritable(path,writable){
  const stat=lstatSync(path);
  if(stat.isSymbolicLink())return;
  if(stat.isDirectory()){
    if(!writable)for(const name of readdirSync(path))setWritable(join(path,name),writable);
    chmodSync(path,writable?stat.mode|0o700:stat.mode&~0o222);
    if(writable)for(const name of readdirSync(path))setWritable(join(path,name),writable);
  }else chmodSync(path,writable?stat.mode|0o600:stat.mode&~0o222);
}
try{
  const packArgv=['pack','--ignore-scripts','--json','--pack-destination',scratch];
  const packed=spawnSync('npm',packArgv,{cwd:root,encoding:'utf8',timeout:60000});
  assert.equal(packed.status,0,packed.stderr);
  const tarball=JSON.parse(packed.stdout)[0];
  mkdirSync(consumer);
  mkdirSync(join(scratch,'home'));
  mkdirSync(join(scratch,'tmp'));
  writeFileSync(join(consumer,'package.json'),JSON.stringify({name:'workbench-minimal-smoke',version:'0.0.0',private:true,type:'module'}));
  const installArgv=['install','--ignore-scripts','--no-audit','--no-fund',join(scratch,tarball.filename)];
  const installed=spawnSync('npm',installArgv,{cwd:consumer,encoding:'utf8',timeout:180000});
  assert.equal(installed.status,0,installed.stderr);
  copyFileSync(join(root,'qa/workbench/installed-minimal.mjs'),join(consumer,'probe.mjs'));
  const installedTree=join(consumer,'node_modules');
  setWritable(installedTree,false);
  const censusBefore=treeCensus(installedTree);
  const nodeBinary=resolveNodeBinary(process.execPath);
  const probeArgv=[nodeBinary,'probe.mjs'];
  const env=scrubbedEnvironment({execPath:process.execPath,home:join(scratch,'home'),tmp:join(scratch,'tmp')});
  const probe=spawnSync(probeArgv[0],probeArgv.slice(1),{cwd:consumer,env,encoding:'utf8',timeout:60000});
  const censusAfter=treeCensus(installedTree);
  assert.equal(probe.status,0,probe.stderr||probe.stdout);
  assert.equal(censusBefore,censusAfter,'installed tree changed during the probe');
  const probeReceipt=JSON.parse(probe.stdout.trim().split('\n').pop());
  assert.equal(probeReceipt.workflowValue,42);
  const git=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'});
  const revision=process.env.WB_REVISION??(git.status===0?git.stdout.trim():'working-tree');
  const receipt={contract:'workbench.install-minimal/v1',revision,commands:{pack:['npm',...packArgv],install:['npm',...installArgv],probe:probeArgv},tarball:{filename:tarball.filename,shasum:tarball.shasum,integrity:tarball.integrity,fileCount:tarball.entryCount??tarball.files?.length??null},censusDigest:censusAfter,censusBefore,censusAfter,probe:probeReceipt,host:{nodeBinary,node:process.version,platform:process.platform,arch:process.arch,uid:typeof process.getuid==='function'?process.getuid():null},utc:new Date().toISOString()};
  const line=JSON.stringify(receipt);
  if(process.env.WB_INSTALL_MINIMAL_RECEIPT)writeFileSync(process.env.WB_INSTALL_MINIMAL_RECEIPT,`${line}\n`);
  console.log(line);
}finally{
  try{setWritable(join(consumer,'node_modules'),true);}catch{}
  rmSync(scratch,{recursive:true,force:true});
}
