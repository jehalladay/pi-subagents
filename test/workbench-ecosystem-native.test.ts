/** L3 fixture contracts for native HX, Furnace and RF read-only adapters. */

import {HyperUnix} from '@hyperunix/sdk';
import {describe,expect,it,vi} from 'vitest';
import {CapabilityRegistry} from '../src/workbench/capability-registry.js';
import {hxLiveInvariant} from '../src/workbench/hyperunix-observer.js';
import {registerFurnaceRunInspect} from '../src/workbench/providers/furnace.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {registerReactiveFiberRender} from '../src/workbench/providers/reactivefiber.js';
import {hxLiveReceipt} from './helpers/hx-live-receipt.js';

const ctx={grants:['hyperunix:read','furnace:inspect','reactivefiber:render'],signal:new AbortController().signal};

describe('in-house native provider contracts',()=>{
  it('HX partial coverage remains incomplete and does not license absence',async()=>{
    const registry=new CapabilityRegistry();
    const reader=await HyperUnix.open({workspace:process.cwd(),binary:process.env.HYPERUNIX_HX ?? '/home/jehallad/.local/bin/hx'});
    registerHyperUnixFind(registry,reader,process.cwd());
    const result=await registry.invoke('hyperunix.find',{kind:'hx.fs/regular-file',root:'src'},{...ctx});
    await reader.close();
    expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{representation:'hyperunix.result/1'},runtime:{binarySha256:expect.stringMatching(/^[0-9a-f]{64}$/)}});
    expect(hxLiveInvariant(result)).toMatchObject({holds:true,violations:[]});
    expect(JSON.stringify(result)).not.toContain('"verified":true');
    process.stdout.write(`${hxLiveReceipt(result)}\n`);
  });
  it('Furnace inspect preserves a missing Run as a typed unavailable refusal',async()=>{
    const registry=new CapabilityRegistry();
    registerFurnaceRunInspect(registry,{runs:{get:vi.fn(()=>({inspect:async()=>{throw Object.assign(new Error('Run not found'),{code:'run_not_found'})}}))}},'/tmp/ws');
    await expect(registry.invoke('furnace.run.inspect',{runId:'frn-run-missing'},ctx)).rejects.toThrow(/run_not_found|not found/i);
  });
  it('RF noncommitted render preserves provenance and null durable render ID',async()=>{
    const registry=new CapabilityRegistry();
    registerReactiveFiberRender(registry,(async()=>({schema:'reactive-fiber.cli/v1',ok:true,command:'context.render',operation_id:'rfo-1',transaction_id:null,result:{ephemeral:true,render_id:null,output:{text:'hello'},provenance:{graph_revision_id:'sha256:abc'}},diagnostics:[]})) as unknown as Parameters<typeof registerReactiveFiberRender>[1],'/tmp/ws');
    const output=await registry.invoke('reactivefiber.render.preview',{model:'claude-opus-5',task:'probe'},ctx);
    expect(output).toMatchObject({contract:'reactivefiber.render.preview/v1',source:{result:{ephemeral:true,render_id:null,provenance:{graph_revision_id:'sha256:abc'}}}});
  });
});
