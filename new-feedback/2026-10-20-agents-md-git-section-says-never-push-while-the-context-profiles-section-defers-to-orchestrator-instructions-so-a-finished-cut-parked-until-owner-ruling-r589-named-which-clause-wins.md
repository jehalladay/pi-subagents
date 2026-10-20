# AGENTS.md's Git section says "Never push" while its Agent Context Profiles section defers to orchestrator instructions — so a finished machine cut (wb-64x) parked unpushed until owner ruling R589 named which clause wins

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-20
**`pi-subagents` revision:** trunk `workbench/implementation-program` at `ba3e4ff` (landing 168); the clauses quoted below are byte-identical at `9c625d0` (the parked cut's red base) and `aa34b71` (its delivery base).
**Method:** read `AGENTS.md` at `ba3e4ff` (`git show ba3e4ff:AGENTS.md | sed -n '60,64p;193,200p'`); read the machine's record of the park (the wb-64x seat's delivery-time statement, the owner's ruling R589-owner of 2026-10-20T05:1xZ, and the machine's standing rule 18 that quotes it).
**Scope:** feedback about the `pi-subagents` repository's agent instruction file as a tool agents run under, not about the workbench code and not about the machine's own rules.
**Prior art:** none in `new-feedback/` at the fetched trunk on AGENTS.md or push authorization; checked `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` (6 entries: 5 feedback files plus `README.md`, none on this theme).

## Summary, with numbers

Two sections of `AGENTS.md` give opposite answers to "may a machine seat push its finished cut to its own `machine/flywheel/<bead>` branch". The Git section (`:62-63`) says never, unconditionally. The Agent Context Profiles section says the managed block is "not permission to override repository, user, or orchestrator instructions" (`:195`) and that the conservative default applies "unless active instructions say otherwise" (`:198`); `:203` adds that the block is "subordinate to explicit user, repository, and orchestrator instructions". A seat holding a finished, gate-ready cut for wb-64x read `:62-63`, parked the cut unpushed, and reported it; the cut waited until the rig owner ruled (R589-owner, bound 2026-10-20T04:35:10Z) that `:195-199` governs and machine-branch pushes are the program's explicit authorization. Cost: one finished cut idle for one owner round trip, one ruling, and one new standing rule (18) in the machine's dispatch text to pre-empt the next seat. 1 of the window's 15 deliveries hit it; no other seat recorded an AGENTS.md-reason park (the ledger records parks, not readings).

## Finding 1 — the two clauses, verbatim — **CONFIRMED**

`AGENTS.md` at `ba3e4ff`:

```
:60  ## Git
:61
:62  - **Never commit.** The user commits manually. At most, suggest a concise commit message as text.
:63  - **Never push**, tag, or create branches unless the user explicitly asks.
:64  - Never run history- or worktree-destroying commands: `git reset --hard`, `git checkout .`, `git clean -fd`, `git stash`, `git add -A`, `git add .`, `git commit --no-verify`, or any force push.
```

```
:193 ## Agent Context Profiles
:194
:195 The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.
:196
:197 - **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
:198 - **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
:199 - **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.
```

`:63` has no "unless active instructions say otherwise" clause; `:198` does; `:199`'s last sentence makes any "do not push" instruction win — and `:63` reads as exactly such an instruction. A seat that reads top to bottom reaches `:63` first and has a complete, unconditional answer before it reaches `:195`.

## Finding 2 — the park, and the ruling that resolved it — **CONFIRMED**

The machine's standing rule 18, which quotes the owner's ruling (machine state `standing-rules.md`, appended 2026-10-20):

```
18. MACHINE-BRANCH PUSH AUTHORIZATION (owner ruling R589-owner, 2026-10-20T05:1xZ, after the wb-64x conservative park):
pushes to machine/flywheel/* branches are the PROGRAM'S EXPLICIT AUTHORIZATION under standing rule 4 and the user's own
standing directive ("Make sure you are committing and pushing your work"); the rig AGENTS.md subordination clauses
(:195-199 - the conservative git default applies "unless active instructions say otherwise", and the managed block is
"subordinate to explicit user, repository, and orchestrator instructions") DEFER to this rule, so a seat never parks a
finished cut on AGENTS.md:62-63. The boundary is unchanged: trunk (workbench/implementation-program) and main pushes
remain owner-only through the landing lane; machine seats push machine branches ONLY, never trunk, never main, never force.
```

Rule 18's own `05:1xZ` stamp is loose: the machine record binds the ruling at 2026-10-20T04:35:10Z, before the 04:56Z delivery it unblocked. The resolution now lives in the machine's dispatch text, which every machine seat receives; it does not live in `AGENTS.md`, which every OTHER agent in this repository reads.

## Suggested fixes, cheapest first

1. One sentence appended to `:63`: "An orchestrator or program instruction that names a branch pattern (for example `machine/<name>/*`) is such an explicit ask; trunk and `main` stay owner-only." Twenty-three words would have saved the park.
2. Move the subordination sentence (`:195`) above the Git section, or repeat it there, so the first unconditional rule a reader meets is already qualified.
3. State the branch boundary once, in the Git section, as the rule that actually holds in this program: machine branches push, trunk and `main` do not, force never.

## Positives worth protecting

- `:64` is exactly right; the machine bans two of the same items by rule (`git add -A` in its standards check, force pushes in its standing rule 4) and agrees with the rest; the one park this program saw was a seat being MORE careful than required, which is the failure mode to prefer.
- `:199`'s "a current do-not-push instruction still wins" is the correct precedence for an owner's hold; keep it, and make `:63` not read as one.
- The park row names its reason (`explicit-user-commit-push-approval-required-by-repository-AGENTS`) and the delivering seat's note cites `:63`, which is what let the owner rule in one round trip instead of a search.

## What I did not establish

- Whether any non-machine agent (a human's interactive session, a review seat) has pushed to a machine branch or parked on `:63` in this repository; the machine's records cover its own seats only.
- Whether the managed Beads block (`:195` refers to it) is regenerated by `bd prime` on this repository, which would decide whether fix #2 must sit outside a managed region.
