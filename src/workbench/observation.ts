/** Bounded, read-only native observation cache. Producers retain all execution authority. */
export interface NativeRef { provider: string; type: string; id: string; scope?: string }
export interface ObservationScope { workspace: string; principal: string }
export interface Presentation {
  title: string;
  type: "workflow" | "agent" | "sdk-operation" | "group";
  statusText: string;
  statusTone: "active" | "success" | "failure" | "waiting" | "unknown";
}
export interface Interval { startedAt: string; endedAt?: string }
export interface ObservationTrace { invocationId?: string; parentSpan?: string; spanId?: string; correlationIds?: Readonly<Record<string, string>> }
export interface ObservationEvent {
  projectionEventId: string;
  source: NativeRef;
  scope: ObservationScope;
  sourceSequence?: string | number;
  sourceCursor?: string;
  previousCursor?: string;
  sourceTimestamp?: string;
  observedAt: string;
  kind: string;
  node?: { presentation: Presentation; definitionDigest?: string };
  trace?: ObservationTrace;
  subjectBasis?: string;
  sourceVersion?: string;
  evidenceRefs?: readonly string[];
  payloadRef?: string;
  interval?: Interval;
}
export interface NativeSnapshot {
  source: NativeRef;
  scope: ObservationScope;
  capturedAt: string;
  observedAt: string;
  sequence?: string | number;
  cursor?: string;
  sourceRevision?: string;
  coverage?: "complete" | "partial" | "unknown";
  nativePayloadRef?: string;
  node: Presentation;
  kind?: string;
  definitionDigest?: string;
  trace?: ObservationTrace;
  subjectBasis?: string;
  sourceVersion?: string;
  evidenceRefs?: readonly string[];
  interval?: Interval;
}
export type RelationKind = "dependency" | "causation" | "ownership" | "grouping" | "hypothesis";
export interface Relation {
  from: string;
  to: string;
  kind: RelationKind;
  provenance: { source: string; observedAt?: string; nativeConfirmationRef?: string };
}
export interface ObservedNode {
  key: string;
  nativeRef: NativeRef;
  scope: ObservationScope;
  sourceKind: "observed";
  observedAt: string;
  lastConfirmedAt?: string;
  sourceConnectionState: "connected" | "disconnected" | "unknown";
  sourceCursor?: string;
  freshness: "current" | "stale" | "unknown";
  completeness: "complete" | "partial" | "unknown";
  presentation: Presentation;
  kind: string;
  definitionDigest?: string;
  invocationId?: string;
  subjectBasis?: string;
  sourceVersion?: string;
  evidenceRefs: readonly string[];
  interval?: Interval;
  payloadRef?: string;
}
export interface ObservationQuery {
  scope: ObservationScope;
  limit: number;
  ref?: NativeRef;
  invocationId?: string;
  parent?: NativeRef;
  dependency?: NativeRef;
  basis?: string;
  statusTone?: Presentation["statusTone"];
  kind?: string;
  time?: { from: string; to: string };
  evidence?: string;
  version?: string;
}
export interface ObservationLimits { maxEvents?: number; maxNodes?: number; maxEdges?: number; maxPayloadBytes?: number; maxQuery?: number }

