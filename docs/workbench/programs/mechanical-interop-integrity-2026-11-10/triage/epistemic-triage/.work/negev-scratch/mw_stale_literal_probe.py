#!/usr/bin/env python3
"""Static replay of MechanicalWorkflows scripts/check-docs-stale-claims.ts's closed literal denylist (as spelled at 69cb016d)
over (a) the companion program docs as deposited at MW 6476372f and the skill that deposit modified, read with git show, and
(b) the Pi MII docs (which MW's checker does not scan; shown for the wording family only). Read-only."""
import re, subprocess, sys, json
MW = sys.argv[1]; REV = sys.argv[2]
LITERALS = ["does not currently match","historical metadata","historical descriptor metadata","measured ingredients","already measured","concrete, measured",
 "actual Pi `workflow_execute` function branch","actual Pi workflow_execute function branch","companion lives at","no live execution witnessed","host not run","Not wired |"]
pats = [(l, re.compile(r"\s+".join(re.escape(w) for w in l.split(" ")), re.I)) for l in LITERALS]
def show(rev, path):
    return subprocess.run(["git","-C",MW,"show",f"{rev}:{path}"],capture_output=True,check=True).stdout.decode("utf-8")
names = subprocess.run(["git","-C",MW,"diff","--name-only","1be2b8dc",REV],capture_output=True,check=True).stdout.decode().split()
out = {"rev": REV, "deposit_files": names, "hits": []}
for path in names:
    if not path.endswith(".md"): continue
    text = show(REV, path)
    for lit, rx in pats:
        for m in rx.finditer(text):
            out["hits"].append({"path": path, "line": text[:m.start()].count("\n")+1, "literal": lit, "context": text[max(0,m.start()-70):m.end()+70].replace("\n"," ")})
base = json.loads(show(REV, "scripts/check-docs-stale-claims.baseline.json"))
out["baseline_entries_at_rev"] = len(base)
out["baseline_entries_naming_deposit_paths"] = [e for e in base if any(e.startswith(p+"|") for p in names)]
print(json.dumps(out, indent=1))
