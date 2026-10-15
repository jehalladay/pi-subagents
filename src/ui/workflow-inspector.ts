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
/** One node's bounded relation pages, cached per topology revision. */
interface RelationPage {revision:number; relations:Relation[]; incoming:Relation[]; partial:boolean; incomingPartial:boolean}
const relationCache = new WeakMap<ObservationProjection, Map<string, RelationPage>>();
function relationsFor(model: InspectorModel, node: ObservedNode): RelationPage {
  const version=model.projection.relationRevision();
  const cache=relationCache.get(model.projection)??new Map<string,RelationPage>();
  relationCache.set(model.projection,cache);
  const hit=cache.get(node.key);
  if(hit?.revision===version) return hit;
  const outgoing=model.projection.relations({scope:model.scope,from:node.key,limit:100});
  const incoming=model.projection.relations({scope:model.scope,to:node.key,limit:100});
  // A page holds at most min(100, the projection's maxQuery) rows and only a page reaching 100 is
  // flagged partial: a projection configured below 100 truncates silently, which relations() cannot report.
  // A self-loop is in both pages; it is listed and counted once.
  const result={revision:version,relations:[...outgoing,...incoming.filter(relation=>relation.from!==node.key)],incoming,
    partial:outgoing.length>=100 || incoming.length>=100,incomingPartial:incoming.length>=100};
  if(cache.size>=100) cache.delete(cache.keys().next().value!);
  cache.set(node.key,result);
  return result;
}
/** provider/type/id of a projection key (a projection-built JSON array) for reference lines. */
function keyRef(key: string): string {
  let parts: unknown;
  try { parts=JSON.parse(key); } catch { return 'unknown reference'; }
  return Array.isArray(parts) && parts.length>=6 ? `${String(parts[2])}/${String(parts[3])}/${String(parts[5])}` : 'unknown reference';
}
type NestingKind = 'ownership' | 'grouping';
/** Indentation stops growing at this depth; deeper rows say so instead of widening without bound. */
const MAX_TREE_DEPTH = 8;
interface NestingParent { key: string; kind: NestingKind; others: number }
/** A nesting parent comes only from an incoming ownership (preferred) or grouping edge;
 * dependency, causation and hypothesis edges never nest a row. */
function nestingParent(page: RelationPage): NestingParent | undefined {
  let chosen: {key:string; kind:NestingKind} | undefined;
  const parents=new Set<string>();
  for(const relation of page.incoming){
    if(relation.kind!=='ownership' && relation.kind!=='grouping') continue;
    parents.add(relation.from);
    if(!chosen || chosen.kind==='grouping' && relation.kind==='ownership') chosen={key:relation.from,kind:relation.kind};
  }
  return chosen ? {...chosen,others:parents.size-1} : undefined;
}
/** In-page rows hidden under a collapsed key that is in the page (`under`) or outside it (`outside`). */
interface CollapsedEntry {type:'collapsed'; depth:number; under:number; count:number; kinds:Set<NestingKind>; holdsSelection:boolean; outside?:string}
/** One overview tree line. `at`/`under` are positions in the fetched page; `under` is -1 for a viewport root. */
type TreeEntry =
  | {type:'node'; at:number; depth:number; under:number; cycleRoot:boolean}
  | {type:'ref'; at:number; depth:number; under:number; via:NestingKind}
  | CollapsedEntry;
/** Depth-first rows of one fetched window page, nested only by parents inside that page.
 * A cycle is entered at its first repeated key and closed by a reference line; a collapsed
 * key hides the in-page rows whose known ancestor chain (in-page parents, then the first
 * out-of-page parent, which the row's own incoming page names) includes it, and counts them.
 * Bounded by the page: no projection or history scan, and no relation read beyond the page's rows.
 * Selection (j/k) keeps the projection's viewport order: the reducer has no viewport size from
 * which to derive this page, so the pointer can move between subtrees. */
