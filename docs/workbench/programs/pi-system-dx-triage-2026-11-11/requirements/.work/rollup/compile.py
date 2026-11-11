import json,re,runpy,collections
from pathlib import Path
T=Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111'); R=T/'requirements'; W=R/'.work'
ledger={d['id']:d for d in map(json.loads,(T/'epistemic-triage/CLAIMS.jsonl').read_text().splitlines())}
rows=runpy.run_path(str(W/'rollup/new-rows.py'))['ROWS']
assert [r['n'] for r in rows]==list(range(471,489))
ruling="Owner ruling 2026-11-11: the shipped docs/workbench/08 contract stands — inspection after host loss reports unknown with reconciliation guidance, never a replayed verdict; wb-0kg.3's falsifier is affirmed. EAT-R345's graceful-retirement/saved-observation distinction is deferred as a NORMATIVE_DESIGN candidate for the next program revision; every R345 cell stays A*(G-RULING) BLOCKED until a docs/08 amendment is separately adopted."
attach={'EAT-R327':['C045','C157','C203'],'EAT-R339':['C213'],'EAT-R349':['C083'],'EAT-R367':['C083'],'EAT-R363':['C229']}
# F-08: edit rationale/mapping custody only; preserve all 80 original Statements.
for shard in ['lx','ops','platform']:
 p=W/f'req-r-{shard}.md'; txt=p.read_text()
 for rid,cs in attach.items():
  pat=rf'(^## {rid} — .*?\n)(.*?)(?=^## |\Z)'
  m=re.search(pat,txt,re.M|re.S)
  if not m: continue
  block=m.group(2)
  add=' Corroborating mapping basis (F-08, no statement expansion): '+ '; '.join(f"{c} {ledger[c]['grade']}" for c in cs)+'.'
  block=re.sub(r'(^- Rationale: .*?$)',lambda x:x.group(1)+add,block,count=1,flags=re.M)
  txt=txt[:m.start(2)]+block+txt[m.end(2):]
 # R345 authority remains normative; no statement edit, explicit condition controls all cells.
 if shard=='ops':
  txt=txt.replace('- Conditions / unknowns: Preserve C041 receipt honesty and never-reuse rule; saved observation does not confer current lifecycle ownership.',
   '- Conditions / unknowns: '+ruling+' The historical statement is retained as a candidate only, not implementation authority; preserve C041 receipt honesty and never-reuse rule.')
 p.write_text(txt)
 # Align legacy map inputs for checker; canonical map is authoritative.
 mp=W/f'map-r-{shard}.jsonl'; ms=[json.loads(l) for l in mp.read_text().splitlines()]
 for d in ms:
  for c in attach.get(d['req'],[]):
   if c not in d['claims']: d['claims'].append(c)
  if 'epistemic_basis' in d: d['epistemic_basis']=[{'id':c,'status':ledger[c]['grade']} for c in d['claims']]
  if d['req']=='EAT-R345': d['conditions']=ruling
  if d['req']=='EAT-R349': d['filingDirective']='extend:wb-752.13'
  if d['req']=='EAT-R374': d['filingDirective']='extend:wb-79k.3'
 mp.write_text(''.join(json.dumps(d,ensure_ascii=False)+'\n' for d in ms))
# New prose shard, with exact ledger grades, distinct unknown sublegs and preservation basis.
lines=['# Follow-on atomic requirements — EAT-R471..EAT-R488','',
 'Requirement-set roll-up, 2026-11-11. Source pin **ce180d82f9385a315ff26bd8e7f9202cac19f5b3**; all acceptance **NOT_RUN**. EAT-R391..R470 are reserved by the MII triage and are not allocated here.',
 '', 'Uses the single V ladder and V→L normalization in REQUIREMENTS.md / TDD-MATRIX.md. Oracles below are existing probes/tests extended into red-first acceptance; baseline receipts are evidence, not acceptance passes. Repo paths resolve under `pin-ce180d82/`; `probes/` paths resolve from the triage root. Missing acquisition artifacts are explicitly BLOCKED. No beads, source files, credentials or production resources are mutated.', '']
