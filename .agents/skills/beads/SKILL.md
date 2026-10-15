---
name: beads
description: Use when working in a repository that uses bd or Beads for durable task tracking, issue dependencies, blocker management, multi-session handoff, or shared work memory. Trigger when the user asks to find ready work, claim or close tasks, create follow-up work, inspect blockers, recover project context, run a molecule or formula workflow, sync issue data between machines, or choose between local planning and persistent project tracking.
---

# Beads

Beads (`bd`) is a dependency-aware issue tracker that doubles as durable memory for
agents. Every unit of work is a **bead** with an id, a status, and typed edges to other
beads. Because the graph is stored in a database rather than in your context window, it
survives compaction, session death, and handoff to a different agent.

Treat Beads as the project's source of truth for work. Local plans, scratch files, and
your own notes are fine for the current turn; they are not shared state.

## Orientation (run this first)

```bash
bd prime          # AI-optimized context dump: what this repo is, what's ready, what's yours
bd where          # which .beads workspace is actually active (resolves redirects)
```

If `bd prime` prints nothing, there is probably no active workspace — `bd where` tells you
that, and `bd doctor` diagnoses a broken one. Beads resolution is **CWD-dependent**: it
walks up from the current directory to find `.beads`, so the same command in two
directories can address two different databases. When in doubt, confirm with `bd where`
before trusting a result.

## The core loop

This is the 90% path. Everything else is a specialization of it.

```bash
bd ready                                  # work with no unresolved blockers
bd show <id>                              # ALWAYS read before you act
bd update <id> --claim                    # atomic claim; prevents two agents colliding
# ...do the work...
bd close <id> --reason "what changed"      # a reason is how the next agent learns why
```

When the work reveals more work, file it instead of remembering it:

```bash
bd create "Short imperative title" \
  --description="Why this exists and what done looks like" \
  --type=task --priority=2
```

Filing discovered work is the single highest-value habit. Work described only in your
context is lost at the next compaction; work in Beads is not.

## What belongs in Beads

Put in Beads anything another agent or human must be able to resume: shared tasks,
blockers and dependencies, discovered follow-up work, decisions with rationale, and
status that outlives your session. Keep in your own scratch space only the execution
checklist for the current turn.

Do not create markdown TODO files as the source of truth when Beads is available. They
drift immediately and nothing else reads them.

## Working with the graph

Beads' distinguishing feature is typed dependencies, which is what makes `bd ready`
meaningful — it hides anything still blocked.

```bash
bd dep add <dependent> <blocker>   # NOTE the order; see the gotcha below
bd dep tree <id>                   # full hierarchy under a bead
bd blocked                         # everything currently blocked, and by what
```

Dependency types: `blocks` (sequencing), `parent-child` (hierarchy), `conditional-blocks`
(runs only if the other FAILS), `waits-for` (fan-in on dynamic children). Non-blocking
relations: `related`, `discovered-from`, `replies-to`.

**The dependency argument order inverts temporally.** "Phase 2 needs Phase 1" is
`bd dep add phase2 phase1` — the dependent comes first. Getting this backwards silently
builds a graph that blocks the wrong thing, and nothing errors.

## Machine-readable output

Almost every read command takes `--json`, and you should use it whenever you are parsing
rather than reading:

```bash
bd list --status=open --json
bd show <id> --json
```

Two traps worth internalizing:

- `bd ... --json | jq length` counts **object keys**, not results. An error envelope and
  an empty result set are both small objects, so both can report the same "length".
  Check that you have an array before you count it.
- Piping through `head`/`tail` truncates rows *and* replaces the exit code with the
  pager's. If a row count exactly equals your limit, assume truncation rather than a
  real total.

## Status vocabulary

Statuses in use are `open`, `in_progress`, `hooked`, `closed`, and `deferred`. Do not
assume `open` means "all live work" — in orchestrated setups (Gas Town, Gas City) active
work is frequently `hooked`, and `deferred` beads are invisible to most default filters.
Enumerate what a database actually uses before filtering on any single value:

```bash
bd statuses                        # valid statuses
bd count --status=hooked --json    # confirm before you trust a zero
```

A query that returns zero can mean "nothing matches" or "I filtered on the wrong
dimension". Those are different facts.

## Wisps and molecules

A **wisp** is an ephemeral bead used for high-frequency orchestration work; wisps live in
their own tables and are never synced. A **molecule** is a multi-step workflow instantiated
from a **formula** (a TOML template): `bd cook` freezes a formula into a proto, then
`bd mol pour` instantiates it. Steps may be materialized as child beads, or read inline
from the formula at prime time.

Wisps are a separate storage surface, which produces a specific and very confusing
failure: **`bd list` does not see wisps.** `bd list --id <wisp-id>` returns a
type-correct empty result for a wisp that `bd show <wisp-id>` resolves perfectly. If a
lookup comes back empty for something you know exists, you are probably querying the
wrong table — use `bd show`.

Full molecule and formula surface: `references/molecules-formulas.md`.

## Safety

Beads has genuinely destructive commands. Before running anything that deletes,
squashes, purges, or rewrites history, check the reference section for that command and
prefer `--dry-run` where it exists.

```bash
bd --readonly <anything>   # default-deny sandbox: refuses every non-read command
```

`--readonly` is default-deny, so an unclassified or newly-added command is refused rather
than silently permitted. Use it when you only intend to look.

The commands to slow down on are `bd delete`, `bd prune`, `bd purge`, `bd flatten`,
`bd gc`, `bd compact`, `bd sql` (raw SQL, no guardrail), `bd dolt killall`,
`bd import` (can overwrite), and `bd restore` / `bd backup restore`. Details and
whether each has a dry-run are in the reference sections.

## Rules

- Read `bd show <id>` before mutating a bead. Acting on a stale summary is how agents
  close the wrong work.
- Do not use `bd edit` — it opens an interactive editor and will hang a non-interactive
  agent. Use `bd update` with flags.
- Do not auto-close work unless it is genuinely complete. A closed bead is a claim that
  the work is done, and other agents rely on it.
- Record findings on the bead (`bd update <id> --notes=...`) *before* your session ends,
  not after. There is no "after".
- File discovered bugs with `bd create`; do not silently fix things outside your task.
- Prefer `--json` for anything you parse, and type-check the envelope.
- `bd dolt push` / `bd dolt pull` are the issue-data sync path. `bd export` / `bd import`
  are not a routine git workflow.

## Complete command reference

All 225 commands are documented with every flag, real usage examples, and verified
gotchas, grouped by area:

| Area | File |
|------|------|
| Creating, reading, updating, closing beads | `references/core-issue-lifecycle.md` |
| Finding work: ready, list, query, search, counts | `references/finding-work.md` |
| Dependencies, epics, graphs, duplicates | `references/dependencies-structure.md` |
| Molecules, formulas, gates, merge slots | `references/molecules-formulas.md` |
| Views, reports, history, lint, preflight | `references/views-reports.md` |
| Setup, init, config, doctor, hooks, prime | `references/setup-onboarding.md` |
| Memory, key-value store, audit, metrics | `references/memory-kv-audit.md` |
| Sync, export/import, Dolt, federation, repos, VC | `references/sync-data-vc.md` |
| Maintenance, compaction, GC, migration, batch | `references/maintenance.md` |
| Jira, Linear, GitHub, GitLab, ADO, Notion | `references/integrations.md` |

Every command also self-documents: `bd <command> --help` is authoritative for the binary
you actually have installed, and should win over any document — including this one — if
they ever disagree.
