"""Parse the three Phase-10 requirement drafts into one structured table (read-only on inputs)."""
import json, pathlib, re, sys

ROOT = pathlib.Path(sys.argv[1])
WORK = ROOT / "requirements" / ".work"
OUT = WORK / "req-audit"
FILES = [("r-core", "req-r-core.md"), ("r-exec", "req-r-exec.md"), ("r-release", "req-r-release.md")]


def field(body: str, names: list[str]) -> tuple[str, str]:
    for name in names:
        m = re.search(r"(?m)^- " + re.escape(name) + r"[^:\n]*: (.*)$", body)
        if m:
            return name, m.group(1).strip()
    return "", ""


def criteria(body: str) -> list[str]:
    m = re.search(r"(?ms)^- (?:Executable acceptance criteria|Acceptance criteria):\s*\n(.*?)(?=^- [A-Z])", body)
    if not m:
        return []
    out: list[str] = []
    for line in m.group(1).splitlines():
        s = line.strip()
        if re.match(r"^(\d+\.|-)\s", s):
            out.append(re.sub(r"^(\d+\.|-)\s+", "", s))
    return out


rows: list[dict[str, object]] = []
for cluster, name in FILES:
    text = (WORK / name).read_text()
    parts = re.split(r"(?m)^## (EAT-R\d+) — ", text)
    for i in range(1, len(parts), 2):
        rid = parts[i]
        body = parts[i + 1]
        nxt = re.search(r"(?m)^(# |## |---\s*$)", body.split("\n", 1)[1] if "\n" in body else "")
        if nxt:
            body = body[: len(body.split("\n", 1)[0]) + 1 + nxt.start()]
        title = body.split("\n", 1)[0].strip()
        tier_label, tier = field(body, ["V-tier", "Evidence tier target"])
        maps_label, maps = field(body, ["Maps-to"])
        _, typ = field(body, ["Type"])
        _, auth = field(body, ["Authority", "Requirement authority"])
        _, stmt = field(body, ["Statement"])
        _, rat = field(body, ["Rationale"])
        cond_label, cond = field(body, ["Conditions / unresolved gates", "Conditions"])
        _, lineage = field(body, ["Predecessor lineage"])
        _, prio = field(body, ["Priority"])
        _, derived = field(body, ["Derived from / remediation", "Derived from"])
        _, mutant = field(body, ["Negative mutant"])
        crit = criteria(body)
        packets = sorted(set(re.findall(r"\bP(?:0\d|1[0-2])\b", maps)))
        beads = re.findall(r"wb-[a-z0-9]{4}", maps)
        ext = sorted(set(re.findall(r"EAT-R\d{3}", maps + " " + lineage)))
        # expand R224+ style and "EAT-R239/R250" shorthand
        for m in re.finditer(r"EAT-R(\d{3})(?:/(?:EAT-)?R(\d{3}))+", maps + " " + lineage):
            for n in re.findall(r"R(\d{3})", m.group(0)):
                ext.append("EAT-R" + n)
        ext = sorted(set(ext))
        vt = sorted(set(re.findall(r"\bV[0-6]\b", tier)))
        rows.append({
            "id": rid, "cluster": cluster, "title": title, "type": typ, "authority": auth, "priority": prio,
            "statement": stmt, "rationale": rat, "criteria": crit, "n_criteria": len(crit), "mutant_field": mutant,
            "tier_label": tier_label, "tier_text": tier, "v_tiers": vt, "maps_text": maps, "packets": packets,
            "beads_in_maps": beads, "extends_stated": ext, "lineage_text": lineage, "cond_label": cond_label,
            "conditions": cond, "derived_text": derived,
        })

(OUT / "reqs-parsed.json").write_text(json.dumps(rows, indent=1))
print(len(rows), "requirements parsed")
for r in rows:
    print(r["id"][5:], r["cluster"][2:6], str(r["type"])[:14].ljust(14), str(r["authority"])[:34].ljust(34), "P:" + ",".join(r["packets"]).ljust(11),
          "V:" + ",".join(r["v_tiers"]).ljust(11), "beads:" + ",".join(b[3:] for b in r["beads_in_maps"]).ljust(14), "nC:" + str(r["n_criteria"]),
          "mut:" + ("F" if r["mutant_field"] else ("c" if any("utant" in c for c in r["criteria"]) else "-")), "ext:" + ",".join(e[5:] for e in r["extends_stated"]))
