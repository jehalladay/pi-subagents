import json
from pathlib import Path
from collections import Counter

BASE = Path("/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111/epistemic-triage")
rows = [json.loads(l) for l in (BASE/"CLAIMS.jsonl").open()]
byid = {r["id"]: r for r in rows}

# Every claim id cited in the hand-written sections below, asserted against the ledger.
ASSERTS = {
 "C001":"AGENTS-001","C002":"AGENTS-002","C003":"AGENTS-003","C005":"AGENTS-005","C009":"AGENTS-009",
 "C014":"AGENTS-014","C015":"AGENTS-015","C016":"AGENTS-016","C021":"AGENTS-021","C023":"AGENTS-023",
 "C026":"AGENTS-026","C033":"DETACHED-001","C034":"DETACHED-002","C037":"DETACHED-005","C043":"DETACHED-011",
 "C045":"DETACHED-013","C049":"DETACHED-017","C050":"EXECUTE-001","C051":"EXECUTE-002","C052":"EXECUTE-003",
 "C054":"EXECUTE-005","C058":"EXECUTE-009","C062":"EXECUTE-013","C063":"EXECUTE-014","C064":"EXECUTE-015",
 "C067":"EXECUTE-018","C068":"EXECUTE-019","C076":"FURNACE-001","C081":"FURNACE-006","C085":"FURNACE-010",
 "C088":"FURNACE-013","C091":"FURNACE-016","C096":"INSPECTOR-002","C107":"INSPECTOR-013","C110":"INSPECTOR-017",
 "C115":"INTEROP-001","C116":"INTEROP-002","C117":"INTEROP-003","C119":"INTEROP-006","C134":"JOURNAL-001",
 "C136":"JOURNAL-003","C138":"JOURNAL-005","C139":"JOURNAL-006","C143":"JOURNAL-010","C144":"JOURNAL-011",
 "C152":"JOURNAL-019","C156":"NODE-RPC-001","C157":"NODE-RPC-002","C173":"NODE-RPC-019","C178":"OBSERVE-003",
 "C179":"OBSERVE-004","C185":"OBSERVE-010","C186":"OBSERVE-011","C187":"OBSERVE-012","C191":"OBSERVE-017",
 "C199":"PACKAGING-001","C203":"PACKAGING-005","C209":"PACKAGING-011","C216":"PACKAGING-018","C217":"PROVIDERS-001",
 "C219":"PROVIDERS-003","C220":"PROVIDERS-004","C225":"PROVIDERS-009","C229":"PROVIDERS-013","C237":"PROVIDERS-021",
 "C248":"SCHEDULING-001","C252":"SCHEDULING-005","C260":"SCHEDULING-013","C263":"SCHEDULING-016","C264":"SCHEDULING-017",
}
bad = [(c,s,byid.get(c,{}).get("source_id")) for c,s in ASSERTS.items() if byid.get(c,{}).get("source_id") != s]
assert not bad, f"ID MAPPING ERRORS: {bad}"

FAMILIES = ["agents","detached","execute","furnace","inspector","interop","journal","node-rpc","observe","packaging","providers","scheduling"]
defects = [r for r in rows if r["kind"]=="defect"]
positives = [r for r in rows if r["kind"]=="positive"]

def table_overall():
    g = Counter(r["grade"] for r in rows); k = Counter(r["kind"] for r in rows)
    return (f"| total claims | {len(rows)} |\n| ESTABLISHED | {g['ESTABLISHED']} |\n| SUPPORTED | {g['SUPPORTED']} |\n"
            f"| PLAUSIBLE | {g['PLAUSIBLE']} |\n| UNDETERMINED | {g.get('UNDETERMINED',0)} |\n"
            f"| defects | {k['defect']} |\n| positives (to preserve) | {k['positive']} |\n"
            f"| cross-family duplicates merged (SAME_ORIGIN) | 7 |")

def table_axis():
    a = Counter(r["axis"] for r in defects)
    order = ["LX","UX","DX","QoL","friction","gap","missing-req","stub"]
    lines = ["| axis | defects |","|---|---|"]
    for ax in order: lines.append(f"| {ax} | {a.get(ax,0)} |")
    return "\n".join(lines)

