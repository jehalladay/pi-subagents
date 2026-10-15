/** L2 native Forge SDK: live installed app server, not a provider fixture. */
import { describe, expect, it } from 'vitest';
import { readForgeGateStatus } from '../src/workbench/providers/forge.js';

describe('real Forge SDK client in this workspace',()=>{
  it('obtains native source/readiness envelope, without turning historical result into PASS',async()=>{
    const workspace=new URL('../../../',import.meta.url).pathname;
    const result=await readForgeGateStatus(workspace);
    expect(result).toMatchObject({contract:'forge.gate.status/v1',protocolMethod:'gate.status'});
    const source=(result as {source:{status:string;data:{packages?:Array<{ref:string;authoritative_current?:boolean}>}}}).source;
    expect(['success','partial','error']).toContain(source.status);
    if (source.status==='success') {
      expect(source.data.packages?.some(pkg=>pkg.ref==='code:pi-subagents')).toBe(true);
      for (const pkg of source.data.packages ?? []) expect(pkg.authoritative_current).not.toBe(true);
    }
  },120_000);
});
