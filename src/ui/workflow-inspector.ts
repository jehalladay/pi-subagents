/** Read-only terminal inspector over the bounded producer-qualified observation projection.
 * A row is a source observation, never an assertion of ownership or verification.
 */
import { matchesKey, stripTerminalSequences, truncateToWidth, visibleWidth } from '@earendil-works/pi-tui';
import type { AttentionBottleneck, AttentionReport } from '../workbench/attention.js';
import type { EvidenceEntry, EvidenceStore } from '../workbench/evidence-loader.js';
import type { GraphEdge, GraphReference, GraphViewModel } from '../workbench/graph-view.js';
import type { NativeRef, ObservationProjection, ObservationScope, ObservationTruncation, ObservedNode, Relation } from '../workbench/observation.js';
import { sanitizeWorkbenchText } from '../workbench/redaction.js';
import { MAX_ZOOM, type TimelineModel, type TimelineNote, type TimelineRow } from '../workbench/timeline.js';
import type { LinkedTopology, TopologyEdge, TopologyReference, TopologyReferenceReason, TopologyRelationClass } from '../workbench/topology-slice.js';
import { safeWorkflowTerminalText } from './workflow-card.js';

export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';
export interface InspectorModel {
  projection: ObservationProjection;
  scope: ObservationScope;
  invocationId: string;
  title: string;
  status: string;
  /** Graph-view model the host builds per redraw (createGraphViewBuilder, wb-6ze.32); absent means the graph view renders exactly
   * as before. The layout only draws it: it reads no relation page and never rebuilds or re-lays out the model. */
  graph?: GraphViewModel;
  /** Read side of the lazy evidence store; absent means the details view renders exactly as before. */
  evidence?: Pick<EvidenceStore, 'get' | 'request' | 'abortAll'>;
  /** Lane model the host builds per redraw (buildTimelineLanes); absent means the timeline view renders exactly as before. */
  timeline?: TimelineModel;
  /** Read side of the linked topology selector for one node; absent means the details view renders exactly as before. */
  topology?: (node: ObservedNode) => LinkedTopology | undefined;
  /** Attention report the caller computed with its own clock at redraw cadence; absent means the overview renders exactly as before.
   * The layout only draws it: it never computes attention and never reads a clock. */
  attention?: AttentionReport;
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
export interface InspectorSize {
  width: number;
  rows: number;
  ascii?: boolean;
  /** Opt in to the docs/10 pane tiers (two panes at 80-119 columns, three at 120 and above, both needing 20 rows). Absent or false keeps
   * the single-column rendering at every size, so a host that passes only width and rows is unchanged. */
  panes?: boolean;
}
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
/** The page of `count` rows around the row index, centred on it and clamped to the viewport end, from ONE window() read per pane
 * (P6, wb-feo). Where the page lands depends on the viewport total, which only that read returns, so the read spans every page a
 * total consistent with the row can select: from the page that ends at the row through the page centred on it. That is at most
 * half a page read above the drawn rows (docs/10 "Virtualized visible rows + modest overscan"), count + ceil(count/2) - 1 rows in
 * all, and the drawn page is cut out of it. The single exception is N2 (owner ruling 2026-10-17T23:33Z): a stored row index at or
 * past the end of a non-empty viewport and a page or more down (index >= total > 0 and index >= count; the selection left the
 * viewport and the index outlived it) takes one more read, of the clamped page. A row index the reducers never store adds no
 * other second read: a fraction is read as its whole part is, and 2^53 or more reads from the top (a second read only past the end
 * of a viewport longer than a page, N2's case); NaN, or a fraction whose page would start between rows, throws in the projection
 * as the two-read renderer did. */
function rowWindow(model: InspectorModel, state: InspectorState, count: number): {nodes:ObservedNode[];offset:number;total:number;revision:number} {
  const query={scope:model.scope,invocationId:model.invocationId};
  const half=Math.floor(count/2);
  const row=Math.max(0,state.index);
  const at=Math.floor(row);
  const exact=Number.isSafeInteger(at);
  const from=exact ? Math.max(0,at-count+1) : 0;
  const read=model.projection.window({...query,offset:from,limit:exact ? Math.min(Math.max(0,at-half),count-1-half)+count : count});
  const index=Math.min(row,Math.max(0,read.total-1));
  const offset=Math.max(0,Math.min(index-half,read.total-count));
  const end=Math.min(read.total,offset+count);
  if(end<=offset) return {nodes:[],offset,total:read.total,revision:read.revision};
  if(offset>=from && end-from<=read.nodes.length) return {nodes:read.nodes.slice(offset-from,end-from),offset,total:read.total,revision:read.revision};
  return {...model.projection.window({...query,offset,limit:count}),offset};
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

/** Greedy word wrap of already-sanitized text to lines of at most `width` columns; an over-long word is split by character. */
function wrapWords(text: string, width: number): string[] {
  const out:string[]=[];
  let line='';
  for(const word of text.split(' ')){
    if(word==='') continue;
    if(visibleWidth(word)>width){
      if(line!==''){out.push(line);line='';}
      for(const char of Array.from(word)){
        if(line!=='' && visibleWidth(line+char)>width){out.push(line);line='';}
        line+=char;
      }
    } else if(line==='') line=word;
    else if(visibleWidth(`${line} ${word}`)<=width) line=`${line} ${word}`;
    else {out.push(line);line=word;}
  }
  if(line!=='') out.push(line);
  return out.length>0 ? out : [''];
}
/** Lays out segments joined by their `lead`, starting a new line before a segment that would not fit whole, so a count or a
 * marker such as "page truncated" is never split across lines. A segment longer than a line is word-wrapped. */
function wrapSegments(items: readonly {lead: string; text: string}[], width: number): string[] {
  const out:string[]=[];
  let line='';
  for(const item of items){
    if(line!=='' && visibleWidth(`${line}${item.lead}${item.text}`)<=width){line=`${line}${item.lead}${item.text}`;continue;}
    if(line!=='') out.push(line);
    const chunks=wrapWords(item.text,width);
    out.push(...chunks.slice(0,-1));
    line=chunks[chunks.length-1];
  }
  if(line!=='') out.push(line);
  return out;
}
const clockText = (ms: number): string => {
  if(!Number.isFinite(ms)) return '--:--';
  const total=Math.floor(Math.max(0,ms)/1000);
  return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
};
const MAX_PANEL_PROVIDERS = 4;
const MAX_PANEL_PROVIDER_WIDTH = 24;
const MAX_PANEL_TREE_MIN = 5;
const PANEL_CONTINUATION = '  ';
interface AttentionPanel {
  /** The counts line(s) and the critical-path line(s): always drawn. */
  head: string[];
  tail: string[];
  /** One entry per bottleneck row, in report order; dropped from the bottom first. */
  rows: string[];
  /** The caller-clock caveat that qualifies the open times on the rows. */
  clock: string[];
  /** Unmeasured and clock-skew counts. */
  notes: string[];
}
/** The panel's text for one report. Every producer-supplied string passes the shared helper exactly once here (the inspector's
 * safe(), the "terminal" layout), before any truncation or wrap; the lines are then emitted without a second pass. The report
 * is only read, never recomputed. */
function attentionPanel(report: AttentionReport, inner: number, ascii: boolean, compact: boolean): AttentionPanel {
  const sep=ascii ? ' | ' : ' · ';
  const ellipsis=ascii ? '~' : '…';
  const { counts }=report;
  const providers=report.disconnectedProviders.slice(0,MAX_PANEL_PROVIDERS)
    .map(name=>truncateToWidth(safe(name,ascii),MAX_PANEL_PROVIDER_WIDTH,ellipsis));
  const hidden=report.disconnectedProviders.length-providers.length;
  const countItems=[
    {lead:'',text:`Attention: active ${counts.active}`},
    {lead:sep,text:`waiting ${counts.waiting}`},
    {lead:sep,text:`stale ${counts.stale}`},
    {lead:sep,text:`unknown ${counts.unknown}`},
    {lead:sep,text:`disconnected ${counts.disconnected}`},
    ...(providers.length>0 ? [{lead:' ',text:`(providers: ${providers.join(', ')}${hidden>0?`, +${hidden} more`:''})`}] : []),
  ];
  const path=report.criticalPath;
  const pathItems=[
    path.label==='partial-estimated'
      ? {lead:'',text:`Critical path: partial-estimated ${clockText(path.measuredMs)} over ${path.coverage.chainNodes} nodes/${path.coverage.dependencyEdges} edges`}
      : {lead:'',text:`Critical path: incomplete trace (${path.reasons.map(reason=>safe(reason,ascii)).join(', ')})`},
    ...(path.label==='partial-estimated' ? [{lead:sep,text:safe(path.caveat,ascii)}] : []),
    ...(report.examined.truncated ? [{lead:sep,text:'page truncated'}] : []),
  ];
  // Continuation lines are indented so a wrapped line never reads as a separate fact.
  const wrapped=(items:readonly {lead:string;text:string}[]):string[]=>wrapSegments(items,inner-PANEL_CONTINUATION.length).map((text,at)=>at===0 ? text : `${PANEL_CONTINUATION}${text}`);
  const panel:AttentionPanel={head:wrapped(countItems),tail:wrapped(pathItems),rows:[],clock:[],notes:[]};
  if(compact) return panel;
  const row=(bottleneck: AttentionBottleneck):string => {
    const glyph=toneGlyph(bottleneck.freshness,bottleneck.tone,ascii);
    const provider=truncateToWidth(safe(bottleneck.nativeRef.provider,ascii),MAX_PANEL_PROVIDER_WIDTH,ellipsis);
    // Open time is drawn only for an entry the report states as measured.
    const open=bottleneck.measured===true && Number.isFinite(bottleneck.openMs) ? `open ${clockText(bottleneck.openMs)} measured` : 'open unavailable';
    const suffix=`${sep}${provider}${sep}${open}${sep}${safe(bottleneck.freshness,ascii).toUpperCase()}`;
    const room=Math.max(1,inner-visibleWidth(glyph)-1-visibleWidth(suffix));
    return `${glyph} ${truncateToWidth(safe(bottleneck.title,ascii),room,ellipsis)}${suffix}`;
  };
  panel.rows=report.bottlenecks.map(row);
  if(report.bottlenecks.length>0) panel.clock=wrapWords(`Clock: ${safe(report.clockCaveat,ascii)}`,inner-PANEL_CONTINUATION.length).map((text,at)=>at===0 ? text : `${PANEL_CONTINUATION}${text}`);
  if(report.unmeasured>0) panel.notes.push(`+${report.unmeasured} unmeasured (no open interval)`);
  if(report.clockSkew>0) panel.notes.push(`clock skew ${report.clockSkew} (clamped)`);
  return panel;
}
/** The overview's attention and critical-path reading when no AttentionReport is supplied: fixed text, no producer string. */
const NO_REPORT_READING = ['Attention: stale/unknown is last-known state, not live progress.', 'Critical path: incomplete trace (no complete dependency/interval proof).'] as const;
/** The no-report reading as one pane of a composition draws it (wb-8na, owner R505 N2): each line passes the shared helper once (the
 * inspector's safe(), the "terminal" layout) and is word-wrapped to the pane as the compact panel wraps its own lines, continuation
 * rows indented, so a pane narrower than a sentence never cuts it. The rows are emitted width-bounded only, as panel rows are. */
function noReportPaneReading(inner: number, ascii: boolean): string[] {
  return NO_REPORT_READING.flatMap(text=>wrapWords(safe(text,ascii),inner-PANEL_CONTINUATION.length).map((part,at)=>at===0 ? part : `${PANEL_CONTINUATION}${part}`));
}
/** The optional panel lines (bottleneck rows, a dropped-row note, the clock caveat, the unmeasured and skew notes) that fit `budget`.
 * Notes are kept first; bottleneck rows are dropped from the bottom and the dropped ones are counted, never silent. */
function fitAttentionPanel(panel: AttentionPanel, budget: number): string[] {
  const notes=panel.notes.slice(0,Math.max(0,budget));
  const room=budget-notes.length;
  const total=panel.rows.length;
  let shown=0;
  let withClock=false;
  for(const clock of [true,false]){
    const cost=clock ? panel.clock.length : 0;
    // k rows plus the note counting the others (when any are dropped) plus the clock caveat must fit.
    for(let k=total;k>=1;k--){
      if(k+(k<total?1:0)+cost<=room){shown=k;withClock=clock && cost>0;break;}
    }
    if(shown>0) break;
  }
  const dropped=total-shown;
  const more=dropped>0 && room-shown-(withClock?panel.clock.length:0)>=1 ? [`+${dropped} more bottleneck${dropped===1?'':'s'}`] : [];
  return [...panel.rows.slice(0,shown),...more,...(withClock ? panel.clock : []),...notes];
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
/** The cap remainder line (wb-ea1): counts and fixed words only, so nothing a producer supplies can reach it. Undefined when
 * the projection dropped nothing for this invocation, so an uncapped frame is drawn byte-identically. */
const capRemainder = (cut: ObservationTruncation, ascii: boolean): string | undefined => {
  if(cut.nodes===0 && cut.events===0) return undefined;
  const events=`${plural(cut.events,'event')} not shown`;
  if(cut.nodes===0) return `${events}: projection event cap ${cut.maxEvents}`;
  const nodes=`${plural(cut.nodes,'node')} not shown: projection cap ${cut.maxNodes}`;
  return cut.events===0 ? nodes : `${nodes}${ascii?' | ':' · '}${events}`;
};
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

const TOPOLOGY_CLASS_LABEL: Readonly<Record<TopologyRelationClass, string>> = {
  'declared-dependency':'declared dependency','observed-causal':'observed causal','lifecycle-ownership':'lifecycle ownership (native-confirmed)',
  grouping:'grouping','inferred-hypothesis':'inferred hypothesis',
};
const TOPOLOGY_REASON_LABEL: Readonly<Record<TopologyReferenceReason, string>> = {
  cycle:'cycle','missing-provenance':'missing provenance','unconfirmed-ownership':'unconfirmed ownership','unknown-endpoint':'unknown endpoint','unknown-relation-kind':'unknown relation kind',
};
/** One topology line. `count` is the number of edges and references it stands for, so a budget cut can be counted. */
interface TopologyRow {text:string; count:number}
/** Whether a native reference has no node in the projection's scope. A read only; absence is stated, never inferred away. */
const unobservedEndpoint=(model:InspectorModel,edge:TopologyEdge):boolean=>
  model.projection.query({scope:model.scope,limit:1,ref:edge.nativeRef}).nodes.length===0;
/** Producer text (provenance source, neighbour identity) bound for a row: the ONE shared helper with the NAMED 'label' layout (the
 * slice's own labelOf layout, 160-unit cap), then the row's own safe(). No local pre-pass: rewriting or deleting a gap before the
 * helper hides the raw text it reads, so a unit glued inside a keyword, prefix or token would split it past redaction. */
const topologyText=(text:string):string=>sanitizeWorkbenchText(text,160,'label');
/** The neighbour leads the row so a narrow terminal truncates provenance, never the identity. */
function topologyEdgeRow(model:InspectorModel,edge:TopologyEdge,direction:'upstream'|'downstream',ascii:boolean):TopologyRow{
  const glyph=direction==='downstream' ? edgeGlyph(ascii) : ascii ? '<-' : '←';
  // A declared edge to a never-observed endpoint stays a declared dependency and says so; it is not an unknown-dynamic reference.
  const unobserved=edge.relation==='declared-dependency' && unobservedEndpoint(model,edge) ? ' · unobserved endpoint' : '';
  const authority=edge.authoritative ? '' : ' · non-authoritative';
  const when=edge.provenance.observedAt!==undefined ? ` @${edge.provenance.observedAt}` : ' · no timestamp';
  return {text:`${glyph} ${topologyText(keyRef(edge.key))} · ${TOPOLOGY_CLASS_LABEL[edge.relation]}${unobserved}${authority} [${topologyText(edge.provenance.sourceLabel)}${when}]`,count:1};
}
function topologyReferenceRow(reference:TopologyReference):TopologyRow{
  const named=topologyText(reference.nativeRef ? keyRef(reference.key) : reference.label);
  return {text:`reference -> ${named} · ${TOPOLOGY_REASON_LABEL[reference.reason]} (${reference.direction})`,count:1};
}
/** Rows for the details view's linked topology: bounded by `room`, every cut counted on one remainder row. */
function topologyRows(model:InspectorModel,slice:LinkedTopology,room:number,ascii:boolean):string[]{
  const dots=ascii?'...':'…';
  const rows:TopologyRow[]=[];
  const empty=slice.upstream.edges.length+slice.upstream.remainder.count+slice.downstream.edges.length+slice.downstream.remainder.count+slice.references.length+slice.referencesRemainder===0;
  // Two distinct states (owner F1): "no observed relations" is for a COMPLETE empty slice only; a truncation flag always says incomplete trace, and neither substitutes for the other.
  const truncated=slice.trace.reasons.some(reason=>reason==='relations-truncated' || reason==='cycle-search-truncated');
  const why=slice.trace.reasons.filter(reason=>reason!=='no-observed-relations').map(reason=>reason.replace(/-/g,' ')).join(', ');
  const incomplete=`Topology: incomplete trace${why===''?'':` (${why})`}`;
  if(empty) return [truncated ? incomplete : `Topology: no observed relations (missing edges do not imply independence)`];
  if(slice.trace.label==='incomplete-trace') rows.push({text:incomplete,count:0});
  for(const [title,direction,side] of [['Upstream','upstream',slice.upstream],['Downstream','downstream',slice.downstream]] as const){
    const total=side.edges.length+side.remainder.count;
    if(total===0) continue;
    rows.push({text:`${title} (${total}${side.remainder.atLeast?'+':''})`,count:0});
    for(const edge of side.edges) rows.push(topologyEdgeRow(model,edge,direction,ascii));
    if(side.remainder.count>0) rows.push({text:`${dots} +${side.remainder.count} more (bounded)${side.remainder.atLeast?' (partial)':''}`,count:side.remainder.count});
  }
  for(const reference of slice.references) rows.push(topologyReferenceRow(reference));
  if(slice.referencesRemainder>0) rows.push({text:`${dots} +${slice.referencesRemainder} more reference${slice.referencesRemainder===1?'':'s'} (bounded)`,count:slice.referencesRemainder});
  if(rows.length<=room) return rows.map(row=>row.text);
  const kept=rows.slice(0,room-1);
  const cut=rows.slice(room-1).reduce((sum,row)=>sum+row.count,0);
  return [...kept.map(row=>row.text),...(cut>0 ? [`${dots} +${cut} more (bounded)`] : [])];
}

/** The documented relation class of a graph-view edge: the RelationKind table topology-slice.ts applies, so the graph and the
 * details views name one class alike. */
const GRAPH_CLASS: Readonly<Record<GraphEdge['class'], TopologyRelationClass>> = {
  dependency:'declared-dependency', causation:'observed-causal', ownership:'lifecycle-ownership', grouping:'grouping', hypothesis:'inferred-hypothesis',
};
/** Partial-label rows the graph view keeps ahead of every block, so a truncated read is never pushed out by the row budget. */
const MAX_GRAPH_PARTIAL_ROWS = 3;
/** Edge rows one node block lists before it counts the rest, so one hub cannot fill the viewport. */
const MAX_GRAPH_BLOCK_EDGES = 8;
/** What the model-backed graph view reads from the inspector state. */
interface GraphViewState { selectedKey: string | undefined; focused: string | null; filter: string; collapsed: readonly string[] }
/** One drawn unit of the graph view, kept whole or counted whole by the row-budget notice. */
interface GraphBlock { lines: string[]; aggregates: number; nodes: number; edges: number; references: number; holds: boolean }
/** The notice for blocks the row budget cut: every one is counted by kind, and a selection among them stays visible. */
function graphBudgetNotice(rest: readonly GraphBlock[], ascii: boolean): string {
  const total=(pick:(block:GraphBlock)=>number):number=>rest.reduce((sum,block)=>sum+pick(block),0);
  const counts:readonly (readonly [number,string])[]=[[total(block=>block.aggregates),'aggregate'],[total(block=>block.nodes),'node'],
    [total(block=>block.edges),'edge'],[total(block=>block.references),'reference']];
  const parts=counts.filter(([count])=>count>0).map(([count,word])=>`${count} ${word}${count===1?'':'s'}`);
  return `${rest.some(block=>block.holds)?ascii?'> ':'❯ ':''}${ascii?'...':'…'} more: ${parts.join(', ')} (row budget)`;
}
/** Rows of the graph view drawn from a graph-view model alone (wb-6ze.34), within `room` rows: no relation page is read and
 * nothing is laid out again, the model carries the topology-revision cache. Aggregate supernodes come first, then one block per
 * node row with the typed edges drawn under it, then explicit reference rows: a cycle is never drawn as an arrow, and an edge
 * whose endpoint the view does not hold is a reference, or a declared dependency marked as such, never an arrow between shown
 * rows. A row leads with its fixed vocabulary (class, marker, reason) so a narrow terminal truncates names and provenance, never
 * the marker. Partial labels are kept before any block. Producer text is the model's sanitized
 * label fields; an endpoint the model holds no row for is identity text and passes the shared helper's named label layout
 * (topologyText) first, so no key or native reference is printed raw. The caller's add() then passes every row through safe(). */
function graphModelRows(graph: GraphViewModel, view: GraphViewState, room: number, ascii: boolean): string[] {
  const sep=ascii?' | ':' · ';
  const dots=ascii?'...':'…';
  const forward=edgeGlyph(ascii);
  const backward=ascii?'<-':'←';
  const byKey=new Map(graph.nodes.map(node=>[node.key,node] as const));
  const named=(key:string):string=>byKey.get(key)?.label || topologyText(keyRef(key));
  const classOf=(kind:GraphEdge['class']):string=>TOPOLOGY_CLASS_LABEL[GRAPH_CLASS[kind]];
  const source=(text:string):string=>`[${text===''?'unlabeled source':text}]`;
  // Focus and filter narrow the rows exactly as the per-node blocks do: the focused key, or the label and native provider/type/id.
  const narrowed=view.focused!==null || view.filter!=='';
  const needle=view.filter.toLowerCase();
  const shown=graph.nodes.filter(node=>(view.focused===null || node.key===view.focused) &&
    (needle==='' || `${node.label} ${node.nativeRef.provider}/${node.nativeRef.type}/${node.nativeRef.id}`.toLowerCase().includes(needle)));
  const visible=new Set(shown.map(node=>node.key));
  const under=new Map<string,string[]>();
  const loose:string[]=[];
  // An edge is drawn once: under its source row when that row is shown, else under its target row, else on its own line when
  // nothing narrows the view.
  const place=(from:string,to:string,body:(glyph:string,other:string)=>string):void=>{
    if(visible.has(from)) under.set(from,[...(under.get(from)??[]),body(forward,named(to))]);
    else if(visible.has(to)) under.set(to,[...(under.get(to)??[]),body(backward,named(from))]);
    else if(!narrowed) loose.push(`${named(from)}${sep}${body(forward,named(to))}`);
  };
  for(const edge of graph.edges) place(edge.from,edge.to,(glyph,other)=>`${classOf(edge.class)} ${glyph} ${other}${edge.crossProvider?`${sep}cross-provider`:''} ${source(edge.source)}`);
  const references:GraphReference[]=[];
  for(const reference of graph.references){
    // A declared edge to an endpoint the view does not hold stays a declared dependency and says so; it is never an
    // unknown-dynamic reference (BOUNDARY 2026-10-15T10:58:33Z: declared-vs-dynamic is where the knowledge came from, observed or
    // not is the endpoint's state).
    if(reference.reason==='endpoint-not-in-view' && reference.class==='dependency'){
      place(reference.from,reference.to,(glyph,other)=>`${classOf(reference.class)}${sep}unobserved endpoint (not in view) ${glyph} ${other} ${source(reference.source)}`);
    } else if(!narrowed || visible.has(reference.from) || visible.has(reference.to)) references.push(reference);
  }
  const blocks:GraphBlock[]=[];
  for(const supernode of graph.supernodes){
    if(narrowed && !visible.has(supernode.from)) continue;
    const parts=[`aggregate${sep}${supernode.label}`,supernode.classes.map(classOf).join('/'),
      supernode.providers.map(entry=>`${entry.provider===''?'unlabeled':entry.provider} ${entry.count}`).join(', '),
      supernode.tones.map(entry=>`${toneGlyph('current',entry.tone,ascii)}${entry.count}`).join(' ')];
    blocks.push({lines:[parts.filter(part=>part!=='').join(sep)],aggregates:1,nodes:0,edges:0,references:0,holds:false});
  }
  for(const node of shown){
    const edges=under.get(node.key)??[];
    const pointed=node.key===view.selectedKey;
    const head=[`${pointed?ascii?'>':'❯':' '} ${toneGlyph(node.freshness,node.tone,ascii)} ${named(node.key)}`,node.provider,node.type,node.status,
      node.freshness==='current'?'':node.freshness.toUpperCase()].filter(part=>part!=='').join(sep);
    const lines=[head];
    if(view.collapsed.includes(node.key)){
      if(edges.length>0) lines.push(`  ${dots} ${edges.length} relation${edges.length===1?'':'s'} collapsed`);
    } else {
      lines.push(...edges.slice(0,MAX_GRAPH_BLOCK_EDGES).map(text=>`  ${text}`));
      if(edges.length>MAX_GRAPH_BLOCK_EDGES) lines.push(`  ${dots} +${edges.length-MAX_GRAPH_BLOCK_EDGES} more edges of this node (bounded)`);
    }
    blocks.push({lines,aggregates:0,nodes:1,edges:edges.length,references:0,holds:pointed});
  }
  for(const text of loose) blocks.push({lines:[`  ${text}`],aggregates:0,nodes:0,edges:1,references:0,holds:false});
  for(const reference of references){
    const why=reference.reason==='cycle' ? 'cycle' : 'unknown dynamic edge (not in view)';
    blocks.push({lines:[`  reference${sep}${why}${sep}${classOf(reference.class)}${sep}${named(reference.from)} ${forward} ${named(reference.to)} ${source(reference.source)}`],
      aggregates:0,nodes:0,edges:0,references:1,holds:false});
  }
  const space=Math.max(0,room);
  const labels=graph.partials.map(partial=>`partial${sep}${partial.label===''?'truncated read':partial.label}`);
  // Partial labels are kept ahead of every block; one row stays for the budget notice while any block is left to draw.
  const kept=Math.min(labels.length,MAX_GRAPH_PARTIAL_ROWS,blocks.length>0 && space>1 ? space-1 : space);
  const partials=kept>=labels.length ? labels : kept<=0 ? [] : [...labels.slice(0,kept-1),`${dots} +${labels.length-kept+1} more partial labels (bounded)`];
  const budget=space-partials.length;
  const out:string[]=[];
  for(let n=0;n<blocks.length;n++){
    // A block is drawn whole or not at all; the first that does not fit ends the list, and it and every later block are counted.
    if(out.length+blocks[n].lines.length>budget-(n<blocks.length-1?1:0)){
      if(out.length<budget) out.push(graphBudgetNotice(blocks.slice(n),ascii));
      break;
    }
    out.push(...blocks[n].lines);
  }
  return [...out,...partials];
}

/** Pure viewport layout; capped rows fetched from indexed nodes, never raw event history. */
interface ColumnOptions {
  /** Treat the render as one pane of a composition: the wide-terminal "Selected" line and the full attention panel are suppressed. */
  compact: boolean;
  /** Width the header lines (title, view, filter, focus, rule) are built for; the body keeps the column width. */
  headerWidth: number;
  /** View name the header prints, so a pane that renders another view still labels the real state. */
  headerView: InspectorView;
}
interface ColumnResult { lines: string[]; headerCount: number; hasCurrent: boolean; hinted: boolean }
function layoutColumn(model:InspectorModel,state:InspectorState,size:InspectorSize,options?:ColumnOptions):ColumnResult{
  const width=Math.max(12,Math.trunc(size.width));
  const height=Math.max(5,Math.trunc(size.rows));
  const ascii=size.ascii??false;
  const inner=Math.max(1,width-4);
  const compact=options?.compact??false;
  const headerInner=Math.max(1,(options?.headerWidth??width)-4);
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
  // An attention panel line is built from producer strings attentionPanel already passed through the helper once, so it is only
  // width-bounded here: a second pass is a text change (a JSON closing brace after a marker), never a no-op.
  const addPanel=(text:string)=>{if(lines.length<height) lines.push(` ${stripTerminalSequences(truncateToWidth(text,inner,ascii?'~':'…'))}`);};
  // Header lines are built for the full terminal width even when the body is one pane of a composition.
  const addHeader=(text:string)=>{if(lines.length<height) lines.push(` ${limitLine(text,headerInner,ascii)}`);};
  // What the projection's caps dropped for this invocation (wb-ea1): one counted line in the overview and details views, and
  // nothing at all when nothing was dropped. The header names node truncation in every view: an evicted node is a row no view
  // can draw, while an evicted event hides no row of any view (the inspector draws no event history), so an event-only drop
  // is counted on the remainder line alone.
  const cut=model.projection.truncation({scope:model.scope,invocationId:model.invocationId});
  const capLine=capRemainder(cut,ascii);
  const capped=cut.nodes===0 ? '' : ascii ? ' | capped' : ' · capped';
  const title=limitLine(model.title,Math.max(1,headerInner-28-capped.length),ascii);
  addHeader(`${ascii?'[':'╭'} ${title}  ${safe(model.status,ascii)}${capped} ${ascii?']':'╮'}`);
  addHeader(`${(options?.headerView??state.view).toUpperCase()}  ${page.total} observed operation${page.total===1?'':'s'} · ${state.follow?'following':'paused view'} · ${index+1}/${Math.max(1,page.total)}`);
  if(state.filter) addHeader(`Filter (viewport): ${state.filter}${state.editingFilter?'_':''}`);
  if(state.focused) addHeader('Focused on selected node and confirmed direct relations only');
  addHeader(ascii?'-'.repeat(Math.min(headerInner,48)):'─'.repeat(Math.min(headerInner,48)));
  const headerCount=lines.length;
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
    const panel=model.attention ? attentionPanel(model.attention,inner,ascii,compact || width<80 || height<20) : undefined;
    // Without a report a pane wraps the fixed reading to its width (wb-8na); the single column draws it as before, one row a line.
    const reading=panel || !compact ? undefined : noReportPaneReading(inner,ascii);
    const available=height-lines.length-(current && !compact && width>=80 ? 1 : 0)-(paged ? 1 : 0)-1-(capLine ? 1 : 0);
    const fixed=panel ? panel.head.length+panel.tail.length : reading ? reading.length : NO_REPORT_READING.length;
    // The tree keeps a few rows; bottleneck rows and notes take only what remains, dropping from the bottom.
    const optional=panel ? fitAttentionPanel(panel,Math.max(0,available-fixed-Math.min(entries.length,MAX_PANEL_TREE_MIN))) : [];
    const room=available-fixed-optional.length;
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
    if(capLine){
      // The cap remainder ends the tree; only a header block taller than the terminal yields a row to it.
      while(lines.length>0 && lines.length>=height) lines.pop();
      add(capLine);
    }
    if(current && !compact && width>=80) add(`Selected  ${safe(ref(current),ascii)} · ${current.evidenceRefs.length} evidence ref${current.evidenceRefs.length===1?'':'s'}`);
    if(panel) for(const text of [...panel.head,...optional,...panel.tail]) addPanel(text);
    else if(reading) for(const text of reading) addPanel(text);
    else for(const text of NO_REPORT_READING) add(text);
  } else if(state.view==='graph'){
    add('Observed reference graph · cycles allowed; missing edges are unknown');
    // With a graph-view model (wb-6ze.34) the model is drawn alone and no relation page is read; without one the per-node blocks
    // below draw exactly as before.
    if(model.graph) for(const text of graphModelRows(model.graph,{selectedKey:current?.key,focused:state.focused,filter:state.filter,collapsed:state.collapsed},height-lines.length-(paged?1:0)-2,ascii)) add(text);
    // A node's block is drawn whole or not at all, so the topology footer and key hint always remain;
    // blocks that do not fit are counted, never silently dropped.
    const limit=height-1-(paged ? 1 : 0)-1;
    const visible=model.graph ? [] : page.nodes.flatMap((node,i)=>(state.focused && node.key!==state.focused) ||
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
        for(const text of evidenceRows(model.evidence,current,state.evidenceIndex,height-lines.length-(paged?1:0)-4-(capLine?1:0),ascii)) add(text);
      } else {
        const evidenceShown = Math.min(current.evidenceRefs.length,Math.max(0,height-lines.length-5-(capLine?1:0)));
        for(const evidence of current.evidenceRefs.slice(0,evidenceShown)) add(`  ${safe(evidence,ascii)}`);
        if(current.evidenceRefs.length>evidenceShown) add('  Further references available at producer.');
      }
      const transcript=current.nativeRef.provider==='claude-agent-sdk' && current.nativeRef.type==='session';
      const topology=model.topology?.(current);
      if(topology){
        // Room for topology rows: the paged line, the key hint, the transcript hint and the cap remainder stay.
        const roomLeft=():number=>height-lines.length-(paged?1:0)-1-(transcript?1:0)-(capLine?1:0);
        if(roomLeft()<1){
          // Owner F5: a hidden section is never silent. One header row yields its line to the marker (the hint and paged line stay).
          while(lines.length>0 && roomLeft()<1) lines.pop();
          add('topology hidden: terminal height');
        } else for(const text of topologyRows(model,topology,roomLeft(),ascii)) add(text);
      } else {
        const related=relationsFor(model,current);
        // Remainder item 2 of the wb-6ze.16 gate, owner ruling R473 R1(b): where the base Relations line cannot fit with the
        // paged line, the key hint, the transcript hint and the cap remainder, header rows yield (the F5 pop above) and the
        // one-line section itself takes the freed row. The marker stays the fallback only where no row can be freed, which
        // would need a height below 2 + paged + transcript + cap remainder with every header row yielded: under the 5-row floor.
        const roomLeft=():number=>height-lines.length-(paged?1:0)-1-(transcript?1:0)-(capLine?1:0);
        if(related.relations.length){
          while(lines.length>0 && roomLeft()<1) lines.pop();
          add(roomLeft()<1 ? 'relations hidden: terminal height' : `Relations: ${related.relations.map(r=>r.kind).slice(0,3).join(', ')}${related.partial?' (partial)':''}`);
        }
      }
      if(transcript) add('c transcript (loaded on focus)');
    } else add('Select an observed operation with j/k.');
    if(capLine){
      // The cap remainder sits under the node body; header rows yield to it so the paged line and key hint stay.
      while(lines.length>0 && height-lines.length-(paged?1:0)-1<1) lines.pop();
      add(capLine);
    }
  }
  if(paged) add(`Rows ${page.offset+1}-${page.offset+page.nodes.length}/${page.total} · viewport only`);
  while(lines.length<Math.min(height-1,5)) add('');
  const hinted=lines.length<height;
  add('Tab views · j/k · Esc back/close');
  return {lines:lines.slice(0,height),headerCount:Math.min(headerCount,lines.length),hasCurrent:current!==undefined,hinted};
}

/** Pane geometry (docs/10 "Layout responsiveness"): the two-pane left pane never narrower than PANE_MIN_WIDTH_LEFT, every pane of a
 * three-pane composition at least PANE_MIN_WIDTH_THREE, no pane wider than PANE_MAX_WIDTH. Exported so tests compute tier
 * boundaries from the values the layout uses instead of restating them. */
export const PANE_MIN_WIDTH_LEFT=40;
export const PANE_MIN_WIDTH_THREE=36;
export const PANE_MAX_WIDTH=80;
/** Fixed text only: no producer string reaches the separator or the cap notice, so nothing here needs the shared sanitizers. */
const paneSeparator=(ascii:boolean):string=>ascii?' | ':' │ ';

/** Docs/10 "Layout responsiveness" pane tiers over the single-column renderer. Each pane is one column render of its own view
 * (one projection window per pane); the header spans the full width above the panes and the key hint stays the last row. */
function layoutPanes(model:InspectorModel,state:InspectorState,size:InspectorSize):string[]{
  const width=Math.max(12,Math.trunc(size.width));
  const height=Math.max(5,Math.trunc(size.rows));
  const ascii=size.ascii??false;
  const separator=paneSeparator(ascii);
  const gap=visibleWidth(separator);
  const threePane=width>=120 && Math.min(PANE_MAX_WIDTH,Math.floor((width-2*gap)/3))>=PANE_MIN_WIDTH_THREE;
  const widths=threePane
    ? Array<number>(3).fill(Math.min(PANE_MAX_WIDTH,Math.floor((width-2*gap)/3)))
    : (()=>{const left=Math.min(PANE_MAX_WIDTH,Math.max(PANE_MIN_WIDTH_LEFT,Math.floor((width-gap)/2)));return [left,Math.min(PANE_MAX_WIDTH,width-gap-left)];})();
  const render=(view:InspectorView,paneWidth:number):ColumnResult=>
    layoutColumn(model,{...state,view},{width:paneWidth,rows:height,ascii},{compact:true,headerWidth:width,headerView:state.view});
  // Panes after the first are chosen from what the first one found: a selected node gets details, otherwise the timeline summary.
  const first=render(threePane?'overview':state.view==='details'?'overview':state.view,widths[0]);
  const bodies=[first];
  if(threePane){
    bodies.push(render(state.view==='overview' || state.view==='graph'?'graph':'timeline',widths[1]));
    bodies.push(render('details',widths[2]));
  } else bodies.push(render(first.hasCurrent?'details':'timeline',widths[1]));
  const headerCount=first.headerCount;
  const rowsLeft=Math.max(1,height-headerCount-1);
  const columns=bodies.map(body=>{
    const rows=body.lines.slice(headerCount,body.hinted?body.lines.length-1:body.lines.length);
    if(rows.length<=rowsLeft) return rows;
    // Rows past the cap end with a notice, never a silent cut.
    return [...rows.slice(0,rowsLeft-1),` ${ascii?'...':'…'} ${rows.length-(rowsLeft-1)} more row${rows.length-(rowsLeft-1)===1?'':'s'} in this pane`];
  });
  const padPane=(text:string,paneWidth:number):string=>{
    const cut=visibleWidth(text)>paneWidth?truncateToWidth(text,paneWidth,''):text;
    return cut+' '.repeat(Math.max(0,paneWidth-visibleWidth(cut)));
  };
  const out=first.lines.slice(0,headerCount);
  for(let row=0;row<rowsLeft;row++){
    if(columns.every(column=>row>=column.length)) break;
    out.push(columns.map((column,at)=>padPane(column[row]??'',widths[at])).join(separator).trimEnd());
  }
  while(out.length<Math.min(height-1,5)) out.push('');
  out.push(first.hinted ? first.lines[first.lines.length-1] : ' Tab views · j/k · Esc back/close');
  return out.slice(0,height);
}

export function layoutInspector(model:InspectorModel,state:InspectorState,size:InspectorSize):string[]{
  const width=Math.max(12,Math.trunc(size.width));
  const height=Math.max(5,Math.trunc(size.rows));
  // Below 80 columns or 20 rows the single column is the specified layout and is reached unchanged.
  if(size.panes===true && width>=80 && height>=20) return layoutPanes(model,state,size);
  return layoutColumn(model,state,size).lines;
}

