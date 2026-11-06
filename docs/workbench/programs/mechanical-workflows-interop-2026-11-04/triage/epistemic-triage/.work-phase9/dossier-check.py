import json, os, sys
out = sys.argv[1]
claims = [json.loads(l) for l in open(f"{out}/CLAIMS.jsonl", encoding="utf-8") if l.strip()]
have = set(os.listdir(f"{out}/dossiers"))
missing_mat, missing_nonmat, nulld = [], [], 0
for c in claims:
    d = c.get("dossier")
    if d is None: nulld += 1; continue
    base = os.path.basename(d)
    if base not in have:
        (missing_mat if c.get("material") else missing_nonmat).append((c["id"], d, c.get("material")))
print("dossier=null rows:", nulld)
print("missing dossier, material:", len(missing_mat), missing_mat[:6])
print("missing dossier, non-material:", len(missing_nonmat), missing_nonmat[:6])
extra = have - {os.path.basename(c["dossier"]) for c in claims if c.get("dossier")}
print("dossier files with no claim row:", sorted(extra)[:10], len(extra))
# non-material dossier field sample
for c in claims:
    if not c.get("material"):
        print("sample non-material row dossier field:", c["id"], repr(c.get("dossier"))); break
