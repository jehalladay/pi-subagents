import json, re, sys, collections
W = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111"
REQ_FILES = ["req-r-lx.md", "req-r-ops.md", "req-r-platform.md"]
MAP_FILES = ["map-r-lx.jsonl", "map-r-ops.jsonl", "map-r-platform.jsonl"]

ledger = {}
for line in open(f"{W}/epistemic-triage/CLAIMS.jsonl"):
    line = line.strip()
    if line:
        d = json.loads(line); ledger[d["id"]] = d

reqs = collections.OrderedDict()
hdr = re.compile(r"^## (EAT-R\d{3}) — (.*)$")
for fn in REQ_FILES:
    text = open(f"{W}/requirements/.work/{fn}").read()
    lines = text.split("\n")
    cur = None
    for i, ln in enumerate(lines):
        m = hdr.match(ln)
        if m:
            cur = m.group(1)
            reqs[cur] = {"id": cur, "title": m.group(2), "file": fn, "line": i+1, "body": []}
            continue
        if ln.startswith("## ") or ln.startswith("---"):
            cur = None
        if cur:
            reqs[cur]["body"].append(ln)

field_re = re.compile(r"^- (Type|Authority|Statement|Rationale|Probe oracle|Evidence tier target|Conditions(?: ?/ ?unknowns)?|Maps-to): ?(.*)$")
for rid, r in reqs.items():
    body = "\n".join(r["body"])
    r["text"] = body
    fields = {}
    crit = []
    in_crit = False
    for ln in r["body"]:
        m = field_re.match(ln)
        if m:
            key = m.group(1)
            if key.startswith("Conditions"): key = "Conditions"
            fields[key] = m.group(2).strip()
            in_crit = False
            continue
        if ln.startswith("- Acceptance criteria"):
            in_crit = True; continue
        if in_crit and re.match(r"^\s+\d+\. ", ln):
            crit.append(ln.strip())
    r["fields"] = fields
    r["criteria"] = crit
    rat = fields.get("Rationale", "")
    r["rationale_claims"] = sorted(set(re.findall(r"\bC\d{3}\b", rat)))
    r["all_claims"] = sorted(set(re.findall(r"\bC\d{3}\b", body)))
    r["beads"] = sorted(set(re.findall(r"\bwb-[0-9a-z]+(?:\.\d+)?\b", body)))
    r["prior_eat"] = sorted(set(re.findall(r"\bEAT-R\d{1,3}\b", body)) - {rid})

maps = {}
for fn in MAP_FILES:
    for line in open(f"{W}/requirements/.work/{fn}"):
        line = line.strip()
        if line:
            d = json.loads(line); d["_file"] = fn; maps[d["req"]] = d

json.dump({"reqs": {k: {kk: vv for kk, vv in v.items() if kk != "body"} for k, v in reqs.items()}, "maps": maps}, open(f"{W}/requirements/.work/reqset-audit/parsed.json", "w"), indent=1)
print("requirements parsed:", len(reqs), "maps:", len(maps), "ledger rows:", len(ledger))
