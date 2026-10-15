/**
 * W15-B2/VC-5 inspector details view renders the linked topology slice (wb-6ze.16). Every case quotes the docs/workbench
 * clause it pins. The renderer is pure layout in layoutInspector's details branch: the slice comes from an optional
 * model.topology read side, never from the renderer reading relations itself, and a model without it renders exactly as before.
 */
import { createHash } from 'node:crypto';
import { visibleWidth } from '@earendil-works/pi-tui';
import { describe, expect, it } from 'vitest';
import { type InspectorModel, initialInspectorState, layoutInspector } from '../src/ui/workflow-inspector.js';
import { type NativeRef, ObservationProjection, type ObservationScope, type ObservedNode, type RelationKind } from '../src/workbench/observation.js';
import { type LinkedTopology, selectLinkedTopology, TOPOLOGY_CAVEAT, TOPOLOGY_CONTRACT } from '../src/workbench/topology-slice.js';

const scope: ObservationScope = {workspace:'workspace',principal:'reader'};
const T = '2026-10-15T12:00:00.000Z';
const ref = (id: string, provider = 'furnace'): NativeRef => ({provider,type:'operation',id});
const presentation = (title: string) => ({title,type:'sdk-operation' as const,statusText:'running',statusTone:'active' as const});
const keyOf = (id: string, provider = 'furnace'): string => JSON.stringify([scope.workspace,scope.principal,provider,'operation','',id]);
const SIZES = [{width:80,rows:24},{width:120,rows:40}] as const;
const TIERS = [true,false] as const;

function observe(projection: ObservationProjection, id: string, provider = 'furnace'): void {
  projection.refresh({source:ref(id,provider),scope,capturedAt:T,observedAt:T,node:presentation(`Operation ${id}`),trace:{invocationId:'workflow-topology'},coverage:'partial'});
}
function relate(projection: ObservationProjection, from: string, to: string, kind: RelationKind = 'dependency', source = 'declared workflow', observedAt: string | undefined = T): void {
  projection.relate({scope,from:ref(from),to:ref(to),kind,provenance:{source,...(observedAt!==undefined?{observedAt}:{})}});
}
/** A projection with `count` observed furnace operations (focus is op `focus`). */
function projectionOf(ids: readonly string[], filler = 0): ObservationProjection {
  const projection=new ObservationProjection({maxNodes:1200,maxEdges:1200,maxQuery:100});
  for(const id of ids) observe(projection,id);
  for(let i=0;i<filler;i++) observe(projection,`filler-${i}`);
  return projection;
}
function modelOf(projection: ObservationProjection, topology?: InspectorModel['topology']): InspectorModel {
  return {projection,scope,invocationId:'workflow-topology',title:'Topology workflow',status:'running',...(topology?{topology}:{})};
}
/** Details view of the node at index 0 (the focus is always observed first). */
const details = (model: InspectorModel, size: {width:number;rows:number}, ascii = true): string[] =>
  layoutInspector(model,{...initialInspectorState(),view:'details'},{...size,ascii});
const selected = (projection: ObservationProjection) => (node: ObservedNode) => selectLinkedTopology({scope,relations:projection},node.key);
const joined = (lines: readonly string[]): string => lines.join('\n');
/** The key hint; the ASCII tier renders its separators as `?`. */
const HINT = /^ Tab views . j\/k . Esc back\/close$/u;

/** A hand-built slice, for hostile strings and references the real projection would refuse to store. */
function sliceOf(parts: Partial<LinkedTopology> = {}): LinkedTopology {
  return {
    contract:TOPOLOGY_CONTRACT,basis:'observed',focus:{key:keyOf('f'),nativeRef:ref('f'),label:'furnace:operation:f'},
    upstream:{edges:[],remainder:{count:0,atLeast:false,byClass:{}}},downstream:{edges:[],remainder:{count:0,atLeast:false,byClass:{}}},
    references:[],referencesRemainder:0,trace:{label:'observed',reasons:[],caveat:TOPOLOGY_CAVEAT},...parts,
  };
}
const edgeOf = (id: string, relation: LinkedTopology['upstream']['edges'][number]['relation'], source = 'declared workflow', observedAt: string | undefined = T): LinkedTopology['upstream']['edges'][number] => ({
  key:keyOf(id),nativeRef:ref(id),label:`furnace:operation:${id}`,relation,authoritative:relation!=='inferred-hypothesis',
  provenance:{sourceLabel:source,...(observedAt!==undefined?{observedAt}:{})},
});