const MAX_DEFAULT = {maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100};
const keyOf = (scope: ObservationScope, ref: NativeRef): string => JSON.stringify([scope.workspace,scope.principal,ref.provider,ref.type,ref.scope ?? "",ref.id]);
const scopeOf = (scope: ObservationScope): string => JSON.stringify([scope.workspace,scope.principal]);
const eventKey = (event: ObservationEvent): string => JSON.stringify([keyOf(event.scope,event.source),event.projectionEventId]);
const indexed = (index: Map<string, Set<string>>, field: string | undefined, key: string, add: boolean): void => {
  if (field === undefined) return;
  if (add) {
    const set = index.get(field) ?? new Set<string>();
    set.add(key); index.set(field,set);
  } else {
    const set = index.get(field);
    set?.delete(key);
    if (set?.size === 0) index.delete(field);
  }
};
function numericSequence(sequence: string | number | undefined): bigint | undefined {
  if (typeof sequence === "number") {
    if (!Number.isSafeInteger(sequence) || sequence < 0) throw new Error("Source sequence must be a nonnegative safe integer.");
    return BigInt(sequence);
  }
  if (typeof sequence === "string" && /^\d{1,40}$/.test(sequence)) return BigInt(sequence);
  return undefined;
}
function safeDate(value: string): number {
  if (typeof value !== "string" || value.length > 64 || !/(?:Z|[+-]\d\d:\d\d)$/.test(value)) throw new Error("Observation timestamps require a bounded timezone-qualified value.");
  const stamp = Date.parse(value);
  if (!Number.isFinite(stamp)) throw new Error("Observation timestamp is invalid.");
  return stamp;
}
function validText(value: string, name: string, bound: number): void {
  if (typeof value !== "string" || !value || Buffer.byteLength(value) > bound || /[\x00-\x1f\x7f]/.test(value)) {
    throw new Error(`Observation ${name} is empty, unsafe or exceeds payload limit.`);
  }
}
function copyPresentation(value: Presentation, maxBytes: number): Presentation {
  validText(value.title,"title",maxBytes);
  validText(value.statusText,"status",maxBytes);
  if (!["workflow","agent","sdk-operation","group"].includes(value.type) || !["active","success","failure","waiting","unknown"].includes(value.statusTone)) throw new Error("Unknown presentation classification.");
  return {...value};
}
interface SourcePosition { sequence?: bigint; cursor?: string; stale: boolean }

/** One cache per observer. It never polls, calls a producer, or cancels one. */
export class ObservationProjection {
  private readonly limits: Required<ObservationLimits>;
  private readonly nodes = new Map<string, ObservedNode>();
  private readonly eventsById = new Map<string, ObservationEvent>();
  private readonly seenEvents = new Map<string, Set<string>>();
  private readonly positions = new Map<string, SourcePosition>();
  private readonly connections = new Map<string, "connected" | "disconnected">();
  private readonly outgoing = new Map<string, Set<string>>();
  private readonly incoming = new Map<string, Set<string>>();
  private readonly edges = new Map<string, Relation>();
  private readonly scopes = new Map<string, Set<string>>();
  private readonly byTimeStart: {key:string;value:number}[] = [];
  private readonly byTimeEnd: {key:string;value:number}[] = [];
  private readonly invocations = new Map<string, Set<string>>();
  /** Stable insertion-order viewport per invocation; updates never move a selected key. */
  private readonly viewportKeys = new Map<string, string[]>();
  private readonly viewportMembership = new Map<string, string>();
  private revision = 0;
  private topologyRevision = 0;
  private readonly bases = new Map<string, Set<string>>();
  private readonly statuses = new Map<string, Set<string>>();
  private readonly kinds = new Map<string, Set<string>>();
  private readonly statusKinds = new Map<string, Set<string>>();
  private readonly connectionsByProvider = new Map<string, Set<string>>();
  private readonly edgesByScope = new Map<string, Set<string>>();
  private readonly evidence = new Map<string, Set<string>>();
  private readonly versions = new Map<string, Set<string>>();

  constructor(limits: ObservationLimits = {}) {
    this.limits = {...MAX_DEFAULT,...limits};
    if (Object.values(this.limits).some(n => !Number.isSafeInteger(n) || n < 1)) throw new Error("Observation bounds must be positive safe integers.");
  }

  private updateIndexes(node: ObservedNode, add: boolean): void {
    const scope = scopeOf(node.scope);
    indexed(this.scopes,scope,node.key,add);
    indexed(this.connectionsByProvider,node.nativeRef.provider,node.key,add);
    if (node.interval) {
      const start = safeDate(node.interval.startedAt);
      const end = node.interval.endedAt ? safeDate(node.interval.endedAt) : Number.POSITIVE_INFINITY;
      for (const [rows,value] of [[this.byTimeStart,start],[this.byTimeEnd,end]] as const) {
        if (add) {
          let low=0, high=rows.length;
          while(low<high){const mid=(low+high)>>>1;if(rows[mid].value<=value)low=mid+1;else high=mid;}
          rows.splice(low,0,{key:node.key,value});
        } else {
          let lo=0,hi=rows.length;
          while(lo<hi){const mid=(lo+hi)>>>1;if(rows[mid].value<value)lo=mid+1;else hi=mid;}
          while(lo<rows.length && rows[lo].value===value && rows[lo].key!==node.key)lo++;
          if(lo<rows.length && rows[lo].value===value)rows.splice(lo,1);
        }
      }
    }
    indexed(this.invocations, JSON.stringify([scope,node.invocationId]),node.key,add);
    indexed(this.bases, JSON.stringify([scope,node.subjectBasis]),node.key,add);
    indexed(this.statuses, JSON.stringify([scope,node.presentation.statusTone]),node.key,add);
    indexed(this.kinds,JSON.stringify([scope,node.kind]),node.key,add);
    indexed(this.statusKinds,JSON.stringify([scope,node.kind,node.presentation.statusTone]),node.key,add);
    indexed(this.versions, JSON.stringify([scope,node.sourceVersion]),node.key,add);
    for (const ref of node.evidenceRefs) indexed(this.evidence, JSON.stringify([scope,ref]),node.key,add);
  }

