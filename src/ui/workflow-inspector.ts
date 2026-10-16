/** Read-only terminal inspector over the bounded producer-qualified observation projection.
 * A row is a source observation, never an assertion of ownership or verification.
 */
import { matchesKey, stripTerminalSequences, truncateToWidth, visibleWidth } from '@earendil-works/pi-tui';
import type { EvidenceEntry, EvidenceStore } from '../workbench/evidence-loader.js';
import type { NativeRef, ObservationProjection, ObservationScope, ObservedNode, Relation } from '../workbench/observation.js';
import { MAX_ZOOM, type TimelineModel, type TimelineNote, type TimelineRow } from '../workbench/timeline.js';
import { safeWorkflowTerminalText } from './workflow-card.js';

export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';
export interface InspectorModel {
  projection: ObservationProjection;
  scope: ObservationScope;
  invocationId: string;
  title: string;
  status: string;
  /** Read side of the lazy evidence store; absent means the details view renders exactly as before. */
  evidence?: Pick<EvidenceStore, 'get' | 'request' | 'abortAll'>;
  /** Lane model the host builds per redraw (buildTimelineLanes); absent means the timeline view renders exactly as before. */
  timeline?: TimelineModel;
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
  /** Selected evidence reference of the current node in the details view. */
  evidenceIndex: number;
}
export interface InspectorSize { width: number; rows: number; ascii?: boolean }
export type InspectorAction = 'close' | 'transcript' | 'load-evidence';
export const initialInspectorState = (): InspectorState => ({
  view: 'overview', selected: null, index: 0, focused: null, filter: '', editingFilter: false,
  collapsed: [], follow: false, zoom: 1, pan: 0, previousView: 'overview', evidenceIndex: 0,
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
const toneGlyph = (freshness: ObservedNode['freshness'], statusTone: ObservedNode['presentation']['statusTone'], ascii: boolean): string => {
  if(freshness !== 'current') return '?';
  switch(statusTone){
    case 'success': return ascii ? '+' : '✓';
    case 'failure': return ascii ? 'x' : '✘';
    case 'waiting': return ascii ? 'o' : '○';
    case 'active': return ascii ? '*' : '◌';
    case 'unknown': return '?';
  }
};
const tone = (node: ObservedNode, ascii: boolean): string => toneGlyph(node.freshness,node.presentation.statusTone,ascii);
const selected = (model: InspectorModel, state: InspectorState): {node: ObservedNode | undefined; index: number; total: number} => {
  const row=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:state.index,limit:1});
  return {node:row.nodes[0],index:state.index,total:row.total};
};
/** The node the layout draws as current: the selected key when it still resolves, otherwise the row index. */
function focusedNode(model: InspectorModel, state: InspectorState): ObservedNode | undefined {
  const at=state.selected ? model.projection.indexOf({scope:model.scope,invocationId:model.invocationId,key:state.selected}) : undefined;
  const total=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:0,limit:1}).total;
  const index=Math.min(Math.max(0,at??state.index),Math.max(0,total-1));
  return model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:index,limit:1}).nodes[0];
}
/** The evidence reference a `load-evidence` action refers to: the focused node's selected reference, for the host to request. */
export function inspectorEvidenceTarget(model: InspectorModel, state: InspectorState): {scope: ObservationScope; nativeRef: NativeRef; evidenceRef: string} | undefined {
  const node=focusedNode(model,state);
  const evidenceRef=node?.evidenceRefs[Math.min(Math.max(0,state.evidenceIndex),Math.max(0,(node?.evidenceRefs.length??0)-1))];
  return node && evidenceRef!==undefined ? {scope:node.scope,nativeRef:node.nativeRef,evidenceRef} : undefined;
}
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
  if(matchesKey(data,'e')){
    // In the details view with an evidence store, `e` walks the focused node's references; it never loads.
    if(model.evidence && state.view==='details'){
      const count=focusedNode(model,state)?.evidenceRefs.length??0;
      return {state:{...state,evidenceIndex:count>0?(Math.min(Math.max(0,state.evidenceIndex),count-1)+1)%count:0}};
    }
    return {state:{...state,view:'details',previousView:state.view}};
  }
  if(matchesKey(data,'s')) return {state:{...state,view:'details',previousView:state.view}};
  if(matchesKey(data,'c')) {
    const node=selected(model,state).node;
    return node?.nativeRef.provider==='claude-agent-sdk' && node.nativeRef.type==='session'
      ? {state,action:'transcript'} : undefined;
  }
  if(model.evidence && state.view==='details' && matchesKey(data,'enter')){
    // The host performs the load; the reducer only names the request.
    return inspectorEvidenceTarget(model,state) ? {state,action:'load-evidence'} : {state};
  }
  if(matchesKey(data,'enter') || matchesKey(data,'right')){
    const key=selected(model,state).node?.key;
    if(!key) return {state};
    return {state:{...state,selected:key,collapsed:state.collapsed.includes(key)
      ? state.collapsed.filter(item=>item!==key) : [...state.collapsed,key]}};
  }
  if(matchesKey(data,'+') || matchesKey(data,'=')) return {state:{...state,zoom:Math.min(MAX_ZOOM,state.zoom*2)}};
  if(matchesKey(data,'-')) return {state:{...state,zoom:Math.max(1,state.zoom/2)}};
  if(matchesKey(data,'h') || matchesKey(data,'left')) return {state:{...state,pan:Math.max(0,state.pan-1)}};
  if(matchesKey(data,'l')) return {state:{...state,pan:Math.min(100000,state.pan+1)}};
  if(matchesKey(data,'j') || matchesKey(data,'down') || matchesKey(data,'k') || matchesKey(data,'up')){
    const total=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:0,limit:1}).total;
    const current=state.selected ? model.projection.indexOf({scope:model.scope,invocationId:model.invocationId,key:state.selected}) : undefined;
    const delta=matchesKey(data,'j') || matchesKey(data,'down') ? 1 : -1;
    const index=Math.min(Math.max(0,(current??state.index)+delta),Math.max(0,total-1));
    const node=model.projection.window({scope:model.scope,invocationId:model.invocationId,offset:index,limit:1}).nodes[0];
    return {state:{...state,index,selected:node?.key??null,evidenceIndex:0}};
  }
  return undefined;
}