describe('B1 docs/workbench/10 § Four views (Details): "upstream/downstream" with the neighbour identity',()=>{
  function twoUpThreeDown(): InspectorModel {
    const projection=projectionOf(['focus','u1','u2','d1','d2','d3']);
    relate(projection,'u1','focus'); relate(projection,'u2','focus','causation');
    relate(projection,'focus','d1'); relate(projection,'focus','d2','grouping'); relate(projection,'focus','d3','causation');
    return modelOf(projection,selected(projection));
  }
  it.each(TIERS)('A1 a 2-upstream/3-downstream slice renders both counted headers and exactly five edge rows at 120x40, ascii=%s',ascii=>{
    const out=details(twoUpThreeDown(),{width:120,rows:40},ascii);
    const text=joined(out);
    expect(text).toContain('Upstream (2)');
    expect(text).toContain('Downstream (3)');
    const direction=ascii?/^ (<-|->) /:/^ (←|→) /;
    expect(out.filter(line=>direction.test(line))).toHaveLength(5);
    for(const id of ['u1','u2','d1','d2','d3']) expect(text).toContain(`furnace/operation/${id}`);
    expect(text).not.toContain('Relations:');
  });
  it.each(TIERS)('A1 the same slice at 80x24 fits 24 rows with the key hint as the last row, ascii=%s',ascii=>{
    const out=details(twoUpThreeDown(),{width:80,rows:24},ascii);
    expect(out.length).toBeLessThanOrEqual(24);
    expect(out[out.length-1]).toMatch(HINT);
    expect(joined(out)).toContain('Upstream (2)');
    expect(joined(out)).toContain('Downstream (3)');
  });
  it('A1 upstream rows use the arrow pointing at the focus and downstream rows the arrow away from it',()=>{
    const text=joined(details(twoUpThreeDown(),{width:120,rows:40},false));
    expect(text).toMatch(/← furnace\/operation\/u1/);
    expect(text).toMatch(/→ furnace\/operation\/d1/);
    expect(text.indexOf('Upstream (2)')).toBeLessThan(text.indexOf('Downstream (3)'));
  });
});

describe('B2 docs/workbench/09 § Relationships are typed and provenanced: class, source and timestamp on every edge',()=>{
  it('A2 each edge row carries its class label, [source @observedAt] and renders "no timestamp" when none was observed',()=>{
    const projection=projectionOf(['focus','a','b','c','d','e']);
    projection.relate({scope,from:ref('focus'),to:ref('a'),kind:'dependency',provenance:{source:'declared workflow',observedAt:T}});
    projection.relate({scope,from:ref('focus'),to:ref('b'),kind:'causation',provenance:{source:'furnace events',observedAt:T}});
    projection.relate({scope,from:ref('focus'),to:ref('c'),kind:'ownership',provenance:{source:'furnace',observedAt:T,nativeConfirmationRef:'native:own-1'}});
    projection.relate({scope,from:ref('focus'),to:ref('d'),kind:'grouping',provenance:{source:'ui grouping'}});
    projection.relate({scope,from:ref('focus'),to:ref('e'),kind:'hypothesis',provenance:{source:'heuristic',observedAt:T}});
    const text=joined(details(modelOf(projection,selected(projection)),{width:120,rows:40}));
    expect(text).toMatch(/furnace\/operation\/a . declared dependency \[declared workflow @2026-10-15T12:00:00\.000Z\]/);
    expect(text).toMatch(/furnace\/operation\/b . observed causal \[furnace events @2026-10-15T12:00:00\.000Z\]/);
    expect(text).toMatch(/furnace\/operation\/c . lifecycle ownership \(native-confirmed\) \[furnace @2026-10-15T12:00:00\.000Z\]/);
    expect(text).toMatch(/furnace\/operation\/d . grouping \[ui grouping . no timestamp\]/);
    expect(text).toMatch(/furnace\/operation\/e . inferred hypothesis . non-authoritative \[heuristic @2026-10-15T12:00:00\.000Z\]/);
    expect(text).not.toMatch(/ui grouping @/);
  });
  it('A2 an empty slice states that missing edges do not imply independence',()=>{
    const projection=projectionOf(['focus']);
    const text=joined(details(modelOf(projection,selected(projection)),{width:120,rows:40}));
    expect(text).toContain('Topology: no observed relations (missing edges do not imply independence)');
    expect(text).not.toContain('Upstream');
    expect(text).not.toContain('Downstream');
  });
});

