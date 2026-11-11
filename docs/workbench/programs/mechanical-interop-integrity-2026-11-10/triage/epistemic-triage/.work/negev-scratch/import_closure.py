#!/usr/bin/env python3
"""Transitive import closure of a TypeScript entry over a tracked source tree (static import/export-from, dynamic import(),
require(), import-equals; relative specifiers only), to give 'not transitively wired' an exhaustive detection surface.
Read-only: lists files with git ls-files and reads them."""
import re, subprocess, sys, os, json
root, entry = sys.argv[1], sys.argv[2]
targets = sys.argv[3:]
files = subprocess.run(["git","-C",root,"ls-files","-z","--","src"],capture_output=True,check=True).stdout.split(b"\0")
files = sorted(f.decode() for f in files if f)
fileset = set(files)
SPEC = re.compile(r'''(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)(["'`])(\.{1,2}/[^"'`]+)\1''')
def strip_comments(text):
    # remove block comments and line comments (naive but adequate: specifiers inside comments must not count)
    text = re.sub(r'/\*[\s\S]*?\*/', lambda m: re.sub(r'[^\n]', ' ', m.group(0)), text)
    text = re.sub(r'(^|[^:"\'`])//[^\n]*', lambda m: m.group(1), text)
    return text
def resolve(frm, spec):
    base = os.path.normpath(os.path.join(os.path.dirname(frm), spec))
    cands = []
    if base.endswith(".js"): cands += [base[:-3]+".ts", base[:-3]+".tsx", base]
    if base.endswith(".mjs"): cands += [base[:-4]+".mts", base]
    cands += [base, base+".ts", base+".tsx", base+"/index.ts"]
    for c in cands:
        if c in fileset: return c
    return None
edges = {}; unresolved = {}
for f in files:
    if not f.endswith((".ts",".tsx",".js",".mjs")): continue
    text = strip_comments(open(os.path.join(root,f),encoding="utf-8",errors="replace").read())
    outs = set()
    for m in SPEC.finditer(text):
        r = resolve(f, m.group(2))
        if r: outs.add(r)
        else: unresolved.setdefault(f, []).append(m.group(2))
    edges[f] = outs
seen = set(); stack = [entry]
while stack:
    n = stack.pop()
    if n in seen: continue
    seen.add(n); stack.extend(edges.get(n, ()))
importers = {t: sorted(f for f, outs in edges.items() if t in outs) for t in targets}
print(json.dumps({
 "root": root, "entry": entry, "src_files": len(files), "modules_scanned": len(edges), "reachable_from_entry": len(seen),
 "targets": {t: {"tracked": t in fileset, "reachable_from_entry": t in seen, "direct_importers_in_src": importers[t]} for t in targets},
 "unreachable_modules": sorted(set(edges) - seen),
 "unresolved_relative_specifiers": unresolved,
}, indent=1))
