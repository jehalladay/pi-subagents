#!/usr/bin/env python3
"""Checks every evidence item of lens-negative-ev.jsonl that carries a `quote`: the quote (whitespace-normalised, comment gutters
dropped) must occur in the cited file at the cited pin, and its first line must fall inside the cited line range. Read-only."""
import json, os, re, subprocess, sys
BASE = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110"
PI = os.path.join(BASE, "pins/pi-0fb90672"); MW = os.path.join(BASE, "pins/mw-69cb016d")
PROG = "docs/programs/mechanical-interop-integrity-2026-11-10/"
def text_of(pin, path):
    if pin.startswith("pi@0fb90672") and "+" not in pin and "->" not in pin:
        return open(os.path.join(PI, path), encoding="utf-8").read()
    if pin.startswith("mw@69cb016d") and "+" not in pin and "->" not in pin:
        return open(os.path.join(MW, path), encoding="utf-8").read()
    if pin.startswith("pi@3fc0ead1"):
        full = path if path.startswith("docs/") else PROG + path
        return subprocess.run(["git", "-C", PI, "show", "3fc0ead1:" + full], capture_output=True, check=True).stdout.decode("utf-8")
    if pin.startswith("companion program"):
        return open(os.path.join(BASE, path), encoding="utf-8").read()
    return None
def norm(s, gutters=False):
    if gutters:
        s = re.sub(r"\n\s*\*\s?", " ", s)      # drop block-comment gutters at line wraps (source files only)
    return re.sub(r"\s+", " ", s).strip()
def line_ranges(spec):
    out = []
    for part in str(spec).split(","):
        part = part.strip()
        if not part: continue
        a, _, b = part.partition("-")
        out.append((int(a), int(b or a)))
    return out
bad = 0; checked = 0; skipped = []
for line in open(os.path.join(BASE, "epistemic-triage/.work/lens-negative-ev.jsonl"), encoding="utf-8"):
    row = json.loads(line)
    for e in row["evidence"]:
        if "quote" not in e: continue
        try:
            text = text_of(e["pin"], e["path"])
        except Exception as exc:
            text = None; err = str(exc)
        if text is None:
            skipped.append((row["id"], e["pin"], e["path"])); continue
        checked += 1
        g = e["path"].endswith((".ts", ".mjs", ".js"))
        q = norm(e["quote"]); t = norm(text, g)
        if q not in t:
            bad += 1; print("MISSING", row["id"], e["path"], "|", e["quote"][:90]); continue
        # locate the first 30 chars of the quote line-wise
        head = e["quote"].strip().split("\n")[0][:30]
        hits = [i for i, l in enumerate(text.split("\n"), 1) if head in l]
        if "lines" in e:
            rngs = line_ranges(e["lines"])
            if hits and not any(a - 1 <= h <= b + 1 for h in hits for a, b in rngs):
                bad += 1; print("LINE?", row["id"], e["path"], "cited", e["lines"], "found at", hits[:6])
print(json.dumps({"quotes_checked": checked, "problems": bad, "skipped": skipped}, indent=1))
