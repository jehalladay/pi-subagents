/** L3/L4: Forge SDK provider must preserve native status rather than invent PASS. */
import { describe, expect, it, vi } from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import { registerForgeGateStatus } from '../src/workbench/providers/forge.js';

const SOURCE={
  status:'success', envelope:{verdict:null, reason_code:'FORGE_OK'},
  data:{packages:[{ref:'code:pi-subagents',last_result:'success',authoritative_current:false,unverified_reason:'FORGE_CURRENT_STATE_UNVERIFIED'}]},
};
describe('native Forge read provider',()=>{
  it('preserves last_result as historical, not verified candidate',async()=>{
    const status=vi.fn(async (_target:{target:string})=>({protocolMethod:'gate.status',raw:SOURCE}));
    const registry=new CapabilityRegistry();
    registerForgeGateStatus(registry,{gate:{status}},'0.1.0');
    const output=await registry.invoke('forge.gate.status',{target:'.'}, {grants:['forge:inspect'],signal:new AbortController().signal});
    expect(status).toHaveBeenCalledWith({target:'.'});
    expect(output).toEqual({contract:'forge.gate.status/v1',protocolMethod:'gate.status',source:SOURCE});
    expect(JSON.stringify(output)).not.toContain('"verified":true');
  });
  it('read-only grant does not permit gate.run or write',async()=>{
    const status=vi.fn(async()=>({protocolMethod:'gate.status',raw:SOURCE}));
    const registry=new CapabilityRegistry();registerForgeGateStatus(registry,{gate:{status}},'0.1.0');
    await expect(registry.invoke('forge.gate.run',{target:'.'},{grants:['forge:inspect'],signal:new AbortController().signal})).rejects.toThrow(/unavailable|unknown/i);
  });
  it('server partial outcome remains a partial domain value',async()=>{
    const partial={status:'partial',envelope:{verdict:'COULD_NOT_JUDGE',reason_code:'FORGE_GATE_INCOMPLETE'},data:{packages:[]}};
    const registry=new CapabilityRegistry();registerForgeGateStatus(registry,{gate:{status:async()=>({protocolMethod:'gate.status',raw:partial})}},'0.1.0');
    const result=await registry.invoke('forge.gate.status',{target:'.'},{grants:['forge:inspect'],signal:new AbortController().signal});
    expect(result).toMatchObject({source:{status:'partial',envelope:{verdict:'COULD_NOT_JUDGE'}}});
  });
});
