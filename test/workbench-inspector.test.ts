import { readFileSync } from 'node:fs';
import { visibleWidth } from '@earendil-works/pi-tui';
import { describe, expect, it, vi } from 'vitest';
import { initialWorkflowDialogState, WorkflowDialog } from '../src/ui/workflow-dialog.js';
import { type InspectorModel, initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey } from '../src/ui/workflow-inspector.js';
import { ATTENTION_CLOCK_CAVEAT, ATTENTION_CONTRACT, ATTENTION_CRITICAL_PATH_CAVEAT, type AttentionBottleneck, type AttentionReport } from '../src/workbench/attention.js';
import { type EvidenceContent, type EvidenceLoader, EvidenceRefusal, EvidenceStore } from '../src/workbench/evidence-loader.js';
import { CLAUDE_TRANSCRIPT_GRANT, type ClaudeEvidenceSeam, createEvidenceLoaders } from '../src/workbench/evidence-producers.js';
import { buildGraphView, GRAPH_VIEW_CONTRACT } from '../src/workbench/graph-view.js';
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

// wb-6ze.1 (W15/VC-5): overview nested tree from observed grouping/ownership edges and bounded graph fan-out.
const nested = (provider: string, type: string, id: string): NativeRef => ({provider,type,id});
const nestingProvenance = {source:'fixture-producer',observedAt:now};
const phaseRef=nested('furnace','operation','phase'), step1Ref=nested('forge','operation','step-1'), opRef=nested('furnace','operation','op'),
 leafRef=nested('forge','operation','leaf'), runRef=nested('furnace','run','run-1'), attemptRef=nested('furnace','attempt','attempt-1'),
 looseRef=nested('forge','operation','loose'), step2Ref=nested('forge','operation','step-2');