  private discard(key: string): void {
    const node = this.nodes.get(key);
    if (!node) return;
    this.updateIndexes(node,false);
    this.nodes.delete(key);
    this.removeViewport(key);
    this.revision++;
    this.positions.delete(key);
    this.seenEvents.delete(key);
    for (const edgeId of [...(this.incoming.get(key) ?? []),...(this.outgoing.get(key) ?? [])]) this.removeEdge(edgeId);
  }

  private removeEdge(id: string): void {
    const edge = this.edges.get(id);
    if (!edge) return;
    this.edges.delete(id);
    this.revision++;
    this.topologyRevision++;
    this.outgoing.get(edge.from)?.delete(id);
    this.incoming.get(edge.to)?.delete(id);
    const [workspace,principal]=JSON.parse(edge.from) as string[];
    indexed(this.edgesByScope,scopeOf({workspace,principal}),id,false);
  }

  private store(node: ObservedNode, sequence?: bigint, cursor?: string, stale = false): void {
    const prior = this.nodes.get(node.key);
    if (!prior && this.nodes.size >= this.limits.maxNodes) this.discard(this.nodes.keys().next().value as string);
    if (prior) this.updateIndexes(prior,false);
    const record: ObservedNode = {
      ...node, scope:{...node.scope},nativeRef:{...node.nativeRef},presentation:{...node.presentation},
      evidenceRefs:[...node.evidenceRefs],...(node.interval ? {interval:{...node.interval}} : {}),
    };
    this.nodes.set(node.key,record);
    this.updateIndexes(record,true);
    this.setViewport(record);
    this.revision++;
    this.positions.set(node.key,{sequence,cursor,stale});
  }

  private assertRef(scope: ObservationScope, ref: NativeRef, observedAt: string): string {
    for (const [name,value] of [["workspace",scope.workspace],["principal",scope.principal],["provider",ref.provider],["type",ref.type],["id",ref.id]]) validText(value,name,256);
    if (ref.scope !== undefined) validText(ref.scope,"native scope",256);
    safeDate(observedAt);
    return keyOf(scope,ref);
  }

  private assertFields(input: {subjectBasis?:string;sourceVersion?:string;definitionDigest?:string;trace?:ObservationTrace;evidenceRefs?:readonly string[];payloadRef?:string;interval?:Interval}): void {
    const named: [string,string | undefined][] = [["basis",input.subjectBasis],["version",input.sourceVersion],["digest",input.definitionDigest],["payload reference",input.payloadRef],["invocation",input.trace?.invocationId],["parent span",input.trace?.parentSpan],["span",input.trace?.spanId]];
    for (const [name,value] of named) if (value !== undefined) validText(value,name,this.limits.maxPayloadBytes);
    // Bounded field-by-field metadata; source/trace references are never native payload bodies.
    if (input.trace?.correlationIds) {
      const ids = Object.entries(input.trace.correlationIds);
      if (ids.length > 32) throw new Error("Observation correlation payload limit exceeded.");
      for (const [id,value] of ids) {validText(id,"correlation id",256);validText(value,"correlation value",256);}
    }
    if (input.evidenceRefs && input.evidenceRefs.length > 32) throw new Error("Observation evidence payload limit exceeded.");
    for (const evidence of input.evidenceRefs ?? []) validText(evidence,"evidence reference",this.limits.maxPayloadBytes);
    if (input.interval) {
      const start = safeDate(input.interval.startedAt);
      if (input.interval.endedAt && safeDate(input.interval.endedAt) < start) throw new Error("Observation interval ends before start.");
    }
  }

