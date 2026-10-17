/** Native RF preview in a disposable pre-initialized workspace. */
import {describe,expect,it} from 'vitest';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';

describe('RF native context producer',()=>{
  it('returns noncommitted text and graph provenance with no durable render ID',async()=>{
    const workspace=process.env.WORKBENCH_RF_FIXTURE;
    if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');
    const result=await nativeReactiveFiberPreview('claude-opus-5','Summarize workbench integration',workspace);
    expect(result).toMatchObject({contract:'reactivefiber.render.preview/v1',source:{schema:'reactive-fiber.cli/v1',ok:true,result:{ephemeral:true,render_id:null,output:{text:expect.any(String)},provenance:{graph_revision_id:expect.stringMatching(/^sha256:/)}}}});
    const producer=(result as {source:{result:{provenance:{cli_version?:unknown};engine_metrics?:unknown}}}).source.result;
    // wb-2j3.6: the producer release stamp must be a non-empty string.
    expect(typeof producer.provenance.cli_version).toBe('string');
    expect(producer.provenance.cli_version).not.toBe('');
    // wb-693.5: python-only fixture => zero TSX overhead when rf reports engine_metrics.
    // engine_metrics absent: pre-TSX rf (absence is the recorded, accepted outcome).
    const metrics=producer.engine_metrics;
    if(metrics!==undefined) expect(metrics).toEqual({tsx_worker_spawns:0,tsx_resource_rounds:0});
  },60_000);
});
