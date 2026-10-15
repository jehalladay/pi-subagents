/** Adverse provider pressure: input/output bounds and raw RPC must fail without effects. */
import {describe, expect, it, vi} from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import {runWorkflow, type WorkflowHost} from '../src/workflow/runtime.js';

const HEAD='export const meta={name:"limits",description:"negative controls"};\n';

describe('node host limits',()=>{
  it('refuses oversized input before native provider is called',async()=>{
    const registry=new CapabilityRegistry();const invoke=vi.fn(async()=>({ok:true}));
    registry.register({descriptor:{id:'limit.read',version:'1.0.0',description:'bounded',inputSchema:{type:'object'},effectClass:'read',permissions:['read'],supportedModes:['invoke']},invoke});
    const host:WorkflowHost={spawnAgent:async()=>({ok:true,text:''}),abortAgent:()=>{},callNode:req=>registry.invoke(req.capabilityId,req.input,{grants:['read'],signal:req.signal})};
    const result=await runWorkflow({script:HEAD+'return await node("limit.read",{value:"'+'x'.repeat(300_000)+'"});',host});
    expect(result.status).toBe('failed');
    expect(invoke).not.toHaveBeenCalled();
  });
  it('does not allow unbounded concurrent node invocations',async()=>{
    let active=0,max=0;
    const host:WorkflowHost={spawnAgent:async()=>({ok:true,text:''}),abortAgent:()=>{},callNode:async()=>{active++;max=Math.max(max,active);await new Promise(r=>setTimeout(r,25));active--;return {ok:true}}};
    const script=HEAD+'return await parallel(Array.from({length:100},()=>()=>node("limit.read",{})));';
    const result=await runWorkflow({script,host});
    expect(result.status).toBe('completed');
    expect(max).toBeLessThanOrEqual(16);
  });
});