  ingest(event: ObservationEvent): "applied" | "duplicate" | "out-of-order" {
    const key = this.assertRef(event.scope,event.source,event.observedAt);
    validText(event.projectionEventId,"event id",256);validText(event.kind,"event kind",256);
    if (event.sourceTimestamp) safeDate(event.sourceTimestamp);
    this.assertFields({subjectBasis:event.subjectBasis,sourceVersion:event.sourceVersion,definitionDigest:event.node?.definitionDigest,trace:event.trace,evidenceRefs:event.evidenceRefs,payloadRef:event.payloadRef,interval:event.interval});
    if (event.node) copyPresentation(event.node.presentation,this.limits.maxPayloadBytes);
    if (event.sourceCursor !== undefined) validText(event.sourceCursor,"source cursor",256);
    if (event.previousCursor !== undefined) validText(event.previousCursor,"previous cursor",256);
    const sequence = numericSequence(event.sourceSequence);
    const eventId = eventKey(event);
    if (this.seenEvents.get(key)?.has(event.projectionEventId)) return "duplicate";
    const prior = this.positions.get(key);
    if (prior?.sequence !== undefined && sequence !== undefined && sequence <= prior.sequence) return "out-of-order";
    const gap = prior?.sequence !== undefined && sequence !== undefined && sequence > prior.sequence + 1n ||
      prior?.cursor !== undefined && event.previousCursor !== undefined && prior.cursor !== event.previousCursor;
    const unordered = Boolean(prior && sequence === undefined && (prior.cursor === undefined || event.previousCursor === undefined));
    const stale = Boolean(prior?.stale || gap || this.connections.get(event.source.provider) === "disconnected" || unordered);
    indexed(this.seenEvents,key,event.projectionEventId,true);
    this.eventsById.set(eventId,{
      projectionEventId:event.projectionEventId,source:{...event.source},scope:{...event.scope},
      sourceSequence:event.sourceSequence,sourceCursor:event.sourceCursor,previousCursor:event.previousCursor,sourceTimestamp:event.sourceTimestamp,observedAt:event.observedAt,kind:event.kind,
      subjectBasis:event.subjectBasis,sourceVersion:event.sourceVersion,payloadRef:event.payloadRef,
      ...(event.node ? {node:{...event.node,presentation:{...event.node.presentation}}} : {}),
      ...(event.evidenceRefs ? {evidenceRefs:[...event.evidenceRefs]} : {}),
      ...(event.trace ? {trace:{...event.trace,correlationIds:event.trace.correlationIds ? {...event.trace.correlationIds} : undefined}} : {}),
      ...(event.interval ? {interval:{...event.interval}} : {}),
    });
    if (this.eventsById.size > this.limits.maxEvents) {
      const oldest=this.eventsById.entries().next().value;
      if (oldest) {
        this.eventsById.delete(oldest[0]);
        indexed(this.seenEvents,keyOf(oldest[1].scope,oldest[1].source),oldest[1].projectionEventId,false);
      }
    }
    const previous = this.nodes.get(key);
    const node: ObservedNode = {
      key,nativeRef:event.source,scope:event.scope,sourceKind:"observed",observedAt:event.observedAt,
      lastConfirmedAt:previous?.lastConfirmedAt,
      sourceConnectionState:this.connections.get(event.source.provider) ?? "unknown",
      sourceCursor:event.sourceCursor ?? prior?.cursor,
      kind:event.kind,
      freshness:stale ? "stale" : previous?.freshness ?? "unknown",
      completeness:previous?.completeness ?? "unknown",
      presentation:unordered ? previous?.presentation ?? {title:`${event.source.provider} ${event.source.type}`,type:"sdk-operation",statusText:"UNKNOWN",statusTone:"unknown"} : event.node?.presentation ?? previous?.presentation ?? {title:`${event.source.provider} ${event.source.type}`,type:"sdk-operation",statusText:"UNKNOWN",statusTone:"unknown"},
      definitionDigest:event.node?.definitionDigest ?? previous?.definitionDigest,
      invocationId:event.trace?.invocationId ?? previous?.invocationId,
      subjectBasis:event.subjectBasis ?? previous?.subjectBasis,
      sourceVersion:event.sourceVersion ?? previous?.sourceVersion,
      evidenceRefs:event.evidenceRefs ?? previous?.evidenceRefs ?? [],
      interval:event.interval ?? previous?.interval,
      payloadRef:event.payloadRef ?? previous?.payloadRef,
    };
    this.store(node,sequence ?? prior?.sequence,event.sourceCursor ?? prior?.cursor,stale);
    return "applied";
  }

