import json, re, pathlib
from collections import Counter
T=pathlib.Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111')
W=T/'requirements/.work'
C={r['id']:r for r in map(json.loads,(T/'epistemic-triage/CLAIMS.jsonl').read_text().splitlines())}
text=(W/'req-r-platform.md').read_text()
maps=[json.loads(l) for l in (W/'map-r-platform.jsonl').read_text().splitlines() if l.strip()]
fails=[]
# 1 ids
heads=re.findall(r'(?m)^## (EAT-R(\d+)) — (.+)$',text)
ids=[int(n) for _,n,_ in heads]
if ids!=list(range(366,391)): fails.append(f'id sequence wrong: {ids[:3]}..{ids[-3:]} len={len(ids)}')
if [m['req'] for m in maps]!=[h[0] for h in heads]: fails.append('map/req id join mismatch')
# 2 map rows well-formed + grades copied exactly
for m in maps:
    for b in m['epistemic_basis']:
        if b['status']!=C[b['id']]['grade']: fails.append(f"{m['req']}: basis {b['id']} status {b['status']} != ledger {C[b['id']]['grade']}")
    if sorted(b['id'] for b in m['epistemic_basis'])!=sorted(m['claims']): fails.append(f"{m['req']}: claims/basis mismatch")
    if m['acceptanceState']!='NOT_RUN': fails.append(f"{m['req']}: acceptanceState")
# 3 laundering: every Cnnn + grade token in text must match ledger
for cid,st in re.findall(r'\b(C\d{3})\s+(ESTABLISHED|SUPPORTED|PLAUSIBLE|UNSUPPORTED|CONTESTED|REFUTED|UNDETERMINED)\b',text):
    if cid not in C: fails.append(f'unknown claim cited: {cid}')
    elif C[cid]['grade']!=st: fails.append(f'laundering: {cid} cited {st}, ledger {C[cid]["grade"]}')
for cid in set(re.findall(r'\bC\d{3}\b',text)):
    if cid not in C: fails.append(f'unknown claim id in text: {cid}')
# 4 structure of each requirement body
blocks=re.split(r'(?m)^## (?=EAT-R\d+)',text)[1:]
for b in blocks:
    rid=b.split(' ',1)[0]
    body=b.split('\n## ')[0]
    for field in ('- Type:','- Authority:','- Statement:','- Rationale:','- Acceptance criteria:','- Probe oracle:','- Evidence tier target:','- Conditions/unknowns:','- Maps-to:'):
        if field not in body: fails.append(f'{rid}: missing field {field}')
    crits=re.findall(r'(?m)^  \d+\. ',body)
    if len(crits)<2: fails.append(f'{rid}: fewer than 2 acceptance criteria')
    if 'MUST' not in body.split('- Rationale:')[0]: fails.append(f'{rid}: statement lacks MUST')
    m=re.search(r'- Authority: (\w+)',body)
    st=re.search(r'- Statement: (.*)',body).group(1)
# 5 SUPPORTED/PLAUSIBLE premises must be marked in rationale where they are basis
for m in maps:
    weak=[b['id'] for b in m['epistemic_basis'] if b['status'] in ('SUPPORTED','PLAUSIBLE')]
    if weak:
        body=[b for b in blocks if b.startswith(m['req'])][0]
        for cid in weak:
            pat=re.compile(re.escape(cid)+r'[^.;\n]{0,160}(SUPPORTED|PLAUSIBLE)')
            if not pat.search(body): fails.append(f"{m['req']}: weak-status {cid} not marked in body")
# 6 own-family full disposition
own=[c for c,v in C.items() if v['family'] in ('providers','packaging','scheduling')]
tbl=dict(re.findall(r'(?m)^\| (C\d{3}) \| \w+ \| \w+ \| ([^|]+) \|',text))
missing=[c for c in own if c not in tbl]
if missing: fails.append(f'own-family rows missing from disposition: {missing}')
mapped={c for m in maps for c in m['claims']}
for c in own:
    d=tbl.get(c,'')
    if c in mapped and not re.search(r'EAT-R\d+',d): fails.append(f'{c}: mapped but disposition lacks req id')
    if c not in mapped and ('DEFERRED' not in d and 'EAT-R' not in d): fails.append(f'{c}: unmapped and not explicitly deferred: {d[:60]}')
# 7 sibling overlap: no claim mapped here may also be the primary basis of a sibling req with the same cure class... report overlaps
sib={}
for name in ('map-r-lx.jsonl','map-r-ops.jsonl'):
    for l in (W/name).read_text().splitlines():
        if not l.strip(): continue
        r=json.loads(l)
        for c in r['claims']: sib.setdefault(c,[]).append(r['req'])
overlap={c:(sib[c],[m['req'] for m in maps if c in m['claims']]) for c in mapped if c in sib}
print('sibling-overlap claims:',json.dumps(overlap,indent=0))
# allowed overlaps: positives used as preserve-basis, and corroborating claims named in the de-dup note
allowed={'C194','C195','C196','C198','C243','C245','C246','C041','C042','C174','C175','C029','C030','C094','C093','C114','C112','C113','C153','C154'}
bad=[c for c in overlap if c not in allowed and C[c]['kind']=='defect']
# C156/C158 are sibling-owned; check we did not map them
for c in ('C156','C158','C229','C083'):
    if c in mapped and c in sib: bad.append(c)
if bad: fails.append(f'defect claims double-compiled with siblings: {sorted(set(bad))}')
# 8 verification values sane
for m in maps:
    if m['verification'] not in ('V0','V1','V2','V3','V4','V5','V6'): fails.append(f"{m['req']}: bad tier")
    if m['authority'] not in ('EMPIRICAL_REPAIR','NORMATIVE_DECISION','RISK_CONTROL','EVIDENCE_ACQUISITION','LINGUISTIC_INTEGRITY'): fails.append(f"{m['req']}: bad authority")
# 9 named oracle files exist (probe paths under probes/, repo paths under pin)
import os
PIN=T/'pin-ce180d82'; PR=T/'probes'
orc_missing=[]
for m in maps:
    for tok in re.findall(r'[\w./-]+\.(?:mjs|ts|sh|json|out|err|hxs|txt|jsonl|py)',m['oracle']):
        cand=[PR/tok, PIN/tok, W/'r-platform-evidence'/pathlib.Path(tok).name, T/tok]
        if tok.startswith('providers/') or tok.startswith('scheduling/') or tok.startswith('packaging/') or tok.startswith('interop/'):
            cand=[PR/tok]+cand
        if not any(p.exists() for p in cand): orc_missing.append((m['req'],tok))
if orc_missing: fails.append(f'oracle files not found: {orc_missing}')
# 10 counts
auth=Counter(m['authority'] for m in maps); typ=Counter(re.search(r'- Type: (\w+)',b).group(1) for b in blocks); tier=Counter(m['verification'] for m in maps)
print('authority:',dict(auth)); print('type:',dict(typ)); print('tier:',dict(tier))
print('claims mapped:',len(mapped),'own-family mapped:',len([c for c in mapped if c in own]),'own-family total:',len(own))
print()
if fails:
    print('AUDIT FAIL'); [print(' -',f) for f in fails]
else:
    print('AUDIT PASS: all checks green')
