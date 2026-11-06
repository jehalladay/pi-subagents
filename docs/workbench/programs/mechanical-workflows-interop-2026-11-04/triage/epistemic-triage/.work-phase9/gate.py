import json, os, re, sys, subprocess, random, collections
OUT = sys.argv[1]
PINS = os.path.normpath(os.path.join(OUT, "..", "..", "pins"))
WT = {"pi@b27829e6dfa7": f"{PINS}/pi-b27829e6",
      "doc@7c80c34346c2": f"{PINS}/pi-b27829e6",
      "mw@f7c0a9431d6c": f"{PINS}/mw-main"}
BASELINE = {"mw@0c78e253": (f"{PINS}/mw-main", "0c78e253")}
def rows(name):
    return [json.loads(l) for l in open(f"{OUT}/{name}", encoding="utf-8") if l.strip()]
claims, ev, rel = rows("CLAIMS.jsonl"), rows("EVIDENCE.jsonl"), rows("RELATIONS.jsonl")
cid = {c["id"]: c for c in claims}; eid = {e["id"]: e for e in ev}
R = {}  # report
def hit(key, item):
    R.setdefault(key, []).append(item)

EID = re.compile(r"^E\d{4}$"); CID = re.compile(r"^C\d{4}$")
LOC = re.compile(r"^L(\d+)(?:-L?(\d+))?$")
def parse_loc(loc):
    if loc is None: return None
    m = LOC.match(str(loc));
    return (int(m.group(1)), int(m.group(2) or m.group(1))) if m else "special"
def is_probe(a): return (" " in a) or ("|" in a)

# ---- cross references + (h) one shape ----
for c in claims:
    for f in ("support","counterevidence","anchor","cited"):
        for x in c.get(f) or []:
            if not isinstance(x,str) or not EID.match(x): hit("h_shape", (c["id"],f,repr(x)[:60]))
            elif x not in eid: hit("xref_claim_to_missing_evidence", (c["id"],f,x))
    for x in c.get("depends_on") or []:
        if x not in cid: hit("xref_depends_on_missing", (c["id"],x))
    so = c.get("same_origin_as")
    for x in (so if isinstance(so,list) else ([so] if so else [])):
        if x not in cid: hit("xref_same_origin_missing", (c["id"],x))
    d = c.get("dossier")
    if d and not os.path.isfile(f"{OUT}/{d}"): hit("dossier_dangling", (c["id"], d, c.get("material")))
for e in ev:
    for cl in e.get("claims") or []:
        if cl.get("claim") not in cid: hit("xref_evidence_to_missing_claim", (e["id"], cl.get("claim")))
for r in rel:
    for f in ("from_evidence_id","to_evidence_id"):
        v = r.get(f)
        if v is not None and v not in eid: hit("xref_rel_evidence_missing", (r["id"],f,v))
    for v in r.get("evidence") or []:
        if v not in eid: hit("xref_rel_evidence_missing", (r["id"],"evidence",v))
    for side in ("tails","heads"):
        for t in r.get(side) or []:
            if CID.match(t) and t not in cid: hit("xref_rel_claim_missing", (r["id"],side,t))
            elif EID.match(t) and t not in eid: hit("xref_rel_evidence_missing", (r["id"],side,t))
# denormalized locator consistency: tail string vs from_evidence row
mismatch = 0
for r in rel:
    fe = r.get("from_evidence_id")
    if fe and fe in eid and r.get("tails"):
        e = eid[fe]
        want = f'{e["pin"]}:{e["artifact"]}:{e["location"] if e["location"] is not None else "-"}'
        if r["tails"][0] != want and not CID.match(r["tails"][0]):
            mismatch += 1
            if mismatch <= 5: hit("rel_locator_mismatch", (r["id"], r["tails"][0][:80], want[:80]))
R["rel_locator_mismatch_total"] = mismatch

# ---- resolution helpers ----
filecache = {}
def resolve(e):
    """returns ('file'|'dir'|'probe'|'baseline-file'|'missing'|'special')"""
    a, pin = e["artifact"], e["pin"]
    if is_probe(a): return "probe"
    if pin in WT:
        p = os.path.join(WT[pin], a)
        if os.path.isfile(p): return "file"
        if os.path.isdir(p): return "dir"
        return "missing"
    if pin in BASELINE:
        wt, rev = BASELINE[pin]
        k = (pin,a)
        if k not in filecache:
            rc = subprocess.run(["git","-C",wt,"cat-file","-e",f"{rev}:{a}"], capture_output=True)
            filecache[k] = (rc.returncode==0)
        return "baseline-file" if filecache[k] else "missing"
    return "missing"
