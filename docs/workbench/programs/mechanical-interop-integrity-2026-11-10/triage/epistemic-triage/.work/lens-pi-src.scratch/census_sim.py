"""Static simulation of findingsOf (stands/absent pins only; the HIDDEN-form lexer check is NOT simulated)
of test/workbench-mwi-docs-remediation-census.test.ts against page blobs at a given revision.
Usage: python3 -I census_sim.py <repo-worktree> <test-rev> <page-rev>
Reads blobs with `git show` only (read-only)."""
import json, re, subprocess, sys

repo, test_rev, page_rev = sys.argv[1], sys.argv[2], sys.argv[3]

def show(rev, path):
    return subprocess.run(["git", "-C", repo, "show", f"{rev}:{path}"], capture_output=True, check=True).stdout.decode("utf-8")

src = show(test_rev, "test/workbench-mwi-docs-remediation-census.test.ts")
PROGRAM = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04"
PAGES = {"README": f"{PROGRAM}/README.md", "01": f"{PROGRAM}/01-audit-and-evidence.md", "02": f"{PROGRAM}/02-host-architecture-and-protocol.md",
         "03": f"{PROGRAM}/03-implementation-and-qa.md", "04": f"{PROGRAM}/04-agent-handoff.md", "SKILL": ".agents/skills/pi-mechanical-interop/SKILL.md"}
STR = r'"((?:[^"\\]|\\.)*)"'
row_re = re.compile(
    r'requirement:\s*' + STR + r',\s*id:\s*' + STR + r',\s*claim:\s*' + STR + r',\s*status:\s*' + STR + r',\s*transform:\s*' + STR +
    r',\s*where:\s*' + STR + r',\s*kind:\s*' + STR + r',\s*pins:\s*\[([^\]]*)\],\s*existing:\s*' + STR + r',\s*repair:\s*' + STR, re.S)
def js(s):
    return json.loads('"' + s + '"')
rows = []
for m in row_re.finditer(src):
    g = m.groups()
    rows.append(dict(requirement=js(g[0]), id=js(g[1]), claim=js(g[2]), where=js(g[5]), kind=js(g[6]),
                     pins=[p.strip().strip('"') for p in g[7].split(",") if p.strip()], existing=js(g[8]), repair=js(g[9])))
by_claim = {r["claim"]: r for r in rows}
def host_of(r):
    c = re.search(r"same edit as (C\d+)", r["repair"]).group(1)
    return by_claim[c]
def standing_of(r):
    if r["kind"] == "ledger-only": return r["existing"]
    return host_of(r)["repair"] if r["kind"] == "same-edit" else r["repair"]
def occurrences(text, needle):
    out, i = [], text.find(needle)
    while i != -1:
        out.append(i); i = text.find(needle, i + 1)
    return out
def line_at(text, idx): return len(text[:idx].split("\n"))
pages = {k: show(page_rev, p) for k, p in PAGES.items()}
print(f"rows parsed: {len(rows)} (test@{test_rev}); pages@{page_rev}; line counts: " + ", ".join(f"{k} {len(v.split(chr(10)))-1}" for k, v in pages.items()))
total = 0
for r in rows:
    m = re.match(r"^(README|SKILL|0[1-4]):L(\d+)(?:-(\d+))?$", r["where"])
    page, first, last = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
    text = pages[page]; standing = standing_of(r); f = []
    if "stands" in r["pins"]:
        at = occurrences(text, standing)
        if len(at) != 1: f.append(f'{r["id"]} stands {len(at)} times')
        else:
            ln = line_at(text, at[0])
            if ln < first or ln > last: f.append(f'{r["id"]} stands at {page}:L{ln}')
    if "absent" in r["pins"]:
        spans = [(s, s + len(standing)) for s in occurrences(text, standing)]
        outside = next((s for s in occurrences(text, r["existing"]) if not any(s >= a and s + len(r["existing"]) <= b for a, b in spans)), None)
        if outside is not None: f.append(f'{r["id"]} overstrong wording stands at {page}:L{line_at(text, outside)}')
    if f:
        total += 1
        print("  FINDING", r["requirement"], r["where"], "->", "; ".join(f))
print(f"rows with stands/absent findings: {total} of {len(rows)}")
