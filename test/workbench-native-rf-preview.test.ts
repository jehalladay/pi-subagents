/** Native RF preview in a disposable pre-initialized workspace. */
import {spawnSync} from 'node:child_process';
import {describe,expect,it} from 'vitest';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';
import {judgeRfReleaseDrift,parseInstalledRfVersion,recordedRfRelease} from './helpers/rf-release-drift.js';
import {diffAgainstRoster,readRfResultRoster} from './helpers/rf-render-fixture.js';

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
    // Recording lines (wb-2j3.6 + wb-693.5): written straight to the vitest process stdout, which is the receipt; no file is written.
    // process.stdout.write bypasses vitest's console interception, so the lines are visible under every reporter
    // (the agent reporter drops console.* output of passing tests; a direct write is not console output).
    // They run before the engine_metrics assertion so a non-zero value is observable in the failing run too.
    process.stdout.write(`\n${metrics===undefined?RF_ABSENT_NOTE:`engine_metrics present: ${JSON.stringify(metrics)}`}\n`);
    process.stdout.write(`\nRF_PREVIEW_RECEIPT ${JSON.stringify({cli_version:stamp(producer.provenance.cli_version),engine_metrics:metrics===undefined?RF_ABSENT_NOTE:metrics,rf_identity:rfIdentity()})}\n`);
    if(metrics!==undefined) expect(metrics).toEqual({tsx_worker_spawns:0,tsx_resource_rounds:0});
  },60_000);

  // wb-973.11 (SCG-R11 acceptance 4, second clause): the live drift diff. The default gate holds the offline full-shape fixture to
  // test/fixtures/rf-result-keys.json (source 'constructed'); this row holds a --no-commit capture from the installed rf to the same
  // roster with the same diff (diffAgainstRoster). A roster result or provenance key missing from the capture, or a work or
  // work_metrics key set that differs from the roster's exactly, fails the tier; result keys beyond the roster are recorded on the
  // RF_RESULT_KEY_DIFF line and never failed (an rf newer than the pin adds keys the provider admits). Fail-not-skip like the row above.
  it('SCG-R11 live diff: the installed rf capture carries every roster key and the exact work and work_metrics sets; extra result keys are recorded',async()=>{
    const workspace=process.env.WORKBENCH_RF_FIXTURE;
    if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');
    const roster=readRfResultRoster();
    const reading=await nativeReactiveFiberPreview('claude-opus-5','Summarize workbench integration',workspace);
    const source=record(reading)?reading.source:undefined;
    const captured=record(source)&&record(source.result)?source.result:undefined;
    if(captured===undefined) throw Error('the provider reading carries no result object');
    const provenance=record(captured.provenance)?captured.provenance:{};
    const diff=diffAgainstRoster(roster,captured);
    // Recording line (written straight to the process stdout, as RF_PREVIEW_RECEIPT above): the roster it was held to, the capture's
    // release, whether that release is the pin (a 'captured' promotion needs it), the failure count and the extra result keys.
    process.stdout.write(`\nRF_RESULT_KEY_DIFF ${JSON.stringify({roster:stamp(roster.rfVersion),source:roster.source,cli_version:stamp(provenance.cli_version),pinned:provenance.cli_version===roster.rfVersion,failures:diff.failures.length,extra_result_keys:diff.extraResultKeys.map(stamp)})}\n`);
    expect(diff.failures).toStrictEqual([]);
  },60_000);

  // wb-973.12 (SCG-R12): the live drift guard. The release recorded in the single contractSource carrier (wb-2j3.12) must equal the
  // installed `rf --version --json` result.version and this preview's result.provenance.cli_version. A mismatch, or a value that
  // cannot be read, FAILS the tier with a failure naming recorded vs installed (never skips); a missing WORKBENCH_RF_FIXTURE throws
  // like the rows above. Re-pinning the carrier is a separate act made beside a newer stamped receipt row, never by editing this row.
  it('SCG-R12 live drift guard: the installed rf version and the preview cli_version equal the release recorded in the contractSource carrier',async()=>{
    const workspace=process.env.WORKBENCH_RF_FIXTURE;
    if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');
    const run=spawnSync('rf',['--json','--version'],{encoding:'utf8',timeout:10_000});
    const installed=run.error||run.status!==0?undefined:parseInstalledRfVersion(run.stdout);
    const reading=await nativeReactiveFiberPreview('claude-opus-5','Summarize workbench integration',workspace);
    const source=record(reading)?reading.source:undefined;
    const captured=record(source)&&record(source.result)?source.result:undefined;
    const provenance=captured!==undefined&&record(captured.provenance)?captured.provenance:{};
    const verdict=judgeRfReleaseDrift({recorded:recordedRfRelease(),installed,previewCliVersion:provenance.cli_version});
    // Recording line (straight to the process stdout, as RF_PREVIEW_RECEIPT above): recorded, installed, preview, failure count.
    process.stdout.write(`\nRF_RELEASE_DRIFT ${JSON.stringify({recorded:recordedRfRelease(),installed:stamp(installed),preview:stamp(provenance.cli_version),failures:verdict.failures.length})}\n`);
    expect(verdict.failures).toStrictEqual([]);
  },60_000);
});
/** A JSON object, never an array or null. */
function record(value:unknown):value is Record<string,unknown>{return value!==null&&typeof value==='object'&&!Array.isArray(value);}