for d in rows:
 c=d['c']; rid=f"EAT-R{d['n']}"
 lines += [f"## {rid} — {d['title']}",'',f"- Type: {d['type']}",f"- Authority: {d['authority']}",f"- Statement: {d['statement']}",f"- Rationale: {d['rationale']} Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.",'- Acceptance criteria:']
 lines += [f'  {i}. {x}' for i,x in enumerate(d['criteria'],1)]
 lines += [f"- Probe oracle: {d['oracle']}",f"- Evidence tier target: {d['v']} (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).",f"- Conditions / unknowns: {d['condition']}"]
 if d.get('preserves'): lines += ['- Preserves: '+ '; '.join(f"{c} {ledger[c]['grade']} (positive; retained regression, not derivation premise)" for c in d['preserves'])+'.']
 lines += [f"- Maps-to: {d['maps']}",'']
lines += ['## F-01 uncompiled remainder','', 'Each of the six rows is **DEFERRED_FOR_RANGE_CAPACITY**: uncompiled implementation, not repaired by adjacent requirements. The cureHint is copied from the investigator ledger. The owner allocates no requirement id for these rows in this roll-up.','', '| Claim | Grade | Family | Disposition | cureHint |','|---|---|---|---|---|']
for c in ['C020','C025','C066','C070','C071','C124']:
 d=ledger[c]; lines += [f"| {c} | {d['grade']} | {d['family']} | DEFERRED_FOR_RANGE_CAPACITY | {d['cureHint'].replace('|','&#124;')} |"]
lines+=['','## Scope-preserving residuals','', 'C059 unadvertised source authority and C060 dynamic compatibility are not broadened. C014 model resume/steer after tombstone eviction is still a distinct residual from R487 result read; C054 detached shutdown/reclamation is distinct from R486 embedded cancel and R343 detached cancel. C238 bind-address uncertainty is RESOLVED by the receipt, while daemon disclosure/notice/reclamation remains uncompiled. C142, C241 and C120 acquisition rows do not implement their separate repairs. REQUIREMENTS.md carries one canonical disposition for every claim.','']
(W/'req-r-followon.md').write_text('\n'.join(lines))
# Parse all prose fields ourselves; original audit parser is fixed to three shards.
def parse(text):
 out={}
 for m in re.finditer(r'^## (EAT-R\d+) — ([^\n]+)\n(.*?)(?=^## |\Z)',text,re.M|re.S):
  rid,title,block=m.groups(); fs={}
  for f in re.finditer(r'^- ([^:\n]+): (.*)$',block,re.M): fs[f.group(1)]=f.group(2)
  crit=re.findall(r'^  \d+\. (Assert .*)$',block,re.M)
  out[rid]={'title':title,'block':block,'fields':fs,'criteria':crit}
 return out
reqs={}; legacy={}; shardof={}
for shard in ['lx','ops','platform','followon']:
 pp=parse((W/f'req-r-{shard}.md').read_text()); reqs.update(pp)
 shardof.update({k:shard for k in pp})
 if shard!='followon':
  for l in (W/f'map-r-{shard}.jsonl').read_text().splitlines():
   d=json.loads(l); legacy[d['req']]=d
# Append new matrix rows after the original table, prior to Reading section.
mp=R/'TDD-MATRIX.md'; matrix=mp.read_text()
matrix=matrix.replace('# TDD-MATRIX — Pi-subagents system DX/UX/LX triage, EAT-R311..EAT-R390','# TDD-MATRIX — Pi-subagents system DX/UX/LX triage, EAT-R311..EAT-R390 + EAT-R471..EAT-R488')
# R345 every cell L0..L10, not merely previously-applicable cells.
for ln in matrix.splitlines():
 if ln.startswith('| EAT-R345 |'):
  f=[x.strip() for x in ln.split('|')[1:-1]]
  f[5:16]=['A*(G-RULING)']*11
  f[16]='BLOCKED. '+ruling
  matrix=matrix.replace(ln,'| '+' | '.join(f)+' |')
 if ln.startswith('| G-RULING |'):
  matrix=matrix.replace(ln,'| G-RULING | Separate adopted docs/08 amendment for the R345 candidate | **BLOCKED** — ruling is received and affirms the shipped contract | '+ruling+' |')
