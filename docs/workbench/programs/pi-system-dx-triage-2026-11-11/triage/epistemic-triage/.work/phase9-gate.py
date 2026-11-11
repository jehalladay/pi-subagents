import json, os, re, sys, collections
T=os.environ["T"]; ET=os.path.join(T,"epistemic-triage")
fails=[]; counts=collections.Counter()
# (g) deliverables
for f in ("CLAIMS.jsonl","CONTRADICTIONS.md","REMEDIATION.md","EPISTEMIC-AUDIT.md","MANIFEST.md","dossiers"):
    if not os.path.exists(os.path.join(ET,f)): fails.append(f"absent-deliverable:{f}"); counts["absent"]+=1
rows=[]
try:
    for i,l in enumerate(open(os.path.join(ET,"CLAIMS.jsonl"))):
        l=l.strip()
        if not l: continue
        try: rows.append(json.loads(l))
        except Exception as e: fails.append(f"unreadable-row:{i+1}"); counts["unreadable"]+=1
except Exception as e: fails.append(f"unreadable-file:CLAIMS.jsonl"); counts["unreadable"]+=1
ids=[r.get("id") for r in rows]
dup=[k for k,v in collections.Counter(ids).items() if v>1]
if dup: fails.append(f"dup-ids:{dup[:5]}"); counts["dup-id"]+=len(dup)
VOCAB={"ESTABLISHED","SUPPORTED","PLAUSIBLE","UNSUPPORTED","CONTESTED","REFUTED","UNDETERMINED","NON-EPISTEMIC"}
roots=[T, os.path.join(T,"pin-ce180d82"), os.path.join(T,"probes")]
pat=re.compile(r'(?:^|[\s(`])((?:pin-ce180d82/|probes/|src/|test/|qa/|docs/|\.work/)[\w\-./]+?\.(?:json|jsonl|tsx|ts|mjs|js|md|txt|log|toml|yaml))(?![\w])(?::\d+)?')
anchored_missing=0; graded=0
for r in rows:
    rid=r.get("id","?")
    st=r.get("status") or r.get("grade")
    if st not in VOCAB: fails.append(f"bad-status:{rid}:{st}"); counts["bad-status"]+=1; continue
    graded+=1
    if not (r.get("claim") or r.get("proposition")): fails.append(f"no-claim:{rid}"); counts["no-claim"]+=1
    ev=r.get("evidence")
    if st in ("ESTABLISHED","REFUTED") :
        if not ev: fails.append(f"no-evidence:{rid}"); counts["no-evidence"]+=1; continue
        evs=ev if isinstance(ev,list) else [ev]
        found_any=False; checked=0
        for e in evs:
            s=e if isinstance(e,str) else json.dumps(e)
            for m in pat.finditer(s):
                checked+=1
                p=m.group(1)
                if any(os.path.exists(os.path.join(rt,p)) or os.path.exists(os.path.join(rt,p.replace("pin-ce180d82/",""))) for rt in roots) or os.path.exists(os.path.join(T,p)):
                    found_any=True
        if checked and not found_any:
            anchored_missing+=1; counts["anchor-missing"]+=1
            if anchored_missing<=5: fails.append(f"anchor-missing:{rid}")
# duplicate wording across different ids
seen={}
for r in rows:
    w=(r.get("claim") or "").strip().lower()
    if not w: continue
    if w in seen and seen[w]!=r.get("id"): fails.append(f"dup-wording:{seen[w]}~{r.get('id')}"); counts["dup-wording"]+=1
    else: seen[w]=r.get("id")
# remediation coverage of REFUTED/UNSUPPORTED/CONTESTED
bad={r["id"] for r in rows if (r.get("status") or r.get("grade")) in ("REFUTED","UNSUPPORTED","CONTESTED")}
if bad:
    rem=open(os.path.join(ET,"REMEDIATION.md")).read()
    for b in bad:
        if b not in rem: fails.append(f"remediation-missing:{b}"); counts["rem-missing"]+=1
# arbitration conditional
arb=any("arbitration-" in str(r.get("verdict_history","")) for r in rows)
arbfile=any(f.startswith("ARBITRATION-") for f in os.listdir(ET))
if arb and not arbfile: fails.append("absent-deliverable:ARBITRATION-<date>.md"); counts["absent"]+=1
print(f"rows={len(rows)} graded={graded} status-census={dict(collections.Counter((r.get('status') or r.get('grade')) for r in rows))}")
print(f"counts={dict(counts)}")
if fails:
    print("FAILS:"); [print(" ", f) for f in fails[:20]]
    sys.exit(1)
print("GATE PASS"); sys.exit(0)
