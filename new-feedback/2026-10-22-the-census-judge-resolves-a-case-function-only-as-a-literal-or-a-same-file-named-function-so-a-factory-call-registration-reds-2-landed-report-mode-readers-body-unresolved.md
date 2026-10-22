# The census judge resolves a case function only as a function literal or a same-file named function, so the factory-call registration `it(title, PACKAGE_COPY_ROW, budgeted(title, body))` reds 2 landed report-mode readers body-unresolved while the same rows pass on a 0-red union in the default tier

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, machine g10)
**Date:** 2026-10-22
**`pi-subagents` revision:** clone fast-forwarded to `origin/workbench/implementation-program` = `188ae59` (`git rev-parse --short origin/workbench/implementation-program`); every `path:line` below is at `188ae59` unless it names the probe. The cut #13 tip is `7144e55` ("v9 `7272f5a` + trunk `c88cd76`" per the ledger row); the gate's frozen probe is `5abd7bd` (the row's `probeSha`; "tree f1d25279" in its gate record), tree-identical to the tip (`git rev-parse '7144e55^{tree}' '5abd7bd^{tree}'` prints `f1d2527910495f2bf3579997e87c52b9ea784106` twice), so lines quoted from `7144e55` are the probe's bytes. The cut #14 object `eb0e706` ("merge trunk 188ae59 into owner/wb-hk9l-completion (v10)") is read the same way. All three were read with `git show`, never checked out.
**`vitest` revision:** 4.1.10 installed (`node_modules/vitest/package.json`), `^4.0.18` declared (`package.json:71`); node v24.20.0; typescript 6.0.3 (`package.json:42`, installed 6.0.3); git 2.50.1 (`git --version`, the binary every read here ran through). Pinned because the judge reads vitest JSON reports and resolves TypeScript AST; I executed none of them.
**Method:** read-only. Parsed the machine ledger row at `machines/flywheel/ledger/metrics.jsonl` line 10142 (kind `gate-refused`, utc `2026-10-22T06:57:07Z`, bead `wb-hk9l`, seat `gate-prep-5`) with python3 json (ledger read at 10222 lines; rows 10143-10222 scanned for later `wb-hk9l` rows by exact `bead` field); read the owner's v10 note via `bd show wb-hk9l --json` (read-only); static reads of `test/helpers/census.ts`, `test/workbench-key-validations.census.ts` and `test/workbench-docs06-conformance.census.ts` at `188ae59`, and of `test/workbench-identity.test.ts` at cut-#13 tip `7144e55`, probe `5abd7bd`, cut-#14 object `eb0e706` and trunk `188ae59`. No vitest run; every count below is quoted from the ledger row and carries that row's scope.
**Scope:** feedback about the census judge tooling (`test/helpers/census.ts`: its static-resolution contract, and where that contract is documented), not about the wb-hk9l cure, the identity suite's content, or the refusal decision. This is a limitation report, not a bug claim: the red is the judge's fail-closed model working as its own header specifies; the gap is that the contract is not stated where a test author registers a case. Cross-reference: bead `wb-hk9l`.
**Prior art:** none on this mechanism. Checked at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` (14 entries; the census-word hits — the 2026-10-21 report-mode-timeout CORROBORATION, the 2026-10-21 census-config 0-tests file, the 2026-10-21 package-json type file — are timeout/config/collection mechanisms, not static body resolution) and `git grep -il -E 'body-unresolved|budgeted|factory|resolvab' origin/workbench/implementation-program -- new-feedback/` (no hits).

## Summary, with numbers

The gate refused wb-hk9l cut #13 partly on U1: two report-mode census readers, both landed at trunk, red `body-unresolved` on the probe — census5 `2 failed | 260 passed` against `257/257` at the trunk base control (both counts from the gate-prep-5 ledger row; scope: that gate's census leg over the cut-#13 merge-tree and its base) — while the same identity rows were green where they ran (same row: identity `32/32` x3, and the census reds sat "on a 0-red union" of 49 files / 2075 tests). Mechanism, confirmed by reading the judge at `188ae59`: the judge resolves a registration's test function only as a function literal, a same-file function declaration, or a const bound to a function literal (`test/helpers/census.ts:2531-2543` via `:4499-4508`); the probe registered rows as `it(title, PACKAGE_COPY_ROW, budgeted(title, body))`, whose third argument is a call expression — refused at `census.ts:2535` — so both readers hit the `body-unresolved` verdict at `census.ts:5208`. The contract lives in the helper's own file header and doc comments and nowhere under `docs/` (0 `body-unresolved` hits in `docs/` vs 3 in `test/helpers/census.ts` at `188ae59`), so a suite author first meets it as a landing-merge red raised by reader files they may never have opened. The owner's v10 cure registers a literal function whose first statement is `budgeted(title, body)` — contract-compliant without weakening the judge; the shape is confirmed by source read at the cut-#14 object `eb0e706:694-695` and `:769-770`, while its gate verdict is pending (ledger row 10192 is a `gate-start`, no verdict row follows at 10222 lines).

## Finding 1 — the judge resolves a case function only statically (function literal, same-file function declaration, or const bound to a function literal), so a factory-made test function such as `budgeted(title, body)` is `body-unresolved` even when the report records the case passed — **CONFIRMED**

What the gate measured — quoted verbatim from `machines/flywheel/ledger/metrics.jsonl` line 10142, field `reason`, item U1 (row fields: kind `gate-refused`, utc `2026-10-22T06:57:07Z`, bead `wb-hk9l`, seat `gate-prep-5`; the row opens "class-failure-escalate-owner: owner completion v9 (7144e55 = v9 7272f5a + trunk c88cd76, cut #13) ..."):

> U1: the factory-made test functions it(title, PACKAGE_COPY_ROW, budgeted(title, body)) are not statically resolvable by the census judge, so two LANDED report-mode readers red body-unresolved on the probe - key-validations 'AC2 validation 1' (identity :696 pins row) and docs06 "AC2 bullet 5/'digest-mismatch'" (identity :767 lockfile row): census5 2 failed | 260 passed on a 0-red union, against 257/257 at the trunk base control - a landing-merge red in the census tier at any load.

The probe's registration shape (read, not run):

```
$ git show 7144e55:test/workbench-identity.test.ts | sed -n '696p;767p'
  it("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", PACKAGE_COPY_ROW, budgeted("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", () => {
  it("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", PACKAGE_COPY_ROW, budgeted("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", () => {
```

The deciding lines at `188ae59`:

- `test/helpers/census.ts:4499-4508` — `caseFunction()`, doc comment: "The registration's test function: its last function argument, or a named same-file function." It walks the call's arguments last-to-first through `localFunction()` and returns undefined when none resolves.
- `test/helpers/census.ts:2531-2543` — `localFunction()`, doc comment: "A same-file function an expression names (a function declaration or a const bound to a function literal)." A function literal returns at `:2534`; anything that is not an identifier returns undefined at `:2535` — `budgeted(title, body)` is a CallExpression, so it exits here. An identifier resolves only to a function declaration with a body (`:2538`) or a const whose initializer is a function literal (`:2541`); `PACKAGE_COPY_ROW` (a const options object) and the title string therefore resolve to nothing, so `fn === undefined`.
- `test/helpers/census.ts:5208` (report mode, the mode both readers run) and `:4660` (executing mode, same check):

```
if (fn === undefined) return verdict(pin, "asserts", "body-unresolved", `the case function at ${a.where(call)} is not statically resolvable`, count);
```

In report mode the failed/skipped branches (`:5188-5193`) precede this check, so a `body-unresolved` red means the report recorded the case passed and the judge still could not read its body — which matches the ledger's "on a 0-red union".

The two landed readers that red (both present at `188ae59` per `git ls-tree`):

- `test/workbench-key-validations.census.ts` — describe "wb-cax.24 docs/workbench/13 § Key validations census (report mode)" (`:185`); its TABLE row `n: 1` pins the identity title "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction" (`:89`, the probe's `:696` case); the judging call is the it.each "AC2 validation $n: every pinned case is collected once, passed and asserting in the default gate's own report" (`:211`). U1's "key-validations 'AC2 validation 1'".
- `test/workbench-docs06-conformance.census.ts` — describe "wb-6hb.6 docs/workbench/06 conformance census (report mode)" (`:388`); `pin(IDENTITY, "rejects lockfile changes, missing artifact and lockfile/manifest mismatch")` (`:207`, the probe's `:767` case) under `guard("digest-mismatch", ...)` (`:204`, bullet 5); judged by the it.each "AC2 bullet $row.bullet/$half.id" (`:479`). U1's docs06 "AC2 bullet 5/'digest-mismatch'".

The owner's cure confirms the contract boundary from the other side — bead `wb-hk9l` note (via `bd show wb-hk9l --json`, JSON `\n` decoded to spaces):

> v10 (cut #14 request) - refusal #13 cures, by name: U1: budgeted rows registered with LITERAL test functions; budgeted(title, body) is each row's first statement (AST-pinned: only such calls exist, one per roster title, inside the suite).

A literal function whose first statement calls the factory is exactly what `localFunction:2534` resolves; the factory as the argument itself is exactly what `:2535` refuses. The cure's shape, read (not run) at the cut-#14 object `eb0e706`:

```
$ git show eb0e706:test/workbench-identity.test.ts | grep -n -A1 -E 'it\("(pins actual package.json|rejects lockfile changes)'
694:  it("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", PACKAGE_COPY_ROW, () => {
695-    budgeted("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", () => {
--
769:  it("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", PACKAGE_COPY_ROW, () => {
770-    budgeted("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", () => {
```

The third argument is now an arrow-function literal with the factory call as its first statement. Neither shape is on trunk: the identity file at `188ae59` carries 0 `budgeted(` calls (`git show origin/workbench/implementation-program:test/workbench-identity.test.ts | grep -c 'budgeted('`) against 17 at `7144e55`.

## Finding 2 — the resolvable-shapes contract is stated only inside `test/helpers/census.ts` (file header and doc comments); no file under `docs/` names `body-unresolved` or the accepted registration shapes — **CONFIRMED**

```
$ git grep -n 'body-unresolved' origin/workbench/implementation-program -- docs/
(no output; rc 1)
$ git grep -c 'body-unresolved' origin/workbench/implementation-program -- test/
origin/workbench/implementation-program:test/helpers/census.ts:3
origin/workbench/implementation-program:test/workbench-census-helper.test.ts:1
```

Armed control: the same instrument over `test/` finds the 4 expected sites (the verdict-kind union member `census.ts:326`, the two verdict returns `:4660` and `:5208`, and the falsifier pin `test/workbench-census-helper.test.ts:185`, which asserts `red("body-unresolved", "asserts", /not statically resolvable/)`). The contract text itself sits in the `census.ts` header — "THE ROSTER MODEL ... Every step of a flow must match a roster row, or the flow is unresolved and the pin red" (`test/helpers/census.ts:21-27`) — and in the `caseFunction`/`localFunction` doc comments (`:4499`, `:2531`), i.e. inside a 6231-line test helper (`wc -l test/helpers/census.ts` at `188ae59`). A whole-tree `git grep -c 'body-unresolved'` at the ref adds only `.beads/issues.jsonl:2` (tracker rows `wb-u62` and `wb-hk9l`), so no `docs/`, `AGENTS.md`, `README.md` or `CLAUDE.md` hit exists. The contract's own words are equally absent: `git grep -c -i -E 'statically resolvable|caseFunction|localFunction|function literal|same-file function' origin/workbench/implementation-program -- docs/ AGENTS.md README.md CLAUDE.md` prints nothing (rc 1), while the same regex over `test/helpers/census.ts` prints 38 (armed control). `docs/workbench/14-qa-and-benchmarks.md` at `188ae59` carries no mention of the judge's registration contract (its only "roster" hit is the unrelated "## HX graduation-vocabulary case roster" heading at `:217`). So the first place a suite author can learn that a factory-made test function is unjudgeable is a census-tier red in a reader file at gate time.

## Evidence

Every number above traces to one of these read-only commands (repo commands from the repo root at `188ae59`; the ledger and bead live outside this repo at the absolute paths shown):

```
git rev-parse --short origin/workbench/implementation-program   # 188ae59
python3 -I -c "import json; r=json.loads(open('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl').read().splitlines()[10141]); print(r['kind'], r['utc'], r['bead'], r['seat']); print(r['reason'])"
bd -C /workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/PrimaryInstallation/src/Pi-subagents show wb-hk9l --json | grep -o 'v10[^\"]\{0,400\}' | head -1
git show 7144e55:test/workbench-identity.test.ts | sed -n '696p;767p'
sed -n '2531,2543p' test/helpers/census.ts        # localFunction: the resolvable shapes
sed -n '4499,4508p' test/helpers/census.ts        # caseFunction: last function argument wins
sed -n '4660p;5208p' test/helpers/census.ts       # the body-unresolved verdicts, both modes
sed -n '185p;89p;211p' test/workbench-key-validations.census.ts
sed -n '388p;204p;207p;479p' test/workbench-docs06-conformance.census.ts
git grep -n 'body-unresolved' origin/workbench/implementation-program -- docs/; echo "rc=$?"   # rc 1, no hits
git grep -c 'body-unresolved' origin/workbench/implementation-program -- test/                 # census.ts:3, census-helper test:1
git grep -c 'body-unresolved' origin/workbench/implementation-program                          # whole tree adds .beads/issues.jsonl:2 only
git grep -c -i -E 'statically resolvable|caseFunction|localFunction|function literal|same-file function' origin/workbench/implementation-program -- docs/ AGENTS.md README.md CLAUDE.md; echo "rc=$?"   # rc 1; same regex over test/helpers/census.ts prints 38
wc -l test/helpers/census.ts                                                                   # 6231
git rev-parse '7144e55^{tree}' '5abd7bd^{tree}'                                                # both f1d2527910495f2bf3579997e87c52b9ea784106
git log -1 --format='%h %p %s' eb0e7069b789c34a817cd847f99468b7c43f80b0                        # eb0e706 85937be 188ae59 merge trunk 188ae59 into owner/wb-hk9l-completion (v10)
git show eb0e706:test/workbench-identity.test.ts | grep -n -A1 -E 'it\("(pins actual package.json|rejects lockfile changes)'   # :694-695, :769-770
git show origin/workbench/implementation-program:test/workbench-identity.test.ts | grep -c 'budgeted('   # 0 on trunk; 17 at 7144e55
python3 -I -c "import json; L=open('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl').read().splitlines(); print(len(L)); [print(i+1, r['kind'], r['utc']) for i,l in enumerate(L) if i>10141 for r in [json.loads(l)] if r.get('bead')=='wb-hk9l']"   # 10222; last row 10192 gate-start
```

The unmet-items field of the same ledger row carries the machine-readable twin of U1 (`unmet[0]` begins "U1-landing-merge-red-census-tier-two-landed-report-mode-readers-of-the-identity-file-fail-body-unresolved-...-factory-registered-it-title-PACKAGE_COPY_ROW-budgeted-title-body-not-statically-resolvable-census5-2-failed-260-passed-vs-base-census4-257-257-...").

## Suggested fixes, cheapest first

1. **Name the accepted shapes in the `body-unresolved` verdict string** (`test/helpers/census.ts:4660` and `:5208`) — e.g. "... is not statically resolvable (the judge resolves the registration's last function argument as a function literal, a same-file function declaration, or a const bound to a function literal; a factory call resolves as none of these)". One string, two sites; it reaches exactly the author staring at the red. It does not help before the red fires.
2. **One authoring paragraph where suite authors read** (`docs/workbench/14-qa-and-benchmarks.md`, or whichever doc owns census authoring): the three resolvable shapes, the `body-unresolved` consequence in report-mode readers of pinned files, and the compliant factory pattern the v10 cure used (a literal function whose first statement is the factory call). Docs-only.
3. **Only if the owner wants factories admitted: a roster row** resolving a call expression whose callee is a same-file function that returns one of its function parameters unchanged (`budgeted(title, body)` → `body`), with the per-row guard and falsifier pin the ROSTER model requires (`test/helpers/census.ts:355-358`). Costlier, widens the resolved surface, and the fail-closed default is itself the design — rejecting this is a legitimate ruling; this file does not ask for it.

## Positives worth protecting

- **Fail-closed enumerate-the-resolvable held under pressure** — the judge refused what it could not read instead of fabricating green, exactly as its header specifies ("Every step of a flow must match a roster row, or the flow is unresolved and the pin red", `test/helpers/census.ts:21-27`), and the red named the site (`the case function at ... is not statically resolvable`). A refactor that softens unresolved-to-green would reinstate the kind of closure claim the header records as disproved once: the roster model "replaces the respin-3 'closed by construction' claim, which the gate-2 battery measured false" (`test/helpers/census.ts:22`).
- **The verdict's precision routed the cure instead of a fight with the instrument** — the owner's v10 note registers "budgeted rows ... with LITERAL test functions; budgeted(title, body) is each row's first statement", staying inside the contract rather than weakening the judge. An error message that supports this routing is worth keeping through any refactor of the verdict text (fix 1 strengthens it, not replaces it).
- **The trunk-base control in the same leg** — census5 `2 failed | 260 passed` was read against `257/257` at the trunk base with the same instrument, which is what made U1 a mechanism finding rather than a flake dispute. The habit of running the base control inside the refusal evidence is a tooling property worth protecting.

## What I did not establish

- I executed nothing: census5 `2 failed | 260 passed`, base `257/257`, identity `32/32` x3 and the 0-red union are quoted from the gate-prep-5 ledger row (scope: the cut-#13 probe leg of that gate). The artifact for an independent re-derivation is the gate's own census log for that run (the row's U3 item cites `/tmp` hk9l v9 census log lines 86 and 107) or a re-run of the two readers over a vitest JSON report of probe `7144e55`; neither ran here.
- Whether the v10 cure resolves green under the judge end to end: UNDETERMINED. A cut #14 gate has started — ledger row 10192, kind `gate-start`, utc `2026-10-22T08:02:27Z`, seat `gate-prep-1`, commit `eb0e706` — and no verdict row for bead `wb-hk9l` follows it as of this read (ledger at 10222 lines, rows filtered by exact `bead` field; the rows after 10142 are `gate-dequeued`, `worktree-removed`, `outbox-ack`, `gate-stage`, `ritual-check`, `gate-enqueued`, `gate-start`). The cure's registration shape is confirmed by source read at `eb0e706:694-695` and `:769-770` (Finding 1); the bead's v10 note states "Landed key-validations/docs06 identity-row pins now resolve: key-validations 24/24 and docs06 51/51 green (the two refusal-#13 body-unresolved reds)", which is the author's own run, not a gate verdict. The settling artifact is that gate's verdict row (kind `gate-pass` or `gate-refused`, bead `wb-hk9l`) in the same ledger.
- I did not build a minimal out-of-gate repro (a two-line suite registering `it(title, factory())` plus a `judge()` run) — the mechanism grade rests on source reading of `caseFunction`/`localFunction` plus the gate's measured pair, which together already satisfy CONFIRMED's "provable from cited source or a quoted command output".