res = {e["id"]: resolve(e) for e in ev}
R["resolution_census"] = dict(collections.Counter(res.values()))
for e in ev:
    if res[e["id"]] == "dir": hit("d_bare_directory", (e["id"], e["source_type"], e["artifact"]))
    if res[e["id"]] == "missing": hit("path_missing", (e["id"], e["pin"], e["artifact"]))
    if parse_loc(e["location"]) == "special": hit("special_location", (e["id"], e["artifact"], str(e["location"])))
    if not e.get("pin") or (e["pin"] not in WT and e["pin"] not in BASELINE): hit("f_undeclared_root", (e["id"], e.get("pin")))
    if not e.get("root"): hit("f_no_root", e["id"])
    if not (e.get("quote") or "").strip(): hit("empty_quote", e["id"])

# ---- per-status checks ----
EMP = {"ESTABLISHED","SUPPORTED","PLAUSIBLE","REFUTED","CONTESTED","UNSUPPORTED","UNDETERMINED"}
for c in claims:
    st = c["status"]
    sup, ce = c.get("support") or [], c.get("counterevidence") or []
    if st in ("ESTABLISHED","SUPPORTED","PLAUSIBLE") and not sup: hit("status_no_support", (c["id"],st))
    if st in ("REFUTED","CONTESTED") and not ce: hit("status_no_counterevidence", (c["id"],st))
    if st == "UNDETERMINED" and not c.get("missing_to_settle"): hit("undetermined_no_missing", c["id"])
    if st == "UNSUPPORTED" and not (c.get("missing_to_settle") or c.get("rationale")): hit("unsupported_no_detection", c["id"])
    pw = c.get("permitted_wording")
    if not (isinstance(pw,str) and len(pw.strip())>15 and pw.strip()[-1] in ".?"): hit("b_wording_not_sentence", (c["id"], repr(pw)[:60]))
    # (c) self-reference
    if st in ("REFUTED","ESTABLISHED","SUPPORTED"):
        prov = c.get("provenance") or {}
        pl = parse_loc(prov.get("location"))
        for x in sup+ce:
            e = eid.get(x)
            if e and e["artifact"] == prov.get("artifact"):
                el = parse_loc(e.get("location"))
                if isinstance(pl,tuple) and isinstance(el,tuple) and not (el[1]<pl[0] or el[0]>pl[1]):
                    hit("c_self_reference", (c["id"], x, e["artifact"], str(e["location"])))
    # (a) refuted/established evidence resolvable
    if st in ("REFUTED","ESTABLISHED"):
        for x in sup+ce:
            if x in eid and res[x] in ("missing",): hit("a_unresolvable", (c["id"], x, eid[x]["artifact"]))

# ---- (e) duplicate permitted_wording ----
bywording = collections.defaultdict(list)
for c in claims:
    pw = (c.get("permitted_wording") or "").strip()
    if pw: bywording[pw].append(c)
for pw, grp in bywording.items():
    props = {g["proposition"] for g in grp}
    if len(grp) > 1 and len(props) > 1:
        ids = [g["id"] for g in grp]
        ok = all((g.get("same_origin_as") and any(x in ids for x in (g["same_origin_as"] if isinstance(g["same_origin_as"],list) else [g["same_origin_as"]]))) for g in grp[1:])
        if not ok: hit("e_duplicate_wording", (ids, pw[:80]))

# ---- deliverables (g) ----
for d in ("MANIFEST.md","CLAIMS.jsonl","RELATIONS.jsonl","SOURCE-MAP.md","CONTRADICTIONS.md","dossiers","REMEDIATION.md","EPISTEMIC-AUDIT.md","EVIDENCE.jsonl"):
    if not os.path.exists(f"{OUT}/{d}"): hit("g_missing_deliverable", d)

# ---- remediation coverage ----
rem = open(f"{OUT}/REMEDIATION.md", encoding="utf-8").read()
remrows = re.findall(r"^\|\s*(M\d+)\s*\|\s*([^|]*)\|([^|]*)\|([^|]*)\|", rem, re.M)
remclaims = set()
for mid, cell, stcell, classcell in remrows:
    found = re.findall(r"C\d{4}", cell)
    if not found: hit("rem_row_no_claim", mid)
    for x in found:
        remclaims.add(x)
        if x not in cid: hit("rem_forward_missing_claim", (mid, x))
need = {c["id"] for c in claims if c["status"] in ("REFUTED","UNSUPPORTED","CONTESTED")}
R["inverse_gap"] = sorted(need - remclaims)
R["rem_rows"] = len(remrows); R["rem_claims"] = len(remclaims)
over = {c["id"] for c in claims if c.get("overclaims")}
R["overclaims_total"] = len(over)
R["overclaims_without_rem_row"] = sorted(over - remclaims)