  /** Only an actual read-current snapshot restores source truth after a gap. */
  refresh(snapshot: NativeSnapshot): "applied" | "out-of-order" {
    const key = this.assertRef(snapshot.scope,snapshot.source,snapshot.observedAt);
    safeDate(snapshot.capturedAt);
    this.assertFields({subjectBasis:snapshot.subjectBasis,sourceVersion:snapshot.sourceVersion ?? snapshot.sourceRevision,definitionDigest:snapshot.definitionDigest,trace:snapshot.trace,evidenceRefs:snapshot.evidenceRefs,payloadRef:snapshot.nativePayloadRef,interval:snapshot.interval});
    copyPresentation(snapshot.node,this.limits.maxPayloadBytes);
    if (snapshot.cursor !== undefined) validText(snapshot.cursor,"source cursor",256);
    const sequence = numericSequence(snapshot.sequence);
    const prior = this.positions.get(key);
    const existing = this.nodes.get(key);
    // A snapshot lacking a sequence cannot prove that it follows a sequenced
    // stream update. Do not promote old state to CURRENT by reusing its cursor.
    if (prior?.sequence !== undefined && (sequence === undefined || sequence < prior.sequence)) return "out-of-order";
    if (existing?.lastConfirmedAt && safeDate(snapshot.capturedAt) < safeDate(existing.lastConfirmedAt)) return "out-of-order";
    const state = this.connections.get(snapshot.source.provider) ?? "unknown";
    this.store({
      key,nativeRef:snapshot.source,scope:snapshot.scope,sourceKind:"observed",observedAt:snapshot.observedAt,kind:snapshot.kind ?? "native.snapshot",
      lastConfirmedAt:snapshot.capturedAt,sourceConnectionState:state,sourceCursor:snapshot.cursor,
      freshness:state === "disconnected" ? "stale" : "current",completeness:snapshot.coverage ?? "unknown",
      presentation:snapshot.node,definitionDigest:snapshot.definitionDigest,invocationId:snapshot.trace?.invocationId,
      subjectBasis:snapshot.subjectBasis,sourceVersion:snapshot.sourceVersion ?? snapshot.sourceRevision,
      evidenceRefs:snapshot.evidenceRefs ?? [],interval:snapshot.interval,payloadRef:snapshot.nativePayloadRef,
    },sequence ?? prior?.sequence,snapshot.cursor,false);
    return "applied";
  }

  /** A failed native read invalidates only its own authenticated subject scope. */
  markStale(input: {scope: ObservationScope; ref: NativeRef}): void {
    const key = keyOf(input.scope,input.ref);
    const node = this.nodes.get(key);
    if (!node) return;
    node.freshness = "stale";
    node.sourceConnectionState = "disconnected";
    node.completeness = "unknown";
    const position = this.positions.get(key);
    if (position) position.stale = true;
    this.revision++;
  }

  disconnect(provider: string): void {
    validText(provider,"provider",256);
    this.connections.set(provider,"disconnected");
    for (const key of this.connectionsByProvider.get(provider) ?? []) {
      const node=this.nodes.get(key);
      if (!node) continue;
      node.sourceConnectionState="disconnected";
      node.freshness="stale";
      const position = this.positions.get(node.key);
      if (position) position.stale=true;
    }
  }

  reconnect(provider: string): void {
    validText(provider,"provider",256);
    this.connections.set(provider,"connected");
    for (const key of this.connectionsByProvider.get(provider) ?? []) {
      const node=this.nodes.get(key);
      if (node) {node.sourceConnectionState="connected";this.revision++;}
    }
  }

