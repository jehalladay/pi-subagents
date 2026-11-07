import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from evidence import EV, PRIOR_ROWS, PI, MW
from claims_a import A
from claims_b import B
from claims_n import N

OUT = os.path.dirname(HERE)  # .../out/epistemic-triage
CLAIMS = os.path.join(OUT, "claims-part-01.jsonl")
rows = [json.loads(l) for l in open(CLAIMS) if l.strip()]
OTHER_IDS = set()
for part in ("claims-part-02.jsonl", "claims-part-03.jsonl", "claims-part-04.jsonl"):
    pth = os.path.join(OUT, part)
    if os.path.exists(pth):
        OTHER_IDS |= {json.loads(l)["id"] for l in open(pth) if l.strip()}
def dossier_name(cid):
    return f"{cid}.g01.md" if cid in OTHER_IDS else f"{cid}.md"
MAT = {**A, **B}

def ev(key):
    if key.startswith("P:"):
        return PRIOR_ROWS[key[2:]]
    return EV[key]

status_rows, relations, dossiers = [], [], {}
rel_n = 0
def rel(type_, tails, heads, notes, evidence=None, rule=None, status=None):
    global rel_n
    rel_n += 1
    r = {"id": f"R-g01-{rel_n:03d}", "type": type_, "tails": tails, "heads": heads, "notes": notes, "id_namespace": "part-01 (claims-part-01.jsonl; ids C1201-C1257 collide with part-02 and denote the doc-01 propositions here)"}
    if evidence: r["evidence"] = evidence
    if rule: r["rule"] = rule
    if status: r["status"] = status
    relations.append(r)

ids_material = [r["id"] for r in rows if r.get("material")]
missing_specs = [i for i in ids_material if i not in MAT]
assert not missing_specs, missing_specs
extra = [i for i in MAT if i not in ids_material]
assert not extra, extra
nm_ids = [r["id"] for r in rows if not r.get("material")]
missing_n = [i for i in nm_ids if i not in N]
assert not missing_n, missing_n

for r in rows:
    cid = r["id"]
    base = {"id": cid, "part": "01", "id_collides_with_other_part": cid in OTHER_IDS, "dossier": (f"dossiers/{dossier_name(cid)}" if cid in MAT else None), "kind": r["kind"], "proposition": r["proposition"],
            "source": r["source"], "time_version": r["time_version"], "material": bool(r.get("material")),
            "depends_on": r.get("depends_on", []), "supersedes": r.get("supersedes", [])}
    if cid in MAT:
        s = MAT[cid]
        evid = [ev(k) for k in s["evidence"]]
        row = {**base, "status": s["status"], "permitted_strength": s["strength"], "artifact_wording": s["wording"],
               "overclaims": s["overclaims"], "rationale": s["rationale"], "evidence": evid,
               "defeaters": s["defeaters"], "rivals_preserved": s["rivals"], "supersedes_faithful": s["faithful"],
               "propagation": s["propagation"], "missing_artifact": s["missing"], "not_run": "no tests, Forge, vitest, npm or live providers were executed; all warrants are static reads, git history and committed receipts at the pins"}
        status_rows.append(row)
        # evidence SUPPORTS relations
        for k in s["evidence"]:
            rel("SUPPORTS", [f"E-g01:{k}"], [cid], "evidence re-read at the pin by g01", evidence=[ev(k)])
        dossiers[cid] = (r, s, evid)
    else:
        st, strength, rationale, evk, faithful, presup = N[cid]
        row = {**base, "status": st, "permitted_strength": strength, "artifact_wording": r["strongest_wording"],
               "overclaims": False, "rationale": rationale, "evidence": [ev(k) for k in evk], "defeaters": [],
               "rivals_preserved": [], "supersedes_faithful": faithful, "propagation": (presup or "none recorded"),
               "missing_artifact": None, "not_run": "static reads only"}
        status_rows.append(row)
        for k in evk:
            rel("SUPPORTS", [f"E-g01:{k}"], [cid], "evidence re-read at the pin by g01 (non-material row)", evidence=[ev(k)])
    for d in r.get("depends_on", []):
        rel("DEPENDS_ON", [cid], [d], "depends_on carried from claims-part-01; all heads are part-01 ids")
    for sup in r.get("supersedes", []):
        f = (MAT[cid]["faithful"] if cid in MAT else N[cid][4])
        note = "new claim at the new pins supersedes the Nov-4 proposition; prior id/grade untouched"
        if f is True: note += "; correction judged FAITHFUL to the prior row"
        elif f is False: note += "; correction judged NOT FAITHFUL (see dossier)"
        else: note += "; faithfulness not adjudicated (restatement without correction)"
        pe = PRIOR_ROWS.get(sup)
        rel("SUPERSEDES", [cid], [sup], note, evidence=([pe] if pe else None))

