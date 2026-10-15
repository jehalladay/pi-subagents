/** L2 native Pi tool read of an independently launched disposable real-bd Run. */
import {existsSync,mkdirSync,readFileSync,realpathSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {expect,it} from 'vitest';

import subagentsExtension from '../src/index.js';
import {ctx,makePi,textOf} from './helpers/boot-extension.js';

const root=process.env.PI_FURNACE_FIXTURE_ROOT;
const runId=process.env.PI_FURNACE_FIXTURE_RUN_ID;
if(!root||!runId)throw new Error('Pi native Furnace client requires an independently launched disposable real-bd Run.');
it('Pi tool requires explicit grant, and returns native refs without changing controller state',async()=>{
  const workspace=realpathSync(root);
  expect(workspace).toMatch(/^\/tmp\/pi-external-furnace-realbd\.[^/]+$/);
  const nativeRun=join(workspace,'.furnace','runs',runId,'run.json');
  const priorRun=readFileSync(nativeRun);
  const settings=join(workspace,'.pi','subagents.json');
  const existed=existsSync(settings);
  const prior=existed?readFileSync(settings,'utf8'):undefined;
  const dirExisted=existsSync(join(workspace,'.pi'));
  try {
    const parsed=(prior?JSON.parse(prior):{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude'}}) as {workflowsEnabled?:boolean;workbench?:{workflowAgentBackend?:string;capabilityGrants?:string[]}};
    mkdirSync(join(workspace,'.pi'),{recursive:true});
    parsed.workbench={...parsed.workbench,capabilityGrants:[...(parsed.workbench?.capabilityGrants??[]),'furnace:inspect']};
    writeFileSync(settings,JSON.stringify(parsed));
    const pi=makePi();subagentsExtension(pi.pi);
    const context=ctx({cwd:workspace});
    await pi.lifecycle.get('session_start')?.({},context);
    const tool=pi.tools.get('furnace_observe');expect(tool).toBeDefined();
    const reading=JSON.parse(textOf(await tool.execute('external-fixture',{runId},undefined,undefined,context))) as {source:{runId:string;beadsRunId:string;ownership:string};run:{state:string};attempts:{items:{id:string}[]};freshness:string};
    expect(reading).toMatchObject({source:{runId,ownership:'external'},run:{state:'completed'},freshness:'current'});
    expect(reading.source.beadsRunId).toMatch(/^fx-wisp-/);
    expect(reading.attempts.items[0]?.id).toMatch(/^frn-atm-/);
    expect(readFileSync(nativeRun)).toEqual(priorRun);
  }finally{if(prior!==undefined)writeFileSync(settings,prior);else {rmSync(settings,{force:true});if(!dirExisted)rmSync(join(workspace,'.pi'),{recursive:true,force:true});}}
},90_000);