  /** Edges require a producer-supplied statement; absence never creates ownership. */
  relate(input: {scope:ObservationScope;from:NativeRef;to:NativeRef;kind:RelationKind;provenance:{source:string;observedAt?:string;nativeConfirmationRef?:string}}): void {
    const from=this.assertRef(input.scope,input.from,input.provenance.observedAt ?? "2026-01-01T00:00:00Z");
    const to=this.assertRef(input.scope,input.to,input.provenance.observedAt ?? "2026-01-01T00:00:00Z");
    if (!["dependency","causation","ownership","grouping","hypothesis"].includes(input.kind)) throw new Error("Unknown relationship kind.");
    validText(input.provenance.source,"relationship source",this.limits.maxPayloadBytes);
    if (input.kind === "ownership") {
      if (input.provenance.source !== input.from.provider || !input.provenance.nativeConfirmationRef) throw new Error("Ownership requires explicit native owner confirmation reference.");
      validText(input.provenance.nativeConfirmationRef,"ownership confirmation",this.limits.maxPayloadBytes);
    }
    const id=JSON.stringify([from,to,input.kind,input.provenance.source]);
    if (this.edges.has(id)) return;
    if (this.edges.size >= this.limits.maxEdges) this.removeEdge(this.edges.keys().next().value as string);
    this.edges.set(id,{from,to,kind:input.kind,provenance:{...input.provenance}});
    this.revision++;
    this.topologyRevision++;
    indexed(this.outgoing,from,id,true);indexed(this.incoming,to,id,true);indexed(this.edgesByScope,scopeOf(input.scope),id,true);
  }

  relations(input: {scope:ObservationScope;from?:string;to?:string;limit?:number}): Relation[] {
    const limit=Math.min(input.limit ?? this.limits.maxQuery,this.limits.maxQuery);
    if (!Number.isSafeInteger(limit) || limit < 1) throw new Error("Invalid relation query limit.");
    if(input.from && !input.from.startsWith(`[${JSON.stringify(input.scope.workspace)},${JSON.stringify(input.scope.principal)},`) ||
      input.to && !input.to.startsWith(`[${JSON.stringify(input.scope.workspace)},${JSON.stringify(input.scope.principal)},`)) return [];
    const source=input.from ? this.outgoing.get(input.from) : input.to ? this.incoming.get(input.to) : this.edgesByScope.get(scopeOf(input.scope));
    const rows: Relation[]=[];
    for (const id of source ?? []) {
      const edge=this.edges.get(id);
      if (!edge) continue;
      const scope=JSON.parse(edge.from) as string[];
      if (scope[0] !== input.scope.workspace || scope[1] !== input.scope.principal) continue;
      if (input.from && edge.from !== input.from || input.to && edge.to !== input.to) continue;
      rows.push({...edge,provenance:{...edge.provenance}});
      if (rows.length >= limit) break;
    }
    return rows;
  }

  private viewportGroup(scope: ObservationScope, invocationId: string): string {
    return JSON.stringify([scopeOf(scope), invocationId]);
  }

  private removeViewport(key: string): void {
    const group = this.viewportMembership.get(key);
    if (group === undefined) return;
    const keys = this.viewportKeys.get(group);
    if (keys) {
      const at = keys.indexOf(key);
      if (at >= 0) keys.splice(at, 1);
      if (keys.length === 0) this.viewportKeys.delete(group);
    }
    this.viewportMembership.delete(key);
  }

  private setViewport(node: ObservedNode): void {
    const current = this.viewportMembership.get(node.key);
    const next = node.invocationId === undefined ? undefined : this.viewportGroup(node.scope, node.invocationId);
    if (current === next) return;
    this.removeViewport(node.key);
    if (next === undefined) return;
    const keys = this.viewportKeys.get(next) ?? [];
    keys.push(node.key);
    this.viewportKeys.set(next, keys);
    this.viewportMembership.set(node.key, next);
  }

