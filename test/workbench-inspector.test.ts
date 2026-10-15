import { visibleWidth } from '@earendil-works/pi-tui';
import { describe, expect, it, vi } from 'vitest';
import { initialWorkflowDialogState, WorkflowDialog } from '../src/ui/workflow-dialog.js';
import { type InspectorModel, initialInspectorState, layoutInspector, reduceInspectorKey } from '../src/ui/workflow-inspector.js';
import { type NativeRef, ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';

const scope: ObservationScope = {workspace:'workspace',principal:'reader'};
const ref = (provider: string, id: string): NativeRef => ({provider,type:'operation',id});
const now = '2026-10-15T00:00:00Z';
const presentation = (title: string) => ({title,type:'sdk-operation' as const,statusText:'running',statusTone:'active' as const});
function fixture(): InspectorModel {
 const projection = new ObservationProjection({maxEvents:16,maxNodes:1200,maxEdges:1200,maxQuery:40});
 for(let i=0;i<90;i++) projection.refresh({source:ref(i%2?'forge':'furnace',String(i)),scope,capturedAt:now,observedAt:now,node:presentation(`Operation ${i}`),trace:{invocationId:'workflow-1'},coverage:'partial',
    ...(i<3?{interval:{startedAt:now,endedAt:'2026-10-15T00:00:02Z'}}:{})});
 projection.relate({scope,from:ref('furnace','0'),to:ref('forge','1'),kind:'dependency',provenance:{source:'furnace',observedAt:now}});
 return {projection,scope,invocationId:'workflow-1',title:'Big workflow',status:'running'};
}

describe('W15 four-view inspector',()=>{
 it('L3 keyboard journey visits every view, selects a native node, and escapes without cancellation',()=>{
   const model=fixture(); let state=initialInspectorState();
   expect(layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n')).toContain('OVERVIEW');
   for(const view of ['graph','timeline','details','overview'] as const){state=reduceInspectorKey('\t',state,model)!.state; expect(state.view).toBe(view);}
   state=reduceInspectorKey('j',state,model)!.state;
   expect(state.selected).not.toBeNull();
   state=reduceInspectorKey('e',state,model)!.state;
   expect(state.view).toBe('details');
   expect(layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n')).toContain('Native ref');
   const back=reduceInspectorKey('\x1b',state,model)!;
   expect(back.state.view).toBe('overview');
   expect(reduceInspectorKey('\x1b',back.state,model)?.action).toBe('close');
 });
 it('shows only observed relation provenance, incomplete topology, and source intervals, not invented edges/times',()=>{
   const model=fixture();
   const graph=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:120,rows:40,ascii:true}).join('\n');
   expect(graph).toMatch(/dependency/);
   expect(graph).toMatch(/furnace/);
   expect(graph).toMatch(/incomplete/i);
   const timeline=layoutInspector(model,{...initialInspectorState(),view:'timeline'},{width:80,rows:24,ascii:true}).join('\n');
   expect(timeline).toMatch(/source interval|timing unavailable/i);
   expect(timeline).not.toMatch(/critical path.*[0-9]/i);
 });
 it.each([true,false])('caps viewport, terminal width and unsafe text, ASCII=%s',ascii=>{
   const model=fixture();
   model.title='\x1b[2J secret\n漢字';
   for(const width of [32,79,80,120]) for(const view of ['overview','graph','timeline','details'] as const){
     const lines=layoutInspector(model,{...initialInspectorState(),view},{width,rows:24,ascii});
     expect(lines.length).toBeLessThanOrEqual(24);
     expect(lines.every(line=>visibleWidth(line)<=width)).toBe(true);
     expect(lines.join('\n')).not.toContain('\x1b[2J');
   }
 });
 it('window access reads only visible rows even after 100k updates and retains selected identity',()=>{
   const model=fixture(); const source=model.projection;
   const spy=vi.spyOn(source,'window');
   let state=initialInspectorState();
   layoutInspector(model,state,{width:80,rows:24});
   expect(spy.mock.calls.every(([query])=>query.limit<=32)).toBe(true);
   const before=source.window({scope,invocationId:'workflow-1',offset:0,limit:1}).revision;
   state=reduceInspectorKey('j',state,model)!.state;
   for(let i=0;i<100_000;i++) source.ingest({projectionEventId:`u-${i}`,source:ref('forge','1'),scope,sourceSequence:i+1,observedAt:now,kind:'native.status',node:{presentation:presentation('Changed')}});
   expect(source.window({scope,invocationId:'workflow-1',offset:0,limit:1}).revision).toBeGreaterThan(before);
   const result=layoutInspector(model,state,{width:80,rows:24});
   expect(result.length).toBeLessThanOrEqual(24);
   expect(spy.mock.calls.every(([query])=>query.limit<=32)).toBe(true);
 });
 it('component starts rich when observation supplied, retains legacy fallback, closes with zero controls',()=>{
   const model=fixture(); const done=vi.fn();const onKill=vi.fn();
   const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[],task:{status:'running',workflowName:'Big workflow',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,done,{onKill});
   expect(dialog.render(80).join('\n')).toContain('OVERVIEW');
   dialog.handleInput('\t');
   expect(dialog.render(80).join('\n')).toContain('GRAPH');
   dialog.handleInput('\x03'); expect(done).toHaveBeenCalledTimes(1);
   expect(onKill).not.toHaveBeenCalled(); dialog.dispose();
   expect(initialWorkflowDialogState().level).toBe('phases');
 });
});
describe('W15 navigation edge cases',()=>{
 it('Enter on the initially highlighted row collapses its observed relations; resize retains selected key',()=>{
   const model=fixture();const state=initialInspectorState();
   const first=model.projection.window({scope,invocationId:'workflow-1',offset:0,limit:1}).nodes[0];
   const collapsed=reduceInspectorKey('\r',state,model)!.state;
   expect(collapsed.collapsed).toContain(first.key);
   expect(layoutInspector(model,{...collapsed,view:'graph'},{width:80,rows:24}).join('\n')).toContain('relations collapsed');
 });
 it('keeps focus on selected identity after earlier node evicts and escapes focus before closing',()=>{
   const model=fixture();let state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
   const key=state.selected;
   state=reduceInspectorKey('f',state,model)!.state;
   expect(state.focused).toBe(key);
   expect(reduceInspectorKey('\x1b',state,model)?.state.focused).toBeNull();
 });
});
describe('W15 relation and interval fidelity',()=>{
 it('graph distinguishes direction and native relation kind; no extra edges invented',()=>{
   const model=fixture();
   const graph=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:120,rows:40,ascii:true}).join('\n');
   expect(graph).toContain('dependency -> forge/operation/1');
   expect(graph).not.toContain('ownership ->');
 });
 it('timeline pan shifts a source interval bar, not its measured duration or provenance',()=>{
   const model=fixture();
   const fresh={...initialInspectorState(),view:'timeline' as const};
   const zero=layoutInspector(model,fresh,{width:120,rows:40,ascii:true}).join('\n');
   const panned=layoutInspector(model,{...fresh,pan:3},{width:120,rows:40,ascii:true}).join('\n');
   expect(zero).toContain('2000ms source interval');
   expect(panned).toContain('2000ms source interval');
   expect(panned).not.toBe(zero);
 });
 it('shows completion and attention from bounded observed rows without claiming a critical path',()=>{
   const model=fixture();
   const lines=layoutInspector(model,initialInspectorState(),{width:80,rows:24,ascii:true}).join('\n');
   expect(lines).toMatch(/Attention.*unknown/i);
   expect(lines).toContain('Critical path: incomplete trace');
 });
});
describe('W15 legacy preservation',()=>{
 it('keeps legacy two-pane controls available while exposing rich view through g',()=>{
   const model=fixture(),done=vi.fn(),onKill=vi.fn();
   const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[{type:'workflow_agent',index:0,label:'legacy',state:'start'}],task:{status:'running',workflowName:'Legacy',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,done,{onKill});
   expect(dialog.render(80).join('\n')).toContain('Phases');
   dialog.handleInput('x');expect(onKill).toHaveBeenCalledTimes(1);
   dialog.handleInput('g');expect(dialog.render(80).join('\n')).toContain('OVERVIEW');
   dialog.handleInput('g');expect(dialog.render(80).join('\n')).toContain('Phases');
   dialog.handleInput('\x03');expect(done).toHaveBeenCalledTimes(1);
   dialog.dispose();
 });
});
describe('W15 viewport and discovery',()=>{
 it('offers an inspector Tab hint and navigation on a mixed legacy/native workflow',()=>{
   const model=fixture();const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[{type:'workflow_agent',index:0,label:'legacy',state:'start'}],task:{status:'running',workflowName:'Legacy',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,vi.fn());
   expect(dialog.render(80).join('\n')).toContain('Tab inspector');
   dialog.handleInput('\t');expect(dialog.render(80).join('\n')).toContain('OVERVIEW');
   dialog.dispose();
 });
 it('always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18',()=>{
   const model=fixture();
   for(const width of [32,80]) for(const rows of [18,24]){
      const lines=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width,rows,ascii:true});
      expect(lines.length).toBeLessThanOrEqual(rows);
      expect(lines.at(-1)).toMatch(/Esc|esc/);
   }
 });
});
describe('W15 bounded redraw',()=>{
 it('does not ask TUI for a redraw on every one-second tick of a settled observed run',()=>{
   vi.useFakeTimers();
   const model=fixture(), requestRender=vi.fn();
   const dialog=new WorkflowDialog({requestRender,terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[],task:{status:'completed',workflowName:'Done',startTime:1},observation:{...model,status:'completed'}}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,vi.fn());
   vi.advanceTimersByTime(10_000);
   expect(requestRender).not.toHaveBeenCalled();
   dialog.dispose();vi.useRealTimers();
 });
 it('limits live ordinary redraw to four per second while native observations burst',()=>{
   vi.useFakeTimers();
   const model=fixture(), requestRender=vi.fn();
   const dialog=new WorkflowDialog({requestRender,terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[],task:{status:'running',workflowName:'Live',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,vi.fn());
   vi.advanceTimersByTime(1000);
   expect(requestRender.mock.calls.length).toBeLessThanOrEqual(4);
   dialog.dispose();vi.useRealTimers();
 });
});
describe('W15 graph footer under fan-out',()=>{
 it('keeps Escape visible when every viewport node has multiple observed relationships',()=>{
   const model=fixture();
   for(let i=1;i<15;i++)model.projection.relate({scope,from:ref('furnace','0'),to:ref(i%2?'forge':'furnace',String(i)),kind:'causation',provenance:{source:'furnace',observedAt:now}});
   const state={...initialInspectorState(),view:'graph' as const};
   expect(layoutInspector(model,state,{width:80,rows:24,ascii:true}).at(-1)).toContain('Esc');
 });
});
describe('W15 focus and viewport truth',()=>{
 it('moving down from selected producer key follows it after a preceding node is evicted',()=>{
   const projection=new ObservationProjection({maxEvents:8,maxNodes:3,maxQuery:3});
   for(const id of ['first','second','third'])projection.refresh({source:ref('forge',id),scope,capturedAt:now,observedAt:now,node:presentation(id),trace:{invocationId:'evict'}});
   const model={projection,scope,invocationId:'evict',title:'evict',status:'running'};
   let state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
   expect(state.index).toBe(1);
   projection.refresh({source:ref('forge','fourth'),scope,capturedAt:now,observedAt:now,node:presentation('fourth'),trace:{invocationId:'evict'}});
   state=reduceInspectorKey('j',state,model)!.state;
   expect(state.index).toBe(1);
   expect(layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n')).toContain('third');
 });
});
describe('W15 visible row budget',()=>{
 it('does not spend all 24 rows on nodes and hide attention/critical path notice',()=>{
    const model=fixture();
    const lines=layoutInspector(model,initialInspectorState(),{width:80,rows:24,ascii:true}).join('\n');
    expect(lines).toContain('Attention:');
    expect(lines).toContain('Critical path: incomplete trace');
 });
});
describe('W15 evidence window',()=>{
 it('reserves an evidence overflow notice at 80x24 without leaking out of viewport',()=>{
   const model=fixture();
   const source=ref('furnace','0');
   model.projection.refresh({source,scope,capturedAt:'2026-10-15T00:00:01Z',observedAt:now,node:presentation('Operation 0'),trace:{invocationId:'workflow-1'},evidenceRefs:Array.from({length:32},(_,i)=>`evidence://${i}`)});
   const lines=layoutInspector(model,{...initialInspectorState(),view:'details'},{width:80,rows:24,ascii:true}).join('\n');
   expect(lines).toContain('Further references available at producer');
   expect(lines).toContain('Esc back/close');
 });
});
describe('W15 observation-only commands',()=>{
 it('no producer mutation keys exist in rich four-view navigator',()=>{
   const model=fixture();let state=initialInspectorState();
   for(const key of ['x','p','r','s']){
      const result=reduceInspectorKey(key,state,model);
      expect(result?.action).toBeUndefined();
      if(result)state=result.state;
   }
   expect(state.view).toBe('details');
 });
 it('Claude session transcript key resolves only confirmed native session reference',()=>{
   const model=fixture();
   expect(reduceInspectorKey('c',initialInspectorState(),model)).toBeUndefined();
   model.projection.refresh({source:{provider:'claude-agent-sdk',type:'session',id:'real-session'},scope,capturedAt:now,observedAt:now,node:{title:'Claude',type:'agent',statusText:'done',statusTone:'success'},trace:{invocationId:'workflow-1'}});
   const state={...initialInspectorState(),index:90};
   expect(reduceInspectorKey('c',state,model)?.action).toBe('transcript');
 });
});
describe('W15 incremental component history',()=>{
 it('does not allocate a full latest-node array on every rich redraw or key',()=>{
  const model=fixture();const history=Array.from({length:1000},(_,i)=>({type:'workflow_node' as const,index:i,callId:i,capabilityId:'forge.status',label:String(i),state:'done' as const}));
  const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
   ()=>({progress:history,task:{status:'running',workflowName:'Nodes',startTime:1},observation:model}),
   {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,vi.fn());
  dialog.render(80);
  const original=Map.prototype.values;let enumerations=0;
  const stub=vi.spyOn(Map.prototype,'values').mockImplementation(function(this:Map<number,unknown>){enumerations++;return original.call(this);});
  try {for(let i=0;i<10;i++){dialog.render(80);dialog.handleInput('j');}expect(enumerations).toBe(0);}
  finally {stub.mockRestore();dialog.dispose();}
 });
});
describe('W15 grouped scroll',()=>{
 it('moves through a thousand nodes without rendering the entire roster',()=>{
  const projection=new ObservationProjection({maxNodes:1100,maxEvents:20,maxQuery:20});
  for(let i=0;i<1000;i++)projection.refresh({source:ref('forge',String(i)),scope,capturedAt:now,observedAt:now,node:presentation(`Node ${i}`),trace:{invocationId:'many'}});
  const model={projection,scope,invocationId:'many',title:'Large',status:'running'};
  let state=initialInspectorState();for(let i=0;i<996;i++)state=reduceInspectorKey('j',state,model)!.state;
  const lines=layoutInspector(model,state,{width:80,rows:24,ascii:true});
  expect(lines.join('\n')).toContain('Node 996');
  expect(lines.join('\n')).toMatch(/Rows \d+-\d+\/1000/);
  expect(lines.length).toBeLessThanOrEqual(24);
 });
});
describe('W15 graph direction',()=>{
 it('distinguishes a producer dependency from a reverse reader edge',()=>{
  const model=fixture();
  const state={...initialInspectorState(),view:'graph' as const,index:1};
  const text=layoutInspector(model,state,{width:120,rows:40,ascii:true}).join('\n');
  expect(text).toMatch(/dependency <- furnace\/operation\/0/);
 });
});
describe('W15 no forged source semantics',()=>{
 it('a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner',()=>{
  const model=fixture();model.projection.disconnect('furnace');
  const overview=layoutInspector(model,initialInspectorState(),{width:80,rows:24,ascii:true}).join('\n');
  expect(overview).toMatch(/\? Operation 0.*STALE/);
  expect(overview).not.toMatch(/\* Operation 0/);
 });
 it('status success and missing evidence does not become Verified',()=>{
  const model=fixture();const output=layoutInspector(model,initialInspectorState(),{width:80,rows:24,ascii:true}).join('\n');
  expect(output).not.toContain('Verified');
 });
});
describe('W15 graph preview without unbounded fan-out',()=>{
 it('does not relayout untouched node neighborhood after a status-only event',()=>{
   const model=fixture();let relationsRead=0;
   const original=model.projection.relations.bind(model.projection);
   const spy=vi.spyOn(model.projection,'relations').mockImplementation(input=>{relationsRead++;return original(input)});
   const state={...initialInspectorState(),view:'graph' as const};
   layoutInspector(model,state,{width:80,rows:24});
   const first=relationsRead;
   layoutInspector(model,state,{width:80,rows:24});
   expect(relationsRead).toBe(first);
   spy.mockRestore();
 });
});
describe('W15 graph cache invalidation',()=>{
 it('adds a new observed edge on topology revision and reflects its provenance',()=>{
   const model=fixture();const state={...initialInspectorState(),view:'graph' as const};
   const before=layoutInspector(model,state,{width:120,rows:40,ascii:true}).join('\n');
   model.projection.relate({scope,from:ref('furnace','0'),to:ref('furnace','2'),kind:'grouping',provenance:{source:'furnace',observedAt:now}});
   const after=layoutInspector(model,state,{width:120,rows:40,ascii:true}).join('\n');
   expect(after).not.toBe(before);
   expect(after).toContain('grouping -> furnace/operation/2');
 });
});
