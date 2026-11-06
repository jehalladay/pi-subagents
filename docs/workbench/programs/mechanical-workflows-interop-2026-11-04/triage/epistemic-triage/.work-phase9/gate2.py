import json, os, re, sys, subprocess, random, collections
OUT = sys.argv[1]
PINS = os.path.normpath(os.path.join(OUT, "..", "..", "pins"))
WT = {"pi@b27829e6dfa7": f"{PINS}/pi-b27829e6", "doc@7c80c34346c2": f"{PINS}/pi-b27829e6", "mw@f7c0a9431d6c": f"{PINS}/mw-main"}
BASE = {"mw@0c78e253": (f"{PINS}/mw-main", "0c78e253")}
SELF = {"triage@self": OUT}
def rows(n): return [json.loads(l) for l in open(f"{OUT}/{n}", encoding="utf-8") if l.strip()]
claims, ev, rel, lens = rows("CLAIMS.jsonl"), rows("EVIDENCE.jsonl"), rows("RELATIONS.jsonl"), rows("LENSES.jsonl")
cid = {c["id"]: c for c in claims}; eid = {e["id"]: e for e in ev}
orig = {c.get("original_id") for c in claims if c.get("original_id")}
F = collections.defaultdict(list)
CID = re.compile(r"^C\d{4,5}$"); EID = re.compile(r"^E\d{4}$"); LOC = re.compile(r"^L(\d+)(?:-L?(\d+))?$")
CANY = re.compile(r"\bC\d{4,5}\b")
def ploc(l):
    if l is None: return None
    m = LOC.match(str(l)); return (int(m.group(1)), int(m.group(2) or m.group(1))) if m else "special"
def probe(a): return " " in a or "|" in a
# uniqueness
for name, rws in (("claims",claims),("evidence",ev),("relations",rel),("lenses",lens)):
    ids = [r["id"] for r in rws]
    if len(ids) != len(set(ids)): F["dup_ids"].append(name)
# cross refs + (h)
for c in claims:
    for f in ("support","counterevidence","anchor","cited"):
        for x in c.get(f) or []:
            if not isinstance(x,str) or not EID.match(x): F["h_shape"].append((c["id"],f,repr(x)[:50]))
            elif x not in eid: F["xref_missing_evidence"].append((c["id"],f,x))
    for x in c.get("depends_on") or []:
        if x not in cid: F["xref_depends_missing"].append((c["id"],x))
    d = c.get("dossier")
    if d and not os.path.isfile(f"{OUT}/{d}"): F["dossier_dangling"].append((c["id"],d))
    if c.get("material") and not d: F["material_without_dossier"].append(c["id"])
for e in ev:
    for cl in e.get("claims") or []:
        if cl.get("claim") not in cid: F["xref_ev_to_missing_claim"].append((e["id"], cl.get("claim")))
for r in rel:
    for f in ("from_evidence_id","to_evidence_id"):
        v = r.get(f)
        if v is not None and v not in eid: F["xref_rel_ev"].append((r["id"],f,v))
    for v in r.get("evidence") or []:
        if v not in eid: F["xref_rel_ev"].append((r["id"],"evidence",v))
    for side in ("tails","heads"):
        for t in r.get(side) or []:
            if CID.match(t) and t not in cid: F["xref_rel_claim"].append((r["id"],side,t))
            elif EID.match(t) and t not in eid: F["xref_rel_ev"].append((r["id"],side,t))
for L in lens:
    for pair in L.get("claim_ids") or []:
        x = pair[0] if isinstance(pair,list) else pair
        if isinstance(x,str) and CID.match(x) and x not in cid: F["xref_lens_claim"].append((L["id"],x))
# locator consistency (denormalized tails)
def loctail(l):
    if l is None: return "-"
    s = str(l); return s[1:] if s.startswith("L") and not s.startswith("L(") else s
mism = 0
for r in rel:
    fe = r.get("from_evidence_id")
    if fe and fe in eid and r.get("tails") and not CID.match(r["tails"][0]):
        e = eid[fe]
        if r["tails"][0] != f'{e["pin"]}:{e["artifact"]}:{loctail(e["location"])}': mism += 1
