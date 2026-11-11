#!/usr/bin/env python3
"""Roll-up shard edits for audit fixes F-02, F-09, F-12, F-15 (wording/mapping/custody only; no statement re-derivation).
Each edit is an exact single-occurrence replacement; the script aborts without writing if any anchor is missing or repeated."""
import json, sys
W = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111/requirements/.work"

MD = {
 "req-r-lx.md": [
  # F-02 header live-bead list
  ("F-02", "(wb-69g.12, wb-752.13, wb-h8f.7, wb-9x5.16, wb-79k.1/.2/.3, wb-6ze.15, wb-0kg.3, wb-yiu4). A named bead",
           "(wb-69g.12, wb-752.13, wb-h8f.7, wb-9x5.11, wb-79k.3, wb-6ze.15, wb-0kg.3, wb-yiu4; lineage: wb-9x5.16 closed 2026-11-11 and consolidated into wb-9x5.11, wb-79k.1/.2 closed and consolidated into wb-79k.3 — closed ids are provenance, never filing targets). A named bead"),
  # F-02 R328
  ("F-02", "- Maps-to: observe; extends wb-9x5.16 (W21-F2 honesty bundle records the series this criterion reads).",
           "- Maps-to: observe; extends wb-9x5.11 (W21 receipts; it carries the W21-F2 honesty-bundle series this criterion reads). lineage: wb-9x5.16 (closed 2026-11-11, consolidated into wb-9x5.11; not a filing target)."),
  # F-02 R331
  ("F-02", "- Maps-to: observe; extends wb-9x5.16 (bench records the series).",
           "- Maps-to: observe; extends wb-9x5.11 (bench records the series). lineage: wb-9x5.16 (closed 2026-11-11, consolidated into wb-9x5.11; not a filing target)."),
  # F-02 R329
  ("F-02", "wb-79k.1/.2/.3 observe-wiring seams feed the same projection and must stay consistent with the corrected vocabulary.",
           "the wb-79k.3 observe-wiring seams (lineage: wb-79k.1, wb-79k.2, closed and consolidated into wb-79k.3) feed the same projection and must stay consistent with the corrected vocabulary."),
  ("F-02", "- Maps-to: observe; sibling wb-79k.1/.2/.3.",
           "- Maps-to: observe; sibling wb-79k.3. lineage: wb-79k.1, wb-79k.2 (closed, consolidated into wb-79k.3; not filing targets)."),
  # F-09 R321 (C074 is a preservation control read by criterion 2, not derivation basis)
  ("F-09", "sibling acceptance wb-0kg.3 (detached reattach receipt) must keep passing.\n- Maps-to: execute; extends wb-69g.12",
           "sibling acceptance wb-0kg.3 (detached reattach receipt) must keep passing.\n- Preserves: C074 ESTABLISHED (positive: SubagentWorkflow's 279-byte launch reply, the baseline criterion 2 reads) — a preservation control, not derivation basis.\n- Maps-to: execute; extends wb-69g.12"),
  # F-09 R322
  ("F-09", "- Conditions/unknowns: Preserve C073 (API-misuse messages are already specific and self-correcting).",
           "- Conditions/unknowns: none beyond the preservation control below.\n- Preserves: C073 ESTABLISHED (positive: API-misuse messages are already specific and self-correcting) — a preservation control, not derivation basis."),
  # F-09 R326 grade word
  ("F-09", "Experience standard: C030 (compact Agent description delivers what it claims) is the in-repo precedent.",
           "Experience standard: C030 ESTABLISHED (positive: the compact Agent description delivers what it claims) is the in-repo precedent."),
  # F-09 R328
  ("F-09", "- Conditions/unknowns: Preserve C194 (byte cap exactness and flagged truncation) and C195 (typed cursor refusals).",
           "- Conditions/unknowns: none beyond the preservation controls below.\n- Preserves: C194 ESTABLISHED (positive: byte cap exactness and flagged truncation) and C195 ESTABLISHED (positive: typed cursor refusals) — preservation controls, not derivation basis."),
 ],
 "req-r-ops.md": [
  # F-09 R357 grade word
  ("F-09", "duplicate-effect stand-in in P01b is probe-only (C145), so actual shipped effect duplication is not claimed.",
           "duplicate-effect stand-in in P01b is probe-only (C145 ESTABLISHED: no shipped capability produces a reconcilable row), so actual shipped effect duplication is not claimed."),
 ],
 "req-r-platform.md": [
  # F-15 R366
  ("F-15", "- Conditions/unknowns: The vendored SDK drops edge/answer information. If a reviewed SDK seam is required, record BLOCKED on that exact artifact; do not reconstruct names from inode guesses or invent a producer API.",
           "- Conditions/unknowns: The vendored @hyperunix/sdk 0.1.0 exposes answer projections as distinct events through `events()` (node_modules/@hyperunix/sdk/dist/execution.js:8-9) and carries `answerCount` (dist/result.js:184, :439); only the `find()`/`rows()` path the provider uses (src/workbench/providers/hyperunix.ts:21, :42) drops them and yields node-claim bodies only. The cure consumes the `events()` answer projections; this row is not SDK-blocked (G-HX AVAILABLE). Do not reconstruct names from inode guesses or invent a producer API."),
  # F-12 R367
  ("F-12", "- Conditions/unknowns: wb-jwc.7 pins the noncommitted preview stderr-discard/kill custody. Do not change that pin silently: native RF envelope messages can be preserved immediately; non-envelope stderr retention is BLOCKED pending an explicit amendment, or supply exit status and honest unavailable cause.",
           "- Conditions/unknowns: The noncommitted preview stderr-discard/kill custody is a landed pin (wb-jwc.7, closed: landing 1052, merge 0ebfd9ce), held by the artifact test/workbench-rf-stderr-receipt-capture-census.test.ts. Do not change that pin silently: native RF envelope messages can be preserved immediately; non-envelope stderr retention (criterion 4) is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed), or supply exit status and honest unavailable cause."),
  ("F-12", "| C222 | ESTABLISHED | defect | EAT-R367 | Non-envelope stderr cause is blocked by wb-jwc.7 custody pending amendment; preserve actual exit status without claiming stderr capture. |",
           "| C222 | ESTABLISHED | defect | EAT-R367 | Non-envelope stderr cause is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed; test/workbench-rf-stderr-receipt-capture-census.test.ts); preserve actual exit status without claiming stderr capture. |"),
 ],
}

