#!/usr/bin/env python3
"""Static replay of findingsOf's STANDS and ABSENT pins of test/workbench-mwi-docs-remediation-census.test.ts for ALL 50 rows on the six
pages, with rows parsed from the test file at TEST_REV (no retyping), at each page revision. HIDDEN-form findings (marked lexer)
are NOT replayed, so this replay can only under-report findings. Same-edit rows use their host row's Repair. Read-only (git show)."""
import subprocess, sys, json, re
REPO, TEST_REV = sys.argv[1], sys.argv[2]
PROGRAM = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04"
PAGES = {"README": f"{PROGRAM}/README.md", "01": f"{PROGRAM}/01-audit-and-evidence.md", "02": f"{PROGRAM}/02-host-architecture-and-protocol.md",
         "03": f"{PROGRAM}/03-implementation-and-qa.md", "04": f"{PROGRAM}/04-agent-handoff.md", "SKILL": ".agents/skills/pi-mechanical-interop/SKILL.md"}
TEST = "test/workbench-mwi-docs-remediation-census.test.ts"
def show(rev, path):
    r = subprocess.run(["git", "-C", REPO, "show", f"{rev}:{path}"], capture_output=True)
    return r.stdout.decode("utf-8") if r.returncode == 0 else None
src = show(TEST_REV, TEST)
lit = r'(?:"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\]|\\.)*\')'
row_re = re.compile(r'\{\s*requirement:\s*"(?P<req>[^"]+)",\s*id:\s*"(?P<id>M\d+)",\s*claim:\s*"(?P<claim>[^"]+)",\s*status:\s*"(?P<status>[^"]*)",\s*transform:\s*"(?P<transform>[^"]*)",\s*where:\s*"(?P<where>[^"]+)",\s*kind:\s*"(?P<kind>[^"]+)",\s*pins:\s*\[(?P<pins>[^\]]*)\],\s*existing:\s*(?P<existing>' + lit + r'),\s*repair:\s*(?P<repair>' + lit + r'),?\s*\}', re.S)
def unq(l):
    if l[0] == '"': return json.loads(l)
    return re.sub(r'\\(.)', lambda m: {'n': '\n', 't': '\t'}.get(m.group(1), m.group(1)), l[1:-1])
rows = [{k: (unq(m.group(k)) if k in ('existing', 'repair') else m.group(k)) for k in ('req', 'id', 'claim', 'where', 'kind', 'pins', 'existing', 'repair')} for m in row_re.finditer(src)]
by_claim = {r['claim']: r for r in rows}
def host_of(r):
    m = re.search(r'same edit as (C\d+)', r['repair']); return by_claim[m.group(1)]
def standing_of(r):
    if r['kind'] == 'ledger-only': return r['existing']
    return host_of(r)['repair'] if r['kind'] == 'same-edit' else r['repair']
def occ(text, needle):
    at = []; i = text.find(needle)
    while i != -1: at.append(i); i = text.find(needle, i + 1)
    return at
line_at = lambda text, i: len(text[:i].split("\n"))
out = {"rows_parsed": len(rows), "kinds": {k: sum(1 for r in rows if r['kind'] == k) for k in ('edit', 'same-edit', 'ledger-only')}, "revisions": {}}
for rev in sys.argv[3:]:
    res = {"pages_present": {}, "red_rows": [], "clean_rows": 0}
    texts = {k: show(rev, p) for k, p in PAGES.items()}
    res["pages_present"] = {k: (None if t is None else len(t.split("\n"))) for k, t in texts.items()}
    for r in rows:
        m = re.match(r'(README|SKILL|0[1-4]):L(\d+)(?:-(\d+))?$', r['where']); page = m.group(1); first = int(m.group(2)); last = int(m.group(3) or first)
        text = texts[page]
        if text is None:
            res["red_rows"].append({"id": r['id'], "req": r['req'], "where": r['where'], "findings": ["page absent at this revision"]}); continue
        standing = standing_of(r); at = occ(text, standing); f = []
        if 'stands' in r['pins']:
            if len(at) != 1: f.append(f"{r['id']} stands {len(at)} times")
            else:
                ln = line_at(text, at[0])
                if ln < first or ln > last: f.append(f"{r['id']} stands at {page}:L{ln}")
        if 'absent' in r['pins']:
            spans = [(s, s + len(standing)) for s in at]
            for s in occ(text, r['existing']):
                if not any(s >= a and s + len(r['existing']) <= b for a, b in spans):
                    f.append(f"{r['id']} overstrong wording stands at {page}:L{line_at(text, s)}"); break
        if f: res["red_rows"].append({"id": r['id'], "req": r['req'], "where": r['where'], "findings": f})
        else: res["clean_rows"] += 1
    out["revisions"][rev] = res
print(json.dumps(out, indent=1))
