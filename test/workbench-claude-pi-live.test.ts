/** Opt-in real Agent SDK -> registered Pi tool proof; no SDK substitution. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { getSessionInfo } from '@anthropic-ai/claude-agent-sdk';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentManager } from '../src/agent-manager.js';
import subagentsExtension from '../src/index.js';
import { sessionTaskDir } from '../src/output-file.js';
import * as cards from '../src/ui/workflow-card.js';
import { collapse } from '../src/workflow/progress.js';
import { ctx, hermeticDir, makePi } from './helpers/boot-extension.js';

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;vi.restoreAllMocks();});
describe('VC-1 registered Pi real Claude SDK acceptance',()=>{
  it('runs three parallel structured agents with actual sessions and no Pi manager invocation',async()=>{
    const home=process.env.HOME;
    sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude',model:'claude-opus-5-5',tools:[],settingSources:[],capabilityGrants:['workbench:observe']}}});
    // Preserve the user's deployed native authentication, not test credentials.
    if(home===undefined) delete process.env.HOME; else process.env.HOME=home;
    const spies=(['spawn','spawnAndWait','resume'] as const).map(name=>vi.spyOn(AgentManager.prototype,name).mockImplementation(()=>{throw new Error(`Forbidden Pi manager ${name}`);}));
    const render=vi.spyOn(cards,'renderWorkflowCard');
    const pi=makePi();subagentsExtension(pi.pi);
    const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get('session_start')?.({},context);
    const tool=pi.tools.get('SubagentWorkflow')!;
    const reply=await tool.execute('live-claude',{script:'export const meta={name:"real-pi-claude",description:"three structured native SDK agents"};\nreturn await parallel(["alpha","beta","gamma"].map(value=>()=>agent("Return exactly an object with answer equal to "+value,{label:value,schema:{type:"object",properties:{answer:{type:"string",enum:[value]}},required:["answer"],additionalProperties:false}})));'},undefined,undefined,context);
    function snapshot(){
      tool.renderResult(reply,{expanded:false,isPartial:false},{fg:(_:string,s:string)=>s,bold:(s:string)=>s},{isError:false});
      return render.mock.calls.at(-1)![0];
    }
    const deadline=Date.now()+170000;
    while(snapshot().task.status==='running' && Date.now()<deadline) await new Promise(resolve=>setTimeout(resolve,100));
    const view=snapshot();const rows=collapse(view.progress).agents;
    const observed=await pi.tools.get('workflow_observe')!.execute('live-inspect',{taskId:reply.details.taskId},undefined,undefined,context);
    expect(view.task.status, JSON.stringify({rows, observed, notifications:pi.pi.sendMessage.mock.calls, reply})).toBe('completed');expect(rows).toHaveLength(3);
    expect(rows.every(row=>row.state==='done')).toBe(true);
    expect(new Set(rows.map(row=>row.sessionId)).size).toBe(3);
    for(const row of rows){expect(row.sessionId).toMatch(/^[a-f0-9-]{36}$/);expect(row.nativeObservation).toMatchObject({provider:'claude-agent-sdk',terminal:'succeeded',sessionId:row.sessionId});}
    expect(view.progress.length).toBeLessThan(240);
    const dir=sessionTaskDir(sandbox.dir,'s1');
    const journalFile=readdirSync(dir).find(name=>name.endsWith('.workflow.jsonl'))!;
    const journal=readFileSync(`${dir}/${journalFile}`,'utf8').trim().split('\n').map(line=>JSON.parse(line));
    expect(journal.map(entry=>JSON.parse(entry.text).answer).sort()).toEqual(['alpha','beta','gamma']);
    for(const spy of spies)expect(spy).not.toHaveBeenCalled();
    for(const row of rows) expect((await getSessionInfo(row.sessionId!,{dir:sandbox.dir}))?.sessionId).toBe(row.sessionId);
    writeFileSync(`${dir}/native-pi-acceptance.json`,JSON.stringify({sdkVersion:'0.3.300',sessionIds:rows.map(row=>row.sessionId),structured:journal.map(entry=>JSON.parse(entry.text)),progressEntries:view.progress.length,nativeObservations:rows.map(row=>row.nativeObservation),managerCalls:spies.map(spy=>spy.mock.calls.length)},null,2));
    console.log('VC1_NATIVE_PI_RECEIPT',JSON.stringify({sessionIds:rows.map(row=>row.sessionId),structured:journal.map(entry=>JSON.parse(entry.text)),progressEntries:view.progress.length,managerCalls:spies.map(spy=>spy.mock.calls.length)}));
    await pi.lifecycle.get('session_shutdown')?.({},context);
  },180000);
});
