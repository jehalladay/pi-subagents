import json
from pathlib import Path
from collections import Counter

BASE = Path("/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111/epistemic-triage")
WORK = BASE / ".work"
FAMILIES = ["agents","detached","execute","furnace","inspector","interop","journal",
            "node-rpc","observe","packaging","providers","scheduling"]

# Cross-family duplicate merges decided at consolidation (dropped -> kept).
# Each pair states one defect twice; the kept row is the better-evidenced one.
DROPS = {
    "OBSERVE-001":   "PROVIDERS-008",  # phantom running node after native-id node() call; kept row reproduces 2 providers + mechanism
    "NODE-RPC-022":  "DETACHED-012",   # package.json missing "type":"module"; kept row pins the production handshake cost
    "INTEROP-004":   "EXECUTE-014",    # three definition kinds advertised, one launches; kept row adds no-importer census
    "NODE-RPC-008":  "EXECUTE-018",    # SubagentWorkflow description cost / compact no-op; kept row measures both modes + share
    "PROVIDERS-025": "NODE-RPC-015",   # 'observe' mode descriptor-only; kept row adds node() invoke-only fact
    "OBSERVE-015":   "EXECUTE-005",    # agent cannot stop its launched workflow / control legs dead; kept row has full verb matrix both hosts
    "INSPECTOR-016": "NODE-RPC-019",   # claude:transcript grant undocumented; kept row states the correct effective 40-row bound
}

POSITIVES = {
    "AGENTS-027","AGENTS-028","AGENTS-029","AGENTS-030","AGENTS-031","AGENTS-032",
    "DETACHED-009","DETACHED-010",
    "EXECUTE-023","EXECUTE-024","EXECUTE-025","EXECUTE-026",
    "FURNACE-018","FURNACE-019",
    "INSPECTOR-019","INSPECTOR-020","INSPECTOR-021",
    "INTEROP-019","INTEROP-020",
    "JOURNAL-020","JOURNAL-021","JOURNAL-022",
    "NODE-RPC-020","NODE-RPC-021",
    "OBSERVE-020","OBSERVE-021","OBSERVE-022","OBSERVE-023","OBSERVE-024",
    "PACKAGING-008","PACKAGING-009","PACKAGING-010","PACKAGING-013","PACKAGING-016",
    "PROVIDERS-027","PROVIDERS-028","PROVIDERS-029","PROVIDERS-030","PROVIDERS-031","PROVIDERS-032",
    "SCHEDULING-018","SCHEDULING-019","SCHEDULING-020",
}

rows = []
for fam in FAMILIES:
    with (WORK / f"find-{fam}.jsonl").open() as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            r = json.loads(line)
            r["_family"] = fam
            rows.append(r)

ids = [r["id"] for r in rows]
assert len(ids) == len(set(ids)) == 274, f"id collision or count drift: {len(ids)} rows, {len(set(ids))} unique"
byid = {r["id"]: r for r in rows}
for d, k in DROPS.items():
    assert d in byid and k in byid, (d, k)
    assert k not in DROPS, f"kept row {k} is itself dropped"
for p in POSITIVES:
    assert p in byid, p

same_origin = {}
for d, k in DROPS.items():
    same_origin.setdefault(k, []).append(d)

