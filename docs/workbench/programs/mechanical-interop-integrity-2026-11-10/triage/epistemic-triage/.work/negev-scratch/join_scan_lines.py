#!/usr/bin/env python3
"""Entry-level (one JSONL line = one tracker record) co-occurrence of the EAT-R080 join components in the Pi .beads exports.
Read-only."""
import re, sys, json, os
PI_RUN = re.compile(r'(?<![A-Za-z0-9_-])wf_[a-z0-9-]{6,}(?![A-Za-z0-9_-])')
OUTCOME3 = re.compile(r'(?<![A-Za-z0-9_])(?:verified_candidate|verification_failed|needs_evidence)(?![A-Za-z0-9_])')
FORGE_OP = re.compile(r'(?<![A-Za-z0-9_-])op-[0-9a-f]{32}(?![A-Za-z0-9_-])')
PIN = re.compile(r'(?<![A-Za-z0-9_-])(?=[0-9a-f]{0,39}[0-9])(?=[0-9a-f]{0,39}[a-f])[0-9a-f]{7,40}(?![A-Za-z0-9_-])')
root = sys.argv[1]
for rel in sys.argv[2:]:
    path = os.path.join(root, rel)
    n = 0; hits = []
    with open(path, 'r', encoding='utf-8', errors='replace') as fh:
        for i, line in enumerate(fh, 1):
            n += 1
            c = (bool(PI_RUN.search(line)), bool(OUTCOME3.search(line)), bool(FORGE_OP.search(line)), bool(PIN.search(line)))
            if c[0] and c[1] and c[2]:
                try:
                    rec = json.loads(line)
                    ident = rec.get('id'); title = (rec.get('title') or '')[:140]; status = rec.get('status')
                except Exception:
                    ident = None; title = line[:140]; status = None
                hits.append({'line': i, 'id': ident, 'status': status, 'title': title, 'pin': c[3],
                             'pi_runs': sorted(set(PI_RUN.findall(line)))[:6],
                             'ops': sorted(set(FORGE_OP.findall(line)))[:4],
                             'outcomes': sorted(set(OUTCOME3.findall(line)))})
    print(json.dumps({'file': rel, 'records': n, 'records_with_pi-run+outcome+forge-op': len(hits), 'hits': hits}, indent=1))
