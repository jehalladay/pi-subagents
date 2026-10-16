import { visibleWidth } from '@earendil-works/pi-tui';
import { describe, expect, it, vi } from 'vitest';
import { initialWorkflowDialogState, WorkflowDialog } from '../src/ui/workflow-dialog.js';
import { type InspectorModel, initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey } from '../src/ui/workflow-inspector.js';
import { type EvidenceContent, type EvidenceLoader, EvidenceRefusal, EvidenceStore } from '../src/workbench/evidence-loader.js';
import { CLAUDE_TRANSCRIPT_GRANT, createEvidenceLoaders } from '../src/workbench/evidence-producers.js';
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
     const readRows=vi.fn(async()=>[{type:'assistant',uuid,text:'claude says hi'}]);
     const store=new EvidenceStore({loaders:createEvidenceLoaders({grants:()=>grants,claude:readRows}),maxEntries:4,maxBytes:1024,timeoutMs:200,scope});
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
