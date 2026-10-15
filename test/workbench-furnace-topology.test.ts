import {describe, expect, expectTypeOf, it, vi} from 'vitest';
import {type InspectorModel, initialInspectorState, layoutInspector} from '../src/ui/workflow-inspector.js';
import {CapabilityError} from '../src/workbench/capability-registry.js';
import {type FurnaceObservedRelation, FurnaceObserver, type FurnaceObserverClient, type FurnaceReading} from '../src/workbench/furnace-observer.js';
import {type NativeRef, ObservationProjection} from '../src/workbench/observation.js';

// wb-752.1 (VC-4/W13): the Furnace observer is the first real producer of native-confirmed Run->Attempt edges.
const run = {run_id:'frn-run-r1',beads_run_id:'bd-r1',workspace:'/tmp/external-ws',state:'active',mode:'ephemeral_wisp',furnace_version:'0.1.0',binary_revision:'rev-abc',created_at:'2026-10-15T00:00:00Z',updated_at:'2026-10-15T00:00:01Z',state_since:'2026-10-15T00:00:01Z',executor:'runner',max_parallel:2,active:[],failed:[],failed_total:0,attention:[],unreadable:[],corrupt_events:[],corrupt_events_total:0,conflicts:[],completed:1,total:3} as const;
const finished = {attempt_id:'frn-atm-a1',run_id:run.run_id,work_id:'bd-work-a',title:'Bearer TOPSECRET',ordinal:1,executor:'runner',state:'succeeded',outcome:'success',created_at:'2026-10-15T00:00:01Z',started_at:'2026-10-15T00:00:01Z',finished_at:'2026-10-15T00:00:03Z',exit_code:0} as const;
const queued = {attempt_id:'frn-atm-a2',run_id:run.run_id,work_id:'bd-work-b',ordinal:1,executor:'runner',state:'pending',created_at:'2026-10-15T00:00:02Z'} as const;
const running = {attempt_id:'frn-atm-a3',run_id:run.run_id,work_id:'bd-work-c',title:'token=TOPSECRET',ordinal:1,executor:'runner',state:'running',created_at:'2026-10-15T00:00:03Z',started_at:'2026-10-15T00:00:04Z'} as const;
interface Page {complete?:boolean;next_cursor?:string|null;attempts?:readonly object[];unreadable?:readonly object[]}
function client(page:Page={}) {
  const attempts=page.attempts??[finished,queued,running];
  const status=vi.fn(async () => ({kind:'run_status',requestId:'req-status',exit:{code:0,signal:null},data:{...run}}));
  const list=vi.fn(async () => ({kind:'attempt_list',requestId:'req-attempts',exit:{code:0,signal:null},data:{run_id:run.run_id,beads_run_id:run.beads_run_id,complete:page.complete??true,limit:5,returned:attempts.length,next_cursor:page.next_cursor??null,attempts,unreadable:page.unreadable??[]}}));
  const read=vi.fn(async (_run:string,request?:{attempt?:string}) => ({kind:'logs_read',requestId:'req-logs',exit:{code:0,signal:null},data:{run_id:run.run_id,attempt_id:request?.attempt,stream:'stdout',complete:true,limit:512,returned:1,next_cursor:null,lossy:false,lines:['Bearer TOPSECRET']}}));
  const stop=vi.fn(); const pause=vi.fn(); const resume=vi.fn(); const retry=vi.fn();
  return {client:{runs:{get:vi.fn(() => ({status,stop,pause,resume}))},attempts:{list},logs:{read},work:{retry}} as unknown as FurnaceObserverClient,status,list,read,stop,pause,resume,retry};
}
const opts={workspaceRoot:'/tmp/external-ws',runId:run.run_id,scope:{workspace:'/tmp/external-ws',principal:'tester'},limits:{maxPolls:2,intervalMs:1,maxElapsedMs:5000,attemptLimit:5,logBytes:512,callTimeoutMs:2000}};
const runRef:NativeRef={provider:'furnace',type:'run',id:run.run_id,scope:opts.workspaceRoot};
const attemptRef=(id:string):NativeRef=>({provider:'furnace',type:'attempt',id,scope:opts.workspaceRoot});
function thrown(fn:()=>unknown):unknown {
  try {fn();} catch(error) {return error;}
  throw new Error('expected the projection to refuse');
}