/** Grouping three levels deep, one natively confirmed ownership edge, one dependency edge, refreshed out of tree order. */
function groupedFixture(): InspectorModel {
 const projection = new ObservationProjection({maxEvents:16,maxNodes:1200,maxEdges:1200,maxQuery:40});
 const rows: readonly [NativeRef,string][] = [[phaseRef,'Phase A'],[step1Ref,'Step A1'],[opRef,'Op A1a'],[leafRef,'Leaf A1a-i'],
  [runRef,'Run 1'],[attemptRef,'Attempt 1'],[looseRef,'Loose op'],[step2Ref,'Step A2']];
 for(const [source,title] of rows) projection.refresh({source,scope,capturedAt:now,observedAt:now,node:presentation(title),trace:{invocationId:'grouped'}});
 for(const [from,to] of [[phaseRef,step1Ref],[step1Ref,opRef],[opRef,leafRef],[phaseRef,step2Ref]] as const) projection.relate({scope,from,to,kind:'grouping',provenance:nestingProvenance});
 projection.relate({scope,from:runRef,to:attemptRef,kind:'ownership',provenance:{source:'furnace',observedAt:now,nativeConfirmationRef:'furnace://run-1/attempts/attempt-1'}});
 projection.relate({scope,from:looseRef,to:phaseRef,kind:'dependency',provenance:{source:'forge',observedAt:now}});
 return {projection,scope,invocationId:'grouped',title:'Grouped workflow',status:'running'};
}
/** Row text after the leading space, pointer and separator: the tree prefix then the row content. */
const rowBody = (lines: readonly string[], title: string): string => {
 const line = lines.find(item => item.includes(title));
 expect(line,`row ${title}`).toBeDefined();
 return (line ?? '').slice(3);
};
describe('W15/VC-5 overview nested tree from observed grouping/ownership edges (wb-6ze.1)',()=>{
 it('B1 nests each row 2 columns per depth from incoming grouping/ownership edges only, in tree order, ASCII and Unicode',()=>{
   // docs/workbench/10 "Four views" Overview: "compact nested tree".
   // docs/workbench/09 "Relationships are typed and provenanced": "grouping only (phase, display scope)".
   const model=groupedFixture();
   const ascii=layoutInspector(model,initialInspectorState(),{width:120,rows:40,ascii:true});
   expect(rowBody(ascii,'Phase A')).toMatch(/^\* Phase A/);
   expect(rowBody(ascii,'Step A1')).toMatch(/^\|- \* Step A1/);
   expect(rowBody(ascii,'Op A1a')).toMatch(/^ {2}\|- \* Op A1a/);
   expect(rowBody(ascii,'Leaf A1a-i')).toMatch(/^ {4}\|- \* Leaf A1a-i/);
   expect(rowBody(ascii,'Step A2')).toMatch(/^\|- \* Step A2/);
   expect(rowBody(ascii,'Run 1')).toMatch(/^\* Run 1/);
   expect(rowBody(ascii,'Attempt 1')).toMatch(/^\|- \* Attempt 1.*ownership/);
   expect(rowBody(ascii,'Loose op')).toMatch(/^\* Loose op.*no observed parent/);
   expect(rowBody(ascii,'Phase A')).toContain('no observed parent');
   expect(rowBody(ascii,'Step A1')).not.toContain('no observed parent');
   const unicode=layoutInspector(model,initialInspectorState(),{width:120,rows:40,ascii:false});
   expect(rowBody(unicode,'Step A1')).toMatch(/^├─ ◌ Step A1/);
   expect(rowBody(unicode,'Step A2')).toMatch(/^└─ ◌ Step A2/);
   expect(rowBody(unicode,'Leaf A1a-i')).toMatch(/^ {4}└─ ◌ Leaf A1a-i/);
   const order=['Phase A','Step A1','Op A1a','Leaf A1a-i','Step A2','Run 1','Attempt 1','Loose op'].map(title=>unicode.findIndex(line=>line.includes(title)));
   expect(order.every(index=>index>=0)).toBe(true);
   expect(order).toEqual([...order].sort((a,b)=>a-b));
   for(const lines of [ascii,unicode]) expect(lines.join('\n')).not.toContain('not lifecycle ownership');
 });
 it('B1 derives depth through the relationRevision-keyed relation cache and recomputes only after a topology change',()=>{
   const model=groupedFixture();
   const original=model.projection.relations.bind(model.projection);let reads=0;
   vi.spyOn(model.projection,'relations').mockImplementation(input=>{reads++;return original(input);});
   const state=initialInspectorState();
   layoutInspector(model,state,{width:120,rows:40,ascii:true});
   expect(reads).toBeGreaterThan(0);
   expect(reads).toBeLessThanOrEqual(2*8);
   const first=reads;
   layoutInspector(model,state,{width:120,rows:40,ascii:true});
   expect(reads).toBe(first);
   model.projection.relate({scope,from:runRef,to:looseRef,kind:'grouping',provenance:nestingProvenance});
   const after=layoutInspector(model,state,{width:120,rows:40,ascii:true});
   expect(reads).toBeGreaterThan(first);
   expect(rowBody(after,'Loose op')).toMatch(/^\|- \* Loose op/);
   expect(rowBody(after,'Loose op')).not.toContain('no observed parent');
 });
 it('B1 caps indentation at depth 8 and labels deeper rows instead of widening without bound',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   const chain=Array.from({length:11},(_,i)=>nested('forge','operation',`c${i}`));
   for(const [i,source] of chain.entries()) projection.refresh({source,scope,capturedAt:now,observedAt:now,node:presentation(`L${i} chain`),trace:{invocationId:'deep'}});
   for(let i=1;i<chain.length;i++) projection.relate({scope,from:chain[i-1],to:chain[i],kind:'grouping',provenance:nestingProvenance});
   const lines=layoutInspector({projection,scope,invocationId:'deep',title:'Deep',status:'running'},initialInspectorState(),{width:120,rows:40,ascii:true});
   const capped=`${'  '.repeat(7)}|- * `;
   expect(rowBody(lines,'L7 chain').startsWith(`${'  '.repeat(6)}|- * L7 chain`)).toBe(true);
   expect(rowBody(lines,'L8 chain').startsWith(`${capped}L8 chain`)).toBe(true);
   expect(rowBody(lines,'L9 chain').startsWith(`${capped}L9 chain`)).toBe(true);
   expect(rowBody(lines,'L10 chain').startsWith(`${capped}L10 chain`)).toBe(true);
   expect(rowBody(lines,'L10 chain')).toContain('depth 10, indent capped at 8');
   expect(rowBody(lines,'L8 chain')).not.toContain('indent capped');
   for(const line of lines){const indent=/^( *)\|- /.exec(line.slice(3)); if(indent) expect(indent[1].length).toBeLessThanOrEqual(2*7);}
 });
 it('B1 prefers a natively confirmed ownership parent over a grouping parent and counts the other parent',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   const group=nested('forge','operation','display-phase'), owner=nested('furnace','run','owner-run'), child=nested('furnace','attempt','owned');
   for(const [source,title] of [[group,'Display phase'],[owner,'Owner run'],[child,'Owned attempt']] as const) projection.refresh({source,scope,capturedAt:now,observedAt:now,node:presentation(title),trace:{invocationId:'prefer'}});
   projection.relate({scope,from:group,to:child,kind:'grouping',provenance:nestingProvenance});
   projection.relate({scope,from:owner,to:child,kind:'ownership',provenance:{source:'furnace',observedAt:now,nativeConfirmationRef:'furnace://owner-run/attempts/owned'}});
   const lines=layoutInspector({projection,scope,invocationId:'prefer',title:'Prefer',status:'running'},initialInspectorState(),{width:120,rows:40,ascii:true});
   const ownerAt=lines.findIndex(line=>line.includes('Owner run'));
   expect(ownerAt).toBeGreaterThan(0);
   expect(rowBody(lines,'Owned attempt')).toMatch(/^\|- \* Owned attempt .*ownership.*\+1 other observed parent/);
   expect(lines[ownerAt+1]).toContain('Owned attempt');
   expect(lines[lines.findIndex(line=>line.includes('Display phase'))+1]).not.toContain('Owned attempt');
 });
 it('B2 dependency, causation and hypothesis edges never nest; parentless rows say so explicitly',()=>{
   // docs/workbench/09: "Missing edges do not imply independence."
   // docs/workbench/02 WB-037: "Source-defined edges, observed edges and inferred links are distinguishable."
   const model=fixture();
   model.projection.relate({scope,from:ref('forge','1'),to:ref('furnace','2'),kind:'dependency',provenance:{source:'forge',observedAt:now}});
   model.projection.relate({scope,from:ref('furnace','2'),to:ref('forge','3'),kind:'causation',provenance:{source:'furnace',observedAt:now}});
   model.projection.relate({scope,from:ref('forge','3'),to:ref('furnace','4'),kind:'hypothesis',provenance:{source:'heuristic',observedAt:now}});
   for(const ascii of [true,false]){
     const lines=layoutInspector(model,initialInspectorState(),{width:120,rows:40,ascii});
     const rows=lines.filter(line=>/Operation \d+/.test(line));
     expect(rows.length).toBeGreaterThan(5);
     for(const line of rows){
       expect(line.slice(3)).toMatch(ascii?/^[*?] Operation \d+/:/^[◌?] Operation \d+/);
       expect(line).toContain('no observed parent');
     }
     expect(lines.join('\n')).not.toMatch(/\|- |├─|└─/);
     expect(lines.join('\n')).not.toMatch(/\broot\b/i);
   }
 });
 it('B2 a full incoming relation page never claims "no observed parent"',()=>{
   const projection=new ObservationProjection();
   const busy=nested('forge','operation','busy');
   projection.refresh({source:busy,scope,capturedAt:now,observedAt:now,node:presentation('Busy node'),trace:{invocationId:'busy'}});
   for(let i=0;i<100;i++) projection.relate({scope,from:nested('forge','operation',`dep-${i}`),to:busy,kind:'dependency',provenance:{source:'forge',observedAt:now}});
   projection.relate({scope,from:nested('forge','operation','group'),to:busy,kind:'grouping',provenance:nestingProvenance});
   const text=layoutInspector({projection,scope,invocationId:'busy',title:'Busy',status:'running'},initialInspectorState(),{width:120,rows:24,ascii:true}).join('\n');
   expect(text).toContain('parent unknown (relations partial)');
   expect(text).not.toContain('no observed parent');
 });
 it('B2 a full incoming relation page with an observed parent says the parent set is partial',()=>{
   const projection=new ObservationProjection();
   const shared=nested('forge','operation','shared');
   projection.refresh({source:shared,scope,capturedAt:now,observedAt:now,node:presentation('Shared node'),trace:{invocationId:'shared'}});
   for(let i=0;i<101;i++) projection.relate({scope,from:nested('furnace','operation',`g${i}`),to:shared,kind:'grouping',provenance:nestingProvenance});
   // Unicode tier: the ASCII tier renders every non-ASCII separator, including '·', as '?'.
   const lines=layoutInspector({projection,scope,invocationId:'shared',title:'Shared',status:'running'},initialInspectorState(),{width:160,rows:24,ascii:false});
   const row=rowBody(lines,'Shared node');
   expect(row).toContain('parent furnace/operation/g0 outside view · relations partial · +99 other observed parents');
   expect(row).not.toContain('no observed parent');
 });
 it('B2 an ownership parent stays distinguishable from grouping when listed flat or outside the view',()=>{
   // docs/workbench/02 WB-037: "Source-defined edges, observed edges and inferred links are distinguishable."
   const model=groupedFixture();
   const flatOwned=layoutInspector(model,{...initialInspectorState(),filter:'attempt'},{width:120,rows:40,ascii:true});
   expect(rowBody(flatOwned,'Attempt 1')).toContain('ownership parent furnace/run/run-1');
   const flatGrouped=layoutInspector(model,{...initialInspectorState(),filter:'step a1'},{width:120,rows:40,ascii:true});
   expect(rowBody(flatGrouped,'Step A1')).toContain('parent furnace/operation/phase');
   expect(rowBody(flatGrouped,'Step A1')).not.toContain('ownership');
   // An 11-row terminal fetches a two-row page; at index 6 it holds Attempt 1 and Loose op, so Run 1 is outside it.
   const outside=layoutInspector(model,{...initialInspectorState(),index:6},{width:120,rows:11,ascii:true});
   expect(rowBody(outside,'Attempt 1')).toContain('ownership parent furnace/run/run-1 outside view');
   expect(outside.some(line=>line.includes('Run 1'))).toBe(false);
 });
 it('B3 grouping cycles terminate at the first repeated key as [ref] lines within the row budget',()=>{
   // docs/workbench/10 "Four views" Graph: "Cycles/unknown dynamic edges represented explicitly as \"references\" rather than rendered as a fake acyclic plan."
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   const ids=['A','B','C','D','E','F','S'];
   for(const id of ids) projection.refresh({source:nested('furnace','operation',id),scope,capturedAt:now,observedAt:now,node:presentation(`Cycle ${id}`),trace:{invocationId:'cycle'}});
   for(const [from,to] of [['A','B'],['B','A'],['C','D'],['D','E'],['E','C'],['D','F'],['S','S']]) projection.relate({scope,from:nested('furnace','operation',from),to:nested('furnace','operation',to),kind:'grouping',provenance:nestingProvenance});
   const model={projection,scope,invocationId:'cycle',title:'Cycles',status:'running'};
   for(const [width,rows] of [[80,24],[32,18],[120,40]] as const) for(const view of ['overview','graph'] as const) for(const ascii of [true,false]){
     const lines=layoutInspector(model,{...initialInspectorState(),view},{width,rows,ascii});
     expect(lines.length).toBeLessThanOrEqual(rows);
     expect(lines.every(line=>visibleWidth(line)<=width)).toBe(true);
   }
   const lines=layoutInspector(model,initialInspectorState(),{width:120,rows:40,ascii:true});
   const refs=lines.filter(line=>line.includes('[ref '));
   expect(refs).toHaveLength(3);
   for(const id of ['A','C','S']) expect(refs.some(line=>line.includes(`[ref furnace/operation/${id}]`))).toBe(true);
   for(const id of ids) expect(lines.filter(line=>line.includes(`Cycle ${id} `))).toHaveLength(1);
   expect(rowBody(lines,'Cycle A ')).toMatch(/^\* Cycle A .*observed cycle/);
   expect(rowBody(lines,'Cycle B ')).toMatch(/^\|- \* Cycle B /);
   expect(rowBody(lines,'[ref furnace/operation/A]')).toMatch(/^ {2}\|- \[ref furnace\/operation\/A\]/);
   expect(rowBody(lines,'Cycle E ')).toMatch(/^ {2}\|- \* Cycle E /);
   expect(rowBody(lines,'[ref furnace/operation/C]')).toMatch(/^ {4}\|- \[ref furnace\/operation\/C\]/);
   expect(rowBody(lines,'Cycle F ')).toMatch(/^ {2}\|- \* Cycle F /);
   expect(rowBody(lines,'[ref furnace/operation/S]')).toMatch(/^\|- \[ref furnace\/operation\/S\]/);
 });
 it('B3 a row leading into a grouping cycle nests under the cycle entry rather than heading a cycle of its own',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   for(const id of ['T','X','Y']) projection.refresh({source:nested('furnace','operation',id),scope,capturedAt:now,observedAt:now,node:presentation(`Rho ${id}`),trace:{invocationId:'rho'}});
   for(const [from,to] of [['X','T'],['X','Y'],['Y','X']]) projection.relate({scope,from:nested('furnace','operation',from),to:nested('furnace','operation',to),kind:'grouping',provenance:nestingProvenance});
   const lines=layoutInspector({projection,scope,invocationId:'rho',title:'Rho',status:'running'},initialInspectorState(),{width:120,rows:40,ascii:true});
   expect(rowBody(lines,'Rho X ')).toMatch(/^\* Rho X .*observed cycle/);
   expect(rowBody(lines,'Rho T ')).toMatch(/^\|- \* Rho T /);
   expect(rowBody(lines,'Rho T ')).not.toContain('observed cycle');
   expect(rowBody(lines,'Rho Y ')).toMatch(/^\|- \* Rho Y /);
   const refs=lines.filter(line=>line.includes('[ref '));
   expect(refs).toHaveLength(1);
   expect(refs[0]).toContain('[ref furnace/operation/X] cycle via grouping');
 });
 it('B4 Enter collapses observed descendants within the fetched page and a second Enter restores them',()=>{
   // docs/workbench/10 "Navigation": "Enter expands"; "Rendering pipeline": "Avoid O(allHistory) collapse per frame;
   // maintain by-node last projection and ancestor aggregates incrementally."
   const model=groupedFixture();
   const phaseKey=model.projection.window({scope,invocationId:'grouped',offset:0,limit:1}).nodes[0].key;
   let state=reduceInspectorKey('\r',initialInspectorState(),model)!.state;
   expect(state.collapsed).toEqual([phaseKey]);
   const collapsed=layoutInspector(model,state,{width:120,rows:40,ascii:true});
   for(const title of ['Step A1','Op A1a','Leaf A1a-i','Step A2']) expect(collapsed.some(line=>line.includes(title))).toBe(false);
   for(const title of ['Phase A','Run 1','Attempt 1','Loose op']) expect(collapsed.some(line=>line.includes(title))).toBe(true);
   const phaseAt=collapsed.findIndex(line=>line.includes('Phase A'));
   expect(collapsed[phaseAt+1]).toContain('... 4 collapsed (observed grouping)');
   state=reduceInspectorKey('\r',state,model)!.state;
   expect(state.collapsed).toEqual([]);
   const restored=layoutInspector(model,state,{width:120,rows:40,ascii:true}).join('\n');
   for(const title of ['Step A1','Op A1a','Leaf A1a-i','Step A2']) expect(restored).toContain(title);
   expect(restored).not.toContain('collapsed (observed');
 });
 it('B4 counts only members of the fetched window page, never a full-projection scan',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:128,maxEdges:128,maxQuery:40});
   const root=nested('forge','operation','root');
   projection.refresh({source:root,scope,capturedAt:now,observedAt:now,node:presentation('Wide root'),trace:{invocationId:'wide'}});
   for(let i=0;i<40;i++){
     const child=nested('forge','operation',`child-${i}`);
     projection.refresh({source:child,scope,capturedAt:now,observedAt:now,node:presentation(`Wide child ${i}`),trace:{invocationId:'wide'}});
     projection.relate({scope,from:root,to:child,kind:'grouping',provenance:nestingProvenance});
   }
   const model={projection,scope,invocationId:'wide',title:'Wide',status:'running'};
   const windows=vi.spyOn(projection,'window');
   const scans=[vi.spyOn(projection,'query'),vi.spyOn(projection,'events'),vi.spyOn(projection,'stats')];
   const state=reduceInspectorKey('\r',initialInspectorState(),model)!.state;
   const text=layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n');
   expect(text).toContain('... 14 collapsed (observed grouping)');
   expect(text).not.toContain('Wide child');
   expect(text).toMatch(/Rows 1-15\/41/);
   expect(windows.mock.calls.every(([query])=>query.limit<=32)).toBe(true);
   for(const scan of scans) expect(scan).not.toHaveBeenCalled();
 });
 it('B4 keeps the selection visible on the collapsed summary when it moves into a hidden row',()=>{
   const model=groupedFixture();
   let state=reduceInspectorKey('\r',initialInspectorState(),model)!.state;
   state=reduceInspectorKey('j',state,model)!.state;
   const lines=layoutInspector(model,state,{width:120,rows:40,ascii:true});
   const summary=lines.find(line=>line.includes('collapsed (observed grouping)'));
   expect(summary?.startsWith(' > ')).toBe(true);
   expect(lines.filter(line=>line.startsWith(' > '))).toHaveLength(1);
 });
 it('B4 keeps descendants collapsed after the collapsed parent scrolls out of the fetched page; Enter on it restores them',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:128,maxEdges:128,maxQuery:40});
   const root=nested('forge','operation','root');
   projection.refresh({source:root,scope,capturedAt:now,observedAt:now,node:presentation('Wide root'),trace:{invocationId:'wide'}});
   for(let i=0;i<40;i++){
     const child=nested('forge','operation',`child-${i}`);
     projection.refresh({source:child,scope,capturedAt:now,observedAt:now,node:presentation(`Wide child ${i}`),trace:{invocationId:'wide'}});
     projection.relate({scope,from:root,to:child,kind:'grouping',provenance:nestingProvenance});
   }
   const model={projection,scope,invocationId:'wide',title:'Wide',status:'running'};
   let state=reduceInspectorKey('\r',initialInspectorState(),model)!.state;
   for(let i=0;i<10;i++) state=reduceInspectorKey('j',state,model)!.state;
   // Index 10 of 41 centres a 15-row page at offset 3: the collapsed root is no longer fetched, its children are.
   const lines=layoutInspector(model,state,{width:120,rows:24,ascii:true});
   expect(lines.join('\n')).toMatch(/Rows 4-18\/41/);
   expect(lines.some(line=>line.includes('Wide child'))).toBe(false);
   const summary=lines.filter(line=>line.includes('collapsed (observed grouping)'));
   expect(summary).toHaveLength(1);
   expect(summary[0]).toContain('... 15 collapsed (observed grouping)');
   expect(summary[0]).toContain('parent forge/operation/root outside view');
   expect(summary[0].startsWith(' > ')).toBe(true);
   for(let i=0;i<10;i++) state=reduceInspectorKey('k',state,model)!.state;
   state=reduceInspectorKey('\r',state,model)!.state;
   expect(state.collapsed).toEqual([]);
   expect(layoutInspector(model,state,{width:120,rows:24,ascii:true}).join('\n')).toContain('Wide child 0');
 });
});
describe('W15/VC-5 graph fan-out collapse (wb-6ze.1)',()=>{
 it('B5 prints the first two relations then a real "+N more" count from the bounded relation page',()=>{
   // docs/workbench/10 "Four views" Graph: "fan-out collapsing" and
   // "Re-layout only changed neighborhood or viewport, not the complete graph for every event."
   const model=fixture();
   for(const id of ['3','5','7','9']) model.projection.relate({scope,from:ref('furnace','0'),to:ref('forge',id),kind:'causation',provenance:{source:'furnace',observedAt:now}});
   const graph=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:120,rows:40,ascii:true});
   const at=graph.findIndex(line=>line.includes('furnace/operation/0 Operation 0'));
   expect(at).toBeGreaterThan(0);
   expect(graph[at+1]).toContain('dependency -> forge/operation/1');
   expect(graph[at+2]).toContain('causation -> forge/operation/3');
   expect(graph[at+3]).toContain('... +3 more (fan-out collapsed; bounded)');
   expect(graph[at+3]).not.toContain('(partial)');
 });
 it('B5 a self-loop is listed and counted once in the graph and details views',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   const self=nested('furnace','operation','self');
   projection.refresh({source:self,scope,capturedAt:now,observedAt:now,node:presentation('Self loop'),trace:{invocationId:'loop'}});
   projection.relate({scope,from:self,to:self,kind:'grouping',provenance:nestingProvenance});
   const model={projection,scope,invocationId:'loop',title:'Loop',status:'running'};
   const graph=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:120,rows:24,ascii:true});
   expect(graph.filter(line=>line.includes('grouping -> furnace/operation/self'))).toHaveLength(1);
   expect(graph.join('\n')).not.toContain('fan-out collapsed');
   const details=layoutInspector(model,{...initialInspectorState(),view:'details'},{width:120,rows:24,ascii:true});
   expect(details.find(line=>line.includes('Relations:'))).toMatch(/Relations: grouping$/);
 });
 it('B5 suffixes (partial) when the bounded relation page is full',()=>{
   const projection=new ObservationProjection();
   const hub=nested('furnace','operation','hub');
   projection.refresh({source:hub,scope,capturedAt:now,observedAt:now,node:presentation('Hub'),trace:{invocationId:'hub'}});
   for(let i=0;i<105;i++) projection.relate({scope,from:hub,to:nested('forge','operation',`t-${i}`),kind:'causation',provenance:{source:'furnace',observedAt:now}});
   const text=layoutInspector({projection,scope,invocationId:'hub',title:'Hub',status:'running'},{...initialInspectorState(),view:'graph'},{width:120,rows:24,ascii:true}).join('\n');
   expect(text).toContain('... +98 more (fan-out collapsed; bounded) (partial)');
   expect(text).toContain('Topology incomplete unless native relationships are explicitly supplied.');
 });
});
describe('W15/VC-5 nested tree bounds under scale (wb-6ze.1)',()=>{
 it('B6 keeps window, relation-read, width and row bounds after 100k ingest updates on a grouped projection',()=>{
   // docs/workbench/02 WB-029: "Over 1000 nodes: render cost scales with visible slice and changed ancestors;
   // no full historical-log fold per frame."
   const projection=new ObservationProjection({maxEvents:16,maxNodes:1200,maxEdges:1200,maxQuery:40});
   for(let i=0;i<90;i++) projection.refresh({source:ref('forge',String(i)),scope,capturedAt:now,observedAt:now,node:presentation(`Grouped ${i}`),trace:{invocationId:'scale'}});
   for(let i=1;i<90;i++) projection.relate({scope,from:ref('forge',String(Math.floor((i-1)/3))),to:ref('forge',String(i)),kind:'grouping',provenance:nestingProvenance});
   const model={projection,scope,invocationId:'scale',title:'Scale',status:'running'};
   const windows=vi.spyOn(projection,'window');
   const original=projection.relations.bind(projection);let reads=0;
   vi.spyOn(projection,'relations').mockImplementation(input=>{reads++;return original(input);});
   let state=initialInspectorState();
   layoutInspector(model,state,{width:80,rows:24});
   state=reduceInspectorKey('j',state,model)!.state;
   const topology=projection.relationRevision();
   for(let i=0;i<100_000;i++) projection.ingest({projectionEventId:`g-${i}`,source:ref('forge',String(i%90)),scope,sourceSequence:Math.floor(i/90)+1,observedAt:now,kind:'native.status',node:{presentation:presentation(`Grouped ${i%90}`)}});
   expect(projection.relationRevision()).toBe(topology);
   const beforeChurn=reads;
   for(const view of ['overview','graph'] as const) for(const width of [32,79,80,120]) for(const ascii of [true,false]){
     const lines=layoutInspector(model,{...state,view},{width,rows:24,ascii});
     expect(lines.length).toBeLessThanOrEqual(24);
     expect(lines.every(line=>visibleWidth(line)<=width)).toBe(true);
     if(view==='graph') expect(lines.some(line=>line.includes(width>=79?'Topology incomplete unless native relationships are explicitly supplied.':'Topology incomplete'))).toBe(true);
     if(view==='overview' && width>=79) expect(lines.some(line=>/(\|-|├─|└─) . Grouped 1 /.test(line))).toBe(true);
   }
   expect(windows.mock.calls.every(([query])=>query.limit<=32)).toBe(true);
   // A 24-row terminal fetches a 15-row page: at most two relations() reads per page row per topology revision,
   // and status-only churn never re-reads relations.
   expect(reads).toBeLessThanOrEqual(2*15);
   expect(reads).toBe(beforeChurn);
 });
});
describe('W15/VC-5 row budget honesty (wb-6ze.1)',()=>{
 it('B6 graph blocks that do not fit are counted, never silently dropped, and the footer and key hint remain',()=>{
   const model=groupedFixture();
   const lines=layoutInspector(model,{...initialInspectorState(),view:'graph'},{width:80,rows:24,ascii:true});
   expect(lines.length).toBeLessThanOrEqual(24);
   const budget=lines.find(line=>line.includes('in this page (row budget)'));
   expect(budget).toContain('... 2 more rows in this page (row budget)');
   const drawn=['Phase A','Step A1','Op A1a','Leaf A1a-i','Run 1','Attempt 1','Loose op','Step A2'].filter(title=>lines.some(line=>line.includes(title)));
   expect(drawn.length+2).toBe(8);
   expect(lines.at(-2)).toContain('Topology incomplete unless native relationships are explicitly supplied.');
   expect(lines.at(-1)).toContain('Esc');
 });
 it('B6 a filtered full overview page keeps attention, row range and Escape lines and counts rows it cannot draw',()=>{
   const model=fixture();
   const lines=layoutInspector(model,{...initialInspectorState(),filter:'operation'},{width:80,rows:24,ascii:true});
   expect(lines.length).toBeLessThanOrEqual(24);
   expect(lines.filter(line=>/Operation \d+/.test(line))).toHaveLength(13);
   expect(lines.join('\n')).toContain('... 2 more rows in this page (row budget)');
   for(const text of ['Attention:','Critical path: incomplete trace','Rows 1-15/90']) expect(lines.join('\n')).toContain(text);
   expect(lines.at(-1)).toContain('Esc');
 });
});
describe('W15/VC-5 row budget keeps the selection visible (wb-6ze.1)',()=>{
 it('B6 an overview selection pushed past the row budget by cycle references marks the budget notice',()=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
   const ids=[...Array.from({length:7},(_,i)=>[`a${i}`,`b${i}`]).flat(),'z'];
   for(const id of ids) projection.refresh({source:nested('forge','operation',id),scope,capturedAt:now,observedAt:now,node:presentation(`Pair ${id}`),trace:{invocationId:'pairs'}});
   for(let i=0;i<7;i++) for(const [from,to] of [[`a${i}`,`b${i}`],[`b${i}`,`a${i}`]]) projection.relate({scope,from:nested('forge','operation',from),to:nested('forge','operation',to),kind:'grouping',provenance:nestingProvenance});
   const model={projection,scope,invocationId:'pairs',title:'Pairs',status:'running'};
   // 15 rows plus 7 cycle reference lines exceed the 16-line tree budget; b6 (index 13) is drawn last in tree order.
   const lines=layoutInspector(model,{...initialInspectorState(),index:13},{width:80,rows:24,ascii:true});
   expect(lines.length).toBeLessThanOrEqual(24);
   expect(lines.some(line=>line.includes('Pair b6'))).toBe(false);
   const notice=lines.find(line=>line.includes('in this page (row budget)'));
   expect(notice).toContain('... 4 more rows in this page (row budget)');
   expect(notice?.startsWith(' > ')).toBe(true);
   expect(lines.filter(line=>line.startsWith(' > '))).toHaveLength(1);
 });
 it('B6 a graph selection in a block past the row budget marks the budget notice',()=>{
   const model=groupedFixture();
   const lines=layoutInspector(model,{...initialInspectorState(),view:'graph',index:7},{width:80,rows:24,ascii:true});
   expect(lines.some(line=>line.includes('Step A2'))).toBe(false);
   const notice=lines.find(line=>line.includes('in this page (row budget)'));
   expect(notice?.startsWith(' > ')).toBe(true);
   expect(lines.filter(line=>line.startsWith(' > '))).toHaveLength(1);
 });
});
describe('W15/VC-5 closing the nested overview (wb-6ze.1)',()=>{
 it('B7 Esc from the nested overview closes with zero producer or control calls',()=>{
   // docs/workbench/10 "Navigation": "Closing view never stops workflow."
   const model=groupedFixture(),done=vi.fn(),onKill=vi.fn();
   const mutators=[vi.spyOn(model.projection,'refresh'),vi.spyOn(model.projection,'ingest'),vi.spyOn(model.projection,'relate'),
     vi.spyOn(model.projection,'disconnect'),vi.spyOn(model.projection,'reconnect'),vi.spyOn(model.projection,'markStale')];
   expect(reduceInspectorKey('\x1b',initialInspectorState(),model)?.action).toBe('close');
   const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[],task:{status:'running',workflowName:'Grouped workflow',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,done,{onKill});
   const rendered=dialog.render(80).join('\n');
   expect(rendered).toContain('OVERVIEW');
   expect(rendered).toMatch(/[├└]─ ◌ Step A1/);
   dialog.handleInput('\x1b');
   expect(done).toHaveBeenCalledTimes(1);
   expect(onKill).not.toHaveBeenCalled();
   for(const spy of mutators) expect(spy).not.toHaveBeenCalled();
   dialog.dispose();
 });
});