# derivation hyperedges (joint warrants)
rel("JOINTLY_SUPPORTS", ["C1151", "C1152", "C1153", "E-g01:NM_89", "E-g01:LD_531"], ["C1154"], "grants:[] + claude:invoke required + validate-first + no injecting layer -> registered Claude detached request cannot pass validation", rule="valid static derivation", status="VALID")
rel("JOINTLY_SUPPORTS", ["C1131", "C1132", "E-g01:WT_GIT", "E-g01:WT_DETACH"], ["C1133"], "throwing git helper + detached worktree + force-remove in catch -> edits/refs discarded after a failed preservation step", rule="valid deductive", status="VALID")
rel("JOINTLY_SUPPORTS", ["C1140", "C1141", "C1144"], ["C1147"], "model admits function; tool refuses it; no host registered -> no first-class dispatch at the pin", rule="valid deductive", status="VALID")
rel("JOINTLY_SUPPORTS", ["C1171", "C1172", "C1173", "C1174", "P:C0224"], ["C1176"], "omissions established; 'incomplete' adds a normative target -> SUPPORTED not ESTABLISHED", rule="inductive + normative premise", status="VALID-WITH-NORMATIVE-PREMISE")
rel("JOINTLY_SUPPORTS", ["C1210", "C1211", "C1212"], ["C1218"], "signal exists, pre-dispatch only, not forwarded -> partial cancel", rule="valid deductive", status="VALID")
rel("JOINTLY_SUPPORTS", ["C1226", "C1227", "C1228", "C1229", "C1230"], ["C1231"], "render_id must be null (Pi) vs nonempty (MW) -> mutually exclusive evidence classes", rule="valid deductive", status="VALID")
rel("JOINTLY_SUPPORTS", ["C1200", "C1203"], ["C1204"], "repair landed and holds at the pins -> CORRECTED; the 'P0' attribution is separately judged unfaithful", rule="presupposition", status="VALID-FOR-CORRECTED")
rel("ENTAILS", ["C1253"], ["C1255"], "scoped census absence entails scoped 'no located witness'; universal reading stays UNDETERMINED")
rel("ENTAILS", ["C1160", "E-g01:CH_341", "E-g01:RT_1215", "E-g01:RT_879"], ["C1162"], "ordering + no-op abortAgent + started-before-spawn entail the structural window by code reading; the runtime outcome is unreproduced (hypothesis stays SUPPORTED)", status="VALID-STATIC")