registry=[
 '| G-FORK-MEDIA | Authorized published fork identity and remote registry media render | **BLOCKED** | approved fork artifact identity and actual remote render capture; npm view alone is insufficient; no publication authorized |',
 '| G-CROSS-HOST | Independent-host native-read/Forge-target receipt | **BLOCKED** | independent layout without original developer-home binaries, executable/runtime pins and receipt; no host provisioning authorized |',
 '| G-DESCENDANT-PIPE | Controlled RF descendant stdout-pipe lifecycle receipt | **BLOCKED** | instrumented descendant fixture and final process-tree/pipe/slot readback; direct-child disappearance is insufficient |']
matrix=matrix.replace('\n## Matrix\n','\n'+'\n'.join(registry)+'\n\n## Matrix\n')
newlines=[]
for d in rows:
 cells=[('A*('+d['gates'][f'L{i}']+')' if f'L{i}' in d.get('gates',{}) else 'A') if f'L{i}' in d['tiers'] else '·' for i in range(1,11)]
 notes=d['condition']+' Applied tiers use the named acceptance oracles; · means this invariant has no separate '+('product implementation/branch-coverage obligation (acquisition only).' if d['type']=='VERIFICATION' else 'UI/installation/other tier obligation beyond the named journey.')+' NOT_RUN.'
 fields=[f"EAT-R{d['n']}",d['title'],d['c']+'('+ledger[d['c']]['grade']+')',d['authority'],d['v'],'TRACEABLE / NOT_RUN']+cells+[notes]
 newlines.append('| '+' | '.join(fields)+' |')
matrix=matrix.replace('\n## Reading the matrix','\n'+'\n'.join(newlines)+'\n\n## Reading the matrix')
matrix=matrix.replace('the 13 uncovered defect claims (F-01), the 14 prose-only deferrals (F-13) and every `DEFERRED_FOR_RANGE_CAPACITY` table row in req-r-ops.md / req-r-platform.md need follow-on IDs (EAT-R391+) before they can have a row here.', 'the six tabled F-01 claims, ten remaining F-13 prose-deferral claims and all independent uncompiled implementation residuals are explicitly dispositioned in REQUIREMENTS.md. New IDs are R471..R488; R391..R470 remain MII-reserved. No silent closure follows from acquisition or status wording.')
matrix=matrix.replace('No cell may run before the ruling.','No R345 cell may run until a docs/08 amendment is separately adopted.')
matrix+='\n## Owner ruling (F-04)\n\n'+ruling+'\n\nR345 is historical candidate text only. Its L0 and every L1–L10 cell are A*(G-RULING) BLOCKED; neither receipt acquisition nor the received ruling permits implementation. No docs/08 amendment was made.\n'
mp.write_text(matrix)
# Canonical verification list is read from actual matrix applied cells, not conflicting legacy V labels.
matcells={}
for ln in matrix.splitlines():
 if ln.startswith('| EAT-R'):
  f=[x.strip() for x in ln.split('|')[1:-1]]; assert len(f)==17,(f[0],len(f)); matcells[f[0]]=f
