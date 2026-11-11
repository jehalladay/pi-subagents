import json, re, collections
W = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111"
P = json.load(open(f"{W}/requirements/.work/reqset-audit/parsed.json"))
reqs, maps = P["reqs"], P["maps"]
ledger = {}
for line in open(f"{W}/epistemic-triage/CLAIMS.jsonl"):
    line=line.strip()
    if line:
        d=json.loads(line); ledger[d["id"]]=d

# ---- CHECK A: ids unique + contiguous R311..R390
ids = list(reqs.keys())
nums = sorted(int(i[5:]) for i in ids)
print("A. ids:", len(ids), "unique:", len(set(ids)), "min", min(nums), "max", max(nums))
missing = sorted(set(range(311, 391)) - set(nums)); extra = sorted(set(nums) - set(range(311,391)))
print("   missing in 311..390:", missing, "outside range:", extra)
print("   map ids == req ids:", set(maps) == set(reqs))
# ordering within files
for fn in ["req-r-lx.md","req-r-ops.md","req-r-platform.md"]:
    seq=[int(k[5:]) for k,v in reqs.items() if v["file"]==fn]
    print("   ", fn, seq[0], "..", seq[-1], "n=", len(seq), "monotone:", seq==sorted(seq), "contiguous:", seq==list(range(seq[0], seq[-1]+1)))

# ---- CHECK B: field completeness
print("\nB. field completeness")
need = ["Type","Authority","Statement","Rationale","Evidence tier target","Maps-to"]
types=collections.Counter(); auths=collections.Counter(); tiers=collections.Counter()
for rid,r in reqs.items():
    f=r["fields"]
    miss=[k for k in need if k not in f or not f[k]]
    if miss: print("   ", rid, "MISSING", miss)
    if not r["criteria"]: print("   ", rid, "NO acceptance criteria parsed")
    if "Conditions" not in f: print("   ", rid, "no Conditions field")
    if r["file"]!="req-r-lx.md" and "Probe oracle" not in f: print("   ", rid, "no Probe oracle field")
    types[f.get("Type")]+=1; auths[f.get("Authority")]+=1
    tiers[re.sub(r"\s*\(.*","",f.get("Evidence tier target",""))[:40]]+=1
print("   types:", dict(types)); print("   authorities:", dict(auths)); print("   tiers:", dict(tiers))
print("   criteria count distribution:", collections.Counter(len(r["criteria"]) for r in reqs.values()))

# ---- CHECK C: laundering — rationale/map grade vs ledger grade
print("\nC. laundering check")
rank={"ESTABLISHED":4,"SUPPORTED":3,"PLAUSIBLE":2,"UNDETERMINED":1,"UNSUPPORTED":0,"CONTESTED":0,"REFUTED":0}
issues=[]
for rid,r in reqs.items():
    rat=r["fields"].get("Rationale","")
    # explicit "Cnnn GRADE" or "Cnnn is GRADE"/"Cnnn SUPPORTED code-read"
    for m in re.finditer(r"\b(C\d{3})\s+(?:is\s+|remains\s+)?(ESTABLISHED|SUPPORTED|PLAUSIBLE|UNDETERMINED)\b", rat):
        cid,g=m.group(1),m.group(2)
        lg=ledger.get(cid,{}).get("grade")
        if lg is None: issues.append((rid,cid,"CLAIM NOT IN LEDGER")); continue
        if rank[g]>rank[lg]: issues.append((rid,cid,f"rationale says {g} but ledger {lg} (LAUNDER)"))
        elif rank[g]<rank[lg]: issues.append((rid,cid,f"rationale says {g} but ledger {lg} (understated — allowed, note)"))
    # grouped form "C049/C069/C169/C185/C209 are SUPPORTED"
    for m in re.finditer(r"((?:C\d{3}(?:/|,\s*|\s+and\s+|\s+plus\s+))+C\d{3})\s+(?:are|remain)\s+(ESTABLISHED|SUPPORTED|PLAUSIBLE)", rat):
        for cid in re.findall(r"C\d{3}", m.group(1)):
            lg=ledger[cid]["grade"]; g=m.group(2)
            if rank[g]>rank[lg]: issues.append((rid,cid,f"grouped rationale says {g} but ledger {lg} (LAUNDER)"))
    # verbs implying reproduction on non-ESTABLISHED claims
    for m in re.finditer(r"\b(C\d{3})\s+(reproduced|established|drove|measured)\b", rat):
        cid=m.group(1); lg=ledger.get(cid,{}).get("grade")
        if lg and lg!="ESTABLISHED": issues.append((rid,cid,f"verb '{m.group(2)}' on {lg} claim (LAUNDER?)"))
    # claims cited in rationale with no grade stated anywhere in the block
    body=r["text"]
    for cid in r["rationale_claims"]:
        if cid not in ledger: issues.append((rid,cid,"CLAIM NOT IN LEDGER")); continue
        if not re.search(cid+r"\b[^.;]*?\b(ESTABLISHED|SUPPORTED|PLAUSIBLE)\b", body) and not re.search(r"\b(ESTABLISHED|SUPPORTED|PLAUSIBLE)\b[^.;]*?"+cid, body):
            issues.append((rid,cid,f"grade not stated in block (ledger {ledger[cid]['grade']})"))
    # map epistemic_basis vs ledger
    mp=maps[rid]
    for b in mp.get("epistemic_basis",[]):
        lg=ledger.get(b["id"],{}).get("grade")
        if lg!=b["status"]: issues.append((rid,b["id"],f"map epistemic_basis {b['status']} vs ledger {lg}"))
    # map claims vs rationale claims
    mc=set(mp["claims"]); rc=set(r["rationale_claims"])
    if mc!=rc:
        issues.append((rid,"-",f"map.claims {sorted(mc-rc)} not in rationale; rationale {sorted(rc-mc)} not in map"))
for x in issues: print("   ", x)
print("   issues:", len(issues))
json.dump(issues, open(f"{W}/requirements/.work/reqset-audit/launder-issues.json","w"), indent=1)