# ---- contradictions visible ----
cont = open(f"{OUT}/CONTRADICTIONS.md", encoding="utf-8").read()
ksets = re.findall(r"^##+\s+(K[A-Z0-9-]+)", cont, re.M)
R["contradiction_sets"] = ksets
contclaims = set(re.findall(r"C\d{4}", cont))
R["contested_not_in_contradictions"] = sorted({c["id"] for c in claims if c["status"]=="CONTESTED"} - contclaims)
for x in contclaims - set(cid): hit("contradictions_unknown_claim", x)

# ---- propagation: regrades have no stale dependants ----
revdep = collections.defaultdict(list)
for c in claims:
    for d in c.get("depends_on") or []: revdep[d].append(c["id"])
for c in claims:
    hist = c.get("verdict_history") or []
    entries = hist if isinstance(hist, list) else [hist]
    changed = [h for h in entries if isinstance(h,str) and ("correction" in h or "->" in h)]
    if changed:
        for dep in revdep.get(c["id"], []):
            dc = cid[dep]
            tag = str(dc.get("propagation","")) + " " + " ".join(map(str, dc.get("verdict_history") or []))
            if c["id"] not in tag and "re-check" not in tag and "propagat" not in tag.lower():
                hit("propagation_unreviewed_dependant", (c["id"], dep))
R["regraded_rows"] = [c["id"] for c in claims if any(isinstance(h,str) and "correction" in h for h in (c.get("verdict_history") or []))]

# ---- kind/status coherence ----
for c in claims:
    if c["status"]=="NON-EPISTEMIC" and c["kind"] in ("OBSERVATION","INFERENCE","SOURCE_REPORT","FORMAL_DERIVATION","HYPOTHESIS","PREDICTION"):
        hit("kind_status_mismatch", (c["id"], c["kind"], c["status"]))
    if c["status"]!="NON-EPISTEMIC" and c["kind"] in ("DEFINITION","NORMATIVE","PROPOSAL"):
        hit("kind_status_mismatch2", (c["id"], c["kind"], c["status"]))

# ---- 12-quote random verification (seed 20261106) ----
eligible = [e for e in ev if res[e["id"]] in ("file","baseline-file") and isinstance(parse_loc(e["location"]), tuple)]
rng = random.Random(20261106)
sample = rng.sample(eligible, 12)
def read_lines(e):
    pin, a = e["pin"], e["artifact"]
    if pin in WT:
        return open(os.path.join(WT[pin], a), encoding="utf-8", errors="replace").read().splitlines()
    wt, rev = BASELINE[pin]
    out = subprocess.run(["git","-C",wt,"show",f"{rev}:{a}"], capture_output=True, text=True)
    return out.stdout.splitlines()
def norm(s): return re.sub(r"\s+"," ", s).strip()
qv = []
for e in sample:
    lo, hi = parse_loc(e["location"])
    lines = read_lines(e)
    seg = norm(" ".join(lines[max(0,lo-1):hi]))
    ok = norm(e["quote"]) in seg or norm(e["quote"]) in norm(" ".join(lines[max(0,lo-2):hi+1]))
    qv.append({"id": e["id"], "pin": e["pin"], "artifact": e["artifact"], "loc": str(e["location"]), "ok": ok,
               "quote": e["quote"][:70]})
    if not ok: hit("quote_mismatch", (e["id"], e["pin"], e["artifact"], str(e["location"]), e["quote"][:90], seg[:120]))
R["quote_sample"] = qv

# ---- material census by doc file ----
bydoc = collections.Counter((c["provenance"].get("artifact","?")) for c in claims)
R["claims_by_doc"] = dict(bydoc)

json.dump(R, open(f"{OUT}/.work-phase9/gate-report.json","w"), indent=1, default=str)
order = [k for k in R if isinstance(R[k], list) and R[k] and k not in ("quote_sample","contradiction_sets","regraded_rows")]
print("== FINDINGS ==")
for k in order:
    v = R[k]
    print(f"{k}: {len(v)}")
    for item in v[:6]: print("   ", item)
print("== INFO ==")
for k in ("resolution_census","rel_locator_mismatch_total","rem_rows","rem_claims","overclaims_total","inverse_gap","overclaims_without_rem_row","contradiction_sets","regraded_rows","contested_not_in_contradictions","claims_by_doc"):
    print(k, "=", R.get(k))
print("== QUOTE SAMPLE ==")
for q in R["quote_sample"]: print(" ", q["ok"], q["id"], q["pin"], q["artifact"][:60], q["loc"])
