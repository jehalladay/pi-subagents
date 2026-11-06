import json, sys, collections
out = sys.argv[1]
def load(name):
    rows, errs = [], []
    with open(f"{out}/{name}", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            line = line.strip()
            if not line: continue
            try: rows.append((i, json.loads(line)))
            except Exception as e: errs.append((i, str(e)[:120]))
    return rows, errs
for name in ("CLAIMS.jsonl","EVIDENCE.jsonl","RELATIONS.jsonl","LENSES.jsonl"):
    rows, errs = load(name)
    print(f"== {name}: {len(rows)} rows, {len(errs)} parse errors")
    for i,e in errs[:5]: print("   parse error line", i, e)
    ids = [r.get("id") for _, r in rows]
    dupes = [k for k,v in collections.Counter(ids).items() if v>1]
    print("   dup ids:", dupes[:10], "none" if not dupes else "")
    fields = collections.Counter()
    for _, r in rows: fields.update(r.keys())
    print("   fields:", dict(fields.most_common(40)))
    if name == "CLAIMS.jsonl":
        print("   status:", dict(collections.Counter(r.get("status") for _,r in rows)))
        print("   kind:", dict(collections.Counter(r.get("kind") for _,r in rows)))
        print("   material:", dict(collections.Counter(r.get("material") for _,r in rows)))
    if name == "EVIDENCE.jsonl":
        print("   pins:", dict(collections.Counter(r.get("pin") for _,r in rows)))
        print("   source_type:", dict(collections.Counter(r.get("source_type") for _,r in rows)))
    if name == "RELATIONS.jsonl":
        print("   types:", dict(collections.Counter(r.get("type") for _,r in rows)))