describe('B3 docs/workbench/10 § Four views (Graph) and Four-view viewport increment: references and visible unknowns, never fabricated',()=>{
  it('A3 a cycle entry and an unknown-dynamic entry render as `reference ->` rows outside the Upstream/Downstream counts',()=>{
    const topology=sliceOf({
      downstream:{edges:[edgeOf('d1','declared-dependency')],remainder:{count:0,atLeast:false,byClass:{}}},
      references:[
        {direction:'upstream',reason:'cycle',key:keyOf('c1'),nativeRef:ref('c1'),label:'furnace:operation:c1',relation:'declared-dependency',provenance:{sourceLabel:'declared workflow',observedAt:T},edgeCount:1},
        {direction:'downstream',reason:'unknown-endpoint',key:'dynamic:task-{i}',label:'dynamic:task-{i}',edgeCount:1},
      ],
    });
    const projection=projectionOf(['focus','d1','c1']);
    const out=details(modelOf(projection,()=>topology),{width:120,rows:40});
    const references=out.filter(line=>line.trimStart().startsWith('reference ->'));
    expect(references).toHaveLength(2);
    expect(references[0]).toContain('furnace/operation/c1');
    expect(references[0]).toContain('cycle');
    expect(references[1]).toContain('dynamic:task-{i}');
    expect(references[1]).toContain('unknown endpoint');
    expect(joined(out)).toContain('Downstream (1)');
    expect(joined(out)).not.toContain('Upstream (');
  });
  it('A3 an incomplete-trace slice is labelled "Topology: incomplete trace"; a complete one is not',()=>{
    const projection=projectionOf(['focus','d1']);
    const incomplete=sliceOf({downstream:{edges:[edgeOf('d1','declared-dependency')],remainder:{count:0,atLeast:false,byClass:{}}},trace:{label:'incomplete-trace',reasons:['relations-truncated'],caveat:TOPOLOGY_CAVEAT}});
    const complete=sliceOf({downstream:{edges:[edgeOf('d1','declared-dependency')],remainder:{count:0,atLeast:false,byClass:{}}}});
    expect(joined(details(modelOf(projection,()=>incomplete),{width:120,rows:40}))).toContain('Topology: incomplete trace');
    expect(joined(details(modelOf(projection,()=>complete),{width:120,rows:40}))).not.toContain('incomplete trace');
  });
  it('A3 falsifier: a projection relation that is not in the supplied slice never appears in the details output',()=>{
    const projection=projectionOf(['focus','shown','hidden']);
    relate(projection,'focus','shown');
    relate(projection,'focus','hidden','causation');
    const topology=sliceOf({downstream:{edges:[edgeOf('shown','declared-dependency')],remainder:{count:0,atLeast:false,byClass:{}}}});
    const text=joined(details(modelOf(projection,()=>topology),{width:120,rows:40}));
    expect(text).toContain('furnace/operation/shown');
    expect(text).not.toContain('hidden');
    expect(text).not.toContain('observed causal');
  });
  it('wb-6ze.16 ruling: a declared edge to a never-observed endpoint is a declared-dependency edge marked "unobserved endpoint", never an unknown-dynamic reference',()=>{
    const projection=projectionOf(['focus','seen']);
    relate(projection,'focus','seen');
    relate(projection,'focus','never-observed');
    const out=details(modelOf(projection,selected(projection)),{width:120,rows:40});
    const unobserved=out.filter(line=>line.includes('furnace/operation/never-observed'));
    expect(unobserved).toHaveLength(1);
    expect(unobserved[0]).toContain('declared dependency');
    expect(unobserved[0]).toContain('unobserved endpoint');
    expect(unobserved[0]).not.toContain('reference');
    const seen=out.filter(line=>line.includes('furnace/operation/seen'));
    expect(seen).toHaveLength(1);
    expect(seen[0]).not.toContain('unobserved endpoint');
    expect(joined(out)).toContain('Downstream (2)');
    expect(joined(out)).not.toMatch(/unknown[- ]dynamic/);
  });
});