  /** UI-only window: bounded copied rows, stable keys and a revision for change detection.
   * Unlike model-facing query limits, this selector has an independent 100-row cap.
   * Neither a redraw nor a keypress traverses the retained event history.
   */
  window(filter: {scope: ObservationScope; invocationId: string; offset: number; limit: number}): {
    nodes: ObservedNode[]; total: number; revision: number
  } {
    if (!Number.isSafeInteger(filter.offset) || filter.offset < 0 ||
      !Number.isSafeInteger(filter.limit) || filter.limit < 1 || filter.limit > 100) {
      throw new Error("Invalid observation viewport offset or limit (1..100).");
    }
    const keys = this.viewportKeys.get(this.viewportGroup(filter.scope, filter.invocationId)) ?? [];
    const nodes: ObservedNode[] = [];
    for (const key of keys.slice(filter.offset, filter.offset + filter.limit)) {
      const node = this.nodes.get(key);
      if (node) nodes.push({...node, nativeRef:{...node.nativeRef},scope:{...node.scope},
        presentation:{...node.presentation},evidenceRefs:[...node.evidenceRefs],
        ...(node.interval ? {interval:{...node.interval}} : {})});
    }
    return {nodes,total:keys.length,revision:this.revision};
  }

  /** A revision only of the proven relation topology, not repeated status updates. */
  relationRevision(): number { return this.topologyRevision; }

  /** Locate a selected key without scanning event history; cross-scope keys never resolve. */
  indexOf(filter: {scope: ObservationScope; invocationId: string; key: string}): number | undefined {
    const group = this.viewportGroup(filter.scope, filter.invocationId);
    if (this.viewportMembership.get(filter.key) !== group) return undefined;
    const index = this.viewportKeys.get(group)?.indexOf(filter.key) ?? -1;
    return index < 0 ? undefined : index;
  }

  query(filter: ObservationQuery): {nodes: ObservedNode[]; examined: number; truncated: boolean} {
    const limit=Math.min(filter.limit,this.limits.maxQuery);
    if (!Number.isSafeInteger(filter.limit) || filter.limit < 1) throw new Error("Invalid observation query limit.");
    const scoped=scopeOf(filter.scope);
    const timeKeys = filter.time && !filter.ref && filter.invocationId === undefined && !filter.parent && !filter.dependency && filter.basis === undefined && !filter.statusTone && !filter.kind && filter.evidence === undefined && filter.version === undefined ? this.timeCandidates(filter.time) : undefined;
    const keys: Iterable<string> = filter.ref ? [keyOf(filter.scope,filter.ref)] :
      filter.invocationId !== undefined ? this.invocations.get(JSON.stringify([scoped,filter.invocationId])) ?? [] :
      filter.parent ? this.outgoing.get(keyOf(filter.scope,filter.parent)) ?? [] :
      filter.dependency ? this.outgoing.get(keyOf(filter.scope,filter.dependency)) ?? [] :
      filter.basis !== undefined ? this.bases.get(JSON.stringify([scoped,filter.basis])) ?? [] :
      filter.statusTone && filter.kind ? this.statusKinds.get(JSON.stringify([scoped,filter.kind,filter.statusTone])) ?? [] :
      filter.kind ? this.kinds.get(JSON.stringify([scoped,filter.kind])) ?? [] :
      filter.statusTone ? this.statuses.get(JSON.stringify([scoped,filter.statusTone])) ?? [] :
      filter.evidence !== undefined ? this.evidence.get(JSON.stringify([scoped,filter.evidence])) ?? [] :
      filter.version !== undefined ? this.versions.get(JSON.stringify([scoped,filter.version])) ?? [] :
      timeKeys ?? this.scopes.get(scoped) ?? [];
    if (filter.time) {safeDate(filter.time.from);safeDate(filter.time.to);}
    const nodes:ObservedNode[]=[];
    let examined=0;
    let truncated=false;
    const yielded=new Set<string>();
    const timeFrom=filter.time ? safeDate(filter.time.from) : undefined;
    const timeTo=filter.time ? safeDate(filter.time.to) : undefined;
    for (const item of keys) {
      const key=filter.parent || filter.dependency ? this.edges.get(item)?.to : item;
      if (!key) continue;
      const node=this.nodes.get(key);
      examined++;
      if (!node || node.scope.workspace !== filter.scope.workspace || node.scope.principal !== filter.scope.principal) continue;
      if (filter.ref && key !== keyOf(filter.scope,filter.ref) || filter.invocationId !== undefined && node.invocationId !== filter.invocationId ||
        filter.basis !== undefined && node.subjectBasis !== filter.basis || filter.statusTone && node.presentation.statusTone !== filter.statusTone || filter.kind && node.kind !== filter.kind ||
        filter.evidence !== undefined && !node.evidenceRefs.includes(filter.evidence) || filter.version !== undefined && node.sourceVersion !== filter.version) continue;
      if (filter.parent && !this.hasEdge(keyOf(filter.scope,filter.parent),key,"causation") && !this.hasEdge(keyOf(filter.scope,filter.parent),key,"grouping") && !this.hasEdge(keyOf(filter.scope,filter.parent),key,"ownership")) continue;
      if (filter.dependency && !this.hasEdge(keyOf(filter.scope,filter.dependency),key,"dependency")) continue;
      if (timeFrom !== undefined && timeTo !== undefined && (!node.interval || safeDate(node.interval.startedAt) > timeTo || node.interval.endedAt !== undefined && safeDate(node.interval.endedAt) < timeFrom)) continue;
      if (yielded.has(key)) continue;
      if (nodes.length >= limit) {truncated=true;break;}
      yielded.add(key);
      nodes.push({...node,nativeRef:{...node.nativeRef},scope:{...node.scope},presentation:{...node.presentation},evidenceRefs:[...node.evidenceRefs],...(node.interval?{interval:{...node.interval}}:{})});
    }
    return {nodes,examined,truncated};
  }