# contradictions / defeaters as relations
rel("CONTRADICTS", ["E-g01:NOV4_01_29", "P:C0199"], ["C1204"], "the superseded Pi row and the Nov-4 Pi heading rate the descriptor conflict P1; 'not open P0' names the MW companion's MW-P0 label", evidence=[EV["NOV4_01_29"], PRIOR_ROWS["C0199"], EV["MW_NOV4_P0"]])
rel("CONTRADICTS", ["E-g01:FM_BLAME", "E-g01:CE_ADDED"], ["C1244"], "contradicts the 'overlooked' (authorial) reading only: the W11 sentence (2026-10-15) predates collective-event.ts (2026-10-28); the 'stale at the pin' reading survives", evidence=[EV["FM_BLAME"], EV["CE_ADDED"]])
rel("CONTRADICTS", ["E-g01:MW_DOCS10_141"], ["C1214"], "a mid-gate Forge cancel is read by the host as FORGE_OPERATION_CANCELLED (2026-10-15); contradicts the unqualified 'mid-session cancel' wording, not the Claude-session-scoped proposition", evidence=[EV["MW_DOCS10_141"]])
rel("CONTRADICTS", ["E-g01:MW_IDEMP_43"], ["C1217"], "an idempotency fingerprint exists for Git-source publication; contradicts blanket 'no-duplicate effects remain to implement', not the host-level reading", evidence=[EV["MW_IDEMP_43"]])
rel("CONTRADICTS", ["E-g01:MW_LIB_NOSIG", "E-g01:MW_F7C0_STAT"], ["C1210"], "contradicts the ledger proposition's 'develop' attribution only (library develop() has no signal); the artifact wording is unaffected", evidence=[EV["MW_LIB_NOSIG"], EV["MW_F7C0_STAT"]])
for cid in ["C1122", "C1131", "C1132", "C1133", "C1136"]:
    rel("CONFLICTS_WITH", ["E-g01:PI_BR_5IK5"], [cid], "temporal/scope defeater: unlanded machine/flywheel/wb-5ik5 (2026-11-06/07) rewrites the catch; claim holds at the pin (tracked master tree) only", evidence=[EV["PI_BR_5IK5"]])
for cid in ["C1171", "C1172", "C1173", "C1176"]:
    rel("CONFLICTS_WITH", ["E-g01:PI_BR_413A"], [cid], "temporal/scope defeater: unlanded wb-413a binds replay to measured source/instruction/provider readings; claim holds at the pin only", evidence=[EV["PI_BR_413A"]])
for cid in ["C1144", "C1147", "C1181", "C1182"]:
    rel("CONFLICTS_WITH", ["E-g01:PI_BR_OCIE"], [cid], "scope note: unlanded wb-ocie adds a Mechanical descriptor boundary module (not a host); absence claims are pin-relative per C1104", evidence=[EV["PI_BR_OCIE"]])
rel("CONFLICTS_WITH", ["E-g01:WT_TEST_432"], ["C1134", "C1135"], "a committed characterization test asserts the lossy report; BEAD-PLAN:8 requires a specification ruling before changing it; the Nov-6 artifact does not name the test", evidence=[EV["WT_TEST_432"], EV["BEADPLAN_8"]])
rel("CONFLICTS_WITH", ["E-g01:AM_738", "E-g01:TD_81"], ["C1136"], "scope: the refusal is the Claude SDK host's; Pi-native agent-manager worktree agents still reach cleanupWorktree", evidence=[EV["AM_738"], EV["TD_81"]])
rel("CONFLICTS_WITH", ["E-g01:LD_681", "E-g01:RT_258"], ["C1173"], "scope: the detached host's basis binds a provider manifest; the interface comment lists one; the Claude host's key does not", evidence=[EV["LD_681"], EV["RT_258"]])

# same-origin lineage
for cid, k in [("C1133", "SKILL_14"), ("C1120", "SKILL_14"), ("C1162", "README_22"), ("C1176", "README_22"), ("C1218", "SKILL_15"), ("C1175", "SKILL_15"), ("C1255", "SKILL_17")]:
    rel("SAME_ORIGIN_AS", [f"E-g01:{k}"], [cid], "SKILL/README restatement lands in the same commit d7666a76 as doc 01 (one authorial lineage); not independent corroboration", evidence=[EV[k]])
rel("SAME_ORIGIN_AS", ["E-g01:MW_NOV4_P0"], ["C1204"], "the MW companion programs (Nov-4 and the tip-only Nov-6 companion) share authorship with the Pi program; their labels are the same lineage")

# ---------- write status + relations
sp = os.path.join(OUT, "status-part-g01.jsonl")
with open(sp, "w") as f:
    for row in status_rows: f.write(json.dumps(row, ensure_ascii=False) + "\n")
rp = os.path.join(OUT, "relations-part-g01.jsonl")
with open(rp, "w") as f:
    for row in relations: f.write(json.dumps(row, ensure_ascii=False) + "\n")

# ---------- dossiers
def md_ev(e):
    q = e["quote"].replace("\n", " ⏎ ")
    return f"| `{e['pin']}` `{e['path']}` L{e['lines']} | {q} |"