F["locator_mismatch_count"] = [mism] if mism else []
# resolution + (a)(d)(f)
def resolve(e):
    a, p = e["artifact"], e["pin"]
    if probe(a): return "probe"
    if p in WT:
        q = os.path.join(WT[p], a)
        return "file" if os.path.isfile(q) else ("dir" if os.path.isdir(q) else "missing")
    if p in SELF:
        return "file" if os.path.isfile(os.path.join(SELF[p], a)) else "missing"
    if p in BASE:
        wt, rev = BASE[p]
        return "baseline-file" if subprocess.run(["git","-C",wt,"cat-file","-e",f"{rev}:{a}"],capture_output=True).returncode==0 else "missing"
    return "no-root"
res = {e["id"]: resolve(e) for e in ev}
cen = collections.Counter(res.values())
for e in ev:
    rv = res[e["id"]]
    if rv == "dir": F["d_bare_directory"].append(e["id"])
    if rv == "missing": F["path_missing"].append((e["id"],e["pin"],e["artifact"]))
    if rv == "no-root": F["f_undeclared_root"].append((e["id"],e["pin"]))
    if not e.get("root"): F["f_no_root"].append(e["id"])
    if not (e.get("quote") or "").strip(): F["empty_quote"].append(e["id"])
    if rv != "probe" and ploc(e["location"]) == "special": F["special_location"].append((e["id"],str(e["location"])))
# per-status + (b)(c)
for c in claims:
    st = c["status"]; sup = c.get("support") or []; ce = c.get("counterevidence") or []
    if st in ("ESTABLISHED","SUPPORTED","PLAUSIBLE") and not sup: F["status_no_support"].append((c["id"],st))
    if st in ("REFUTED","CONTESTED") and not ce: F["status_no_counterev"].append((c["id"],st))
    if st == "UNDETERMINED" and not c.get("missing_to_settle"): F["undet_no_missing"].append(c["id"])
    if st == "UNSUPPORTED" and not (c.get("missing_to_settle") or c.get("rationale")): F["unsup_no_detection"].append(c["id"])
    pw = c.get("permitted_wording")
    if not (isinstance(pw,str) and len(pw.strip())>15 and pw.strip()[-1] in ".?"): F["b_not_sentence"].append((c["id"],repr(pw)[:50]))
    if st in ("REFUTED","ESTABLISHED","SUPPORTED"):
        prov = c.get("provenance") or {}; pl = ploc(prov.get("location"))
        for x in sup+ce:
            e = eid.get(x)
            if e and e["artifact"] == prov.get("artifact"):
                el = ploc(e.get("location"))
                if isinstance(pl,tuple) and isinstance(el,tuple) and not (el[1]<pl[0] or el[0]>pl[1]):
                    F["c_self_reference"].append((c["id"],x))
    if st in ("REFUTED","ESTABLISHED"):
        for x in sup+ce:
            if x in eid and res[x] == "missing": F["a_unresolvable"].append((c["id"],x))
# (e)
byw = collections.defaultdict(list)
for c in claims:
    pw = (c.get("permitted_wording") or "").strip()
    if pw: byw[pw].append(c)
for pw, grp in byw.items():
    if len(grp)>1 and len({g["proposition"] for g in grp})>1:
        ids = [g["id"] for g in grp]
        declared = all(any(x in ids for x in (g.get("same_origin_as") or ([] if not isinstance(g.get("same_origin_as"),str) else [g["same_origin_as"]]))) for g in grp[1:])
        if not declared: F["e_dup_wording"].append(ids)
# deliverables
for d in ("MANIFEST.md","CLAIMS.jsonl","EVIDENCE.jsonl","RELATIONS.jsonl","SOURCE-MAP.md","CONTRADICTIONS.md","dossiers","REMEDIATION.md","EPISTEMIC-AUDIT.md"):
    if not os.path.exists(f"{OUT}/{d}"): F["g_missing_deliverable"].append(d)
# remediation coverage (corrected regex)
rem = open(f"{OUT}/REMEDIATION.md", encoding="utf-8").read()
remclaims = set()
for m in re.finditer(r"^\|\s*M\d+\s*\|([^|]*)\|", rem, re.M):
    remclaims |= set(CANY.findall(m.group(1)))
