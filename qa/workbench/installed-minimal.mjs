/** Copied into a clean consumer by install-minimal.mjs and run under a scrubbed environment. */
import assert from 'node:assert/strict';
import {rmSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {probeInstalledWrite} from './install-minimal-lib.mjs';
import {CapabilityRegistry} from '@tintinweb/pi-subagents/dist/workbench/capability-registry.js';
import {captureInvocationIdentity,verifyInvocationIdentity} from '@tintinweb/pi-subagents/dist/workbench/identity.js';
import {runWorkflow} from '@tintinweb/pi-subagents/dist/workflow/runtime.js';
const keys=Object.keys(process.env).sort();
assert.deepEqual(keys,['HOME','LANG','PATH','TMPDIR'],`unexpected environment keys: ${keys.join(',')}`);
assert.ok(!keys.some(k=>/^(ANTHROPIC|AWS|CLAUDE|OPENAI|GITHUB|NPM_|NODE_OPTIONS|NODE_PATH)/.test(k)));
const installedRoot=resolve(dirname(fileURLToPath(import.meta.resolve('@tintinweb/pi-subagents/dist/workbench/identity.js'))),'../..');
const scriptPath=resolve('installed.workflow.js');
writeFileSync(scriptPath,'export const meta={name:"installed-minimal",description:"consumer"}; return 42;');
const pinInput={definition:{kind:'script',id:'installed-minimal',schemaVersion:'1'},scriptPath,packageRoot:installedRoot,hostArtifacts:['dist/workbench/identity.js'],runtimeArtifacts:[fileURLToPath(import.meta.resolve('@anthropic-ai/claude-agent-sdk'))],logicalInvocationId:'installed-minimal-proof',principal:{issuer:'local-test',subject:'consumer'},workspace:{path:process.cwd(),sourceBasis:'unknown:consumer-fixture'},effectiveConfig:{tools:[]},hostAbi:{runtime:'node',version:process.versions.node,platform:process.platform,arch:process.arch,interfaceVersion:'workbench/v1'},providerDescriptors:[]};
const pinned=captureInvocationIdentity(pinInput);
verifyInvocationIdentity(pinned,pinInput);
assert.ok(pinned.dependencyArtifacts.some(a=>a.path==='vendor/dependency-lock.json'));
const result=await runWorkflow({script:pinned.scriptSource,host:{spawnAgent(){throw Error('unexpected agent')},abortAgent(){}}});
assert.equal(result.status,'completed',result.error);
assert.equal(result.value,42);
const registry=new CapabilityRegistry();
registry.register({descriptor:{id:'fixture.echo',version:'1.0.0',description:'fixture echo',effectClass:'read',permissions:[],supportedModes:['invoke'],inputSchema:{type:'object'}},async invoke(input){return input;}});
const signal=new AbortController().signal;
const discoverEmpty=registry.discover({grants:[]}).length;
assert.equal(discoverEmpty,0);
const discoverGranted=registry.discover({grants:['discover:fixture.echo']}).map(d=>d.id);
assert.deepEqual(discoverGranted,['fixture.echo']);
async function outcome(promise){
  try{const value=await promise;return {returned:true,value};}
  catch(error){return {returned:false,name:error?.name,category:error?.category};}
}
const discoverOnly=await outcome(registry.invoke('fixture.echo',{},{grants:['discover:fixture.echo'],signal}));
assert.equal(discoverOnly.returned,false,'discover-only grant must not invoke');
assert.equal(discoverOnly.name,'CapabilityError');
assert.equal(discoverOnly.category,'authorization');
const undefinedGrants=await outcome(registry.invoke('fixture.echo',{},{grants:undefined,signal}));
assert.equal(undefinedGrants.returned,false,'undefined grants must not invoke');
assert.equal(undefinedGrants.category,'authorization');
const granted=await outcome(registry.invoke('fixture.echo',{ok:true},{grants:['invoke:fixture.echo'],signal}));
assert.equal(granted.returned,true);
assert.deepEqual(granted.value,{ok:true});
const missing=await outcome(registry.invoke('fixture.missing',{},{grants:['invoke:fixture.missing'],signal}));
assert.equal(missing.returned,false,'unknown capability must reject, never resolve (including null)');
assert.equal(missing.name,'CapabilityError');
assert.equal(missing.category,'unavailable');
const uid=typeof process.getuid==='function'?process.getuid():undefined;
const {readOnlyEnforced,readOnlyReason}=probeInstalledWrite({root:installedRoot,uid,write:writeFileSync,remove:rmSync});
console.log(JSON.stringify({contract:'workbench.install-minimal/v1',envKeys:keys,readOnlyEnforced,...(readOnlyReason?{readOnlyReason}:{}),workflowValue:result.value,registryOutcomes:{discoverEmpty,discoverGranted,invokeWithDiscoverOnly:discoverOnly.category,invokeWithUndefinedGrants:undefinedGrants.category,invokeGranted:'returned',invokeMissing:missing.category},node:process.version,platform:process.platform,arch:process.arch,utc:new Date().toISOString()}));
