/** Native RF preview in a disposable pre-initialized workspace. */
import {describe,expect,it} from 'vitest';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';

describe('RF native context producer',()=>{
  it('returns noncommitted text and graph provenance with no durable render ID',async()=>{
    const workspace=process.env.WORKBENCH_RF_FIXTURE;
    if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');
    const result=await nativeReactiveFiberPreview('claude-opus-5','Summarize workbench integration',workspace);
    expect(result).toMatchObject({contract:'reactivefiber.render.preview/v1',source:{schema:'reactive-fiber.cli/v1',ok:true,result:{ephemeral:true,render_id:null,output:{text:expect.any(String)},provenance:{graph_revision_id:expect.stringMatching(/^sha256:/)}}}});
  },60_000);
});