/** A node's evidence references with their per-reference load state, within `room` rows. Reads the store synchronously and never loads.
 * Preview text is read only from a `loaded` entry; every other state is a one-line label. */
function evidenceRows(store: Pick<EvidenceStore,'get'>, node: ObservedNode, selectedIndex: number, room: number, ascii: boolean): string[] {
  const refs=node.evidenceRefs;
  if(refs.length===0||room<=0) return [];
  const pick=Math.min(Math.max(0,selectedIndex),refs.length-1);
  const stale=node.freshness!=='current' || node.sourceConnectionState==='disconnected';
  const entries:EvidenceEntry[]=refs.map(reference=>store.get(node.scope,node.nativeRef,reference));
  const previewCount=(entry:EvidenceEntry,wanted:number):number=>entry.state==='loaded' ? Math.min(entry.preview.length,wanted) : 0;
  const label=(entry:EvidenceEntry,shown:number):string=>{
    switch(entry.state){
      case 'not-requested': return 'not loaded (Enter)';
      case 'loading': return ascii ? 'loading...' : 'loading…';
      case 'unavailable': return `unavailable: ${entry.reason}${entry.freshness==='stale' || stale && entry.reason==='transport' ? ' · stale' : ''}`;
      case 'loaded': return `loaded · ${entry.bytes} bytes${entry.truncated?' · truncated':''}${stale || entry.freshness==='stale' ? ' · stale' : ''}${shown<entry.preview.length?` · ${shown}/${entry.preview.length} lines`:''}`;
    }
  };
  // Start at the first reference from which the selected one still fits with a minimal preview.
  let start=0;
  const need=(from:number):number=>{let sum=0;for(let i=from;i<=pick;i++) sum+=1+previewCount(entries[i],i===pick?3:2);return sum;};
  while(start<pick && need(start)>room-(pick<refs.length-1?1:0)) start++;
  const draw=(budget:number):{rows:string[];drawn:number}=>{
    const rows:string[]=[];
    let drawn=0;
    for(let i=start;i<refs.length && rows.length<budget;i++){
      const entry=entries[i];
      const remaining=budget-rows.length-1;
      const shown=previewCount(entry,i===pick ? remaining : Math.min(2,remaining));
      rows.push(`${i===pick?ascii?'>':'❯':' '} ${safe(refs[i],ascii)} · ${label(entry,shown)}`);
      if(entry.state==='loaded') for(const text of entry.preview.slice(0,shown)) rows.push(`    ${ascii?'|':'│'} ${text}`);
      drawn++;
    }
    return {rows,drawn};
  };
  const full=draw(room);
  if(start+full.drawn>=refs.length) return full.rows;
  // References beyond the room are counted, never silently dropped.
  const trimmed=draw(Math.max(1,room-1));
  const hidden=refs.length-start-trimmed.drawn;
  return hidden>0 && room>1 ? [...trimmed.rows,`${ascii?'...':'…'} ${hidden} more reference${hidden===1?'':'s'} (viewport)`] : trimmed.rows;
}