function nestedRows(parents: readonly (NestingParent | undefined)[], keys: readonly string[], collapsed: ReadonlySet<string>, selectedAt: number): TreeEntry[] {
  const position=new Map(keys.map((key,at)=>[key,at] as const));
  const up=parents.map(parent=>parent ? position.get(parent.key) : undefined);
  const children=keys.map(():number[]=>[]);
  for(const [at,parent] of up.entries()) if(parent!==undefined) children[parent].push(at);
  const visited=keys.map(()=>false);
  const entries:TreeEntry[]=[];
  /** Hide `from` and its unvisited in-page descendants in `summary`. */
  const hide=(from:readonly number[],summary:CollapsedEntry):void=>{
    const hidden=[...from];
    for(let next=hidden.pop();next!==undefined;next=hidden.pop()){
      if(visited[next]) continue;
      visited[next]=true;summary.count++;
      summary.holdsSelection||=next===selectedAt;
      const kind=parents[next]?.kind;
      if(kind) summary.kinds.add(kind);
      hidden.push(...children[next]);
    }
  };
  const walk=(root:number,cycleRoot:boolean):void=>{
    visited[root]=true;
    const stack:TreeEntry[]=[{type:'node',at:root,depth:0,under:-1,cycleRoot}];
    for(let entry=stack.pop();entry;entry=stack.pop()){
      entries.push(entry);
      if(entry.type!=='node') continue;
      if(collapsed.has(keys[entry.at])){
        const summary:CollapsedEntry={type:'collapsed',depth:entry.depth+1,under:entry.at,count:0,kinds:new Set(),holdsSelection:false};
        hide(children[entry.at],summary);
        if(summary.count>0) entries.push(summary);
        continue;
      }
      const kids=children[entry.at];
      for(let i=kids.length-1;i>=0;i--){
        const child=kids[i];
        if(visited[child]) stack.push({type:'ref',at:child,depth:entry.depth+1,under:entry.at,via:parents[child]?.kind??'grouping'});
        else {visited[child]=true;stack.push({type:'node',at:child,depth:entry.depth+1,under:entry.at,cycleRoot:false});}
      }
    }
  };
  // A viewport root's parent, when it has one, is outside the page. When that parent is collapsed the root and its
  // in-page subtree stay hidden, in one summary per such parent placed where its first hidden root would be.
  const outsideSummaries=new Map<string,CollapsedEntry>();
  for(const [at,parent] of up.entries()){
    if(parent!==undefined) continue;
    const outside=parents[at]?.key;
    if(outside===undefined || !collapsed.has(outside)) {walk(at,false);continue;}
    let summary=outsideSummaries.get(outside);
    if(!summary){
      summary={type:'collapsed',depth:0,under:-1,count:0,kinds:new Set(),holdsSelection:false,outside};
      outsideSummaries.set(outside,summary);
      entries.push(summary);
    }
    hide([at],summary);
  }
  for(let at=0;at<keys.length;at++){
    if(visited[at]) continue;
    // A row still unvisited leads up into an in-page cycle; enter that cycle at its first repeated key.
    const seen=new Set<number>();
    let cursor=at;
    while(!seen.has(cursor)){seen.add(cursor);cursor=up[cursor]??cursor;}
    walk(cursor,true);
  }
  return entries;
}
/** Whether each entry is the last displayed child of its tree parent. */
function lastSiblings(entries: readonly TreeEntry[]): boolean[] {
  const later=new Set<number>();
  const last=entries.map(()=>true);
  for(let i=entries.length-1;i>=0;i--){last[i]=!later.has(entries[i].under);later.add(entries[i].under);}
  return last;
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
  const paged=page.offset>0 || page.offset+page.nodes.length<page.total;
  const lines:string[]=[];
  const add=(text:string)=>{if(lines.length<height) lines.push(` ${limitLine(text,inner,ascii)}`);};
  // The lead (pointer and tree branch) is fixed text built here; only the row text is producer-supplied, and it is sanitized.
  const addTree=(lead:string,text:string)=>{if(lines.length<height) lines.push(` ${stripTerminalSequences(truncateToWidth(`${lead}${safe(text,ascii)}`,inner,ascii?'~':'…'))}`);};
  const title=limitLine(model.title,Math.max(1,inner-28),ascii);
  add(`${ascii?'[':'╭'} ${title}  ${safe(model.status,ascii)} ${ascii?']':'╮'}`);
  add(`${state.view.toUpperCase()}  ${page.total} observed operation${page.total===1?'':'s'} · ${state.follow?'following':'paused view'} · ${index+1}/${Math.max(1,page.total)}`);
  if(state.filter) add(`Filter (viewport): ${state.filter}${state.editingFilter?'_':''}`);
  if(state.focused) add('Focused on selected node and confirmed direct relations only');
  add(ascii?'-'.repeat(Math.min(inner,48)):'─'.repeat(Math.min(inner,48)));
  if(page.total===0) add('No source observations for this invocation; no graph or timeline is inferred.');
  if(state.view==='overview') {
    add('Observed tree · nesting from observed grouping/ownership edges only');
    const pages=page.nodes.map(node=>relationsFor(model,node));
    const parents=pages.map(nestingParent);
    const keys=page.nodes.map(node=>node.key);
    const selectedAt=current ? index-page.offset : -1;
    // A filter or focus lists matching rows flat, each naming its observed parent, so indentation never implies a hidden parent.
    const flat=state.filter!=='' || state.focused!==null;
    const entries:TreeEntry[]=flat
      ? page.nodes.flatMap((node,at):TreeEntry[]=>(state.focused && node.key!==state.focused) ||
        (state.filter && !`${node.presentation.title} ${ref(node)} ${node.presentation.statusText}`.toLowerCase().includes(state.filter.toLowerCase()))
        ? [] : [{type:'node',at,depth:0,under:-1,cycleRoot:false}])
      : nestedRows(parents,keys,new Set(state.collapsed),selectedAt);
    const describe=(entry:TreeEntry):string=>{
      if(entry.type==='ref') return `[ref ${keyRef(keys[entry.at])}] cycle via ${entry.via}`;
      if(entry.type==='collapsed'){
        const summary=`${ascii?'...':'…'} ${entry.count} collapsed (observed ${[...entry.kinds].sort().join('/')})`;
        return entry.outside===undefined ? summary : `${summary} · parent ${keyRef(entry.outside)} outside view`;
      }
      const node=page.nodes[entry.at];
      const parent=parents[entry.at];
      // A full incoming page may hide further parents, including an ownership parent that would be preferred.
      const partial=pages[entry.at].incomingPartial;
      const notes:string[]=[];
      if(!parent) notes.push(partial?'parent unknown (relations partial)':'no observed parent');
      else {
        // Lifecycle ownership stays distinguishable from display grouping wherever the parent is named.
        const named=`${parent.kind==='ownership'?'ownership ':''}parent ${keyRef(parent.key)}`;
        if(flat) notes.push(named);
        else if(entry.cycleRoot) notes.push('observed cycle');
        else if(entry.under<0) notes.push(`${named} outside view`);
        else if(parent.kind==='ownership') notes.push('ownership');
        if(partial) notes.push('relations partial');
        if(parent.others>0) notes.push(`+${parent.others} other observed parent${parent.others===1?'':'s'}`);
      }
      if(entry.depth>MAX_TREE_DEPTH) notes.push(`depth ${entry.depth}, indent capped at ${MAX_TREE_DEPTH}`);
      return [`${tone(node,ascii)} ${node.presentation.title}`,node.nativeRef.provider,node.presentation.statusText,node.freshness.toUpperCase(),...notes].join(' · ');
    };
    const last=lastSiblings(entries);
    // Rows never displace the selected, attention, critical-path, row-range and key-hint lines.
    const room=height-lines.length-(current && width>=80 ? 1 : 0)-2-(paged ? 1 : 0)-1;
    const shown=entries.length>room ? Math.max(0,room-1) : entries.length;
    for(let i=0;i<shown;i++){
      const entry=entries[i];
      const pointed=entry.type==='node' ? entry.at===selectedAt : entry.type==='collapsed' && entry.holdsSelection;
      const branch=entry.depth===0 ? '' : `${'  '.repeat(Math.min(entry.depth,MAX_TREE_DEPTH)-1)}${ascii?'|-':last[i]?'└─':'├─'} `;
      addTree(`${pointed?ascii?'>':'❯':' '} ${branch}`,describe(entry));
    }
    if(shown<entries.length && room>0){
      const remainder=entries.slice(shown);
      const rest=remainder.reduce((sum,entry)=>sum+(entry.type==='node'?1:entry.type==='collapsed'?entry.count:0),0);
      // A selection the budget pushes past the drawn rows stays visible on the notice.
      const holds=remainder.some(entry=>entry.type==='node' ? entry.at===selectedAt : entry.type==='collapsed' && entry.holdsSelection);
      add(`${holds?ascii?'> ':'❯ ':''}${ascii?'...':'…'} ${rest} more row${rest===1?'':'s'} in this page (row budget)`);
    }
    if(current && width>=80) add(`Selected  ${safe(ref(current),ascii)} · ${current.evidenceRefs.length} evidence ref${current.evidenceRefs.length===1?'':'s'}`);
    add('Attention: stale/unknown is last-known state, not live progress.');
    add('Critical path: incomplete trace (no complete dependency/interval proof).');
  } else if(state.view==='graph'){
    add('Observed reference graph · cycles allowed; missing edges are unknown');
    // A node's block is drawn whole or not at all, so the topology footer and key hint always remain;
    // blocks that do not fit are counted, never silently dropped.
    const limit=height-1-(paged ? 1 : 0)-1;
    const visible=page.nodes.flatMap((node,i)=>(state.focused && node.key!==state.focused) ||
      (state.filter && !`${node.presentation.title} ${ref(node)}`.toLowerCase().includes(state.filter.toLowerCase())) ? [] : [i]);
    for(const [n,i] of visible.entries()){
      const node=page.nodes[i];
      const pointer=page.offset+i===index?ascii?'>':'❯':' ';
      const block=[`${pointer} ${tone(node,ascii)} ${safe(ref(node),ascii)} ${safe(node.presentation.title,ascii)}`];
      if(state.collapsed.includes(node.key)) block.push(`  ${ascii?'~':'…'} relations collapsed`);
      else {
        const related=relationsFor(model,node);
        for(const relation of related.relations.slice(0,2)){
          const other=relation.from===node.key?relation.to:relation.from;
          const direction=relation.from===node.key ? edgeGlyph(ascii) : ascii ? "<-" : "←";
          block.push(`  ${relation.kind} ${direction} ${safe(keyRef(other),ascii)} [${safe(relation.provenance.source,ascii)}]`);
        }
        // Fan-out beyond two is counted from the bounded pages only; a full page means more may exist.
        const more=related.relations.length-Math.min(2,related.relations.length);
        if(more>0 || related.partial) block.push(`  ${ascii?'...':'…'} +${more} more (fan-out collapsed; bounded)${related.partial?' (partial)':''}`);
      }
      if(lines.length+block.length>limit-(n<visible.length-1 ? 1 : 0)){
        const rest=visible.length-n;
        const holds=visible.slice(n).some(at=>page.offset+at===index);
        if(lines.length<limit) add(`${holds?ascii?'> ':'❯ ':''}${ascii?'...':'…'} ${rest} more row${rest===1?'':'s'} in this page (row budget)`);
        break;
      }
      for(const text of block) add(text);
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
  if(paged) add(`Rows ${page.offset+1}-${page.offset+page.nodes.length}/${page.total} · viewport only`);
  while(lines.length<Math.min(height-1,5)) add('');
  add('Tab views · j/k · Esc back/close');
  return lines.slice(0,height);
}
