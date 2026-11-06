import json, os, sys
OUT = sys.argv[1]
PINS = os.path.normpath(os.path.join(OUT, "..", "..", "pins"))
WT = {"pi@b27829e6dfa7": f"{PINS}/pi-b27829e6", "doc@7c80c34346c2": f"{PINS}/pi-b27829e6", "mw@f7c0a9431d6c": f"{PINS}/mw-main"}
def loc_tail(loc):
    if loc is None: return "-"
    s = str(loc)
    return s[1:] if s.startswith("L") and not s.startswith("L(") else s
ev_lines = open(f"{OUT}/EVIDENCE.jsonl", encoding="utf-8").read().splitlines()
ev = [json.loads(l) for l in ev_lines]
locmap = {}   # old locator -> new locator
fixed = []
def locator(e): return f'{e["pin"]}:{e["artifact"]}:{loc_tail(e["location"])}'
for e in ev:
    old = locator(e); eid = e["id"]; before = dict(e)
    a, pin = e["artifact"], e["pin"]
    # FIX2: bare directory -> explicit ls probe
    if " " not in a and "|" not in a and pin in WT and os.path.isdir(os.path.join(WT[pin], a)) and not os.path.isfile(os.path.join(WT[pin], a)):
        e["artifact"] = "ls " + a
        fixed.append((eid, "dir->probe", before["artifact"], e["artifact"]))
    # FIX3: duplicated revision prefix at the baseline pin
    elif pin == "mw@0c78e253" and a.startswith("0c78e253:"):
        e["artifact"] = a[len("0c78e253:"):]
        fixed.append((eid, "strip-rev-prefix", a, e["artifact"]))
    # FIX4: working-directory paths pinned to the doc commit
    elif eid in ("E0760", "E0761"):
        e["pin"] = e["pin_verbatim"] = "triage@self"
        e["root"] = "this audit's delivered epistemic-triage/ output tree (the part files ship beside CLAIMS.jsonl; durable with the ledger, never the purged working directory)"
        e["artifact"] = a.replace("out/epistemic-triage/", "")
        e["source_type"] = "OTHER"
        fixed.append((eid, "repin-to-triage-self", a, e["artifact"]))
    # FIX5: baseline quote mis-pinned to the moving pin
    elif eid == "E0729":
        e["pin"] = e["pin_verbatim"] = "mw@0c78e253"
        e["root"] = next(x["root"] for x in ev if x["id"] == "E0354")
        e["location"] = "L8-9"
        e["source_type"] = "PRIMARY_SOURCE_AT_BASELINE"
        fixed.append((eid, "repin-to-baseline", f'{before["pin"]}|{before["location"]}', f'{e["pin"]}|{e["location"]}'))
    # FIX6: symbol locator -> line range (verified at pin: contracts.ts L27-31)
    elif eid == "E0747":
        e["location"] = "L27-31"
        fixed.append((eid, "symbol-loc->lines", str(before["location"]), e["location"]))
    # FIX7: empty probe quote (probe re-run read-only at gate time: output empty)
    if eid == "E0781" and not e["quote"]:
        e["quote"] = "(empty: no output — src is byte-identical between the program baseline f67b6665 and the pin b27829e6; probe re-run read-only at the Phase 9 gate, 2026-11-06)"
        fixed.append((eid, "fill-empty-probe-quote", "''", e["quote"][:60]))
    new = locator(e)
    if new != old: locmap[old] = new
with open(f"{OUT}/EVIDENCE.jsonl", "w", encoding="utf-8") as f:
    byid = {e["id"]: e for e in ev}
    for line in ev_lines:
        rid = json.loads(line)["id"]
        row = byid[rid]
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
# sanity: untouched lines byte-identical
new_lines = open(f"{OUT}/EVIDENCE.jsonl", encoding="utf-8").read().splitlines()
changed_ids = {x[0] for x in fixed}
diff_unexpected = [json.loads(a)["id"] for a, b in zip(ev_lines, new_lines) if a != b and json.loads(a)["id"] not in changed_ids]
print("EVIDENCE rows rewritten:", len([1 for a,b in zip(ev_lines,new_lines) if a!=b]), "| unexpected diffs:", diff_unexpected)
# FIX: sync locator embeds in RELATIONS + LENSES
for fn in ("RELATIONS.jsonl", "LENSES.jsonl"):
    txt = open(f"{OUT}/{fn}", encoding="utf-8").read()
    n = 0
    for old, new in locmap.items():
        for enc_old, enc_new in ((json.dumps(old, ensure_ascii=False), json.dumps(new, ensure_ascii=False)),):
            c = txt.count(enc_old)
            if c: txt = txt.replace(enc_old, enc_new); n += c
    open(f"{OUT}/{fn}", "w", encoding="utf-8").write(txt)
    print(fn, "locator embeds updated:", n)
# FIX1: null dangling dossier pointers (non-material rows only)
cl_lines = open(f"{OUT}/CLAIMS.jsonl", encoding="utf-8").read().splitlines()
outl, nulled = [], 0
for line in cl_lines:
    c = json.loads(line)
    d = c.get("dossier")
    if d and not os.path.isfile(os.path.join(OUT, d)):
        assert not c["material"], c["id"]
        c["dossier"] = None
        line = json.dumps(c, ensure_ascii=False)
        nulled += 1
    outl.append(line)
open(f"{OUT}/CLAIMS.jsonl", "w", encoding="utf-8").write("\n".join(outl) + "\n")
print("CLAIMS dossier pointers nulled:", nulled)
print("--- fixes ---")
for x in fixed: print(" ", x)
json.dump({"fixed": fixed, "locmap": locmap, "dossiers_nulled": nulled}, open(f"{OUT}/.work-phase9/fixlog.json","w"), indent=1, ensure_ascii=False)