unknown_rem = sorted(x for x in remclaims if x not in cid)
need = {c["id"] for c in claims if c["status"] in ("REFUTED","UNSUPPORTED","CONTESTED")}
F["rem_forward_unknown"] = unknown_rem
F["rem_inverse_gap"] = sorted(need - remclaims)
over = {c["id"] for c in claims if c.get("overclaims")}
F["overclaims_without_rem"] = sorted(over - remclaims)
# contradictions ids (corrected + alias)
cont = open(f"{OUT}/CONTRADICTIONS.md", encoding="utf-8").read()
F["contr_unknown_ids"] = sorted({x for x in CANY.findall(cont)} - set(cid) - orig)
# regrade consistency
pat = rows("CLAIMS.patch.jsonl")
for p in pat:
    c = cid.get(p["id"])
    if not c: F["patch_orphan"].append(p["id"]); continue
    if c["status"] != p["status"]: F["patch_status_mismatch"].append((p["id"],c["status"],p["status"]))
    hist = c.get("verdict_history") or []
    if not any(p["verdict_history_entry"] in str(h) for h in (hist if isinstance(hist,list) else [hist])):
        F["patch_history_missing"].append(p["id"])
    revdep = [d["id"] for d in claims if p["id"] in (d.get("depends_on") or [])]
    for d in revdep: F["regrade_dependant_unreviewed"].append((p["id"],d))
# kind/status coherence
for c in claims:
    if c["status"]=="NON-EPISTEMIC" and c["kind"] in ("OBSERVATION","INFERENCE","SOURCE_REPORT","FORMAL_DERIVATION","HYPOTHESIS","PREDICTION"): F["kind_status"].append((c["id"],c["kind"]))
    if c["status"]!="NON-EPISTEMIC" and c["kind"] in ("DEFINITION","NORMATIVE","PROPOSAL"): F["kind_status"].append((c["id"],c["kind"],c["status"]))
# quote verification
def read_lines(e):
    p, a = e["pin"], e["artifact"]
    if p in WT: return open(os.path.join(WT[p],a), encoding="utf-8", errors="replace").read().splitlines()
    if p in SELF: return open(os.path.join(SELF[p],a), encoding="utf-8", errors="replace").read().splitlines()
    wt, rev = BASE[p]
    return subprocess.run(["git","-C",wt,"show",f"{rev}:{a}"],capture_output=True,text=True).stdout.splitlines()
def norm(s): return re.sub(r"\s+"," ",s).strip()
def qcheck(e):
    pl = ploc(e["location"])
    if not isinstance(pl,tuple): return None
    lo,hi = pl
    seg = norm(" ".join(read_lines(e)[max(0,lo-1):hi]))
    frags = [norm(f) for f in re.split(r"(?:^|\s)\.\.\.(?:\s|$)", e["quote"]) if norm(f)]
    pos = 0
    for f in frags:
        i = seg.find(f, pos)
        if i < 0: return False
        pos = i + len(f)
    return True
eligible = [e for e in ev if res[e["id"]] in ("file","baseline-file") and isinstance(ploc(e["location"]),tuple)]
sample = random.Random(20261106).sample(eligible, 12)
fixed_ids = ["E0354","E0628","E0729","E0747","E0760","E0761"]
checked = []
for e in sample + [eid[x] for x in fixed_ids if x not in {s["id"] for s in sample}]:
    ok = qcheck(e)
    checked.append((e["id"], e["pin"], e["artifact"][:55], str(e["location"]), ok))
    if ok is False: F["quote_mismatch"].append((e["id"], e["pin"], e["artifact"], str(e["location"])))
# manifest gate record
if "Phase 9 gate" not in open(f"{OUT}/MANIFEST.md", encoding="utf-8").read(): F["manifest_gate_record_missing"].append("MANIFEST.md")
# summary
fails = {k:v for k,v in F.items() if v}
print("== resolution census ==", dict(cen))
print("== quote checks (12 random + fixed rows) ==")
for c in checked: print("  ", c)
print("== FAILURES ==" if fails else "== ALL CHECKS PASS (except noted) ==")
for k,v in fails.items():
    print(f"{k}: {len(v)}")
    for i in v[:8]: print("   ", i)
json.dump({k:[list(x) if isinstance(x,tuple) else x for x in v] for k,v in F.items()}, open(f"{OUT}/.work-phase9/gate2-report.json","w"), indent=1, default=str)
st = collections.Counter(c["status"] for c in claims)
print("== status ==", dict(st), "| material:", sum(1 for c in claims if c["material"]))
print("== census: anchored(doc-anchor rows):", sum(1 for c in claims if c.get("anchor")), "| self-ref hits:", len(F["c_self_reference"]), "| string-shaped support entries:", len(F["h_shape"]), "| dup wording:", len(F["e_dup_wording"]), "| absent deliverables:", len(F["g_missing_deliverable"]))
