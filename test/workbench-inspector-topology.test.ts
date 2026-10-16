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
/** Downstream edge rows naming a furnace neighbour: a keyRef case proves its row RENDERS before it asserts what the row hides. */
const neighbourRows = (text: string, ascii: boolean): string[] => text.split('\n').filter(line=>line.startsWith(ascii?' -> furnace/operation/':' → furnace/operation/'));

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
  it('F1 an empty slice carrying a truncation flag says incomplete trace and never "no observed relations"; a complete empty slice says the reverse',()=>{
    const projection=projectionOf(['focus']);
    for(const reason of ['relations-truncated','cycle-search-truncated'] as const){
      const cut=sliceOf({trace:{label:'incomplete-trace',reasons:['no-observed-relations',reason],caveat:TOPOLOGY_CAVEAT}});
      const text=joined(details(modelOf(projection,()=>cut),{width:120,rows:40}));
      expect(text).toContain('Topology: incomplete trace');
      expect(text).toContain(reason.replace(/-/g,' '));
      expect(text).not.toContain('no observed relations');
    }
    const complete=sliceOf({trace:{label:'incomplete-trace',reasons:['no-observed-relations'],caveat:TOPOLOGY_CAVEAT}});
    const text=joined(details(modelOf(projection,()=>complete),{width:120,rows:40}));
    expect(text).toContain('Topology: no observed relations (missing edges do not imply independence)');
    expect(text).not.toContain('incomplete trace');
  });
  it('F1 the real selector carries its truncation flag to the details view: a full relation page renders incomplete trace with the reason',()=>{
    const ids=['focus',...Array.from({length:12},(_,i)=>`d${i}`)];
    const projection=projectionOf(ids);
    for(let i=0;i<12;i++) relate(projection,'focus',`d${i}`);
    const out=details(modelOf(projection,node=>selectLinkedTopology({scope,relations:projection},node.key,{perDirection:2,relationPage:3})),{width:120,rows:40});
    expect(joined(out)).toMatch(/Topology: incomplete trace \(relations truncated/);
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
  const RLO=String.fromCharCode(0x202e);
  const ZWSP=String.fromCharCode(0x200b);
  const hostile=`src\u001b[31m${RLO}red${ZWSP}漢字\u0007`;
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
    expect(text).not.toContain(RLO);
    expect(text).not.toContain(ZWSP);
    expect(text).not.toContain('\u0007');
    expect(text).toContain('Upstream (1)');
  });
  /** wb-6ze.16 respin U2/F3 (16:03Z/16:43Z program rule): separators become one space BEFORE the final redaction, never deleted first. */
  const SECRET='SECRETabc123XYZ';
  const SEPARATORS=[['C1 NEL',String.fromCharCode(0x85)],['bidi RLO',String.fromCharCode(0x202e)],['bidi LRI',String.fromCharCode(0x2066)],['zero-width',String.fromCharCode(0x200b)],['C1 PAD',String.fromCharCode(0x80)]] as const;
  const SCHEMES = ['Bearer','Basic'] as const;
  const GLUED = SCHEMES.flatMap(scheme=>SEPARATORS.map(([name,sep])=>[scheme,name,sep] as const));
  it.each(GLUED)('U2 %s + %s separator in a declared edge neighbour id never leaks the token through the real projection (keyRef path)',(scheme,_name,sep)=>{
    const projection=projectionOf(['focus']);
    relate(projection,'focus',`${scheme}${sep}${SECRET}`);
    for(const size of SIZES) for(const ascii of TIERS){
      const text=joined(details(modelOf(projection,selected(projection)),size,ascii));
      expect(text).not.toContain(SECRET);
      expect(neighbourRows(text,ascii)).toEqual([expect.stringContaining('[REDACTED]')]);
    }
  });
  it.each(GLUED)('U2 %s + %s separator in a provenance source label never leaks the token',(scheme,_name,sep)=>{
    const topology=sliceOf({
      upstream:{edges:[edgeOf('u1','observed-causal',`${scheme}${sep}${SECRET}`)],remainder:{count:0,atLeast:false,byClass:{}}},
      downstream:{edges:[edgeOf('d1','grouping',`${scheme}${sep}${SECRET}`)],remainder:{count:0,atLeast:false,byClass:{}}},
    });
    const text=joined(details(modelOf(projectionOf(['focus','u1','d1']),()=>topology),{width:120,rows:40}));
    expect(text).not.toContain(SECRET);
    expect(text).toContain('Upstream (1)');
  });
  it('U2 word fusion: LF, TAB and U+2028 between words render as a space, not as fused text',()=>{
    const fuse=`line one${String.fromCharCode(10)}line two${String.fromCharCode(9)}line three${String.fromCharCode(0x2028)}line four`;
    const topology=sliceOf({upstream:{edges:[edgeOf('u1','observed-causal',fuse)],remainder:{count:0,atLeast:false,byClass:{}}}});
    const text=joined(details(modelOf(projectionOf(['focus','u1']),()=>topology),{width:120,rows:40}));
    expect(text).toContain('line one line two line three line four');
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

describe('F5 owner ruling: a hidden topology section is never silent',()=>{
  function modelWithEdges(): InspectorModel {
    const projection=projectionOf(['focus','a','b']);
    relate(projection,'focus','a'); relate(projection,'b','focus','causation');
    return modelOf(projection,selected(projection));
  }
  it.each([8,9,10,11,12,13])('at %i rows the section yields one header row to a "topology hidden: terminal height" marker and the hint stays last',(rows)=>{
    for(const ascii of TIERS){
      const out=details(modelWithEdges(),{width:80,rows},ascii);
      expect(out.length).toBeLessThanOrEqual(rows);
      expect(out[out.length-1]).toMatch(HINT);
      const text=joined(out);
      if(text.includes('Upstream (')||text.includes('Downstream (')) continue;
      expect(out.filter(line=>line.trim()==='topology hidden: terminal height')).toHaveLength(1);
    }
  });
  it('at a height with room the marker never appears',()=>{
    expect(joined(details(modelWithEdges(),{width:120,rows:40}))).not.toContain('topology hidden');
  });
  it('the base Relations line is untouched without model.topology (pre-existing remainder is wb-ea1 scope)',()=>{
    const projection=projectionOf(['focus','a']);
    relate(projection,'focus','a');
    expect(joined(details(modelOf(projection),{width:120,rows:40}))).not.toContain('topology hidden');
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

describe('wb-6ze.16 respin U1 (gate-3 07:18Z, owner 07:23Z): a unit glued inside a keyword, prefix or token never splits it on the real keyRef path',()=>{
  /** docs/workbench/12 § Input and output hardening: "Validate Unicode and terminal escape sequences before display (no untrusted ANSI injection)."
   * The ONE helper reads every gap as a separator AND as glue; a local pre-pass that rewrote the gap first would split the keyword or token. */
  const cp = (code: number): string => String.fromCodePoint(code);
  const ZWSP=cp(0x200b);
  const RLO=cp(0x202e);
  const WJ=cp(0x2060);
  const NEL=cp(0x85);
  const APC=cp(0x9f);
  type InTokenProbe = readonly [id: string, raw: string, secret: string];
  /** test/workbench-sanitizer-corpus.test.ts CORPUS S4, K2 and K5, verbatim. */
  const CORPUS_SPLITS: readonly InTokenProbe[] = [
    ['CORPUS S4 ZWSP inside the scheme',`token: Bear${ZWSP}er abc123`,'abc123'],
    ['CORPUS K2 RLO inside password',`pass${RLO}word=hunter2`,'hunter2'],
    ['CORPUS K5 WJ inside api_key',`api${WJ}_key=xyz789`,'xyz789'],
  ];
  /** The same file's ACCEPTANCE within-token shapes the gate named, with U+200B and U+202E, built and named as that corpus builds them. */
  const WITHIN: readonly (readonly [position: string, shape: (unit: string, secret: string) => string])[] = [
    ['inside Bearer',(unit,secret)=>`Authorization: Bea${unit}rer ${secret}`],
    ['inside ghp_',(unit,secret)=>`see gh${unit}p_${secret}`],
    ['inside a Bearer token',(unit,secret)=>`Bearer SEC${unit}${secret}`],
    ['inside password',(unit,secret)=>`pass${unit}word=${secret}`],
  ];
  const ACCEPTANCE_SPLITS: readonly InTokenProbe[] = ([['U+200B',ZWSP],['U+202E',RLO]] as const).flatMap(([name,unit])=>WITHIN.map(([position,shape]):InTokenProbe=>{
    const secret=`ACCEPT${name.replace(/[^A-Z0-9]/g,'')}${position.replace(/[^a-z]/g,'').slice(0,24)}`;
    return [`ACCEPTANCE ${name} ${position}`,shape(unit,secret),secret];
  }));
  /** F5: a C1 unit glued inside a Bearer token. The helper's raw reading keeps the token whole, as the graph view of the same relation
   * renders it; rewriting the unit to a space first ended the token early and showed its tail ("[REDACTED] RETTAIL"). */
  const C1_GLUED: readonly InTokenProbe[] = [
    ['F5 U+0085 inside a Bearer token',`Bearer SEC${NEL}RETTAIL`,'RETTAIL'],
    ['F5 U+009F inside a Bearer token',`Bearer SEC${APC}RETTAIL`,'RETTAIL'],
  ];
  const IN_TOKEN: readonly InTokenProbe[] = [...CORPUS_SPLITS,...ACCEPTANCE_SPLITS,...C1_GLUED];
  it('the probe table holds every gate-named shape, so an emptied table cannot pass vacuously',()=>{
    expect(IN_TOKEN.map(([id])=>id)).toEqual([
      'CORPUS S4 ZWSP inside the scheme','CORPUS K2 RLO inside password','CORPUS K5 WJ inside api_key',
      'ACCEPTANCE U+200B inside Bearer','ACCEPTANCE U+200B inside ghp_','ACCEPTANCE U+200B inside a Bearer token','ACCEPTANCE U+200B inside password',
      'ACCEPTANCE U+202E inside Bearer','ACCEPTANCE U+202E inside ghp_','ACCEPTANCE U+202E inside a Bearer token','ACCEPTANCE U+202E inside password',
      'F5 U+0085 inside a Bearer token','F5 U+009F inside a Bearer token',
    ]);
  });
  it.each(IN_TOKEN)('%s as a declared edge neighbour id: the row renders redacted and the credential never leaks (real projection, keyRef path)',(_id,raw,secret)=>{
    const projection=projectionOf(['focus']);
    relate(projection,'focus',raw);
    for(const size of SIZES) for(const ascii of TIERS){
      const text=joined(details(modelOf(projection,selected(projection)),size,ascii));
      expect(neighbourRows(text,ascii)).toEqual([expect.stringContaining('[REDACTED]')]);
      expect(text).not.toContain(secret);
      for(const unit of [ZWSP,RLO,WJ,NEL,APC]) expect(text).not.toContain(unit);
    }
  });
});