canonical=[]
for rid,r in sorted(reqs.items(),key=lambda kv:int(kv[0][5:])):
 fs=r['fields']; sh=shardof[rid]
 if sh=='followon':
  d=next(d for d in rows if rid==f"EAT-R{d['n']}"); old={}; claims=[d['c']]; preserve=d.get('preserves',[]); beads=d.get('beads',[]); cond=d['condition']; deriv='EVIDENCE_GATE' if d['authority']=='EVIDENCE_ACQUISITION' else ('LOOPBACK_REGRESSION' if d['n']==483 else 'BEHAVIORAL_REPAIR'); oracle=d['oracle']; group=fs['Maps-to']
 else:
  old=legacy[rid]; claims=old['claims']; preserve=old.get('preserves',[]); beads=old.get('existingBeads',re.findall(r'wb-[a-z0-9]+(?:\.\d+)?',old.get('existingBead') or '')); cond=next((v for k,v in fs.items() if k.startswith('Conditions')),old.get('conditions','none')); deriv=old['derivation']; oracle=fs.get('Probe oracle', '\n'.join(r['criteria'])); group=old.get('existingGroup',fs['Maps-to'])
 conditions=[] if cond.strip().lower()=='none' else [cond]
 verification=['L'+str(i) for i in range(1,11) if matcells[rid][5+i].startswith('A')]
 if rid=='EAT-R345': verification=['L'+str(i) for i in range(11)]
 families=sorted({ledger[c]['family'] for c in claims})
 out={'requirement':rid,'type':fs['Type'],'authority':fs['Authority'],'derived_from':claims,'epistemic_basis':[{'id':c,'status':ledger[c]['grade']} for c in claims], 'derivation':deriv,'conditions':conditions,'verification':verification,'family':families[0] if len(families)==1 else families,'existingBeads':beads,'oracle':oracle,'acceptanceState':'NOT_RUN','scope':'ce180d82f9385a315ff26bd8e7f9202cac19f5b3, 2026-11-11; C238 bind supplemental receipt at named host 2026-11-11T07:32:01Z' if rid=='EAT-R483' else 'ce180d82f9385a315ff26bd8e7f9202cac19f5b3, 2026-11-11','preserves':preserve,'workbenchGroup':group,'shard':sh}
 if preserve: out['preservation_basis']=[{'id':c,'status':ledger[c]['grade']} for c in preserve]
 if old.get('priorEAT'): out['priorEAT']=old['priorEAT']
 if old.get('lineageBeads'): out['lineageBeads']=old['lineageBeads']
 if old.get('dependsOnCompiled'): out['dependsOnCompiled']=old['dependsOnCompiled']
 if rid=='EAT-R349': out['filingDirective']='extend:wb-752.13'
 elif rid=='EAT-R374': out['filingDirective']='extend:wb-79k.3'
 elif len(re.findall(r'\bMUST\b',fs['Statement']))>=2: out['filingDirective']='split-per-criterion'
 if rid in ['EAT-R351','EAT-R352']:
  out['gateAuthorities']=[{'gate':'G-PTY','authority':'EVIDENCE_ACQUISITION','criterion':3,'claim':'C096' if rid.endswith('351') else 'C097','status':'BLOCKED','missingArtifact':'credentialed Pi pty session + qa/workbench/live-inspector-receipt.mjs (wb-6ze.15 deliverable, absent at pin)'}]
 if rid=='EAT-R345': out['candidateState']='DEFERRED_NORMATIVE_DESIGN'; out['gateAuthorities']=[{'gate':'G-RULING','authority':'NORMATIVE_DECISION','status':'BLOCKED','missingArtifact':'separately adopted docs/08 amendment','ruling':ruling}]
 if sh=='followon' and d.get('gates'): out['gates']=d['gates']
 canonical.append(out)
(R/'CLAIM-REQUIREMENT-MAP.jsonl').write_text(''.join(json.dumps(d,ensure_ascii=False)+'\n' for d in canonical))
# One disposition per claim; multiple compiled requirements are one joined disposition, never duplicate defer statuses.
compiled=collections.defaultdict(list); retained=collections.defaultdict(list)
for d in canonical:
 for c in d['derived_from']: compiled[c].append(d['requirement'])
 for c in d['preserves']: retained[c].append(d['requirement'])
# Keep original residuals/cureHints. Explicit statement scopes, not wholesale claim closure.
residual=collections.defaultdict(list)
ops=(W/'req-r-ops.md').read_text(); platform=(W/'req-r-platform.md').read_text()
for m in re.finditer(r'^\| (C\d{3}) \| \w+ \| [\w-]+ \| (.*) \|$',ops,re.M): residual[m[1]].append(m[2])
for m in re.finditer(r'^\| (C\d{3}) \| \w+ \| \w+ \| (.*?) \| (.*?) \|$',platform,re.M):
 c,disp,note=m.groups()
 if 'DEFERRED' in disp or not note.startswith('Only the named statement'): residual[c].append(note)