describe('B4 docs/workbench/10 § Layout responsiveness and docs/workbench/12 § Input and output hardening',()=>{
  const hostile='src\u001b[31m‮red​漢字\u0007';
  function hostileModel(): InspectorModel {
    const topology=sliceOf({
      upstream:{edges:[edgeOf('u1','observed-causal',hostile)],remainder:{count:0,atLeast:false,byClass:{}}},
      downstream:{edges:[edgeOf('d1','grouping',hostile)],remainder:{count:0,atLeast:false,byClass:{}}},
      references:[{direction:'downstream',reason:'unknown-endpoint',key:hostile,label:hostile,edgeCount:1}],
    });
    return modelOf(projectionOf(['focus','u1','d1']),()=>topology);
  }
  it.each(SIZES.flatMap(size=>TIERS.map(ascii=>[size,ascii] as const)))('A4 hostile provenance/neighbour text is sanitized and fits the width at %o ascii=%s',(size,ascii)=>{
    const out=details(hostileModel(),size,ascii);
    expect(out.length).toBeLessThanOrEqual(size.rows);
    expect(out.every(line=>visibleWidth(line)<=size.width)).toBe(true);
    const text=joined(out);
    expect(text).not.toContain('\u001b');
    expect(text).not.toContain('‮');
    expect(text).not.toContain('​');
    expect(text).not.toContain('\u0007');
    expect(text).toContain('Upstream (1)');
  });
  it('A4 the ASCII tier draws direction with only +-|<> glyphs',()=>{
    const projection=projectionOf(['focus','u1','d1']);
    relate(projection,'u1','focus'); relate(projection,'focus','d1');
    const out=details(modelOf(projection,selected(projection)),{width:120,rows:40},true);
    expect(out.every(line=>/^[\x20-\x7e]*$/u.test(line))).toBe(true);
    expect(joined(out)).toMatch(/<- furnace\/operation\/u1 . declared dependency/);
    expect(joined(out)).toMatch(/-> furnace\/operation\/d1 . declared dependency/);
  });
});

describe('B5 docs/workbench/10 § Rendering pipeline: bounded rows, counted remainder, hint and paged line preserved',()=>{
  it('A5 a 40-edge downstream fan-out renders bounded rows plus one `… +k more (bounded)` row where k is the number not rendered',()=>{
    const ids=['focus',...Array.from({length:40},(_,i)=>`d${i}`)];
    const projection=projectionOf(ids,60);
    for(let i=0;i<40;i++) relate(projection,'focus',`d${i}`);
    const model=modelOf(projection,node=>selectLinkedTopology({scope,relations:projection},node.key,{perDirection:50}));
    for(const ascii of TIERS){
      const out=details(model,{width:80,rows:24},ascii);
      expect(out.length).toBeLessThanOrEqual(24);
      expect(out[out.length-1]).toMatch(HINT);
      expect(joined(out)).toMatch(/Rows 1-\d+\/\d+ . viewport only/u);
      const edgeRows=out.filter(line=>(ascii?/^ -> /:/^ → /).test(line)).length;
      const marker=out.filter(line=>/\+\d+ more \(bounded\)/.test(line));
      expect(marker).toHaveLength(1);
      expect(edgeRows).toBeGreaterThan(0);
      expect(edgeRows).toBeLessThan(40);
      expect(Number(/\+(\d+) more/.exec(marker[0])![1])).toBe(40-edgeRows);
      expect(marker[0]).toContain(ascii?'...':'…');
    }
  });
  it('A5 slice-side remainders (selector caps) are counted in the same row, and a partial count is flagged',()=>{
    const topology=sliceOf({downstream:{edges:[edgeOf('d1','declared-dependency')],remainder:{count:7,atLeast:true,byClass:{'declared-dependency':7}}}});
    const out=details(modelOf(projectionOf(['focus','d1']),()=>topology),{width:120,rows:40});
    expect(joined(out)).toContain('Downstream (8+)');
    expect(joined(out)).toMatch(/\+7 more \(bounded\) \(partial\)/);
  });
  it.each(SIZES.flatMap(size=>TIERS.map(ascii=>[size,ascii] as const)))('A5 output never exceeds the row budget and keeps the hint at %o ascii=%s',(size,ascii)=>{
    const projection=projectionOf(['focus',...Array.from({length:30},(_,i)=>`n${i}`)],20);
    for(let i=0;i<30;i++){relate(projection,'focus',`n${i}`);relate(projection,`n${i}`,'focus','causation');}
    const out=details(modelOf(projection,node=>selectLinkedTopology({scope,relations:projection},node.key,{perDirection:50})),size,ascii);
    expect(out.length).toBeLessThanOrEqual(size.rows);
    expect(out[out.length-1]).toMatch(HINT);
  });
});

