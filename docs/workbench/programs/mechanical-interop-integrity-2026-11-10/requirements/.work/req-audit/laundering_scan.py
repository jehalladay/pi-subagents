"""Laundering scan: compare every inline status label in the requirement drafts with the ledger FINAL status."""
import json, pathlib, re, sys, collections

ROOT = pathlib.Path(sys.argv[1])
claims = {r["id"]: r for r in map(json.loads, (ROOT / "epistemic-triage/CLAIMS.jsonl").read_text().splitlines())}
STAT = r"(ESTABLISHED|SUPPORTED|PLAUSIBLE|UNSUPPORTED|CONTESTED|REFUTED|UNDETERMINED|NON-EPISTEMIC)"
reqs = json.loads((ROOT / "requirements/.work/req-audit/reqs-parsed.json").read_text())
tot = collections.Counter()
mismatch = []
weak_unlabelled = []
out = {}
for r in reqs:
    body = " ".join([r["statement"], r["rationale"], " ".join(r["criteria"]), r["conditions"], r["derived_text"], r["lineage_text"], r["maps_text"]])
    cited = set(re.findall(r"\bC\d{3}\b", body))
    labelled: dict[str, set[str]] = collections.defaultdict(set)
    # pattern 1: "C123 STATUS" / "C123 (KIND, STATUS" / "C123 (STATUS" / "C123 is STATUS"
    for m in re.finditer(r"\b(C\d{3})\b(?:’s|'s)?(?: is| are)?\s*\(?(?:[A-Z_]+, )?" + STAT, body):
        labelled[m.group(1)].add(m.group(2))
    # pattern 2: lists "C187, C188, C189, C198 are NON-EPISTEMIC" / "C038/C039/C041/C100 are ESTABLISHED" / "C190, C191 NON-EPISTEMIC"
    for m in re.finditer(r"((?:\bC\d{3}\b(?:\s*[,/]\s*|\s+and\s+))+\bC\d{3}\b)\s*(?:are|is)?\s*\(?(?:[A-Z_]+, )?" + STAT, body):
        for c in re.findall(r"C\d{3}", m.group(1)):
            labelled[c].add(m.group(2))
    for c in cited:
        tot["cited"] += 1
        if c not in claims:
            mismatch.append((r["id"], c, "UNKNOWN CLAIM", ""))
            continue
        actual = claims[c]["status"]
        if labelled.get(c):
            tot["labelled"] += 1
            bad = {s for s in labelled[c] if s != actual}
            # facet labels are legitimate when the sentence names a facet; report for manual read
            if bad:
                mismatch.append((r["id"], c, "label " + "/".join(sorted(labelled[c])), "ledger " + actual))
        elif actual in ("REFUTED", "UNSUPPORTED", "CONTESTED", "UNDETERMINED", "PLAUSIBLE"):
            weak_unlabelled.append((r["id"], c, actual))
    out[r["id"]] = {"cited": sorted(cited), "labelled": {k: sorted(v) for k, v in labelled.items()}}
print("citation tokens (distinct per requirement):", tot["cited"], "| with inline status label:", tot["labelled"], "| distinct claims cited:", len({c for v in out.values() for c in v["cited"]}))
print("label != ledger (manual read required):")
for m in mismatch:
    print("  ", *m)
print("weak-status claims cited without an inline status label:")
for w in weak_unlabelled:
    print("  ", *w)
(ROOT / "requirements/.work/req-audit/laundering-scan.json").write_text(json.dumps({"totals": dict(tot), "mismatch": mismatch, "weak_unlabelled": weak_unlabelled}, indent=1))
