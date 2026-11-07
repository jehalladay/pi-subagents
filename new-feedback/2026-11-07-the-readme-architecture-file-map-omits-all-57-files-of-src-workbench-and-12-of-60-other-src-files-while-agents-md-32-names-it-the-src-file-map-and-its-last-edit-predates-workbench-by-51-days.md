# The README `## Architecture` file map omits all 57 files of `src/workbench/` and 12 of 60 other `src/` files, while `AGENTS.md:32` names it "the `src/` file map", and its last edit (2026-08-25) predates the first workbench commit (2026-10-15) by 51 days

**From:** shift-left-research-engineer seat (Library `shift_left/` program, Phase II domain D1 orchestration)
**Date:** 2026-11-07 (evidence window 05:40Z to 05:55Z for the verifier probe; this re-derivation 10:30Z to 11:10Z)
**`pi-subagents` revision:** `d7666a76f5618dff61140dff20dde6ea64967814` (package.json `"version": "0.20.0"`, committed 2026-11-07T01:52Z); re-checked at `origin/master` = `abab6d091b9271bb6af667f90c64b50318340bb8` (2026-11-07T09:18Z, 6 commits later)
**Library revision:** `b57c70d6547864ecc64459dcbf73f43912dd6267` (`shift_left/` corpus edition 2; the D1 report and its verifier verdicts live under `shift_left/evidence/`)
**Method:** read-only `git`, `find`, `grep`, `awk`, `comm` over the clone at `d7666a76f5`; the same commands re-run against `git show origin/master:README.md` and `git ls-tree -r origin/master src/workbench`. No host touched; no binary run. Every number below comes from these commands and is quoted with its command.
**Scope:** feedback about `pi-subagents` the repository (its contributor-facing documentation contract), not about the projects or workflows it was pointed at, and not about the workbench beads.
**Prior art:** none found. Checked `git fetch -q origin && git ls-tree --name-only origin/master new-feedback/ | grep -i -E 'readme|architecture|workbench|file-map|doc'` at `abab6d09`: 44 entries under `new-feedback/`, 10 grep hits, all of them census, refusal or timeout files that match on `doc-paths`/`docs09`; 0 files about the README or the file map. The clone under test read 6 commits behind `origin/master` (`git rev-list --count d7666a76..origin/master` = 6), all 6 docs-only (`docs(agents)`, `docs(skill)`, `docs(workbench)`, `docs(pi-bm)`), none touching `README.md`.
**Library analysis:** [D1-orchestration REPORT.md §7 F6](https://github.com/jehalladay/Library/blob/b57c70d6547864ecc64459dcbf73f43912dd6267/shift_left/evidence/20261107T0640Z-phase2-domain-reports/D1-orchestration/REPORT.md), [VERIFY-source.md row V5](https://github.com/jehalladay/Library/blob/b57c70d6547864ecc64459dcbf73f43912dd6267/shift_left/evidence/20261107T0640Z-phase2-domain-reports/D1-orchestration/VERIFY-source.md) (CONFIRMED, count corrected from "60+" to 57), and [synthesis contradictions.md row C45](https://github.com/jehalladay/Library/blob/b57c70d6547864ecc64459dcbf73f43912dd6267/shift_left/evidence/20261107T0725Z-phase2-synthesis/contradictions.md).

## Summary, with numbers

`AGENTS.md:32` tells a contributor that `README.md` holds "the `src/` file map (`## Architecture`)" and to "Read the file that covers a surface before changing its behavior; update it in the same change." At `d7666a76f5` the `## Architecture` block (`README.md:933-1005`) names 48 distinct `src/` TypeScript files; `find src -name '*.ts' | wc -l` reports 117. So 69 of 117 `src/` TypeScript files (59%) have no entry in the map that the repository's own rules call the `src/` file map. The 69 split into two classes: all 57 files of `src/workbench/` (18,540 lines; the hosts, capability registry, observation, reconcile and evidence code behind the "Experimental Workbench mode" the README advertises at `README.md:6`), and 12 of the 60 files outside `src/workbench/` (7 of them in `src/workflow/`, 2 in `src/ui/`, 3 at `src/` top level). The mechanism is drift, not a decision anyone recorded: the block's last substantive edit landed 2026-08-25 (`221df023`, the Workflow tool PR), `src/workbench/` first appeared 2026-10-15 (`43ad58b5`), and the one README commit since then (`7c80c343`, 2026-11-04) added 2 banner lines at the top and 0 lines to the map. The omission reproduces unchanged at `origin/master` `abab6d09` (STILL-TRUE). The D1 report graded this medium: a new contributor who follows `AGENTS.md` to the README cannot find the lifecycle, recovery or host code from there. The report's "60+" overstated the count; 57 is the number.

## Finding 1 — The `## Architecture` block contains 0 occurrences of `workbench` while `src/workbench/` holds 57 files — **CONFIRMED** (verifier V5 CONFIRMED; re-derived here at `d7666a76f5` and at `abab6d09`)

```
$ cd /Volumes/workplace/ShiftLeft/src/pi-subagents && git rev-parse HEAD
d7666a76f5618dff61140dff20dde6ea64967814
$ grep -n "^## Architecture" README.md
933:## Architecture
$ awk 'NR>=933 && /^```/{c++; if(c==2){print "closing fence at line " NR; exit}}' README.md
closing fence at line 1005
$ awk '/^## Architecture/{f=1} f && NR>1 && /^## / && !/^## Architecture/{exit} f{print}' README.md | grep -c workbench
0
$ find src/workbench -type f | wc -l
      57
$ ls src/workbench | wc -l
      53
$ find src/workbench -maxdepth 1 -name '*.ts' | wc -l
      51
$ ls src/workbench/hosts src/workbench/providers
src/workbench/hosts:
furnace-hosted.ts
local-detached.ts

src/workbench/providers:
forge.ts
furnace.ts
hyperunix.ts
reactivefiber.ts
$ cat $(find src/workbench -name '*.ts') | wc -l
   18540
$ ls -d src/*/
src/ui/
src/workbench/
src/workflow/
```

53 top-level entries = 51 `.ts` files + the `hosts/` and `providers/` directories (2 + 4 files), total 57. The block does list `src/workflow/` and `src/ui/`, the other two subdirectories of `src/`, so `src/workbench/` is the only `src/` subdirectory with no entry. The contract the block breaks is at `AGENTS.md:32` (same text at `origin/master`):

```
$ sed -n 32p AGENTS.md | cut -c1-200
| `README.md` | User-facing reference: features, install, tool parameter tables, commands, settings and defaults, the event table, the RPC channel list, and the `src/` file map (`## Architecture`).
```

Re-check at the fetched trunk tip, verdict **STILL-TRUE**:

```
$ git rev-parse origin/master
abab6d091b9271bb6af667f90c64b50318340bb8
$ git show origin/master:README.md | awk '/^## Architecture/{f=1} f && NR>1 && /^## / && !/^## Architecture/{exit} f{print}' | grep -c workbench
0
$ git ls-tree -r --name-only origin/master src/workbench | wc -l
      57
$ git show origin/master:AGENTS.md | grep -n 'src/. file map' | cut -c1-120
32:| `README.md` | User-facing reference: features, install, tool parameter tables, commands, settings and defaults, the
```

Armed control for the zero: the same `grep -c workbench` over the whole README returns 2 at `d7666a76f5` (`README.md:3` and `README.md:6`, the two blockquote banners) and 3 at `abab6d09`, so the instrument sees the word when it is present; the 0 belongs to the block.

## Finding 2 — The map also omits 12 of the 60 `src/` files outside `src/workbench/`, so 69 of 117 `src/` TypeScript files (59%) have no entry — **CONFIRMED** (re-derived here; not in the verifier's row, which measured only `src/workbench/`)

```
$ awk '/^## Architecture/{f=1} f && NR>1 && /^## / && !/^## Architecture/{exit} f{print}' README.md \
    | grep -o '[a-z-]*\.ts' | sort -u > /tmp/arch-names.txt
$ find src -name '*.ts' -not -path 'src/workbench/*' | xargs -n1 basename | sort -u > /tmp/src-names.txt
$ comm -12 /tmp/arch-names.txt /tmp/src-names.txt | wc -l        # names in both
      48
$ comm -23 /tmp/arch-names.txt /tmp/src-names.txt               # named in the map, absent from src
test.ts
$ comm -13 /tmp/arch-names.txt /tmp/src-names.txt               # in src, absent from the map
agent-dir.ts
collisions.ts
entry.ts
journal-compat.ts
journal.ts
json-schema.ts
reconcile.ts
saved.ts
structured-output.ts
workflow-inspector.ts
workflow-menu.ts
xml.ts
$ find src -name '*.ts' | wc -l
     117
$ find src -name '*.ts' -not -path 'src/workbench/*' | wc -l
      60
```

The one "map name absent from src", `test.ts`, is the suffix of `test/workflow-examples.test.ts` on the `examples/workflows/` line, a real file, so 48 of 48 `src/` names in the map resolve to files that exist at `d7666a76f5` (0 stale entries). The 12 unmapped non-workbench files, with paths:

| file | path |
|---|---|
| `agent-dir.ts` | `src/agent-dir.ts` |
| `structured-output.ts` | `src/structured-output.ts` |
| `xml.ts` | `src/xml.ts` |
| `collisions.ts` | `src/workflow/collisions.ts` |
| `entry.ts` | `src/workflow/entry.ts` |
| `journal-compat.ts` | `src/workflow/journal-compat.ts` |
| `journal.ts` | `src/workflow/journal.ts` |
| `json-schema.ts` | `src/workflow/json-schema.ts` |
| `reconcile.ts` | `src/workflow/reconcile.ts` |
| `saved.ts` | `src/workflow/saved.ts` |
| `workflow-inspector.ts` | `src/ui/workflow-inspector.ts` |
| `workflow-menu.ts` | `src/ui/workflow-menu.ts` |

Arithmetic: 57 + 12 = 69 unmapped of 117 (59%); 48 mapped of 117 (41%). Names were compared by basename, so a same-named file in two directories would collide; `sort -u` on the 60 non-workbench basenames returned 60, so no collision exists in this tree.

## Finding 3 — Mechanism: the map's last edit (2026-08-25) predates `src/workbench/` (first commit 2026-10-15) by 51 days, and the single README commit since then added banners, not map entries — **CONFIRMED**

```
$ git log --format='%h %cI %s' -S'workflow-dialog.ts' -- README.md | tail -1
221df023 2026-08-25T15:12:18+02:00 feat: Workflow tool - deterministic scripts that orchestrate many subagents (#236)
$ git log --diff-filter=A --format='%h %cI' --reverse -- src/workbench | head -1
43ad58b5 2026-10-15T04:02:03+00:00
$ git log -1 --format='%h %cI' -- src/workbench
1b5f5297 2026-10-31T19:14:21+00:00
$ git log --oneline --since=2026-10-15 -- README.md | wc -l
       1
$ git show --stat --format='%h %cI %s' 7c80c343 | sed -n 1,5p
7c80c343 2026-11-04T22:25:31-08:00 docs(workbench): audit and design Pi-MechanicalWorkflows function interoperability

 .agents/skills/pi-mechanical-interop/SKILL.md      | 35 ++++++++++
 AGENTS.md                                          |  4 ++
 README.md                                          |  2 +
$ sed -n 6p README.md | cut -c1-120
> **Experimental Workbench mode:** [Specifications and status ledger](docs/workbench/README.md). Set `"workbench": {"wor
```

`workflow-dialog.ts` is the last entry in the block; the commit that introduced it (`221df023`, 2026-08-25) is the latest commit that changed any entry text I probed. `src/workbench/` accumulated 57 files across 2026-10-15 to 2026-10-31 (16 days) with 1 README commit in the interval since 2026-10-15, and that commit (`7c80c343`) added 2 lines, both above the map. The README does announce the mode (`README.md:3` and `:6` link to `docs/workbench/`), which is why a reader learns the feature exists but not where its code lives.

## Finding 4 — No file under `docs/workbench/` carries a per-file map of `src/workbench/` either, so the omission has no compensating index — **PLAUSIBLE** (grep over path prefix and three file names; the 27 `docs/workbench/` entries were not read in full)

```
$ grep -c "src/workbench" docs/workbench/00-current-state-and-source-map.md docs/workbench/16-repository-refactor.md docs/workbench/README.md docs/workbench/03-architecture-and-ownership.md
docs/workbench/00-current-state-and-source-map.md:1
docs/workbench/16-repository-refactor.md:2
docs/workbench/README.md:0
docs/workbench/03-architecture-and-ownership.md:0
$ grep -rln "capability-registry.ts\|claude-host.ts\|reconcile-tool.ts" README.md AGENTS.md CONTRIBUTING.md docs/ | head -5
docs/workbench/feature-matrix.md
docs/workbench/TRACEABILITY.md
docs/workbench/00-current-state-and-source-map.md
docs/workbench/16-repository-refactor.md
docs/workbench/04-claude-agent-sdk-executor.md
```

The file whose name promises a source map (`00-current-state-and-source-map.md`) mentions `src/workbench` once (`:46`, a sentence about `claude-host.ts`, not a listing). Individual file names do appear in five `docs/workbench/` documents and in receipts, so the code is discoverable by full-text search, but I found no table or tree that enumerates the 57 files. A reader of the three documents I did not grep by name could prove me wrong; the artifact that would settle this is a read of all 27 `docs/workbench/` entries for a listing with 50 or more `src/workbench/` paths.

## Evidence

All commands above ran in `/Volumes/workplace/ShiftLeft/src/pi-subagents` (HEAD `d7666a76f5`) between 2026-11-07T10:30Z and 11:10Z, after `git fetch -q origin`. The independent verifier's probe (`VERIFY-source.md` V5, probe window 05:40Z to 05:55Z) recorded the same three facts: "`## Architecture` block contains 0 occurrences of "workbench"; `AGENTS.md:32` says README holds "the `src/` file map (`## Architecture`)". `find src/workbench -type f | wc -l` = 57 (not "60+"; 53 top-level entries)." The D1 report's original row said "60+ files"; the verifier corrected it and this file carries the corrected figure. The Library synthesis records the pair as contradiction C45 ("Omits `src/workbench/` (57 files incl. hosts, observation, reconcile)").

Counts at the two revisions:

| measure | `d7666a76f5` | `abab6d09` (origin/master) |
|---|---|---|
| `workbench` in `## Architecture` block | 0 | 0 |
| `workbench` in whole README | 2 (`:3`, `:6`) | 3 |
| files under `src/workbench/` | 57 | 57 |
| `AGENTS.md` line naming README the `src/` file map | 32 | 32 |

## Suggested fixes, cheapest first

1. **Add one `workbench/` entry to the block with a pointer.** A single line under `src/` such as `workbench/  # Experimental Workbench mode (57 files: hosts/, providers/, capability registry, observation, reconcile) — see docs/workbench/README.md` restores the property `AGENTS.md:32` promises (every `src/` subdirectory reachable from the map) at the cost of one line, and it keeps the experimental status the `README.md:6` banner already states. It does not fix Finding 2.
2. **Add the 12 missing non-workbench entries** (table in Finding 2) in their existing sections: 7 under `workflow/`, 2 under `ui/`, 3 at top level. Each is a one-line comment the way the other 48 are written.
3. **Guard the map with a test.** This repository already carries census-style tests (`ls test | grep -c -i workbench` = 470 files). A small vitest that diffs `find src -name '*.ts'` basenames against the names in the `## Architecture` fence, with an explicit allowlist for deliberate omissions, turns `AGENTS.md:32` from a sentence into a check; the current tree would red it with 69 names, which is the number to burn down.
4. **Or amend `AGENTS.md:32`** to say the map covers the upstream extension only and point workbench readers at a named `docs/workbench/` listing (which Finding 4 suggests would first have to be written). Pick 1 or 4, not neither; the defect is that the rule and the artifact disagree.

## Positives worth protecting

- **`AGENTS.md:32` states the contract in one checkable sentence.** "the `src/` file map (`## Architecture`)" plus the rule above the table ("Read the file that covers a surface before changing its behavior; update it in the same change") is what made this finding gradable at all; a vaguer rule would leave nothing to measure. A rewrite of `AGENTS.md` should keep a sentence that names the artifact and the section.
- **Every entry the map does carry resolves to a real file: 48 of 48 at `d7666a76f5`, 0 stale names** (`comm -23` in Finding 2 returned only `test.ts`, the suffix of a real file). The map is incomplete, not wrong; a fix that regenerates it should preserve the one-line-comment-per-file style, which is dense enough that 48 entries fit in 73 lines.
- **The README banners (`:3`, `:6`) do announce the Workbench mode and link to `docs/workbench/README.md`,** so the feature is discoverable from the top of the file even though its code is not. Keep the links when the map grows.

## What I did not establish

- Whether the omission is deliberate. `README.md:6` calls the mode "not a release-certified Workbench"; a maintainer may have chosen to keep experimental code out of the user-facing map. If so, `AGENTS.md:32` should say so (fix 4); nothing in either file records the choice.
- Whether any of the 27 entries under `docs/workbench/` holds a full per-file listing (Finding 4 rests on a prefix grep and three file names, not a read of each document).
- Whether the upstream repository (`tintinweb/pi-subagents`, which `AGENTS.md` cites for attribution links) has the same 12-file gap in its own README; I read only this fork.
- Anything about runtime behaviour. No `pi` binary ran; this is a documentation-contract finding, and the D1 report graded it medium for that reason.
- The verifier's probe 02 raw output lives in the Library at `shift_left/evidence/20261107T0640Z-phase2-domain-reports/D1-orchestration/evidence/verify-source/02-pi-subagents-symbols.txt`; I quoted its summary row and re-ran the commands, I did not diff the two outputs line by line.

## Postscript

This file lands on a feedback branch rather than `master`, following `new-feedback/README.md` ("Delivery is a one-file commit pushed to a branch the program owner lands; this repository's protected branches are not pushed to directly by feedback writers"). The GitHub API reports `master` as unprotected (`gh api repos/jehalladay/pi-subagents/branches/master --jq .protected` = `false`) at filing time, so the README's "protected" is a policy statement rather than a server setting; a reader who wants the server to enforce what the README says would turn protection on.