describe('Furnace observer Run->Attempt projection topology',()=>{
  it('keeps projectionSnapshot byte-compatible for its existing Pi consumer',async()=>{
    const observer=new FurnaceObserver(client().client,opts);
    const reading=await observer.snapshot();
    const golden={source:{provider:'furnace',type:'run',id:run.run_id,scope:opts.workspaceRoot},scope:opts.scope,capturedAt:reading.capturedAt,observedAt:reading.observedAt,
      coverage:'complete',sourceRevision:'rev-abc',node:{title:`Furnace Run ${run.run_id}`,type:'workflow',statusText:'active',statusTone:'active'},
      kind:'furnace.run.snapshot',evidenceRefs:[finished.attempt_id,queued.attempt_id,running.attempt_id]};
    expect(JSON.stringify(observer.projectionSnapshot(reading))).toBe(JSON.stringify(golden));
  });
  it('A1/A2: Run snapshot first, one Attempt snapshot per returned item, one furnace-confirmed ownership edge each',async()=>{
    expectTypeOf<FurnaceObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    const observer=new FurnaceObserver(client().client,opts);
    const reading=await observer.snapshot();
    const topology=observer.projectionTopology(reading);
    expect(topology.snapshots[0]).toStrictEqual(observer.projectionSnapshot(reading));
    expect(JSON.stringify(topology.snapshots[0])).toBe(JSON.stringify(observer.projectionSnapshot(reading)));
    expect(topology.snapshots.map(snapshot=>snapshot.source)).toStrictEqual([runRef,...[finished,queued,running].map(item=>attemptRef(item.attempt_id))]);
    const [done,pending,active]=topology.snapshots.slice(1);
    for(const [snapshot,item] of [[done,finished],[pending,queued],[active,running]] as const){
      expect(snapshot).toMatchObject({scope:opts.scope,capturedAt:reading.capturedAt,observedAt:reading.observedAt,coverage:reading.completeness,sourceRevision:'rev-abc',
        kind:'furnace.attempt.snapshot',node:{type:'sdk-operation'},trace:{invocationId:run.run_id,correlationIds:{runId:run.run_id,workId:item.work_id}}});
      expect(snapshot.node.title).toContain(item.attempt_id);
    }
    expect(done.node).toMatchObject({statusText:'succeeded (success)',statusTone:'success'});
    expect(pending.node).toMatchObject({statusText:'pending',statusTone:'waiting'});
    expect(active.node).toMatchObject({statusText:'running',statusTone:'active'});
    expect(done.interval).toStrictEqual({startedAt:finished.started_at,endedAt:finished.finished_at});
    expect(pending).not.toHaveProperty('interval');
    expect(active.interval).toStrictEqual({startedAt:running.started_at});
    // No Work DTO is read, so no Work node is invented; workId is only a correlation id.
    expect(topology.snapshots.map(snapshot=>snapshot.source.type)).toStrictEqual(['run','attempt','attempt','attempt']);
    expect(topology.relations).toStrictEqual([finished,queued,running].map(item=>({scope:opts.scope,from:runRef,to:attemptRef(item.attempt_id),kind:'ownership',
      provenance:{source:'furnace',observedAt:reading.observedAt,nativeConfirmationRef:'req-attempts'}})));
    expect(topology.relations.every(relation=>relation.kind==='ownership')).toBe(true);
    expect(reading.source.requestIds.attempts).toBe('req-attempts');
  });
  it('A3: a partial Attempt page yields edges only for returned items and synthesizes nothing for the missing tail',async()=>{
    const pages:Page[]=[
      {complete:false,next_cursor:'opaque-next',attempts:[finished]},
      {attempts:[finished],unreadable:[{path:'/tmp/external-ws/.furnace/attempts/frn-atm-a9.json',class:'corrupt',detail:'Bearer TOPSECRET',attempt_id:'frn-atm-a9'}]},
    ];
    for(const page of pages){
      const observer=new FurnaceObserver(client(page).client,opts);
      const reading=await observer.snapshot();
      const topology=observer.projectionTopology(reading);
      expect(topology.snapshots[0].coverage).toBe('partial');
      expect(topology.snapshots[1].coverage).toBe('partial');
      expect(topology.snapshots.map(snapshot=>snapshot.source)).toStrictEqual([runRef,attemptRef(finished.attempt_id)]);
      expect(topology.relations.map(relation=>relation.to)).toStrictEqual([attemptRef(finished.attempt_id)]);
      expect(JSON.stringify(topology)).not.toContain('frn-atm-a9');
      expect(JSON.stringify(topology)).not.toContain('opaque-next');
    }
  });
  it('A4: a stale or disconnected reading refuses exactly like projectionSnapshot and returns no partial topology',async()=>{
    const reader=new FurnaceObserver(client().client,opts);
    const fresh=await reader.snapshot();reader.close();
    const stale=reader.last;
    expect(stale?.freshness).toBe('stale');
    const variants:FurnaceReading[]=[...(stale?[stale]:[]),{...fresh,freshness:'stale'},{...fresh,connection:'disconnected'}];
    expect(variants).toHaveLength(3);
    for(const reading of variants){
      const expected=thrown(()=>reader.projectionSnapshot(reading));
      const actual=thrown(()=>reader.projectionTopology(reading));
      expect(actual).toBeInstanceOf(CapabilityError);
      expect(expected).toBeInstanceOf(CapabilityError);
      expect(actual).toMatchObject({category:'unavailable',message:(expected as CapabilityError).message});
    }
  });
  it('emits ownership only on the producer page confirmation: a foreign Attempt or a missing page request ID refuses',async()=>{
    const observer=new FurnaceObserver(client().client,opts);
    const reading=await observer.snapshot();
    const foreign:FurnaceReading={...reading,attempts:{...reading.attempts,items:[...reading.attempts.items,{...reading.attempts.items[0],id:'frn-atm-x',runId:'frn-run-other'}]}};
    const unconfirmed:FurnaceReading={...reading,source:{...reading.source,requestIds:{...reading.source.requestIds,attempts:''}}};
    for(const bad of [foreign,unconfirmed]) expect(thrown(()=>observer.projectionTopology(bad))).toMatchObject({category:'unavailable'});
  });
  it('withholds an Attempt interval the native clock cannot support instead of claiming timing',async()=>{
    const anomalies=[
      {...finished,attempt_id:'frn-atm-skew',started_at:'2026-10-15T00:00:05Z',finished_at:'2026-10-15T00:00:03Z'},
      {...finished,attempt_id:'frn-atm-unzoned',started_at:'2026-10-15T00:00:01',finished_at:'2026-10-15T00:00:03Z'},
      {...finished,attempt_id:'frn-atm-garbled',finished_at:'not-a-time'},
      {...running,attempt_id:'frn-atm-unzoned-open',started_at:'2026-10-15T00:00:04'},
    ];
    const observer=new FurnaceObserver(client({attempts:anomalies}).client,opts);
    const topology=observer.projectionTopology(await observer.snapshot());
    expect(topology.snapshots.slice(1).map(snapshot=>snapshot.source.id)).toStrictEqual(anomalies.map(item=>item.attempt_id));
    for(const snapshot of topology.snapshots.slice(1)) expect(snapshot).not.toHaveProperty('interval');
    const projection=new ObservationProjection();
    for(const snapshot of topology.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for(const relation of topology.relations) projection.relate(relation);
    const children=projection.query({scope:opts.scope,parent:runRef,limit:10}).nodes;
    expect(children).toHaveLength(anomalies.length);
    expect(children.every(node=>node.interval===undefined)).toBe(true);
    const controls=[
      {...finished,attempt_id:'frn-atm-instant',started_at:'2026-10-15T00:00:03Z',finished_at:'2026-10-15T00:00:03Z'},
      {...finished,attempt_id:'frn-atm-offset',started_at:'2026-10-15T02:00:01+02:00',finished_at:'2026-10-15T00:00:03Z'},
    ];
    const kept=new FurnaceObserver(client({attempts:controls}).client,opts);
    const intervals=kept.projectionTopology(await kept.snapshot()).snapshots.slice(1).map(snapshot=>snapshot.interval);
    expect(intervals).toStrictEqual(controls.map(item=>({startedAt:item.started_at,endedAt:item.finished_at})));
  });
  it('classifies every native Attempt state without guessing an outcome, and an unknown state stays unknown',async()=>{
    const tones={pending:'waiting',preparing:'active',starting:'active',running:'active',completing:'active',succeeded:'success',failed:'failure',
      timed_out:'failure',cancelled:'failure',abandoned:'failure',needs_reconciliation:'unknown',quantum_superposition:'unknown',constructor:'unknown'} as const;
    const items=Object.keys(tones).map((state,index)=>({...queued,attempt_id:`frn-atm-s${index}`,state}));
    const observer=new FurnaceObserver(client({attempts:items}).client,{...opts,limits:{...opts.limits,attemptLimit:items.length}});
    const topology=observer.projectionTopology(await observer.snapshot());
    expect(topology.snapshots.slice(1).map(snapshot=>[snapshot.node.statusText,snapshot.node.statusTone])).toStrictEqual(Object.entries(tones));
    const projection=new ObservationProjection();
    for(const snapshot of topology.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
  });
  it('A5: the real read model returns exactly the Attempts under the Run, graph shows furnace ownership, timeline only source intervals',async()=>{
    const observer=new FurnaceObserver(client().client,opts);
    const topology=observer.projectionTopology(await observer.snapshot());
    const projection=new ObservationProjection();
    for(const snapshot of topology.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for(const relation of topology.relations) projection.relate(relation);
    const children=projection.query({scope:opts.scope,parent:runRef,limit:10});
    expect(children.truncated).toBe(false);
    expect(children.nodes.map(node=>node.nativeRef)).toStrictEqual([finished,queued,running].map(item=>attemptRef(item.attempt_id)));
    expect(projection.query({scope:opts.scope,parent:attemptRef(finished.attempt_id),limit:10}).nodes).toHaveLength(0);
    const model:InspectorModel={projection,scope:opts.scope,invocationId:run.run_id,title:`Furnace Run ${run.run_id}`,status:'active'};
    const graph=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:120,rows:40,ascii:true}).join('\n');
    expect(graph).toContain('ownership');
    expect(graph).toContain('[furnace]');
    expect(graph).toContain(`ownership <- furnace/run/${run.run_id} [furnace]`);
    expect(graph).not.toMatch(/dependency|causation|hypothesis/);
    const timeline=layoutInspector(model,{...initialInspectorState(),view:'timeline'},{width:120,rows:40,ascii:true});
    const row=(id:string):string|undefined=>timeline.find(text=>text.includes(id));
    expect(row(finished.attempt_id)).toContain('2000ms source interval');
    expect(row(queued.attempt_id)).toContain('timing unavailable');
    expect(row(running.attempt_id)).toContain('timing unavailable');
  });
  it('A6: closing after projecting invokes zero Furnace control verbs and carries no raw log line or secret',async()=>{
    const c=client();const observer=new FurnaceObserver(c.client,opts);
    const topology=observer.projectionTopology(await observer.snapshot());
    observer.close();
    expect([c.stop,c.pause,c.resume,c.retry].every(fn=>fn.mock.calls.length===0)).toBe(true);
    const text=JSON.stringify(topology);
    expect(text).not.toContain('TOPSECRET');
    expect(text).not.toContain('Bearer');
  });
});
