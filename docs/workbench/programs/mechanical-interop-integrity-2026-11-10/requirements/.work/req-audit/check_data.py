import re, sys
sys.path.insert(0, ".")
import audit_data as D

ids = list(range(391, 471))
bad = 0
for name in ("C", "ST", "NOTE", "EXT", "BEAD"):
    miss = [i for i in ids if i not in getattr(D, name)]
    extra = [i for i in getattr(D, name) if i not in ids]
    if miss or extra:
        bad += 1
        print("COVERAGE", name, "missing", miss, "extra", extra)
for i in ids:
    toks = D.C[i].split()
    if len(toks) != 10:
        bad += 1
        print("CELLS", i, len(toks))
        continue
    note = D.NOTE[i]
    covered = set()
    if re.search(r"all (applied|non-validator) cells", note):
        covered |= set(range(1, 11))
    for m in re.finditer(r"L(\d+)(?:-L(\d+))?", note):
        a = int(m.group(1)); b = int(m.group(2) or a)
        covered |= set(range(a, b + 1))
    # slash lists like L2/L7/L8 are caught by the regex on each L\d+
    for k, t in enumerate(toks, start=1):
        if t == "A":
            continue
        if t == "*COV":
            continue  # global invariant
        if k not in covered:
            bad += 1
            print("UNJUSTIFIED", i, f"L{k}", t, "| note:", note[:90])
    for t in toks:
        if t not in ("A", ".", "S") and not re.fullmatch(r"\*(CON|RAT|FLT|NAT|ENV|COV)", t):
            bad += 1
            print("TOKEN", i, t)
# status sanity
for i in ids:
    if D.ST[i][0] not in ("NOT_RUN", "BLOCKED"):
        bad += 1
        print("STATUS", i, D.ST[i][0])
print("problems:", bad)
print("AMEND rows:", len(D.AMEND), sorted(D.AMEND))
print("BLOCKED:", sum(1 for i in ids if D.ST[i][0] == "BLOCKED"), "NOT_RUN:", sum(1 for i in ids if D.ST[i][0] == "NOT_RUN"))