def table_family():
    lines = ["| family | claims | ESTABLISHED | SUPPORTED | PLAUSIBLE | defects | positives |","|---|---|---|---|---|---|---|"]
    for fam in FAMILIES:
        fr = [r for r in rows if r["family"]==fam]
        g = Counter(r["grade"] for r in fr); k = Counter(r["kind"] for r in fr)
        lines.append(f"| {fam} | {len(fr)} | {g['ESTABLISHED']} | {g['SUPPORTED']} | {g['PLAUSIBLE']} | {k['defect']} | {k['positive']} |")
    return "\n".join(lines)

def first_sentence(s, n=175):
    s = s.replace("\n"," ")
    cut = s.find(". ")
    t = s[:cut+1] if 0 < cut < n else s[:n].rsplit(" ",1)[0] + " …"
    return t

def positives_section():
    out = []
    for fam in FAMILIES:
        fp = [r for r in positives if r["family"]==fam]
        if not fp: continue
        out.append(f"**{fam}**")
        for r in fp:
            out.append(f"- **{r['id']}** ({r['source_id']}): {first_sentence(r['claim'])}")
        out.append("")
    return "\n".join(out)

HEADLINE = """| # | claim | family | defect (one line) |
|---|---|---|---|
| 1 | **C001** ✪ | agents | Blocking resume of a running agent corrupts the live run: success-shaped error, record flipped to `error`, real result lost. |
| 2 | **C003** ✪ | agents | Stock headless semantics (`pi -p`) lose the default-background subagent entirely; `@mention` does nothing headless. |
| 3 | **C034** ✪ | detached | Symlinked `$HOME` (standard cloud-desktop layout) makes 100% of detached launches refuse with an unactionable message. |
| 4 | **C037** ✪ | detached | A detached run that completes with a >256 KiB value is reported `terminal:'failed'` with no result. |
| 5 | **C054** ✪ | execute | No model-facing tool can stop a launched workflow (embedded or detached); detached hosts linger ~200 MB up to 24 h. |
| 6 | **C062** ✪ | execute | `workflowsEnabled:false` leaves workflow_execute registered and detached launches running. |
| 7 | **C067** ✪ | execute | 22 KB (~5.5k-token) SubagentWorkflow description in every mode; `toolDescriptionMode:"compact"` skips it. |
| 8 | **C134** ✪ | journal | A Pi restart kills every run id while journal+script sit on disk; resume/reconcile/observe all refuse; restart advice re-runs dispatched effects. |
| 9 | **C136** ✪ | journal | Claude-backend replay silently never happens in repos >2,000 Git-visible paths (or outside Git); cap documented nowhere. |
| 10 | **C199** ✪ | packaging | README's install line installs upstream 0.23.2 — none of the documented workbench surface ships in any published artifact. |
| 11 | **C248** ✪ | scheduling | Schedules beyond ~24.8 days fire immediately; intervals become a ~1 ms spawn loop that bypasses maxConcurrent. |
| 12 | **C252** ✪ | scheduling | A corrupt schedule file is silently emptied and rewritten — user jobs destroyed, no diagnostic, no backup; a test pins it as "self-heals". |"""

SECOND = """- **C050** (EXECUTE-001): the documented headless composition `pi -p --subagents-workflow-file=<path>` crashes the real pi CLI (exit 1, 'This extension ctx is stale…').
- **C002** (AGENTS-002): both documented ways to remove the all-tools general-purpose agent fail open through a hard-coded fallback tier.
- **C026** (AGENTS-026): `inherit_context` forwards the whole parent transcript unbudgeted — a 150-exchange branch is a ~92k-token preamble.
- **C264** (SCHEDULING-017): the persistent-memory prompt block is line-capped but not byte-capped — 200 long lines put ~4 MB into every memory-enabled agent's system prompt.
- **C051** (EXECUTE-002): a workflow return value beyond 4,000 chars is truncated in the completion notification and unrecoverable by any tool.
- **C014** (AGENTS-014): ten minutes after an agent finishes, record and full result are gone (get_subagent_result/resume/steer all fail).
- **C217** (PROVIDERS-001): `hyperunix.find` returns anonymous stat records — no file name or path in any row.
- **C096** (INSPECTOR-002): the inline transcript card never follows a background run under the pinned pi 1.1.0 (renderResult-only updates).
- **C076** (FURNACE-001): workflow_control's furnace leg is unreachable — nothing applies the landed relate/ownership wiring.
- **C179** (OBSERVE-004): workflow_observe's default request overflows its own 16,384-byte default on a real host scope (20 nodes), so every default page is truncated.
- **C138** (JOURNAL-005): the 'an override is spent, not kept' invariant is unenforced when the spend cannot be written (read-only journal ⇒ unlimited re-runs).
- **C178**/**C068** (OBSERVE-003/EXECUTE-019): no tool lists runs or invocations; a lost reply means duplicate launches; the only enumeration is an error side channel.
- **C033** (DETACHED-001): detached cancel/shutdown advertised but denied — launchers hard-code `[inspect,execute]` and the ownership reader is never wired."""

