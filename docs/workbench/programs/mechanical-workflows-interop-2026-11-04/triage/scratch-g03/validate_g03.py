import pathlib,json,re,subprocess,collections
S=pathlib.Path(__file__).parent;D=S.parent/'epistemic-triage';P=S.parent.parent/'pins'
claims=[json.loads(l) for l in (D/'claims-part-03.jsonl').read_text().splitlines() if l.strip()]
rows=[json.loads(l) for l in (D/'status-part-g03.jsonl').read_text().splitlines()]
rels=[json.loads(l) for l in (D/'relations-part-g03.jsonl').read_text().splitlines()]
ks=[json.loads(l) for l in (D/'contradictions-part-g03.jsonl').read_text().splitlines()]
errors=[];checked=set()
def check(e):
 sig=json.dumps(e,sort_keys=True)
 if sig in checked:return
 checked.add(sig)
 if len(e['quote'])>240:errors.append(('long quote',e))
 root=P/('mw-main' if e['pin'].startswith('mw') else 'pi-b27829e6')
 if e['path'].startswith('git '):return
 if e['lines']=='-':errors.append(('not file+range citation',e));return
 path=e['path'];txt=None
 if path.startswith('0c78e253:'):
  txt=subprocess.check_output(['git','-C',str(root),'show',path],text=True)
 elif (root/path).is_file():txt=(root/path).read_text()
 else:errors.append(('missing citation file',e));return
 a=int(e['lines'].split('-')[0]);b=int(e['lines'].split('-')[-1]);excerpt='\n'.join(txt.splitlines()[a-1:b])
 if e['quote'] not in excerpt:errors.append(('nonverbatim quote or wrong range',e))
for r in rows:
 assert len(r['rationale'])<=400
 assert r['missing_artifact'] or r['status']!='UNDETERMINED'
 for e in r['evidence']:check(e)
for r in rels:
 for e in r['evidence']:check(e)
for k in ks:
 for e in k['evidence']:check(e)
material={c['id'] for c in claims if c['material']}
assert {r['id'] for r in rows}=={c['id'] for c in claims}
assert len(rows)==len({r['id'] for r in rows})
for cid in material:
 f=D/'dossiers'/f'{cid}.json';assert f.is_file();r=json.loads(f.read_text());assert r['id']==cid
 check(r['verbatim_artifact_wording']['anchor'])
 for s in r['support']:check(s['evidence'])
print(json.dumps({'rows':len(rows),'dossiers':len(material),'relations':len(rels),'contradiction_sets':len(ks),'checked_distinct_evidence':len(checked),'counts':dict(collections.Counter(r['status'] for r in rows)),'errors':errors},ensure_ascii=False,indent=2))
(S/'validation.json').write_text(json.dumps({'errors':errors,'checked_evidence':len(checked)},ensure_ascii=False,indent=2)+'\n')
raise SystemExit(bool(errors))