# Scope corrections of dual/acquisition rows.
overrides={
 'C045':'Tool-reference scope compiled in R327; no independent deferred tool-reference obligation remains.',
 'C157':'Provider-input reference scope compiled in R327; backend-aware runtime description/errors remain C164/C234 residuals.',
 'C203':'Tool-reference reach compiled in R327; no duplicate repair.',
 'C213':'Skill/doc packaging coherence compiled in R339; no duplicate repair.',
 'C083':'Bounded sanitized Furnace diagnostic legs compiled in R349/R367; R367 non-envelope retention remains blocked by the landed custody pin.',
 'C229':'Schema first-failing-path/oneOf diagnostic compiled in R363; no duplicate schema repair.',
 'C168':'General operator capabilityLimits and nodeCap knobs remain uncompiled; R372 compiles deadline composition only.',
 'C110':'Status/evidence census wording compiled in R387; panes/ASCII production wiring remains independent C107 residual.',
 'C161':'Landed replay status wording compiled in R387; do not repin historical fixtures or infer new runtime replay guarantees.',
 'C172':'Live-true feature/changelog wording compiled in R387; no separate duplicate status requirement.',
 'C145':'R357 maps the no-shipped-effectful-producer premise; a real effectful capability/grant/native journey remains uncompiled.',
 'C049':ledger['C049']['cureHint'], 'C078':ledger['C078']['cureHint'], 'C102':ledger['C102']['cureHint'], 'C169':ledger['C169']['cureHint'],
 'C142':ledger['C142']['cureHint']+' R479 acquires the NOT_RUN Forge leg only.',
 'C120':'Repository changed-path/status enforcement is R387; R478 acquires the outside-machine leg only. Missing external artifact stays BLOCKED.',
 'C216':'R480 acquires remote media evidence only; publishing identity/media URL policy remains an unadopted distribution decision. No publication authorized.',
 'C238':ledger['C238']['cureHint']+' Bind-address unknown RESOLVED by probes/reqset-rollup/c238-bind-address.txt; R483 is explicit-loopback regression only.',
 'C241':ledger['C241']['cureHint']+' R481 acquires cross-host evidence only.',
 'C245':'Direct-child/environment positive retained by R372/R389; R482 acquires the distinct grandchild stdout-pipe lifecycle leg, not a cleanup guarantee.',
 'C014':'R487 compiles result retrieval only; tombstone-backed model resume/steer and retention-policy choices remain uncompiled.',
 'C054':'R486 compiles embedded cancel; R343 compiles detached cancel. Detached shutdown/reclamation is still uncompiled, not a duplicate cancel bead.',
 'C035':'R345 graceful-retirement saved observation is a deferred NORMATIVE_DESIGN candidate; docs/08 contract and wb-0kg.3 falsifier stand.',
 'C036':'R344 compiles transport-loss classification; retirement interpretation cannot rely on the blocked R345 saved observation.',
}
for c,s in overrides.items(): residual[c]=[s]
# Independent partial scopes explicitly listed in ops prose.
for ln in ops.splitlines():
 if re.match(r'^- C\d{3}',ln):
  cs=re.findall(r'C\d{3}',ln.split(':',1)[0]); note=ln.split(':',1)[1].strip()
  for c in cs:
   if c not in overrides: residual[c].append(note)
# Required F13 residual claims; five have new full rows, ten stay tabled.
f13='C002 C003 C005 C014 C021 C022 C050 C051 C052 C054 C062 C068 C116 C178 C193'.split()
uncovered_rest='C020 C025 C066 C070 C071 C124'.split()
# Preserve four F14 positives via actual tests without minting unnecessary IDs.
positive_tests={
 'C032':['test/agent-manager.test.ts','test/agent-types.test.ts','test/custom-agents.test.ts','test/model-resolver.test.ts','test/model-scope.test.ts','test/enabled-models.test.ts','test/mention.test.ts','test/mention-clone.test.ts','test/group-join.test.ts','test/skill-loader.test.ts','test/invocation-config.test.ts','test/memory.test.ts','test/prompts.test.ts','test/agent-manager-gc.test.ts','test/foreground-result-retrieval.test.ts','test/agent-dir.test.ts','test/agent-mention-wiring.test.ts','test/nested-tools.test.ts'],
 'C075':['test/workflow-examples.test.ts','test/workflow-examples-claude-backend.test.ts','test/workflow-tool-description.test.ts','test/workflow-tool.test.ts','probes/execute/real-extension.probe.test.ts'],
 'C155':['test/worktree-process-kill-preservation.test.ts','test/worktree.test.ts','probes/journal/p10-worktree.probe.ts'],
 'C197':['probes/observe/t/b-registered.probe.test.ts','probes/observe/t/a-builder.probe.test.ts','test/workflow-tool.test.ts']}