// wb-6ze.34 (W15-B6 / VC-5): with InspectorModel.graph set the graph view draws the wb-6ze.32 graph-view model; absent, the
// graph view is byte-identical to the base. Spec quotes: docs/workbench/10-terminal-inspector.md § Four views (Graph) and
// § Rendering pipeline; docs/workbench/09-observation-and-provenance.md § Relationships are typed and provenanced; BOUNDARY
// 2026-10-15T10:58:33Z ("declared edge to unobserved endpoint -> 'unobserved endpoint' marker, never unknown-dynamic").
describe('W15-B6 graph view draws the graph-view model (wb-6ze.34)',()=>{
 type Graph=NonNullable<InspectorModel['graph']>;
 type Kind=Parameters<ObservationProjection['relate']>[0]['kind'];
 type State=ReturnType<typeof initialInspectorState>;
 interface Size {width:number; rows:number; ascii?:boolean}
 const graphState=(over:Partial<State>={}):State=>({...initialInspectorState(),view:'graph',...over});
 const draw=(model:InspectorModel,over:Partial<State>={},size:Size={width:120,rows:40,ascii:true})=>layoutInspector(model,graphState(over),size);
 /** Code point ranges no drawn line may carry: C0 and C1 controls with DEL, the Arabic letter mark, zero-width and bidi marks,
  * line and paragraph separators, embeddings and overrides, word joiner and isolates, lone surrogates and the BOM. Built from
  * numbers so this file carries none of them raw (wb-era); hostile inputs below are composed from the same code points. */
 const UNSAFE_RANGES:readonly (readonly [number,number])[]=[[0x00,0x1f],[0x7f,0x9f],[0x61c,0x61c],[0x200b,0x200f],[0x2028,0x202e],[0x2060,0x2069],[0xd800,0xdfff],[0xfeff,0xfeff]];
 const unsafe=(line:string)=>Array.from(line).some(char=>{const point=char.codePointAt(0)??0;return UNSAFE_RANGES.some(([low,high])=>point>=low&&point<=high);});
 const [NUL,BEL,ESC,NEL,CSI8,ZWSP,ZWJ,PDF,RLO,LRI,PDI]=[0x00,0x07,0x1b,0x85,0x9b,0x200b,0x200d,0x202c,0x202e,0x2066,0x2069].map(point=>String.fromCodePoint(point));
 const glyphs=(ascii:boolean)=>({sep:ascii?' | ':' · ',arrow:ascii?'->':'→',back:ascii?'<-':'←',active:ascii?'*':'◌',dots:ascii?'...':'…'});
 /** Rows of an observed node in the model branch: its tone glyph, its label, then the field separator. */
 const nodeRows=(lines:readonly string[],label:string,ascii:boolean)=>{const {sep,active}=glyphs(ascii);return lines.filter(line=>line.includes(`${active} ${label}${sep}`));};
 const isReference=(line:string)=>line.trimStart().startsWith('reference ');
 /** A wb-6ze.32 model over a real projection: two fan-outs above the default cap of 8 (one aggregate each), a declared edge
  * between shown rows, a self-loop (a cycle reference), a causation edge to a never-observed endpoint (an unknown-dynamic
  * reference) and a declared edge to another never-observed endpoint. */
 function graphFixture(){
   const projection=new ObservationProjection({maxEvents:64,maxNodes:200,maxEdges:200,maxQuery:100});
   const observe=(provider:string,id:string,title:string)=>projection.refresh({source:ref(provider,id),scope,capturedAt:now,observedAt:now,node:presentation(title),trace:{invocationId:'graph'}});
   const relate=(from:NativeRef,to:NativeRef,kind:Kind)=>projection.relate({scope,from,to,kind,provenance:{source:'fixture-producer',observedAt:now}});
   observe('forge','hub-a','Hub A');observe('furnace','hub-b','Hub B');
   for(let i=0;i<9;i++){observe('forge',`a${i}`,`Fan A${i}`);relate(ref('forge','hub-a'),ref('forge',`a${i}`),'causation');}
   for(let i=0;i<10;i++){const provider=i%2?'forge':'furnace';observe(provider,`b${i}`,`Fan B${i}`);relate(ref('furnace','hub-b'),ref(provider,`b${i}`),'grouping');}
   for(const [id,title] of [['build','Build'],['test','Test'],['loop','Loop'],['caller','Caller'],['planner','Planner']] as const) observe('forge',id,title);
   relate(ref('forge','build'),ref('forge','test'),'dependency');
   relate(ref('forge','loop'),ref('forge','loop'),'grouping');
   relate(ref('forge','caller'),ref('forge','spawned-later'),'causation');
   relate(ref('forge','planner'),ref('forge','declared-only'),'dependency');
   const base:InspectorModel={projection,scope,invocationId:'graph',title:'Graph workflow',status:'running'};
   const graph=buildGraphView(projection,{scope,invocationId:'graph',viewport:{offset:0,limit:100},caps:{maxNodes:100}});
   const keyOf=(label:string)=>graph.nodes.find(node=>node.label===label)?.key??'';
   return {base,graph,model:{...base,graph},keyOf};
 }

 it('AC1 draws counted aggregates before node rows, each edge with a direction glyph, its class and [source], and both references as reference rows',()=>{
   // docs/workbench/10 § Four views, Graph: "explicit dependency arrows, fan-out collapsing, cross-provider nodes ... Cycles/unknown
   // dynamic edges represented explicitly as \"references\" rather than rendered as a fake acyclic plan."; § Rendering pipeline:
   // "For large graphs show aggregate supernodes first."; docs/workbench/09: "Store edge provenance with timestamp and source;
   // Graph view styles each differently."
   const {graph,model}=graphFixture();
   expect(graph.supernodes.map(entry=>entry.count)).toEqual([9,10]);
   expect(graph.references.map(entry=>entry.reason)).toEqual(['cycle','endpoint-not-in-view','endpoint-not-in-view']);
   for(const ascii of [true,false]){
     const {arrow,sep}=glyphs(ascii);
     const lines=draw(model,{},{width:120,rows:40,ascii});
     const aggregates=lines.flatMap((line,at)=>line.includes(`aggregate${sep}`)?[at]:[]);
     expect(aggregates).toHaveLength(2);
     expect(lines[aggregates[0]]).toContain('9 targets collapsed from Hub A (fan-out above 8)');
     expect(lines[aggregates[1]]).toContain('10 targets collapsed from Hub B (fan-out above 8)');
     const rows=['Hub A','Hub B','Build','Test','Loop','Caller','Planner'].map(label=>lines.findIndex(line=>nodeRows([line],label,ascii).length===1));
     expect(rows.every(at=>at>aggregates[1])).toBe(true);
     // Collapsed fan-out targets are counted in their aggregate, never expanded into rows (F3).
     expect(lines.some(line=>/Fan [AB]\d/.test(line))).toBe(false);
     const edge=lines[rows[2]+1];
     expect(edge).toContain(`declared dependency ${arrow} Test`);
     expect(edge).toContain('[fixture-producer]');
     const references=lines.filter(isReference);
     expect(references).toHaveLength(2);
     expect(references[0]).toContain(`reference${sep}cycle${sep}grouping${sep}Loop ${arrow} Loop [fixture-producer]`);
     expect(references[1]).toContain(`reference${sep}unknown dynamic edge (not in view)${sep}observed causal${sep}Caller ${arrow} forge/operation/spawned-later`);
     // A cycle is never also drawn as an arrow (F1).
     expect(lines.filter(line=>line.includes('Loop')&&!isReference(line)&&line.includes(arrow))).toHaveLength(0);
   }
 });
 it('AC2 a declared edge to a never-observed endpoint is a declared dependency marked unobserved endpoint, never unknown-dynamic',()=>{
   const {model}=graphFixture();
   for(const ascii of [true,false]){
     const {arrow,sep}=glyphs(ascii);
     const lines=draw(model,{},{width:120,rows:40,ascii});
     const declared=lines.filter(line=>line.includes('forge/operation/declared-only'));
     expect(declared).toHaveLength(1);
     expect(declared[0]).toContain(`declared dependency${sep}unobserved endpoint (not in view) ${arrow} forge/operation/declared-only [fixture-producer]`);
     expect(declared[0]).not.toContain('unknown dynamic');
     expect(isReference(declared[0])).toBe(false);
     // It is drawn with its observed source row, directly below it.
     expect(lines.indexOf(declared[0])).toBe(lines.findIndex(line=>nodeRows([line],'Planner',ascii).length===1)+1);
   }
 });
 it('AC3 a truncated read draws its counted partial labels and a complete model draws none',()=>{
   const projection=new ObservationProjection({maxEvents:64,maxNodes:64,maxEdges:64,maxQuery:40});
   for(let i=0;i<12;i++) projection.refresh({source:ref('forge',`r${i}`),scope,capturedAt:now,observedAt:now,node:presentation(`Row ${i}`),trace:{invocationId:'cut'}});
   for(let i=1;i<8;i++) projection.relate({scope,from:ref('forge','r0'),to:ref('forge',`r${i}`),kind:'causation',provenance:{source:'fixture-producer',observedAt:now}});
   const graph=buildGraphView(projection,{scope,invocationId:'cut',viewport:{offset:0,limit:6},caps:{relationLimit:5}});
   expect(graph.complete).toBe(false);
   expect(graph.partials.map(entry=>entry.scope)).toEqual(['window','relations']);
   const model={projection,scope,invocationId:'cut',title:'Cut',status:'running',graph};
   for(const ascii of [true,false]){
     const {sep}=glyphs(ascii);
     const lines=draw(model,{},{width:120,rows:40,ascii});
     const partial=lines.filter(line=>line.includes(`partial${sep}`));
     expect(partial).toHaveLength(2);
     expect(partial[0]).toContain('showing 6 of 12 rows');
     expect(partial[1]).toContain('Row 0: showing 5 outgoing relations, more exist (page truncated)');
     expect(lines.at(-2)).toContain('Topology incomplete unless native relationships are explicitly supplied.');
   }
   const complete=graphFixture();
   expect(complete.graph.complete).toBe(true);
   expect(draw(complete.model).some(line=>line.includes('partial'))).toBe(false);
 });
 it('AC3 under a small row budget partial labels are kept before any block, and every block left over is counted',()=>{
   const projection=new ObservationProjection({maxEvents:64,maxNodes:64,maxEdges:64,maxQuery:40});
   for(let i=0;i<12;i++) projection.refresh({source:ref('forge',`r${i}`),scope,capturedAt:now,observedAt:now,node:presentation(`Row ${i}`),trace:{invocationId:'cut'}});
   for(let i=1;i<8;i++) projection.relate({scope,from:ref('forge','r0'),to:ref('forge',`r${i}`),kind:'causation',provenance:{source:'fixture-producer',observedAt:now}});
   const graph=buildGraphView(projection,{scope,invocationId:'cut',viewport:{offset:0,limit:12},caps:{relationLimit:5}});
   const model={projection,scope,invocationId:'cut',title:'Cut',status:'running',graph};
   for(const rows of [10,12,14]) for(const ascii of [true,false]){
     const {sep}=glyphs(ascii);
     const lines=draw(model,{},{width:120,rows,ascii});
     expect(lines.length).toBeLessThanOrEqual(rows);
     expect(lines.some(line=>line.includes(`partial${sep}Row 0: showing 5 outgoing relations, more exist (page truncated)`))).toBe(true);
     expect(lines.some(line=>line.includes('(row budget)'))).toBe(true);
     expect(lines.at(-1)).toContain('Esc');
   }
 });

 /** Every graph-view render the pre-existing cases of this file perform, rebuilt from the same fixed inputs, in order. */
 const graphText=(model:InspectorModel,over:Partial<State>,size:Size)=>draw(model,over,size).join('\n');
 const FALLBACK:readonly (readonly [string,()=>string[]])[]=[
  ['four-view: observed relation provenance, 120x40 ascii',()=>[graphText(fixture(),{},{width:120,rows:40,ascii:true})]],
  ['four-view: dialog GRAPH after Tab, 80x24',()=>[layoutInspector(fixture(),{...initialInspectorState(),view:'graph',previousView:'overview'},{width:80,rows:24}).join('\n')]],
  ...[true,false].map(ascii=>[`four-view: capped width and unsafe title, ascii=${ascii}`,()=>{
    const model=fixture();model.title='\x1b[2J secret\n漢字';
    return [32,79,80,120].map(width=>graphText(model,{},{width,rows:24,ascii}));
  }] as const),
  ['navigation: Enter collapses the highlighted row, 80x24',()=>{
    const model=fixture();const collapsed=reduceInspectorKey('\r',initialInspectorState(),model)!.state;
    return [layoutInspector(model,{...collapsed,view:'graph'},{width:80,rows:24}).join('\n')];
  }],
  ['relation fidelity: direction and native kind, 120x40 ascii',()=>[graphText(fixture(),{},{width:120,rows:40,ascii:true})]],
  ['viewport: Escape hint at 32/80 x 18/24 ascii',()=>{const model=fixture();return [32,80].flatMap(width=>[18,24].map(rows=>graphText(model,{},{width,rows,ascii:true})));}],
  ['graph footer under fan-out, 80x24 ascii',()=>{
    const model=fixture();
    for(let i=1;i<15;i++)model.projection.relate({scope,from:ref('furnace','0'),to:ref(i%2?'forge':'furnace',String(i)),kind:'causation',provenance:{source:'furnace',observedAt:now}});
    return [graphText(model,{},{width:80,rows:24,ascii:true})];
  }],
  ['graph direction: reverse reader edge at index 1, 120x40 ascii',()=>[graphText(fixture(),{index:1},{width:120,rows:40,ascii:true})]],
  ['graph preview: two redraws without a topology change, 80x24',()=>{const model=fixture();return [graphText(model,{},{width:80,rows:24}),graphText(model,{},{width:80,rows:24})];}],
  ['graph cache invalidation: before and after a new edge, 120x40 ascii',()=>{
    const model=fixture();const before=graphText(model,{},{width:120,rows:40,ascii:true});
    model.projection.relate({scope,from:ref('furnace','0'),to:ref('furnace','2'),kind:'grouping',provenance:{source:'furnace',observedAt:now}});
    return [before,graphText(model,{},{width:120,rows:40,ascii:true})];
  }],
  ['B3 grouping cycles at three sizes, both tiers',()=>{
    const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
    for(const id of ['A','B','C','D','E','F','S']) projection.refresh({source:nested('furnace','operation',id),scope,capturedAt:now,observedAt:now,node:presentation(`Cycle ${id}`),trace:{invocationId:'cycle'}});
    for(const [from,to] of [['A','B'],['B','A'],['C','D'],['D','E'],['E','C'],['D','F'],['S','S']]) projection.relate({scope,from:nested('furnace','operation',from),to:nested('furnace','operation',to),kind:'grouping',provenance:nestingProvenance});
    const model={projection,scope,invocationId:'cycle',title:'Cycles',status:'running'};
    return ([[80,24],[32,18],[120,40]] as const).flatMap(([width,rows])=>[true,false].map(ascii=>graphText(model,{},{width,rows,ascii})));
  }],
  ['B5 first two relations then a +N more count, 120x40 ascii',()=>{
    const model=fixture();
    for(const id of ['3','5','7','9']) model.projection.relate({scope,from:ref('furnace','0'),to:ref('forge',id),kind:'causation',provenance:{source:'furnace',observedAt:now}});
    return [graphText(model,{},{width:120,rows:40,ascii:true})];
  }],
  ['B5 a self-loop listed once, 120x24 ascii',()=>{
    const projection=new ObservationProjection({maxEvents:16,maxNodes:64,maxEdges:64,maxQuery:40});
    const self=nested('furnace','operation','self');
    projection.refresh({source:self,scope,capturedAt:now,observedAt:now,node:presentation('Self loop'),trace:{invocationId:'loop'}});
    projection.relate({scope,from:self,to:self,kind:'grouping',provenance:nestingProvenance});
    return [graphText({projection,scope,invocationId:'loop',title:'Loop',status:'running'},{},{width:120,rows:24,ascii:true})];
  }],
  ['B5 a full relation page is suffixed (partial), 120x24 ascii',()=>{
    const projection=new ObservationProjection();
    const hub=nested('furnace','operation','hub');
    projection.refresh({source:hub,scope,capturedAt:now,observedAt:now,node:presentation('Hub'),trace:{invocationId:'hub'}});
    for(let i=0;i<105;i++) projection.relate({scope,from:hub,to:nested('forge','operation',`t-${i}`),kind:'causation',provenance:{source:'furnace',observedAt:now}});
    return [graphText({projection,scope,invocationId:'hub',title:'Hub',status:'running'},{},{width:120,rows:24,ascii:true})];
  }],
  ['B6 bounds after 100k ingest updates, four widths, both tiers',()=>{
    const projection=new ObservationProjection({maxEvents:16,maxNodes:1200,maxEdges:1200,maxQuery:40});
    for(let i=0;i<90;i++) projection.refresh({source:ref('forge',String(i)),scope,capturedAt:now,observedAt:now,node:presentation(`Grouped ${i}`),trace:{invocationId:'scale'}});
    for(let i=1;i<90;i++) projection.relate({scope,from:ref('forge',String(Math.floor((i-1)/3))),to:ref('forge',String(i)),kind:'grouping',provenance:nestingProvenance});
    const model={projection,scope,invocationId:'scale',title:'Scale',status:'running'};
    const state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
    for(let i=0;i<100_000;i++) projection.ingest({projectionEventId:`g-${i}`,source:ref('forge',String(i%90)),scope,sourceSequence:Math.floor(i/90)+1,observedAt:now,kind:'native.status',node:{presentation:presentation(`Grouped ${i%90}`)}});
    return [32,79,80,120].flatMap(width=>[true,false].map(ascii=>layoutInspector(model,{...state,view:'graph'},{width,rows:24,ascii}).join('\n')));
  }],
  ['B6 graph blocks that do not fit are counted, 80x24 ascii',()=>[graphText(groupedFixture(),{},{width:80,rows:24,ascii:true})]],
  ['B6 a graph selection past the row budget, 80x24 ascii',()=>[graphText(groupedFixture(),{index:7},{width:80,rows:24,ascii:true})]],
  ['A1 evidence journey graph redraw, 80x24',()=>{
    const projection=new ObservationProjection({maxEvents:16,maxNodes:100,maxEdges:100,maxQuery:40});
    projection.refresh({source:ref('forge','gate'),scope,capturedAt:now,observedAt:now,node:{...presentation('Gate'),statusText:'success',statusTone:'success'},trace:{invocationId:'workflow-ev'},coverage:'complete',evidenceRefs:['ev:alpha','ev:beta','ev:gamma']});
    projection.refresh({source:ref('furnace','run'),scope,capturedAt:now,observedAt:now,node:presentation('Run'),trace:{invocationId:'workflow-ev'},coverage:'partial'});
    const loader:EvidenceLoader={provider:'forge',requiredGrant:'forge:inspect',canLoad:item=>item.startsWith('ev:'),
      load:async request=>({kind:'fixture',provider:'forge',capturedAt:now,bytes:request.evidenceRef.length,truncated:false,preview:[`payload for ${request.evidenceRef}`],freshness:'current'})};
    const store=new EvidenceStore({loaders:[loader],maxEntries:8,maxBytes:2048,timeoutMs:200,scope});
    const model:InspectorModel={projection,scope,invocationId:'workflow-ev',title:'Evidence workflow',status:'running',evidence:store};
    return [layoutInspector(model,reduceInspectorKey('\t',initialInspectorState(),model)!.state,{width:80,rows:24}).join('\n')];
  }],
  ['attention AC6: the fixture graph view at 80x24 and 120x40, both tiers',()=>([[80,24],[120,40]] as const).flatMap(([width,rows])=>[true,false].map(ascii=>graphText(fixture(),{},{width,rows,ascii})))],
 ];
 /** sha256 of each case's renders, captured with the graph branch unchanged (wb-6ze.34 AC4): at base 4becba1, and the attention
  * row at base 5d0f71e where its case first exists (wb-6ze.21 landed); never re-pinned. */
 const BASE_DIGESTS:Readonly<Record<string,string>>={
  'four-view: observed relation provenance, 120x40 ascii':'3d364b7f18376bcef4114d7b80487d2e03c8bc150a9c1f3ce26f217c1cc91e7f',
  'four-view: dialog GRAPH after Tab, 80x24':'cf5fc7275bd4218b015e8f1a0478e17453e016f8da373980e2cd4dc91380b3a7',
  'four-view: capped width and unsafe title, ascii=true':'6a4d3cc0601cc8d6daf1e2594fc2735817f4b65e1afd977062daf49a751540bc',
  'four-view: capped width and unsafe title, ascii=false':'203511a64e591ae0a2edf140b54d9ec8700a324fb97c7f211d110e0c94494755',
  'navigation: Enter collapses the highlighted row, 80x24':'ea24af365fa0ea59ca32c3667df4cd128a68ff5db0694a93c7005648c7e32671',
  'relation fidelity: direction and native kind, 120x40 ascii':'3d364b7f18376bcef4114d7b80487d2e03c8bc150a9c1f3ce26f217c1cc91e7f',
  'viewport: Escape hint at 32/80 x 18/24 ascii':'e0559356fa67981e86c8c60beb9644bd9f09e0a8030e310995bad82718e03f20',
  'graph footer under fan-out, 80x24 ascii':'95166a7f5eae5f03cf9a54cf10c83f71c1fb34b8195a8e94024adacad1d47b81',
  'graph direction: reverse reader edge at index 1, 120x40 ascii':'caca0731f8f74c31951eaa17e807da57d7a4a804c7a9048e6a9df45ca5e29fc7',
  'graph preview: two redraws without a topology change, 80x24':'7652ad55f053b116874b5627f078fec6249f44b2f70c18caab68f7f217c1b789',
  'graph cache invalidation: before and after a new edge, 120x40 ascii':'6de47acf1d5d4af165a678ca0d8ccd989baa66a74ac6c9fec7d5786370b24920',
  'B3 grouping cycles at three sizes, both tiers':'72ce56673b3b2b661d09dcdb6ef83c451adbd958caa49a39e5263eef6ceeeeaf',
  'B5 first two relations then a +N more count, 120x40 ascii':'44d7adc723b11d8440330fafd582f0b1bee4cbb9e01d2b0a79f20d8352ac7b2a',
  'B5 a self-loop listed once, 120x24 ascii':'2aa6e22facc092587537f8c261355ac804c843250156391c59d6f2d4ca17378f',
  'B5 a full relation page is suffixed (partial), 120x24 ascii':'79775a1645d814621f28a27b8c1aac172a3def55aba1287acf301b8f2c5d5a4c',
  'B6 bounds after 100k ingest updates, four widths, both tiers':'974fc52d6a9848b24891796e828bea3af50793c50a5dc9533bf3dd800777df35',
  'B6 graph blocks that do not fit are counted, 80x24 ascii':'55da4bdfc3bff0db72b1b922602f263fc4f4a5cd509ce6e10c714750882e8021',
  'B6 a graph selection past the row budget, 80x24 ascii':'61a97da12485d4f39cfdefa57267c921a78844f49b31853c84e19a4de8193dd7',
  'A1 evidence journey graph redraw, 80x24':'8dd8a047a9646dd859b0cbcd598c460c660e2150ac0b6d6630aabbe9789e0bc4',
  'attention AC6: the fixture graph view at 80x24 and 120x40, both tiers':'751aaf1213e8b6d9dc946cdcec953dfded5a56bad448ff311d0497b4d370042e',
 };
 const digest=async(text:string):Promise<string>=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))).toString('hex');
 it('AC4 the fallback table names every pre-existing graph-view case exactly once',()=>{
   expect(FALLBACK.map(([name])=>name).sort()).toEqual(Object.keys(BASE_DIGESTS).sort());
   expect(new Set(FALLBACK.map(([name])=>name)).size).toBe(FALLBACK.length);
 });
 it.each(FALLBACK)('AC4 without a model the graph view equals the base output: %s',async(name,render)=>{
   const outputs=render();
   expect(outputs.length).toBeGreaterThan(0);
   expect(outputs.every(text=>text.includes('Observed reference graph'))).toBe(true);
   expect(await digest(outputs.join('\n\u0000\n'))).toBe(BASE_DIGESTS[name]);
 });
 it('AC4 an explicitly undefined graph is the same as an absent one',()=>{
   const model=fixture();
   for(const size of [{width:80,rows:24,ascii:true},{width:120,rows:40}]) expect(draw({...model,graph:undefined},{},size)).toEqual(draw(model,{},size));
 });

 it('AC5 hostile producer text reaches no line raw through the real projection and model, and no line exceeds the terminal',()=>{
   // AC5: "a node label and a provenance source containing control, escape, zero-width and bidi characters render only through
   // safe()/visibleWidth". The credential literal is an obvious placeholder (standing rule 7).
   const hostile=`Bea${ZWSP}rer sk-ant-api03-FAKEPLACEHOLDERFAKEPLACEHOLDER ${RLO}flip${PDF} ${LRI}iso${PDI} ${CSI8}31mred${NEL} 漢字`;
   const projection=new ObservationProjection({maxEvents:32,maxNodes:32,maxEdges:32,maxQuery:40});
   for(const id of ['a','b','c','d']) projection.refresh({source:ref('forge',id),scope,capturedAt:now,observedAt:now,node:{...presentation(`${hostile} ${id}`),statusText:hostile},trace:{invocationId:'hostile'}});
   const relate=(from:string,to:string,kind:Kind)=>projection.relate({scope,from:ref('forge',from),to:ref('forge',to),kind,provenance:{source:hostile,observedAt:now}});
   relate('a','b','dependency');relate('c','c','grouping');relate('a','unseen','causation');relate('b','declared','dependency');
   for(const id of ['x1','x2','x3']) relate('d',id,'hypothesis');
   const graph=buildGraphView(projection,{scope,invocationId:'hostile',viewport:{offset:0,limit:4},caps:{relationLimit:2}});
   expect(graph.partials.some(entry=>entry.scope==='relations')).toBe(true);
   const model={projection,scope,invocationId:'hostile',title:hostile,status:'running',graph};
   for(const width of [80,120]) for(const ascii of [true,false]){
     const lines=draw(model,{},{width,rows:40,ascii});
     expect(lines.filter(line=>unsafe(line)).length,'lines with a raw unsafe unit').toBe(0);
     expect(lines.filter(line=>line.includes('FAKEPLACEHOLDER')).length,'lines with the credential tail').toBe(0);
     expect(lines.filter(line=>visibleWidth(line)>width).length,'lines wider than the terminal').toBe(0);
     // Every surface drew: four node rows, the edge, the declared row, the cycle and dynamic references, the partial label.
     expect(lines.filter(line=>line.includes('[REDACTED]')).length).toBeGreaterThanOrEqual(4);
     expect(lines.filter(line=>line.includes('unobserved endpoint'))).toHaveLength(1);
     expect(lines.filter(isReference).length).toBeGreaterThanOrEqual(2);
     expect(lines.some(line=>line.includes('partial'))).toBe(true);
   }
 });
 it('F6 a model carrying raw producer text on every string surface is still drawn only through safe()',()=>{
   const raw=`${ESC}[2J${ESC}]0;pwn${BEL}Bea${ZWSP}rer sk-ant-api03-FAKEPLACEHOLDERFAKEPLACEHOLDER ${RLO}flip${PDF} ${LRI}iso${PDI} ${CSI8}31m${NUL}end`;
   const projection=new ObservationProjection({maxEvents:16,maxNodes:16,maxEdges:16,maxQuery:40});
   for(const id of ['a','b']) projection.refresh({source:ref('forge',id),scope,capturedAt:now,observedAt:now,node:presentation(`Plain ${id}`),trace:{invocationId:'raw'}});
   const nodes=projection.window({scope,invocationId:'raw',offset:0,limit:2}).nodes;
   const [a,b]=nodes.map(node=>node.key);
   const unseen=JSON.stringify([scope.workspace,scope.principal,'forge','operation','',raw]);
   const graph:Graph={contract:GRAPH_VIEW_CONTRACT,revisionBasis:{revision:1,topologyRevision:1},complete:false,
     supernodes:[{key:`fanout:${a}`,from:a,label:raw,count:9,lowerBound:true,providers:[{provider:raw,count:9}],tones:[{tone:'active',count:9}],classes:['causation']}],
     nodes:nodes.map(node=>({key:node.key,nativeRef:node.nativeRef,provider:raw,type:'sdk-operation',label:`${raw} ${node.nativeRef.id}`,status:raw,tone:'active',freshness:'current'})),
     edges:[{from:a,to:b,class:'dependency',source:raw,confirmed:false,crossProvider:false}],
     references:[{reason:'cycle',from:b,to:b,class:'grouping',source:raw,confirmed:false},
       {reason:'endpoint-not-in-view',from:a,to:unseen,class:'causation',source:raw,confirmed:false},
       {reason:'endpoint-not-in-view',from:b,to:unseen,class:'dependency',source:raw,confirmed:false}],
     partials:[{scope:'relations',subject:a,direction:'outgoing',shown:1,label:raw}]};
   const model={projection,scope,invocationId:'raw',title:'Raw',status:'running',graph};
   for(const width of [80,120]) for(const ascii of [true,false]){
     const {sep}=glyphs(ascii);
     const lines=draw(model,{},{width,rows:40,ascii});
     expect(lines.filter(line=>unsafe(line)).length,'lines with a raw unsafe unit').toBe(0);
     expect(lines.filter(line=>line.includes('FAKEPLACEHOLDER')||line.includes('[2J')).length,'lines with raw producer text').toBe(0);
     expect(lines.filter(line=>visibleWidth(line)>width).length,'lines wider than the terminal').toBe(0);
     expect(lines.filter(line=>line.includes(`aggregate${sep}`))).toHaveLength(1);
     expect(lines.filter(line=>line.includes('unobserved endpoint'))).toHaveLength(1);
     expect(lines.filter(isReference)).toHaveLength(2);
     expect(lines.filter(line=>line.includes(`partial${sep}`))).toHaveLength(1);
     expect(lines.filter(line=>line.includes('[REDACTED]')).length).toBeGreaterThanOrEqual(6);
   }
 });
 it('SG a bidi or zero-width identity from the real projection never reaches a graph line raw; what the model holds is drawn through the label layout',()=>{
   // wb-6ze.34 SURFACE-GATE line (owner ruling ii on wb-6ze.32 F4): keys and nativeRef reach the model verbatim, so this view
   // renders only sanitized label fields and routes any other identity through the named label layout. Admission decides what
   // reaches the model (trunk admits these identities; a typed identity refusal would keep them out), so the drawn counts follow
   // what the model holds and the raw-unit census holds either way.
   const projection=new ObservationProjection({maxEvents:16,maxNodes:32,maxEdges:32,maxQuery:40});
   projection.refresh({source:ref('forge','planner'),scope,capturedAt:now,observedAt:now,node:presentation('Planner'),trace:{invocationId:'identity'}});
   projection.refresh({source:{provider:`for${ZWSP}ge`,type:'operation',id:`agent${RLO}`},scope,capturedAt:now,observedAt:now,node:presentation('Agent'),trace:{invocationId:'identity'}});
   projection.relate({scope,from:ref('forge','planner'),to:ref('forge',`ghost${ZWSP}${RLO}`),kind:'dependency',provenance:{source:'fixture-producer',observedAt:now}});
   projection.relate({scope,from:ref('forge','planner'),to:{provider:'forge',type:`op${LRI}`,id:`dyn${ZWJ}`},kind:'causation',provenance:{source:'fixture-producer',observedAt:now}});
   const graph=buildGraphView(projection,{scope,invocationId:'identity',viewport:{offset:0,limit:10}});
   const declared=graph.references.filter(entry=>entry.class==='dependency').length;
   const dynamic=graph.references.filter(entry=>entry.class==='causation').length;
   const agent=graph.nodes.filter(node=>node.label==='Agent').length;
   const model={projection,scope,invocationId:'identity',title:'Identity',status:'running',graph};
   for(const width of [80,120]) for(const ascii of [true,false]){
     const lines=draw(model,{},{width,rows:40,ascii});
     expect(lines.filter(line=>unsafe(line)).length,'lines with a raw unsafe unit').toBe(0);
     expect(lines.filter(line=>visibleWidth(line)>width).length,'lines wider than the terminal').toBe(0);
     // The fixed vocabulary leads each row, so the markers survive any width.
     expect(lines.filter(line=>line.includes('unobserved endpoint')).length).toBe(declared);
     expect(lines.filter(line=>isReference(line)&&line.includes('unknown dynamic edge')).length).toBe(dynamic);
   }
   // At 120 columns the identities are drawn whole: through the label layout, invisibles gone and controls spaced.
   for(const ascii of [true,false]){
     const lines=draw(model,{},{width:120,rows:40,ascii});
     expect(lines.filter(line=>line.includes('forge/operation/ghost')&&line.includes('unobserved endpoint')).length).toBe(declared);
     expect(lines.filter(line=>isReference(line)&&line.includes('forge/op /dyn')).length).toBe(dynamic);
     expect(nodeRows(lines,'Agent',ascii).filter(line=>line.includes(`${glyphs(ascii).sep}forge${glyphs(ascii).sep}`)).length).toBe(agent);
   }
 });
 it('SG an over-long identity is drawn through the label layout bound, so the provenance tail stays on a wide row',()=>{
   // The named label layout bounds identity text (topologyText, 160 units); the terminal pass in add() alone would draw a
   // never-observed key at its full length and push the provenance tail out of the row.
   const projection=new ObservationProjection({maxEvents:16,maxNodes:16,maxEdges:16,maxQuery:40});
   projection.refresh({source:ref('forge','planner'),scope,capturedAt:now,observedAt:now,node:presentation('Planner'),trace:{invocationId:'long'}});
   const id='x'.repeat(200);
   projection.relate({scope,from:ref('forge','planner'),to:ref('forge',id),kind:'dependency',provenance:{source:'fixture-producer',observedAt:now}});
   projection.relate({scope,from:ref('forge','planner'),to:ref('forge',`y${id}`),kind:'causation',provenance:{source:'fixture-producer',observedAt:now}});
   const graph=buildGraphView(projection,{scope,invocationId:'long',viewport:{offset:0,limit:10}});
   expect(graph.references.map(entry=>entry.class).sort()).toEqual(['causation','dependency']);
   const model={projection,scope,invocationId:'long',title:'Long',status:'running',graph};
   for(const ascii of [true,false]){
     const lines=draw(model,{},{width:400,rows:40,ascii});
     expect(lines.filter(line=>line.includes(id)).length,'rows drawing the identity unbounded').toBe(0);
     expect(lines.filter(line=>line.includes('unobserved endpoint')&&line.includes(' [truncated] [fixture-producer]'))).toHaveLength(1);
     expect(lines.filter(line=>isReference(line)&&line.includes(' [truncated] [fixture-producer]'))).toHaveLength(1);
   }
 });
 it('draws from the model alone: no relation page is read and the legacy per-node blocks are gone',()=>{
   const {model}=graphFixture();
   const relations=vi.spyOn(model.projection,'relations');
   const pages=vi.spyOn(model.projection,'relationsPage');
   try {
     const lines=[true,false].flatMap(ascii=>draw(model,{},{width:120,rows:40,ascii}));
     expect(relations).not.toHaveBeenCalled();
     expect(pages).not.toHaveBeenCalled();
     expect(lines.some(line=>line.includes('fan-out collapsed; bounded'))).toBe(false);
   } finally {relations.mockRestore();pages.mockRestore();}
 });
 it('keeps selection, collapse, focus and filter semantics over the model rows',()=>{
   const {model,keyOf}=graphFixture();
   const selected=draw(model,{selected:keyOf('Build')});
   expect(selected.filter(line=>line.startsWith(' > '))).toHaveLength(1);
   expect(nodeRows(selected,'Build',true)[0]?.startsWith(' > ')).toBe(true);
   const folded=draw(model,{collapsed:[keyOf('Build')]});
   expect(folded.some(line=>line.includes('declared dependency -> Test'))).toBe(false);
   expect(folded.some(line=>line.includes('... 1 relation collapsed'))).toBe(true);
   // Focus keeps the focused row with every edge drawn with it, whichever end it is.
   const focused=draw(model,{focused:keyOf('Test')});
   expect(nodeRows(focused,'Test',true)).toHaveLength(1);
   expect(nodeRows(focused,'Build',true)).toHaveLength(0);
   expect(focused.some(line=>line.includes('declared dependency <- Build [fixture-producer]'))).toBe(true);
   expect(focused.some(line=>line.includes('aggregate'))).toBe(false);
   expect(focused.some(isReference)).toBe(false);
   // A filter matches the label or the native provider/type/id, as the legacy blocks did.
   const hubs=draw(model,{filter:'HUB'});
   expect(hubs.filter(line=>line.includes('aggregate | '))).toHaveLength(2);
   expect(nodeRows(hubs,'Hub A',true)).toHaveLength(1);
   expect(nodeRows(hubs,'Build',true)).toHaveLength(0);
   expect(hubs.some(isReference)).toBe(false);
   expect(nodeRows(draw(model,{filter:'operation/planner'}),'Planner',true)).toHaveLength(1);
 });
 it('draws each block whole or counts it: at every height each model entry is drawn or counted, with the footer and key hint kept',()=>{
   const {model,graph,keyOf}=graphFixture();
   const declared=graph.references.filter(entry=>entry.reason==='endpoint-not-in-view'&&entry.class==='dependency').length;
   const totalEdges=graph.edges.length+declared;
   const totalReferences=graph.references.length-declared;
   for(const rows of [10,12,14,16,18,24]) for(const ascii of [true,false]) for(const selected of [null,keyOf('Planner')]){
     const {sep,dots}=glyphs(ascii);
     const lines=draw(model,{selected},{width:120,rows,ascii});
     expect(lines.length).toBeLessThanOrEqual(rows);
     expect(lines.at(-1)).toContain('Esc');
     expect(lines.some(line=>line.includes('Topology incomplete unless native relationships are explicitly supplied.'))).toBe(true);
     const notice=lines.find(line=>line.includes('(row budget)'))??'';
     const counted=(word:string)=>Number(new RegExp(`(\\d+) ${word}`).exec(notice)?.[1]??0);
     const drawnNodes=graph.nodes.filter(node=>nodeRows(lines,node.label,ascii).length===1).length;
     expect(drawnNodes+counted('node')).toBe(graph.nodes.length);
     expect(lines.filter(line=>line.includes(`aggregate${sep}`)).length+counted('aggregate')).toBe(graph.supernodes.length);
     expect(lines.filter(isReference).length+counted('reference')).toBe(totalReferences);
     const edgeRows=lines.filter(line=>!isReference(line)&&/^(declared dependency|observed causal|grouping) /.test(line.trimStart())&&/ (->|<-|→|←) /.test(line)).length;
     expect(edgeRows+counted('edge')).toBe(totalEdges);
     // A selection the budget cuts stays visible on the notice.
     if(selected!==null && !lines.some(line=>line.includes('Planner'+sep))) expect(notice.startsWith(` ${ascii?'>':'❯'} ${dots}`)).toBe(true);
   }
 });
 it('bounds one block: a focused row with more than eight edges lists eight and counts the rest',()=>{
   const projection=new ObservationProjection({maxEvents:32,maxNodes:32,maxEdges:32,maxQuery:40});
   projection.refresh({source:ref('forge','sink'),scope,capturedAt:now,observedAt:now,node:presentation('Sink'),trace:{invocationId:'sink'}});
   for(let i=0;i<12;i++){
     projection.refresh({source:ref('forge',`s${i}`),scope,capturedAt:now,observedAt:now,node:presentation(`Source ${i}`),trace:{invocationId:'sink'}});
     projection.relate({scope,from:ref('forge',`s${i}`),to:ref('forge','sink'),kind:'dependency',provenance:{source:'fixture-producer',observedAt:now}});
   }
   const graph=buildGraphView(projection,{scope,invocationId:'sink',viewport:{offset:0,limit:13}});
   const sink=graph.nodes.find(node=>node.label==='Sink')?.key??null;
   const lines=draw({projection,scope,invocationId:'sink',title:'Sink',status:'running',graph},{focused:sink});
   expect(lines.filter(line=>line.includes('declared dependency <- Source'))).toHaveLength(8);
   expect(lines.some(line=>line.includes('... +4 more edges of this node (bounded)'))).toBe(true);
 });
});

