import json, re, sys
pin = sys.argv[1]
fm = open(f"{pin}/docs/workbench/feature-matrix.md", encoding="utf-8").read().splitlines()
sections = []
cur = None
not_claimed = []
in_not_claimed = False
for i, line in enumerate(fm, 1):
    m = re.match(r"^## (W\d\d): (.*)$", line)
    if m:
        cur = {"id": m.group(1), "title": m.group(2).strip(), "line": i, "rows": []}
        sections.append(cur); in_not_claimed = False; continue
    if line.startswith("## Not claimed"):
        in_not_claimed = True; cur = None; continue
    if in_not_claimed and line.startswith("- "):
        not_claimed.append({"line": i, "text": line[2:].strip()})
        continue
    if cur and line.startswith("|") and not line.startswith("| Feature") and not line.startswith("| ---"):
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 2:
            cur["rows"].append({
                "line": i,
                "feature": cells[0],
                "status": cells[1],
                "evidence": cells[2][:400] if len(cells) > 2 else "",
                "caveats": cells[3][:400] if len(cells) > 3 else "",
                "vcRefs": sorted(set(re.findall(r"VC-[1-7]", line))),
            })
status_counts = {}
for s in sections:
    for r in s["rows"]:
        status_counts[r["status"]] = status_counts.get(r["status"], 0) + 1
# VC definitions from doc 15
d15 = open(f"{pin}/docs/workbench/15-implementation-program.md", encoding="utf-8").read().splitlines()
vcs = []
for i, line in enumerate(d15, 1):
    m = re.match(r"^\*\*(VC-[1-7]): (.*?)\*\*\s*(\(.*?\))?", line)
    if m:
        body = []
        for j in range(i, min(i+8, len(d15))):
            if d15[j].strip() == "" : break
            body.append(d15[j].strip())
        vcs.append({"id": m.group(1), "title": m.group(2), "priority": (m.group(3) or "").strip("()"), "line": i, "body": " ".join(body)[:600]})
# 02 atomic requirements headings + ids
d02 = open(f"{pin}/docs/workbench/02-atomic-requirements.md", encoding="utf-8").read().splitlines()
headings = [{"line": i, "heading": l} for i, l in enumerate(d02, 1) if l.startswith("#")]
reqs = []
for i, l in enumerate(d02, 1):
    m = re.match(r"^\| (WB-\d{3}) \| (P\d) \| (.*) \|$", l)
    if m: reqs.append({"id": m.group(1), "priority": m.group(2), "line": i, "text": m.group(3)[:300]})
nfr = [l for l in d02 if l.startswith("NFR-")]
nfr_ids = re.findall(r"NFR-\d\d", " ".join(nfr))
out = {
  "featureMatrix": {
    "file": "docs/workbench/feature-matrix.md",
    "measurementDateLine": next((l for l in fm if l.startswith("This matrix implements")), "")[:400],
    "statusLegendVerbatim": [l for l in fm if re.match(r"^- (landed-gated|partial|in-progress|planned|not-started):", l)],
    "sections": sections,
    "notClaimed": not_claimed,
    "statusCounts": status_counts,
    "rowCount": sum(len(s["rows"]) for s in sections),
  },
  "verticalCuts": {"file": "docs/workbench/15-implementation-program.md", "items": vcs},
  "atomicRequirements": {"file": "docs/workbench/02-atomic-requirements.md", "sectionHeadings": headings, "requirementCount": len(reqs), "byPriority": {p: sum(1 for r in reqs if r["priority"]==p) for p in ("P0","P1","P2")}, "requirements": reqs, "nfrIds": nfr_ids},
}
json.dump(out, open(sys.argv[2], "w"), indent=1)
print("sections", len(sections), "rows", out["featureMatrix"]["rowCount"], "statusCounts", status_counts, "vcs", len(vcs), "reqs", len(reqs), "nfr", nfr_ids)