dispositions=[]
for c,d in sorted(ledger.items()):
 comp=compiled.get(c,[]); keep=retained.get(c,[]); rr=list(dict.fromkeys(residual.get(c,[])))
 if comp:
  disp='compiled: '+', '.join(comp)+'; implementation residual: '+(' '.join(rr) if rr else 'none beyond the named invariant; no blanket claim closure')
  state='COMPILED'
 elif d['kind']=='positive':
  # All positives need explicit retained evidence, including positives named only in conditions.
  tests=positive_tests.get(c,[])
  if not tests:
   ev=d['evidence']; tests=re.findall(r'(?:test|probes)/[\w./-]+\.(?:test\.ts|probe\.ts|mjs|log|json)',ev)
  disp='retained regression: '+(', '.join(keep) if keep else 'source-scoped ledger oracle')+'; retained oracle: '+('; '.join(tests) if tests else d['evidence'])+'; no new acceptance pass'
  state='RETAINED_POSITIVE'
 else:
  why='F-01 follow-on capacity' if c in uncovered_rest else ('F-13 remaining independent obligation' if c in f13 else 'prior shard capacity or independent implementation scope')
  disp='DEFERRED_FOR_RANGE_CAPACITY; reason: '+why+'; cureHint: '+d['cureHint']; state='DEFERRED_FOR_RANGE_CAPACITY'
 rec={'claim':c,'grade':d['grade'],'family':d['family'],'kind':d['kind'],'state':state,'requirements':comp,'preserves':keep,'disposition':disp,'cureHint':d['cureHint']}
 if c in positive_tests: rec['retainedTests']=positive_tests[c]
 if rr: rec['implementationResidual']=rr
 dispositions.append(rec)
(W/'rollup/dispositions.jsonl').write_text(''.join(json.dumps(x,ensure_ascii=False)+'\n' for x in dispositions))
# Carry claim dispositions in canonical map as well as one per-claim index. Multi-row premises get identical joined disposition.
byclaim={x['claim']:x for x in dispositions}
for out in canonical:
 out['claimDispositions']=[{'claim':c,'disposition':byclaim[c]['disposition']} for c in out['derived_from']]
 if out['requirement']=='EAT-R483': out['supplementalEvidence']=['probes/reqset-rollup/c238-bind-address.txt']
(R/'CLAIM-REQUIREMENT-MAP.jsonl').write_text(''.join(json.dumps(d,ensure_ascii=False)+'\n' for d in canonical))
# Correct stale shard defer tables without dropping independent repair residue.
for shard in ['ops','platform']:
 p=W/f'req-r-{shard}.md'; txt=p.read_text(); new=[]
 for ln in txt.splitlines():
  m=re.match(r'^\| (C\d{3}) \|',ln)
  if m and m[1] in compiled:
   c=m[1]; fs=ln.split('|')
   if shard=='ops' and len(fs)==6: fs[4]= ' '+byclaim[c]['disposition']+' '; ln='|'.join(fs)
   elif shard=='platform' and len(fs)==7:
    fs[4]=' compiled: '+', '.join(compiled[c])+' '; fs[5]=' implementation residual: '+(' '.join(residual.get(c,[])) or 'none beyond the named invariant; no blanket claim closure')+' '; ln='|'.join(fs)
  new.append(ln)
 txt='\n'.join(new)+'\n'
 if shard=='ops': txt=txt.replace('Each row below is **DEFERRED_FOR_RANGE_CAPACITY**, not repaired and not discharged by a related requirement above.', 'Rows marked **DEFERRED_FOR_RANGE_CAPACITY** remain uncompiled. Rows now marked `compiled: <id>; implementation residual: <text>` have one joined disposition under the roll-up (F-08); their residual text is not discharged by a related requirement.')
 txt+='\n## Roll-up custody precedence (F-08)\n\nREQUIREMENTS.md and CLAIM-REQUIREMENT-MAP.jsonl are the canonical disposition index. Earlier capacity/coverage prose is historical shard selection, not a second active disposition. New full rows R471..R488 and attachments supersede an earlier blanket deferral only for the named invariant; all implementation residuals are retained in the canonical per-claim table. C238 bind-address unknown is RESOLVED by probes/reqset-rollup/c238-bind-address.txt; daemon disclosure/reclamation remains residual. No row of R311..R390 was re-derived.\n'
 p.write_text(txt)
print('requirements',len(canonical),'new',len(rows),'acquisition',sum(x['authority']=='EVIDENCE_ACQUISITION' for x in rows),'F01 tabled',len(uncovered_rest),'F13 remaining tabled',len(set(f13)-{x['c'] for x in rows}))
print('dispositions',len(dispositions),dict(collections.Counter(x['state'] for x in dispositions)))
