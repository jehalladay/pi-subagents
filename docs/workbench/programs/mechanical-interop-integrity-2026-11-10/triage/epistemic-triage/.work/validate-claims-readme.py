#!/usr/bin/env python3
"""Validator for claims-readme.jsonl (MII triage, Phase 1). Run: python3 -I validate-claims-readme.py <claims.jsonl> <pi-README.md>"""
import json
import re
import sys

KINDS = {"OBSERVATION", "SOURCE_REPORT", "FORMAL_DERIVATION", "INFERENCE", "HYPOTHESIS", "PREDICTION", "DEFINITION", "NORMATIVE", "PROPOSAL"}
TIMES = {"pi-0fb90672", "mw-69cb016d", "history", "none"}
KEYS = ["id", "doc", "loc", "kind", "text", "strongestWording", "scope", "timeContext", "material", "citedPaths", "deps"]
NON_EMPIRICAL = {"NORMATIVE", "DEFINITION", "PROPOSAL"}

claims_path, readme_path = sys.argv[1], sys.argv[2]
readme = open(readme_path, encoding="utf-8").read()
lines = readme.split("\n")
errors = []
rows = []
with open(claims_path, encoding="utf-8") as fh:
    for n, raw in enumerate(fh, 1):
        if not raw.strip():
            errors.append(f"line {n}: blank line")
            continue
        try:
            rows.append(json.loads(raw))
        except Exception as exc:  # noqa: BLE001
            errors.append(f"line {n}: not JSON: {exc}")

ids = [r.get("id") for r in rows]
if len(ids) != len(set(ids)):
    errors.append("duplicate ids")
for r in rows:
    cid = r.get("id", "?")
    if list(r.keys()) != KEYS:
        errors.append(f"{cid}: keys {list(r.keys())}")
    if not re.fullmatch(r"C0(0[1-9]|[12][0-9]|3[0-5])", str(cid)):
        errors.append(f"{cid}: id outside C001-C035")
    if r.get("doc") != "pi-README.md":
        errors.append(f"{cid}: doc")
    if r.get("kind") not in KINDS:
        errors.append(f"{cid}: kind {r.get('kind')}")
    if r.get("timeContext") not in TIMES:
        errors.append(f"{cid}: timeContext {r.get('timeContext')}")
    if not isinstance(r.get("material"), bool):
        errors.append(f"{cid}: material not bool")
    elif r["material"] != (r.get("kind") not in NON_EMPIRICAL):
        errors.append(f"{cid}: material {r['material']} inconsistent with kind {r.get('kind')}")
    for key in ("loc", "text", "strongestWording", "scope"):
        if not isinstance(r.get(key), str) or not r[key].strip():
            errors.append(f"{cid}: empty {key}")
    for key in ("citedPaths", "deps"):
        if not isinstance(r.get(key), list) or any(not isinstance(x, str) or not x for x in r[key]):
            errors.append(f"{cid}: {key} not list[str]")
    sw = r.get("strongestWording", "")
    if "\n" in sw:
        errors.append(f"{cid}: strongestWording spans lines")
    if sw not in readme:
        errors.append(f"{cid}: strongestWording NOT VERBATIM")
    else:
        on = [i for i, ln in enumerate(lines, 1) if sw in ln]
        mentioned = set()
        for a, b in re.findall(r"lines? (\d+)(?:-(\d+))?", r.get("loc", "")):
            mentioned.update(range(int(a), int(b or a) + 1))
        r["_swLines"], r["_locLines"] = on, sorted(mentioned)
        if not set(on) & mentioned:
            errors.append(f"{cid}: strongestWording is on line(s) {on} but loc mentions {sorted(mentioned)}")
    for d in r.get("deps", []):
        if d == cid:
            errors.append(f"{cid}: self dep")
        if d not in ids:
            errors.append(f"{cid}: dep {d} unknown")
    if re.search(r"\d\s?%|confidence", r.get("text", "") + r.get("scope", ""), re.I):
        errors.append(f"{cid}: numeric confidence wording")

if ids != sorted(ids):
    errors.append("ids not in ascending order")

# dependency cycles
graph = {r["id"]: r["deps"] for r in rows}
state = {}
def visit(node, path):
    if state.get(node) == 2:
        return
    if state.get(node) == 1:
        errors.append("cycle: " + " -> ".join(path + [node]))
        return
    state[node] = 1
    for nxt in graph.get(node, []):
        visit(nxt, path + [node])
    state[node] = 2
for node in graph:
    visit(node, [])

# line coverage: every content line (not blank, not a heading, not the title) is named by some loc
content = [i for i, ln in enumerate(lines, 1) if ln.strip() and not ln.startswith("#")]
named = set()
for r in rows:
    named.update(r.get("_locLines", []))
uncovered = [i for i in content if i not in named]
if uncovered:
    errors.append(f"content lines with no claim loc: {uncovered}")

# sentence coverage (informational): sentences with no strongestWording inside them
info = []
for i in content:
    body = re.sub(r"^- ", "", lines[i - 1])
    for sent in re.split(r"(?<=[.;])\s+(?=[A-Z*])", body):
        if not any(r["strongestWording"] in sent or sent in r["strongestWording"] for r in rows):
            info.append((i, sent[:110]))

print("rows:", len(rows), "| ids:", ids[0], "..", ids[-1])
print("kinds:", {k: sum(1 for r in rows if r["kind"] == k) for k in sorted({r["kind"] for r in rows})})
print("timeContext:", {k: sum(1 for r in rows if r["timeContext"] == k) for k in sorted({r["timeContext"] for r in rows})})
print("material true:", sum(1 for r in rows if r["material"]), "| false:", sum(1 for r in rows if not r["material"]))
print("sentences without a strongestWording anchor (informational):")
for i, s in info:
    print("   line", i, "|", s)
print("ERRORS:", len(errors))
for e in errors:
    print("   ", e)
sys.exit(1 if errors else 0)
