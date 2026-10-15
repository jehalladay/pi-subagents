/** Host-scoped native Forge read: wrong roots or malformed envelopes cannot look verified. */
import { describe, expect, it } from 'vitest';
import { CapabilityRegistry } from '../src/workbench/capability-registry.js';
import { readForgeGateStatus, registerNativeForgeGateStatus } from '../src/workbench/providers/forge.js';

describe('Forge provider host scope',()=>{
  it('rejects a target outside the authorized workspace before an SDK request',async()=>{
    const registry=new CapabilityRegistry();
    registerNativeForgeGateStatus(registry, process.cwd());
    await expect(registry.invoke('forge.gate.status',{target:'/other/workspace'},
      {grants:['forge:inspect'],signal:new AbortController().signal})).rejects.toThrow(/scope|workspace|denied/i);
  });
  it('closes an owned Forge SDK connection when the caller aborts a pending read',async()=>{
    const controller=new AbortController();
    controller.abort();
    await expect(readForgeGateStatus(process.cwd(),controller.signal)).rejects.toThrow(/cancel|abort/i);
  });
});
