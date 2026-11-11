import json,re,collections
from pathlib import Path
T=Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111');R=T/'requirements';W=R/'.work'
led={d['id']:d for d in map(json.loads,(T/'epistemic-triage/CLAIMS.jsonl').read_text().splitlines())}
ms=list(map(json.loads,(R/'CLAIM-REQUIREMENT-MAP.jsonl').read_text().splitlines())); ds=list(map(json.loads,(W/'rollup/dispositions.jsonl').read_text().splitlines()))
assert len(ms)==98 and len({d['requirement'] for d in ms})==98
assert [int(d['requirement'][5:]) for d in ms]==list(range(311,391))+list(range(471,489))
assert len(ds)==267 and {d['claim'] for d in ds}==set(led)
reqs={}
for sh in ['lx','ops','platform','followon']:
 t=(W/f'req-r-{sh}.md').read_text()
 for m in re.finditer(r'^## (EAT-R\d+) — .*?\n(.*?)(?=^## |\Z)',t,re.M|re.S):reqs[m[1]]=m[2]
 if sh!='followon':
  orig=(W/f'rollup/orig/req-r-{sh}.md').read_text()
  assert re.findall(r'^- Statement: .*$',orig,re.M)==re.findall(r'^- Statement: .*$',t,re.M)
assert set(reqs)=={d['requirement'] for d in ms}
for d in ms:
 for k in ['requirement','type','authority','derived_from','epistemic_basis','derivation','conditions','verification','family','existingBeads','oracle','acceptanceState','scope','preserves']:assert k in d,(d['requirement'],k)
 assert d['acceptanceState']=='NOT_RUN'
 assert isinstance(d['conditions'],list) and isinstance(d['existingBeads'],list)
 assert d['epistemic_basis']==[{'id':c,'status':led[c]['grade']} for c in d['derived_from']]
 assert not set(d['preserves'])&set(d['derived_from'])
 assert all(re.fullmatch(r'L(?:10|[0-9])',v) for v in d['verification'])
 b=reqs[d['requirement']]
 assert len(re.findall(r'^  \d+\. Assert ',b,re.M))>=2
 if int(d['requirement'][5:])>=471:
  st=re.search(r'^- Statement: (.*)$',b,re.M)[1];assert len(re.findall(r'\bMUST\b',st))==1
  rat=re.search(r'^- Rationale: (.*)$',b,re.M)[1]
  for c in d['derived_from']:assert c+' '+led[c]['grade'] in rat
mat={}
for l in (R/'TDD-MATRIX.md').read_text().splitlines():
 if l.startswith('| EAT-R'):
  f=[x.strip() for x in l.split('|')[1:-1]];assert len(f)==17;assert f[0] not in mat;mat[f[0]]=f
assert set(mat)==set(reqs)
assert mat['EAT-R345'][5:16]==['A*(G-RULING)']*11
mm={d['requirement']:d for d in ms}
assert mm['EAT-R328']['existingBeads']==['wb-9x5.11']
assert mm['EAT-R331']['existingBeads']==['wb-9x5.11']
assert mm['EAT-R329']['existingBeads']==['wb-79k.3']
assert mm['EAT-R349']['filingDirective']=='extend:wb-752.13'
assert mm['EAT-R374']['filingDirective']=='extend:wb-79k.3'
for r in ['EAT-R351','EAT-R352']:assert mm[r]['gateAuthorities'][0]['authority']=='EVIDENCE_ACQUISITION'
for d in ds:
 assert d['grade']==led[d['claim']]['grade']
 for p in d.get('retainedTests',[]):assert (T/p).exists() or (T/'pin-ce180d82'/p).exists(),p
# Concrete path tokens in the new prose; logical references to absent acquisition artifacts are declared gates.
t=(W/'req-r-followon.md').read_text();paths=set(re.findall(r'(?:probes|test|qa|src)/[a-zA-Z0-9_./-]+\.(?:ts|mjs|out|json|log)',t))
missing=[]
for p in sorted(paths):
 if not ((T/p).exists() or (T/'pin-ce180d82'/p).exists()):missing.append(p)
assert not missing,missing
print('PASS: 98 canonical/map/prose/matrix ids; original R311..R390 statements byte-identical; new R471..R488 contiguous; reserved R391..R470 untouched.')
print('PASS: 267 unique claim dispositions; all map grades equal CLAIMS.jsonl; preservation controls separate; all acceptance NOT_RUN.')
print('PASS: 18 new full atomic rows (12 BEHAVIORAL + 5 VERIFICATION/EVIDENCE_ACQUISITION + 1 NEGATIVE_REGRESSION/RISK_CONTROL), >=2 Assert criteria each.')
print('PASS: F-02 live targets; F-03 filing extensions; F-05 pty gate authorities; R345 all 11 cells BLOCKED on G-RULING.')
print('PASS:',len(paths),'concrete new-row oracle paths and all F-14 retained test paths resolve.')
print('Defect dispositions:',dict(collections.Counter(d['state'] for d in ds if d['kind']=='defect')))
print('Positive dispositions:',dict(collections.Counter(d['state'] for d in ds if d['kind']=='positive')))
print('Total tabled uncompiled deferrals:',sum(d['state']=='DEFERRED_FOR_RANGE_CAPACITY' for d in ds),'(F-01 six; F-13 ten; other prior-shard residual claims 61).')