describe('W15-A lazy bounded evidence in the details view (wb-g1g.1, docs/workbench/20)',()=>{
 const evidenceRefs=['ev:alpha','ev:beta','ev:gamma'];
 const sizes=[{width:80,rows:24},{width:120,rows:40}];
 const tiers=[true,false];
 interface Counting extends EvidenceLoader{calls:string[]}
 function loader(handler:(ref:string,signal:AbortSignal)=>Promise<EvidenceContent>=async ref=>({kind:'fixture',provider:'forge',capturedAt:now,bytes:ref.length,truncated:false,preview:[`payload for ${ref}`],freshness:'current'})):Counting{
   const calls:string[]=[];
   return {provider:'forge',requiredGrant:'forge:inspect',calls,canLoad:ref=>ref.startsWith('ev:'),load:request=>{calls.push(request.evidenceRef);return handler(request.evidenceRef,request.signal);}};
 }
 function evidenceFixture(source:Counting,extra:Partial<ConstructorParameters<typeof EvidenceStore>[0]>={}){
   const projection=new ObservationProjection({maxEvents:16,maxNodes:100,maxEdges:100,maxQuery:40});
   projection.refresh({source:ref('forge','gate'),scope,capturedAt:now,observedAt:now,node:{...presentation('Gate'),statusText:'success',statusTone:'success'},trace:{invocationId:'workflow-ev'},coverage:'complete',evidenceRefs});
   projection.refresh({source:ref('furnace','run'),scope,capturedAt:now,observedAt:now,node:presentation('Run'),trace:{invocationId:'workflow-ev'},coverage:'partial'});
   const store=new EvidenceStore({loaders:[source],maxEntries:8,maxBytes:2048,timeoutMs:200,scope,...extra});
   const model:InspectorModel={projection,scope,invocationId:'workflow-ev',title:'Evidence workflow',status:'running',evidence:store};
   return {model,store};
 }
 const toDetails=(model:InspectorModel):ReturnType<typeof initialInspectorState>=>{
   let state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
   state=reduceInspectorKey('k',state,model)!.state;
   return reduceInspectorKey('s',state,model)!.state;
 };
 const text=(model:InspectorModel,state:ReturnType<typeof initialInspectorState>,size:{width:number;rows:number},ascii:boolean)=>layoutInspector(model,state,{...size,ascii}).join('\n');

 it('A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection',async()=>{
   const source=loader();const {model,store}=evidenceFixture(source);
   let state=initialInspectorState();
   for(const view of ['graph','timeline','details','overview'] as const){layoutInspector(model,state,{width:80,rows:24});state=reduceInspectorKey('\t',state,model)!.state;expect(state.view).toBe(view);}
   state=toDetails(model);
   const first=text(model,state,sizes[0],true);
   expect(first).toContain('not loaded (Enter)');
   expect(source.calls).toHaveLength(0);
   const moved=reduceInspectorKey('e',state,model)!;
   expect(moved.state.evidenceIndex).toBe(1);expect(moved.action).toBeUndefined();
   expect(reduceInspectorKey('e',reduceInspectorKey('e',moved.state,model)!.state,model)!.state.evidenceIndex).toBe(0);
   layoutInspector(model,moved.state,{width:80,rows:24});
   expect(source.calls).toHaveLength(0);
   const entered=reduceInspectorKey('\r',moved.state,model)!;
   expect(entered.action).toBe('load-evidence');
   expect(entered.state).toEqual(moved.state);
   expect(source.calls).toHaveLength(0);
   const target=inspectorEvidenceTarget(model,entered.state)!;
   expect(target.evidenceRef).toBe('ev:beta');
   await store.request(target.scope,target.nativeRef,target.evidenceRef);
   expect(source.calls).toEqual(['ev:beta']);
   const after=text(model,entered.state,sizes[0],true);
   expect(after).toContain('payload for ev:beta');
   expect(after).not.toContain('payload for ev:alpha');
 });

 it('A2 j/k reset the evidence selection',()=>{
   const {model}=evidenceFixture(loader());
   let state=toDetails(model);
   state=reduceInspectorKey('e',state,model)!.state;expect(state.evidenceIndex).toBe(1);
   expect(reduceInspectorKey('j',state,model)!.state.evidenceIndex).toBe(0);
   expect(reduceInspectorKey('k',state,model)!.state.evidenceIndex).toBe(0);
 });

 it('A3 e outside the details view still opens it; a node without references has no load action',()=>{
   const {model}=evidenceFixture(loader());
   let state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
   state=reduceInspectorKey('j',state,model)!.state;
   const opened=reduceInspectorKey('e',state,model)!.state;
   expect(opened.view).toBe('details');
   const noRefs=reduceInspectorKey('\r',opened,model)!;
   expect(noRefs.action).toBeUndefined();
   expect(inspectorEvidenceTarget(model,opened)).toBeUndefined();
 });

 it.each(sizes.flatMap(size=>tiers.map(ascii=>[size,ascii] as const)))('A4 every state renders as a visible label at %j ascii=%s, and preview text only for loaded',async(size,ascii)=>{
   const mixed:Record<string,(signal:AbortSignal)=>Promise<EvidenceContent>>={
     'ev:alpha':async()=>({kind:'k',provider:'forge',capturedAt:now,bytes:11,truncated:false,preview:['loaded line one','loaded line two'],freshness:'current'}),
     'ev:beta':()=>new Promise<EvidenceContent>(()=>{}),
     'ev:gamma':async()=>{throw new Error('SECRET transport detail');},
   };
   const source=loader((reference,signal)=>mixed[reference](signal));
   const {model,store}=evidenceFixture(source,{timeoutMs:5000});
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   for(const reference of evidenceRefs) void store.request(node.scope,node.nativeRef,reference);
   await new Promise(resolve=>setTimeout(resolve,20));
   const rendered=text(model,state,size,ascii);
   expect(rendered).toContain('loaded');expect(rendered).toContain('loaded line one');
   expect(rendered).toMatch(/loading(\.\.\.|…)/);
   expect(rendered).toContain('unavailable: transport');
   expect(rendered).not.toContain('SECRET');
   // a ref nobody can load, and one that times out, stay visible unknowns
   const orphan=new EvidenceStore({loaders:[],maxEntries:4,maxBytes:1024,timeoutMs:50,scope});
   const noLoader=layoutInspector({...model,evidence:orphan},state,{...size,ascii});
   void orphan.request(node.scope,node.nativeRef,'ev:alpha');
   await new Promise(resolve=>setTimeout(resolve,5));
   expect(noLoader.join('\n')).toContain('not loaded (Enter)');
   expect(layoutInspector({...model,evidence:orphan},state,{...size,ascii}).join('\n')).toContain('unavailable: no-loader');
   const slow=loader(()=>new Promise<EvidenceContent>(()=>{}));
   const timing=new EvidenceStore({loaders:[slow],maxEntries:4,maxBytes:1024,timeoutMs:10,scope});
   await timing.request(node.scope,node.nativeRef,'ev:alpha');
   const timed=layoutInspector({...model,evidence:timing},state,{...size,ascii});
   expect(timed.join('\n')).toContain('unavailable: timeout');
   expect(timed.join('\n')).not.toContain('payload for');
   for(const lines of [timed,layoutInspector(model,state,{...size,ascii})]){
     expect(lines.length).toBeLessThanOrEqual(size.rows);
     expect(lines.every(line=>visibleWidth(line)<=size.width)).toBe(true);
   }
 });

 it.each(sizes.flatMap(size=>tiers.map(ascii=>[size,ascii] as const)))('A5 hostile preview is sanitized, redacted and width-bounded at %j ascii=%s',async(size,ascii)=>{
   const hostile=['\x1b[31mred\x1b[0m \u202Ereversed\u200Bzero',`Authorization: Bearer abc123 ${'W'.repeat(400)}`,'{"api_key":"xyz"}','漢字'.repeat(80)];
   const {model,store}=evidenceFixture(loader(async()=>({kind:'k',provider:'forge',capturedAt:now,bytes:900,truncated:false,preview:hostile,freshness:'current'})));
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   await store.request(node.scope,node.nativeRef,'ev:alpha');
   const lines=layoutInspector(model,state,{...size,ascii});
   const rendered=lines.join('\n');
   expect(rendered).toContain('[REDACTED]');
   for(const forbidden of ['\x1b','\u202e','\u200b','abc123','xyz']) expect(rendered).not.toContain(forbidden);
   expect(lines.length).toBeLessThanOrEqual(size.rows);
   expect(lines.every(line=>visibleWidth(line)<=size.width)).toBe(true);
 });

 it('A6 a loaded entry never changes status text, tone glyph or the confirmed/definition lines',async()=>{
   const {model,store}=evidenceFixture(loader());
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   const pick=(rendered:string)=>rendered.split('\n').filter(line=>/Status:|Freshness:|Confirmed:|Basis:|Definition:/.test(line));
   const before=pick(text(model,state,sizes[1],false));
   await store.request(node.scope,node.nativeRef,'ev:alpha');
   expect(pick(text(model,state,sizes[1],false))).toEqual(before);
   expect(before.join('\n')).toContain('success');
   const overview=layoutInspector(model,initialInspectorState(),{width:120,rows:40}).join('\n');
   expect(overview).not.toContain('Verified');
 });

 it('A7 Esc and ctrl+c while loading only close; abort stops the local read and nothing touches the projection',async()=>{
   let seen:AbortSignal|undefined;
   const {model,store}=evidenceFixture(loader((_ref,signal)=>{seen=signal;return new Promise<EvidenceContent>(()=>{});}));
   const mutators=[vi.spyOn(model.projection,'refresh'),vi.spyOn(model.projection,'ingest'),vi.spyOn(model.projection,'relate'),
     vi.spyOn(model.projection,'disconnect'),vi.spyOn(model.projection,'reconnect'),vi.spyOn(model.projection,'markStale')];
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   void store.request(node.scope,node.nativeRef,'ev:alpha');
   expect(store.get(node.scope,node.nativeRef,'ev:alpha')).toEqual({state:'loading'});
   expect(layoutInspector(model,state,{width:80,rows:24}).join('\n')).toMatch(/loading/);
   expect(reduceInspectorKey('\x03',state,model)?.action).toBe('close');
   const back=reduceInspectorKey('\x1b',state,model)!;
   expect(back.action).toBeUndefined();expect(back.state.view).toBe('overview');
   expect(reduceInspectorKey('\x1b',back.state,model)?.action).toBe('close');
   store.abort(node.scope,node.nativeRef,'ev:alpha');
   expect(seen?.aborted).toBe(true);
   expect(store.get(node.scope,node.nativeRef,'ev:alpha')).toEqual({state:'not-requested'});
   for(const spy of mutators) expect(spy).not.toHaveBeenCalled();
 });

 it('A8 layoutInspector is synchronous and never awaits a pending loader',()=>{
   const {model,store}=evidenceFixture(loader(()=>new Promise<EvidenceContent>(()=>{})));
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   void store.request(node.scope,node.nativeRef,'ev:alpha');
   const result=layoutInspector(model,state,{width:80,rows:24});
   expect(Array.isArray(result)).toBe(true);
   expect(result.join('\n')).toMatch(/loading/);
 });

 it('A9 without a store the details view is the pre-existing rendering and Enter still folds',()=>{
   const {model}=evidenceFixture(loader());
   const plain:InspectorModel={...model};delete plain.evidence;
   const state=toDetails(plain);
   const rendered=text(plain,state,sizes[0],true);
   expect(rendered).toContain('producer references, not fetched payload');
   expect(rendered).toContain('  ev:alpha');
   expect(rendered).not.toContain('not loaded');
   const entered=reduceInspectorKey('\r',state,plain)!;
   expect(entered.action).toBeUndefined();
   expect(entered.state.collapsed.length).toBe(1);
 });

 it('A10 a cross-scope store refuses the node reference and its loader is never invoked',()=>{
   const source=loader();
   const {model}=evidenceFixture(source,{scope:{workspace:'elsewhere',principal:'reader'}});
   const state=toDetails(model);
   expect(text(model,state,sizes[0],true)).toContain('unavailable: unauthorized');
   expect(source.calls).toHaveLength(0);
 });

 it('A11 claude evidence is refused unauthorized without the claude:transcript grant, rendered byte-identical to a revoked grant, and loaded with it',async()=>{
   const uuid='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
   const build=(grants:string[])=>{
     const projection=new ObservationProjection({maxEvents:16,maxNodes:100,maxEdges:100,maxQuery:40});
     projection.refresh({source:{provider:'claude-agent-sdk',type:'session',id:'s1'},scope,capturedAt:now,observedAt:now,node:presentation('Claude'),trace:{invocationId:'wf-c'},coverage:'partial',evidenceRefs:[`claude-message:${uuid}`]});
     const readRows=vi.fn(async()=>[{type:'assistant' as const,uuid,text:'claude says hi'}]);
     const claude:ClaudeEvidenceSeam={readTranscript:readRows,cwd:()=>'/ws',owningNode:(owningScope,nativeRef,ref)=>{
       const owner=projection.query({scope:owningScope,ref:nativeRef,limit:1}).nodes[0];
       return owner?.evidenceRefs.includes(ref)?{nativeRef:owner.nativeRef,evidenceRefs:owner.evidenceRefs,freshness:owner.freshness}:undefined;
     }};
     const store=new EvidenceStore({loaders:createEvidenceLoaders({grants:()=>grants,claude,now:()=>new Date(now)}),maxEntries:4,maxBytes:1024,timeoutMs:200,scope});
     const model:InspectorModel={projection,scope,invocationId:'wf-c',title:'C',status:'running',evidence:store};
     return {model,store,readRows};
   };
   const denied=build([]);const state=toDetails(denied.model);const node=inspectorEvidenceTarget(denied.model,state)!;
   await denied.store.request(node.scope,node.nativeRef,node.evidenceRef);
   expect(text(denied.model,state,sizes[1],true)).toContain('unavailable: unauthorized');
   expect(denied.readRows).not.toHaveBeenCalled();
   const held=[CLAUDE_TRANSCRIPT_GRANT];const revoked=build(held);held.length=0;
   await revoked.store.request(node.scope,node.nativeRef,node.evidenceRef);
   expect(text(denied.model,state,sizes[1],true)).toBe(text(revoked.model,toDetails(revoked.model),sizes[1],true));
   expect(revoked.readRows).not.toHaveBeenCalled();
   const granted=build([CLAUDE_TRANSCRIPT_GRANT]);
   await granted.store.request(node.scope,node.nativeRef,node.evidenceRef);
   expect(text(granted.model,toDetails(granted.model),sizes[1],true)).toContain('claude says hi');
 });

 it('A12 the dialog does not treat load-evidence as close or cancel',()=>{
   const {model}=evidenceFixture(loader());
   const done=vi.fn(),onKill=vi.fn();
   const dialog=new WorkflowDialog({requestRender:vi.fn(),terminal:{rows:24,columns:80}} as never,
     ()=>({progress:[],task:{status:'running',workflowName:'Evidence',startTime:1},observation:model}),
     {fg:(_color:string,text:string)=>text,bold:(text:string)=>text} as never,done,{onKill});
   dialog.handleInput('s');dialog.handleInput('\r');
   expect(done).not.toHaveBeenCalled();expect(onKill).not.toHaveBeenCalled();
   dialog.dispose();
 });

 it('A13 a refusal thrown by a loader surfaces as its typed reason in the view',async()=>{
   const {model,store}=evidenceFixture(loader(async()=>{throw new EvidenceRefusal('too-large');}));
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   await store.request(node.scope,node.nativeRef,'ev:alpha');
   expect(text(model,state,sizes[0],true)).toContain('unavailable: too-large');
 });

 it('A14 a stale or disconnected owner labels loaded evidence stale and a failed read as transport plus stale',async()=>{
   const {model,store}=evidenceFixture(loader());
   const state=toDetails(model);const node=inspectorEvidenceTarget(model,state)!;
   await store.request(node.scope,node.nativeRef,'ev:alpha');
   model.projection.disconnect('forge');
   const rendered=text(model,state,sizes[1],true);
   expect(rendered).toMatch(/loaded.*stale/);
 });
});

