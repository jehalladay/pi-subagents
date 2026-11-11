#!/usr/bin/env python3
"""Static replay of findingsOf's STANDS and ABSENT pins (test/workbench-mwi-docs-remediation-census.test.ts) for every SKILL row,
with the row texts PARSED from the test file at the given test revision (no retyping), against the skill page at each page revision.
Read-only (git show)."""
import subprocess, sys, json, re
REPO, TEST_REV = sys.argv[1], sys.argv[2]
SKILL = ".agents/skills/pi-mechanical-interop/SKILL.md"
TEST = "test/workbench-mwi-docs-remediation-census.test.ts"
def show(rev, path):
    return subprocess.run(["git", "-C", REPO, "show", f"{rev}:{path}"], capture_output=True, check=True).stdout.decode("utf-8")
src = show(TEST_REV, TEST)
# Row objects: { requirement: "...", id: "M048", claim: "...", status: "...", transform: "...", where: "SKILL:L14", kind: "edit", pins: [...], existing: "...", repair: "...", }
row_re = re.compile(r'\{\s*requirement:\s*"(?P<req>[^"]+)",\s*id:\s*"(?P<id>M\d+)",\s*claim:\s*"(?P<claim>[^"]+)",\s*status:\s*"(?P<status>[^"]*)",\s*transform:\s*"(?P<transform>[^"]*)",\s*where:\s*"(?P<where>[^"]+)",\s*kind:\s*"(?P<kind>[^"]+)",\s*pins:\s*\[(?P<pins>[^\]]*)\],\s*existing:\s*(?P<existing>"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\]|\\.)*\'),\s*repair:\s*(?P<repair>"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\]|\\.)*\'),?\s*\}', re.S)
def unq(lit):
    q = lit[0]; body = lit[1:-1]
    if q == '"':
        return json.loads(lit)
    # single-quoted or template literal without substitutions: unescape \\ \' \` \n minimal
    return re.sub(r'\\(.)', lambda m: {'n': '\n', 't': '\t'}.get(m.group(1), m.group(1)), body)
rows = []
for m in row_re.finditer(src):
    rows.append({k: (unq(m.group(k)) if k in ('existing', 'repair') else m.group(k)) for k in ('req', 'id', 'claim', 'where', 'kind', 'pins', 'existing', 'repair')})
print("rows parsed from test file:", len(rows), "| SKILL rows:", [r['id'] for r in rows if r['where'].startswith('SKILL')], file=sys.stderr)
def occurrences(text, needle):
    at = []; i = text.find(needle)
    while i != -1:
        at.append(i); i = text.find(needle, i + 1)
    return at
def line_at(text, index):
    return len(text[:index].split("\n"))
out = {}
for rev in sys.argv[3:]:
    try:
        text = show(rev, SKILL)
    except subprocess.CalledProcessError:
        out[rev] = "skill absent"; continue
    res = {"split_lines": len(text.split("\n")), "rows": []}
    for r in rows:
        if not r['where'].startswith('SKILL'): continue
        m = re.match(r'SKILL:L(\d+)(?:-(\d+))?$', r['where']); first = int(m.group(1)); last = int(m.group(2) or first)
        standing = r['repair'] if r['kind'] != 'ledger-only' else r['existing']
        at = occurrences(text, standing); findings = []
        if 'stands' in r['pins']:
            if len(at) != 1: findings.append(f"{r['id']} stands {len(at)} times")
            else:
                line = line_at(text, at[0])
                if line < first or line > last: findings.append(f"{r['id']} stands at SKILL:L{line}")
        if 'absent' in r['pins']:
            spans = [(s, s + len(standing)) for s in at]
            for s in occurrences(text, r['existing']):
                if not any(s >= a and s + len(r['existing']) <= b for a, b in spans):
                    findings.append(f"{r['id']} overstrong wording stands at SKILL:L{line_at(text, s)}"); break
        res["rows"].append({"id": r['id'], "req": r['req'], "where": r['where'], "findings": findings})
    out[rev] = res
print(json.dumps(out, indent=1))
