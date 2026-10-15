/** W02 L2: registered Pi extension, native SDK stream, and actual manager boundary. */
import { readdirSync, readFileSync } from 'node:fs';
import type { SDKMessage } from '@anthropic-ai/claude-agent-sdk';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentManager } from '../src/agent-manager.js';
import subagentsExtension from '../src/index.js';
import { sessionTaskDir } from '../src/output-file.js';
import * as cards from '../src/ui/workflow-card.js';
import { collapse } from '../src/workflow/progress.js';
import { ctx, hermeticDir, makePi } from './helpers/boot-extension.js';

const native = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock('@anthropic-ai/claude-agent-sdk', async original => ({ ...await original(), query: native.query }));
const HEAD = 'export const meta={name:"native-stream",description:"W02 Pi client"};\n';
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; vi.restoreAllMocks(); native.query.mockReset(); });
function frame(value: unknown): SDKMessage { return value as SDKMessage; }
function init(id: string) { return frame({type:'system',subtype:'init',session_id:id,uuid:`init-${id}`,model:'claude-opus-5-5',tools:['Read'],permissionMode:'dontAsk',effort:'low'}); }
function result(id: string, extra: Record<string, unknown> = {}) { return frame({type:'result',subtype:'success',session_id:id,uuid:`result-${id}`,is_error:false,result:'done',modelUsage:{},permission_denials:[],...extra}); }
async function boot(script: string) {
  sandbox = hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude',model:'claude-opus-5-5',tools:['Read']}}});
  const forbidden = ['spawn', 'spawnAndWait', 'resume'] as const;
  const spies = forbidden.map(name => vi.spyOn(AgentManager.prototype, name).mockImplementation(() => { throw new Error(`Pi manager ${name} must never run`); }));
  const render = vi.spyOn(cards, 'renderWorkflowCard');
  const pi = makePi(); subagentsExtension(pi.pi);
  const context = ctx({cwd:sandbox.dir});
  await pi.lifecycle.get('session_start')?.({}, context);
  const tool = pi.tools.get('SubagentWorkflow')!;
  const reply = await tool.execute('native-wf', {script:HEAD+script}, undefined, undefined, context);
  function snapshot() {
    tool.renderResult(reply, {expanded:false,isPartial:false}, {fg: (_:string,s:string) => s, bold:(s:string)=>s}, {isError:false});
    return render.mock.calls.at(-1)![0];
  }
  return {pi,context,snapshot,spies};
}
async function until(predicate: () => boolean) {
  for (let n=0;n<200;n++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve,10)); }
  throw new Error('Native Pi workflow did not reach expected state');
}