DOSS = os.path.join(OUT, "dossiers")
os.makedirs(DOSS, exist_ok=True)
for cid, (r, s, evid) in dossiers.items():
    sup = r.get("supersedes", [])
    lines = []
    lines.append(f"# {cid} — {r['proposition']}")
    lines.append("")
    coll = " This id ALSO names a different proposition in another claims part; this file is the part-01 (doc 01) dossier." if cid in OTHER_IDS else ""
    lines.append(f"Group g01 (doc 01, claims-part-01 id space). Kind: {r['kind']}. Material: yes.{coll}")
    lines.append("")
    lines.append("## Verbatim artifact wording")
    lines.append(f"> {s['wording']}")
    lines.append(f"Anchor: `pi@d7666a76f561` `{r['source']['path']}` L{r['source']['lines']} ({r['source'].get('section','')}).")
    lines.append("")
    lines.append("## Claim type and scope")
    lines.append(f"- Kind: {r['kind']}")
    lines.append(f"- Scope: {r['scope']}")
    lines.append(f"- Temporal/version context: {r['time_version']}")
    if r.get("implicit_premises"):
        lines.append(f"- Implicit premises (from extraction): " + "; ".join(r["implicit_premises"]))
    lines.append("")
    lines.append("## Warrant verdict")
    lines.append(f"- Status: **{s['status']}**")
    lines.append(f"- Permitted linguistic strength: {s['strength']}")
    lines.append(f"- Overclaims as worded: {'yes' if s['overclaims'] else 'no'}")
    lines.append(f"- Rationale: {s['rationale']}")
    lines.append("")
    lines.append("## Support (re-read at the pins by g01; nothing was run)")
    lines.append("| Evidence | Quote |")
    lines.append("|---|---|")
    for e in evid: lines.append(md_ev(e))
    lines.append("")
    lines.append("## Counterevidence / defeaters")
    if s["defeaters"]:
        for d in s["defeaters"]: lines.append(f"- {d}")
    else:
        lines.append("- none found")
    lines.append("")
    lines.append("## Dependencies")
    lines.append(f"- depends_on (part-01 ids): {', '.join(r.get('depends_on', [])) or 'none'}")
    lines.append(f"- supersedes (Nov-4 ids, grades untouched): {', '.join(sup) or 'none'}")
    if sup:
        f = s["faithful"]
        verdict = "FAITHFUL" if f is True else ("NOT FAITHFUL" if f is False else "not adjudicated (restatement)")
        lines.append(f"- Supersession faithfulness: **{verdict}**")
        for p in sup:
            pr = PRIOR_ROWS.get(p)
            if pr: lines.append(f"  - prior {p}: {pr['quote']}")
            else: lines.append(f"  - prior {p}: (row read at the pin ledger; not quoted here)")
    lines.append(f"- Propagation: {s['propagation']}")
    lines.append("")
    lines.append("## Rival readings tested")
    lines.append(f"- Strongest case as worded: {s['strongest']}")
    lines.append(f"- Strongest counter-reading: {s['counter']}")
    lines.append(f"- Narrower supported proposition: {s['narrower']}")
    if s["rivals"]:
        lines.append("- Rivals preserved: " + " | ".join(s["rivals"]))
    lines.append("")
    lines.append("## Adversarial attacks on each warrant path")
    for a in s["attacks"]: lines.append(f"- {a}")
    lines.append("")
    lines.append("## What would settle it / missing evidence")
    lines.append(f"- Settle: {s['settle']}")
    lines.append(f"- Missing artifact: {s['missing'] or 'none'}")
    lines.append("")
    lines.append("## Remediation")
    lines.append(f"- {s['remediation']}")
    lines.append("")
    with open(os.path.join(DOSS, dossier_name(cid)), "w") as fh:
        fh.write("\n".join(lines))

from collections import Counter
counts = Counter(row["status"] for row in status_rows)
mat_counts = Counter(row["status"] for row in status_rows if row["material"])
print(json.dumps({"rows": len(status_rows), "material": len(dossiers), "relations": len(relations), "counts_all": counts, "counts_material": mat_counts}, indent=1))