/** What the model-backed timeline view reads from the inspector state; the host rebuilds the model when these change. */
interface TimelineView { zoom: number; pan: number; filter: string; focused: string | null; selectedKey: string | undefined }
/** Contract ceiling on bar columns (workbench.timeline/v1 columns 8..200); a hand-built model cannot make a line longer. */
const MAX_BAR_CELLS = 200;
const barCells = (value: number): number => Number.isSafeInteger(value) && value > 0 ? Math.min(value, MAX_BAR_CELLS) : 0;
const plural = (count: number, word: string): string => `${count} ${word}${count===1?'':'s'}`;
const NOTE_PHRASES: Readonly<Record<Exclude<TimelineNote['code'],'intervals-missing'>,string>> = {
  'clocks-may-differ': 'clocks may differ across sources',
  'open-intervals-present': 'open intervals present (drawn open, no end observed)',
  'stale-rows-present': 'stale rows present',
  'window-partial': 'observation window is partial',
  'relation-page-full': 'relation page full; lane placement may be incomplete',
  'multiple-parents': 'rows with multiple observed parents',
  'rows-outside-viewport': 'rows outside the bar viewport',
  'phase-kinds-unavailable': 'waiting/blocked/executing phases unavailable without producer interval kinds',
};
/** One timeline note as a fixed phrase; an unrecognized code is never echoed. */
function noteText(note: TimelineNote): string {
  if(note.code==='intervals-missing') return `Note: ${Number.isSafeInteger(note.count) ? plural(note.count,'row') : 'rows'} without a source interval`;
  const phrase=Object.hasOwn(NOTE_PHRASES,note.code) ? NOTE_PHRASES[note.code] : undefined;
  return `Note: ${phrase ?? 'unrecognized note code'}`;
}
/** Lines of the model-backed timeline view, at most `room`. Every cell, instant and duration comes from the TimelineModel the
 * host supplied; nothing here reads a clock, parses a timestamp or derives a bar, and each producer string is sanitized
 * individually (the bar is built from fixed glyphs and so is never collapsed by the shared sanitizer). Truncation flags and
 * notes are fixed phrases and survive the row budget ahead of lane and row lines. */
