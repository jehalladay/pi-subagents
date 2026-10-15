/** Read-only terminal inspector over the bounded producer-qualified observation projection.
 * A row is a source observation, never an assertion of ownership or verification.
 */
import { matchesKey, stripTerminalSequences, truncateToWidth } from '@earendil-works/pi-tui';
import type { ObservationProjection, ObservationScope, ObservedNode, Relation } from '../workbench/observation.js';
import { safeWorkflowTerminalText } from './workflow-card.js';

export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';
export interface InspectorModel {
  projection: ObservationProjection;
  scope: ObservationScope;
  invocationId: string;
  title: string;
  status: string;
}
export interface InspectorState {
  view: InspectorView;
  selected: string | null;
  index: number;
  focused: string | null;
  filter: string;
  editingFilter: boolean;
  collapsed: readonly string[];
  follow: boolean;
  zoom: number;
  pan: number;
  previousView: InspectorView;
}
export interface InspectorSize { width: number; rows: number; ascii?: boolean }
export type InspectorAction = 'close' | 'transcript';
export const initialInspectorState = (): InspectorState => ({
  view: 'overview', selected: null, index: 0, focused: null, filter: '', editingFilter: false,
  collapsed: [], follow: false, zoom: 1, pan: 0, previousView: 'overview',
});
const views: readonly InspectorView[] = ['overview','graph','timeline','details'];
const safe = (text: string, ascii = false): string => {
  const cleaned = safeWorkflowTerminalText(text);
  return ascii ? cleaned.replace(/[^\x20-\x7e]/gu,'?') : cleaned;
};
const limitLine = (text: string, width: number, ascii: boolean): string =>
  stripTerminalSequences(truncateToWidth(safe(text,ascii), Math.max(1,width), ascii ? '~' : '…'));
const ref = (node: ObservedNode) => `${node.nativeRef.provider}/${node.nativeRef.type}/${node.nativeRef.id}`;
const edgeGlyph = (ascii: boolean) => ascii ? '->' : '→';
const tone = (node: ObservedNode, ascii: boolean): string => {
  if(node.freshness !== 'current') return '?';
  switch(node.presentation.statusTone){
    case 'success': return ascii ? '+' : '✓';
    case 'failure': return ascii ? 'x' : '✘';
    case 'waiting': return ascii ? 'o' : '○';
    case 'active': return ascii ? '*' : '◌';
    case 'unknown': return '?';
  }
};
const selected = (model: InspectorModel, state: InspectorState): {node: ObservedNode | undefined; index: number; total: number} => {
  const row=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:state.index,limit:1});
  return {node:row.nodes[0],index:state.index,total:row.total};
};
function rowWindow(model: InspectorModel, state: InspectorState, count: number): {nodes:ObservedNode[];offset:number;total:number;revision:number} {
  const head=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:0,limit:1});
  const index=Math.min(Math.max(0,state.index),Math.max(0,head.total-1));
  const offset=Math.max(0,Math.min(index-Math.floor(count/2),head.total-count));
  const page=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset,limit:count});
  return {...page,offset};
}
const relationCache = new WeakMap<ObservationProjection, Map<string, {revision:number; relations:Relation[];partial:boolean}>>();
function relationsFor(model: InspectorModel, node: ObservedNode): {relations:Relation[];partial:boolean} {
  const version=model.projection.relationRevision();
  const cache=relationCache.get(model.projection)??new Map<string,{revision:number;relations:Relation[];partial:boolean}>();
  relationCache.set(model.projection,cache);
  const hit=cache.get(node.key);
  if(hit?.revision===version) return hit;
  const outgoing=model.projection.relations({scope:model.scope,from:node.key,limit:100});
  const incoming=model.projection.relations({scope:model.scope,to:node.key,limit:100});
  // 100 is the projection's maximum model query; at the bound the page may be incomplete.
  const result={revision:version,relations:[...outgoing,...incoming],partial:outgoing.length>=100 || incoming.length>=100};
  if(cache.size>=100) cache.delete(cache.keys().next().value!);
  cache.set(node.key,result);
  return result;
}
/** One keypress; no producer calls, no control authority and no full-history fold. */
export function reduceInspectorKey(data:string,state:InspectorState,model:InspectorModel): {state:InspectorState;action?:InspectorAction} | undefined {
  if(matchesKey(data,'ctrl+c')) return {state,action:'close'};
  if(state.editingFilter){
    if(matchesKey(data,'escape') || matchesKey(data,'enter')) return {state:{...state,editingFilter:false}};
    if(matchesKey(data,'backspace')) return {state:{...state,filter:state.filter.slice(0,-1)}};
    if(data.length===1 && data>=' ' && data!=='\x7f' && state.filter.length<60) return {state:{...state,filter:state.filter+data}};
    return {state};
  }
  if(matchesKey(data,'escape') || matchesKey(data,'q')) {
    if(state.focused) return {state:{...state,focused:null}};
    if(state.view!=='overview') return {state:{...state,view:state.previousView==='overview'?'overview':state.previousView,previousView:'overview'}};
    return {state,action:'close'};
  }
  if(matchesKey(data,'tab')) return {state:{...state,view:views[(views.indexOf(state.view)+1)%views.length],previousView:state.view}};
  if(matchesKey(data,'/')) return {state:{...state,editingFilter:true}};
  if(matchesKey(data,'f')) return {state:{...state,focused:state.focused?null:state.selected}};
  if(data===' ') return {state:{...state,follow:!state.follow}};
  if(matchesKey(data,'e')) return {state:{...state,view:'details',previousView:state.view}};
  if(matchesKey(data,'s')) return {state:{...state,view:'details',previousView:state.view}};
  if(matchesKey(data,'c')) {
    const node=selected(model,state).node;
    return node?.nativeRef.provider==='claude-agent-sdk' && node.nativeRef.type==='session'
      ? {state,action:'transcript'} : undefined;
  }
  if(matchesKey(data,'enter') || matchesKey(data,'right')){
    const key=selected(model,state).node?.key;
    if(!key) return {state};
    return {state:{...state,selected:key,collapsed:state.collapsed.includes(key)
      ? state.collapsed.filter(item=>item!==key) : [...state.collapsed,key]}};
  }
  if(matchesKey(data,'+') || matchesKey(data,'=')) return {state:{...state,zoom:Math.min(16,state.zoom*2)}};
  if(matchesKey(data,'-')) return {state:{...state,zoom:Math.max(1,state.zoom/2)}};
  if(matchesKey(data,'h') || matchesKey(data,'left')) return {state:{...state,pan:Math.max(0,state.pan-1)}};
  if(matchesKey(data,'l')) return {state:{...state,pan:Math.min(100000,state.pan+1)}};
  if(matchesKey(data,'j') || matchesKey(data,'down') || matchesKey(data,'k') || matchesKey(data,'up')){
    const total=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:0,limit:1}).total;
    const current=state.selected ? model.projection.indexOf({scope:model.scope,invocationId:model.invocationId,key:state.selected}) : undefined;
    const delta=matchesKey(data,'j') || matchesKey(data,'down') ? 1 : -1;
    const index=Math.min(Math.max(0,(current??state.index)+delta),Math.max(0,total-1));
    const node=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:index,limit:1}).nodes[0];
    return {state:{...state,index,selected:node?.key??null}};
  }
  return undefined;
}