describe('W02 Pi native streaming observations', () => {
  it('observes a live owned stream, bounded summaries and tool evidence without leaking bodies; terminal retains evidence', async () => {
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release=resolve; });
    native.query.mockImplementation(() => (async function*() {
      yield init('native-live');
      for (let n=0;n<2000;n++) yield frame({type:'stream_event',session_id:'native-live',uuid:`delta-${n}`,parent_tool_use_id:null,event:{type:'content_block_delta',index:0,delta:{type:'text_delta',text:'SECRET_TOKEN_abc'}}});
      yield frame({type:'assistant',session_id:'native-live',uuid:'assistant-live',parent_tool_use_id:null,message:{content:[{type:'tool_use',id:'read-1',name:'Read',input:{file_path:'SECRET_PATH'}}]}});
      yield frame({type:'user',session_id:'native-live',uuid:'tool-result',message:{content:[{type:'tool_result',tool_use_id:'read-1',content:'SECRET_FILE_CONTENT'}]}});
      await pending;
      yield result('native-live');
    })());
    const client=await boot('return await agent("one",{label:"owned"});');
    await until(() => collapse(client.snapshot().progress).agents[0]?.nativeObservation?.tools[0]?.state === 'completed');
    const live=collapse(client.snapshot().progress).agents[0];
    expect(live.state).toBe('progress'); expect(live.sessionId).toBe('native-live');
    expect(live.nativeObservation).toMatchObject({provider:'claude-agent-sdk',sessionId:'native-live',assistantCharacters:32000,tools:[{toolUseId:'read-1',name:'Read',state:'completed'}],freshness:'current'});
    expect(client.snapshot().progress.length).toBeLessThan(30);
    expect(JSON.stringify(client.snapshot().progress)).not.toMatch(/SECRET_/);
    release(); await until(() => client.snapshot().task.status === 'completed');
    expect(collapse(client.snapshot().progress).agents[0].nativeObservation).toMatchObject({terminal:'succeeded',sessionId:'native-live'});
    for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();
  });
  it('returns parallel structured values under distinct native session identities through registered Pi tool', async () => {
    native.query.mockImplementation(({prompt}:{prompt:string}) => (async function*(){yield init(`native-${prompt}`);yield result(`native-${prompt}`,{structured_output:{answer:prompt}});})());
    const client=await boot('return await parallel(["one","two","three"].map(value=>()=>agent(value,{label:value,schema:{type:"object",properties:{answer:{type:"string"}},required:["answer"],additionalProperties:false}})));');
    await until(() => client.snapshot().task.status === 'completed');
    expect(collapse(client.snapshot().progress).agents.map(a=>a.sessionId).sort()).toEqual(['native-one','native-three','native-two']);
    expect(native.query).toHaveBeenCalledTimes(3);
    // The persisted journal is the public settled-call evidence, not a mock result.
    const dir=sessionTaskDir(sandbox!.dir,'s1');
    const journalFile=readdirSync(dir).find(name=>name.endsWith('.workflow.jsonl'))!;
    const journal=readFileSync(`${dir}/${journalFile}`,'utf8').trim().split('\n').map(line=>JSON.parse(line));
    expect(journal.map(entry=>JSON.parse(entry.text).answer).sort()).toEqual(['one','three','two']);
    for (const call of native.query.mock.calls) expect(call[0].options.outputFormat.type).toBe('json_schema');
    for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();
  });
  it.each(['invalid-model','permission'])('preserves native %s failure and never falls back to manager', async kind => {
    native.query.mockImplementation(() => (async function*(){yield init('native-failed');yield result('native-failed',{subtype:'error_during_execution',is_error:true,errors:[kind==='permission'?'permission denied':'invalid model'],permission_denials:kind==='permission'?[{tool_name:'Read',tool_use_id:'denied-1',tool_input:{secret:'SECRET_DENIAL'}}]:[]});})());
    const client=await boot('return await agent("fail");');
    await until(() => collapse(client.snapshot().progress).agents[0]?.state === 'error');
    const row=collapse(client.snapshot().progress).agents[0];
    expect(row.sessionId).toBe('native-failed'); expect(row.error).toContain(kind==='permission'?'permission denied':'invalid model');
    expect(row.nativeObservation?.terminal).toBe('failed');
    if (kind==='permission') expect(row.nativeObservation?.tools).toContainEqual({toolUseId:'denied-1',name:'Read',state:'refused'});
    expect(JSON.stringify(row.nativeObservation)).not.toContain('SECRET_DENIAL');
    for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();
  });
  it('session shutdown requests owned SDK abort and records cancellation, never Pi workflow spawn', async () => {
    let abortSignal: AbortSignal | undefined;
    native.query.mockImplementation(({options}) => (async function*(){abortSignal=options.abortController.signal;yield init('native-cancel');await new Promise<void>((_,reject)=>{abortSignal!.addEventListener('abort',()=>reject(new Error('AbortError')),{once:true});});})());
    const client=await boot('return await agent("wait");');
    await until(() => !!abortSignal && collapse(client.snapshot().progress).agents[0]?.sessionId==='native-cancel');
    // Shutdown removes the task from the extension's UI registry; retain the live
    // progress array, not a renderer snapshot whose task status is a copied value.
    const progress = client.snapshot().progress;
    await client.pi.lifecycle.get('session_shutdown')?.({},client.context);
    expect(abortSignal?.aborted).toBe(true);
    await until(() => collapse(progress).agents[0]?.nativeObservation?.terminal==='cancelled');
    for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();
  });
});