function timelineModelLines(timeline: TimelineModel, view: TimelineView, inner: number, ascii: boolean, room: number): string[] {
  // safe() is the shared helper's named terminal layout (wb-952 site 24): redaction reads every gap before anything is stripped.
  const clean=(text: unknown):string=>safe(String(text),ascii);
  const ellipsis=ascii?'...':'…';
  /** The plain ASCII tier must stay ASCII (WB-028): separators are tier-aware instead of leaning on the '?' substitution. */
  const sep=ascii?'-':'·';
  const span=timeline.origin.basis==='none' || timeline.span.ms===null ? 'span unknown' : `span ${clean(timeline.span.ms)}ms ${timeline.span.complete?'complete':'partial'}`;
  const zoom=Math.min(view.zoom,MAX_ZOOM);
  const head=[
    `Lanes ${sep} ${span} ${sep} origin ${clean(timeline.origin.basis)} ${sep} ${clean(timeline.contract)}`,
    `measured concurrency max ${clean(timeline.concurrency.maxMeasured)} (${clean(timeline.concurrency.basis)}) ${sep} zoom ${clean(zoom)}x ${sep} pan ${clean(view.pan)}`,
  ].map(text=>clean(text));
  if(room<=head.length) return head.slice(0,Math.max(0,room));
  const laneCount=timeline.lanes.length;
  const rowCount=timeline.lanes.reduce((sum,lane)=>sum+lane.rows.length,0);
  const shown=`${plural(laneCount,'lane')}, ${plural(rowCount,'row')}`;
  const notices:string[]=[];
  if(timeline.truncated.lanes) notices.push(`Truncated lanes: showing ${plural(laneCount,'lane')}; further lanes are not in the model`);
  if(timeline.truncated.rows) notices.push(`Truncated rows: showing ${plural(rowCount,'row')} in ${plural(laneCount,'lane')}; further rows are not in the model`);
  if(timeline.truncated.relations) notices.push(`Truncated relations: lane placement may be incomplete (${shown} shown)`);
  if(timeline.truncated.window) notices.push(`Truncated window: rows beyond the model window are not shown (${shown} shown)`);
  for(const note of timeline.notes) notices.push(noteText(note));
  const labelWidth=Math.min(24,Math.max(8,Math.floor(inner/3)));
  const mark=ascii?{pointer:'>',left:'<',right:'>',open:'~',bar:'#',delimiter:'|',lane:'::'}:{pointer:'❯',left:'◀',right:'▶',open:'…',bar:'━',delimiter:'│',lane:'▌'};
  const filter=view.filter.toLowerCase();
  const narrowed=filter!=='' || view.focused!==null;
  const rowLine=(row: TimelineRow):string=>{
    const bar=row.bar;
    const timing=row.timing.kind==='closed' ? `${clean(row.timing.durationMs)}ms` : row.timing.kind==='open' ? 'open' : clean(row.timing.reason);
    const label=truncateToWidth(clean(row.title),labelWidth,ellipsis,true);
    const lead=`${row.key===view.selectedKey?mark.pointer:' '} ${toneGlyph(row.freshness,row.tone,ascii)} ${label} `;
    if(bar===null) return `${lead}${timing}${row.timing.kind==='unavailable'?'':' (outside viewport)'}`;
    const length=barCells(bar.lengthCells);
    const cells=Array.from({length},()=>mark.bar);
    if(length>0 && bar.clippedLeft) cells[0]=mark.left;
    if(length>0 && bar.clippedRight) cells[length-1]=mark.right;
    if(length>0 && bar.openEnded) cells[length-1]=mark.open;
    const padded=timing+' '.repeat(Math.max(0,10-visibleWidth(timing)));
    return `${lead}${padded} ${mark.delimiter}${' '.repeat(barCells(bar.offsetCells))}${cells.join('')}`;
  };
  // The selected body line index lets a clipped body scroll to keep the pointer row visible.
  const body:{text:string;row:boolean;selected:boolean}[]=[];
  for(const lane of timeline.lanes){
    const rows=lane.rows.filter(row=>(view.focused===null || row.key===view.focused) &&
      (filter==='' || `${row.title} ${row.nativeRef.provider}/${row.nativeRef.type}/${row.nativeRef.id}`.toLowerCase().includes(filter)));
    if(narrowed && rows.length===0) continue;
    body.push({text:`${mark.lane} ${clean(lane.label)} ${sep} ${clean(lane.basis)} ${sep} ${lane.confirmed?'confirmed':'unconfirmed'} ${sep} ${plural(lane.rows.length,'row')}`,row:false,selected:false});
    for(const row of rows) body.push({text:rowLine(row),row:true,selected:row.key===view.selectedKey});
  }
  if(body.length===0) body.push({text:narrowed?'No timeline rows match the filter or focus (viewport)':'The timeline model holds no lanes',row:false,selected:false});
  const avail=room-head.length;
  const noticeBudget=Math.min(notices.length,avail<=2?avail:avail-2);
  const bodyBudget=avail-noticeBudget;
  let bodyLines:string[];
  if(body.length<=bodyBudget) bodyLines=body.map(item=>item.text);
  else if(bodyBudget<=0) bodyLines=[];
  else {
    const capacity=bodyBudget-1;
    const at=body.findIndex(item=>item.selected);
    const start=at>=capacity ? at-capacity+1 : 0;
    const visible=body.slice(start,start+capacity);
    const hiddenRows=body.filter(item=>item.row).length-visible.filter(item=>item.row).length;
    const hiddenLanes=body.filter(item=>!item.row).length-visible.filter(item=>!item.row).length;
    const parts=[...(hiddenRows>0?[`${hiddenRows} more row${hiddenRows===1?'':'s'}`]:[]),...(hiddenLanes>0?[`${hiddenLanes} more lane${hiddenLanes===1?'':'s'}`]:[])];
    bodyLines=[...visible.map(item=>item.text),`${ellipsis} ${parts.join(', ')} (row budget)`];
  }
  const noticeLines=notices.length<=noticeBudget ? notices
    : noticeBudget>1 ? [...notices.slice(0,noticeBudget-1),`${ellipsis} ${notices.length-noticeBudget+1} more notices (row budget)`] : notices.slice(0,noticeBudget);
  return [...head,...bodyLines,...noticeLines.map(text=>clean(text))];
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
  } else if(state.view==='timeline' && model.timeline){
    // Lines are already sanitized per producer string; bar cells are fixed glyphs, so they bypass the space-collapsing add().
    const room=Math.max(0,height-1-(paged?1:0)-lines.length);
    const view:TimelineView={zoom:state.zoom,pan:state.pan,filter:state.filter,focused:state.focused,selectedKey:current?.key};
    for(const text of timelineModelLines(model.timeline,view,inner,ascii,room)) lines.push(` ${stripTerminalSequences(truncateToWidth(text,inner,ascii?'~':'…'))}`);
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
    add(model.evidence ? 'Evidence / details · producer references; payload loads on focus (Enter)' : 'Evidence / details · producer references, not fetched payload');
    if(current){
      add(`Native ref: ${safe(ref(current),ascii)}`);
      add(`Status: ${safe(current.presentation.statusText,ascii)} · ${current.presentation.statusTone}`);
      add(`Freshness: ${current.freshness} · ${current.sourceConnectionState} · coverage ${current.completeness}`);
      add(`Confirmed: ${current.lastConfirmedAt ?? 'not confirmed'}`);
      add(`Basis: ${safe(current.subjectBasis??'not supplied',ascii)}`);
      add(`Definition: ${safe(current.definitionDigest??'not supplied',ascii)}`);
      add(`Source: not supplied by observation`);
      add(`Evidence: ${current.evidenceRefs.length} reference${current.evidenceRefs.length===1?'':'s'}${model.evidence && current.evidenceRefs.length>0 ? ` · ${Math.min(Math.max(0,state.evidenceIndex),current.evidenceRefs.length-1)+1}/${current.evidenceRefs.length} selected · e next · Enter load` : ''}`);
      if(model.evidence){
        // Room for evidence rows: the footer, the relations line and the transcript hint stay.
        for(const text of evidenceRows(model.evidence,current,state.evidenceIndex,height-lines.length-(paged?1:0)-4,ascii)) add(text);
      } else {
        const evidenceShown = Math.min(current.evidenceRefs.length,Math.max(0,height-lines.length-5));
        for(const evidence of current.evidenceRefs.slice(0,evidenceShown)) add(`  ${safe(evidence,ascii)}`);
        if(current.evidenceRefs.length>evidenceShown) add('  Further references available at producer.');
      }
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