  private timeCandidates(time:{from:string;to:string}):string[] {
    const start=safeDate(time.from),end=safeDate(time.to);
    if(start>end)throw new Error("Invalid observation time range.");
    let low=0,high=this.byTimeStart.length;
    while(low<high){const mid=(low+high)>>>1;if(this.byTimeStart[mid].value<=end)low=mid+1;else high=mid;}
    const startsBeforeEnd=low;
    low=0;high=this.byTimeEnd.length;
    while(low<high){const mid=(low+high)>>>1;if(this.byTimeEnd[mid].value<start)low=mid+1;else high=mid;}
    const endsAfterStart=low;
    return startsBeforeEnd<=this.byTimeEnd.length-endsAfterStart ? this.byTimeStart.slice(0,startsBeforeEnd).map(row=>row.key) : this.byTimeEnd.slice(endsAfterStart).map(row=>row.key);
  }

  private hasEdge(from:string,to:string,kind:RelationKind):boolean {
    for(const id of this.outgoing.get(from) ?? []) {
      const edge=this.edges.get(id);
      if(edge?.to===to && edge.kind===kind) return true;
    }
    return false;
  }

  events(filter:{scope:ObservationScope;limit:number;ref?:NativeRef;after?:{source:NativeRef;projectionEventId:string}}):{events:ObservationEvent[];truncated:boolean;completeness:"complete" | "partial-gap"} {
    const limit=Math.min(filter.limit,this.limits.maxQuery);
    if (!Number.isSafeInteger(filter.limit) || filter.limit < 1) throw new Error("Invalid event query limit.");
    if (filter.after && !this.eventsById.has(JSON.stringify([keyOf(filter.scope,filter.after.source),filter.after.projectionEventId]))) {
      return {events:[],truncated:false,completeness:"partial-gap"};
    }
    const afterKey=filter.after ? JSON.stringify([keyOf(filter.scope,filter.after.source),filter.after.projectionEventId]) : undefined;
    const events:ObservationEvent[]=[];let truncated=false;let past=afterKey===undefined;
    for(const [id,event] of this.eventsById) {
      if (!past) {if(id===afterKey) past=true;continue;}
      if(event.scope.workspace!==filter.scope.workspace || event.scope.principal!==filter.scope.principal || filter.ref && keyOf(event.scope,event.source)!==keyOf(filter.scope,filter.ref)) continue;
      if(events.length>=limit){truncated=true;break;}
      // Event query exposes metadata and references only, never arbitrary native payload bodies.
      events.push({...event,source:{...event.source},scope:{...event.scope},node:event.node ? {presentation:{...event.node.presentation},definitionDigest:event.node.definitionDigest} : undefined,evidenceRefs:event.evidenceRefs ? [...event.evidenceRefs] : undefined,trace:event.trace ? {...event.trace,correlationIds:event.trace.correlationIds ? {...event.trace.correlationIds} : undefined} : undefined,interval:event.interval ? {...event.interval} : undefined});
    }
    return {events,truncated,completeness:"complete"};
  }

  stats():{nodes:number;events:number;edges:number} {return {nodes:this.nodes.size,events:this.eventsById.size,edges:this.edges.size};}
}