kept = [r for r in rows if r["id"] not in DROPS]
out_rows = []
mapping = {}
for i, r in enumerate(kept, 1):
    cid = f"C{i:03d}"
    mapping[r["id"]] = cid
    vh = [f"graded {r['grade']} at pin ce180d82 2026-11-11"]
    for d in same_origin.get(r["id"], []):
        dropped = byid[d]
        vh.append(f"SAME_ORIGIN: duplicate {d} ({dropped['_family']} family, grade {dropped['grade']}) merged at consolidation 2026-11-11; this row kept as better-evidenced")
    if r["id"] == "NODE-RPC-019":
        vh.append("consolidation verification 2026-11-11: src/index.ts:4916 calls readClaudeTranscript with no limit, so the default limit=40 applies; CLAUDE_TRANSCRIPT_MAX_ROWS=100 (src/workbench/claude-transcript.ts:83,233) is the cap INSPECTOR-016 quoted as the effective bound")
    row = {
        "id": cid,
        "source_id": r["id"],
        "family": r["_family"],
        "axis": r["axis"],
        "kind": "positive" if r["id"] in POSITIVES else "defect",
        "claim": r["claim"],
        "grade": r["grade"],
        "status": r["grade"],
        "evidence": r["evidence"],
        "cost": r["cost"],
        "cureHint": r["cureHint"],
        "verdict_history": vh,
    }
    if r["id"] in same_origin:
        row["same_origin"] = same_origin[r["id"]]
    out_rows.append(row)

with (BASE / "CLAIMS.jsonl").open("w") as f:
    for row in out_rows:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")

# ---- report ----
print(f"wrote {len(out_rows)} rows to {BASE/'CLAIMS.jsonl'}")
print("grades:", dict(Counter(r["grade"] for r in out_rows)))
print("kinds:", dict(Counter(r["kind"] for r in out_rows)))
print("axes:", dict(Counter(r["axis"] for r in out_rows)))
print("families:", dict(Counter(r["family"] for r in out_rows)))
print("defect grades:", dict(Counter(r["grade"] for r in out_rows if r["kind"] == "defect")))
print("defect axes:", dict(Counter(r["axis"] for r in out_rows if r["kind"] == "defect")))
print()
print("== per-family axis/grade table (all rows) ==")
for fam in FAMILIES:
    fr = [r for r in out_rows if r["family"] == fam]
    g = Counter(r["grade"][:3] for r in fr)
    k = Counter(r["kind"] for r in fr)
    print(f"{fam:11s} total={len(fr):3d} EST={g.get('EST',0):3d} SUP={g.get('SUP',0):2d} PLA={g.get('PLA',0)} defects={k.get('defect',0):3d} positives={k.get('positive',0):2d}")
print()
need = ["AGENTS-001","AGENTS-002","AGENTS-003","AGENTS-006","AGENTS-011","AGENTS-012","AGENTS-014","AGENTS-015","AGENTS-021","AGENTS-026",
        "DETACHED-001","DETACHED-002","DETACHED-005","DETACHED-012","DETACHED-016","DETACHED-017",
        "EXECUTE-001","EXECUTE-002","EXECUTE-004","EXECUTE-005","EXECUTE-006","EXECUTE-012","EXECUTE-013","EXECUTE-014","EXECUTE-018","EXECUTE-019",
        "FURNACE-001","FURNACE-006","FURNACE-013","INSPECTOR-002","INSPECTOR-017","INTEROP-001","INTEROP-002","INTEROP-003","INTEROP-008",
        "JOURNAL-001","JOURNAL-003","JOURNAL-005","JOURNAL-013","JOURNAL-018",
        "NODE-RPC-002","NODE-RPC-006","NODE-RPC-007","NODE-RPC-009","NODE-RPC-015","NODE-RPC-018","NODE-RPC-019",
        "OBSERVE-003","OBSERVE-004","OBSERVE-007","OBSERVE-011","OBSERVE-018",
        "PACKAGING-001","PACKAGING-002","PACKAGING-003","PACKAGING-005","PACKAGING-011","PACKAGING-018",
        "PROVIDERS-001","PROVIDERS-004","PROVIDERS-008","PROVIDERS-011","PROVIDERS-018","PROVIDERS-019","PROVIDERS-023",
        "SCHEDULING-001","SCHEDULING-005","SCHEDULING-012","SCHEDULING-017"]
print("== id mapping (referenced ids) ==")
for n in need:
    print(f"{n} -> {mapping.get(n, 'MERGED into ' + mapping.get(DROPS.get(n,''), '?') if n in DROPS else '?')}")
