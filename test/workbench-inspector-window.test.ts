import { describe, expect, it } from 'vitest';
import { ObservationProjection } from '../src/workbench/observation.js';

const scope={workspace:'a',principal:'b'};
const stamp='2026-10-15T00:00:00Z';
const node={title:'One',type:'sdk-operation' as const,statusText:'ACTIVE',statusTone:'active' as const};
describe('W15 bounded observation window',()=>{
 it('paginates invocation-scoped nodes with total, monotonic revision, source-qualified identities and independent scope',()=>{
  const p=new ObservationProjection({maxNodes:1200,maxQuery:8});
  for(let i=0;i<1000;i++) p.refresh({source:{provider:i%2?'forge':'furnace',type:'operation',id:String(i)},scope,capturedAt:stamp,observedAt:stamp,node:{...node,title:String(i)},trace:{invocationId:'workflow'}});
  const first=p.window({scope,invocationId:'workflow',offset:0,limit:30});
  const last=p.window({scope,invocationId:'workflow',offset:980,limit:30});
  expect(first.total).toBe(1000);expect(first.nodes).toHaveLength(30);
  expect(last.nodes).toHaveLength(20);expect(last.revision).toBe(first.revision);
  expect(p.window({scope:{workspace:'a',principal:'other'},invocationId:'workflow',offset:0,limit:5}).total).toBe(0);
  p.refresh({source:{provider:'furnace',type:'operation',id:'0'},scope,capturedAt:'2026-10-15T00:00:01Z',observedAt:stamp,node:{...node,title:'Updated'},trace:{invocationId:'workflow'}});
  expect(p.window({scope,invocationId:'workflow',offset:0,limit:30}).revision).toBeGreaterThan(first.revision);
 });
 it('rejects oversized snapshot cursor before retaining or querying it',()=>{
  const p=new ObservationProjection({maxPayloadBytes:64});
  expect(()=>p.refresh({source:{provider:'forge',type:'op',id:'1'},scope,capturedAt:stamp,observedAt:stamp,cursor:'x'.repeat(1024*1024),node})).toThrow(/cursor|limit/i);
  expect(p.stats().nodes).toBe(0);
 });
});
describe('W15 viewport selection retention',()=>{
 it('preserves the selected producer key after eviction moves its row and denies a key in another scope',()=>{
  const p=new ObservationProjection({maxNodes:3,maxQuery:2});
  const make=(id:string)=>({source:{provider:'forge',type:'operation',id},scope,capturedAt:stamp,observedAt:stamp,node,trace:{invocationId:'run'}});
  p.refresh(make('first'));p.refresh(make('selected'));p.refresh(make('third'));
  const key=p.window({scope,invocationId:'run',offset:1,limit:1}).nodes[0].key;
  expect(p.indexOf({scope,invocationId:'run',key})).toBe(1);
  p.refresh(make('fourth'));
  expect(p.indexOf({scope,invocationId:'run',key})).toBe(0);
  expect(p.indexOf({scope:{workspace:'a',principal:'other'},invocationId:'run',key})).toBeUndefined();
 });
});
describe('W15 snapshot metadata budget',()=>{
 it('does not accept long native scope cursor even when all other fields are bounded',()=>{
   const p=new ObservationProjection({maxNodes:8,maxPayloadBytes:64});
   expect(()=>p.refresh({source:{provider:'forge',type:'operation',id:'id'},scope,capturedAt:stamp,observedAt:stamp,cursor:'x'.repeat(257),node})).toThrow();
   expect(p.window({scope,invocationId:'missing',offset:0,limit:1}).total).toBe(0);
 });
});
describe('W15 viewport observability',()=>{
 it('keeps updates stable but increments topology revision only for proven relation mutation',()=>{
   const p=new ObservationProjection();
   p.refresh({source:{provider:'forge',type:'operation',id:'a'},scope,capturedAt:stamp,observedAt:stamp,node,trace:{invocationId:'run'}});
   p.refresh({source:{provider:'forge',type:'operation',id:'b'},scope,capturedAt:stamp,observedAt:stamp,node,trace:{invocationId:'run'}});
   const version=p.relationRevision(),row=p.window({scope,invocationId:'run',offset:0,limit:1});
   p.ingest({projectionEventId:'u1',source:{provider:'forge',type:'operation',id:'a'},scope,sourceSequence:1,observedAt:stamp,kind:'status'});
   expect(p.window({scope,invocationId:'run',offset:0,limit:1}).revision).toBeGreaterThan(row.revision);
   expect(p.relationRevision()).toBe(version);
   p.relate({scope,from:{provider:'forge',type:'operation',id:'a'},to:{provider:'forge',type:'operation',id:'b'},kind:'causation',provenance:{source:'forge'}});
   expect(p.relationRevision()).toBeGreaterThan(version);
 });
});
