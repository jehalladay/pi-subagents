import json, re, sys, collections
OUT = sys.argv[1]
claims = [json.loads(l) for l in open(f"{OUT}/CLAIMS.jsonl", encoding="utf-8") if l.strip()]
ev = {e["id"]: e for e in (json.loads(l) for l in open(f"{OUT}/EVIDENCE.jsonl", encoding="utf-8") if l.strip())}
cid = {c["id"]: c for c in claims}
print("== id shapes ==")
print("claims:", dict(collections.Counter(len(c["id"]) for c in claims)), "| evidence:", dict(collections.Counter(len(e) for e in ev)))
print("5+ digit claim ids sample:", [c["id"] for c in claims if len(c["id"])>5][:8])
print()
for eidx in ("E0354","E0628","E0760","E0761","E0729","E0747","E0781","E0010","E0014"):
    e = ev[eidx]
    print(f"== {eidx} ==")
    print(json.dumps({k: e[k] for k in ("pin","artifact","location","source_type")}, ensure_ascii=False))
    print("quote:", repr(e["quote"])[:400])
    print("claims:", [(c["claim"], c["relation"]) for c in e["claims"]][:8])
    print()
for cidx in ("C03141","C03106","C0522"):
    c = cid.get(cidx)
    if not c: print(cidx, "NOT IN LEDGER"); continue
    print(f"== {cidx} == status={c['status']} overclaims={c['overclaims']} material={c['material']}")
    print("prop:", c["proposition"][:180])
    print("prov:", c["provenance"])
    print("missing_to_settle:", repr(c.get("missing_to_settle"))[:140])
print()
print("== C0286x family ==")
for c in claims:
    if c["id"].startswith("C0286"): print(c["id"], c["status"], c["proposition"][:90])