/** Pure viewport layout; capped rows fetched from indexed nodes, never raw event history. */
export function layoutInspector(model:InspectorModel,state:InspectorState,size:InspectorSize):string[]{
  const width=Math.max(12,Math.trunc(size.width));
  const height=Math.max(5,Math.trunc(size.rows));
  const ascii=size.ascii??false;
  const inner=Math.max(1,width-4);
  const bodyCount=Math.max(1,Math.min(32,height-9));
  const selectedIndex=state.selected ? model.projection.indexOf({scope:model.scope,invocationId:model.invocationId,key:state.selected}) : undefined;
  const page=rowWindow(model,selectedIndex===undefined?state:{...state,index:selectedIndex},bodyCount);
  const index=Math.min(selectedIndex??state.index,Math.max(0,page.total-1));
  const current=page.nodes[index-page.offset];
  const lines:string[]=[];
  const add=(text:string)=>{if(lines.length<height) lines.push(` ${limitLine(text,inner,ascii)}`);};
  const title=limitLine(model.title,Math.max(1,inner-28),ascii);
  add(`${ascii?'[':'╭'} ${title}  ${safe(model.status,ascii)} ${ascii?']':'╮'}`);
  add(`${state.view.toUpperCase()}  ${page.total} observed operation${page.total===1?'':'s'} · ${state.follow?'following':'paused view'} · ${index+1}/${Math.max(1,page.total)}`);
  if(state.filter) add(`Filter (viewport): ${state.filter}${state.editingFilter?'_':''}`);
  if(state.focused) add('Focused on selected node and confirmed direct relations only');
  add(ascii?'-'.repeat(Math.min(inner,48)):'─'.repeat(Math.min(inner,48)));
  if(page.total===0) add('No source observations for this invocation; no graph or timeline is inferred.');
  if(state.view==='overview') {
    add('Observed tree · display grouping only (not lifecycle ownership)');
    for(let i=0;i<page.nodes.length && lines.length<height-3;i++){
      const node=page.nodes[i];
      if(state.filter && !`${node.presentation.title} ${ref(node)} ${node.presentation.statusText}`.toLowerCase().includes(state.filter.toLowerCase())) continue;
      if(state.focused && node.key!==state.focused) continue;
      const pointer=page.offset+i===index?ascii?'>':'❯':' ';
      add(`${pointer} ${tone(node,ascii)} ${safe(node.presentation.title,ascii)} · ${safe(node.nativeRef.provider,ascii)} · ${safe(node.presentation.statusText,ascii)} · ${node.freshness.toUpperCase()}`);
    }
    if(current && width>=80) add(`Selected  ${safe(ref(current),ascii)} · ${current.evidenceRefs.length} evidence ref${current.evidenceRefs.length===1?'':'s'}`);
    add('Attention: stale/unknown is last-known state, not live progress.');
    add('Critical path: incomplete trace (no complete dependency/interval proof).');
  } else if(state.view==='graph'){
    add('Observed reference graph · cycles allowed; missing edges are unknown');
    for(let i=0;i<page.nodes.length && lines.length<height-3;i++){
      const node=page.nodes[i];
      if(state.focused && node.key!==state.focused) continue;
      if(state.filter && !`${node.presentation.title} ${ref(node)}`.toLowerCase().includes(state.filter.toLowerCase())) continue;
      const pointer=page.offset+i===index?ascii?'>':'❯':' ';
      add(`${pointer} ${tone(node,ascii)} ${safe(ref(node),ascii)} ${safe(node.presentation.title,ascii)}`);
      if(state.collapsed.includes(node.key)) {add(`  ${ascii?'~':'…'} relations collapsed`);continue;}
      const related=relationsFor(model,node);
      for(const relation of related.relations.slice(0,2)){
        const other=relation.from===node.key?relation.to:relation.from;
        const label=JSON.parse(other) as string[];
        const direction=relation.from===node.key ? edgeGlyph(ascii) : ascii ? "<-" : "←";
        add(`  ${relation.kind} ${direction} ${safe(`${label[2]}/${label[3]}/${label[5]}`,ascii)} [${safe(relation.provenance.source,ascii)}]`);
      }
      if(related.partial || related.relations.length>2) add(`  ${ascii?'~':'…'} additional observed relations (bounded)`);
    }
    add('Topology incomplete unless native relationships are explicitly supplied.');
  } else if(state.view==='timeline'){
    add(`Source intervals only · zoom ${state.zoom}x · pan ${state.pan} · clocks may differ`);
    for(let i=0;i<page.nodes.length && lines.length<height-3;i++){
      const node=page.nodes[i];
      if(state.focused && node.key!==state.focused) continue;
      if(state.filter && !`${node.presentation.title} ${ref(node)}`.toLowerCase().includes(state.filter.toLowerCase())) continue;
      const pointer=page.offset+i===index?ascii?'>':'❯':' ';
      const start=node.interval ? Date.parse(node.interval.startedAt) : undefined;
      const end=node.interval?.endedAt ? Date.parse(node.interval.endedAt) : undefined;
      const duration=start!==undefined && end!==undefined ? Math.max(0,end-start):undefined;
      const bar=duration!==undefined ? (ascii?'#':'━').repeat(Math.max(1,Math.min(20,Math.floor(duration/1000*state.zoom)-state.pan))) : '';
      add(`${pointer} ${safe(node.nativeRef.provider,ascii)} ${safe(node.presentation.title,ascii)}  ${duration===undefined?'timing unavailable (no complete source interval)':`${bar} ${duration}ms source interval`}`);
    }
    add('Waiting/blocked/executing lanes unavailable without producer interval kinds.');
  } else {
    add('Evidence / details · producer references, not fetched payload');
    if(current){
      add(`Native ref: ${safe(ref(current),ascii)}`);
      add(`Status: ${safe(current.presentation.statusText,ascii)} · ${current.presentation.statusTone}`);
      add(`Freshness: ${current.freshness} · ${current.sourceConnectionState} · coverage ${current.completeness}`);
      add(`Confirmed: ${current.lastConfirmedAt ?? 'not confirmed'}`);
      add(`Basis: ${safe(current.subjectBasis??'not supplied',ascii)}`);
      add(`Definition: ${safe(current.definitionDigest??'not supplied',ascii)}`);
      add(`Source: not supplied by observation`);
      add(`Evidence: ${current.evidenceRefs.length} reference${current.evidenceRefs.length===1?'':'s'}`);
      const evidenceShown = Math.min(current.evidenceRefs.length,Math.max(0,height-lines.length-5));
      for(const evidence of current.evidenceRefs.slice(0,evidenceShown)) add(`  ${safe(evidence,ascii)}`);
      if(current.evidenceRefs.length>evidenceShown) add('  Further references available at producer.');
      const related=relationsFor(model,current);
      if(related.relations.length) add(`Relations: ${related.relations.map(r=>r.kind).slice(0,3).join(', ')}${related.partial?' (partial)':''}`);
      if(current.nativeRef.provider==='claude-agent-sdk' && current.nativeRef.type==='session') add('c transcript (loaded on focus)');
    } else add('Select an observed operation with j/k.');
  }
  if(page.offset>0 || page.offset+page.nodes.length<page.total) add(`Rows ${page.offset+1}-${page.offset+page.nodes.length}/${page.total} · viewport only`);
  while(lines.length<Math.min(height-1,5)) add('');
  add('Tab views · j/k · Esc back/close');
  return lines.slice(0,height);
}