describe('details view renders code-point-safe evidence previews (wb-v53)',()=>{
 const LONE_SURROGATE=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
 it('a surrogate-pair preview renders no lone surrogate at 120x40 in the Unicode tier and stays within width',async()=>{
   const emoji:EvidenceLoader={provider:'forge',requiredGrant:'forge:inspect',canLoad:evidenceRef=>evidenceRef.startsWith('ev:'),
     load:async()=>({kind:'fixture',provider:'forge',capturedAt:now,bytes:400,truncated:false,preview:['a'+'😀'.repeat(130)],freshness:'current'})};
   const projection=new ObservationProjection({maxEvents:16,maxNodes:100,maxEdges:100,maxQuery:40});
   projection.refresh({source:ref('forge','gate'),scope,capturedAt:now,observedAt:now,node:{...presentation('Gate'),statusText:'success',statusTone:'success'},trace:{invocationId:'workflow-emoji'},coverage:'complete',evidenceRefs:['ev:alpha']});
   const store=new EvidenceStore({loaders:[emoji],maxEntries:8,maxBytes:2048,timeoutMs:200,scope});
   const model:InspectorModel={projection,scope,invocationId:'workflow-emoji',title:'Emoji workflow',status:'running',evidence:store};
   let state=reduceInspectorKey('j',initialInspectorState(),model)!.state;
   state=reduceInspectorKey('k',state,model)!.state;
   state=reduceInspectorKey('s',state,model)!.state;
   const node=inspectorEvidenceTarget(model,state)!;
   await store.request(node.scope,node.nativeRef,'ev:alpha');
   const lines=layoutInspector(model,state,{width:120,rows:40,ascii:false});
   expect(lines.join('\n')).toContain('😀');
   for(const line of lines){expect(line).not.toMatch(LONE_SURROGATE);expect(visibleWidth(line)).toBeLessThanOrEqual(120);}
 });
});