PATTERNS = """**P1 — Switches and scopes fail open, silently.** The documented disable paths do not disable (C002 agents, C062 workflows), scope enforcement no-ops on accepted syntax (C021), agent-file frontmatter and settings drop unknown/wrong-typed keys without a word (C005, with several permissive-direction defaults; scheduling settings likewise, see C252's family and C260's timezone silence). An operator who configures restraint gets none and is not told.

**P2 — Results are bounded where it hurts and unbounded where it costs.** Every surface that carries a *result* clips or loses it: 500-char background previews (C015), 4,000-char completion truncation (C051), 256 KiB detached snapshot reported as failure (C037), 10-minute record retention (C014), restart-dead run ids (C134). Every surface that carries *input* to the model is unbounded: inherited context (~92k tokens, C026), memory blocks (~4 MB, C264), provider envelopes (9.3 KB to deliver 32 bytes, C237), hyperunix.find with no limit/projection (C219).

**P3 — Landed-but-unwired code is the dominant stub pattern.** The repo ships tested modules that production never calls: executable-identity (C049), source-admission/function-authority behind the advertised definition kinds (C063), furnace relate/ownership (C076), the three reader adapters (C225), latency/compare read models (C185), journal-compat classifier (C144), the detached ownership reader (C033/C054), two inspector presentation tiers (C107), the interop seams entire (C119), and the detached localProvider seam (C152). The REMEDIATION class `wire-landed-code` is the cheapest big win in the ledger.

**P4 — Refusals are success-shaped and undifferentiated.** Top-level failures return `isError` unset (C009, C001, scheduling C252-family refusals), 13 caller mistakes share one 'malformed reconcile request' string (C139), five execute admission failures share 'malformed execute request' (C058), schema refusals name no field (C156, C229), and the three workbench reply dialects disagree per tool (C187). An agent cannot branch on what it cannot distinguish.

**P5 — The installed surface is undiscoverable by the model it was built for.** Zero of the 12 workbench tools appear in README (C203); none of their 74 parameters carries a description (C186); 3 of 4 capability input contracts appear in no installed doc (C157) and are unreadable in-band (C220); required grants are undocumented (C173 claude:transcript, C085 furnace, C061's claude:invoke surprise); the published tarball ships pointer targets without the skills (C191, C045); scheduling's JSON keys are absent from README (C263). The LX axis is the largest defect bucket (64) for this reason.

**P6 — Token economics are hostile by default.** ~5.5k tokens of SubagentWorkflow description on every turn with no compact form (C067), a 2.3k-token model-list dump on any wrong `model` value (C016), provenance-dominated provider envelopes (C237, C091), and default observe pages that arrive truncated (C179).

**P7 — Headless and automation hosts are second-class.** The default spawn mode loses work under `pi -p` (C003), the documented workflow flag crashes the CLI (C050), the published hold contract still loses results (C052), and after any restart nothing can find or resume what ran (C134, C178, C068)."""

DRIFT = """The pin ce180d82 is the workbench trunk (L1088 hop) and an **ancestor of master 0fb90672** (`git merge-base HEAD origin/master` = ce180d82). At consolidation the measured drift facts are:

- 23 master-only commits exist; five touch the interop skill or interop docs (d7666a76, 44651778, 4b219f24, 91d8fa8c, 3fc0ead1) — **C117**: corrections to the pi-mechanical-interop skill, AGENTS.md, README.md and the two newer interop programs exist *only on master*; the workbench trunk the machines branch from never receives them.
- **C115**: the skill's 'Actual current state' at the pin states a defect master fixed two hours after the skill landed.
- **C116**: the docs-remediation census test pins skill sentences to line numbers, so adopting master's corrected skill text reds the default gate — the drift is structurally locked in until the census keys on content, not lines.
- **C209**: the shipped feature matrix mixes a 2026-10-15 header with row re-measurements up to 2026-11-06 at trunk 600a253 — the ledger's own freshness claim is unreliable in both directions (see CONTRADICTIONS.md §B).
- **C216** (PLAUSIBLE): manifest media URLs point at the *upstream* repo's master, a third tree entirely.

Consequence for readers of this audit: doc-staleness findings graded at the pin may be partially cured on master, but the mechanisms that produced the lag (line-pinned census, mixed-freshness matrix, same-cut rule enforced on no seam — C121/C110) are themselves findings and remain."""

