import json, sys
out = sys.argv[1]
ev = [json.loads(l) for l in open(f"{out}/EVIDENCE.jsonl", encoding="utf-8") if l.strip()]
seen = {}
for r in ev:
    st = r["source_type"]
    if seen.get(st, 0) < 2:
        seen[st] = seen.get(st, 0) + 1
        print(st, "|", r["id"], "|", r["pin"], "|", repr(r["artifact"])[:110], "|", repr(r["location"])[:40])
print("--- location formats ---")
import collections, re
fmt = collections.Counter()
for r in ev:
    loc = str(r["location"])
    fmt[re.sub(r"\d+", "N", loc)[:30]] += 1
print(dict(fmt.most_common(25)))
print("--- artifacts containing spaces (non-path) ---")
n=0
for r in ev:
    if " " in r["artifact"]:
        n+=1
        if n<=8: print(r["id"], r["source_type"], repr(r["artifact"])[:130])
print("count:", n)