describe('B6 byte identity and read-only: docs/workbench/10 § Navigation "Closing view never stops workflow"',()=>{
  /** sha256 of the joined layout, recorded from the unmodified renderer before this change. */
  const BASELINE: Record<string,string> = {
    'details 80x24 ascii':'2972912b4aa4c5b077fa96bde3c4e5f8c9a956e79f9e199f8c5222f4e9f6a077', 'details 80x24 unicode':'94020dfa9d6757f6b4b12d633702d05c0f22ceff71f9432c45e4fd4f1083cfa8',
    'details 120x40 ascii':'2972912b4aa4c5b077fa96bde3c4e5f8c9a956e79f9e199f8c5222f4e9f6a077', 'details 120x40 unicode':'94020dfa9d6757f6b4b12d633702d05c0f22ceff71f9432c45e4fd4f1083cfa8',
  };
  function baselineModel(): InspectorModel {
    const projection=projectionOf(['focus','a','b','c']);
    relate(projection,'focus','a'); relate(projection,'b','focus','causation'); relate(projection,'focus','c','grouping');
    return modelOf(projection);
  }
  it('A6 without model.topology the details view is byte-identical to the pre-change renderer and keeps the Relations line',()=>{
    const got: Record<string,string> = {};
    for(const size of SIZES) for(const ascii of TIERS){
      const text=joined(details(baselineModel(),size,ascii));
      expect(text).toContain('Relations: ');
      got[`details ${size.width}x${size.rows} ${ascii?'ascii':'unicode'}`]=createHash('sha256').update(text).digest('hex');
    }
    expect(got).toEqual(BASELINE);
  });
  it('A6 the overview, graph and timeline views are unaffected by a supplied topology',()=>{
    const projection=projectionOf(['focus','a']);
    relate(projection,'focus','a');
    for(const view of ['overview','graph','timeline'] as const){
      const state={...initialInspectorState(),view};
      expect(layoutInspector(modelOf(projection,selected(projection)),state,{width:120,rows:40})).toEqual(layoutInspector(modelOf(projection),state,{width:120,rows:40}));
    }
  });
  it('A6 rendering calls only the topology read side and projection reads, never a mutator',()=>{
    const projection=projectionOf(['focus','a']);
    relate(projection,'focus','a');
    const mutators=['refresh','ingest','relate','markStale','disconnect','reconnect'] as const;
    const touched: string[] = [];
    const watched = new Proxy(projection,{get(target,prop){
      const value=Reflect.get(target,prop,target);
      if(typeof prop==='string' && typeof value==='function'){
        return (...args: unknown[])=>{touched.push(prop);return (value as (...a: unknown[])=>unknown).apply(target,args);};
      }
      return value;
    }});
    const calls: string[] = [];
    const model=modelOf(watched,node=>{calls.push(node.key);return selectLinkedTopology({scope,relations:projection},node.key);});
    details(model,{width:120,rows:40});
    expect(calls).toEqual([keyOf('focus')]);
    expect(touched.filter(name=>(mutators as readonly string[]).includes(name))).toEqual([]);
  });
});