// wb-6ze.21 (W15-C2 / VC-5): the overview renders the optional AttentionReport the caller computed. Spec quotes are from
// docs/workbench/10-terminal-inspector.md and docs/workbench/09-observation-and-provenance.md.
describe('W15-C2 attention panel in the inspector overview',()=>{
 const bottleneck=(n:number,over:Partial<AttentionBottleneck>={}):AttentionBottleneck=>({
   key:`k${n}`,nativeRef:ref(n%2?'forge':'furnace',`b${n}`),title:`Bottleneck ${n}`,tone:'active',freshness:'current',openMs:61_000+n*1000,measured:true,...over});
 const report=(over:Partial<AttentionReport>={}):AttentionReport=>({
   contract:ATTENTION_CONTRACT,basis:'observed',now,examined:{nodes:6,truncated:false},
   counts:{active:2,waiting:3,success:0,failure:0,unknown:1,stale:4,disconnected:1,withInterval:2,withoutInterval:4},
   disconnectedProviders:['furnace'],bottlenecks:[bottleneck(1),bottleneck(2,{tone:'waiting',freshness:'stale',openMs:5_000})],
   unmeasured:0,clockSkew:0,criticalPath:{label:'incomplete-trace',reasons:['no-dependency-edges']},clockCaveat:ATTENTION_CLOCK_CAVEAT,...over});
 const partial:AttentionReport['criticalPath']={label:'partial-estimated',keys:['a','b','c'],measuredMs:61_000,coverage:{chainNodes:3,dependencyEdges:2},caveat:ATTENTION_CRITICAL_PATH_CAVEAT};
 /** Six observed nodes: every tree row fits, so the panel is judged without paging. */
 const small=(attention?:AttentionReport):InspectorModel=>{
   const projection=new ObservationProjection({maxEvents:16,maxNodes:100,maxEdges:100,maxQuery:40});
   for(let i=0;i<6;i++) projection.refresh({source:ref(i%2?'forge':'furnace',String(i)),scope,capturedAt:now,observedAt:now,node:presentation(`Small ${i}`),trace:{invocationId:'workflow-1'},coverage:'partial'});
   return {projection,scope,invocationId:'workflow-1',title:'Small workflow',status:'running',...(attention?{attention}:{})};
 };
 const withAttention=(model:InspectorModel,attention:AttentionReport):InspectorModel=>({...model,attention});
 const overview=(model:InspectorModel,width:number,rows:number,ascii:boolean)=>layoutInspector(model,initialInspectorState(),{width,rows,ascii});
 const flat=(lines:readonly string[])=>lines.join('\n').replace(/\s+/g,' ');
 const countsLine=(lines:readonly string[])=>lines.find(line=>line.trimStart().startsWith('Attention: active'));
 const zeroWidth=/[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/u;

 it('AC1 supplies the counts line, every bottleneck row and the critical-path line at 80x24 ASCII',()=>{
   const lines=overview(small(report()),80,24,true);
   expect(countsLine(lines)).toContain('active 2');
   const rows=lines.filter(line=>/Bottleneck \d/.test(line));
   expect(rows).toHaveLength(2);
   expect(rows[0]).toMatch(/Bottleneck 1 .*forge .*open 01:02 measured .*CURRENT/);
   expect(rows[1]).toMatch(/Bottleneck 2 .*furnace .*open 00:05 measured .*STALE/);
   expect(flat(lines)).toContain('Critical path: incomplete trace (no-dependency-edges)');
   expect(lines.join('\n')).not.toContain('Attention: stale/unknown is last-known state');
 });
 it('AC1 a partial-estimated critical path names its measured time, coverage and caveat',()=>{
   const lines=overview(small(report({criticalPath:partial})),80,24,true);
   const text=flat(lines);
   expect(text).toContain('Critical path: partial-estimated 01:01 over 3 nodes/2 edges');
   expect(text).toContain(ATTENTION_CRITICAL_PATH_CAVEAT);
   for(const line of lines) expect(visibleWidth(line)).toBeLessThanOrEqual(80);
 });
 it('AC1 an incomplete-trace critical path lists every reason and nothing estimated or numeric',()=>{
   const reasons:AttentionReport['criticalPath']={label:'incomplete-trace',reasons:['no-dependency-edges','missing-intervals','open-intervals','hypothesis-edges','cycle','truncated']};
   const lines=overview(small(report({criticalPath:reasons,bottlenecks:[]})),80,24,true);
   const text=flat(lines);
   for(const reason of ['no-dependency-edges','missing-intervals','open-intervals','hypothesis-edges','cycle','truncated']) expect(text).toContain(reason);
   expect(text).not.toContain('estimated');
   const at=lines.findIndex(line=>line.trimStart().startsWith('Critical path:'));
   const cp=lines.slice(at,lines.findIndex(line=>line.includes('Tab views'))).join(' ');
   expect(cp).not.toMatch(/\d/);
 });
 it('AC2 renders waiting, stale, unknown, active and disconnected as five distinct labelled numbers',()=>{
   const line=countsLine(overview(small(report()),120,40,false))!;
   expect(line).toMatch(/active 2\b/);
   expect(line).toMatch(/waiting 3\b/);
   expect(line).toMatch(/stale 4\b/);
   expect(line).toMatch(/unknown 1\b/);
   expect(line).toMatch(/disconnected 1\b/);
   expect(line).toContain('(providers: furnace)');
   // Mutation: a counts line that folds waiting into active or drops its label must not satisfy the same matcher.
   expect(line.replace('waiting 3','active 5')).not.toMatch(/waiting 3\b/);
   expect(line.replace(/ ·? ?waiting 3/,'')).not.toMatch(/waiting/);
 });
 it('AC2 never folds tones: different counts move only their own label',()=>{
   const line=countsLine(overview(small(report({counts:{...report().counts,active:0,waiting:7,stale:0,unknown:9,disconnected:0}})),120,40,true))!;
   expect(line).toMatch(/active 0\b.*waiting 7\b.*stale 0\b.*unknown 9\b.*disconnected 0\b/);
 });
 it('AC2 a stale node bottleneck row carries STALE and a current one CURRENT',()=>{
   const lines=overview(small(report()),120,40,true);
   expect(lines.find(line=>line.includes('Bottleneck 2'))).toContain('STALE');
   expect(lines.find(line=>line.includes('Bottleneck 1'))).not.toContain('STALE');
 });
 it('AC3 open time appears only on measured rows; unmeasured and skew are counted, never timed',()=>{
   const lines=overview(small(report({unmeasured:2,clockSkew:1})),80,24,true);
   const text=flat(lines);
   expect(text).toContain('+2 unmeasured (no open interval)');
   expect(text).toContain('clock skew 1 (clamped)');
   expect(lines.filter(line=>/\b\d\d:\d\d\b/.test(line))).toHaveLength(2);
   expect(lines.find(line=>line.includes('unmeasured'))).not.toMatch(/\d\d:\d\d|\d+ms/);
   expect(text).toContain(ATTENTION_CLOCK_CAVEAT);
   const quiet=flat(overview(small(report({unmeasured:0,clockSkew:0})),80,24,true));
   expect(quiet).not.toContain('unmeasured');
   expect(quiet).not.toContain('clock skew');
 });
 it('AC3 a row whose report entry is not measured renders no open time',()=>{
   const unmeasuredRow={...bottleneck(3),measured:false} as unknown as AttentionBottleneck;
   const row=overview(small(report({bottlenecks:[unmeasuredRow]})),80,24,true).find(line=>line.includes('Bottleneck 3'))!;
   expect(row).toBeDefined();
   expect(row).not.toMatch(/\d\d:\d\d/);
   expect(row).not.toMatch(/open \S+ measured/);
 });
 it('AC4 compacts to the counts and critical-path lines below 80 columns or 20 rows',()=>{
   for(const [width,rows] of [[60,18],[79,24],[80,19]] as const){
     const lines=overview(small(report({unmeasured:2,clockSkew:1,criticalPath:partial})),width,rows,true);
     const text=flat(lines);
     expect(countsLine(lines)).toContain('active 2');
     expect(text).toContain('Critical path: partial-estimated 01:01');
     expect(text).not.toContain('Bottleneck');
     expect(text).not.toContain('unmeasured');
     expect(text).not.toContain('clock skew');
     expect(text).not.toContain('caller clock');
     expect(lines.some(line=>line.includes('Tab views'))).toBe(true);
     for(const line of lines) expect(visibleWidth(line)).toBeLessThanOrEqual(width);
   }
 });
 it.each([[80,24],[120,40],[60,18]] as const)('AC4 every line fits %ix%i in both tiers with hostile bottleneck text',(width,rows)=>{
   const hostile=report({bottlenecks:[bottleneck(1,{title:'\x1b[31mred\u202eevil\u200bzero 漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字'})],disconnectedProviders:['p\x1b[2Jq','漢字provider']});
   for(const ascii of [true,false]){
     const lines=overview(small(hostile),width,rows,ascii);
     for(const line of lines) expect(visibleWidth(line)).toBeLessThanOrEqual(width);
     expect(lines.length).toBeLessThanOrEqual(rows);
     const text=lines.join('\n');
     expect(text).not.toContain('\x1b');
     expect(zeroWidth.test(text)).toBe(false);
   }
 });
 it('AC4 a hostile bottleneck title keeps its row suffix visible at 80 columns',()=>{
   const long=report({bottlenecks:[bottleneck(1,{title:'x'.repeat(300),freshness:'stale'})]});
   const row=overview(small(long),80,24,true).find(line=>line.includes('xxx'))!;
   expect(row).toMatch(/open 01:02 measured .*STALE$/);
 });
 it('AC5 layout stays synchronous and never selects attention or reads a host clock',()=>{
   const source=readFileSync(new URL('../src/ui/workflow-inspector.ts',import.meta.url),'utf8');
   expect(source).not.toMatch(/selectAttention/);
   expect(source).not.toMatch(/Date\.now/);
   expect(source).not.toMatch(/new Date\(\)/);
   expect(layoutInspector(small(report()),initialInspectorState(),{width:80,rows:24})).toBeInstanceOf(Array);
 });
 it('AC5 names disconnected providers only when there are some, and shows page truncation',()=>{
   const none=countsLine(overview(small(report({disconnectedProviders:[]})),120,40,true))!;
   expect(none).not.toContain('providers');
   expect(flat(overview(small(report({disconnectedProviders:['furnace','forge']})),120,40,true))).toContain('(providers: furnace, forge)');
   expect(flat(overview(small(report({examined:{nodes:100,truncated:true}})),80,24,true))).toContain('page truncated');
   expect(flat(overview(small(report({examined:{nodes:6,truncated:false}})),80,24,true))).not.toContain('page truncated');
   expect(flat(overview(small(report({examined:{nodes:100,truncated:true},criticalPath:partial})),80,24,true))).toContain('page truncated');
 });
 it('AC6 without an attention report all four views are byte-identical to the base snapshot',()=>{
   for(const view of ['overview','graph','timeline','details'] as const) for(const [width,rows] of [[80,24],[120,40]] as const) for(const ascii of [true,false]){
     const key=`${view}|${width}x${rows}|${ascii?'ascii':'unicode'}`;
     expect(layoutInspector(fixture(),{...initialInspectorState(),view},{width,rows,ascii}),key).toEqual(BASE_SNAPSHOT[key]);
     expect(layoutInspector({...fixture(),attention:undefined},{...initialInspectorState(),view},{width,rows,ascii}),key).toEqual(BASE_SNAPSHOT[key]);
   }
 });
 it('AC6 other views ignore a supplied report entirely',()=>{
   const model=fixture();
   for(const view of ['graph','timeline','details'] as const)
     expect(layoutInspector(withAttention(model,report()),{...initialInspectorState(),view},{width:80,rows:24,ascii:true}))
       .toEqual(layoutInspector(model,{...initialInspectorState(),view},{width:80,rows:24,ascii:true}));
 });
 it('AC7 fifteen bottlenecks at 24 rows keep the selected, row-range and key-hint lines and count the dropped rows',()=>{
   const many=report({bottlenecks:Array.from({length:15},(_,n)=>bottleneck(n+1))});
   const lines=overview(withAttention(fixture(),many),80,24,true);
   expect(lines.length).toBeLessThanOrEqual(24);
   const text=lines.join('\n');
   expect(text).toContain('Selected furnace/operation/0');
   expect(text).toMatch(/Rows 1-\d+\/90/);
   expect(lines.at(-1)).toContain('Tab views');
   const shown=lines.filter(line=>/Bottleneck \d+ /.test(line)).length;
   expect(shown).toBeGreaterThanOrEqual(1);
   expect(shown).toBeLessThan(15);
   expect(text).toContain(`+${15-shown} more bottlenecks`);
   expect(countsLine(lines)).toContain('active 2');
   expect(text).toContain('Critical path: incomplete trace');
 });
 it('AC7 bottleneck rows drop from the bottom: the rows drawn are the first ones in report order',()=>{
   const many=report({bottlenecks:Array.from({length:15},(_,n)=>bottleneck(n+1))});
   const lines=overview(withAttention(fixture(),many),80,24,true);
   const numbers=lines.flatMap(line=>/Bottleneck (\d+) /.exec(line)?.[1]??[]).map(Number);
   expect(numbers).toEqual(numbers.map((_,at)=>at+1));
 });
 it('AC7 the tree slice and its tones are unchanged by the panel',()=>{
   const model=small();
   const without=overview(model,80,24,true);
   const withPanel=overview(withAttention(model,report()),80,24,true);
   const tree=(lines:readonly string[])=>lines.filter(line=>/Small \d/.test(line));
   expect(tree(withPanel)).toEqual(tree(without));
   expect(tree(withPanel)).toHaveLength(6);
   // A paged fixture: the rows still drawn are an unchanged prefix of the rows drawn without the panel.
   const big=fixture();
   const bigWithout=overview(big,80,24,true).filter(line=>/Operation \d+ /.test(line));
   const bigWith=overview(withAttention(big,report()),80,24,true).filter(line=>/Operation \d+ /.test(line));
   expect(bigWith.length).toBeGreaterThan(0);
   expect(bigWith).toEqual(bigWithout.slice(0,bigWith.length));
 });
 it('AC7 the panel replaces the two constant lines instead of adding to them',()=>{
   const lines=overview(small(report()),80,24,true);
   expect(lines.filter(line=>line.includes('Attention:'))).toHaveLength(1);
   expect(lines.filter(line=>line.includes('Critical path:'))).toHaveLength(1);
 });
 // Respin (gate cmd_d9dc4a482899; owner rulings 21:43Z bound on the bead): every producer string passes the sanitizer exactly
 // ONCE inside the panel. The terminal helper is not idempotent on a JSON closing brace after a marker (the wb-3l3 class), so a
 // second pass is a text change: a once-sanitized S5 or K8 shape keeps its brace, a twice-sanitized one loses it.
 const zeroWidthSpace=String.fromCodePoint(0x200b);
 const jsonBraceShapes=[
   {id:'S5',raw:'{"api_key":"xyz"}',secret:'xyz',once:'{"api_key":[REDACTED]}'},
   {id:'K8',raw:`{"pass${zeroWidthSpace}word":"JSONSPLITSECRET"}`,secret:'JSONSPLITSECRET',once:'{"password":[REDACTED]}'},
 ];
 it.each(jsonBraceShapes)('U3 $id: a bottleneck title, its provider and a disconnected provider each pass the sanitizer once',({raw,secret,once})=>{
   const shape=report({disconnectedProviders:[raw],bottlenecks:[bottleneck(1,{title:raw,nativeRef:ref(raw,'b1')})]});
   for(const ascii of [true,false]){
     const sep=ascii?' | ':' · ';
     const lines=overview(small(shape),120,40,ascii);
     expect(lines.find(line=>line.includes('open 01:02 measured'))).toBe(` ${ascii?'*':'◌'} ${once}${sep}${once}${sep}open 01:02 measured${sep}CURRENT`);
     expect(flat(lines)).toContain(`(providers: ${once})`);
     expect(lines.join('\n')).not.toContain(secret);
   }
 });
 it('U4 (M17) more than four disconnected providers: the first four are named and the rest counted, never dropped silently',()=>{
   const shown=(providers:string[])=>flat(overview(small(report({disconnectedProviders:providers})),120,40,true));
   expect(shown(['p1','p2','p3','p4','p5','p6'])).toContain('(providers: p1, p2, p3, p4, +2 more)');
   expect(shown(['p1','p2','p3','p4','p5'])).toContain('(providers: p1, p2, p3, p4, +1 more)');
   expect(shown(['p1','p2','p3','p4'])).toContain('(providers: p1, p2, p3, p4)');
   expect(shown(['p1','p2','p3','p4'])).not.toContain('more)');
 });
 it('U4 (M18) a provider name is capped at 24 columns with a visible ellipsis, in the providers clause and on the bottleneck row',()=>{
   const fits='q'.repeat(24);
   const over='r'.repeat(25);
   for(const ascii of [true,false]){
     const sep=ascii?' | ':' · ';
     const capped=`${'r'.repeat(23)}${ascii?'~':'…'}`;
     const lines=overview(small(report({disconnectedProviders:[fits,over],bottlenecks:[bottleneck(1,{nativeRef:ref(fits,'b1')}),bottleneck(2,{nativeRef:ref(over,'b2')})]})),120,40,ascii);
     expect(flat(lines)).toContain(`(providers: ${fits}, ${capped})`);
     expect(lines.find(line=>line.includes('Bottleneck 1'))).toContain(`${sep}${fits}${sep}open 01:02 measured`);
     expect(lines.find(line=>line.includes('Bottleneck 2'))).toContain(`${sep}${capped}${sep}open 01:03 measured`);
   }
 });
 it('U4 (M11) under a full panel the paged tree keeps its floor of five rows: four entries and the row-budget notice',()=>{
   const many=report({bottlenecks:Array.from({length:15},(_,n)=>bottleneck(n+1))});
   const lines=overview(withAttention(fixture(),many),80,24,true);
   expect(lines.filter(line=>/Operation \d+ /.test(line))).toHaveLength(4);
   expect(lines.filter(line=>/more rows in this page \(row budget\)/.test(line))).toHaveLength(1);
 });
});

/** Captured from layoutInspector at base b4ca4aa, before the attention panel existed: fixture() without an attention report. */
const BASE_SNAPSHOT: Readonly<Record<string, readonly string[]>> = {
  "overview|80x24|ascii": [
    " [ Big workflow running ]",
    " OVERVIEW 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Observed tree ? nesting from observed grouping/ownership edges only",
    " > * Operation 0 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 1 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 2 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 3 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 4 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 5 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 6 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 7 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 8 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 9 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 10 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 11 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 12 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 13 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 14 ? furnace ? running ? CURRENT ? no observed parent",
    " Selected furnace/operation/0 ? 0 evidence refs",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Rows 1-15/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "overview|80x24|unicode": [
    " ╭ Big workflow running ╮",
    " OVERVIEW 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Observed tree · nesting from observed grouping/ownership edges only",
    " ❯ ◌ Operation 0 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 1 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 2 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 3 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 4 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 5 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 6 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 7 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 8 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 9 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 10 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 11 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 12 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 13 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 14 · furnace · running · CURRENT · no observed parent",
    " Selected furnace/operation/0 · 0 evidence refs",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Rows 1-15/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "overview|120x40|ascii": [
    " [ Big workflow running ]",
    " OVERVIEW 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Observed tree ? nesting from observed grouping/ownership edges only",
    " > * Operation 0 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 1 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 2 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 3 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 4 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 5 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 6 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 7 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 8 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 9 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 10 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 11 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 12 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 13 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 14 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 15 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 16 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 17 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 18 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 19 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 20 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 21 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 22 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 23 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 24 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 25 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 26 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 27 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 28 ? furnace ? running ? CURRENT ? no observed parent",
    "   * Operation 29 ? forge ? running ? CURRENT ? no observed parent",
    "   * Operation 30 ? furnace ? running ? CURRENT ? no observed parent",
    " Selected furnace/operation/0 ? 0 evidence refs",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Rows 1-31/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "overview|120x40|unicode": [
    " ╭ Big workflow running ╮",
    " OVERVIEW 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Observed tree · nesting from observed grouping/ownership edges only",
    " ❯ ◌ Operation 0 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 1 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 2 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 3 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 4 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 5 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 6 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 7 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 8 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 9 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 10 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 11 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 12 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 13 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 14 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 15 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 16 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 17 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 18 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 19 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 20 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 21 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 22 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 23 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 24 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 25 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 26 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 27 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 28 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 29 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 30 · furnace · running · CURRENT · no observed parent",
    " Selected furnace/operation/0 · 0 evidence refs",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Rows 1-31/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "graph|80x24|ascii": [
    " [ Big workflow running ]",
    " GRAPH 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Observed reference graph ? cycles allowed; missing edges are unknown",
    " > * furnace/operation/0 Operation 0",
    "  dependency -> forge/operation/1 [furnace]",
    "  * forge/operation/1 Operation 1",
    "  dependency <- furnace/operation/0 [furnace]",
    "  * furnace/operation/2 Operation 2",
    "  * forge/operation/3 Operation 3",
    "  * furnace/operation/4 Operation 4",
    "  * forge/operation/5 Operation 5",
    "  * furnace/operation/6 Operation 6",
    "  * forge/operation/7 Operation 7",
    "  * furnace/operation/8 Operation 8",
    "  * forge/operation/9 Operation 9",
    "  * furnace/operation/10 Operation 10",
    "  * forge/operation/11 Operation 11",
    "  * furnace/operation/12 Operation 12",
    "  * forge/operation/13 Operation 13",
    "  * furnace/operation/14 Operation 14",
    " Topology incomplete unless native relationships are explicitly supplied.",
    " Rows 1-15/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "graph|80x24|unicode": [
    " ╭ Big workflow running ╮",
    " GRAPH 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Observed reference graph · cycles allowed; missing edges are unknown",
    " ❯ ◌ furnace/operation/0 Operation 0",
    "  dependency → forge/operation/1 [furnace]",
    "  ◌ forge/operation/1 Operation 1",
    "  dependency ← furnace/operation/0 [furnace]",
    "  ◌ furnace/operation/2 Operation 2",
    "  ◌ forge/operation/3 Operation 3",
    "  ◌ furnace/operation/4 Operation 4",
    "  ◌ forge/operation/5 Operation 5",
    "  ◌ furnace/operation/6 Operation 6",
    "  ◌ forge/operation/7 Operation 7",
    "  ◌ furnace/operation/8 Operation 8",
    "  ◌ forge/operation/9 Operation 9",
    "  ◌ furnace/operation/10 Operation 10",
    "  ◌ forge/operation/11 Operation 11",
    "  ◌ furnace/operation/12 Operation 12",
    "  ◌ forge/operation/13 Operation 13",
    "  ◌ furnace/operation/14 Operation 14",
    " Topology incomplete unless native relationships are explicitly supplied.",
    " Rows 1-15/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "graph|120x40|ascii": [
    " [ Big workflow running ]",
    " GRAPH 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Observed reference graph ? cycles allowed; missing edges are unknown",
    " > * furnace/operation/0 Operation 0",
    "  dependency -> forge/operation/1 [furnace]",
    "  * forge/operation/1 Operation 1",
    "  dependency <- furnace/operation/0 [furnace]",
    "  * furnace/operation/2 Operation 2",
    "  * forge/operation/3 Operation 3",
    "  * furnace/operation/4 Operation 4",
    "  * forge/operation/5 Operation 5",
    "  * furnace/operation/6 Operation 6",
    "  * forge/operation/7 Operation 7",
    "  * furnace/operation/8 Operation 8",
    "  * forge/operation/9 Operation 9",
    "  * furnace/operation/10 Operation 10",
    "  * forge/operation/11 Operation 11",
    "  * furnace/operation/12 Operation 12",
    "  * forge/operation/13 Operation 13",
    "  * furnace/operation/14 Operation 14",
    "  * forge/operation/15 Operation 15",
    "  * furnace/operation/16 Operation 16",
    "  * forge/operation/17 Operation 17",
    "  * furnace/operation/18 Operation 18",
    "  * forge/operation/19 Operation 19",
    "  * furnace/operation/20 Operation 20",
    "  * forge/operation/21 Operation 21",
    "  * furnace/operation/22 Operation 22",
    "  * forge/operation/23 Operation 23",
    "  * furnace/operation/24 Operation 24",
    "  * forge/operation/25 Operation 25",
    "  * furnace/operation/26 Operation 26",
    "  * forge/operation/27 Operation 27",
    "  * furnace/operation/28 Operation 28",
    "  * forge/operation/29 Operation 29",
    "  * furnace/operation/30 Operation 30",
    " Topology incomplete unless native relationships are explicitly supplied.",
    " Rows 1-31/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "graph|120x40|unicode": [
    " ╭ Big workflow running ╮",
    " GRAPH 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Observed reference graph · cycles allowed; missing edges are unknown",
    " ❯ ◌ furnace/operation/0 Operation 0",
    "  dependency → forge/operation/1 [furnace]",
    "  ◌ forge/operation/1 Operation 1",
    "  dependency ← furnace/operation/0 [furnace]",
    "  ◌ furnace/operation/2 Operation 2",
    "  ◌ forge/operation/3 Operation 3",
    "  ◌ furnace/operation/4 Operation 4",
    "  ◌ forge/operation/5 Operation 5",
    "  ◌ furnace/operation/6 Operation 6",
    "  ◌ forge/operation/7 Operation 7",
    "  ◌ furnace/operation/8 Operation 8",
    "  ◌ forge/operation/9 Operation 9",
    "  ◌ furnace/operation/10 Operation 10",
    "  ◌ forge/operation/11 Operation 11",
    "  ◌ furnace/operation/12 Operation 12",
    "  ◌ forge/operation/13 Operation 13",
    "  ◌ furnace/operation/14 Operation 14",
    "  ◌ forge/operation/15 Operation 15",
    "  ◌ furnace/operation/16 Operation 16",
    "  ◌ forge/operation/17 Operation 17",
    "  ◌ furnace/operation/18 Operation 18",
    "  ◌ forge/operation/19 Operation 19",
    "  ◌ furnace/operation/20 Operation 20",
    "  ◌ forge/operation/21 Operation 21",
    "  ◌ furnace/operation/22 Operation 22",
    "  ◌ forge/operation/23 Operation 23",
    "  ◌ furnace/operation/24 Operation 24",
    "  ◌ forge/operation/25 Operation 25",
    "  ◌ furnace/operation/26 Operation 26",
    "  ◌ forge/operation/27 Operation 27",
    "  ◌ furnace/operation/28 Operation 28",
    "  ◌ forge/operation/29 Operation 29",
    "  ◌ furnace/operation/30 Operation 30",
    " Topology incomplete unless native relationships are explicitly supplied.",
    " Rows 1-31/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "timeline|80x24|ascii": [
    " [ Big workflow running ]",
    " TIMELINE 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Source intervals only ? zoom 1x ? pan 0 ? clocks may differ",
    " > furnace Operation 0 ## 2000ms source interval",
    "  forge Operation 1 ## 2000ms source interval",
    "  furnace Operation 2 ## 2000ms source interval",
    "  forge Operation 3 timing unavailable (no complete source interval)",
    "  furnace Operation 4 timing unavailable (no complete source interval)",
    "  forge Operation 5 timing unavailable (no complete source interval)",
    "  furnace Operation 6 timing unavailable (no complete source interval)",
    "  forge Operation 7 timing unavailable (no complete source interval)",
    "  furnace Operation 8 timing unavailable (no complete source interval)",
    "  forge Operation 9 timing unavailable (no complete source interval)",
    "  furnace Operation 10 timing unavailable (no complete source interval)",
    "  forge Operation 11 timing unavailable (no complete source interval)",
    "  furnace Operation 12 timing unavailable (no complete source interval)",
    "  forge Operation 13 timing unavailable (no complete source interval)",
    "  furnace Operation 14 timing unavailable (no complete source interval)",
    " Waiting/blocked/executing lanes unavailable without producer interval kinds.",
    " Rows 1-15/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "timeline|80x24|unicode": [
    " ╭ Big workflow running ╮",
    " TIMELINE 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Source intervals only · zoom 1x · pan 0 · clocks may differ",
    " ❯ furnace Operation 0 ━━ 2000ms source interval",
    "  forge Operation 1 ━━ 2000ms source interval",
    "  furnace Operation 2 ━━ 2000ms source interval",
    "  forge Operation 3 timing unavailable (no complete source interval)",
    "  furnace Operation 4 timing unavailable (no complete source interval)",
    "  forge Operation 5 timing unavailable (no complete source interval)",
    "  furnace Operation 6 timing unavailable (no complete source interval)",
    "  forge Operation 7 timing unavailable (no complete source interval)",
    "  furnace Operation 8 timing unavailable (no complete source interval)",
    "  forge Operation 9 timing unavailable (no complete source interval)",
    "  furnace Operation 10 timing unavailable (no complete source interval)",
    "  forge Operation 11 timing unavailable (no complete source interval)",
    "  furnace Operation 12 timing unavailable (no complete source interval)",
    "  forge Operation 13 timing unavailable (no complete source interval)",
    "  furnace Operation 14 timing unavailable (no complete source interval)",
    " Waiting/blocked/executing lanes unavailable without producer interval kinds.",
    " Rows 1-15/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "timeline|120x40|ascii": [
    " [ Big workflow running ]",
    " TIMELINE 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Source intervals only ? zoom 1x ? pan 0 ? clocks may differ",
    " > furnace Operation 0 ## 2000ms source interval",
    "  forge Operation 1 ## 2000ms source interval",
    "  furnace Operation 2 ## 2000ms source interval",
    "  forge Operation 3 timing unavailable (no complete source interval)",
    "  furnace Operation 4 timing unavailable (no complete source interval)",
    "  forge Operation 5 timing unavailable (no complete source interval)",
    "  furnace Operation 6 timing unavailable (no complete source interval)",
    "  forge Operation 7 timing unavailable (no complete source interval)",
    "  furnace Operation 8 timing unavailable (no complete source interval)",
    "  forge Operation 9 timing unavailable (no complete source interval)",
    "  furnace Operation 10 timing unavailable (no complete source interval)",
    "  forge Operation 11 timing unavailable (no complete source interval)",
    "  furnace Operation 12 timing unavailable (no complete source interval)",
    "  forge Operation 13 timing unavailable (no complete source interval)",
    "  furnace Operation 14 timing unavailable (no complete source interval)",
    "  forge Operation 15 timing unavailable (no complete source interval)",
    "  furnace Operation 16 timing unavailable (no complete source interval)",
    "  forge Operation 17 timing unavailable (no complete source interval)",
    "  furnace Operation 18 timing unavailable (no complete source interval)",
    "  forge Operation 19 timing unavailable (no complete source interval)",
    "  furnace Operation 20 timing unavailable (no complete source interval)",
    "  forge Operation 21 timing unavailable (no complete source interval)",
    "  furnace Operation 22 timing unavailable (no complete source interval)",
    "  forge Operation 23 timing unavailable (no complete source interval)",
    "  furnace Operation 24 timing unavailable (no complete source interval)",
    "  forge Operation 25 timing unavailable (no complete source interval)",
    "  furnace Operation 26 timing unavailable (no complete source interval)",
    "  forge Operation 27 timing unavailable (no complete source interval)",
    "  furnace Operation 28 timing unavailable (no complete source interval)",
    "  forge Operation 29 timing unavailable (no complete source interval)",
    "  furnace Operation 30 timing unavailable (no complete source interval)",
    " Waiting/blocked/executing lanes unavailable without producer interval kinds.",
    " Rows 1-31/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "timeline|120x40|unicode": [
    " ╭ Big workflow running ╮",
    " TIMELINE 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Source intervals only · zoom 1x · pan 0 · clocks may differ",
    " ❯ furnace Operation 0 ━━ 2000ms source interval",
    "  forge Operation 1 ━━ 2000ms source interval",
    "  furnace Operation 2 ━━ 2000ms source interval",
    "  forge Operation 3 timing unavailable (no complete source interval)",
    "  furnace Operation 4 timing unavailable (no complete source interval)",
    "  forge Operation 5 timing unavailable (no complete source interval)",
    "  furnace Operation 6 timing unavailable (no complete source interval)",
    "  forge Operation 7 timing unavailable (no complete source interval)",
    "  furnace Operation 8 timing unavailable (no complete source interval)",
    "  forge Operation 9 timing unavailable (no complete source interval)",
    "  furnace Operation 10 timing unavailable (no complete source interval)",
    "  forge Operation 11 timing unavailable (no complete source interval)",
    "  furnace Operation 12 timing unavailable (no complete source interval)",
    "  forge Operation 13 timing unavailable (no complete source interval)",
    "  furnace Operation 14 timing unavailable (no complete source interval)",
    "  forge Operation 15 timing unavailable (no complete source interval)",
    "  furnace Operation 16 timing unavailable (no complete source interval)",
    "  forge Operation 17 timing unavailable (no complete source interval)",
    "  furnace Operation 18 timing unavailable (no complete source interval)",
    "  forge Operation 19 timing unavailable (no complete source interval)",
    "  furnace Operation 20 timing unavailable (no complete source interval)",
    "  forge Operation 21 timing unavailable (no complete source interval)",
    "  furnace Operation 22 timing unavailable (no complete source interval)",
    "  forge Operation 23 timing unavailable (no complete source interval)",
    "  furnace Operation 24 timing unavailable (no complete source interval)",
    "  forge Operation 25 timing unavailable (no complete source interval)",
    "  furnace Operation 26 timing unavailable (no complete source interval)",
    "  forge Operation 27 timing unavailable (no complete source interval)",
    "  furnace Operation 28 timing unavailable (no complete source interval)",
    "  forge Operation 29 timing unavailable (no complete source interval)",
    "  furnace Operation 30 timing unavailable (no complete source interval)",
    " Waiting/blocked/executing lanes unavailable without producer interval kinds.",
    " Rows 1-31/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "details|80x24|ascii": [
    " [ Big workflow running ]",
    " DETAILS 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Evidence / details ? producer references, not fetched payload",
    " Native ref: furnace/operation/0",
    " Status: running ? active",
    " Freshness: current ? unknown ? coverage partial",
    " Confirmed: 2026-10-15T00:00:00Z",
    " Basis: not supplied",
    " Definition: not supplied",
    " Source: not supplied by observation",
    " Evidence: 0 references",
    " Relations: dependency",
    " Rows 1-15/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "details|80x24|unicode": [
    " ╭ Big workflow running ╮",
    " DETAILS 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Evidence / details · producer references, not fetched payload",
    " Native ref: furnace/operation/0",
    " Status: running · active",
    " Freshness: current · unknown · coverage partial",
    " Confirmed: 2026-10-15T00:00:00Z",
    " Basis: not supplied",
    " Definition: not supplied",
    " Source: not supplied by observation",
    " Evidence: 0 references",
    " Relations: dependency",
    " Rows 1-15/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "details|120x40|ascii": [
    " [ Big workflow running ]",
    " DETAILS 90 observed operations ? paused view ? 1/90",
    " ------------------------------------------------",
    " Evidence / details ? producer references, not fetched payload",
    " Native ref: furnace/operation/0",
    " Status: running ? active",
    " Freshness: current ? unknown ? coverage partial",
    " Confirmed: 2026-10-15T00:00:00Z",
    " Basis: not supplied",
    " Definition: not supplied",
    " Source: not supplied by observation",
    " Evidence: 0 references",
    " Relations: dependency",
    " Rows 1-31/90 ? viewport only",
    " Tab views ? j/k ? Esc back/close",
  ],
  "details|120x40|unicode": [
    " ╭ Big workflow running ╮",
    " DETAILS 90 observed operations · paused view · 1/90",
    " ────────────────────────────────────────────────",
    " Evidence / details · producer references, not fetched payload",
    " Native ref: furnace/operation/0",
    " Status: running · active",
    " Freshness: current · unknown · coverage partial",
    " Confirmed: 2026-10-15T00:00:00Z",
    " Basis: not supplied",
    " Definition: not supplied",
    " Source: not supplied by observation",
    " Evidence: 0 references",
    " Relations: dependency",
    " Rows 1-31/90 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
};