def edit_map(fn, fn_edit):
    rows = [json.loads(l) for l in open(f"{W}/{fn}") if l.strip()]
    n = fn_edit(rows)
    return rows, n

def lx_map(rows):
    n = 0
    for r in rows:
        q = r["req"]
        if q == "EAT-R321":
            assert "C074" in r["claims"]; r["claims"].remove("C074"); r["preserves"] = ["C074"]; n += 1
        elif q == "EAT-R322":
            assert "C073" in r["claims"]; r["claims"].remove("C073"); r["preserves"] = ["C073"]
            r["conditions"] = "Preserve C073 (ESTABLISHED positive) API-misuse message quality."; n += 1
        elif q == "EAT-R328":
            assert "C194" in r["claims"] and r["existingBead"] == "wb-9x5.16"
            r["claims"].remove("C194"); r["preserves"] = ["C194", "C195"]
            r["existingBead"] = "wb-9x5.11"; r["lineageBeads"] = ["wb-9x5.16"]
            r["conditions"] = "Preserve C194 (ESTABLISHED positive) byte-cap exactness and C195 (ESTABLISHED positive) typed cursor refusals."; n += 1
        elif q == "EAT-R331":
            assert r["existingBead"] == "wb-9x5.16"
            r["existingBead"] = "wb-9x5.11"; r["lineageBeads"] = ["wb-9x5.16"]; n += 1
        elif q == "EAT-R329":
            assert r["existingBead"].startswith("wb-79k.1")
            r["existingBead"] = "wb-79k.3 (sibling)"; r["lineageBeads"] = ["wb-79k.1", "wb-79k.2"]; n += 1
    return n

def ops_map(rows):
    n = 0
    for r in rows:
        if r["req"] == "EAT-R357":
            assert "C145" not in r["claims"]
            r["claims"].append("C145"); r["epistemic_basis"].append({"id": "C145", "status": "ESTABLISHED"}); n += 1
    return n

def platform_map(rows):
    n = 0
    for r in rows:
        if r["req"] == "EAT-R366":
            r["conditions"] = "The vendored @hyperunix/sdk 0.1.0 exposes answer projections as distinct events through events() (node_modules/@hyperunix/sdk/dist/execution.js:8-9) and carries answerCount (dist/result.js:184, :439); only the find()/rows() path the provider uses (src/workbench/providers/hyperunix.ts:21, :42) drops them. The cure consumes the events() answer projections; not SDK-blocked (G-HX AVAILABLE). Do not reconstruct names from inode guesses or invent a producer API."; n += 1
        elif r["req"] == "EAT-R367":
            assert r["conditions"].startswith("wb-jwc.7 pins")
            r["conditions"] = "The noncommitted preview stderr-discard/kill custody is a landed pin (wb-jwc.7, closed: landing 1052, merge 0ebfd9ce), held by test/workbench-rf-stderr-receipt-capture-census.test.ts. Do not change that pin silently: native RF envelope messages can be preserved immediately; non-envelope stderr retention (criterion 4) is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed), or supply exit status and honest unavailable cause. R363 owns schema paths; R364 owns completion propagation, not this mapping."; n += 1
    return n

out = {}
log = []
for fn, edits in MD.items():
    text = open(f"{W}/{fn}").read()
    for fix, old, new in edits:
        c = text.count(old)
        if c != 1:
            sys.exit(f"ABORT {fn} [{fix}]: anchor occurs {c} times: {old[:90]!r}")
        text = text.replace(old, new)
        log.append((fn, fix, old[:70]))
    out[fn] = text
maps = {}
for fn, f in (("map-r-lx.jsonl", lx_map), ("map-r-ops.jsonl", ops_map), ("map-r-platform.jsonl", platform_map)):
    rows, n = edit_map(fn, f); maps[fn] = rows; log.append((fn, "map", f"{n} rows edited"))
exp = {"map-r-lx.jsonl": 5, "map-r-ops.jsonl": 1, "map-r-platform.jsonl": 2}
for fn, rows in maps.items():
    got = [x for x in log if x[0] == fn][0][2]
    assert got == f"{exp[fn]} rows edited", (fn, got)
for fn, text in out.items():
    open(f"{W}/{fn}", "w").write(text)
for fn, rows in maps.items():
    with open(f"{W}/{fn}", "w") as fh:
        for r in rows: fh.write(json.dumps(r, ensure_ascii=False) + "\n")
for x in log: print("applied", x)
