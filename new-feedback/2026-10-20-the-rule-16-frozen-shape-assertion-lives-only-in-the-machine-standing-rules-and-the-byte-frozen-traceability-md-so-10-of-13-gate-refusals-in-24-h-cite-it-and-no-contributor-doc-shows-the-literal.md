# The rule-16 frozen-shape assertion lives only in the machine's standing rules and the byte-frozen `docs/workbench/TRACEABILITY.md` — so 10 of 13 gate refusals in 24 h cite it and no contributor doc shows the literal a census cut must carry

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-20
**`pi-subagents` revision:** trunk `workbench/implementation-program` at `ba3e4ff`
**Method:** counted every `gate-refused` row in the machine ledger over 24 h from 2026-10-19T08:00:34Z whose reason cites rule 16 / the frozen-shape class; ran `git grep -l -i 'frozen-shape\|frozen shape' ba3e4ff -- docs/ AGENTS.md` on the rig; read the machine's standing rule 16 (the owner's standing order of 2026-10-18T18:14:19Z).
**Scope:** feedback about the `pi-subagents` repository's contributor documentation for census tests, not about the rule itself (which is the owner's and correct) and not about the refused cuts.
**Prior art:** none in `new-feedback/` at the fetched trunk on census shape or rule 16 (6 entries, 5 feedback files plus `README.md`, listed with `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`).

## Summary, with numbers

The rig owner's standing order of 2026-10-18T18:14:19Z (the machine's rule 16) requires every census cut to pin its own row/pin-level shape as a literal (`expect(ROWS.map(r => \`${r.id}:${r.pins.length}\`)).toEqual([...])`) so that deleting a pin, shortening a requirement label or swapping a pin for an unrelated passing case reds the census. In the 24 h window the machine's gates refused 13 cuts; 10 of the 13 (`wb-cax.15`, `wb-drd`, `wb-6hb.6`, `wb-6ze.39`, `wb-6hb.7`, `wb-h8f.9`, `wb-752.14`, `wb-cax.25`, `wb-0kg.11`, `wb-5x0.2`) were refused on that class — a census that froze counts or ids but not the pin-level shape, so hollowing mutants (count-preserving swaps, `.slice`, filtered ids) survived their whole battery, from 20 of 20 to 79 of 79, in the 9 refusals that recorded counts (`wb-cax.15` names its mutants, H5/H6, without counts). 9 of the 10 carry a respin marker in their ledger row; `wb-cax.25` was reopened for its respin by the orchestrator without one. On the rig itself the words "frozen-shape" occur in exactly one tracked file under `docs/`, `docs/workbench/TRACEABILITY.md`, which is byte-frozen by a landed test (`R1`), so nobody can add the literal's template to it; `AGENTS.md` does not mention it. The rule a cutter must satisfy lives in the machine's dispatch text and in refusal notes, not in the repository the cutter reads.

## Finding 1 — 10 of 13 refusals in 24 h are the same class — **CONFIRMED**

Ledger count (orchestrator query over `kind == "gate-refused"`, reason containing `rule-16`, `rule16` or `frozen`):

```
gate-refused rows: 13   citing rule-16 / frozen shape: 10
['wb-cax.15','wb-drd','wb-6hb.6','wb-6ze.39','wb-6hb.7','wb-h8f.9','wb-752.14','wb-cax.25','wb-0kg.11','wb-5x0.2']
```

Two refusal reasons, trimmed to the mutant counts that define the class:

```
{"kind":"gate-refused","bead":"wb-5x0.2","reason":"RESPIN on substance (haiku): U1 rule-16 judged-row set frozen by COUNT only (JUDGED_ROWS :330 pinned by toHaveLength(15) at :385, no ids literal; count-preserving swaps survive: CT7e ROWS.slice(0,15) 50/50, CT7f filter !j8&&!j9 50/50, consumer CTEACH 38/38, CTEACHj8 49/49, CTEACH0 35/35 ...","utc":"2026-10-20T07:42:57Z"}
{"kind":"gate-refused","bead":"wb-cax.25","reason":"rule16-frozen-shape-incomplete: EXPECTED_SHAPE freezes pin counts only; CT3 swap survives 65/65 x5 (incl. SECURITY negative and Claude-host Pi AgentManager cells), CT11 65/65, CT7 56/56","unmet":["U1 rule-16 pin identity literal (CT3a-e CT11 CTEACHMIN survive)","U2 rule-16 judged-row set (CT7 56/56)", ...]}
```

## Finding 2 — the rule's text is not in the repository a cutter reads — **CONFIRMED**

```
$ git grep -l -i 'frozen-shape\|frozen shape' ba3e4ff -- docs/ AGENTS.md
ba3e4ff:docs/workbench/TRACEABILITY.md
```

One file, and that file is frozen byte-exact by the landed `R1` test (any edit reds the suite), so it cannot grow a template. The rule as the cutters receive it (machine standing rule 16, quoted from the dispatch text):

```
16. CENSUS FROZEN-SHAPE ASSERTION (owner standing order 2026-10-18T18:14:19Z, ... rule 16): a census that carries a frozen TABLE
or judged-row set MUST pin its own row/pin-level shape as an AC1-style literal in the same cut - e.g.
expect(ROWS.map(r => `${r.id}:${r.pins.length}`)).toEqual([...the frozen list...]) derived from the TABLE at the cut's base - so
deleting one pin, shortening a requirement label, or swapping a pin for an unrelated passing case reds the census. Author it
red-first against hollowing mutants of the CT1/CT1b/CT2/CT3 shapes ...
```

Every machine seat receives this text (the `standingRules` field of the machine's `state/dispatch/g9-gate-s2.args.json`, 14 KB, carries it verbatim); a human contributor or a non-machine agent cutting a census in this repository does not.

## Finding 3 — the refusals are correct and the mutants are real — **CONFIRMED**

Each of the 10 refusals names the surviving mutants, and 9 of 10 record the count (`CT3 swap survives 65/65 x5`, `ROWS.slice(0,15) 50/50`; `wb-cax.15` names H5/H6 without a count); the gates ran the mutants on throwaway copies and the census stayed green. The class is a documentation gap, not a gate defect.

## Suggested fixes, cheapest first

1. A `docs/workbench/census-authoring.md` (or a section in an existing unfrozen contributor doc) carrying the rule-16 literal template, the four hollowing-mutant shapes (CT1/CT1b/CT2/CT3) and one landed census that passes it as the example.
2. A sentence in `AGENTS.md` under the testing guidance pointing at that doc for any file matching `*.census.ts` or carrying a frozen table.
3. A lint or test helper (`assertFrozenShape(ROWS, EXPECTED)`) in `test/helpers/` that every census imports, so the literal has one canonical form and a missing call is greppable.

## Positives worth protecting

- The rule works: 10 of 10 refusals named the mutants, 9 of 10 recorded their counts, and 0 of the 10 were contested by their seats; the respins are mechanical. Keep the gate's mutant battery exactly as it is.
- `TRACEABILITY.md` being byte-frozen is a feature (the R1 test exists because an append convention once serialized re-cuts); the fix is a new doc, not an unfreeze.
- The landed censuses that DO carry the literal (the owner's post-2026-10-18 cuts) are the template; fix #1 is mostly a pointer to them.

## What I did not establish

- How many of the 10 refused cuts were authored before the 2026-10-18T18:14:19Z order (the order exempts cuts already cut at that stamp); the machine's rows show the cut commits but not the authoring time of the census literal, so the count of "should have known" versus "cut earlier, re-gated later" is not separated here.
- Whether a contributor doc would have reached the machine's own seats faster than the dispatch text does; for them the text already arrives. The gap this file names is for every other author.
