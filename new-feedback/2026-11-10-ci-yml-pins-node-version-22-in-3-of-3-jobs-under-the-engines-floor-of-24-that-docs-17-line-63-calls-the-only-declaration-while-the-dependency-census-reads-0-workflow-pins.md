# ci.yml pins node-version 22 in 3 of 3 jobs under the engines floor of 24 that docs 17 line 63 calls the only declaration, while the dependency census reads 0 workflow pins

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-11-10 (window: ledger rows whose top-level `utc` string satisfies `"2026-11-09T08:25:00Z" <= utc < "2026-11-10T08:25:00Z"`, `json.loads` per line = 3,295 of the 72,122 lines `machines/flywheel/ledger/metrics.jsonl` held at the first probe; first window row M:68738, last M:72032; 79 rows carry no string `utc` and sit outside every window count; the count is 3,295 under the open, closed and minute-prefix boundary conventions alike. This file's probes ran until 09:01:28Z by `date -u`; the ledger numbers were re-derived at 09:34:18Z after verifier review, when the append-only file held 72,198 lines and 0 of the lines appended after line 72,122 fell in the window; the start was not stamped)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `d00c37429887a6a0bad010983074553b5601e976`, fetched at launch (`git fetch -q origin` rc 0; `git log -1` prints `2026-11-10T08:25:50Z ledger: close wb-7u0r (landing 1083, merge ec7db5e4)`; root tree `9ee10c0a444e68b5b3ddf53f69a9e84ceb7bd297`; `package.json` names `@tintinweb/pi-subagents` `0.20.0`). Source read at that same sha with `git show`, `git grep`, `git log -S` and `git cat-file -e`: blobs `.github/workflows/ci.yml` `8d55222fd3c0` (80 lines), `package.json` `c6bc33445204` (85 lines), `docs/workbench/17-packaging-and-operations.md` `1ca77cc75331` (94 lines), `qa/workbench/dependency-census.mjs` `3ef1457980ab` (625 lines), `test/workbench-dependency-census.test.ts` `f277e0fd0a88` (704 lines), `test/workbench-gate-typing-scope.test.ts` `de73fa803816` (201 lines). The fork's default branch `origin/master` at `8cc7657b8b907580b90a61eec0f7ef60f7d37251` (`2026-11-10T06:22:27Z continuity: merge workbench/implementation-program into master`) carries the same `engines` and the same three pins. My rig clone's checked-out HEAD `188ae59016` is 4,826 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`); nothing below was read from the working tree.
**`node` revision (the host side of every probe):** PATH node `v24.20.0` with npm `11.19.0` (`~/.local/share/mise/installs/node/24/bin/node`); the second toolchain used for the Node 22 probes is mise `node 22.23.2` with its bundled npm `10.9.8`, installed on this host but not on PATH (`mise ls node` lists 18.20.2, 22.23.2, 24.20.0). `git version 2.50.1` is the instrument for every source quote.
**Method:** read-only re-derivation at the fetched trunk sha: `git show` / `git grep` / `git log -S` over `.github/workflows/ci.yml`, `package.json`, `package-lock.json`, `vendor/dependency-lock.json`, `docs/workbench/17-packaging-and-operations.md`, `qa/workbench/dependency-census.mjs`, `qa/workbench/package-boundary.mjs` and the `test/` suites; host probes `node --version`, the `--experimental-strip-types` flag probe and a bare `.ts` import under both Node majors, and a scratch-directory (`mktemp -d`, no dependencies) `npm install` / `npm ci` against a minimal manifest carrying the same `engines` value, under Node 22.23.2 and under Node 24.20.0 as the control; `python3 -I` filters over the machine ledger for the window's `gate-pass` rows. No `npm install`, `vitest`, `forge`, `pi` or `bd` command ran in the repo; no file under the repo, its worktrees or the machine root was written except this one.
**Scope:** feedback about operating `pi-subagents`' workbench program as a tool - its declared support matrix (`docs/workbench/17-packaging-and-operations.md`), the wb-cax.20 dependency census that guards it, and the Node declaration carried by the repository's own `.github/workflows/ci.yml` - not about any workbench bead, not about GitHub Actions as a service (this program's docs declare it out of scope at 12 sites, Finding 8), and not about Node or npm themselves.
**Prior art:** none. `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries at `d00c3742`; a filename grep for `node-version|engines|setup-node|ci-yml|ci\.yml|node-22|node-24|strip-types|nvmrc|ebadengine|workflow|github|dependency-census|floor` hits 0 of 41; body greps (`git grep -li -F` at the ref) for `engines`, `node-version`, `setup-node`, `EBADENGINE`, `strip-types`, `>=24`, `ci.yml`, `actions/setup-node` and `the floor is the only declaration` each hit 0 of 41, and `dependency-census` hits 1 (the 10-21 census-timeout CORROBORATION, another sense). `git branch -r | grep feedback` lists 21 dated feedback branches on `origin`: 15 (10-17 to 11-02) are ancestors of trunk (`git merge-base --is-ancestor <branch> trunk` rc 0) and carry none of the tokens; 6 are not (rc 1). Of the 6, `machine/flywheel/feedback-2026-10-15` `f1b17bfb45` adds 0 `new-feedback/` files beyond trunk (`git diff --name-only --diff-filter=A trunk..branch -- new-feedback/` prints nothing; its single off-trunk commit, `docs(captures): publish the two held bd captures at a pinned sha for the owner W20 filing (flywheel)`, adds 2 files under `machines/flywheel/ledger/captures/`; its tip's 2 `new-feedback/` entries hit 0 of the tokens, armed control `git grep -l -F npm <tip> -- AGENTS.md` = 1), and the other 5 add `new-feedback/` files (`machine/flywheel/feedback-2026-11-04` `0bc3d6fd3a` 2, `-05` `3c806e1d6c` 1, `-06` `eb67a88ff1` 2, `-09` `2966416bf2` 2, `feedback/shift-left-research-engineer-2026-11-07` `5e463083cf` 4; 8 distinct names, the shift-left branch re-carrying three of the 11-04/11-05 files). Those 8 files add 2 hits in other senses: the 11-06 filename carries `github` for the 100 MiB push limit, and the 11-09 positive's body names `.github/workflows/ci.yml` twice inside a caller grep for `tracker-export`; the rest hit 0 by filename and 0 by body. The nearest sibling by theme is the trunk file `2026-10-21-package-json-at-eaa5a46-carries-no-type-field-...md` (a different `package.json` field). The `--help` leg does not apply: the finding is about repository bytes, not a verb.
**Delivery:** draft only, uncommitted and unpushed, as assigned. This one file lives under the rig's `new-feedback/`; a later delivery must commit it on `machine/flywheel/feedback-2026-11-10` cut from a detached worktree of `origin/workbench/implementation-program` (`git worktree add --detach`), docs-only, staged by name, never checking out or pushing trunk, with the header `docs(new-feedback): ci.yml pins node-version 22 in 3 of 3 jobs under the >=24 engines floor (pi-subagents)` (106 characters; the repo carries no `.gitmessage` or hook at the ref, so no header length is enforced, and the shorter form stays under the 72/100-character limits the skill measured in sibling repos' hooks). Gate waiver disclosure for that later commit, per standing operator direction: docs-only change under `new-feedback/`, no forge gate run, no tests run, no hook bypassed. `core.hooksPath` is unset (`git config core.hooksPath` rc 1); `.githooks` and `.gitmessage` are absent at the ref (`git ls-tree` prints nothing); `commit.template` resolves to the user's global `~/.git-commit-template.txt`, advisory only.

## Summary, with numbers

At `d00c3742`, `.github/workflows/ci.yml` declares `node-version: 22` in 3 of 3 jobs (`:16` build, `:51` compat-floor-pi, `:72` compat-latest-pi) while `package.json:4-5` and both lockfile roots declare `"engines": { "node": ">=24" }` - 3 of 3 census engines sites agree at `>=24`, 3 of 3 workflow pins sit below it. `docs/workbench/17-packaging-and-operations.md:63` says "no `.node-version` pin exists, the floor is the only declaration", which the three workflow lines make false, and `:72`'s own policy sentence calls "a drift found by wb-cax.20's guard ... a defect in whichever side moved without the other". The guard cannot find this one: `qa/workbench/dependency-census.mjs:203-206` binds the declared floor to exactly 3 engines sites and reads 0 workflow pins, and a whole-tree `git grep -F node-version` (excluding `.beads/`) returns 6 lines, 3 of them the pins, 0 of them inside an assertion. The floor moved on 2026-10-15 (`a0a3341491`); `ci.yml` was last edited three days later (`346d16feb0`, 2026-10-18, R488) keeping 22, and that cut's receipt records "all three jobs pin node-version 22" - so the pin is known and unreconciled, not undiscovered. Realized cost in the window: 0 - 4 of the 13 window `gate-pass` rows name a Node version, and all 4 say v24.20.0 with npm 11.19.0: 2 as the receipt prose `node v24.20.0, npm 11.19.0` (M:70256 in `gateFindings`, M:72009 in `envelopeSummary`) and 3 as the JSON fields `"node":"v24.20.0","npm":"11.19.0"` of the embedded `packageSmoke` receipt (M:70853, M:71500, M:72009; M:72009 carries both forms, M:70256's `packageSmoke` has no `node` key), and under a real Node 22.23.2 the exercised consequence is one `npm warn EBADENGINE` block with rc 0 while both type-stripping forms the suites use run on 22.23.2 and 24.20.0 alike. Severity: low; a declaration inconsistency by the repository's own policy sentence, closable in one row (bump the 3 pins, add a census read, or amend `docs/17:63` and name the "No GitHub CI" stance).

## Finding 1 - `ci.yml` pins `node-version: 22` in 3 of 3 jobs and triggers only on `master` - **CONFIRMED**

```
$ git show d00c37429887a6a0bad010983074553b5601e976:.github/workflows/ci.yml | cat -n | sed -n '3,7p;14,16p;49,51p;70,72p'
     3	on:
     4	  push:
     5	    branches: [master]
     6	  pull_request:
     7	    branches: [master]
    14	      - uses: actions/setup-node@v4
    15	        with:
    16	          node-version: 22
    49	      - uses: actions/setup-node@v4
    50	        with:
    51	          node-version: 22
    70	      - uses: actions/setup-node@v4
    71	        with:
    72	          node-version: 22
```

`.github/workflows/ci.yml:16`, `:51`, `:72` at `d00c3742` (blob `8d55222fd3c0`, 80 lines). The build job's run steps (`:18-22`) are `npm ci`, `npm run lint`, `npm run typecheck`, `npm run typecheck:test`, `npm run test`; the compat jobs (`:53-59`, `:74-80`) run `npm ci`, install a floor or latest Pi, then `npm run typecheck` and `npx vitest run --reporter=dot`. Every one of those steps therefore executes under a Node the declared floor excludes, if the workflow runs at all (Finding 8).

## Finding 2 - the floor is `>=24` at 3 of 3 census sites, moved on 2026-10-15, and `ci.yml` was edited after it on 2026-10-18 keeping 22 - **CONFIRMED**

```
$ git show d00c3742:package.json | sed -n '4,6p'
  "engines": {
    "node": ">=24"
  },
$ git show d00c3742:package-lock.json | python3 -I -c 'import json,sys; d=json.load(sys.stdin); print("package-lock.json packages[\"\"].engines =", d.get("packages",{}).get("",{}).get("engines"))'
package-lock.json packages[""].engines = {'node': '>=24'}
$ git show d00c3742:vendor/dependency-lock.json | python3 -I -c 'import json,sys; d=json.load(sys.stdin); print("vendor/dependency-lock.json packages[\"\"].engines =", d.get("packages",{}).get("",{}).get("engines"))'
vendor/dependency-lock.json packages[""].engines = {'node': '>=24'}
$ git log --first-parent --format='%H %cI %s' -S'">=24"' d00c3742 -- package.json
a0a334149160d9d9acb06dab2cd21706c08c6e02 2026-10-15T11:44:07Z docs(workbench): docs/17 declared support matrix (release checklist item 4) and a Node engines floor
$ git log -3 --format='%H %cI %s' d00c3742 -- .github/workflows/ci.yml
346d16feb09db159351be58c904df4f920095103 2026-10-18T05:14:00Z Owner cut wb-zsv.8 (ruling R488): CI build job gains the typecheck:test step — ci.yml build job now equals npm run check step for step; compat jobs untouched (R488(2)); AGENTS.md :44 re-trued to plain "(what CI runs)" + isolation row; guard G6 pins the build-job step list; receipt wb-zsv.8.md + INDEX line (2026-10-18)
25eb4fab35b6ca9284e2b6985ed645dd7609ac2a 2026-10-09T12:32:56+02:00 fix: support pi 1.1.0 (#384)
221df02323c6b6350ea8474579e0ee0f6cc84cea 2026-08-25T15:12:18+02:00 feat: Workflow tool - deterministic scripts that orchestrate many subagents (#236)
$ git merge-base --is-ancestor a0a3341491 346d16feb0; echo rc=$?
rc=0
$ git show origin/master:package.json | grep -n '"node"'; git show origin/master:.github/workflows/ci.yml | grep -n -F node-version
5:    "node": ">=24"
16:          node-version: 22
51:          node-version: 22
72:          node-version: 22
```

The three `node-version: 22` lines predate the floor: `git log -S'node-version: 22' -- .github/workflows/ci.yml` names the commits where the occurrence count changed, `2c6684950` (2026-05-26), `4cc76c0ad` (2026-07-17) and `c7668d425` (2026-08-15), all upstream-era. The floor commit `a0a3341491` is an ancestor of the R488 cut `346d16feb0` (rc 0), so the file was edited once with the floor already in the tree and the pins were kept. No `.nvmrc`, `.node-version`, `.tool-versions`, `mise.toml`, `.mise.toml` or `.npmrc` exists at the pin (`git cat-file -e d00c3742:<path>` fails for each; the armed control `git cat-file -e d00c3742:package.json` succeeds).

## Finding 3 - `docs/17:63` states "the floor is the only declaration", false by the three workflow lines, and `:72` makes a one-sided move a defect - **CONFIRMED**

```
$ git show d00c3742:docs/workbench/17-packaging-and-operations.md | cat -n | sed -n '63p;72p'
    63	| Node.js runtime | tested on v24.20.0; declared floor `>=24` (package.json `engines`) | `node --version` on the gate host; no `.node-version` pin exists, the floor is the only declaration |
    72	Policy: the Node floor and the exact pins change only by an owner commit that re-runs the complete gate on the new version and updates this table in the same commit; a drift found by wb-cax.20's guard is a defect in whichever side moved without the other.
```

`docs/workbench/17-packaging-and-operations.md:63` and `:72` at `d00c3742` (blob `1ca77cc75331`). The first clause of the cell ("no `.node-version` pin exists") is true (Finding 2); the second ("the floor is the only declaration") is not, because `.github/workflows/ci.yml:16`, `:51` and `:72` each declare a Node major for a job that runs this repository's gate scripts. By `:72`'s own words the side that moved without the other is the floor (`a0a3341491`), and the workflow is the side that did not move.

## Finding 4 - the wb-cax.20 guard binds the floor to 3 engines sites and 0 workflow pins, and no test at the pin asserts a `node-version` value - **CONFIRMED** (armed)

```
$ git show d00c3742:qa/workbench/dependency-census.mjs | cat -n | sed -n '200,207p'
   200	    component: "Node.js runtime",
   201	    read: ({ declared }) => [
   202	      declaration("declared:node:floor", "node", firstMatch(declared, /declared floor `([^`]+)`/), "declared floor in backticks", [
   203	        "equals engines:package.json:node",
   204	        "equals engines:package-lock.json:node",
   205	        "equals engines:vendor/dependency-lock.json:node",
   206	        "floor-of node:runtime",
   207	      ]),
$ git show d00c3742:qa/workbench/dependency-census.mjs | grep -n -E '\.github|workflows|setup-node|node-version'
(no hits)
$ git grep -n -F -- 'node-version' d00c3742 -- . ':!.beads'
.github/workflows/ci.yml:16:          node-version: 22
.github/workflows/ci.yml:51:          node-version: 22
.github/workflows/ci.yml:72:          node-version: 22
docs/workbench/17-packaging-and-operations.md:63:| Node.js runtime | [line shortened; full text in Finding 3] the floor is the only declaration |
docs/workbench/receipts/wb-zsv.8.md:5:- Spec of record: RULING R488 [line shortened; the clause is quoted in Finding 5] in ci.yml itself all three jobs pin node-version 22 [...]
test/workbench-gate-typing-scope.test.ts:185: * recorded rationale is node-version runtime intent; in the yml itself their axis is the installed Pi (floor/latest,
$ git grep -c -F -- 'engines' d00c3742 -- qa test        # the armed control: the same grep for the token the census DOES read
qa/workbench/dependency-census.mjs:20
qa/workbench/furnace-hosted-retry-fault.mjs:1
test/workbench-dependency-census.test.ts:36
(... 8 further files, 1 to 12 hits each)
```

`qa/workbench/dependency-census.mjs:203-206` at `d00c3742` (blob `3ef1457980ab`): the "Node.js runtime" declaration binds to the three engines rows (`enginesRows`, `:117-133`, pushed at `:340-348`) and to `node:runtime`; the test fixture at `test/workbench-dependency-census.test.ts:293-298` carries the same four checks, and F5-F8 (`:215-218`) exercise engines drift only. The whole-tree grep finds 6 `node-version` lines, 3 declarations and 3 mentions, 0 in an `expect`; the `':!.beads'` exclusion hides 1 file, `.beads/archive/issues-closed-2026-10.jsonl` (2 hits, bead prose, not tree declarations). The only test that parses `ci.yml` structurally, G6 at `test/workbench-gate-typing-scope.test.ts:189-200`, collects `      - run: ` lines of the `build:` job and asserts `["npm ci", "npm run lint", "npm run typecheck", "npm run typecheck:test", "npm run test"]`; it never reads a `with:` block. The full census of tests that name the file: `git grep -l -F 'workflows/ci.yml' d00c3742 -- test ':!test/fixtures'` = 11 files, 16 lines (the narrower token `.github/workflows/ci.yml` finds 9 of the 11 plus 4 fixture rosters, because `test/workbench-h2-bead-graph-census.test.ts:510`, `:521` and `test/workbench-rf-orphan-server-reclaim-census.test.ts:248` spell it `anchorFile: "workflows/ci.yml"` under `root: ".github"`; with fixtures the wider token lists 16 files, 5 of them rosters under `test/fixtures/`). Of the 11: 1 reads the real file's content (G6, `readRepo` at `test/workbench-gate-typing-scope.test.ts:191`, run steps only; its header comment at `:182` is the file's second mention); 5 use it as a token-presence anchor (`anchorToken: "setup-node"` at `test/workbench-beads-claim-recheck-census.test.ts:353` and `test/workbench-h2-close-condition-census.test.ts:285`; `anchorToken: "runs-on"` at `test/workbench-h2-bead-graph-census.test.ts:510`, `:521` and `test/workbench-rf-orphan-server-reclaim-census.test.ts:248`; `token: "name: CI"` at `test/workbench-foa-public-port-bridge-census.test.ts:731`, whose `:3718` lists it again inside the string `"config:package.json,.github/workflows/ci.yml"`); 2 list it in a roster or anchor array (`test/workbench-hx-sio-design-status-census.test.ts:3841`; `test/workbench-rf-tsx-deno-provisioning.test.ts:728`, which also plants a synthetic `steps:` copy in a scratch tree at `:792` and expects the hit `.github/workflows/ci.yml:2:I6` at `:814` - a planted file, not the repository's); 1 expects it `denied-prefix` (`test/workbench-package-boundary.test.ts:35`); 1 quotes the out-of-scope stance (`test/workbench-mwi-docs-remediation-census.test.ts:1130`); 1 names it in a comment (`test/e2e/isolated-provider.e2e.test.ts:25`). 0 of the 11 read a `with:` block or assert a `node-version` value: `git grep -n -F node-version d00c3742 -- test` = 1 line, the G6 header comment at `:185`, and a grep for `node-version` on an `expect(` line = 0. `forge.toml:9` puts `census` in the complete gate, so the census runs at every landing and reads 0 workflow pins each time. `qa/workbench/package-boundary.mjs:11` lists `.github/` as a denied prefix, so the pin never reaches the published tarball; its only effect is on the workflow's own runs.

## Finding 5 - the pin is known to the owner: the R488 cut's receipt ("all three jobs pin node-version 22") and the G6 header ("node pinned at 22 in all three jobs") both record the pin - **CONFIRMED**

```
$ git show d00c3742:test/workbench-gate-typing-scope.test.ts | cat -n | sed -n '184,187p'
   184	 * The compat jobs STAY vitest-focused per R488(2), whose
   185	 * recorded rationale is node-version runtime intent; in the yml itself their axis is the installed Pi (floor/latest,
   186	 * node pinned at 22 in all three jobs), so a typecheck:test arm there would be a new measurement -- test/** against
   187	 * floor/latest Pi, which no job runs today -- that R488(2) deliberately leaves out of scope; they are not pinned here.
```

`docs/workbench/receipts/wb-zsv.8.md:5` at `d00c3742` says, verbatim in its clause (2): "in ci.yml itself all three jobs pin node-version 22 and the compat axis is the installed Pi (floor 1.1.0 / latest)". Both records are dated 2026-10-18, three days after the floor moved to `>=24`; neither names the floor. This grades the finding as a reconciliation gap between three owner-maintained artifacts (`ci.yml`, `docs/17`, the census), not as a hidden drift.

## Finding 6 - the strip-types lead: 3 suites and 1 qa script rely on Node type stripping, the floor covers it, and both forms run on 22.23.2 and 24.20.0 alike - **CONFIRMED**

```
$ git grep -n -F -- 'experimental-strip-types' d00c3742 -- src test qa
test/workbench-identity-shell.test.ts:42:      const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", client], {
test/workbench-observation-shell.test.ts:24:    const child = spawnSync(process.execPath, ["--disable-warning=ExperimentalWarning", "--experimental-strip-types", "--input-type=module", "-e", client], { cwd: process.cwd(), encoding: "utf8", timeout: 10_000 });
test/worktree-process-kill-preservation.test.ts:11: * The trial. A child Node process (CHILD below, run with --experimental-strip-types) imports the REAL src/worktree.ts,
test/worktree-process-kill-preservation.test.ts:87:const NODE_FLAGS = ["--disable-warning=ExperimentalWarning", "--experimental-strip-types", "--input-type=module", "-e"];
$ git show d00c3742:qa/workbench/furnace-hosted-retry-fault.mjs | sed -n '7p'
// TypeScript with type-only project imports, which node loads through its built-in type stripping (engines.node >= 24).
$ node --disable-warning=ExperimentalWarning --experimental-strip-types --input-type=module -e 'console.log("ok", process.version)'; echo rc=$?
ok v24.20.0
rc=0
$ ~/.local/share/mise/installs/node/22.23.2/bin/node --disable-warning=ExperimentalWarning --experimental-strip-types --input-type=module -e 'console.log("ok", process.version)'; echo rc=$?
ok v22.23.2
rc=0
$ # scratch dir: t.ts = `export const x: number = 1;`, main.mjs = `import { x } from "./t.ts"; console.log("imported", x, process.version);`
$ ~/.local/share/mise/installs/node/22.23.2/bin/node main.mjs; echo rc=$?
imported 1 v22.23.2
rc=0
$ ~/.local/share/mise/installs/node/24/bin/node main.mjs; echo rc=$?
imported 1 v24.20.0
rc=0
```

The lead asked whether the repository pins a Node for the flag; it does, through `engines.node >=24` (`package.json:5`), and `qa/workbench/furnace-hosted-retry-fault.mjs:7` says so in its own words. The flagged form (3 suites) and the bare `.ts` import (the qa script's form) both ran rc 0 on the host's 24.20.0 and on the mise 22.23.2, so a runner on a late 22.x would not fail these suites for want of type stripping; the gap is the declaration, not the capability. Which 22.x `actions/setup-node@v4` resolves today was not observed (Finding 8).

## Finding 7 - under Node 22.23.2, npm warns `EBADENGINE` for a root manifest declaring `>=24` and proceeds rc 0; the control under 24.20.0 prints nothing - **CONFIRMED** on a scratch manifest; the same outcome for the repository's own `npm ci` on a runner - **PLAUSIBLE**

```
$ cd "$(mktemp -d /tmp/fb-node-probe.XXXXXX)" && printf '{"name":"fb-engines-probe","version":"0.0.0","private":true,"engines":{"node":">=24"}}\n' > package.json
$ ~/.local/share/mise/installs/node/22.23.2/bin/npm install --no-audit --no-fund --loglevel=warn; echo rc=$?
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'fb-engines-probe@0.0.0',
npm warn EBADENGINE   required: { node: '>=24' },
npm warn EBADENGINE   current: { node: 'v22.23.2', npm: '10.9.8' }
npm warn EBADENGINE }

up to date in 189ms
rc=0
$ rm -rf node_modules package-lock.json; ~/.local/share/mise/installs/node/24/bin/npm install --no-audit --no-fund --loglevel=warn; echo rc=$?

up to date in 194ms
rc=0
$ ~/.local/share/mise/installs/node/22.23.2/bin/npm ci --no-audit --no-fund --loglevel=warn; echo rc=$?
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'fb-engines-probe@0.0.0',
npm warn EBADENGINE   required: { node: '>=24' },
npm warn EBADENGINE   current: { node: 'v22.23.2', npm: '10.9.8' }
npm warn EBADENGINE }

up to date in 196ms
rc=0
```

The CONFIRMED part is the mechanism: npm 10.9.8 (bundled with 22.23.2) checks the root manifest's `engines` and warns without failing when `engine-strict` is unset (`npm config get engine-strict` prints `false` on this host; no `.npmrc` exists at the pin, Finding 2). The PLAUSIBLE part is the transfer to the workflow: the repository's `package.json` carries the identical `engines` value, so a runner's `npm ci` (`ci.yml:18`, `:53`, `:74`) would warn the same way and continue - but I did not run `npm ci` against the repository's lockfile (it would write `node_modules` into a shared clone), and the runner's exact 22.x and npm were not observed. The warning is the whole realized consequence I could exercise; nothing in Finding 6 turns it into a failure.

## Finding 8 - whether the workflow runs on the fork at all - **UNDETERMINED**; the program's stance is "No GitHub CI" at 12 sites while `AGENTS.md:44` still reads "(what CI runs)" - **CONFIRMED**; realized cost in the window 0 - **CONFIRMED** for the 4 of 13 `gate-pass` rows that name a Node version

```
$ timeout 10 gh --version; echo rc=$?
timeout: failed to run command ‘gh’: No such file or directory
rc=127
$ git grep -n -i -E 'no github ci|never introduce github ci|do not add github ci|no GitHub CI added' d00c3742 -- docs/workbench AGENTS.md ':!docs/workbench/receipts' ':!docs/workbench/programs' | cut -d: -f2,3
AGENTS.md:167
docs/workbench/00-current-state-and-source-map.md:32
docs/workbench/01-product-vision-and-user-journeys.md:49
docs/workbench/02-atomic-requirements.md:25
docs/workbench/03-architecture-and-ownership.md:48
docs/workbench/14-qa-and-benchmarks.md:123
docs/workbench/17-packaging-and-operations.md:5
docs/workbench/18-decisions-and-risks.md:16
docs/workbench/IMPLEMENTATION_GUIDE.md:14
docs/workbench/README.md:44
docs/workbench/TRACEABILITY.md:27
docs/workbench/feature-matrix.md:27
$ git show d00c3742:AGENTS.md | sed -n '44p'
  npm run check       # lint + typecheck + typecheck:test + test (what CI runs)
$ git show d00c3742:test/workbench-mwi-docs-remediation-census.test.ts | sed -n '1130p'
    repair: "Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate",
```

The artifact that would settle the UNDETERMINED is the fork's Actions run list for `master` (the only branch the workflow triggers on, Finding 1); `gh` is absent on this host and I made no network call. The stance is consistent across the 12 sites (`docs/workbench/02-atomic-requirements.md:25` is `WB-019 | P0 | ... no GitHub CI added`), and the MWI program states the sharpest form, "Pi's pre-existing `.github/workflows/ci.yml` is out of scope" (`docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md:24`, pinned by the remediation census at `:1130`). Against that, R488 spent an owner cut keeping the build job's steps equal to `npm run check` and `AGENTS.md:44` describes `check` as "(what CI runs)" - the file is maintained for step parity but not for Node parity. Realized cost: the ledger has 3,295 rows in the window (predicate in the Date line), 13 of them `gate-pass`; 4 of the 13 name a Node version and all 4 say v24.20.0 with npm 11.19.0, in two forms - M:70256 (wb-1ht7) carries the prose `node v24.20.0, npm 11.19.0` in its `gateFindings` field only (its `packageSmoke` field has no `node` key); M:70853 (wb-3121) and M:71500 (wb-7wkb) carry the fields `"node":"v24.20.0","npm":"11.19.0"` inside `packageSmoke`; M:72009 (wb-7u0r) carries both, the `packageSmoke` fields and the prose in `envelopeSummary`; the other 9 `gate-pass` rows name no Node version. `grep -c -E 'node-version|EBADENGINE|"engines"'` over the whole file = 0 of 72,199 lines (`wc -l` at the same moment, 09:34Z); the armed control `grep -c -F v24.20.0` over the same file = 460 lines, 4 of them in the window. Every gate this seat observed ran on the host, where the only PATH node is 24.20.0.

## Evidence

- Quoted commands: `d00c3742` in a quoted command abbreviates `d00c37429887a6a0bad010983074553b5601e976`, which the shell variable carried when the command ran; `git rev-parse d00c3742` resolves to that sha. Output blocks are verbatim except where a bracketed note says a line was shortened.
- Pin and trees: `git rev-parse origin/workbench/implementation-program` = `d00c37429887a6a0bad010983074553b5601e976`; `^{tree}` = `9ee10c0a444e68b5b3ddf53f69a9e84ceb7bd297`; `origin/master` = `8cc7657b8b907580b90a61eec0f7ef60f7d37251`, not an ancestor of trunk (`git merge-base --is-ancestor origin/master d00c3742` rc 1) while `a0a3341491` and `346d16feb0` are ancestors of both (rc 0 each).
- Blob ids and line counts at the pin: `ci.yml` `8d55222fd3c0` 80; `package.json` `c6bc33445204` 85; `docs/17` `1ca77cc75331` 94 (line 63 is 190 bytes, 191 with its newline as `sed -n 63p | wc -c` reports, and carries the phrase `the floor is the only declaration` exactly once, `grep -c` = 1); `dependency-census.mjs` `3ef1457980ab` 625; `workbench-dependency-census.test.ts` `f277e0fd0a88` 704; `workbench-gate-typing-scope.test.ts` `de73fa803816` 201.
- Workflow bytes: Finding 1's quote is `ci.yml:3-7`, `:14-16`, `:49-51`, `:70-72`; run steps at `:18-22`, `:53-59`, `:74-80`; `continue-on-error: true` on `compat-latest-pi` at `:67` only.
- Floor history: `git log --first-parent -S'">=24"' -- package.json` = 1 commit, `a0a3341491` 2026-10-15T11:44:07Z; `git log -3 -- .github/workflows/ci.yml` = `346d16feb0` 2026-10-18T05:14:00Z, `25eb4fab35` 2026-10-09, `221df02323` 2026-08-25; `git log -S'node-version: 22' -- .github/workflows/ci.yml` = `c7668d425` 2026-08-15, `4cc76c0ad` 2026-07-17, `2c6684950` 2026-05-26.
- Lockfile roots: `package-lock.json packages[""].engines` = `{'node': '>=24'}`; `vendor/dependency-lock.json packages[""].engines` = `{'node': '>=24'}` (both via `python3 -I` on `git show` output).
- Census source: `dependency-census.mjs:116-133` (`enginesRows`), `:200-207` (the Node.js runtime declaration and its 4 checks), `:340-348` (the three engines rows pushed); the file has 0 hits for `\.github|workflows|setup-node|node-version`. Test: `workbench-dependency-census.test.ts:14-15` (owner binding: "census + drift guard over package.json engines, dependency pins, lockfile root engines and node --version"), `:213-220` (F3b-F10 names), `:293-298` (fixture checks), `:345-349`.
- Whole-tree grep: `git grep -n -F -- 'node-version' d00c3742 -- . ':!.beads'` = 6 lines (listed in Finding 4); armed control `git grep -c -F -- 'engines' d00c3742 -- qa test` = 11 files, `dependency-census.mjs` 20 and `workbench-dependency-census.test.ts` 36 among them.
- Tests that touch `ci.yml` (`git grep -l -F 'workflows/ci.yml' d00c3742 -- test ':!test/fixtures'` = 11 files, 16 lines; 16 files with the 5 fixture rosters; the full per-file breakdown is in Finding 4): G6 `workbench-gate-typing-scope.test.ts:189-200` reads the real file (`readRepo` at `:191`, structure, run steps only); token-presence anchors at `workbench-beads-claim-recheck-census.test.ts:353` and `workbench-h2-close-condition-census.test.ts:285` (`setup-node`), `workbench-h2-bead-graph-census.test.ts:510`, `:521` and `workbench-rf-orphan-server-reclaim-census.test.ts:248` (`runs-on`), `workbench-foa-public-port-bridge-census.test.ts:731` (`name: CI`; `:3718` lists it again); roster/anchor arrays at `workbench-hx-sio-design-status-census.test.ts:3841` and `workbench-rf-tsx-deno-provisioning.test.ts:728` (`:792` plants a synthetic copy, `:814` expects `.github/workflows/ci.yml:2:I6`); `workbench-package-boundary.test.ts:35` expects `.github/workflows/ci.yml` to be `denied-prefix` (`package-boundary.mjs:9-12`); `workbench-mwi-docs-remediation-census.test.ts:1130` quotes the stance; `e2e/isolated-provider.e2e.test.ts:25` is a comment. `node-version` under `test/` = 1 line (`workbench-gate-typing-scope.test.ts:185`, a comment), 0 on an `expect(` line.
- Strip-types sites: `workbench-identity-shell.test.ts:42`, `workbench-observation-shell.test.ts:24`, `worktree-process-kill-preservation.test.ts:11` and `:87`, `qa/workbench/furnace-hosted-retry-fault.mjs:7` (run by `forge.toml:39-40`).
- Host probes (all rc 0): flag probe on 24.20.0 and 22.23.2; bare `.ts` import on both; scratch `npm install` under 22.23.2 (EBADENGINE warn, rc 0), under 24.20.0 (no warn, rc 0), `npm ci` under 22.23.2 (EBADENGINE warn, rc 0). `npm config get engine-strict` = `false`. `gh --version` rc 127.
- Ledger: 72,122 lines at the 09:01Z probe, 72,198 at the 09:34Z re-derivation (append-only; 0 of the appended lines fall in the window); 3,295 rows stamped in the window by the predicate in the Date line (top-level `utc` string, `"2026-11-09T08:25:00Z" <= utc < "2026-11-10T08:25:00Z"`, `json.loads` per line under `python3 -I`; first M:68738, last M:72032; the 79 rows without a string `utc` are excluded; M:n is the 1-based line number); window row kinds led by `store-idle` 1,678, `daemon-liveness` 276, `correction` 241, `host-sample` 227, `gate-stage` 73; 13 window rows are `gate-pass`; `v24.20.0` appears in 4 window rows (M:70256 in `gateFindings` prose, M:70853 and M:71500 in `packageSmoke` fields, M:72009 in both; all `gate-pass`) and in 460 lines of the whole file (the armed control); `grep -c -E 'node-version|EBADENGINE|"engines"'` over the whole file = 0 of 72,199 lines.
- Stance sites: the 12 `git grep` lines in Finding 8, plus `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md:24` and `test/workbench-mwi-docs-remediation-census.test.ts:1130` (programs and tests, counted separately).

## Suggested fixes, cheapest first

1. **Move the three `node-version: 22` lines to `24`** (`ci.yml:16`, `:51`, `:72`; 3 lines, 0 test changes). G6 reads only `      - run: ` lines of the `build:` job, so it stays green; the compat jobs' axis (installed Pi) is untouched, which keeps R488(2) intact. This makes `docs/17:63` true again by accident rather than by construction; fix 2 is what makes it stay true.
2. **Give the wb-cax.20 census a read of every in-repo Node declaration** - a row per `node-version:` under `.github/workflows/*.yml` bound to `declared:node:floor` with a `satisfies`/`floor-of` check, in the same shape as `dependency-census.mjs:203-206`. The property asked for: a Node major declared anywhere in the tree that falls below `engines.node` reds the census at the next landing, with the row naming the file and line. One census row plus one F-case in `workbench-dependency-census.test.ts` (F11, next to F5-F10 at `:215-220`).
3. **If the workflow is deliberately frozen as upstream's file, make the table say so**: amend `docs/17:63`'s third cell from "the floor is the only declaration" to name the three workflow pins and the out-of-scope stance (`docs/17:5`, `WB-019`), and re-true `AGENTS.md:44`'s "(what CI runs)" to the same stance. The owner can then disposition this file NON-GOAL in one row with the bytes already in hand.
4. **Do not cure it with `engine-strict=true` in a project `.npmrc`.** That turns the runner's warning into a hard `npm ci` failure under 22 and adds a tracked file the wb-u62 npm-project-config census reads closed (`test/helpers/census.ts:1092` admits the key, but the new file is a new reader site); it also fixes nothing about the declaration.

## Positives worth protecting

- **3 of 3 census engines sites agree at `>=24`** (`package.json:5`, `package-lock.json packages[""].engines`, `vendor/dependency-lock.json packages[""].engines`) and the comparator is `equals` on each (`dependency-census.mjs:203-205`). A refactor that drops the lockfile-root rows, or softens `equals` to a range check, loses the guard that caught the earlier lockfile drifts F8 exists for (`workbench-dependency-census.test.ts:218`).
- **`docs/17`'s "Where declared / how measured" column and the `:72` policy sentence made this finding checkable in minutes from `git show`.** The table says where each declaration lives and what counts as drift; this file's whole argument is that one cell's claim can be re-read against the tree. Keep the column; fix 3 only edits one cell's content.
- **G6 pins the build job's run steps by parsing the yml as text with a single `  build:` key assertion** (`workbench-gate-typing-scope.test.ts:192-199`). It survives a `node-version` bump untouched and is the exact shape a `node-version` guard could copy; a rewrite to a YAML library would widen the dependency surface for no gain.
- **The R488 receipt recorded the pin and its rationale at the time** (`docs/workbench/receipts/wb-zsv.8.md:5`, 2026-10-18). That one sentence is what lets a reader grade this as a known reconciliation gap rather than a hidden drift; receipts that name the facts they chose not to act on are worth more than receipts that only list the diff.
- **The suites' explicit `NODE_FLAGS`** (`--disable-warning=ExperimentalWarning --experimental-strip-types --input-type=module -e`, `worktree-process-kill-preservation.test.ts:87`) ran identically on 22.23.2 and 24.20.0 on this host. Dropping the explicit flag in favour of the default stripping would tie those three suites to the floor alone; keep the flag.
- **Gate receipts carry the Node and npm versions** (4 of 13 window `gate-pass` rows name them, all v24.20.0 with npm 11.19.0: 3 of the 4 as the `"node"`/`"npm"` fields of the `packageSmoke` receipt (M:70853, M:71500, M:72009), 2 of the 4 as the prose `node v24.20.0, npm 11.19.0` describing that receipt (M:70256 in `gateFindings`, M:72009 in `envelopeSummary`)). That is what bounds the realized cost of this finding at 0; a receipt refactor that drops the two fields removes the bound, and the 9 `gate-pass` rows that name no Node version show the field is not yet carried by every receipt shape.
- **`.github/` is a denied prefix of the package boundary** (`package-boundary.mjs:11`, `workbench-package-boundary.test.ts:35`), so the pin cannot reach a consumer through the tarball.

## What I did not establish

- Whether GitHub Actions runs on the fork at all, and if so on which 22.x `actions/setup-node@v4` resolves today and with which npm. Artifact: the fork's Actions run list for `master`. `gh` is absent (rc 127) and no network call was made.
- `npm ci` or `npm run test` under Node 22 against the repository's own `package.json` and lockfile. Not run: it would write `node_modules` into a shared clone. Finding 7's CONFIRMED rests on a scratch manifest with the same `engines` value and no dependencies; the transfer is PLAUSIBLE.
- Whether any dependency's own `engines` would add `EBADENGINE` lines under 22 (only the root manifest was probed), and whether `@tintinweb/pi-subagents`'s upstream (`tintinweb/pi-subagents`) carries the same 22 pins; the `origin/master` I read is the fork's continuity merge, not upstream.
- That every gate stage in the window ran on 24.20.0. The ledger names a Node version in 4 of the 13 window `gate-pass` rows (3 in `packageSmoke` fields, 1 in gate-findings prose only; all 24.20.0) and in 0 window rows of any other kind; the rest of the bound is that PATH holds one node on this host. A gate row that recorded its own `process.version` would settle it per stage.
- The census was not executed; "reads 0 workflow pins" rests on the source (`dependency-census.mjs` has no `.github`, `workflows`, `setup-node` or `node-version` token) and the fixture's binding list, not on a census run with a planted drift. A one-line mutant (`node-version: 20`) plus `npm run test:census` would be the falsifier.
- Whether the pin is in scope for the MWI program's "out of scope" clause as the owner reads it; this file reports the bytes and leaves the disposition to the owner (fix 3 is the NON-GOAL-compatible path).

## Postscript - what the lead got wrong, and one instrument note

The evidence packet's lead (2) framed this as "check whether the repo pins a Node version for that flag ... file a gap if unpinned". The floor pins it (`package.json:5`), the qa script says so (`furnace-hosted-retry-fault.mjs:7`), and both type-stripping forms ran on the two Node majors present on this host, so the strip-types angle is not a finding; it is recorded in Finding 6 so the next seat does not re-derive it. The finding that survives is the one the repository's own policy sentence defines. Instrument note: `git log -S'<string>'` returns the commits where the string's occurrence count changed, so for `node-version: 22` it names three upstream commits that added jobs and not the R488 edit that kept the value; `git log -- <path>` is the right instrument for "last edited", and the two are quoted separately in Finding 2 for that reason.
