import json, re
from pathlib import Path
from collections import Counter, defaultdict

BASE = Path("/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111/epistemic-triage")
rows = [json.loads(l) for l in (BASE/"CLAIMS.jsonl").open()]
defects = [r for r in rows if r["kind"] == "defect"]
DOSSIERS = {"C001","C003","C034","C037","C054","C062","C067","C134","C136","C199","C248","C252"}

RULES = [
    ("wire-landed-code",      r"wire|applyDetachedReading|importer|register the landed|landed .*(apply|register|call)|closes wb-79k"),
    ("guard-or-validate",     r"refuse|reject|validat|guard|hoist|clamp|\bcap\b|bound\b|precondition|check .{0,40}before|gate |enforce"),
    ("small-code-fix",        r"keep terminal|do not (flip|reclassify)|fall ?back|realpath|rename the file|\bfix\b|set isError|\bhash\b|atomic|stop |correct the|await|hold the turn|resolve|derive|chain setTimeout|spill|unref|pause|apply .{0,30}(width|cap)|pass (the )?width|use the"),
    ("new-surface",           r"add (a |an )?.{0,24}(tool|verb|action|flag|setting|option|knob|subcommand|cursor|paging|pagination|list(ing)?|enumerat)|new (tool|verb|setting|action)|expose|introduce"),
    ("perf-or-resource",      r"cache|pool|reuse|keep.?alive|persistent server|lazy"),
    ("tool-spec-text",        r"description|schema|param(eter)? (text|description)|guideline|tool spec|compact|advertise"),
    ("reply-or-refusal-text", r"message|wording|refusal text|reply|say so|say |name the|names the|naming|toast|notify|hint|print"),
    ("packaging-or-ci",       r"package\.json|npmignore|prepack|publish|tarball|files allowlist|node-version|ci\.yml"),
    ("test-or-fixture",       r"\btest\b|\btier\b|fixture|bench"),
    ("docs-fix",              r"readme|docs/|document|changelog|agents\.md|matrix|skill|note"),
]

def classify(hint: str) -> str:
    for name, pat in RULES:
        if re.search(pat, hint, re.I):
            return name
    return "design-rework"

def esc(s: str, n: int) -> str:
    s = s.replace("|", "\\|").replace("\n", " ")
    if len(s) > n:
        s = s[:n].rsplit(" ", 1)[0] + " …"
    return s

by_class = defaultdict(list)
for r in defects:
    by_class[classify(r["cureHint"])].append(r)

CLASS_DESC = {
    "docs-fix":              "Correct or add shipped text only (README, docs/, feature-matrix, CHANGELOG, skill); no code change.",
    "tool-spec-text":        "Change what the model reads: tool descriptions, parameter schemas/descriptions, guidelines.",
    "reply-or-refusal-text": "Reword a reply, refusal, diagnostic or notification so it is actionable; no behavioural change.",
    "guard-or-validate":     "Add or hoist a small refusal/validation/bound where behaviour is currently silent or fail-open.",
    "small-code-fix":        "A localized behavioural fix (keep a true status, fall back to on-disk state, realpath, atomic write, correct a count).",
    "wire-landed-code":      "Code already landed and tested; add the missing caller/registration/ingestion so it is reachable.",
    "new-surface":           "A small new verb/flag/setting/listing or paging surface that the journey lacks.",
    "perf-or-resource":      "Cache, pool or lifecycle change to cut latency or resident cost.",
    "packaging-or-ci":       "package.json/.npmignore/CI/publish pipeline change.",
    "test-or-fixture":       "Add or fix tests/fixtures/benches (gate truthfulness).",
    "design-rework":         "Needs a scoped design decision; no one-line cure.",
}

order = [c for c, _ in RULES] + ["design-rework"]
lines = []
lines.append("# REMEDIATION — defect -> smallest cure class")
lines.append("")
lines.append("Pin ce180d82, consolidated 2026-11-11. One row per defect claim in CLAIMS.jsonl (224 defects; the 43 positives are excluded). ")
lines.append("The *class* is derived from the investigator's `cureHint` (keyword rules, reviewed at consolidation); the **smallest cure** column carries the investigator's own cure text, which is authoritative where the class is coarse. Ids marked ✪ have a full dossier in `dossiers/<id>.md`.")
lines.append("")
lines.append("## Cure-class summary")
lines.append("")
lines.append("| cure class | defects | meaning |")
lines.append("|---|---|---|")
for c in order:
    if by_class.get(c):
        lines.append(f"| {c} | {len(by_class[c])} | {CLASS_DESC[c]} |")
lines.append("")
for c in order:
    group = by_class.get(c, [])
    if not group:
        continue
    lines.append(f"## {c} ({len(group)})")
    lines.append("")
    lines.append("| claim | source | axis | grade | smallest cure (investigator cureHint) |")
    lines.append("|---|---|---|---|---|")
    for r in sorted(group, key=lambda x: x["id"]):
        mark = " ✪" if r["id"] in DOSSIERS else ""
        lines.append(f"| {r['id']}{mark} | {r['source_id']} | {r['axis']} | {r['grade'][:3]} | {esc(r['cureHint'], 230)} |")
    lines.append("")

(BASE/"REMEDIATION.md").write_text("\n".join(lines) + "\n")
print("wrote", BASE/"REMEDIATION.md")
print("class distribution:", {c: len(by_class[c]) for c in order if by_class.get(c)})
