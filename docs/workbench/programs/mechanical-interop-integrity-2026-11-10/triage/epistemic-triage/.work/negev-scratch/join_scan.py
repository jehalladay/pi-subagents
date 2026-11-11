#!/usr/bin/env python3
"""Negative-evidence probe (lens negative-ev): file-level co-occurrence of the four EAT-R080 join components
(pi-run wf_*, Mechanical outcome token, Forge operation op-<32hex>, source pin) over every tracked file of a pin.
File-level co-occurrence is a SUPERSET of entry-level joins, so zero file-level hits in a store entails zero entry-level joins there.
Read-only: lists files with `git ls-files`, reads bytes, writes nothing."""
import re, subprocess, sys, os, json

PI_RUN = re.compile(r'(?<![A-Za-z0-9_-])wf_[a-z0-9-]{6,}(?![A-Za-z0-9_-])')
OUTCOME = re.compile(r'(?<![A-Za-z0-9_])(?:verified_candidate|verification_failed|needs_evidence|indeterminate)(?![A-Za-z0-9_])')
OUTCOME3 = re.compile(r'(?<![A-Za-z0-9_])(?:verified_candidate|verification_failed|needs_evidence)(?![A-Za-z0-9_])')
FORGE_OP = re.compile(r'(?<![A-Za-z0-9_-])op-[0-9a-f]{32}(?![A-Za-z0-9_-])')
PIN = re.compile(r'(?<![A-Za-z0-9_-])(?=[0-9a-f]{0,39}[0-9])(?=[0-9a-f]{0,39}[a-f])[0-9a-f]{7,40}(?![A-Za-z0-9_-])')
CLAUDE_SESSION = re.compile(r'(?<![0-9a-f-])[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?![0-9a-f-])')

def main(root):
    files = subprocess.run(['git', '-C', root, 'ls-files', '-z'], capture_output=True, check=True).stdout.split(b'\0')
    files = [f.decode('utf-8', 'surrogateescape') for f in files if f]
    rows = []
    counts = {'files': 0, 'binary_or_unreadable': 0}
    for rel in files:
        path = os.path.join(root, rel)
        try:
            with open(path, 'rb') as fh:
                raw = fh.read()
        except OSError:
            counts['binary_or_unreadable'] += 1
            continue
        if b'\0' in raw[:8192]:
            counts['binary_or_unreadable'] += 1
            continue
        counts['files'] += 1
        text = raw.decode('utf-8', 'replace')
        comp = {
            'pi-run': bool(PI_RUN.search(text)),
            'outcome': bool(OUTCOME3.search(text)),
            'outcome4': bool(OUTCOME.search(text)),
            'forge-op': bool(FORGE_OP.search(text)),
            'pin': bool(PIN.search(text)),
            'uuid': bool(CLAUDE_SESSION.search(text)),
        }
        rows.append((rel, comp))
    def sel(*keys):
        return [rel for rel, c in rows if all(c[k] for k in keys)]
    out = {
        'root': root,
        'counts': counts,
        'with_pi_run': len(sel('pi-run')),
        'with_outcome': len(sel('outcome')),
        'with_forge_op': len(sel('forge-op')),
        'pi_run+forge_op': sel('pi-run', 'forge-op'),
        'pi_run+outcome': sel('pi-run', 'outcome'),
        'forge_op+outcome': sel('forge-op', 'outcome'),
        'all_four(pi-run,outcome,forge-op,pin)': sel('pi-run', 'outcome', 'forge-op', 'pin'),
        'forge_op_files': sel('forge-op'),
    }
    print(json.dumps(out, indent=1))

if __name__ == '__main__':
    main(sys.argv[1])
