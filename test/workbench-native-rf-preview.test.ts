/** Native RF preview in a disposable pre-initialized workspace. */
import {spawnSync} from 'node:child_process';
import {describe,expect,it} from 'vitest';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';

const RF_ABSENT_NOTE='engine_metrics absent: pre-TSX rf';
const STAMP=/^[0-9A-Za-z.+_-]{1,64}$/;
/** Recording only: a version-like token is echoed verbatim, anything else is named, never echoed. */
function stamp(value:unknown):string{return typeof value==='string'&&STAMP.test(value)?value:'<unrecognized>';}
/** Recording only (never asserts): rf --json --version {version, sdk_versions}, or a fixed not-captured note. */
function rfIdentity():{version:string;sdk_versions:Record<string,string>}|string{
  const run=spawnSync('rf',['--json','--version'],{encoding:'utf8',timeout:10_000});
  if(run.error||run.status!==0) return 'rf identity not captured: rf --json --version did not exit 0';
  let parsed:unknown;
  try{parsed=JSON.parse(run.stdout);}catch{return 'rf identity not captured: rf --json --version was not JSON';}
  const root=parsed!==null&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed as Record<string,unknown>:{};
  const body=root.result!==null&&typeof root.result==='object'&&!Array.isArray(root.result)?root.result as Record<string,unknown>:root;
  const sdk=body.sdk_versions!==null&&typeof body.sdk_versions==='object'&&!Array.isArray(body.sdk_versions)?body.sdk_versions as Record<string,unknown>:{};
  return {version:stamp(body.version),sdk_versions:Object.fromEntries(Object.entries(sdk).slice(0,16).map(([name,value])=>[stamp(name),stamp(value)]))};
}

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
    // Absence is EMITTED into the run output below (RF_ABSENT_NOTE); a source comment is not a record.
    const metrics=producer.engine_metrics;
    // Recording lines (wb-2j3.6 + wb-693.5): stdout of the forge rf-preview command is the receipt; no file is written.
    // They run before the engine_metrics assertion so a non-zero value is observable in the failing run too.
    console.log(metrics===undefined?RF_ABSENT_NOTE:`engine_metrics present: ${JSON.stringify(metrics)}`);
    console.log('RF_PREVIEW_RECEIPT',JSON.stringify({cli_version:stamp(producer.provenance.cli_version),engine_metrics:metrics===undefined?RF_ABSENT_NOTE:metrics,rf_identity:rfIdentity()}));
    if(metrics!==undefined) expect(metrics).toEqual({tsx_worker_spawns:0,tsx_resource_rounds:0});
  },60_000);
});
