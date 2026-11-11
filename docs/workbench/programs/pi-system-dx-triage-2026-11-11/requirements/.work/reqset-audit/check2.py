import json, re, collections
W = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111"
P = json.load(open(f"{W}/requirements/.work/reqset-audit/parsed.json"))
reqs, maps = P["reqs"], P["maps"]
ledger = {}
for line in open(f"{W}/epistemic-triage/CLAIMS.jsonl"):
    line=line.strip()
    if line:
        d=json.loads(line); ledger[d["id"]]=d

# claims compiled (rationale or map.claims)
compiled = collections.defaultdict(set)
for rid,r in reqs.items():
    for c in set(r["rationale_claims"]) | set(maps[rid]["claims"]):
        compiled[c].add(rid)
# claims mentioned anywhere in a requirement block (conditions, etc.)
mentioned = collections.defaultdict(set)
for rid,r in reqs.items():
    for c in r["all_claims"]: mentioned[c].add(rid)

# explicit deferral tables
texts = {fn: open(f"{W}/requirements/.work/{fn}").read() for fn in ["req-r-lx.md","req-r-ops.md","req-r-platform.md"]}
deferred = collections.defaultdict(set)
# r-ops residual table: rows "| Cnnn | GRADE | family | ..."
for m in re.finditer(r"^\| (C\d{3}) \| (\w+) \| (\w[\w-]*) \| (.*) \|$", texts["req-r-ops.md"], re.M):
    deferred[m.group(1)].add(("r-ops:DEFERRED_FOR_RANGE_CAPACITY", m.group(2)))
# r-platform disposition table
for m in re.finditer(r"^\| (C\d{3}) \| (\w+) \| (\w+) \| ([^|]*) \| ([^|]*) \|$", texts["req-r-platform.md"], re.M):
    disp=m.group(4).strip()
    if "DEFERRED" in disp: deferred[m.group(1)].add(("r-platform:DEFERRED_FOR_RANGE_CAPACITY", m.group(2)))
    else: deferred[m.group(1)].add(("r-platform:disposition->"+disp, m.group(2)))
# r-platform cross-family prose + r-lx coverage note
xf = texts["req-r-platform.md"].split("## Cross-family scope not silently implemented")[1].split("## Positive regression queue")[0]
for c in set(re.findall(r"C\d{3}", xf)): deferred[c].add(("r-platform:cross-family-prose", ledger[c]["grade"]))
cov = texts["req-r-lx.md"].split("Coverage note:")[1]
for c in set(re.findall(r"C\d{3}", cov)): deferred[c].add(("r-lx:coverage-note(left to sibling clusters / residue)", ledger[c]["grade"]))

defects=[c for c,d in ledger.items() if d["kind"]=="defect"]
positives=[c for c,d in ledger.items() if d["kind"]=="positive"]
print("defects:", len(defects), "positives:", len(positives))
rows=[]
uncovered=[]; only_mentioned=[]; only_deferred_prose=[]; only_lx_note=[]
for c in sorted(defects):
    d=ledger[c]
    st = "COMPILED" if c in compiled else ("DEFERRED" if c in deferred else ("MENTIONED-ONLY" if c in mentioned else "UNCOVERED"))
    rows.append((c,d["grade"],d["family"],d["axis"],st, sorted(compiled.get(c,[])), sorted({x[0] for x in deferred.get(c,[])}), sorted(mentioned.get(c,[]))))
    if st=="UNCOVERED": uncovered.append(c)
    if st=="MENTIONED-ONLY": only_mentioned.append(c)
    if st=="DEFERRED":
        kinds={x[0] for x in deferred[c]}
        if all(k.startswith("r-lx:coverage-note") for k in kinds): only_lx_note.append(c)
        elif all(k.startswith("r-platform:cross-family") or k.startswith("r-lx:coverage") for k in kinds): only_deferred_prose.append(c)
print("\nDEFECT COVERAGE:", collections.Counter(r[4] for r in rows))
print("by grade x state:", collections.Counter((r[1],r[4]) for r in rows))
print("\nUNCOVERED defects (no requirement, no deferral, no mention):")
for c in uncovered: print("  ",c,ledger[c]["grade"],ledger[c]["family"],ledger[c]["axis"],"|",ledger[c]["claim"][:150])
print("\nMENTIONED-ONLY (named in a block but not compiled/deferred):")
for c in only_mentioned: print("  ",c,ledger[c]["grade"],ledger[c]["family"],ledger[c]["axis"],"->",sorted(mentioned[c]),"|",ledger[c]["claim"][:120])
print("\nDEFERRED only via the r-lx coverage note ('left to sibling clusters') — check a sibling actually took it:")
for c in only_lx_note: print("  ",c,ledger[c]["grade"],ledger[c]["family"],ledger[c]["axis"],"|",ledger[c]["claim"][:120])
print("\nDEFERRED only via prose (no table row):")
for c in only_deferred_prose: print("  ",c,ledger[c]["grade"],ledger[c]["family"],ledger[c]["axis"])
# family totals
print("\nper-family defect coverage:")
fam=collections.defaultdict(collections.Counter)
for r in rows: fam[r[2]][r[4]]+=1
for f in sorted(fam): print("  ",f,dict(fam[f]))
# stubs
print("\nSTUB axis claims:")
for c in sorted(c for c in ledger if ledger[c]["axis"]=="stub"):
    r=[x for x in rows if x[0]==c]
    print("  ",c,ledger[c]["grade"],ledger[c]["family"],r[0][4] if r else "positive", r[0][5] if r else "", r[0][6] if r else "", "|", ledger[c]["claim"][:110])
# positives coverage
print("\nPOSITIVES: compiled", sum(1 for c in positives if c in compiled), "mentioned", sum(1 for c in positives if c in mentioned and c not in compiled), "neither", [c for c in positives if c not in mentioned])
json.dump({"rows":rows,"uncovered":uncovered,"mentioned_only":only_mentioned,"lx_note_only":only_lx_note}, open(f"{W}/requirements/.work/reqset-audit/coverage.json","w"), indent=1)
