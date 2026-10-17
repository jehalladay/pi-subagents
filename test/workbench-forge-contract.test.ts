/** L3/L4: Forge SDK provider must preserve native status rather than invent PASS. */
import { describe, expect, it, vi } from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import { registerForgeGateStatus } from '../src/workbench/providers/forge.js';

const SOURCE={
  status:'success', envelope:{verdict:null, reason_code:'FORGE_OK'},
  data:{packages:[{ref:'code:pi-subagents',last_result:'success',authoritative_current:false,unverified_reason:'FORGE_CURRENT_STATE_UNVERIFIED'}]},
};
// wb-4ap.11 (COLLECTIVE-ADAPTATION-R11, present-branch): measured 2026-10-17 on this seat at
// installed forge 0.2.1 (rev 909bee0e2df8); copied from the paired full-row gate.status read
// (read ids cmd_90883d0ff8dd / op-99094cc05b0a4c2ca3bb5f271ad4535e; receipt read cmd_b5f4818c0c1d).
const SOURCE_WITH_STATE={
  status:'success', envelope:{verdict:null, reason_code:'FORGE_OK'},
  data:{packages:[{...( {"authoritative_current": false, "blockedBy": [], "env_contract": null, "env_mode": "inherited", "gate": ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"], "last_result": "success", "last_result_liveness": null, "last_result_state": {"freshness": "STALE", "invalidation_basis": {"declared_roots": ["test", "qa/workbench/smoke.sh", "qa/workbench/package-smoke.sh", "tsconfig.json", "tsconfig.test.json", "src"], "derived_from": "sha256:c47710910801e2d55661144061e0b3162720dc5a924b97da683cd92e47be5d6c", "kind": "invalidation-basis/v2", "root_digests": {"qa/workbench/package-smoke.sh": "16eed65ea13cd938099fada758db67c2c6477abebc1f32e7d4c2991fd9de9988", "qa/workbench/smoke.sh": "8df22da2305b2d3e23a527c05e97ba2d4475a45715456bdc783eb90d7ab82352", "src": "0a291ef62b26fc1fea855af4359d5d062ffcf7345f03cc2e8f44225e3a0fc362", "test": "c77322b92e99b6843f1be85d74cc908ee0ecf66c84ad54b058cd3198e0f11004", "tsconfig.json": "1e339c9dea031323bd9f874e6973e75140e1458fdf86957762330af454ed6037", "tsconfig.test.json": "d49fd71d6784c97e76fa73c6a8f62f30db5fab43a235c49e6d9e6dd79a62e842"}, "source_digest": "sha256:99d65ec0b55f99372c891cb7cc3ffdbed418fd2c3df19ba41c0b8548c9190369"}, "note": "reconstructed from the command log; the log is EPHEMERAL_OPERATIONAL, so this verdict is RECONSTRUCTABLE_DERIVED rather than authoritative", "source_ref": ["file:.forge/logs/commands.jsonl#cmd_9d1c4826a638", "forge.toml#build.gate.steps"], "state_class": "reconstructable-derived"}, "last_result_status": "success", "quarantine": null, "readiness": "ready", "readiness_reason": null, "ready": true, "ref": "code:pi-subagents", "runtime": "own", "step_hermeticity": null, "unbound_tiers": [], "unresolved_deps": [], "unverified_reason": "FORGE_CURRENT_STATE_UNVERIFIED"} as Record<string,unknown>)}]},
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
  it('last_result_state (measured present on this seat) round-trips untouched (wb-4ap.11)',async()=>{
    const status=vi.fn(async (_target:{target:string})=>({protocolMethod:'gate.status',raw:SOURCE_WITH_STATE}));
    const registry=new CapabilityRegistry();
    registerForgeGateStatus(registry,{gate:{status}},'0.1.0');
    const output=await registry.invoke('forge.gate.status',{target:'.'},{grants:['forge:inspect'],signal:new AbortController().signal});
    const source=(output as {source:typeof SOURCE_WITH_STATE}).source;
    expect(source.data.packages[0].last_result_state).toEqual(SOURCE_WITH_STATE.data.packages[0].last_result_state);
    expect(source).toEqual(SOURCE_WITH_STATE);
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
