/** L3/L4: typed node RPC, authorization, evidence truth and no blind replay. */
import { describe, expect, it, vi } from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import { runWorkflow, type WorkflowHost } from '../src/workflow/runtime.js';

const HEAD = 'export const meta = {name:"node-contract",description:"test"};\n';
const SCHEMA={type:'object', properties:{value:{type:'string'}},required:['value'],additionalProperties:false};
function harness(grants: string[] = ['record:read']) {
  const invoke=vi.fn(async (input:{value:string})=>({kind:'partial',value:input.value,evidenceRefs:[],sourceBasis:'fixture'}));
  const registry=new CapabilityRegistry();
  registry.register({descriptor:{id:'record.read',version:'1.0.0',description:'Read record',inputSchema:SCHEMA,effectClass:'read',permissions:['record:read'],supportedModes:['invoke']},invoke});
  const host:WorkflowHost={
    spawnAgent:async()=>{throw Error('node() must never call agent()');},abortAgent:()=>{},
    callNode:request=>registry.invoke(request.capabilityId,request.input,{grants,signal:new AbortController().signal}),
  };
  return {registry,host,invoke};
}
const run=(body:string,host:WorkflowHost)=>runWorkflow({script:HEAD+body,host});

describe('Workbench node() host authorization',()=>{
  it('L3: deterministic SDK node returns its typed native domain result without an agent',async()=>{
    const {host,invoke}=harness();
    const result=await run('return await node("record.read", {value:"ok"});',host);
    expect(result).toMatchObject({status:'completed',value:{kind:'partial',value:'ok',evidenceRefs:[],sourceBasis:'fixture'}});
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(result.agentCount).toBe(0);
    expect(result.progress.some(e=>e.type==='workflow_node' && e.capabilityId==='record.read' && e.state==='done')).toBe(true);
  });
  it('L4: unauthorized invocation denied at host even with known capability id',async()=>{
    const {host,registry,invoke}=harness([]);
    expect(registry.discover({grants:[]})).toEqual([]);
    const result=await run('return await node("record.read", {value:"secret"});',host);
    expect(result.status).toBe('failed');
    expect(result.error).toMatch(/permission|grant|denied/i);
    expect(invoke).not.toHaveBeenCalled();
  });
  it('L4: accessor-bearing node input fails before executing the getter or provider',async()=>{
    const {host,invoke}=harness();
    const result=await run('const input={}; Object.defineProperty(input,"value",{enumerable:true,get(){ throw Error("getter executed") }}); return await node("record.read",input);',host);
    expect(result.status).toBe('failed');
    expect(result.error).toMatch(/accessor|getter.*not allowed/i);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('L4: malformed input and non-JSON payload fail before provider effects',async()=>{
    const {host,invoke}=harness();
    const bad=await run('return await node("record.read", {value:123});',host);
    expect(bad.status).toBe('failed');
    const cyclic=await run('const x={}; x.self=x; return await node("record.read",x);',host);
    expect(cyclic.status).toBe('failed');
    expect(invoke).not.toHaveBeenCalled();
  });
  it('L4: discovery returns a detached descriptor so callers cannot rewrite the live policy',async()=>{
    const {registry,invoke}=harness();
    const descriptor=registry.discover({grants:['discover:record.read']})[0];
    expect(descriptor).toBeDefined();
    try { (descriptor.permissions as string[]).splice(0); } catch { /* a frozen snapshot is acceptable */ }
    await expect(registry.invoke('record.read',{value:'x'},{grants:[],signal:new AbortController().signal})).rejects.toThrow(/permission denied/i);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('L4: unknown capability and duplicate descriptor fail explicitly',async()=>{
    const {host,registry,invoke}=harness();
    const missing=await run('return await node("no.such.capability",{});',host);
    expect(missing.status).toBe('failed');
    expect(missing.error).toMatch(/unknown|unavailable/i);
    expect(invoke).not.toHaveBeenCalled();
    expect(()=>registry.register({descriptor:{id:'record.read',version:'1.0.0',description:'duplicate',inputSchema:SCHEMA,effectClass:'read',permissions:['record:read'],supportedModes:['invoke']},invoke})).toThrow(/duplicate|already registered/i);
  });
  it('L4: node calls are never served from the settled-agent journal',async()=>{
    const {host,invoke}=harness();
    const script=HEAD+'return await node("record.read", {value:"again"});';
    const first=await runWorkflow({script,host,journal:{entries:[],append:vi.fn()}});
    expect(first.status).toBe('completed');
    const second=await runWorkflow({script,host,journal:{entries:[],append:vi.fn()}});
    expect(second.status).toBe('completed');
    expect(invoke).toHaveBeenCalledTimes(2);
  });
  it('L4: effectful provider output that cannot be serialized remains uncertain after invocation',async()=>{
    const registry=new CapabilityRegistry();
    const invoked=vi.fn(async()=>({value:()=>true}));
    registry.register({descriptor:{id:'effect.bad',version:'1.0.0',description:'write with lost output',inputSchema:SCHEMA,effectClass:'write',permissions:['effect:write'],supportedModes:['invoke']},invoke:invoked});
    const host:WorkflowHost={spawnAgent:async()=>({ok:true,text:''}),abortAgent:()=>{},callNode:req=>registry.invoke(req.capabilityId,req.input,{grants:['effect:write'],signal:req.signal})};
    const result=await run('return await node("effect.bad",{value:"x"});',host);
    expect(result.status).toBe('failed');
    expect(result.error).toMatch(/uncertain external effect/i);
    expect(invoked).toHaveBeenCalledTimes(1);
  });

  it('L4: effectful invocation with lost response is reported uncertain, never automatically retried',async()=>{
    const registry=new CapabilityRegistry();
    const invoked=vi.fn(async()=>{throw Error('response lost after producer accepted');});
    registry.register({descriptor:{id:'effect.write',version:'1.0.0',description:'external write',inputSchema:SCHEMA,effectClass:'external',permissions:['effect:write'],supportedModes:['invoke']},invoke:invoked});
    const host:WorkflowHost={spawnAgent:async()=>({ok:true,text:''}),abortAgent:()=>{},
      callNode:req=>registry.invoke(req.capabilityId,req.input,{grants:['effect:write'],signal:req.signal})};
    const result=await run('return await node("effect.write", {value:"x"});',host);
    expect(result.status).toBe('failed');
    expect(result.error).toMatch(/uncertain external effect.*reconcile/i);
    expect(invoked).toHaveBeenCalledTimes(1);
  });

  it('L4: a node between identical agents invalidates downstream journal replay',async()=>{
    const {host:base,invoke,registry}=harness();
    const calls=vi.fn(async()=>({ok:true,text:'fresh'}));
    const host:WorkflowHost={...base,spawnAgent:calls};
    const script=HEAD+'const first=await agent("first"); await node("record.read",{value:"x"}); return await agent("second");';
    const journaled: import('../src/workflow/journal.js').WorkflowJournalEntry[]=[];
    // Recorded under the registry's declared class, as every Workbench host
    // records it, and resumed under a host that vouches for no class: the read
    // runs live rather than replaying, and a live node ends the replayable
    // prefix. (A node journaled with no class at all stops the resume: wb-tu1.)
    await runWorkflow({script,host:{...host,describeNodeEffect:id=>registry.effectClassOf(id)},journal:{entries:[],append:e=>journaled.push(e)}});
    expect(journaled.find(e=>e.kind==='node')?.effectClass).toBe('read');
    const before=calls.mock.calls.length;
    const replay=await runWorkflow({script,host,journal:{entries:journaled}});
    expect(replay.status).toBe('completed');
    expect(calls.mock.calls.length-before).toBe(1);
    expect(invoke).toHaveBeenCalledTimes(2);
  });

  it('L4: non-serializable provider output cannot cross the worker boundary',async()=>{
    const {host,registry}=harness();
    registry.register({descriptor:{id:'record.bad',version:'1.0.0',description:'bad output',inputSchema:SCHEMA,effectClass:'read',permissions:['record:read'],supportedModes:['invoke']},invoke:async()=>({value:()=>true})});
    const result=await run('return await node("record.bad", {value:"x"});',host);
    expect(result.status).toBe('failed');
    expect(result.error).toMatch(/boundary|function|serializ/i);
  });
});