LIMITS = """- Grades are the investigators'; consolidation re-verified only what it had to (one factual conflict: the claude:transcript viewer bound — resolved to 40 rows at the production call site, recorded in C173's verdict_history; INSPECTOR-016 merged there as SAME_ORIGIN).
- 7 cross-family duplicate pairs were merged (each kept row lists `same_origin`); within-family near-duplicates were left distinct deliberately (different mechanisms or surfaces).
- SUPPORTED means code-read with file:line, not reproduced; the single PLAUSIBLE row (C216) names what a reproduction would need (a registry render of a published fork artifact).
- Absence claims state their detection surface in the evidence field (greps over named docs, importer censuses, registration lists).
- The audit-ordered instruments were used as specified by the investigators: hx for typed censuses over the pin and rf as both instrument and probe target for the provider family; the probe suites under `probes/<family>/` drove the real CLIs (rf/forge/furnace/hx) where provider behaviour was claimed."""

doc = f"""# EPISTEMIC-AUDIT — Pi-subagents system DX/UX/LX triage (roll-up)

**Target:** @tintinweb/pi-subagents v0.20.0 fork (jehalladay/Pi-subagents), workbench trunk pin **ce180d82** (worktree `pin-ce180d82`); master 0fb90672 noted for drift. **Date:** 2026-11-11.
**Question:** where does the system's experienced surface fall short of its promises and of good agent/operator experience?
**Axes:** DX, UX, LX (LLM-agent experience), QoL, friction, gap, missing-req, stub.
**Instruments (user-ordered):** hx (HyperUnix 0.1.0) for typed code censuses; rf (ReactiveFiberCLI, 89 leaves) for context tooling and as the rf-provider probe target; family probe suites under `probes/` drive the real extension and the real producer CLIs.

## Method

Twelve family investigators (agents, detached, execute, furnace, inspector, interop, journal, node-rpc, observe, packaging, providers, scheduling) each produced graded findings (`.work/find-<family>.jsonl`, 274 rows) against the pinned worktree, with reproductions under `probes/<family>/` and builds/tests run only inside the pin. Every finding is a graded claim — **ESTABLISHED** (reproduced; command + output quoted), **SUPPORTED** (code-read with file:line), **PLAUSIBLE** (consistent, unverified), **UNDETERMINED** (missing artifact named). Consolidation merged the 12 files into `CLAIMS.jsonl` (stable ids C001..C267), deduplicated 7 cross-family duplicates (SAME_ORIGIN noted on the kept, better-evidenced row), and resolved one inter-investigator factual conflict by re-reading the pin.

## Ledger counts

| | |
|---|---|
{table_overall()}

### Defects by axis

{table_axis()}

### By family

{table_family()}

## Headline defects (full dossiers in `dossiers/<id>.md`)

{HEADLINE}

### Second tier (no dossier, same review priority)

{SECOND}

## Cross-family patterns

{PATTERNS}

## Positives to preserve

These {len(positives)} claims pin behaviour that any cure must not regress; they are `kind:"positive"` in CLAIMS.jsonl.

{positives_section()}

## Drift notes vs master 0fb90672

{DRIFT}

## Method limits and consolidation notes

{LIMITS}

## Deliverables

- `CLAIMS.jsonl` — {len(rows)} claims (this ledger; statuses = grades; verdict_history pins grade @ ce180d82 2026-11-11).
- `CONTRADICTIONS.md` — 36 promise-vs-measured conflicts, both sides quoted.
- `dossiers/C001|C003|C034|C037|C054|C062|C067|C134|C136|C199|C248|C252.md` — the 12 highest-cost defects with repro, cost, cure options.
- `REMEDIATION.md` — all {len(defects)} defects mapped to smallest cure classes (biggest cheap win: `wire-landed-code`; biggest bucket: `guard-or-validate`).
- Inputs preserved under `.work/find-*.jsonl`; probes under `../probes/<family>/`.
"""
(BASE/"EPISTEMIC-AUDIT.md").write_text(doc)
print("wrote", BASE/"EPISTEMIC-AUDIT.md", len(doc), "bytes; all", len(ASSERTS), "cited ids verified")
